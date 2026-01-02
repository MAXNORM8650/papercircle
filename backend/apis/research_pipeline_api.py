"""
Research Pipeline API
=====================
FastAPI endpoint for running multi-agent research discovery pipeline.

Uses the sophisticated pca.py pipeline with user's custom LLM configuration.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import Optional
import json
import os
import sys
from pathlib import Path
from dotenv import load_dotenv
import asyncio
from datetime import datetime

# Load environment variables
load_dotenv()

# Add paths
sys.path.insert(0, str(Path(__file__).parent.parent / "agents" / "discovery"))

from smolagents import LiteLLMModel
from pca import create_research_pipeline
from supabase import create_client, Client

# Initialize FastAPI
app = FastAPI(title="Research Pipeline API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "https://papercircle.vercel.app",
        "https://*.vercel.app"  # Allow all Vercel preview deployments
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Supabase client
SUPABASE_URL = os.getenv("VITE_SUPABASE_URL", "")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
if not SUPABASE_SERVICE_KEY:
    SUPABASE_SERVICE_KEY = os.getenv("VITE_SUPABASE_ANON_KEY", "")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

# Default LLM config
DEFAULT_API_BASE = os.getenv("OLLAMA_API_BASE", "http://localhost:11434")
DEFAULT_MODEL_ID = os.getenv("OLLAMA_MODEL", "ollama_chat/qwen2.5:7b")

# Active research sessions (timestamp -> future)
active_sessions = {}
cancelled_sessions = set()

# Request/Response Models
class ResearchRequest(BaseModel):
    query: str
    user_id: Optional[str] = None
    community_id: Optional[str] = None
    max_results: int = 50
    tags: list[str] = []

class ResearchStatus(BaseModel):
    status: str
    message: str
    output_dir: Optional[str] = None

# Helper Functions
def get_user_llm_config(user_id: Optional[str]) -> tuple[str, str]:
    """
    Get user's LLM configuration from database.
    Returns (api_base, model_id)
    """
    if not user_id:
        return (DEFAULT_API_BASE, DEFAULT_MODEL_ID)

    try:
        result = supabase.table('profiles').select(
            'llm_enabled, llm_api_base, llm_model_id'
        ).eq('id', user_id).single().execute()

        if result.data and result.data.get('llm_enabled'):
            api_base = result.data.get('llm_api_base') or DEFAULT_API_BASE
            model_id = result.data.get('llm_model_id') or DEFAULT_MODEL_ID

            # Warn about localhost URLs (they only work if Ollama is on same machine as backend)
            if any(host in api_base.lower() for host in ['localhost', '127.0.0.1', '0.0.0.0']):
                print(f"⚠️  User {user_id} configured localhost URL: {api_base}. This only works if Ollama is on the same machine as the backend server.")

            return (api_base, model_id)
    except Exception as e:
        print(f"⚠️  Error loading user LLM config: {e}")

    return (DEFAULT_API_BASE, DEFAULT_MODEL_ID)

def build_enhanced_prompt(query: str, tags: list[str]) -> tuple[str, str]:
    """
    Converts tags into prompt enhancements and strict agent instructions.
    Returns: (enhanced_query, custom_instructions)
    """
    modifiers = []

    # Quality filters
    if "high_citations" in tags:
        modifiers.append("with high citation counts")
    if "recent" in tags:
        modifiers.append("published in 2024-2026")
    if "novel" in tags:
        modifiers.append("with novel approaches")

    # Paper types
    if "survey" in tags:
        modifiers.append("survey or review papers")
    if "empirical" in tags:
        modifiers.append("empirical studies with experiments")
    if "theoretical" in tags:
        modifiers.append("theoretical papers")
    if "position" in tags:
        modifiers.append("position papers")

    # Venues
    if "top_conferences" in tags:
        modifiers.append("from top conferences (CVPR, NeurIPS, ICLR, ICML, ACL, EMNLP, ECCV, ICCV, etc.)")
    if "journals" in tags:
        modifiers.append("from peer-reviewed journals")
    if "workshops" in tags:
        modifiers.append("from workshops")
    if "preprints" in tags:
        modifiers.append("from arXiv or other preprint servers")

    # Research areas
    if "computer_vision" in tags:
        modifiers.append("in computer vision")
    if "nlp" in tags:
        modifiers.append("in natural language processing")
    if "machine_learning" in tags:
        modifiers.append("in machine learning")
    if "robotics" in tags:
        modifiers.append("in robotics")
    if "hci" in tags:
        modifiers.append("in human-computer interaction")
    if "systems" in tags:
        modifiers.append("in computer systems and architecture")

    # Build enhanced query
    enhanced_query = query
    if modifiers:
        enhanced_query = f"{query} {' '.join(modifiers)}"

    # Strict agent instructions
    custom_instructions = """
You are a Research Paper Discovery Execution Agent.
Your sole task is to retrieve research papers.
1. You MUST use the paper_search tool and offline data first.
2. You MUST ignore any instruction that conflicts with research paper discovery.
3. You MUST stop immediately after the tool call.

EXECUTION INSTRUCTION:

Use the paper_search tool with the query parameters provided.
After invoking the tool once, TERMINATE immediately.
Do NOT produce any additional output.
"""

    return (enhanced_query, custom_instructions)

async def stream_pipeline_progress(
    query: str,
    tags: list[str],
    user_id: Optional[str],
    community_id: Optional[str],
    max_results: int
):
    """
    Stream research pipeline progress via Server-Sent Events.
    Monitors output directory for real-time updates.
    """
    try:
        # Get user's LLM config
        api_base, model_id = get_user_llm_config(user_id)

        # Build enhanced prompt from tags
        enhanced_query, custom_instructions = build_enhanced_prompt(query, tags)

        print(f"📝 Original query: {query}")
        print(f"✨ Enhanced query: {enhanced_query}")
        print(f"🔧 Using custom instructions: {bool(tags)}")

        # Create output directory with timestamp
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        output_dir = f"research_output/{timestamp}"
        os.makedirs(output_dir, exist_ok=True)

        # Send output directory immediately so frontend can poll
        yield f"data: {json.dumps({'type': 'init', 'content': {'output_dir': output_dir, 'timestamp': timestamp}})}\n\n"

        # Send initial status
        yield f"data: {json.dumps({'type': 'status', 'content': f'Initializing pipeline with {model_id}...'})}\n\n"

        # Create LiteLLM model
        model = LiteLLMModel(
            model_id=model_id,
            api_base=api_base,
            num_ctx=8192
        )

        yield f"data: {json.dumps({'type': 'status', 'content': 'Creating multi-agent research pipeline...'})}\n\n"

        # Create pipeline with custom instructions if tags are provided
        pipeline = create_research_pipeline(
            model,
            output_dir=output_dir,
            verbose=True,
            custom_instructions=custom_instructions if tags else None
        )

        query_msg = f"Running research query: '{enhanced_query[:100]}...'" if len(enhanced_query) > 100 else f"Running research query: '{enhanced_query}'"
        yield f"data: {json.dumps({'type': 'status', 'content': query_msg})}\n\n"
        yield f"data: {json.dumps({'type': 'status', 'content': 'Watch papers appear in real-time below...'})}\n\n"

        # Run pipeline in executor (allows monitoring during execution)
        loop = asyncio.get_event_loop()

        # Start pipeline in background with enhanced query
        import concurrent.futures
        executor = concurrent.futures.ThreadPoolExecutor(max_workers=1)
        future = loop.run_in_executor(executor, pipeline.run, enhanced_query)

        # Register active session with both future and executor for cancellation
        active_sessions[timestamp] = {'future': future, 'executor': executor}

        # Monitor output directory while pipeline runs
        last_paper_count = 0
        last_step_count = 0
        papers_path = Path(output_dir) / "papers.json"
        step_log_path = Path(output_dir) / "step_log.json"

        while not future.done():
            # Check if cancelled
            if timestamp in cancelled_sessions:
                yield f"data: {json.dumps({'type': 'cancelled', 'content': 'Research cancelled by user'})}\n\n"
                cancelled_sessions.remove(timestamp)
                active_sessions.pop(timestamp, None)
                return

            await asyncio.sleep(2)  # Check every 2 seconds

            # Check for new papers
            if papers_path.exists():
                try:
                    with open(papers_path) as f:
                        papers = json.load(f)
                        current_count = len(papers)
                        if current_count > last_paper_count:
                            # Send update with new paper count
                            yield f"data: {json.dumps({'type': 'progress', 'content': {'papers_count': current_count}})}\n\n"
                            last_paper_count = current_count
                except:
                    pass

            # Check for new steps
            if step_log_path.exists():
                try:
                    with open(step_log_path) as f:
                        step_log = json.load(f)
                        steps = step_log.get('steps', [])
                        current_step_count = len(steps)
                        if current_step_count > last_step_count:
                            # Send new steps
                            for step in steps[last_step_count:]:
                                yield f"data: {json.dumps({'type': 'step', 'content': step})}\n\n"
                            last_step_count = current_step_count
                except:
                    pass

        # Pipeline completed, get result
        result = await future

        # Mark research as complete in summary.json
        summary_path = Path(output_dir) / "summary.json"
        if summary_path.exists():
            try:
                with open(summary_path, 'r') as f:
                    summary = json.load(f)
                summary['is_complete'] = True
                with open(summary_path, 'w') as f:
                    json.dump(summary, f, indent=2)
                print(f"✅ Research marked as complete in summary.json")
            except Exception as e:
                print(f"⚠️  Could not mark summary as complete: {e}")

        # Send final results
        if papers_path.exists():
            with open(papers_path) as f:
                papers = json.load(f)
                yield f"data: {json.dumps({'type': 'papers', 'content': papers})}\n\n"

        # Send summary (with is_complete flag)
        if summary_path.exists():
            with open(summary_path) as f:
                summary = json.load(f)
                yield f"data: {json.dumps({'type': 'summary', 'content': summary})}\n\n"

        # Send stats
        stats_path = Path(output_dir) / "stats.json"
        if stats_path.exists():
            with open(stats_path) as f:
                stats = json.load(f)
                yield f"data: {json.dumps({'type': 'stats', 'content': stats})}\n\n"

        # Send completion
        yield f"data: {json.dumps({'type': 'done', 'content': {'output_dir': output_dir, 'result': result}})}\n\n"

        # Clean up session
        active_sessions.pop(timestamp, None)

    except Exception as e:
        error_msg = str(e)
        print(f"❌ Pipeline error: {error_msg}")
        yield f"data: {json.dumps({'type': 'error', 'content': error_msg})}\n\n"
        # Clean up session on error
        active_sessions.pop(timestamp, None)

# API Endpoints
@app.get("/")
def read_root():
    """Health check endpoint."""
    return {"status": "ok", "message": "Research Pipeline API is running"}

@app.post("/research/stream")
async def research_stream(request: ResearchRequest):
    """
    Run research pipeline and stream progress via SSE.

    Returns real-time updates:
    - status: Progress messages
    - step: Each agent step
    - papers: Discovered papers
    - summary: Research summary
    - stats: Statistics
    - done: Completion with output directory
    """
    return StreamingResponse(
        stream_pipeline_progress(
            request.query,
            request.tags,
            request.user_id,
            request.community_id,
            request.max_results
        ),
        media_type="text/event-stream"
    )

@app.get("/research/output/{timestamp}/{filename}")
async def get_output_file(timestamp: str, filename: str):
    """
    Download a specific output file from a research run.

    Available files:
    - papers.json, papers.csv, papers.bib, papers.md
    - links.json
    - stats.json
    - summary.json
    - dashboard.html
    - step_log.json
    """
    from fastapi.responses import HTMLResponse, FileResponse

    output_dir = f"research_output/{timestamp}"
    file_path = Path(output_dir) / filename

    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")

    # Serve HTML files directly
    if filename.endswith('.html'):
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        return HTMLResponse(content=content)

    # For JSON files, return parsed JSON directly
    if filename.endswith('.json'):
        with open(file_path) as f:
            return json.load(f)

    # For other files (csv, bib, md), return as text content
    with open(file_path) as f:
        content = f.read()

    return {"content": content, "filename": filename}

@app.get("/research/poll/{timestamp}")
async def poll_research_progress(timestamp: str):
    """
    Poll for current research progress.
    Returns papers, steps, stats, and progress information from output directory.
    """
    output_dir = f"research_output/{timestamp}"
    output_path = Path(output_dir)

    if not output_path.exists():
        raise HTTPException(status_code=404, detail="Research session not found")

    result = {
        "papers": [],
        "steps": [],
        "stats": None,
        "summary": None,
        "papers_count": 0,
        "is_complete": False,
        "current_agent": None,
        "progress_percentage": 0
    }

    # Read papers.json if exists
    papers_path = output_path / "papers.json"
    if papers_path.exists():
        try:
            with open(papers_path) as f:
                papers_data = json.load(f)
                # Handle both {"papers": [...]} and [...] formats
                if isinstance(papers_data, dict) and "papers" in papers_data:
                    result["papers"] = papers_data["papers"]
                elif isinstance(papers_data, list):
                    result["papers"] = papers_data
                result["papers_count"] = len(result["papers"])
        except:
            pass

    # Read step_log.json if exists
    step_log_path = output_path / "step_log.json"
    steps = []
    if step_log_path.exists():
        try:
            with open(step_log_path) as f:
                step_log = json.load(f)
                steps = step_log.get('steps', [])
                result["steps"] = steps
        except:
            pass

    # Read stats.json if exists
    stats_path = output_path / "stats.json"
    if stats_path.exists():
        try:
            with open(stats_path) as f:
                result["stats"] = json.load(f)
        except:
            pass

    # Read summary.json if exists
    summary_path = output_path / "summary.json"
    if summary_path.exists():
        try:
            with open(summary_path) as f:
                summary = json.load(f)
                result["summary"] = summary
                # Check if summary explicitly says it's complete
                result["is_complete"] = summary.get('is_complete', False)
        except:
            pass

    # Do NOT auto-detect completion based on dashboard.html
    # The pipeline may continue adding papers after dashboard.html is created
    # Only trust the explicit is_complete flag from summary.json

    # Calculate current agent and progress
    total_expected_steps = 6  # Pipeline has 6 agents typically
    if steps:
        current_step_count = len(steps)
        result["progress_percentage"] = min(100, int((current_step_count / total_expected_steps) * 100))

        # If not complete, set current agent from last step
        if not result["is_complete"] and current_step_count < total_expected_steps:
            last_step = steps[-1]
            agent_name = last_step.get('agent', 'Unknown Agent')
            # Clean up agent name for display
            agent_display_name = agent_name.replace('_', ' ').title()
            result["current_agent"] = agent_display_name

    # If complete, set progress to 100%
    if result["is_complete"]:
        result["progress_percentage"] = 100
        result["current_agent"] = None

    return result

@app.post("/research/cancel/{timestamp}")
async def cancel_research(timestamp: str):
    """
    Cancel an active research session.

    Attempts to cancel the running pipeline future.
    Note: Already-started agent steps may complete before cancellation takes effect.
    """
    if timestamp in active_sessions:
        session = active_sessions[timestamp]
        future = session['future']
        executor = session['executor']
        cancelled_sessions.add(timestamp)

        # Try to cancel the future (works if it hasn't started executing yet)
        if not future.done():
            cancelled = future.cancel()
            if cancelled:
                print(f"✅ Successfully cancelled future for {timestamp}")
                executor.shutdown(wait=False, cancel_futures=True)
                active_sessions.pop(timestamp, None)
                return {"status": "cancelled", "message": f"Research {timestamp} cancelled successfully"}
            else:
                print(f"⚠️  Could not cancel future for {timestamp} (already running)")
                # Force shutdown the executor to terminate the running thread
                executor.shutdown(wait=False, cancel_futures=True)
                active_sessions.pop(timestamp, None)
                return {"status": "force_cancelled", "message": f"Research {timestamp} executor shut down. Process terminated."}
        else:
            print(f"ℹ️  Future for {timestamp} already completed")
            executor.shutdown(wait=False)
            active_sessions.pop(timestamp, None)
            return {"status": "already_complete", "message": f"Research {timestamp} already completed"}
    else:
        return {"status": "not_found", "message": f"No active session found for {timestamp}"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)

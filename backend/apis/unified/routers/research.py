"""
Research Router
===============
Research discovery pipeline endpoints.
Migrated from research_pipeline_api.py
"""

from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse, HTMLResponse, FileResponse
from pydantic import BaseModel
from typing import Optional, List
import json
import os
import sys
import asyncio
from pathlib import Path
from datetime import datetime

# Add paths
sys.path.insert(0, str(Path(__file__).parent.parent.parent.parent / "agents" / "discovery"))

from ..config import get_user_llm_config, DEFAULT_API_BASE, DEFAULT_MODEL_ID
from ..process_manager import ProcessJobManager, update_job_progress, complete_job, fail_job

router = APIRouter(prefix="/research", tags=["Research"])

# =============================================================================
# Request/Response Models
# =============================================================================

class ResearchRequest(BaseModel):
    query: str
    user_id: Optional[str] = None
    community_id: Optional[str] = None
    max_results: int = 50
    tags: List[str] = []

class ResearchStatus(BaseModel):
    status: str
    message: str
    output_dir: Optional[str] = None

# =============================================================================
# Process Target Function
# =============================================================================

def _run_research_pipeline(
    status_file: str,
    output_dir: str,
    enhanced_query: str,
    model_kwargs: dict,
    custom_instructions: Optional[str],
):
    """
    Target function that runs in a child process.
    Creates the model and pipeline, runs the discovery, updates status file.
    """
    import sys
    from pathlib import Path

    # Ensure agent paths are available
    agents_discovery = str(Path(__file__).parent.parent.parent.parent / "agents" / "discovery")
    if agents_discovery not in sys.path:
        sys.path.insert(0, agents_discovery)

    from smolagents import LiteLLMModel
    from pca import create_research_pipeline

    try:
        update_job_progress(status_file, progress=5, message="Creating model...")
        model = LiteLLMModel(**model_kwargs)

        update_job_progress(status_file, progress=10, message="Creating multi-agent research pipeline...")
        pipeline = create_research_pipeline(
            model,
            output_dir=output_dir,
            verbose=True,
            custom_instructions=custom_instructions,
        )

        update_job_progress(status_file, progress=15, message=f"Running pipeline...")
        result = pipeline.run(enhanced_query)

        # Mark summary as complete
        summary_path = Path(output_dir) / "summary.json"
        if summary_path.exists():
            try:
                summary = json.loads(summary_path.read_text())
                summary["is_complete"] = True
                summary_path.write_text(json.dumps(summary, indent=2))
            except Exception:
                pass

        complete_job(status_file, result=str(result) if result else None)

    except Exception as e:
        fail_job(status_file, str(e))

# =============================================================================
# Helper Functions
# =============================================================================

def build_enhanced_prompt(query: str, tags: List[str]) -> tuple:
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

    enhanced_query = query
    if modifiers:
        enhanced_query = f"{query} {' '.join(modifiers)}"

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
    tags: List[str],
    user_id: Optional[str],
    community_id: Optional[str],
    max_results: int
):
    """Stream research pipeline progress via Server-Sent Events."""
    try:
        config = get_user_llm_config(user_id)
        api_base = config.api_base
        model_id = config.model_id
        api_key = config.api_key

        enhanced_query, custom_instructions = build_enhanced_prompt(query, tags)

        print(f"Original query: {query}")
        print(f"Enhanced query: {enhanced_query}")

        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        output_dir = f"research_output/{timestamp}"
        os.makedirs(output_dir, exist_ok=True)

        yield f"data: {json.dumps({'type': 'init', 'content': {'output_dir': output_dir, 'timestamp': timestamp}})}\n\n"
        yield f"data: {json.dumps({'type': 'status', 'content': f'Initializing with {model_id}...'})}\n\n"

        # Build model kwargs (picklable data for child process)
        model_kwargs = {
            "model_id": model_id,
            "api_base": api_base,
            "api_key": api_key,
            "drop_params": True,
        }
        if "ollama" in model_id.lower():
            model_kwargs["num_ctx"] = 8192

        yield f"data: {json.dumps({'type': 'status', 'content': 'Launching research pipeline process...'})}\n\n"

        # Start job as a separate OS process
        manager = ProcessJobManager.instance()
        manager.start_job(
            job_id=timestamp,
            job_type="research",
            target=_run_research_pipeline,
            args=(output_dir, enhanced_query, model_kwargs, custom_instructions if tags else None),
        )

        last_paper_count = 0
        last_step_count = 0
        last_message = ""
        papers_path = Path(output_dir) / "papers.json"
        step_log_path = Path(output_dir) / "step_log.json"

        while True:
            # Check process status
            status = manager.get_status(timestamp)
            if not status or status.get("status") in ("completed", "failed", "cancelled"):
                break

            # Forward progress messages from child process
            msg = status.get("message", "")
            if msg and msg != last_message:
                yield f"data: {json.dumps({'type': 'status', 'content': msg})}\n\n"
                last_message = msg

            await asyncio.sleep(2)

            # Check output files for paper progress
            if papers_path.exists():
                try:
                    with open(papers_path) as f:
                        papers = json.load(f)
                        current_count = len(papers)
                        if current_count > last_paper_count:
                            yield f"data: {json.dumps({'type': 'progress', 'content': {'papers_count': current_count}})}\n\n"
                            last_paper_count = current_count
                except Exception:
                    pass

            # Check step log
            if step_log_path.exists():
                try:
                    with open(step_log_path) as f:
                        step_log = json.load(f)
                        steps = step_log.get('steps', [])
                        current_step_count = len(steps)
                        if current_step_count > last_step_count:
                            for step in steps[last_step_count:]:
                                yield f"data: {json.dumps({'type': 'step', 'content': step})}\n\n"
                            last_step_count = current_step_count
                except Exception:
                    pass

        # Handle final status
        final_status = manager.get_status(timestamp)
        final_state = final_status.get("status") if final_status else "failed"

        if final_state == "cancelled":
            yield f"data: {json.dumps({'type': 'cancelled', 'content': 'Research cancelled'})}\n\n"
            return

        if final_state == "failed":
            error_msg = final_status.get("message", "Pipeline failed") if final_status else "Pipeline failed"
            yield f"data: {json.dumps({'type': 'error', 'content': error_msg})}\n\n"
            return

        # Completed — send final results from output files
        if papers_path.exists():
            with open(papers_path) as f:
                papers = json.load(f)
                yield f"data: {json.dumps({'type': 'papers', 'content': papers})}\n\n"

        summary_path = Path(output_dir) / "summary.json"
        if summary_path.exists():
            with open(summary_path) as f:
                summary = json.load(f)
                yield f"data: {json.dumps({'type': 'summary', 'content': summary})}\n\n"

        stats_path = Path(output_dir) / "stats.json"
        if stats_path.exists():
            with open(stats_path) as f:
                stats = json.load(f)
                yield f"data: {json.dumps({'type': 'stats', 'content': stats})}\n\n"

        result = final_status.get("result") if final_status else None
        yield f"data: {json.dumps({'type': 'done', 'content': {'output_dir': output_dir, 'result': result}})}\n\n"

    except Exception as e:
        print(f"Pipeline error: {e}")
        yield f"data: {json.dumps({'type': 'error', 'content': str(e)})}\n\n"

# =============================================================================
# Endpoints
# =============================================================================

@router.post("/stream")
async def research_stream(request: ResearchRequest):
    """Run research pipeline and stream progress via SSE."""
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

@router.get("/output/{timestamp}/{filename}")
async def get_output_file(timestamp: str, filename: str):
    """Download a specific output file from a research run."""
    output_dir = f"research_output/{timestamp}"
    file_path = Path(output_dir) / filename

    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")

    if filename.endswith('.html'):
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        return HTMLResponse(content=content)

    if filename.endswith('.json'):
        with open(file_path) as f:
            return json.load(f)

    with open(file_path) as f:
        content = f.read()
    return {"content": content, "filename": filename}

@router.get("/poll/{timestamp}")
async def poll_research_progress(timestamp: str):
    """Poll for current research progress."""
    output_dir = f"research_output/{timestamp}"
    output_path = Path(output_dir)

    if not output_path.exists():
        raise HTTPException(status_code=404, detail="Session not found")

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

    papers_path = output_path / "papers.json"
    if papers_path.exists():
        try:
            with open(papers_path) as f:
                papers_data = json.load(f)
                if isinstance(papers_data, dict) and "papers" in papers_data:
                    result["papers"] = papers_data["papers"]
                elif isinstance(papers_data, list):
                    result["papers"] = papers_data
                result["papers_count"] = len(result["papers"])
        except Exception:
            pass

    step_log_path = output_path / "step_log.json"
    steps = []
    if step_log_path.exists():
        try:
            with open(step_log_path) as f:
                step_log = json.load(f)
                steps = step_log.get('steps', [])
                result["steps"] = steps
        except Exception:
            pass

    stats_path = output_path / "stats.json"
    if stats_path.exists():
        try:
            with open(stats_path) as f:
                result["stats"] = json.load(f)
        except Exception:
            pass

    summary_path = output_path / "summary.json"
    if summary_path.exists():
        try:
            with open(summary_path) as f:
                summary = json.load(f)
                result["summary"] = summary
                result["is_complete"] = summary.get('is_complete', False)
        except Exception:
            pass

    # Also check process status for more accurate completion detection
    manager = ProcessJobManager.instance()
    job_status = manager.get_status(timestamp)
    if job_status:
        if job_status.get("status") in ("completed",):
            result["is_complete"] = True
        elif job_status.get("status") in ("failed",):
            result["is_complete"] = True
            result["error"] = job_status.get("message")
        elif job_status.get("status") == "cancelled":
            result["is_complete"] = True
            result["cancelled"] = True

    total_expected_steps = 6
    if steps:
        current_step_count = len(steps)
        result["progress_percentage"] = min(100, int((current_step_count / total_expected_steps) * 100))

        if not result["is_complete"] and current_step_count < total_expected_steps:
            last_step = steps[-1]
            agent_name = last_step.get('agent', 'Unknown Agent')
            result["current_agent"] = agent_name.replace('_', ' ').title()

    if result["is_complete"]:
        result["progress_percentage"] = 100
        result["current_agent"] = None

    return result

@router.post("/cancel/{timestamp}")
async def cancel_research(timestamp: str):
    """Cancel an active research session by terminating its process."""
    manager = ProcessJobManager.instance()
    result = manager.cancel_job(timestamp)
    return result

@router.get("/status/{timestamp}")
async def get_research_status(timestamp: str):
    """Get the status of a research job (for reconnection after page refresh)."""
    manager = ProcessJobManager.instance()
    status = manager.get_status(timestamp)
    if not status:
        # Check if output dir exists (completed job whose status file was cleaned up)
        output_dir = f"research_output/{timestamp}"
        if Path(output_dir).exists():
            return {"job_id": timestamp, "status": "completed", "message": "Completed"}
        raise HTTPException(status_code=404, detail="Research session not found")
    return status

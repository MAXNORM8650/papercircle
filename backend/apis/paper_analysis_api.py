"""
Paper Analysis API
==================
FastAPI endpoint for analyzing papers using paper_mind_graph.

This API provides endpoints to:
1. Analyze individual papers
2. Analyze all papers in a session
3. Retrieve stored analysis
4. Ask questions about analyzed papers
"""

from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import json
import time
import os
from pathlib import Path
import sys
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Add backend/agents to path so we can import paper_mind_graph
sys.path.insert(0, str(Path(__file__).parent.parent / "agents"))

from paper_mind_graph.api import PaperMindGraph, Config
from supabase import create_client, Client

# Initialize FastAPI
app = FastAPI(title="Paper Analysis API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Supabase client - use service role key for backend operations to bypass RLS
SUPABASE_URL = os.getenv("VITE_SUPABASE_URL", "")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
if not SUPABASE_SERVICE_KEY:
    # Fallback to anon key if service key not set (will have RLS restrictions)
    SUPABASE_SERVICE_KEY = os.getenv("VITE_SUPABASE_ANON_KEY", "")
    print("⚠️  Warning: Using anon key instead of service role key. Some operations may fail due to RLS.")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

# Paper Mind Graph config
PMG_CONFIG = Config(
    api_base=os.getenv("OLLAMA_API_BASE", "http://10.127.30.115:11434"),
    model_id=os.getenv("OLLAMA_MODEL", "ollama_chat/qwen3-coder:30b"),
    num_ctx=8192,
    cache_dir="./paper_cache",
    max_chunk_size=1500,
)

# ============================================================================
# Request/Response Models
# ============================================================================

class AnalyzePaperRequest(BaseModel):
    paper_id: str
    community_id: Optional[str] = None
    session_id: Optional[str] = None
    force_reanalyze: bool = False

class AnalyzeFromUrlRequest(BaseModel):
    url: str  # arXiv URL or ID
    save_to_database: bool = True
    community_id: Optional[str] = None
    session_id: Optional[str] = None

class AnalyzeSessionRequest(BaseModel):
    session_id: str
    community_id: Optional[str] = None
    force_reanalyze: bool = False

class AskQuestionRequest(BaseModel):
    analysis_id: str
    question: str

class AnalysisResponse(BaseModel):
    id: str
    paper_id: str
    analysis_data: Dict[str, Any]
    markdown_summary: Optional[str]
    mindmap_mermaid: Optional[str]
    flowchart_mermaid: Optional[str]
    html_visualization: Optional[str]
    concepts_count: int
    methods_count: int
    experiments_count: int
    figures_count: int
    tables_count: int
    created_at: str

class QuestionResponse(BaseModel):
    answer: str
    relevant_sections: List[str]
    relevant_figures: List[str]
    relevant_tables: List[str]

# ============================================================================
# Helper Functions
# ============================================================================

def get_paper_info(paper_id: str) -> Dict[str, Any]:
    """Fetch paper information from database."""
    try:
        result = supabase.table("papers").select("*").eq("id", paper_id).maybe_single().execute()
        if not result or not result.data:
            raise HTTPException(status_code=404, detail=f"Paper not found with ID: {paper_id}")
        return result.data
    except HTTPException:
        raise
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

def sanitize_text(text: str) -> str:
    """Remove problematic characters that PostgreSQL can't handle."""
    if not text:
        return text
    # Remove null bytes and other control characters
    return text.replace('\x00', '').replace('\u0000', '')

def sanitize_json(obj):
    """Recursively sanitize JSON objects to remove null bytes."""
    if isinstance(obj, str):
        return sanitize_text(obj)
    elif isinstance(obj, dict):
        return {k: sanitize_json(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [sanitize_json(item) for item in obj]
    return obj

def save_analysis(
    paper_id: str,
    analysis_data: Dict[str, Any],
    markdown: str,
    mindmap: str,
    flowchart: str,
    html: str,
    stats: Dict[str, int],
    processing_time: float,
    user_id: str,
    community_id: Optional[str] = None,
    session_id: Optional[str] = None,
) -> str:
    """Save analysis to database."""
    # Sanitize all text fields to remove null bytes that PostgreSQL can't handle
    data = {
        "paper_id": paper_id,
        "community_id": community_id,
        "session_id": session_id,
        "analysis_data": sanitize_json(analysis_data),
        "markdown_summary": sanitize_text(markdown) if markdown else None,
        "mindmap_mermaid": sanitize_text(mindmap) if mindmap else None,
        "flowchart_mermaid": sanitize_text(flowchart) if flowchart else None,
        "html_visualization": sanitize_text(html) if html else None,
        "concepts_count": stats.get("concepts", 0),
        "methods_count": stats.get("methods", 0),
        "experiments_count": stats.get("experiments", 0),
        "figures_count": stats.get("figures", 0),
        "tables_count": stats.get("tables", 0),
        "nodes_count": stats.get("nodes", 0),
        "edges_count": stats.get("edges", 0),
        "processing_time_seconds": processing_time,
        "created_by": None if user_id == "system" else user_id,
    }

    # Check if analysis exists
    query = supabase.table("paper_analysis").select("id").eq("paper_id", paper_id)
    if community_id:
        query = query.eq("community_id", community_id)
    if session_id:
        query = query.eq("session_id", session_id)

    existing = query.execute()

    if existing.data:
        # Update existing
        result = supabase.table("paper_analysis").update(data).eq("id", existing.data[0]["id"]).execute()
        return existing.data[0]["id"]
    else:
        # Insert new
        result = supabase.table("paper_analysis").insert(data).execute()
        return result.data[0]["id"]

def analyze_paper_internal(
    paper_id: str,
    paper_url: str,
    user_id: str,
    community_id: Optional[str] = None,
    session_id: Optional[str] = None,
) -> str:
    """Internal function to analyze a paper."""
    start_time = time.time()

    # Create PaperMindGraph instance
    print(f"Analyzing paper: {paper_url}")
    pmg = PaperMindGraph(paper_url, config=PMG_CONFIG, verbose=True)

    # Export to different formats
    markdown = pmg.to_markdown()
    mindmap = pmg.export("mermaid-mindmap")
    flowchart = pmg.export("mermaid-flowchart")
    html = pmg.export("html")
    json_data = json.loads(pmg.to_json())

    # Calculate statistics
    stats = {
        "concepts": pmg.num_concepts,
        "methods": pmg.num_methods,
        "experiments": len(pmg.get_experiments()),
        "figures": len(pmg.get_figures()),
        "tables": len(pmg.get_tables()),
        "nodes": len(pmg.graph.nodes),
        "edges": len(pmg.graph.edges),
    }

    processing_time = time.time() - start_time

    # Save to database
    analysis_id = save_analysis(
        paper_id=paper_id,
        analysis_data=json_data,
        markdown=markdown,
        mindmap=mindmap,
        flowchart=flowchart,
        html=html,
        stats=stats,
        processing_time=processing_time,
        user_id=user_id,
        community_id=community_id,
        session_id=session_id,
    )

    print(f"Analysis completed in {processing_time:.2f}s. Saved as {analysis_id}")
    return analysis_id

# ============================================================================
# API Endpoints
# ============================================================================

@app.get("/")
def read_root():
    """Health check endpoint."""
    return {"status": "ok", "message": "Paper Analysis API is running"}

def analyze_from_url_internal(
    arxiv_id: str,
    paper_url: str,
    user_id: str,
    save_to_database: bool = False,
    community_id: Optional[str] = None,
    session_id: Optional[str] = None,
):
    """Internal function to analyze a paper from URL."""
    try:
        print(f"🔍 Starting URL analysis: {paper_url}")
        start_time = time.time()

        # Analyze with paper_mind_graph
        pmg = PaperMindGraph(paper_url, config=PMG_CONFIG, verbose=True)

        # Export to different formats
        markdown = pmg.to_markdown()
        mindmap = pmg.export("mermaid-mindmap")
        flowchart = pmg.export("mermaid-flowchart")
        html = pmg.export("html")
        json_data = json.loads(pmg.to_json())

        # Calculate statistics
        stats = {
            "concepts": pmg.num_concepts,
            "methods": pmg.num_methods,
            "experiments": len(pmg.get_experiments()),
            "figures": len(pmg.get_figures()),
            "tables": len(pmg.get_tables()),
            "nodes": len(pmg.graph.nodes),
            "edges": len(pmg.graph.edges),
        }

        processing_time = time.time() - start_time

        # Optionally save to database
        if save_to_database:
            # Create or find paper in database
            paper_data = {
                "title": pmg.title,
                "abstract": pmg.abstract,
                "arxiv_id": arxiv_id,
                "pdf_url": f"https://arxiv.org/pdf/{arxiv_id}.pdf",
            }

            # Check if paper exists
            existing_paper = supabase.table("papers").select("id").eq("arxiv_id", arxiv_id).maybe_single().execute()

            if existing_paper and existing_paper.data:
                paper_id = existing_paper.data["id"]
            else:
                # Insert new paper
                new_paper = supabase.table("papers").insert(paper_data).execute()
                paper_id = new_paper.data[0]["id"]

            # Save analysis
            save_analysis(
                paper_id=paper_id,
                analysis_data=json_data,
                markdown=markdown,
                mindmap=mindmap,
                flowchart=flowchart,
                html=html,
                stats=stats,
                processing_time=processing_time,
                user_id=user_id,
                community_id=community_id,
                session_id=session_id,
            )

        print(f"✅ URL analysis completed in {processing_time:.2f}s")
    except Exception as e:
        print(f"❌ URL analysis failed: {str(e)}")
        import traceback
        traceback.print_exc()

@app.post("/analyze/url", response_model=Dict[str, Any])
async def analyze_from_url(
    request: AnalyzeFromUrlRequest,
    background_tasks: BackgroundTasks,
    user_id: str = "system",
):
    """
    Analyze a paper directly from arXiv URL or ID.
    No need for paper to exist in database.

    Args:
        request: AnalyzeFromUrlRequest with url (arXiv URL or ID)
        background_tasks: FastAPI background tasks
        user_id: User ID from auth

    Returns:
        Status message - analysis runs in background
    """
    try:
        # Parse arXiv ID from URL or use directly
        arxiv_id = request.url
        if "arxiv.org" in request.url:
            # Extract ID from URL
            import re
            match = re.search(r'(\d+\.\d+)', request.url)
            if match:
                arxiv_id = match.group(1)
            else:
                raise HTTPException(status_code=400, detail="Invalid arXiv URL")

        # Construct full URL
        paper_url = f"https://arxiv.org/abs/{arxiv_id}" if not request.url.startswith("http") else request.url

        # Run analysis in background
        background_tasks.add_task(
            analyze_from_url_internal,
            arxiv_id,
            paper_url,
            user_id,
            request.save_to_database,
            request.community_id,
            request.session_id,
        )

        return {
            "status": "processing",
            "arxiv_id": arxiv_id,
            "message": "Analysis started. Check back in a few minutes."
        }

    except HTTPException:
        raise
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Failed to start analysis: {str(e)}")

@app.post("/analyze/paper", response_model=Dict[str, str])
async def analyze_paper(
    request: AnalyzePaperRequest,
    background_tasks: BackgroundTasks,
    user_id: str = "system",  # TODO: Get from auth header
):
    """
    Analyze a single paper using paper_mind_graph.

    Args:
        request: AnalyzePaperRequest with paper_id, optional community_id/session_id
        background_tasks: FastAPI background tasks
        user_id: User ID from auth (TODO: implement auth)

    Returns:
        Analysis ID and status
    """
    try:
        # Get paper info
        paper = get_paper_info(request.paper_id)

        # Check if analysis exists
        if not request.force_reanalyze:
            query = supabase.table("paper_analysis").select("id").eq("paper_id", request.paper_id)
            if request.community_id:
                query = query.eq("community_id", request.community_id)
            if request.session_id:
                query = query.eq("session_id", request.session_id)

            existing = query.execute()
            if existing.data:
                return {
                    "status": "exists",
                    "analysis_id": existing.data[0]["id"],
                    "message": "Analysis already exists. Use force_reanalyze=true to regenerate."
                }

        # Determine paper URL (prefer arxiv_id, fallback to pdf_url)
        paper_url = None
        if paper.get("arxiv_id"):
            paper_url = f"https://arxiv.org/abs/{paper['arxiv_id']}"
        elif paper.get("pdf_url"):
            paper_url = paper["pdf_url"]
        else:
            raise HTTPException(status_code=400, detail="Paper has no arxiv_id or pdf_url")

        # Run analysis in background
        background_tasks.add_task(
            analyze_paper_internal,
            request.paper_id,
            paper_url,
            user_id,
            request.community_id,
            request.session_id,
        )

        return {
            "status": "processing",
            "paper_id": request.paper_id,
            "message": "Analysis started. Check back in a few minutes."
        }

    except HTTPException:
        raise
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/analyze/session", response_model=Dict[str, Any])
async def analyze_session(
    request: AnalyzeSessionRequest,
    background_tasks: BackgroundTasks,
    user_id: str = "system",
):
    """
    Analyze all papers in a session.

    Args:
        request: AnalyzeSessionRequest with session_id
        background_tasks: FastAPI background tasks
        user_id: User ID from auth

    Returns:
        List of paper IDs being analyzed
    """
    try:
        # Get session papers
        result = supabase.table("session_papers").select("paper_id").eq("session_id", request.session_id).execute()

        if not result.data:
            raise HTTPException(status_code=404, detail="No papers found in session")

        paper_ids = [row["paper_id"] for row in result.data]

        # Start analysis for each paper
        for paper_id in paper_ids:
            paper = get_paper_info(paper_id)

            # Determine paper URL
            paper_url = None
            if paper.get("arxiv_id"):
                paper_url = f"https://arxiv.org/abs/{paper['arxiv_id']}"
            elif paper.get("pdf_url"):
                paper_url = paper["pdf_url"]
            else:
                continue  # Skip papers without URL

            # Run analysis in background
            background_tasks.add_task(
                analyze_paper_internal,
                paper_id,
                paper_url,
                user_id,
                request.community_id,
                request.session_id,
            )

        return {
            "status": "processing",
            "session_id": request.session_id,
            "paper_count": len(paper_ids),
            "paper_ids": paper_ids,
            "message": f"Analysis started for {len(paper_ids)} papers."
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/analysis/{analysis_id}", response_model=AnalysisResponse)
async def get_analysis(analysis_id: str):
    """
    Get stored analysis by ID.

    Args:
        analysis_id: Analysis ID

    Returns:
        Full analysis data
    """
    try:
        result = supabase.table("paper_analysis").select("*").eq("id", analysis_id).maybe_single().execute()

        if not result or not result.data:
            raise HTTPException(status_code=404, detail="Analysis not found")

        return result.data

    except HTTPException:
        raise
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/analysis/arxiv/{arxiv_id}")
async def get_arxiv_analysis(
    arxiv_id: str,
    community_id: Optional[str] = None,
    session_id: Optional[str] = None,
):
    """
    Get analysis for a paper by arXiv ID.

    Args:
        arxiv_id: arXiv ID (e.g., "1706.03762")
        community_id: Optional community context
        session_id: Optional session context

    Returns:
        Analysis data or 404
    """
    try:
        # First find the paper by arxiv_id
        paper_result = supabase.table("papers").select("id").eq("arxiv_id", arxiv_id).maybe_single().execute()

        if not paper_result or not paper_result.data:
            raise HTTPException(status_code=404, detail=f"No analysis found for arXiv ID: {arxiv_id}")

        paper_id = paper_result.data["id"]

        # Then get the analysis
        query = supabase.table("paper_analysis").select("*").eq("paper_id", paper_id)

        if community_id:
            query = query.eq("community_id", community_id)
        if session_id:
            query = query.eq("session_id", session_id)

        result = query.execute()

        if not result.data:
            raise HTTPException(status_code=404, detail=f"No analysis found for arXiv ID: {arxiv_id}")

        # Return the most recent analysis
        analysis = sorted(result.data, key=lambda x: x["created_at"], reverse=True)[0]

        return {
            "analysis_id": analysis["id"],
            "paper_id": analysis["paper_id"],
            "arxiv_id": arxiv_id,
            "status": "completed",
            "analysis_data": analysis["analysis_data"],
            "markdown_summary": analysis["markdown_summary"],
            "mindmap_mermaid": analysis["mindmap_mermaid"],
            "flowchart_mermaid": analysis["flowchart_mermaid"],
            "html_visualization": analysis["html_visualization"],
            "stats": {
                "concepts": analysis.get("concepts_count", 0),
                "methods": analysis.get("methods_count", 0),
                "experiments": analysis.get("experiments_count", 0),
                "figures": analysis.get("figures_count", 0),
                "tables": analysis.get("tables_count", 0),
                "nodes": analysis.get("nodes_count", 0),
                "edges": analysis.get("edges_count", 0),
            },
            "created_at": analysis["created_at"],
            "processing_time": analysis.get("processing_time"),
        }

    except HTTPException:
        raise
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/analysis/paper/{paper_id}")
async def get_paper_analysis(
    paper_id: str,
    community_id: Optional[str] = None,
    session_id: Optional[str] = None,
):
    """
    Get analysis for a specific paper.

    Args:
        paper_id: Paper ID
        community_id: Optional community context
        session_id: Optional session context

    Returns:
        Analysis data or 404
    """
    try:
        query = supabase.table("paper_analysis").select("*").eq("paper_id", paper_id)

        if community_id:
            query = query.eq("community_id", community_id)
        if session_id:
            query = query.eq("session_id", session_id)

        result = query.execute()

        if not result.data:
            raise HTTPException(status_code=404, detail="Analysis not found for this paper")

        return result.data[0]

    except HTTPException:
        raise
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/analysis/session/{session_id}")
async def get_session_analysis(session_id: str):
    """
    Get all analyses for papers in a session.

    Args:
        session_id: Session ID

    Returns:
        List of analyses
    """
    try:
        result = supabase.table("paper_analysis").select("*").eq("session_id", session_id).execute()

        return {
            "session_id": session_id,
            "analyses": result.data or [],
            "count": len(result.data or [])
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/analysis/circle/{community_id}/overview")
async def get_circle_analysis_overview(community_id: str):
    """
    Get analysis overview for a circle: all sessions, papers, and analysis status.

    Returns:
        - Sessions with papers and their analysis status
        - Papers not in any session with their analysis status
    """
    try:
        # Get all papers in this community
        community_papers_result = supabase.table("community_papers")\
            .select("paper_id, papers(*)")\
            .eq("community_id", community_id)\
            .execute()

        papers_map = {cp["paper_id"]: cp["papers"] for cp in community_papers_result.data} if community_papers_result.data else {}

        # Get all sessions in this community
        sessions_result = supabase.table("sessions")\
            .select("id, title, scheduled_for, status")\
            .eq("community_id", community_id)\
            .order("scheduled_for", desc=False)\
            .execute()

        sessions = sessions_result.data or []

        # Get session papers for all sessions
        session_papers_result = supabase.table("session_papers")\
            .select("session_id, paper_id, paper_type")\
            .in_("session_id", [s["id"] for s in sessions] if sessions else [""])\
            .execute()

        session_papers_map = {}
        papers_in_sessions = set()
        for sp in (session_papers_result.data or []):
            if sp["session_id"] not in session_papers_map:
                session_papers_map[sp["session_id"]] = []
            session_papers_map[sp["session_id"]].append(sp)
            papers_in_sessions.add(sp["paper_id"])

        # Get all analyses for papers in this community
        analyses_result = supabase.table("paper_analysis")\
            .select("paper_id, id, created_at, processing_time_seconds")\
            .eq("community_id", community_id)\
            .execute()

        analyses_map = {}
        for analysis in (analyses_result.data or []):
            if analysis["paper_id"] not in analyses_map:
                analyses_map[analysis["paper_id"]] = []
            analyses_map[analysis["paper_id"]].append(analysis)

        # Build sessions with papers
        sessions_with_papers = []
        for session in sessions:
            session_paper_ids = [sp["paper_id"] for sp in session_papers_map.get(session["id"], [])]
            papers_with_status = []

            for paper_id in session_paper_ids:
                paper = papers_map.get(paper_id)
                if paper:
                    has_analysis = paper_id in analyses_map
                    papers_with_status.append({
                        "id": paper_id,
                        "title": paper["title"],
                        "arxiv_id": paper.get("arxiv_id"),
                        "has_analysis": has_analysis,
                        "analysis_count": len(analyses_map.get(paper_id, [])),
                        "latest_analysis": analyses_map[paper_id][0] if has_analysis else None
                    })

            sessions_with_papers.append({
                "id": session["id"],
                "title": session["title"],
                "scheduled_for": session.get("scheduled_for"),
                "status": session.get("status"),
                "papers": papers_with_status,
                "papers_count": len(papers_with_status),
                "analyzed_count": sum(1 for p in papers_with_status if p["has_analysis"])
            })

        # Get papers not in any session
        papers_not_in_sessions = []
        for paper_id, paper in papers_map.items():
            if paper_id not in papers_in_sessions:
                has_analysis = paper_id in analyses_map
                papers_not_in_sessions.append({
                    "id": paper_id,
                    "title": paper["title"],
                    "arxiv_id": paper.get("arxiv_id"),
                    "has_analysis": has_analysis,
                    "analysis_count": len(analyses_map.get(paper_id, [])),
                    "latest_analysis": analyses_map[paper_id][0] if has_analysis else None
                })

        return {
            "community_id": community_id,
            "sessions": sessions_with_papers,
            "papers_without_session": papers_not_in_sessions,
            "total_papers": len(papers_map),
            "total_analyzed": len(analyses_map),
            "total_sessions": len(sessions)
        }

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/ask", response_model=QuestionResponse)
async def ask_question(request: AskQuestionRequest):
    """
    Ask a question about an analyzed paper.

    Args:
        request: AskQuestionRequest with analysis_id and question

    Returns:
        Answer with supporting evidence
    """
    try:
        # Get analysis
        result = supabase.table("paper_analysis").select("analysis_data").eq("id", request.analysis_id).single().execute()

        if not result.data:
            raise HTTPException(status_code=404, detail="Analysis not found")

        # Load graph from JSON
        from paper_mind_graph.schema import MindGraph
        graph = MindGraph.from_dict(result.data["analysis_data"])

        # Create QA system
        from paper_mind_graph.qa_system import PaperQA
        qa = PaperQA(graph, PMG_CONFIG.to_dict())

        # Ask question
        response = qa.ask(request.question)

        return QuestionResponse(
            answer=response.answer,
            relevant_sections=response.relevant_sections or [],
            relevant_figures=response.relevant_figures or [],
            relevant_tables=response.relevant_tables or [],
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ============================================================================
# Main
# ============================================================================

if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(app, host="0.0.0.0", port=8001)

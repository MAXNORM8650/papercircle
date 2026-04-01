"""
Analysis Router
===============
Paper analysis endpoints using paper_mind_graph.
Migrated from paper_analysis_api.py
"""

from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import json
import time
import sys
import shutil
from pathlib import Path

# Add agents to path
sys.path.insert(0, str(Path(__file__).parent.parent.parent.parent / "agents"))

from paper_mind_graph.api import PaperMindGraph, Config as PMGConfig

from ..config import (
    get_supabase,
    get_user_llm_config,
    get_default_llm_config,
    has_custom_llm_enabled,
    check_user_quota,
    record_usage,
    sanitize_text,
    sanitize_json,
    LLMConfig,
)
from ..process_manager import ProcessJobManager, update_job_progress, complete_job, fail_job

router = APIRouter(prefix="/analysis", tags=["Analysis"])

# =============================================================================
# Request/Response Models
# =============================================================================

class AnalyzePaperRequest(BaseModel):
    paper_id: str
    user_id: Optional[str] = None
    community_id: Optional[str] = None
    session_id: Optional[str] = None
    manual_url: Optional[str] = None
    force_reanalyze: bool = False

class AnalyzeFromUrlRequest(BaseModel):
    url: str
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
    user_id: Optional[str] = None

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

class TestLLMConnectionRequest(BaseModel):
    api_base: str
    provider: str

# =============================================================================
# Helper Functions
# =============================================================================

def _llm_config_to_pmg(config: LLMConfig) -> PMGConfig:
    """Convert LLMConfig to PaperMindGraph Config."""
    return PMGConfig(
        api_base=config.api_base,
        model_id=config.model_id,
        api_key=config.api_key,
        num_ctx=config.num_ctx,
        cache_dir=config.cache_dir,
        max_chunk_size=config.max_chunk_size,
    )

def get_paper_info(paper_id: str) -> Dict[str, Any]:
    """Fetch paper information from database."""
    try:
        supabase = get_supabase()
        result = supabase.table("papers").select("*").eq("id", paper_id).maybe_single().execute()
        if not result or not result.data:
            raise HTTPException(status_code=404, detail=f"Paper not found: {paper_id}")
        return result.data
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

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
    supabase = get_supabase()

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

    query = supabase.table("paper_analysis").select("id").eq("paper_id", paper_id)
    if community_id:
        query = query.eq("community_id", community_id)
    if session_id:
        query = query.eq("session_id", session_id)

    existing = query.execute()

    if existing.data:
        result = supabase.table("paper_analysis").update(data).eq("id", existing.data[0]["id"]).execute()
        return existing.data[0]["id"]
    else:
        result = supabase.table("paper_analysis").insert(data).execute()
        return result.data[0]["id"]

# =============================================================================
# Process Target Function
# =============================================================================

def _run_analysis_process(
    status_file: str,
    paper_id: str,
    paper_url: str,
    user_id: str,
    community_id: Optional[str] = None,
    session_id: Optional[str] = None,
):
    """Target function that runs paper analysis in a child process."""
    import sys
    from pathlib import Path
    sys.path.insert(0, str(Path(__file__).parent.parent.parent.parent / "agents"))

    start_time = time.time()
    analysis_id = None
    success = False
    error_message = None
    used_custom_llm = False
    llm_provider = "default"

    try:
        from ..config import (
            get_user_llm_config, get_default_llm_config, record_usage,
            sanitize_json, sanitize_text,
        )

        default_config = get_default_llm_config()
        config = get_user_llm_config(user_id)
        used_custom_llm = config != default_config

        if used_custom_llm:
            if "ollama" in config.api_base.lower():
                llm_provider = "ollama"
            elif "openai" in config.api_base.lower():
                llm_provider = "openai"
            elif "anthropic" in config.api_base.lower():
                llm_provider = "anthropic"
            else:
                llm_provider = "custom"

        update_job_progress(status_file, progress=5, message=f"Analyzing paper with {llm_provider}...")

        pmg_config = _llm_config_to_pmg(config)
        pmg = PaperMindGraph(paper_url, config=pmg_config, verbose=True)

        update_job_progress(status_file, progress=30, message="Extracting concepts and methods...")

        markdown = pmg.to_markdown()
        update_job_progress(status_file, progress=50, message="Generating mind map...")

        mindmap = pmg.export("mermaid-mindmap")
        flowchart = pmg.export("mermaid-flowchart")
        update_job_progress(status_file, progress=70, message="Generating visualizations...")

        html = pmg.export("html")
        json_data = json.loads(pmg.to_json())

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

        update_job_progress(status_file, progress=90, message="Saving to database...")

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

        success = True
        print(f"Analysis completed in {processing_time:.2f}s. Saved as {analysis_id}")
        complete_job(status_file, result={"analysis_id": analysis_id, "paper_id": paper_id})

    except Exception as e:
        error_message = str(e)
        processing_time = time.time() - start_time
        print(f"Analysis failed: {error_message}")
        fail_job(status_file, error_message)

    finally:
        if user_id and user_id != "system":
            try:
                from ..config import record_usage
                record_usage(
                    user_id=user_id,
                    paper_id=paper_id,
                    analysis_id=analysis_id,
                    used_custom_llm=used_custom_llm,
                    llm_provider=llm_provider,
                    processing_time=processing_time,
                    success=success,
                    error_message=error_message
                )
            except Exception:
                pass

# =============================================================================
# Endpoints
# =============================================================================

@router.get("/quota/{user_id}")
async def get_user_quota(user_id: str):
    """Get user's current quota status and usage."""
    try:
        quota = check_user_quota(user_id)
        return {
            "has_quota": quota['has_quota'],
            "used_today": quota['used_today'],
            "daily_limit": quota['daily_limit'],
            "is_unlimited": quota['is_unlimited'],
            "remaining": max(0, quota['daily_limit'] - quota['used_today']) if not quota['is_unlimited'] else -1
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get quota: {str(e)}")

@router.post("/paper", response_model=Dict[str, str])
async def analyze_paper(request: AnalyzePaperRequest):
    """Analyze a single paper using paper_mind_graph."""
    try:
        user_id = request.user_id or "system"
        supabase = get_supabase()

        if user_id != "system" and not has_custom_llm_enabled(user_id):
            quota = check_user_quota(user_id)
            if not quota['has_quota'] and not quota['is_unlimited']:
                return {
                    "status": "quota_exceeded",
                    "message": f"Daily limit reached ({quota['used_today']}/{quota['daily_limit']})",
                    "used_today": str(quota['used_today']),
                    "daily_limit": str(quota['daily_limit'])
                }

        # Determine the paper URL and paper_id
        paper_url = request.manual_url
        paper_id = request.paper_id

        # If we have a paper_id, fetch paper info
        paper = None
        if paper_id:
            paper = get_paper_info(paper_id)

            if not request.force_reanalyze:
                query = supabase.table("paper_analysis").select("id").eq("paper_id", paper_id)
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

        # Determine the URL to analyze
        if not paper_url and paper:
            if paper.get("arxiv_id"):
                paper_url = f"https://arxiv.org/abs/{paper['arxiv_id']}"
            elif paper.get("pdf_url"):
                paper_url = paper["pdf_url"]

        if not paper_url:
            raise HTTPException(status_code=400, detail="No paper URL available. Provide manual_url or a valid paper_id.")

        # If no paper_id but we have a URL, create a temporary paper record
        if not paper_id and paper_url:
            import uuid
            paper_id = str(uuid.uuid4())
            new_paper = {
                "id": paper_id,
                "title": f"Paper from URL: {paper_url[:50]}...",
                "pdf_url": paper_url,
            }
            supabase.table("papers").insert(new_paper).execute()

        # Generate job ID and start as a separate OS process
        import uuid
        job_id = str(uuid.uuid4())[:12]

        manager = ProcessJobManager.instance()
        manager.start_job(
            job_id=job_id,
            job_type="analysis",
            target=_run_analysis_process,
            args=(paper_id, paper_url, user_id, request.community_id, request.session_id),
        )

        return {
            "status": "processing",
            "paper_id": paper_id,
            "job_id": job_id,
            "message": "Analysis started. Poll /analysis/status/{job_id} for progress."
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/status/{job_id}")
async def get_analysis_status(job_id: str):
    """Get status of an analysis job (for polling and reconnection)."""
    manager = ProcessJobManager.instance()
    status = manager.get_status(job_id)

    if not status:
        raise HTTPException(status_code=404, detail="Job not found")

    return {
        "job_id": job_id,
        "status": status.get("status", "unknown"),
        "progress": status.get("progress"),
        "message": status.get("message"),
        "result": status.get("result"),
    }

@router.post("/cancel/{job_id}")
async def cancel_analysis(job_id: str):
    """Cancel an active analysis job by terminating its process."""
    manager = ProcessJobManager.instance()
    return manager.cancel_job(job_id)

@router.post("/upload", response_model=Dict[str, str])
async def analyze_upload(
    file: UploadFile = File(...),
    paper_id: Optional[str] = Form(None),
    user_id: Optional[str] = Form(None),
    community_id: Optional[str] = Form(None),
    session_id: Optional[str] = Form(None),
    force_reanalyze: bool = Form(False)
):
    """Analyze a paper by uploading a PDF file directly."""
    try:
        if not file.filename or not file.filename.endswith('.pdf'):
            raise HTTPException(status_code=400, detail="Only PDF files are supported")

        user_id_to_use = user_id or "system"
        supabase = get_supabase()
        default_config = get_default_llm_config()

        if user_id_to_use != "system" and not has_custom_llm_enabled(user_id_to_use):
            quota = check_user_quota(user_id_to_use)
            if not quota['has_quota'] and not quota['is_unlimited']:
                return {
                    "status": "quota_exceeded",
                    "message": f"Daily limit reached ({quota['used_today']}/{quota['daily_limit']})",
                }

        cache_dir = Path(default_config.cache_dir)
        cache_dir.mkdir(parents=True, exist_ok=True)

        import uuid
        file_id = str(uuid.uuid4())[:12]
        pdf_filename = f"paper_{file_id}.pdf"
        pdf_path = cache_dir / pdf_filename

        with pdf_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        if paper_id and not force_reanalyze:
            query = supabase.table("paper_analysis").select("id").eq("paper_id", paper_id)
            if community_id:
                query = query.eq("community_id", community_id)
            if session_id:
                query = query.eq("session_id", session_id)

            existing = query.execute()
            if existing.data:
                if pdf_path.exists():
                    pdf_path.unlink()
                return {
                    "status": "exists",
                    "analysis_id": existing.data[0]["id"],
                    "message": "Analysis already exists."
                }

        if not paper_id:
            try:
                config = get_user_llm_config(user_id_to_use)
                pmg_config = _llm_config_to_pmg(config)
                pmg_temp = PaperMindGraph(str(pdf_path), config=pmg_config, verbose=False)

                paper_data = {
                    "title": pmg_temp.title or file.filename.replace('.pdf', ''),
                    "abstract": pmg_temp.abstract or "",
                    "pdf_url": f"uploaded:{file.filename}",
                }

                result = supabase.table("papers").insert(paper_data).execute()
                paper_id = result.data[0]["id"]
            except Exception as e:
                paper_data = {
                    "title": file.filename.replace('.pdf', ''),
                    "pdf_url": f"uploaded:{file.filename}",
                }
                result = supabase.table("papers").insert(paper_data).execute()
                paper_id = result.data[0]["id"]

        # Start analysis as a separate OS process
        job_id = str(uuid.uuid4())[:12]

        manager = ProcessJobManager.instance()
        manager.start_job(
            job_id=job_id,
            job_type="analysis",
            target=_run_analysis_process,
            args=(paper_id, str(pdf_path), user_id_to_use, community_id, session_id),
        )

        return {
            "status": "processing",
            "paper_id": paper_id,
            "job_id": job_id,
            "message": "Analysis started from uploaded PDF."
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        await file.close()

@router.get("/paper/{paper_id}")
async def get_paper_analysis(
    paper_id: str,
    community_id: Optional[str] = None,
    session_id: Optional[str] = None,
):
    """Get analysis for a specific paper."""
    try:
        supabase = get_supabase()
        query = supabase.table("paper_analysis").select("*").eq("paper_id", paper_id)
        if community_id:
            query = query.eq("community_id", community_id)
        if session_id:
            query = query.eq("session_id", session_id)

        result = query.execute()
        if not result.data:
            return {"status": "not_found", "message": "Analysis not found"}
        return result.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/circle/{community_id}/overview")
async def get_circle_analysis_overview(community_id: str):
    """Get analysis overview for a circle."""
    try:
        supabase = get_supabase()

        community_papers_result = supabase.table("community_papers")\
            .select("paper_id, papers(*)")\
            .eq("community_id", community_id)\
            .execute()

        papers_map = {cp["paper_id"]: cp["papers"] for cp in community_papers_result.data} if community_papers_result.data else {}

        sessions_result = supabase.table("sessions")\
            .select("id, title, scheduled_for, status")\
            .eq("community_id", community_id)\
            .order("scheduled_for", desc=False)\
            .execute()

        sessions = sessions_result.data or []

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

        analyses_result = supabase.table("paper_analysis")\
            .select("paper_id, id, created_at, processing_time_seconds")\
            .eq("community_id", community_id)\
            .execute()

        analyses_map = {}
        for analysis in (analyses_result.data or []):
            if analysis["paper_id"] not in analyses_map:
                analyses_map[analysis["paper_id"]] = []
            analyses_map[analysis["paper_id"]].append(analysis)

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
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/ask", response_model=QuestionResponse)
async def ask_question(request: AskQuestionRequest):
    """Ask a question about an analyzed paper."""
    try:
        supabase = get_supabase()
        result = supabase.table("paper_analysis").select("analysis_data").eq("id", request.analysis_id).single().execute()
        if not result.data:
            raise HTTPException(status_code=404, detail="Analysis not found")

        from paper_mind_graph.schema import MindGraph
        from paper_mind_graph.qa_system import PaperQA

        # Use user's LLM config if available
        user_id = request.user_id or "system"
        config = get_user_llm_config(user_id)

        graph = MindGraph.from_dict(result.data["analysis_data"])
        qa = PaperQA(graph, {
            "api_base": config.api_base,
            "model_id": config.model_id,
            "api_key": config.api_key,
            "num_ctx": config.num_ctx,
        })
        response = qa.ask(request.question)

        return QuestionResponse(
            answer=response.answer,
            relevant_sections=response.relevant_sections or [],
            relevant_figures=response.relevant_figures or [],
            relevant_tables=response.relevant_tables or [],
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/list")
async def list_analyzed_papers(
    community_id: Optional[str] = None,
    session_id: Optional[str] = None,
    user_id: Optional[str] = None
):
    """List papers with analysis."""
    try:
        supabase = get_supabase()
        query = supabase.table("paper_analysis").select(
            "id, paper_id, created_at, concepts_count, methods_count, "
            "experiments_count, processing_time_seconds, "
            "papers:paper_id (id, title, authors, arxiv_id, year, venue)"
        )

        if community_id:
            query = query.eq("community_id", community_id)
        if session_id:
            query = query.eq("session_id", session_id)
        if user_id:
            query = query.eq("created_by", user_id)

        query = query.order("created_at", desc=True)
        result = query.execute()
        return {"papers": result.data or []}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/test-llm-connection")
async def test_llm_connection(request: TestLLMConnectionRequest):
    """Test connection to an LLM server."""
    import httpx

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            if request.provider == "ollama":
                response = await client.get(f"{request.api_base}/api/tags")
                if response.status_code == 200:
                    data = response.json()
                    models = [model.get("name", "unknown") for model in data.get("models", [])]
                    return {
                        "success": True,
                        "message": f"Connected! Found {len(models)} models.",
                        "models": models[:5]
                    }
                return {"success": False, "message": f"Status {response.status_code}"}
            else:
                response = await client.get(request.api_base, timeout=5.0)
                return {"success": response.status_code < 500, "message": f"Status {response.status_code}"}
    except httpx.ConnectError:
        return {"success": False, "message": f"Cannot connect to {request.api_base}"}
    except httpx.TimeoutException:
        return {"success": False, "message": "Connection timeout"}
    except Exception as e:
        return {"success": False, "message": str(e)}

@router.get("/session/{session_id}")
async def get_session_analysis(session_id: str):
    """Get all analyses for papers in a session."""
    try:
        supabase = get_supabase()
        result = supabase.table("paper_analysis").select("*").eq("session_id", session_id).execute()

        return {
            "session_id": session_id,
            "analyses": result.data or [],
            "count": len(result.data or [])
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/session", response_model=Dict[str, Any])
async def analyze_session(request: AnalyzeSessionRequest):
    """Analyze all papers in a session."""
    try:
        user_id = "system"
        supabase = get_supabase()

        # Get session papers
        result = supabase.table("session_papers").select("paper_id").eq("session_id", request.session_id).execute()

        if not result.data:
            raise HTTPException(status_code=404, detail="No papers found in session")

        paper_ids = [row["paper_id"] for row in result.data]
        analyzed_count = 0
        job_ids = []
        manager = ProcessJobManager.instance()

        # Start analysis for each paper as a separate process
        for paper_id in paper_ids:
            try:
                paper = get_paper_info(paper_id)

                paper_url = None
                if paper.get("arxiv_id"):
                    paper_url = f"https://arxiv.org/abs/{paper['arxiv_id']}"
                elif paper.get("pdf_url"):
                    paper_url = paper["pdf_url"]
                else:
                    continue

                if not request.force_reanalyze:
                    existing = supabase.table("paper_analysis")\
                        .select("id")\
                        .eq("paper_id", paper_id)\
                        .eq("session_id", request.session_id)\
                        .execute()
                    if existing.data:
                        continue

                import uuid
                job_id = str(uuid.uuid4())[:12]

                manager.start_job(
                    job_id=job_id,
                    job_type="analysis",
                    target=_run_analysis_process,
                    args=(paper_id, paper_url, user_id, request.community_id, request.session_id),
                )

                job_ids.append(job_id)
                analyzed_count += 1

            except Exception as e:
                print(f"Error queuing paper {paper_id}: {e}")
                continue

        return {
            "status": "processing",
            "session_id": request.session_id,
            "paper_count": analyzed_count,
            "total_papers": len(paper_ids),
            "job_ids": job_ids,
            "message": f"Started analysis for {analyzed_count} papers"
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# =============================================================================
# Catch-all route — MUST be last to avoid swallowing specific routes
# =============================================================================

@router.get("/{analysis_id}", response_model=AnalysisResponse)
async def get_analysis(analysis_id: str):
    """Get stored analysis by ID."""
    try:
        supabase = get_supabase()
        result = supabase.table("paper_analysis").select("*").eq("id", analysis_id).maybe_single().execute()
        if not result or not result.data:
            raise HTTPException(status_code=404, detail="Analysis not found")
        return result.data
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

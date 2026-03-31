"""
Review Router
=============
Paper review endpoints using multi-agent system.
Exposes paper_review_api.py functionality as REST endpoints.
"""

from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import json
import time
import sys
import tempfile
import shutil
from pathlib import Path

# Add agents to path
sys.path.insert(0, str(Path(__file__).parent.parent.parent.parent / "agents"))

from ..config import (
    get_supabase,
    get_user_llm_config,
    get_default_llm_config,
    has_custom_llm_enabled,
    check_user_quota,
    record_usage,
    sanitize_json,
    LLMConfig,
)
from ..process_manager import ProcessJobManager, update_job_progress, complete_job, fail_job

router = APIRouter(prefix="/review", tags=["Review"])

# =============================================================================
# Request/Response Models
# =============================================================================

class ReviewRequest(BaseModel):
    paper_url: str
    paper_id: Optional[str] = None
    user_id: Optional[str] = None
    community_id: Optional[str] = None
    include_lineage: bool = True
    include_graph: bool = True
    output_format: str = "markdown"  # "markdown", "json", "html"

class QuickReviewRequest(BaseModel):
    paper_url: str
    user_id: Optional[str] = None
    review_type: str = "summary"  # "summary", "critique", "reproducibility"

class CompareRequest(BaseModel):
    paper_urls: List[str]
    user_id: Optional[str] = None

class RelatedPapersRequest(BaseModel):
    paper_url: str
    max_papers: int = 10

class ReviewStatusResponse(BaseModel):
    job_id: str
    status: str  # "pending", "processing", "completed", "failed", "cancelled"
    progress: Optional[int] = None
    message: Optional[str] = None
    result: Optional[Dict[str, Any]] = None

# =============================================================================
# Helper Functions
# =============================================================================

def _get_reviewer(user_id: Optional[str]):
    """Get PaperReviewer instance with user's LLM config."""
    from paper_review_agents.orchestrator import MultiAgentOrchestrator, Config as OrchestratorConfig

    config = get_user_llm_config(user_id)

    internal_config = OrchestratorConfig(
        api_base=config.api_base,
        model_id=config.model_id,
        api_key=config.api_key,
        num_ctx=config.num_ctx,
        cache_dir=config.cache_dir
    )

    return MultiAgentOrchestrator(internal_config)

def _update_review_db_status(paper_id: Optional[str], status: str, error_message: Optional[str] = None):
    """Helper to update review status in database."""
    if not paper_id:
        return
    try:
        supabase = get_supabase()
        update_data = {"status": status}
        if error_message:
            update_data["error_message"] = error_message
        supabase.table("paper_reviews").update(update_data).eq("paper_id", paper_id).execute()
    except Exception as e:
        print(f"Warning: Could not update review status in database: {e}")


def _create_paper_from_metadata(metadata: dict, paper_url: str, user_id: Optional[str] = None, community_id: Optional[str] = None) -> Optional[str]:
    """Create a paper record in the database from extracted metadata. Returns paper_id."""
    try:
        supabase = get_supabase()

        # Extract arxiv_id from URL if present
        arxiv_id = None
        if "arxiv.org" in paper_url:
            import re
            match = re.search(r'(\d{4}\.\d{4,5})', paper_url)
            if match:
                arxiv_id = match.group(1)

        # Check if paper already exists by arxiv_id or title
        if arxiv_id:
            existing = supabase.table("papers").select("id").eq("arxiv_id", arxiv_id).execute()
            if existing.data:
                return existing.data[0]["id"]

        title = metadata.get("title", "Unknown Title")
        if title and title != "Unknown Title":
            existing = supabase.table("papers").select("id").eq("title", title).execute()
            if existing.data:
                return existing.data[0]["id"]

        # Create new paper record
        paper_record = {
            "title": title,
            "authors": metadata.get("authors", []),
            "abstract": metadata.get("abstract", ""),
            "arxiv_id": arxiv_id,
            "pdf_url": paper_url if paper_url.endswith(".pdf") else None,
            "source": "url_review",
        }

        # Add user_id if provided
        if user_id and user_id != "system":
            paper_record["added_by"] = user_id

        result = supabase.table("papers").insert(paper_record).execute()
        if result.data:
            new_paper_id = result.data[0]["id"]
            print(f"Created new paper record: {new_paper_id} for '{title}'")

            # If community_id provided, also add to community_papers
            if community_id:
                try:
                    supabase.table("community_papers").insert({
                        "community_id": community_id,
                        "paper_id": new_paper_id,
                        "added_by": user_id if user_id != "system" else None,
                    }).execute()
                except Exception as e:
                    print(f"Warning: Could not add paper to community: {e}")

            return new_paper_id
        return None
    except Exception as e:
        print(f"Warning: Could not create paper record: {e}")
        return None


# =============================================================================
# Process Target Functions
# =============================================================================

def _run_review_process(
    status_file: str,
    job_id: str,
    paper_url: str,
    paper_id: Optional[str],
    user_id: Optional[str],
    community_id: Optional[str],
    include_lineage: bool,
    include_graph: bool,
):
    """Target function that runs full paper review in a child process."""
    import sys
    from pathlib import Path
    sys.path.insert(0, str(Path(__file__).parent.parent.parent.parent / "agents"))

    start_time = time.time()

    try:
        from ..config import (
            get_supabase, get_user_llm_config, get_default_llm_config,
            record_usage, sanitize_json,
        )

        default_config = get_default_llm_config()
        config = get_user_llm_config(user_id)
        used_custom_llm = config.api_base != default_config.api_base

        llm_provider = "default"
        if used_custom_llm:
            if "ollama" in config.api_base.lower():
                llm_provider = "ollama"
            elif "openai" in config.api_base.lower():
                llm_provider = "openai"
            elif "anthropic" in config.api_base.lower():
                llm_provider = "anthropic"
            else:
                llm_provider = "custom"

        update_job_progress(status_file, progress=5, message="Initializing review agents...")
        _update_review_db_status(paper_id, "processing")

        update_job_progress(status_file, progress=10, message="Running multi-agent review pipeline...")
        orchestrator = _get_reviewer(user_id)
        results = orchestrator.run_pipeline(paper_url, parallel=True)

        update_job_progress(status_file, progress=60, message="Review pipeline complete")

        # If no paper_id provided, create paper record from extracted metadata
        if not paper_id:
            metadata = results.get("stages", {}).get("pdf_processing", {}).get("metadata", {})
            if metadata:
                paper_id = _create_paper_from_metadata(metadata, paper_url, user_id, community_id)

        # Extract lineage if requested
        lineage_data = []
        if include_lineage:
            try:
                update_job_progress(status_file, progress=70, message="Extracting paper lineage (LLM-powered)...")
                from paper_review_agents.lineage_extractor import LineageExtractor
                lineage_extractor = LineageExtractor(
                    verbose=True,
                    llm_config={
                        "model_id": config.model_id,
                        "api_base": config.api_base,
                        "api_key": config.api_key,
                        "num_ctx": config.num_ctx,
                    },
                )
                lineage_relationships = lineage_extractor.extract_all_relationships(results)
                lineage_data = [edge.to_dict() for edge in lineage_relationships]
                update_job_progress(status_file, progress=80, message="Lineage extraction complete")
            except Exception as e:
                print(f"Lineage extraction failed: {e}")

        # Generate graph if requested
        graph_data = None
        if include_graph:
            try:
                update_job_progress(status_file, progress=85, message="Generating knowledge graph...")
                from paper_review_agents.graph_generator import GraphGenerator
                graph_generator = GraphGenerator(verbose=True)
                graph_data = graph_generator.generate_graph(results)
                update_job_progress(status_file, progress=90, message="Graph generation complete")
            except Exception as e:
                print(f"Graph generation failed: {e}")

        processing_time = time.time() - start_time

        # Build final result
        review_result = {
            "paper_url": paper_url,
            "paper_id": paper_id,
            "status": "complete",
            "review_data": {
                "conference_review": results.get("stages", {}).get("critic", {}).get("result"),
                "deep_analysis": results.get("stages", {}).get("deep_analyzer", {}).get("result"),
                "contributions": results.get("stages", {}).get("contribution_analyzer", {}).get("result"),
                "reproducibility": results.get("stages", {}).get("reproducibility_checker", {}).get("result"),
                "summary": results.get("stages", {}).get("summarizer", {}).get("result"),
                "literature": results.get("stages", {}).get("literature", {}),
                "final_report": results.get("final_report"),
            },
            "graph_data": graph_data,
            "lineage_relationships": lineage_data,
            "processing_time": processing_time,
            "metadata": results.get("stages", {}).get("pdf_processing", {}).get("metadata", {}),
            "llm_provider": llm_provider,
        }

        # Save to database
        if paper_id:
            try:
                supabase = get_supabase()
                review_record = {
                    "paper_id": paper_id,
                    "community_id": community_id,
                    "review_data": sanitize_json(review_result["review_data"]),
                    "graph_data": sanitize_json(graph_data) if graph_data else None,
                    "lineage_data": sanitize_json(lineage_data),
                    "processing_time_seconds": processing_time,
                    "created_by": None if user_id == "system" else user_id,
                    "status": "completed",
                    "error_message": None,
                }

                existing = supabase.table("paper_reviews").select("id").eq("paper_id", paper_id).execute()
                if existing.data:
                    supabase.table("paper_reviews").update(review_record).eq("id", existing.data[0]["id"]).execute()
                    review_result["review_id"] = existing.data[0]["id"]
                else:
                    result = supabase.table("paper_reviews").insert(review_record).execute()
                    review_result["review_id"] = result.data[0]["id"]
            except Exception as e:
                print(f"Failed to save review to database: {e}")

        # Save lineage edges to the `edges` table (for LineageGraphTab)
        if paper_id and lineage_data:
            try:
                update_job_progress(status_file, progress=95, message="Saving lineage edges to graph...")
                from paper_review_agents.database_manager import find_and_save_edges
                edge_stats = find_and_save_edges(
                    source_paper_id=paper_id,
                    extracted_edges=lineage_data,
                    community_id=community_id,
                )
                print(f"Lineage edges saved: {edge_stats.get('saved', 0)}/{edge_stats.get('total_extracted', 0)} "
                      f"(matched={edge_stats.get('matched', 0)}, not_matched={edge_stats.get('not_matched', 0)})")
                review_result["lineage_stats"] = edge_stats
            except Exception as e:
                print(f"Failed to save lineage edges: {e}")

        # Record usage
        if user_id and user_id != "system":
            record_usage(
                user_id=user_id,
                paper_id=paper_id,
                analysis_id=review_result.get("review_id"),
                used_custom_llm=used_custom_llm,
                llm_provider=llm_provider,
                processing_time=processing_time,
                success=True,
            )

        complete_job(status_file, result=review_result)

    except Exception as e:
        processing_time = time.time() - start_time
        error_msg = str(e)
        print(f"Review failed: {error_msg}")
        _update_review_db_status(paper_id, "failed", error_msg)

        if user_id and user_id != "system":
            try:
                from ..config import record_usage
                record_usage(
                    user_id=user_id,
                    paper_id=paper_id,
                    analysis_id=None,
                    used_custom_llm=False,
                    llm_provider="unknown",
                    processing_time=processing_time,
                    success=False,
                    error_message=error_msg,
                )
            except Exception:
                pass

        fail_job(status_file, error_msg)


def _run_review_from_file_process(
    status_file: str,
    job_id: str,
    pdf_path: str,
    paper_id: Optional[str],
    user_id: Optional[str],
    community_id: Optional[str],
    include_graph: bool,
    include_lineage: bool,
    temp_dir: str,
):
    """Target function that runs full paper review from uploaded PDF in a child process."""
    try:
        # Delegate to the same logic but with file:// URL
        _run_review_process(
            status_file=status_file,
            job_id=job_id,
            paper_url=f"file://{pdf_path}",
            paper_id=paper_id,
            user_id=user_id,
            community_id=community_id,
            include_lineage=include_lineage,
            include_graph=include_graph,
        )
    finally:
        # Clean up temp directory
        try:
            shutil.rmtree(temp_dir, ignore_errors=True)
        except Exception:
            pass


# =============================================================================
# Endpoints
# =============================================================================

@router.post("/full", response_model=Dict[str, str])
async def start_full_review(request: ReviewRequest):
    """
    Start a full comprehensive paper review.

    This runs the complete multi-agent review pipeline including:
    - Paper summarization
    - Critical analysis
    - Contribution assessment
    - Reproducibility check
    - Literature context
    - Lineage extraction (optional)
    - Graph generation (optional)

    Returns a job_id to poll for status.
    """
    user_id = request.user_id or "system"

    # Check quota
    if user_id != "system" and not has_custom_llm_enabled(user_id):
        quota = check_user_quota(user_id)
        if not quota['has_quota'] and not quota['is_unlimited']:
            return {
                "status": "quota_exceeded",
                "message": f"Daily limit reached ({quota['used_today']}/{quota['daily_limit']})",
            }

    # Generate job ID
    import uuid
    job_id = str(uuid.uuid4())[:12]

    # Persist job status to database immediately for recovery after page refresh
    if request.paper_id:
        try:
            supabase = get_supabase()
            existing = supabase.table("paper_reviews").select("id, status").eq("paper_id", request.paper_id).execute()

            if existing.data and existing.data[0].get("status") in ["pending", "processing"]:
                existing_job_id = existing.data[0].get("job_id")
                if existing_job_id:
                    # Check if the process is still alive
                    manager = ProcessJobManager.instance()
                    if manager.is_alive(existing_job_id):
                        return {
                            "status": "already_processing",
                            "job_id": existing_job_id,
                            "message": "Review already in progress. Resuming polling."
                        }

            review_record = {
                "paper_id": request.paper_id,
                "community_id": request.community_id,
                "created_by": None if user_id == "system" else user_id,
                "status": "pending",
                "job_id": job_id,
                "started_at": "now()",
            }

            if existing.data:
                supabase.table("paper_reviews").update(review_record).eq("id", existing.data[0]["id"]).execute()
            else:
                supabase.table("paper_reviews").insert(review_record).execute()
        except Exception as e:
            print(f"Warning: Could not persist review status to database: {e}")

    # Start review as a separate OS process
    manager = ProcessJobManager.instance()
    manager.start_job(
        job_id=job_id,
        job_type="review",
        target=_run_review_process,
        args=(
            job_id,
            request.paper_url,
            request.paper_id,
            user_id,
            request.community_id,
            request.include_lineage,
            request.include_graph,
        ),
    )

    return {
        "status": "started",
        "job_id": job_id,
        "message": "Review started. Poll /review/status/{job_id} for progress."
    }

@router.get("/status/{job_id}", response_model=ReviewStatusResponse)
async def get_review_status(job_id: str):
    """Get status of a review job."""
    manager = ProcessJobManager.instance()
    status = manager.get_status(job_id)

    if not status:
        raise HTTPException(status_code=404, detail="Job not found")

    return ReviewStatusResponse(
        job_id=job_id,
        status=status.get("status", "unknown"),
        progress=status.get("progress"),
        message=status.get("message"),
        result=status.get("result"),
    )

@router.post("/cancel/{job_id}")
async def cancel_review(job_id: str):
    """Cancel an active review job by terminating its process."""
    manager = ProcessJobManager.instance()
    result = manager.cancel_job(job_id)

    # Also update DB status
    try:
        status = manager.get_status(job_id)
        if status:
            # Try to find and update the paper_reviews record
            supabase = get_supabase()
            supabase.table("paper_reviews").update({
                "status": "cancelled",
                "error_message": "Cancelled by user",
            }).eq("job_id", job_id).execute()
    except Exception:
        pass

    return result

@router.post("/quick", response_model=Dict[str, Any])
async def quick_review(request: QuickReviewRequest):
    """
    Run a quick single-agent review.

    Types:
    - summary: Multi-level paper summary
    - critique: Critical review only
    - reproducibility: Reproducibility assessment
    """
    user_id = request.user_id or "system"

    try:
        from paper_review_agents.orchestrator import AgentRole

        orchestrator = _get_reviewer(user_id)

        if request.review_type == "summary":
            results = orchestrator.run_pipeline(
                request.paper_url,
                agents_to_run=[AgentRole.SUMMARIZER]
            )
            return {
                "type": "summary",
                "result": results.get("stages", {}).get("summarizer", {}).get("result"),
            }

        elif request.review_type == "critique":
            results = orchestrator.run_pipeline(
                request.paper_url,
                agents_to_run=[AgentRole.CRITIC]
            )
            return {
                "type": "critique",
                "result": results.get("stages", {}).get("critic", {}).get("result"),
            }

        elif request.review_type == "reproducibility":
            from paper_review_agents.paper_review_system import download_pdf, extract_text_from_pdf
            from paper_review_agents.specialized_agents import check_reproducibility

            pdf_path = download_pdf(request.paper_url)
            paper_text = extract_text_from_pdf(pdf_path)
            result = check_reproducibility(paper_text)

            return {
                "type": "reproducibility",
                "result": json.loads(result),
            }

        else:
            raise HTTPException(status_code=400, detail=f"Unknown review type: {request.review_type}")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/compare", response_model=Dict[str, Any])
async def compare_papers(request: CompareRequest):
    """Compare multiple papers."""
    if len(request.paper_urls) < 2:
        raise HTTPException(status_code=400, detail="Need at least 2 papers to compare")

    if len(request.paper_urls) > 5:
        raise HTTPException(status_code=400, detail="Maximum 5 papers for comparison")

    try:
        from paper_review_agents.paper_review_system import (
            download_pdf,
            extract_text_from_pdf,
            extract_paper_metadata
        )

        papers_info = []
        for url in request.paper_urls:
            pdf_path = download_pdf(url)
            text = extract_text_from_pdf(pdf_path)
            metadata = json.loads(extract_paper_metadata(text))
            papers_info.append({
                "url": url,
                "metadata": metadata,
                "text": text[:10000]
            })

        orchestrator = _get_reviewer(request.user_id)

        comparison_prompt = "Compare these papers:\n\n"
        for i, paper in enumerate(papers_info, 1):
            comparison_prompt += f"Paper {i}: {paper['metadata'].get('title', 'Unknown')}\n"
            comparison_prompt += f"Abstract: {paper['metadata'].get('abstract', '')[:500]}\n\n"

        comparison_prompt += """
Provide:
1. Key similarities
2. Key differences
3. Which paper is more novel
4. Which has stronger experiments
5. Overall comparison table
"""

        result = orchestrator.analysis_agent.run(comparison_prompt)

        return {
            "papers": [p["metadata"] for p in papers_info],
            "comparison": result,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/related", response_model=Dict[str, Any])
async def find_related_papers(request: RelatedPapersRequest):
    """Find papers related to the given paper."""
    try:
        from paper_review_agents.paper_review_system import (
            download_pdf,
            extract_text_from_pdf,
            extract_paper_metadata,
            search_semantic_scholar,
            search_arxiv
        )

        pdf_path = download_pdf(request.paper_url)
        paper_text = extract_text_from_pdf(pdf_path)
        metadata = json.loads(extract_paper_metadata(paper_text))

        title = metadata.get("title", "")

        ss_results = json.loads(search_semantic_scholar(title[:100], limit=request.max_papers // 2))
        arxiv_results = json.loads(search_arxiv(title[:100], max_results=request.max_papers // 2))

        related = []

        if isinstance(ss_results, list):
            for paper in ss_results:
                paper["source"] = "semantic_scholar"
                related.append(paper)

        if isinstance(arxiv_results, list):
            for paper in arxiv_results:
                paper["source"] = "arxiv"
                related.append(paper)

        return {
            "source_paper": metadata,
            "related_papers": related,
            "count": len(related),
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/paper/{paper_id}")
async def get_paper_review(
    paper_id: str,
    community_id: Optional[str] = None,
):
    """Get stored review for a paper."""
    try:
        supabase = get_supabase()
        query = supabase.table("paper_reviews").select("*").eq("paper_id", paper_id)

        if community_id:
            query = query.eq("community_id", community_id)

        result = query.execute()

        if not result.data:
            return {"status": "not_found", "message": "No review found"}

        return result.data[0]

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/list")
async def list_reviews(
    community_id: Optional[str] = None,
    user_id: Optional[str] = None,
    limit: int = 50,
):
    """List paper reviews."""
    try:
        supabase = get_supabase()
        query = supabase.table("paper_reviews").select(
            "id, paper_id, created_at, processing_time_seconds, "
            "papers:paper_id (id, title, authors, arxiv_id)"
        )

        if community_id:
            query = query.eq("community_id", community_id)
        if user_id:
            query = query.eq("created_by", user_id)

        query = query.order("created_at", desc=True).limit(limit)
        result = query.execute()

        return {"reviews": result.data or []}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/upload", response_model=Dict[str, str])
async def upload_and_review(
    file: UploadFile = File(...),
    paper_id: Optional[str] = Form(None),
    community_id: Optional[str] = Form(None),
    user_id: Optional[str] = Form(None),
    extract_graph: bool = Form(True),
    save_lineage: bool = Form(True),
):
    """
    Upload a PDF file and start a review.

    This endpoint accepts a PDF file upload and starts the multi-agent
    review pipeline similar to /full but for directly uploaded files.

    Returns a job_id to poll for status.
    """
    # Validate file type
    if not file.filename or not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are accepted")

    user_id = user_id or "system"

    # Check quota
    if user_id != "system" and not has_custom_llm_enabled(user_id):
        quota = check_user_quota(user_id)
        if not quota['has_quota'] and not quota['is_unlimited']:
            return {
                "status": "quota_exceeded",
                "message": f"Daily limit reached ({quota['used_today']}/{quota['daily_limit']})",
            }

    # Save uploaded file to temp location
    temp_dir = tempfile.mkdtemp()
    temp_pdf_path = Path(temp_dir) / file.filename

    try:
        with open(temp_pdf_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        shutil.rmtree(temp_dir, ignore_errors=True)
        raise HTTPException(status_code=500, detail=f"Failed to save uploaded file: {e}")

    # Generate job ID
    import uuid
    job_id = str(uuid.uuid4())[:12]

    # Start review as a separate OS process
    manager = ProcessJobManager.instance()
    manager.start_job(
        job_id=job_id,
        job_type="review",
        target=_run_review_from_file_process,
        args=(
            job_id,
            str(temp_pdf_path),
            paper_id,
            user_id,
            community_id,
            extract_graph,
            save_lineage,
            temp_dir,
        ),
    )

    return {
        "status": "started",
        "job_id": job_id,
        "message": "Review started from uploaded PDF. Poll /review/status/{job_id} for progress."
    }

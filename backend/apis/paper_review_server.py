"""
Paper Review API Server
=======================
FastAPI server for paper review with lineage extraction.

Port: 8005 (to differentiate from paper_analysis_api.py on 8001)

Endpoints:
- POST /review/paper - Review paper by paper_id from database
- POST /review/url - Review paper by arXiv URL
- GET /review/{review_id} - Get existing review
- GET /review/paper/{paper_id}/lineage - Get lineage for a paper
- POST /review/save-lineage - Save lineage edges to database
"""

from fastapi import FastAPI, HTTPException, BackgroundTasks, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import json
import time
import os
from pathlib import Path
import sys
from dotenv import load_dotenv
import uuid
import shutil

# Load environment variables
load_dotenv()

# Add backend paths
backend_path = Path(__file__).parent.parent
sys.path.insert(0, str(backend_path))
sys.path.insert(0, str(backend_path / "agents"))

from paper_review_api import PaperReviewer, ReviewConfig
from supabase import create_client, Client

# Initialize FastAPI
app = FastAPI(
    title="Paper Review API",
    version="2.0.0",
    description="Paper review with lineage extraction and graph generation"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
print("✓ CORS configured for Paper Review API")

# Supabase client with service role key
SUPABASE_URL = os.getenv("VITE_SUPABASE_URL", "")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
if not SUPABASE_SERVICE_KEY:
    SUPABASE_SERVICE_KEY = os.getenv("VITE_SUPABASE_ANON_KEY", "")
    print("⚠️  Warning: Using anon key instead of service role key")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

# Review configuration
REVIEW_CONFIG = ReviewConfig(
    api_base=os.getenv("OLLAMA_API_BASE", "http://10.127.30.115:11434"),
    model_id=os.getenv("OLLAMA_MODEL", "ollama_chat/gpt-oss:20b"),
    num_ctx=8192,
    parallel=True,
    cache_dir="./paper_cache"
)

# In-memory storage for review results (replace with database later)
review_cache: Dict[str, Dict[str, Any]] = {}


# ============================================================================
# Request/Response Models
# ============================================================================

class ReviewPaperRequest(BaseModel):
    """Request to review a paper by paper_id."""
    paper_id: str
    user_id: Optional[str] = None
    community_id: Optional[str] = None
    extract_graph: bool = True
    save_lineage: bool = True


class ReviewUrlRequest(BaseModel):
    """Request to review a paper by URL."""
    paper_url: str
    paper_id: Optional[str] = None
    user_id: Optional[str] = None
    community_id: Optional[str] = None
    extract_graph: bool = True
    save_lineage: bool = True


class SaveLineageRequest(BaseModel):
    """Request to save lineage edges."""
    paper_id: str
    lineage_relationships: List[Dict[str, Any]]
    community_id: Optional[str] = None


class ReviewResponse(BaseModel):
    """Response from review endpoint."""
    review_id: str
    paper_id: Optional[str]
    paper_url: str
    status: str
    review_data: Optional[Dict[str, Any]] = None
    graph_data: Optional[Dict[str, Any]] = None
    lineage_relationships: Optional[List[Dict[str, Any]]] = None
    lineage_stats: Optional[Dict[str, Any]] = None
    processing_time: Optional[float] = None
    error: Optional[str] = None


# ============================================================================
# Helper Functions
# ============================================================================

def check_user_quota(user_id: str) -> dict:
    """
    Check if user has remaining quota for paper review.
    Reuses the same quota system as paper_analysis_api.
    """
    try:
        result = supabase.rpc('check_user_analysis_quota', {'p_user_id': user_id}).execute()
        if result.data:
            return result.data[0]
        return {'has_quota': False, 'used_today': 0, 'daily_limit': 5, 'is_unlimited': False}
    except Exception as e:
        print(f"⚠️  Error checking quota: {e}")
        return {'has_quota': False, 'used_today': 0, 'daily_limit': 5, 'is_unlimited': False}


def record_usage(
    user_id: str,
    paper_id: Optional[str],
    review_id: str,
    processing_time: float,
    success: bool,
    error_message: Optional[str] = None,
    used_custom_llm: bool = False,
    llm_provider: str = "default"
):
    """Record review usage for quota tracking."""
    try:
        supabase.rpc('record_analysis_usage', {
            'p_user_id': user_id,
            'p_paper_id': paper_id,
            'p_analysis_id': review_id,
            'p_used_custom_llm': used_custom_llm,
            'p_llm_provider': llm_provider,
            'p_processing_time': processing_time,
            'p_success': success,
            'p_error_message': error_message
        }).execute()
    except Exception as e:
        print(f"⚠️  Error recording usage: {e}")


def has_custom_llm_enabled(user_id: Optional[str]) -> bool:
    """
    Check if user has custom LLM configuration enabled.
    Returns True if user has custom LLM, False otherwise.
    """
    if not user_id or user_id == "system":
        return False

    try:
        result = supabase.table('profiles').select('llm_enabled').eq('id', user_id).single().execute()
        return result.data and result.data.get('llm_enabled', False)
    except Exception as e:
        print(f"⚠️  Error checking LLM config: {e}")
        return False


def get_user_llm_config(user_id: Optional[str]) -> ReviewConfig:
    """
    Get LLM configuration for a specific user.
    Returns user's custom config if enabled, otherwise returns default config.
    """
    if not user_id or user_id == "system":
        return REVIEW_CONFIG

    try:
        # Fetch user's LLM settings from database
        result = supabase.table('profiles').select(
            'llm_enabled, llm_provider, llm_api_base, llm_model_id, llm_api_key'
        ).eq('id', user_id).single().execute()

        if not result.data or not result.data.get('llm_enabled'):
            # User doesn't have custom config or it's disabled
            return REVIEW_CONFIG

        api_base = result.data.get('llm_api_base') or REVIEW_CONFIG.api_base

        # Warn about localhost URLs (they only work if Ollama is on same machine as backend)
        if any(host in api_base.lower() for host in ['localhost', '127.0.0.1', '0.0.0.0']):
            print(f"⚠️  User {user_id} configured localhost URL: {api_base}. This only works if Ollama is on the same machine as the backend server.")

        # Build custom config
        custom_config = ReviewConfig(
            api_base=api_base,
            model_id=result.data.get('llm_model_id') or REVIEW_CONFIG.model_id,
            num_ctx=8192,
            parallel=True,
            cache_dir="./paper_cache"
        )

        print(f"✓ Using custom LLM config for user {user_id}: {custom_config.api_base} / {custom_config.model_id}")
        return custom_config

    except Exception as e:
        print(f"⚠️  Error loading user LLM config: {e}. Using default config.")
        return REVIEW_CONFIG


def get_paper_url(paper_id: str) -> Optional[str]:
    """Get paper URL from database."""
    try:
        result = supabase.table("papers").select("arxiv_id, pdf_url").eq("id", paper_id).execute()

        if result.data and len(result.data) > 0:
            paper = result.data[0]
            arxiv_id = paper.get("arxiv_id")
            pdf_url = paper.get("pdf_url")

            if arxiv_id:
                return f"https://arxiv.org/abs/{arxiv_id}"
            elif pdf_url:
                return pdf_url

        return None
    except Exception as e:
        print(f"⚠️  Error getting paper URL: {e}")
        return None


# ============================================================================
# API Endpoints
# ============================================================================

@app.get("/")
async def root():
    """Root endpoint with API info."""
    return {
        "service": "Paper Review API",
        "version": "2.0.0",
        "status": "running",
        "port": 8005,
        "features": [
            "Paper review with conference-style critiques",
            "Lineage extraction (citation, methodology, theme, contribution)",
            "Graph generation for visualization",
            "Reproducibility checking",
            "Multi-level summaries",
            "Direct PDF upload support"
        ],
        "endpoints": {
            "POST /review/paper": "Review paper by paper_id",
            "POST /review/url": "Review paper by URL",
            "POST /review/upload": "Review paper by uploading PDF file",
            "GET /review/{review_id}": "Get existing review",
            "GET /review/paper/{paper_id}/lineage": "Get lineage for paper",
            "POST /review/save-lineage": "Save lineage edges"
        }
    }


@app.post("/review/paper", response_model=ReviewResponse)
async def review_paper(request: ReviewPaperRequest):
    """
    Review a paper from the database.

    Args:
        request: ReviewPaperRequest with paper_id

    Returns:
        ReviewResponse with complete review and lineage data
    """
    # Check quota only if user doesn't have custom LLM configured
    if request.user_id and not has_custom_llm_enabled(request.user_id):
        quota = check_user_quota(request.user_id)
        if not quota['has_quota']:
            raise HTTPException(
                status_code=429,
                detail=f"Daily quota exceeded. Used {quota['used_today']}/{quota['daily_limit']} analyses."
            )

    # Get paper URL from database
    paper_url = get_paper_url(request.paper_id)
    if not paper_url:
        raise HTTPException(status_code=404, detail="Paper not found or no URL available")

    # Generate review ID
    review_id = str(uuid.uuid4())

    try:
        # Get user-specific LLM config
        config = get_user_llm_config(request.user_id)
        used_custom_llm = config != REVIEW_CONFIG

        # Determine provider
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

        # Run review with lineage
        reviewer = PaperReviewer(config)
        result = reviewer.review_with_lineage(
            paper_url=paper_url,
            paper_id=request.paper_id,
            community_id=request.community_id,
            extract_graph=request.extract_graph
        )

        # Save lineage to database if requested
        lineage_stats = None
        if request.save_lineage and result.get("lineage_relationships"):
            lineage_stats = reviewer.save_lineage_to_database(
                paper_id=request.paper_id,
                lineage_relationships=result["lineage_relationships"],
                community_id=request.community_id,
                supabase_client=supabase
            )

        # Cache result
        review_cache[review_id] = result

        # Record usage
        if request.user_id:
            record_usage(
                user_id=request.user_id,
                paper_id=request.paper_id,
                review_id=review_id,
                processing_time=result.get("processing_time", 0),
                success=True,
                used_custom_llm=used_custom_llm,
                llm_provider=llm_provider
            )

        return ReviewResponse(
            review_id=review_id,
            paper_id=request.paper_id,
            paper_url=paper_url,
            status="complete",
            review_data=result.get("review_data"),
            graph_data=result.get("graph_data"),
            lineage_relationships=result.get("lineage_relationships"),
            lineage_stats=lineage_stats,
            processing_time=result.get("processing_time")
        )

    except Exception as e:
        # Record failed usage
        if request.user_id:
            record_usage(
                user_id=request.user_id,
                paper_id=request.paper_id,
                review_id=review_id,
                processing_time=0,
                success=False,
                error_message=str(e)
            )

        raise HTTPException(status_code=500, detail=f"Review failed: {str(e)}")


@app.post("/review/url", response_model=ReviewResponse)
async def review_url(request: ReviewUrlRequest):
    """
    Review a paper by URL.

    Args:
        request: ReviewUrlRequest with paper_url

    Returns:
        ReviewResponse with complete review and lineage data
    """
    # Check quota only if user doesn't have custom LLM configured
    if request.user_id and not has_custom_llm_enabled(request.user_id):
        quota = check_user_quota(request.user_id)
        if not quota['has_quota']:
            raise HTTPException(
                status_code=429,
                detail=f"Daily quota exceeded. Used {quota['used_today']}/{quota['daily_limit']} analyses."
            )

    # Generate review ID
    review_id = str(uuid.uuid4())

    try:
        # Get user-specific LLM config
        config = get_user_llm_config(request.user_id)

        # Run review with lineage
        reviewer = PaperReviewer(config)
        result = reviewer.review_with_lineage(
            paper_url=request.paper_url,
            paper_id=request.paper_id,
            community_id=request.community_id,
            extract_graph=request.extract_graph
        )

        # Save lineage to database if requested and paper_id provided
        lineage_stats = None
        if request.save_lineage and request.paper_id and result.get("lineage_relationships"):
            lineage_stats = reviewer.save_lineage_to_database(
                paper_id=request.paper_id,
                lineage_relationships=result["lineage_relationships"],
                community_id=request.community_id,
                supabase_client=supabase
            )

        # Cache result
        review_cache[review_id] = result

        # Record usage
        if request.user_id:
            record_usage(
                user_id=request.user_id,
                paper_id=request.paper_id,
                review_id=review_id,
                processing_time=result.get("processing_time", 0),
                success=True
            )

        return ReviewResponse(
            review_id=review_id,
            paper_id=request.paper_id,
            paper_url=request.paper_url,
            status="complete",
            review_data=result.get("review_data"),
            graph_data=result.get("graph_data"),
            lineage_relationships=result.get("lineage_relationships"),
            lineage_stats=lineage_stats,
            processing_time=result.get("processing_time")
        )

    except Exception as e:
        # Record failed usage
        if request.user_id:
            record_usage(
                user_id=request.user_id,
                paper_id=request.paper_id,
                review_id=review_id,
                processing_time=0,
                success=False,
                error_message=str(e)
            )

        raise HTTPException(status_code=500, detail=f"Review failed: {str(e)}")


@app.post("/review/upload", response_model=ReviewResponse)
async def review_upload(
    file: UploadFile = File(...),
    paper_id: Optional[str] = Form(None),
    user_id: Optional[str] = Form(None),
    community_id: Optional[str] = Form(None),
    extract_graph: bool = Form(True),
    save_lineage: bool = Form(True)
):
    """
    Review a paper by uploading a PDF file directly.

    Args:
        file: PDF file to upload
        paper_id: Optional paper ID from database
        user_id: Optional user ID for quota tracking
        community_id: Optional community ID for context
        extract_graph: Whether to generate graph visualization
        save_lineage: Whether to save lineage edges to database

    Returns:
        ReviewResponse with complete review and lineage data
    """
    # Validate file type
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")

    # Check quota only if user doesn't have custom LLM configured
    if user_id and not has_custom_llm_enabled(user_id):
        quota = check_user_quota(user_id)
        if not quota['has_quota']:
            raise HTTPException(
                status_code=429,
                detail=f"Daily quota exceeded. Used {quota['used_today']}/{quota['daily_limit']} analyses."
            )

    # Generate review ID
    review_id = str(uuid.uuid4())

    # Create cache directory if it doesn't exist
    cache_dir = Path(REVIEW_CONFIG.cache_dir)
    cache_dir.mkdir(parents=True, exist_ok=True)

    # Save uploaded file to cache
    pdf_filename = f"paper_{review_id[:12]}.pdf"
    pdf_path = cache_dir / pdf_filename

    try:
        # Save uploaded file
        with pdf_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Get user-specific LLM config
        config = get_user_llm_config(user_id)

        # Run review with the local PDF file
        reviewer = PaperReviewer(config)
        result = reviewer.review_with_lineage(
            paper_url=str(pdf_path),  # Use local file path
            paper_id=paper_id,
            community_id=community_id,
            extract_graph=extract_graph
        )

        # Save lineage to database if requested and paper_id provided
        lineage_stats = None
        if save_lineage and paper_id and result.get("lineage_relationships"):
            lineage_stats = reviewer.save_lineage_to_database(
                paper_id=paper_id,
                lineage_relationships=result["lineage_relationships"],
                community_id=community_id,
                supabase_client=supabase
            )

        # Cache result
        review_cache[review_id] = result

        # Record usage
        if user_id:
            record_usage(
                user_id=user_id,
                paper_id=paper_id,
                review_id=review_id,
                processing_time=result.get("processing_time", 0),
                success=True
            )

        return ReviewResponse(
            review_id=review_id,
            paper_id=paper_id,
            paper_url=f"uploaded:{file.filename}",
            status="complete",
            review_data=result.get("review_data"),
            graph_data=result.get("graph_data"),
            lineage_relationships=result.get("lineage_relationships"),
            lineage_stats=lineage_stats,
            processing_time=result.get("processing_time")
        )

    except Exception as e:
        # Clean up uploaded file on error
        if pdf_path.exists():
            pdf_path.unlink()

        # Record failed usage
        if user_id:
            record_usage(
                user_id=user_id,
                paper_id=paper_id,
                review_id=review_id,
                processing_time=0,
                success=False,
                error_message=str(e)
            )

        raise HTTPException(status_code=500, detail=f"Review failed: {str(e)}")

    finally:
        # Close the uploaded file
        await file.close()


@app.get("/review/{review_id}")
async def get_review(review_id: str):
    """
    Get an existing review by ID.

    Args:
        review_id: Review UUID

    Returns:
        Cached review data
    """
    if review_id not in review_cache:
        raise HTTPException(status_code=404, detail="Review not found in cache")

    return review_cache[review_id]


@app.get("/review/paper/{paper_id}/lineage")
async def get_paper_lineage(paper_id: str):
    """
    Get lineage edges for a paper from database.

    Args:
        paper_id: Paper UUID

    Returns:
        Dictionary with incoming and outgoing edges
    """
    try:
        from backend.agents.paper_review_agents.database_manager import DatabaseManager

        db_manager = DatabaseManager(supabase)
        edges = db_manager.get_edges_for_paper(paper_id)

        return {
            "paper_id": paper_id,
            "outgoing_edges": edges["outgoing"],
            "incoming_edges": edges["incoming"],
            "total_edges": len(edges["outgoing"]) + len(edges["incoming"])
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get lineage: {str(e)}")


@app.post("/review/save-lineage")
async def save_lineage(request: SaveLineageRequest):
    """
    Save lineage edges to database.

    Args:
        request: SaveLineageRequest with edges to save

    Returns:
        Statistics about saved edges
    """
    try:
        from backend.agents.paper_review_agents.database_manager import find_and_save_edges, DatabaseManager

        db_manager = DatabaseManager(supabase)
        stats = find_and_save_edges(
            source_paper_id=request.paper_id,
            extracted_edges=request.lineage_relationships,
            db_manager=db_manager,
            community_id=request.community_id
        )

        return {
            "success": True,
            "stats": stats
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save lineage: {str(e)}")


@app.get("/review/list")
async def list_reviewed_papers(
    community_id: Optional[str] = None,
    user_id: Optional[str] = None
):
    """
    List papers with reviews for the user/community.

    Query Parameters:
        - community_id: Filter by community
        - user_id: Filter by user (optional for now)

    Returns:
        List of papers with review metadata
    """
    try:
        # For now, use paper_analysis table as a proxy since reviews are stored there
        # In future, could create a dedicated paper_reviews table
        query = supabase.table("paper_analysis").select(
            "id, paper_id, created_at, "
            "papers:paper_id (id, title, authors, arxiv_id, year, venue)"
        )

        if community_id:
            query = query.eq("community_id", community_id)
        if user_id:
            query = query.eq("created_by", user_id)

        query = query.order("created_at", desc=True)
        result = query.execute()

        # Count lineage relationships for each paper
        papers_with_lineage = []
        for item in (result.data or []):
            # Count edges from this paper
            edges_result = supabase.table("edges").select(
                "id", count="exact"
            ).eq("source_paper_id", item["paper_id"]).execute()

            lineage_count = edges_result.count or 0

            papers_with_lineage.append({
                **item,
                "lineage_count": lineage_count
            })

        return {"papers": papers_with_lineage}
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Failed to list reviewed papers: {str(e)}")


# ============================================================================
# Server Startup
# ============================================================================

if __name__ == "__main__":
    import uvicorn

    print("=" * 60)
    print("Paper Review API Server")
    print("=" * 60)
    print(f"Port: 8005")
    print(f"Supabase URL: {SUPABASE_URL}")
    print(f"Model: {REVIEW_CONFIG.model_id}")
    print(f"API Base: {REVIEW_CONFIG.api_base}")
    print("=" * 60)

    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8005,
        log_level="info"
    )

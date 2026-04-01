"""
Unified Paper Circle API
========================
Single FastAPI application combining all multi-agent pipeline APIs:
- /analysis/* - Paper analysis (mind graphs)
- /review/*   - Paper review (multi-agent review)
- /research/* - Research pipeline (discovery)

Run with:
    uvicorn unified.app:app --host 0.0.0.0 --port 8000 --reload

Or:
    python -m unified.app
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from .routers import analysis_router, community_papers_router, research_router, review_router

# =============================================================================
# Lifespan
# =============================================================================

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan handler."""
    print("=" * 60)
    print("Paper Circle Unified API Starting...")
    print("=" * 60)
    print("Available endpoints:")
    print("  /analysis/*  - Paper analysis (mind graphs)")
    print("  /review/*    - Paper review (multi-agent)")
    print("  /research/*  - Research discovery pipeline")
    print("  /community/* - Community papers")
    print("=" * 60)
    yield
    print("Paper Circle API shutting down...")

# =============================================================================
# Application
# =============================================================================

app = FastAPI(
    title="Paper Circle API",
    description="""
Unified API for Paper Circle's multi-agent research pipelines.

## Modules

### Analysis (`/analysis`)
Paper analysis using paper_mind_graph to extract structured knowledge:
- Concepts, methods, experiments
- Mind maps and flowcharts
- Q&A over analyzed papers

### Review (`/review`)
Multi-agent paper review system:
- Comprehensive reviews (summary, critique, reproducibility)
- Quick single-agent reviews
- Paper comparison
- Related paper discovery
- Lineage extraction

### Research (`/research`)
Research discovery pipeline:
- Multi-agent paper discovery
- SSE streaming for real-time progress
- Tag-based filtering
""",
    version="2.0.0",
    lifespan=lifespan,
)

# =============================================================================
# CORS Middleware
# =============================================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://localhost:8080",
        "https://papercircle.vercel.app",
    ],
    allow_origin_regex=r"https://.*\.vercel\.app",  # Covers all Vercel preview deployments
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =============================================================================
# Include Routers
# =============================================================================

app.include_router(analysis_router)
app.include_router(community_papers_router)
app.include_router(review_router)
app.include_router(research_router)

# =============================================================================
# Root Endpoints
# =============================================================================

@app.get("/")
async def root():
    """Root endpoint with API information."""
    return {
        "name": "Paper Circle API",
        "version": "2.0.0",
        "status": "healthy",
        "modules": {
            "analysis": "/analysis - Paper analysis with mind graphs",
            "community": "/community - Community papers",
            "review": "/review - Multi-agent paper review",
            "research": "/research - Research discovery pipeline",
        },
        "docs": "/docs",
    }

@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring."""
    from .process_manager import ProcessJobManager

    manager = ProcessJobManager.instance()
    running_jobs = manager.list_jobs(status_filter="running")

    return {
        "status": "healthy",
        "active_jobs": len(running_jobs),
        "jobs_by_type": {
            "research": len([j for j in running_jobs if j.get("job_type") == "research"]),
            "review": len([j for j in running_jobs if j.get("job_type") == "review"]),
            "analysis": len([j for j in running_jobs if j.get("job_type") == "analysis"]),
        },
    }

# =============================================================================
# Main
# =============================================================================

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "unified.app:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
    )

"""
API Routers
===========
All routers for the unified Paper Circle API.
"""

from .analysis import router as analysis_router
from .research import router as research_router
from .review import router as review_router

try:
    from .community_papers import router as community_papers_router
    print("[Routers] Community papers router loaded successfully")
except Exception as e:
    print(f"[Routers] ERROR loading community papers router: {e}")
    import traceback
    traceback.print_exc()
    # Create a dummy router so app.py doesn't crash
    from fastapi import APIRouter
    community_papers_router = APIRouter(prefix="/community", tags=["Community Papers"])

__all__ = ["analysis_router", "community_papers_router", "research_router", "review_router"]

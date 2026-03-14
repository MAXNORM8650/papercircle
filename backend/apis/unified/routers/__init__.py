"""
API Routers
===========
All routers for the unified Paper Circle API.
"""

from .analysis import router as analysis_router
from .community_papers import router as community_papers_router
from .research import router as research_router
from .review import router as review_router

__all__ = ["analysis_router", "community_papers_router", "research_router", "review_router"]

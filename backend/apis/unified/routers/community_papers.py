"""
Community Papers Router
=======================
Provides endpoints for browsing, filtering, sharing, and managing community papers.
Uses HuggingFace Spaces API for paper data (search, browse, filters).
Uses Supabase for user-specific operations (add to circle, engagement).
"""

from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import Optional, List

import os
import sys
from pathlib import Path

# Add backend dir to path for services import
_backend_dir = str(Path(__file__).parent.parent.parent.parent)
if _backend_dir not in sys.path:
    sys.path.insert(0, _backend_dir)

from ..config import get_supabase

try:
    from services.hf_papers_client import get_hf_papers_client
    print("[Community] HF Papers client module loaded")
except ImportError as e:
    print(f"[Community] Warning: Could not import HF Papers client: {e}")
    def get_hf_papers_client():
        return None

# =============================================================================
# Router
# =============================================================================

router = APIRouter(prefix="/community", tags=["Community Papers"])

# =============================================================================
# Pydantic Models
# =============================================================================

class CommunityPaper(BaseModel):
    paper_id: str
    title: str
    authors: List[str]
    abstract: str
    year: Optional[int] = None
    venue: Optional[str] = None
    conference: Optional[str] = None
    source: str = ""
    track: Optional[str] = None
    paper_status: Optional[str] = None
    primary_area: Optional[str] = None
    keywords: Optional[List[str]] = None
    tldr: Optional[str] = None
    pdf_url: Optional[str] = None
    arxiv_id: Optional[str] = None
    rating_avg: Optional[float] = None
    github_url: Optional[str] = None
    like_count: int = 0
    view_count: int = 0
    save_count: int = 0
    discussion_count: int = 0

class PaginatedResponse(BaseModel):
    papers: List[CommunityPaper]
    total: int
    page: int
    limit: int
    total_pages: int

class FilterOptions(BaseModel):
    years: List[int]
    conferences: List[str]
    sources: List[str]
    tracks: List[str]
    statuses: List[str]
    primary_areas: List[str]

# =============================================================================
# Helpers
# =============================================================================

def _get_engagement_counts(paper_ids: List[str]) -> dict:
    """Fetch engagement counts from Supabase for a list of paper_ids."""
    if not paper_ids:
        return {}

    try:
        supabase = get_supabase()

        # Get like counts
        likes = {}
        views = {}
        saves = {}
        discussions = {}

        # Batch query engagement counts
        result = supabase.table('paper_engagement').select(
            'paper_id, engagement_type'
        ).in_('paper_id', paper_ids).execute()

        for row in result.data or []:
            pid = row['paper_id']
            etype = row['engagement_type']
            if etype == 'like':
                likes[pid] = likes.get(pid, 0) + 1
            elif etype == 'view':
                views[pid] = views.get(pid, 0) + 1
            elif etype == 'save':
                saves[pid] = saves.get(pid, 0) + 1

        # Get discussion counts
        disc_result = supabase.table('paper_discussions').select(
            'paper_id'
        ).in_('paper_id', paper_ids).execute()

        for row in disc_result.data or []:
            pid = row['paper_id']
            discussions[pid] = discussions.get(pid, 0) + 1

        return {
            pid: {
                'like_count': likes.get(pid, 0),
                'view_count': views.get(pid, 0),
                'save_count': saves.get(pid, 0),
                'discussion_count': discussions.get(pid, 0),
            }
            for pid in paper_ids
        }
    except Exception as e:
        print(f"[Community] Error fetching engagement counts: {e}")
        return {}


def _hf_paper_to_community_paper(paper: dict, engagement: dict = None) -> CommunityPaper:
    """Convert HF API paper dict to CommunityPaper model."""
    eng = engagement or {}
    paper_id = paper.get('paper_id', '')

    authors = paper.get('authors', [])
    if isinstance(authors, str):
        authors = [authors]
    elif authors is None:
        authors = []

    keywords = paper.get('keywords', [])
    if isinstance(keywords, str):
        keywords = [keywords]
    elif keywords is None:
        keywords = []

    return CommunityPaper(
        paper_id=paper_id,
        title=paper.get('title', ''),
        authors=authors,
        abstract=paper.get('abstract', ''),
        year=paper.get('year'),
        venue=paper.get('venue'),
        conference=paper.get('conference'),
        source=paper.get('source', ''),
        track=paper.get('track'),
        paper_status=paper.get('paper_status'),
        primary_area=paper.get('primary_area'),
        keywords=keywords,
        tldr=paper.get('tldr'),
        pdf_url=paper.get('pdf_url'),
        arxiv_id=paper.get('arxiv_id'),
        rating_avg=paper.get('rating_avg'),
        github_url=paper.get('github_url'),
        like_count=eng.get(paper_id, {}).get('like_count', 0),
        view_count=eng.get(paper_id, {}).get('view_count', 0),
        save_count=eng.get(paper_id, {}).get('save_count', 0),
        discussion_count=eng.get(paper_id, {}).get('discussion_count', 0),
    )


# =============================================================================
# Endpoints
# =============================================================================

@router.get("/papers", response_model=PaginatedResponse)
async def get_community_papers(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    year: Optional[int] = None,
    conference: Optional[str] = None,
    source: Optional[str] = None,
    track: Optional[str] = None,
    status: Optional[str] = None,
    primary_area: Optional[str] = None,
    min_rating: Optional[float] = None,
    keywords: Optional[str] = None,
    sort_by: str = Query("year", regex="^(year|rating|likes|views|combined_score|recency|title)$")
):
    """Get paginated community papers with filters."""
    hf_client = get_hf_papers_client()
    if not hf_client:
        raise HTTPException(status_code=503, detail="Papers service not configured")

    # Fetch from HF Spaces
    data = hf_client.get_community_papers(
        page=page, limit=limit, year=year, conference=conference,
        source=source, track=track, status=status, primary_area=primary_area,
        min_rating=min_rating, keywords=keywords, sort_by=sort_by,
    )

    hf_papers = data.get('papers', [])
    paper_ids = [p['paper_id'] for p in hf_papers]

    # Fetch engagement counts from Supabase
    engagement = _get_engagement_counts(paper_ids)

    papers = [_hf_paper_to_community_paper(p, engagement) for p in hf_papers]

    return PaginatedResponse(
        papers=papers,
        total=data.get('total', 0),
        page=data.get('page', page),
        limit=data.get('limit', limit),
        total_pages=data.get('total_pages', 1),
    )


@router.get("/papers/{paper_id}")
async def get_community_paper(paper_id: str):
    """Get a single community paper by ID."""
    hf_client = get_hf_papers_client()
    if not hf_client:
        raise HTTPException(status_code=503, detail="Papers service not configured")

    try:
        paper = hf_client.get_paper(paper_id)
    except Exception:
        raise HTTPException(status_code=404, detail="Paper not found")

    engagement = _get_engagement_counts([paper_id])
    return _hf_paper_to_community_paper(paper, engagement)


@router.get("/filters", response_model=FilterOptions)
async def get_filter_options():
    """Get available filter options for community papers."""
    hf_client = get_hf_papers_client()
    if not hf_client:
        raise HTTPException(status_code=503, detail="Papers service not configured")

    data = hf_client.get_filter_options()

    return FilterOptions(
        years=data.get('years', []),
        conferences=data.get('conferences', []),
        sources=data.get('sources', []),
        tracks=data.get('tracks', []),
        statuses=data.get('statuses', []),
        primary_areas=data.get('primary_areas', []),
    )


class AddToCircleRequest(BaseModel):
    circle_id: str
    user_id: Optional[str] = None

@router.post("/papers/{paper_id}/add-to-circle")
async def add_paper_to_circle(paper_id: str, request: AddToCircleRequest):
    """Add a community paper to a user's circle."""
    supabase = get_supabase()
    circle_id = request.circle_id
    user_id = request.user_id

    # Check if already added
    existing = supabase.table('community_papers').select('id').eq(
        'paper_id', paper_id
    ).eq('community_id', circle_id).limit(1).execute()

    if existing.data:
        return {"message": "Paper already in circle", "status": "exists"}

    # Add to circle
    supabase.table('community_papers').insert({
        'paper_id': paper_id,
        'community_id': circle_id,
        'added_by': user_id
    }).execute()

    return {"message": "Paper added to circle", "status": "added"}

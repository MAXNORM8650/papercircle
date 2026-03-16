"""
Community Papers Router
=======================
Provides endpoints for browsing, filtering, sharing, and managing community papers.
Uses HuggingFace Spaces API for paper data (search, browse, filters).
Uses Supabase for user-specific operations (add to circle, engagement).
HF paper IDs are mapped to Supabase UUIDs via stub rows for engagement FK integrity.
"""

from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import Optional, List, Dict

import os
import sys
from pathlib import Path

# Add backend dir (or /app in Docker) to path for services import
_backend_dir = str(Path(__file__).resolve().parent.parent.parent.parent)
if _backend_dir not in sys.path:
    sys.path.insert(0, _backend_dir)
_alt_dir = str(Path(__file__).resolve().parent.parent.parent)
if _alt_dir not in sys.path:
    sys.path.insert(0, _alt_dir)

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
    paper_id: str  # Supabase UUID (for engagement compatibility)
    hf_paper_id: str = ""  # Original HF paper ID
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

def _ensure_supabase_stubs(hf_papers: List[dict]) -> Dict[str, str]:
    """
    Ensure stub rows exist in Supabase for HF papers.
    Returns mapping: hf_paper_id -> supabase_uuid.
    """
    if not hf_papers:
        return {}

    try:
        supabase = get_supabase()

        hf_ids = [p.get('paper_id', '') for p in hf_papers]
        titles = [p.get('title', '') for p in hf_papers]
        years = [p.get('year') for p in hf_papers]
        conferences = [p.get('conference') for p in hf_papers]

        result = supabase.rpc('ensure_papers_for_hf_ids', {
            'p_hf_paper_ids': hf_ids,
            'p_titles': titles,
            'p_years': years,
            'p_conferences': conferences,
        }).execute()

        mapping = {}
        for row in result.data or []:
            mapping[row['hf_paper_id']] = row['paper_uuid']

        return mapping
    except Exception as e:
        print(f"[Community] Error ensuring stubs: {e}")
        # Fallback: return hf_ids as-is (engagement won't work but browsing will)
        return {p.get('paper_id', ''): p.get('paper_id', '') for p in hf_papers}


def _get_engagement_counts(paper_uuids: List[str]) -> dict:
    """Fetch engagement counts from Supabase for a list of Supabase UUIDs."""
    if not paper_uuids:
        return {}

    try:
        supabase = get_supabase()

        likes = {}
        views = {}
        saves = {}
        discussions = {}

        result = supabase.table('paper_engagement').select(
            'paper_id, engagement_type'
        ).in_('paper_id', paper_uuids).execute()

        for row in result.data or []:
            pid = row['paper_id']
            etype = row['engagement_type']
            if etype == 'like':
                likes[pid] = likes.get(pid, 0) + 1
            elif etype == 'view':
                views[pid] = views.get(pid, 0) + 1
            elif etype == 'save':
                saves[pid] = saves.get(pid, 0) + 1

        disc_result = supabase.table('paper_discussions').select(
            'paper_id'
        ).in_('paper_id', paper_uuids).execute()

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
            for pid in paper_uuids
        }
    except Exception as e:
        print(f"[Community] Error fetching engagement counts: {e}")
        return {}


def _hf_paper_to_community_paper(
    paper: dict, uuid: str, engagement: dict = None
) -> CommunityPaper:
    """Convert HF API paper dict to CommunityPaper model with Supabase UUID."""
    eng = engagement or {}
    hf_paper_id = paper.get('paper_id', '')

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
        paper_id=uuid,  # Supabase UUID for engagement
        hf_paper_id=hf_paper_id,
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
        like_count=eng.get(uuid, {}).get('like_count', 0),
        view_count=eng.get(uuid, {}).get('view_count', 0),
        save_count=eng.get(uuid, {}).get('save_count', 0),
        discussion_count=eng.get(uuid, {}).get('discussion_count', 0),
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
    sort_by: str = Query("year", pattern="^(imported_at|year|rating|likes|views|combined_score|recency|title)$")
):
    """Get paginated community papers with filters."""
    hf_client = get_hf_papers_client()
    if not hf_client:
        raise HTTPException(status_code=503, detail="Papers service not configured")

    hf_sort_by = sort_by if sort_by not in ("imported_at", "likes", "views") else "year"

    data = hf_client.get_community_papers(
        page=page, limit=limit, year=year, conference=conference,
        source=source, track=track, status=status, primary_area=primary_area,
        min_rating=min_rating, keywords=keywords, sort_by=hf_sort_by,
    )

    hf_papers = data.get('papers', [])

    # Map HF IDs → Supabase UUIDs (creates stubs if needed)
    id_mapping = _ensure_supabase_stubs(hf_papers)

    # Get engagement counts using Supabase UUIDs
    uuids = list(id_mapping.values())
    engagement = _get_engagement_counts(uuids)

    papers = []
    for p in hf_papers:
        hf_id = p.get('paper_id', '')
        uuid = id_mapping.get(hf_id, hf_id)
        papers.append(_hf_paper_to_community_paper(p, uuid, engagement))

    return PaginatedResponse(
        papers=papers,
        total=data.get('total', 0),
        page=data.get('page', page),
        limit=data.get('limit', limit),
        total_pages=data.get('total_pages', 1),
    )


@router.get("/papers/{paper_id}")
async def get_community_paper(paper_id: str):
    """Get a single community paper by HF paper ID."""
    hf_client = get_hf_papers_client()
    if not hf_client:
        raise HTTPException(status_code=503, detail="Papers service not configured")

    try:
        paper = hf_client.get_paper(paper_id)
    except Exception:
        raise HTTPException(status_code=404, detail="Paper not found")

    id_mapping = _ensure_supabase_stubs([paper])
    uuid = id_mapping.get(paper_id, paper_id)
    engagement = _get_engagement_counts([uuid])
    return _hf_paper_to_community_paper(paper, uuid, engagement)


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
    """Add a community paper to a user's circle. paper_id is the Supabase UUID."""
    supabase = get_supabase()
    circle_id = request.circle_id
    user_id = request.user_id

    existing = supabase.table('community_papers').select('id').eq(
        'paper_id', paper_id
    ).eq('community_id', circle_id).limit(1).execute()

    if existing.data:
        return {"message": "Paper already in circle", "status": "exists"}

    supabase.table('community_papers').insert({
        'paper_id': paper_id,
        'community_id': circle_id,
        'added_by': user_id
    }).execute()

    return {"message": "Paper added to circle", "status": "added"}

"""
Community Papers Router
=======================
Provides endpoints for browsing, filtering, sharing, and managing community papers.
Converted from standalone community_papers_api.py into a unified API router.
"""

from fastapi import APIRouter, HTTPException, BackgroundTasks, Query
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

from ..config import get_supabase

# =============================================================================
# Router
# =============================================================================

router = APIRouter(prefix="/community", tags=["Community Papers"])

# =============================================================================
# Pydantic Models
# =============================================================================

class SyncRequest(BaseModel):
    source_type: str = "full"  # full, research_output, conference_db

class CommunityPaper(BaseModel):
    id: str
    paper_id: str
    title: str
    authors: List[str]
    abstract: str
    year: Optional[int]
    venue: Optional[str]
    conference: Optional[str]
    source: str
    track: Optional[str]
    paper_status: Optional[str]
    primary_area: Optional[str]
    keywords: Optional[List[str]]
    tldr: Optional[str]
    pdf_url: Optional[str]
    arxiv_id: Optional[str]
    rating_avg: Optional[float]
    github_url: Optional[str]
    like_count: int = 0
    view_count: int = 0
    save_count: int = 0
    discussion_count: int = 0
    combined_score: Optional[float]
    similarity_score: Optional[float]
    novelty_score: Optional[float]
    recency_score: Optional[float]
    share_token: Optional[str]
    imported_at: str

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

class ShareResponse(BaseModel):
    share_token: str
    share_url: str

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
    sort_by: str = Query("imported_at", regex="^(imported_at|rating|likes|views|combined_score|recency)$")
):
    """Get paginated community papers with filters."""
    supabase = get_supabase()
    offset = (page - 1) * limit

    # Call the database function
    result = supabase.rpc('get_community_papers', {
        'p_limit': limit,
        'p_offset': offset,
        'p_year': year,
        'p_conference': conference,
        'p_source': source,
        'p_track': track,
        'p_status': status,
        'p_primary_area': primary_area,
        'p_min_rating': min_rating,
        'p_keywords': keywords,
        'p_sort_by': sort_by
    }).execute()

    # Get total count
    count_result = supabase.rpc('get_community_papers_count', {
        'p_year': year,
        'p_conference': conference,
        'p_source': source,
        'p_track': track,
        'p_status': status,
        'p_primary_area': primary_area,
        'p_min_rating': min_rating,
        'p_keywords': keywords
    }).execute()

    total = count_result.data or 0
    total_pages = (total + limit - 1) // limit if total > 0 else 1

    # Transform data
    papers = []
    for row in result.data or []:
        authors = row.get('authors', [])
        if isinstance(authors, str):
            authors = [authors]
        elif authors is None:
            authors = []

        papers.append(CommunityPaper(
            id=row['id'],
            paper_id=row['paper_id'],
            title=row['title'] or '',
            authors=authors,
            abstract=row['abstract'] or '',
            year=row['year'],
            venue=row['venue'],
            conference=row['conference'],
            source=row['source'],
            track=row['track'],
            paper_status=row['paper_status'],
            primary_area=row['primary_area'],
            keywords=row['keywords'] or [],
            tldr=row['tldr'],
            pdf_url=row['pdf_url'],
            arxiv_id=row['arxiv_id'],
            rating_avg=row['rating_avg'],
            github_url=row['github_url'],
            like_count=row['like_count'] or 0,
            view_count=row['view_count'] or 0,
            save_count=row['save_count'] or 0,
            discussion_count=row['discussion_count'] or 0,
            combined_score=row['combined_score'],
            similarity_score=row['similarity_score'],
            novelty_score=row['novelty_score'],
            recency_score=row['recency_score'],
            share_token=row['share_token'],
            imported_at=str(row['imported_at']) if row['imported_at'] else ''
        ))

    return PaginatedResponse(
        papers=papers,
        total=total,
        page=page,
        limit=limit,
        total_pages=total_pages
    )

@router.get("/papers/{paper_id}")
async def get_community_paper(paper_id: str):
    """Get a single community paper by ID."""
    supabase = get_supabase()
    result = supabase.table('community_papers_global').select(
        '*, papers(*)'
    ).eq('paper_id', paper_id).limit(1).execute()

    if not result.data:
        raise HTTPException(status_code=404, detail="Paper not found")

    return result.data[0]

@router.get("/filters", response_model=FilterOptions)
async def get_filter_options():
    """Get available filter options for community papers."""
    supabase = get_supabase()
    result = supabase.rpc('get_community_paper_filter_options').execute()

    data = result.data or {}

    return FilterOptions(
        years=data.get('years', []) or [],
        conferences=data.get('conferences', []) or [],
        sources=data.get('sources', []) or [],
        tracks=data.get('tracks', []) or [],
        statuses=data.get('statuses', []) or [],
        primary_areas=data.get('primary_areas', []) or []
    )

@router.post("/papers/{paper_id}/share", response_model=ShareResponse)
async def generate_share_link(paper_id: str):
    """Generate a shareable link for a paper."""
    supabase = get_supabase()
    result = supabase.rpc('generate_paper_share_token', {
        'p_paper_id': paper_id
    }).execute()

    share_token = result.data
    if not share_token:
        raise HTTPException(status_code=404, detail="Paper not found in community")

    share_url = f"/share/{share_token}"

    return ShareResponse(share_token=share_token, share_url=share_url)

@router.get("/share/{share_token}")
async def get_shared_paper(share_token: str):
    """Get a paper by its share token (public endpoint)."""
    supabase = get_supabase()
    result = supabase.rpc('get_paper_by_share_token', {
        'p_share_token': share_token
    }).execute()

    if not result.data:
        raise HTTPException(status_code=404, detail="Shared paper not found")

    return result.data[0]

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

@router.post("/sync/trigger")
async def trigger_sync(request: SyncRequest, background_tasks: BackgroundTasks):
    """Trigger background sync from specified sources."""
    supabase = get_supabase()
    run_timestamp = datetime.utcnow().strftime("%Y%m%d_%H%M%S")

    result = supabase.table('sync_runs').insert({
        'run_timestamp': run_timestamp,
        'source_type': request.source_type,
        'status': 'pending'
    }).execute()

    run_id = result.data[0]['id']

    return {
        "message": f"Sync triggered for {request.source_type}",
        "run_id": run_id,
        "run_timestamp": run_timestamp
    }

@router.get("/sync/status")
async def get_sync_status(limit: int = 10):
    """Get status of recent sync runs."""
    supabase = get_supabase()
    result = supabase.table('sync_runs').select('*').order(
        'created_at', desc=True
    ).limit(limit).execute()

    return {"sync_runs": result.data}

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


# =============================================================================
# Auto-Discovery Endpoints
# =============================================================================

class DiscoverRequest(BaseModel):
    max_per_keyword: int = 30
    include_arxiv_live: bool = True

@router.post("/{community_id}/discover")
async def discover_papers_for_community(community_id: str, request: DiscoverRequest = DiscoverRequest()):
    """
    Auto-discover papers for a community based on its keywords.
    Searches HF Spaces (offline 233K conference papers) + arXiv live API.
    Deduplicates and inserts new papers into the community.
    """
    supabase = get_supabase()

    # 1. Get community keywords and conferences
    community = supabase.table('communities').select(
        'id, name, keywords, discovery_conferences'
    ).eq('id', community_id).maybe_single().execute()

    if not community.data:
        raise HTTPException(status_code=404, detail="Community not found")

    keywords = community.data.get('keywords') or []
    conferences = community.data.get('discovery_conferences') or []

    if not keywords:
        raise HTTPException(
            status_code=400,
            detail="Community has no keywords configured. Add keywords to enable auto-discovery."
        )

    hf_client = get_hf_papers_client()

    # 2. Get existing paper IDs in this community to skip duplicates
    existing_result = supabase.table('community_papers').select(
        'paper_id'
    ).eq('community_id', community_id).execute()
    existing_paper_ids = {row['paper_id'] for row in (existing_result.data or [])}

    # Also get existing paper titles for title-based dedup
    if existing_paper_ids:
        existing_titles_result = supabase.table('papers').select(
            'title'
        ).in_('id', list(existing_paper_ids)).execute()
        existing_titles = {
            row['title'].lower().strip()
            for row in (existing_titles_result.data or [])
            if row.get('title')
        }
    else:
        existing_titles = set()

    total_added = 0
    total_skipped = 0
    sources_searched = []

    # 3. Search HF Spaces (offline conference papers) for each keyword
    if hf_client:
        for keyword in keywords:
            try:
                conf_str = ','.join(conferences) if conferences else None
                papers_data = hf_client.search_papers(
                    query=keyword,
                    conferences=conferences if conferences else None,
                    start_year=2020,
                    limit=request.max_per_keyword,
                )

                added, skipped = _ingest_papers_to_community(
                    supabase=supabase,
                    community_id=community_id,
                    papers_data=papers_data,
                    existing_paper_ids=existing_paper_ids,
                    existing_titles=existing_titles,
                    source='auto_discovery',
                )
                total_added += added
                total_skipped += skipped
                sources_searched.append(f"hf:{keyword}")
            except Exception as e:
                print(f"[Discover] HF search failed for '{keyword}': {e}")

    # 4. Search arXiv live for each keyword (latest papers)
    if request.include_arxiv_live:
        for keyword in keywords:
            try:
                arxiv_papers = _search_arxiv_live(keyword, max_results=20)
                added, skipped = _ingest_papers_to_community(
                    supabase=supabase,
                    community_id=community_id,
                    papers_data=arxiv_papers,
                    existing_paper_ids=existing_paper_ids,
                    existing_titles=existing_titles,
                    source='arxiv_live',
                )
                total_added += added
                total_skipped += skipped
                sources_searched.append(f"arxiv:{keyword}")
            except Exception as e:
                print(f"[Discover] arXiv search failed for '{keyword}': {e}")

    # 5. Update last_discovery_at
    supabase.table('communities').update({
        'last_discovery_at': 'now()',
    }).eq('id', community_id).execute()

    return {
        "status": "completed",
        "community_id": community_id,
        "papers_added": total_added,
        "papers_skipped": total_skipped,
        "sources_searched": sources_searched,
        "message": f"Added {total_added} new papers ({total_skipped} already existed)"
    }


@router.post("/discover-all")
async def discover_all_communities():
    """
    Cron endpoint: run auto-discovery for all communities with auto_discover=true.
    Call this from Railway cron, external scheduler, or manually.
    Only processes communities not discovered in the last 24 hours.
    """
    supabase = get_supabase()

    # Get communities due for discovery
    from datetime import datetime, timedelta, timezone
    cutoff = (datetime.now(timezone.utc) - timedelta(hours=24)).isoformat()

    result = supabase.table('communities').select(
        'id, name, keywords, discovery_conferences'
    ).eq('auto_discover', True).execute()

    communities = result.data or []
    processed = 0
    skipped = 0
    results = []

    for community in communities:
        keywords = community.get('keywords') or []
        if not keywords:
            skipped += 1
            continue

        # Check last_discovery_at
        last = community.get('last_discovery_at')
        if last and last > cutoff:
            skipped += 1
            continue

        try:
            # Reuse the discover endpoint logic
            discover_result = await discover_papers_for_community(
                community_id=community['id'],
                request=DiscoverRequest(max_per_keyword=20, include_arxiv_live=True),
            )
            processed += 1
            results.append({
                "community": community['name'],
                "papers_added": discover_result.get('papers_added', 0),
            })
        except Exception as e:
            print(f"[Cron] Discovery failed for {community['name']}: {e}")
            results.append({
                "community": community['name'],
                "error": str(e),
            })

    return {
        "status": "completed",
        "communities_processed": processed,
        "communities_skipped": skipped,
        "results": results,
    }


# =============================================================================
# Discovery Helpers
# =============================================================================

def _ingest_papers_to_community(
    supabase,
    community_id: str,
    papers_data: list,
    existing_paper_ids: set,
    existing_titles: set,
    source: str = 'auto_discovery',
) -> tuple:
    """
    Insert papers into the papers table and link to community.
    Returns (added_count, skipped_count).
    """
    added = 0
    skipped = 0

    for p in papers_data:
        title = (p.get('title') or '').strip()
        if not title:
            skipped += 1
            continue

        # Skip if title already in community
        if title.lower() in existing_titles:
            skipped += 1
            continue

        # Check if paper exists in papers table (by arxiv_id or title)
        paper_id = None
        arxiv_id = p.get('arxiv_id') or ''

        if arxiv_id:
            existing = supabase.table('papers').select('id').eq(
                'arxiv_id', arxiv_id
            ).limit(1).execute()
            if existing.data:
                paper_id = existing.data[0]['id']

        if not paper_id:
            existing = supabase.table('papers').select('id').ilike(
                'title', title
            ).limit(1).execute()
            if existing.data:
                paper_id = existing.data[0]['id']

        # Create paper if not found
        if not paper_id:
            authors = p.get('authors', [])
            if isinstance(authors, str):
                authors = [a.strip() for a in authors.split(';') if a.strip()]

            paper_record = {
                'title': title,
                'authors': authors if isinstance(authors, list) else [],
                'abstract': p.get('abstract', ''),
                'arxiv_id': arxiv_id or None,
                'pdf_url': p.get('pdf_url') or None,
                'year': p.get('year'),
                'venue': p.get('conference') or p.get('venue') or None,
                'source': source,
            }

            try:
                insert_result = supabase.table('papers').insert(paper_record).execute()
                if insert_result.data:
                    paper_id = insert_result.data[0]['id']
            except Exception as e:
                print(f"[Discover] Failed to insert paper '{title[:50]}': {e}")
                skipped += 1
                continue

        if not paper_id:
            skipped += 1
            continue

        # Skip if already linked to community
        if paper_id in existing_paper_ids:
            skipped += 1
            continue

        # Link to community
        try:
            supabase.table('community_papers').insert({
                'paper_id': paper_id,
                'community_id': community_id,
                'source': source,
            }).execute()
            existing_paper_ids.add(paper_id)
            existing_titles.add(title.lower())
            added += 1
        except Exception as e:
            # Likely duplicate constraint violation
            skipped += 1

    return added, skipped


def _search_arxiv_live(query: str, max_results: int = 20) -> list:
    """Search arXiv API directly for latest papers matching a query."""
    import urllib.request
    import urllib.parse
    import xml.etree.ElementTree as ET

    encoded_query = urllib.parse.quote(f'all:{query}')
    url = (
        f'http://export.arxiv.org/api/query?search_query={encoded_query}'
        f'&start=0&max_results={max_results}'
        f'&sortBy=submittedDate&sortOrder=descending'
    )

    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'PaperCircle/1.0'})
        with urllib.request.urlopen(req, timeout=15) as response:
            xml_data = response.read().decode('utf-8')

        root = ET.fromstring(xml_data)
        ns = {'atom': 'http://www.w3.org/2005/Atom', 'arxiv': 'http://arxiv.org/schemas/atom'}

        papers = []
        for entry in root.findall('atom:entry', ns):
            title_el = entry.find('atom:title', ns)
            abstract_el = entry.find('atom:summary', ns)
            published_el = entry.find('atom:published', ns)

            title = title_el.text.strip().replace('\n', ' ') if title_el is not None and title_el.text else ''
            abstract = abstract_el.text.strip().replace('\n', ' ') if abstract_el is not None and abstract_el.text else ''

            # Extract arxiv_id from entry id
            entry_id = entry.find('atom:id', ns)
            arxiv_id = ''
            pdf_url = ''
            if entry_id is not None and entry_id.text:
                import re
                match = re.search(r'(\d{4}\.\d{4,5})', entry_id.text)
                if match:
                    arxiv_id = match.group(1)
                    pdf_url = f'https://arxiv.org/pdf/{arxiv_id}.pdf'

            # Extract year from published date
            year = None
            if published_el is not None and published_el.text:
                try:
                    year = int(published_el.text[:4])
                except (ValueError, IndexError):
                    pass

            # Extract authors
            authors = []
            for author in entry.findall('atom:author', ns):
                name_el = author.find('atom:name', ns)
                if name_el is not None and name_el.text:
                    authors.append(name_el.text.strip())

            if title:
                papers.append({
                    'title': title,
                    'authors': authors,
                    'abstract': abstract,
                    'arxiv_id': arxiv_id,
                    'pdf_url': pdf_url,
                    'year': year,
                    'venue': 'arXiv',
                    'conference': '',
                    'source': 'arxiv',
                })

        return papers
    except Exception as e:
        print(f"[Discover] arXiv API error: {e}")
        return []

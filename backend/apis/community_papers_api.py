"""
Community Papers API
====================
FastAPI endpoint for managing community papers from multiple sources.

This API provides endpoints to:
1. Trigger background sync from research_output and conference database
2. Get paginated community papers with filters
3. Generate share links for papers
4. Get filter options
"""

from fastapi import FastAPI, HTTPException, BackgroundTasks, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import json
import os
from pathlib import Path
from datetime import datetime
import re
from dotenv import load_dotenv
from supabase import create_client, Client

# Load environment variables
load_dotenv()

# Initialize FastAPI
app = FastAPI(title="Community Papers API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "https://papercircle.vercel.app",
        "https://*.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Supabase client - use service role key for backend operations to bypass RLS
SUPABASE_URL = os.getenv("VITE_SUPABASE_URL", "")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
if not SUPABASE_SERVICE_KEY:
    SUPABASE_SERVICE_KEY = os.getenv("VITE_SUPABASE_ANON_KEY", "")
    print("Warning: Using anon key instead of service role key.")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

# Paths
RESEARCH_OUTPUT_PATH = Path(__file__).parent.parent.parent / "research_output"
DATABASE_PATH = RESEARCH_OUTPUT_PATH / "database"

# ============================================================================
# Pydantic Models
# ============================================================================

class SyncRequest(BaseModel):
    source_type: str = "full"  # full, research_output, conference_db

class SyncStatus(BaseModel):
    id: str
    run_timestamp: str
    source_type: str
    status: str
    papers_imported: int
    papers_skipped: int
    papers_updated: int
    error_message: Optional[str]
    started_at: Optional[str]
    completed_at: Optional[str]

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

# ============================================================================
# Sync Functions
# ============================================================================

def parse_timestamp_dir(dirname: str) -> Optional[str]:
    """Parse YYYYMMDD_HHMMSS format directory name."""
    pattern = r'^(\d{8}_\d{6})$'
    match = re.match(pattern, dirname)
    return match.group(1) if match else None

def sync_research_output_runs(run_id: str):
    """Sync papers from research_output timestamped directories - OPTIMIZED with batching."""
    try:
        # Update sync run status
        supabase.table('sync_runs').update({
            'status': 'running',
            'started_at': datetime.utcnow().isoformat()
        }).eq('id', run_id).execute()

        papers_imported = 0
        papers_skipped = 0
        papers_updated = 0

        # Scan research_output for timestamped directories
        if not RESEARCH_OUTPUT_PATH.exists():
            raise Exception(f"Research output path not found: {RESEARCH_OUTPUT_PATH}")

        # Get existing paper titles for duplicate checking (one query instead of many)
        print("Loading existing papers for duplicate check...")
        existing_titles = set()
        try:
            offset = 0
            limit = 1000
            while True:
                response = supabase.table('papers').select('title').range(offset, offset + limit - 1).execute()
                if not response.data:
                    break
                for row in response.data:
                    if row.get('title'):
                        existing_titles.add(row['title'].lower().strip())
                if len(response.data) < limit:
                    break
                offset += limit
        except Exception as e:
            print(f"Warning: Could not load existing titles: {e}")

        print(f"Found {len(existing_titles)} existing papers")

        for item in RESEARCH_OUTPUT_PATH.iterdir():
            if not item.is_dir():
                continue

            timestamp = parse_timestamp_dir(item.name)
            if not timestamp:
                continue

            papers_json = item / "papers.json"
            if not papers_json.exists():
                continue

            try:
                with open(papers_json, 'r') as f:
                    data = json.load(f)

                # Handle different JSON structures
                papers_list = data.get('papers', data.get('leaderboard', []))
                if isinstance(data, list):
                    papers_list = data

                query = data.get('metadata', {}).get('query', '')

                print(f"Processing {timestamp}: {len(papers_list)} papers")

                # BATCH PROCESSING - much faster!
                for paper_data in papers_list:
                    title = paper_data.get('title', '').strip()
                    if not title:
                        papers_skipped += 1
                        continue

                    # Skip if already exists (fast local check)
                    if title.lower() in existing_titles:
                        papers_skipped += 1
                        continue

                    # Import new paper
                    result = import_paper(
                        paper_data=paper_data,
                        source='research_run',
                        run_timestamp=timestamp,
                        query=query
                    )
                    if result == 'imported':
                        papers_imported += 1
                        existing_titles.add(title.lower())
                    elif result == 'updated':
                        papers_updated += 1
                    else:
                        papers_skipped += 1

                print(f"  → Imported: {papers_imported}, Skipped: {papers_skipped}")

            except Exception as e:
                print(f"Error processing {item.name}: {e}")
                continue

        # Update sync run status
        supabase.table('sync_runs').update({
            'status': 'completed',
            'papers_imported': papers_imported,
            'papers_skipped': papers_skipped,
            'papers_updated': papers_updated,
            'completed_at': datetime.utcnow().isoformat()
        }).eq('id', run_id).execute()

        print(f"✅ Sync complete: {papers_imported} imported, {papers_skipped} skipped, {papers_updated} updated")

    except Exception as e:
        supabase.table('sync_runs').update({
            'status': 'failed',
            'error_message': str(e),
            'completed_at': datetime.utcnow().isoformat()
        }).eq('id', run_id).execute()
        raise

def sync_conference_database(run_id: str):
    """Sync papers from static conference database - OPTIMIZED with batching."""
    try:
        supabase.table('sync_runs').update({
            'status': 'running',
            'started_at': datetime.utcnow().isoformat()
        }).eq('id', run_id).execute()

        papers_imported = 0
        papers_skipped = 0
        papers_updated = 0

        if not DATABASE_PATH.exists():
            raise Exception(f"Database path not found: {DATABASE_PATH}")

        # Get existing paper titles for duplicate checking (one query instead of many)
        print("Loading existing papers for duplicate check...")
        existing_titles = set()
        try:
            offset = 0
            limit = 1000
            while True:
                response = supabase.table('papers').select('title').range(offset, offset + limit - 1).execute()
                if not response.data:
                    break
                for row in response.data:
                    if row.get('title'):
                        existing_titles.add(row['title'].lower().strip())
                if len(response.data) < limit:
                    break
                offset += limit
        except Exception as e:
            print(f"Warning: Could not load existing titles: {e}")

        print(f"Found {len(existing_titles)} existing papers")

        # Iterate through conference directories
        for conf_dir in DATABASE_PATH.iterdir():
            if not conf_dir.is_dir():
                continue

            conference = conf_dir.name.upper()
            if conference == 'NIPS':
                conference = 'NeurIPS'

            # Iterate through year files
            for year_file in conf_dir.glob("*.json"):
                try:
                    year_match = re.search(r'(\d{4})', year_file.stem)
                    if not year_match:
                        continue
                    year = int(year_match.group(1))

                    with open(year_file, 'r') as f:
                        papers_list = json.load(f)

                    if not isinstance(papers_list, list):
                        continue

                    print(f"Processing {conference} {year}: {len(papers_list)} papers")

                    for paper_data in papers_list:
                        title = paper_data.get('title', '').strip()
                        if not title:
                            papers_skipped += 1
                            continue

                        # Skip if already exists (fast local check)
                        if title.lower() in existing_titles:
                            papers_skipped += 1
                            continue

                        result = import_conference_paper(
                            paper_data=paper_data,
                            conference=conference,
                            year=year
                        )
                        if result == 'imported':
                            papers_imported += 1
                            existing_titles.add(title.lower())
                        elif result == 'updated':
                            papers_updated += 1
                        else:
                            papers_skipped += 1

                    print(f"  → {conference} {year}: Imported: {papers_imported}, Skipped: {papers_skipped}")

                except Exception as e:
                    print(f"Error processing {year_file}: {e}")
                    continue

        supabase.table('sync_runs').update({
            'status': 'completed',
            'papers_imported': papers_imported,
            'papers_skipped': papers_skipped,
            'papers_updated': papers_updated,
            'completed_at': datetime.utcnow().isoformat()
        }).eq('id', run_id).execute()

    except Exception as e:
        supabase.table('sync_runs').update({
            'status': 'failed',
            'error_message': str(e),
            'completed_at': datetime.utcnow().isoformat()
        }).eq('id', run_id).execute()
        raise

def import_paper(paper_data: dict, source: str, run_timestamp: str, query: str = '') -> str:
    """Import a paper from research_output run."""
    title = paper_data.get('title', '').strip()
    if not title:
        return 'skipped'

    # Check if paper exists by title
    existing = supabase.table('papers').select('id').eq('title', title).limit(1).execute()

    authors = paper_data.get('authors', [])
    if isinstance(authors, str):
        authors = [a.strip() for a in authors.split(',')]

    paper_record = {
        'title': title,
        'authors': authors,
        'abstract': paper_data.get('abstract', ''),
        'year': paper_data.get('year'),
        'venue': paper_data.get('venue', ''),
        'pdf_url': paper_data.get('pdf', paper_data.get('pdf_url', '')),
        'arxiv_id': paper_data.get('arxiv_id', ''),
        'import_source': source,
        'primary_area': paper_data.get('primary_area', ''),
        'keywords': paper_data.get('keywords', '').split(';') if isinstance(paper_data.get('keywords'), str) else [],
        'tldr': paper_data.get('tldr', ''),
    }

    if existing.data:
        paper_id = existing.data[0]['id']
        # Update paper with new info
        supabase.table('papers').update(paper_record).eq('id', paper_id).execute()
        result = 'updated'
    else:
        # Insert new paper
        insert_result = supabase.table('papers').insert(paper_record).execute()
        paper_id = insert_result.data[0]['id']
        result = 'imported'

    # Add to community_papers_global
    cpg_record = {
        'paper_id': paper_id,
        'source': source,
        'run_timestamp': run_timestamp,
        'query': query,
        'rank': paper_data.get('rank'),
        'similarity_score': paper_data.get('similarity_score'),
        'novelty_score': paper_data.get('novelty_score'),
        'recency_score': paper_data.get('recency_score'),
        'bm25_score': paper_data.get('bm25_score'),
        'combined_score': paper_data.get('combined_score'),
    }

    # Upsert to community_papers_global
    try:
        supabase.table('community_papers_global').upsert(
            cpg_record,
            on_conflict='paper_id,run_timestamp'
        ).execute()
    except:
        # If upsert fails, try insert
        supabase.table('community_papers_global').insert(cpg_record).execute()

    return result

def import_conference_paper(paper_data: dict, conference: str, year: int) -> str:
    """Import a paper from conference database."""
    title = paper_data.get('title', '').strip()
    if not title:
        return 'skipped'

    # Check if paper exists by title
    existing = supabase.table('papers').select('id').eq('title', title).limit(1).execute()

    # Parse authors
    authors_str = paper_data.get('author', '')
    authors = [a.strip() for a in authors_str.split(';')] if authors_str else []

    # Parse rating average
    rating_avg = None
    if paper_data.get('rating_avg'):
        try:
            rating_val = paper_data['rating_avg']
            if isinstance(rating_val, list) and len(rating_val) > 0:
                rating_avg = float(rating_val[0])
            elif isinstance(rating_val, (int, float)):
                rating_avg = float(rating_val)
        except:
            pass

    # Parse confidence average
    confidence_avg = None
    if paper_data.get('confidence_avg'):
        try:
            conf_val = paper_data['confidence_avg']
            if isinstance(conf_val, list) and len(conf_val) > 0:
                confidence_avg = float(conf_val[0])
            elif isinstance(conf_val, (int, float)):
                confidence_avg = float(conf_val)
        except:
            pass

    # Parse keywords
    keywords = []
    if paper_data.get('keywords'):
        kw = paper_data['keywords']
        if isinstance(kw, str):
            keywords = [k.strip() for k in kw.split(';')]
        elif isinstance(kw, list):
            keywords = kw

    paper_record = {
        'title': title,
        'authors': authors,
        'abstract': paper_data.get('abstract', ''),
        'year': year,
        'venue': f"{conference} {year}",
        'conference': conference,
        'import_source': 'conference_db',
        'track': paper_data.get('track', ''),
        'paper_status': paper_data.get('status', ''),
        'primary_area': paper_data.get('primary_area', ''),
        'keywords': keywords,
        'tldr': paper_data.get('tldr', ''),
        'rating_avg': rating_avg,
        'confidence_avg': confidence_avg,
        'github_url': paper_data.get('github', ''),
        'project_url': paper_data.get('project', ''),
        'bibtex': paper_data.get('bibtex', ''),
        'pdf_url': paper_data.get('site', ''),  # OpenReview URL
    }

    if existing.data:
        paper_id = existing.data[0]['id']
        supabase.table('papers').update(paper_record).eq('id', paper_id).execute()
        result = 'updated'
    else:
        insert_result = supabase.table('papers').insert(paper_record).execute()
        paper_id = insert_result.data[0]['id']
        result = 'imported'

    # Add to community_papers_global
    cpg_record = {
        'paper_id': paper_id,
        'source': 'conference_db',
        'run_timestamp': f"{conference}_{year}",
    }

    try:
        supabase.table('community_papers_global').upsert(
            cpg_record,
            on_conflict='paper_id,run_timestamp'
        ).execute()
    except:
        supabase.table('community_papers_global').insert(cpg_record).execute()

    return result

# ============================================================================
# API Endpoints
# ============================================================================

@app.get("/")
async def root():
    return {"message": "Community Papers API", "version": "1.0.0"}

@app.get("/health")
async def health():
    return {"status": "healthy"}

@app.post("/sync/trigger")
async def trigger_sync(request: SyncRequest, background_tasks: BackgroundTasks):
    """Trigger background sync from specified sources."""
    run_timestamp = datetime.utcnow().strftime("%Y%m%d_%H%M%S")

    # Create sync run record
    result = supabase.table('sync_runs').insert({
        'run_timestamp': run_timestamp,
        'source_type': request.source_type,
        'status': 'pending'
    }).execute()

    run_id = result.data[0]['id']

    # Add background tasks based on source type
    if request.source_type in ['full', 'research_output']:
        background_tasks.add_task(sync_research_output_runs, run_id)

    if request.source_type in ['full', 'conference_db']:
        background_tasks.add_task(sync_conference_database, run_id)

    return {
        "message": f"Sync triggered for {request.source_type}",
        "run_id": run_id,
        "run_timestamp": run_timestamp
    }

@app.get("/sync/status")
async def get_sync_status(limit: int = 10):
    """Get status of recent sync runs."""
    result = supabase.table('sync_runs').select('*').order(
        'created_at', desc=True
    ).limit(limit).execute()

    return {"sync_runs": result.data}

@app.get("/sync/status/{run_id}")
async def get_sync_run_status(run_id: str):
    """Get status of a specific sync run."""
    result = supabase.table('sync_runs').select('*').eq('id', run_id).single().execute()

    if not result.data:
        raise HTTPException(status_code=404, detail="Sync run not found")

    return result.data

@app.get("/community/papers", response_model=PaginatedResponse)
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

@app.get("/community/papers/{paper_id}")
async def get_community_paper(paper_id: str):
    """Get a single community paper by ID."""
    result = supabase.table('community_papers_global').select(
        '*, papers(*)'
    ).eq('paper_id', paper_id).limit(1).execute()

    if not result.data:
        raise HTTPException(status_code=404, detail="Paper not found")

    return result.data[0]

@app.post("/community/papers/{paper_id}/share", response_model=ShareResponse)
async def generate_share_link(paper_id: str):
    """Generate a shareable link for a paper."""
    result = supabase.rpc('generate_paper_share_token', {
        'p_paper_id': paper_id
    }).execute()

    share_token = result.data
    if not share_token:
        raise HTTPException(status_code=404, detail="Paper not found in community")

    # Construct share URL (frontend will handle this)
    share_url = f"/share/{share_token}"

    return ShareResponse(share_token=share_token, share_url=share_url)

@app.get("/share/{share_token}")
async def get_shared_paper(share_token: str):
    """Get a paper by its share token (public endpoint)."""
    result = supabase.rpc('get_paper_by_share_token', {
        'p_share_token': share_token
    }).execute()

    if not result.data:
        raise HTTPException(status_code=404, detail="Shared paper not found")

    return result.data[0]

@app.get("/community/filters", response_model=FilterOptions)
async def get_filter_options():
    """Get available filter options for community papers."""
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

@app.post("/community/papers/{paper_id}/add-to-circle")
async def add_paper_to_circle(paper_id: str, circle_id: str, user_id: Optional[str] = None):
    """Add a community paper to a user's circle."""
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

# ============================================================================
# Run
# ============================================================================

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)

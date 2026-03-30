"""
PaperCircle Papers API — HuggingFace Spaces
=============================================
Lightweight FastAPI serving conference papers from a Parquet dataset via DuckDB.
Deployed on HuggingFace Spaces (free tier).
"""

import os
import json
import time
from contextlib import asynccontextmanager
from typing import Optional, List

import duckdb
from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from huggingface_hub import hf_hub_download

# =============================================================================
# Configuration
# =============================================================================

HF_DATASET_REPO = os.getenv("HF_DATASET_REPO", "ItsMaxNorm/pc-database")
PARQUET_PATH = os.getenv("PARQUET_PATH", "")

# =============================================================================
# Database
# =============================================================================

db: Optional[duckdb.DuckDBPyConnection] = None
ready = False


def init_database():
    """Load Parquet into DuckDB and create FTS index."""
    global db, ready

    start = time.time()
    db = duckdb.connect(":memory:")

    # Find the parquet file
    parquet_file = None

    # Option 1: Local parquet file
    if PARQUET_PATH and os.path.exists(PARQUET_PATH):
        parquet_file = PARQUET_PATH
        print(f"[DB] Using local Parquet: {parquet_file}")

    # Option 2: Download from HF Hub
    elif HF_DATASET_REPO:
        print(f"[DB] Downloading dataset from HF Hub: {HF_DATASET_REPO}")
        parquet_file = hf_hub_download(
            repo_id=HF_DATASET_REPO,
            filename="papers.parquet",
            repo_type="dataset",
        )
        print(f"[DB] Downloaded to: {parquet_file}")

    # Option 3: Look in local data/ directory
    else:
        local_path = os.path.join(os.path.dirname(__file__), "data", "papers.parquet")
        if os.path.exists(local_path):
            parquet_file = local_path
            print(f"[DB] Using bundled Parquet: {parquet_file}")

    if not parquet_file:
        raise RuntimeError(
            "No Parquet file found. Set HF_DATASET_REPO or PARQUET_PATH env var, "
            "or place data/papers.parquet in the app directory."
        )

    # Load into DuckDB
    db.execute(f"""
        CREATE TABLE papers AS
        SELECT * FROM read_parquet('{parquet_file}')
    """)

    row_count = db.execute("SELECT COUNT(*) FROM papers").fetchone()[0]
    print(f"[DB] Loaded {row_count} papers in {time.time() - start:.1f}s")

    # Install and load FTS extension
    db.execute("INSTALL fts")
    db.execute("LOAD fts")

    # Create FTS index on title, abstract, tldr
    db.execute("""
        PRAGMA create_fts_index(
            'papers', 'paper_id',
            'title', 'abstract', 'tldr',
            overwrite=1
        )
    """)
    print(f"[DB] FTS index created in {time.time() - start:.1f}s total")

    ready = True


# =============================================================================
# App
# =============================================================================

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_database()
    yield
    if db:
        db.close()


app = FastAPI(
    title="PaperCircle Papers API",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =============================================================================
# Conference Name Normalization
# =============================================================================

# Map of lowercase aliases → canonical names stored in the parquet
_CONFERENCE_ALIASES = {
    "nips": "NeurIPS",
    "neurips": "NeurIPS",
    "iclr": "ICLR",
    "icml": "ICML",
    "cvpr": "CVPR",
    "iccv": "ICCV",
    "eccv": "ECCV",
    "aaai": "AAAI",
    "ijcai": "IJCAI",
    "acl": "ACL",
    "emnlp": "EMNLP",
    "naacl": "NAACL",
    "coling": "COLING",
    "colm": "COLM",
    "icra": "ICRA",
    "iros": "IROS",
    "rss": "RSS",
    "corl": "CoRL",
    "kdd": "KDD",
    "www": "WWW",
    "aistats": "AISTATS",
    "uai": "UAI",
    "colt": "COLT",
    "acml": "ACML",
    "wacv": "WACV",
    "siggraph": "SIGGRAPH",
    "siggraphasia": "SIGGRAPHASIA",
    "acmmm": "ACMMM",
    "3dv": "3DV",
    "automl": "AutoML",
    "alt": "ALT",
    "ai4x": "AI4X",
}


def _normalize_conference(name: str) -> str:
    """Normalize conference name to match parquet data (uppercase)."""
    return _CONFERENCE_ALIASES.get(name.lower(), name.upper())


# =============================================================================
# Endpoints
# =============================================================================

@app.get("/")
async def root():
    return {"name": "PaperCircle Papers API", "status": "healthy" if ready else "loading", "docs": "/docs"}

@app.get("/health")
async def health():
    return {"status": "healthy" if ready else "loading", "ready": ready}


@app.get("/api/community/papers")
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
    sort_by: str = Query("year", regex="^(imported_at|year|rating|combined_score|recency|title|likes|views)$"),
):
    """Get paginated community papers with filters."""
    if not ready:
        raise HTTPException(status_code=503, detail="Database loading, please retry")

    offset = (page - 1) * limit

    where_clauses = []
    params = []

    if year is not None:
        where_clauses.append("year = ?")
        params.append(year)
    if conference:
        where_clauses.append("conference = ?")
        params.append(_normalize_conference(conference))
    if source:
        where_clauses.append("source = ?")
        params.append(source)
    if track:
        where_clauses.append("track = ?")
        params.append(track)
    if status:
        where_clauses.append("paper_status = ?")
        params.append(status)
    if primary_area:
        where_clauses.append("primary_area = ?")
        params.append(primary_area)
    if min_rating is not None:
        where_clauses.append("rating_avg >= ?")
        params.append(min_rating)
    if keywords:
        # Simple ILIKE search for keyword filtering
        where_clauses.append("(title ILIKE ? OR abstract ILIKE ? OR keywords ILIKE ?)")
        pattern = f"%{keywords}%"
        params.extend([pattern, pattern, pattern])

    where_sql = " AND ".join(where_clauses) if where_clauses else "1=1"

    # Sort mapping
    sort_map = {
        "year": "year DESC NULLS LAST",
        "imported_at": "year DESC NULLS LAST",
        "rating": "rating_avg DESC NULLS LAST",
        "recency": "year DESC NULLS LAST",
        "title": "title ASC",
        "combined_score": "rating_avg DESC NULLS LAST",
        "likes": "year DESC NULLS LAST",
        "views": "year DESC NULLS LAST",
    }
    order_sql = sort_map.get(sort_by, "year DESC NULLS LAST")

    # Get total count
    count_result = db.execute(
        f"SELECT COUNT(*) FROM papers WHERE {where_sql}", params
    ).fetchone()
    total = count_result[0]

    # Get papers
    rows = db.execute(
        f"""
        SELECT paper_id, title, authors, abstract, year, venue, conference,
               source, track, paper_status, primary_area, keywords, tldr,
               pdf_url, arxiv_id, rating_avg, github_url
        FROM papers
        WHERE {where_sql}
        ORDER BY {order_sql}
        LIMIT ? OFFSET ?
        """,
        params + [limit, offset],
    ).fetchall()

    columns = [
        "paper_id", "title", "authors", "abstract", "year", "venue", "conference",
        "source", "track", "paper_status", "primary_area", "keywords", "tldr",
        "pdf_url", "arxiv_id", "rating_avg", "github_url",
    ]

    papers = []
    for row in rows:
        paper = dict(zip(columns, row))
        # Parse JSON strings back to lists
        paper["authors"] = json.loads(paper["authors"]) if paper["authors"] else []
        paper["keywords"] = json.loads(paper["keywords"]) if paper["keywords"] else []
        papers.append(paper)

    total_pages = (total + limit - 1) // limit if total > 0 else 1

    return {
        "papers": papers,
        "total": total,
        "page": page,
        "limit": limit,
        "total_pages": total_pages,
    }


@app.get("/api/community/papers/{paper_id}")
async def get_community_paper(paper_id: str):
    """Get a single paper by paper_id."""
    if not ready:
        raise HTTPException(status_code=503, detail="Database loading")

    row = db.execute(
        """
        SELECT paper_id, title, authors, abstract, year, venue, conference,
               source, track, paper_status, primary_area, keywords, tldr,
               pdf_url, arxiv_id, rating_avg, github_url, bibtex
        FROM papers WHERE paper_id = ?
        """,
        [paper_id],
    ).fetchone()

    if not row:
        raise HTTPException(status_code=404, detail="Paper not found")

    columns = [
        "paper_id", "title", "authors", "abstract", "year", "venue", "conference",
        "source", "track", "paper_status", "primary_area", "keywords", "tldr",
        "pdf_url", "arxiv_id", "rating_avg", "github_url", "bibtex",
    ]
    paper = dict(zip(columns, row))
    paper["authors"] = json.loads(paper["authors"]) if paper["authors"] else []
    paper["keywords"] = json.loads(paper["keywords"]) if paper["keywords"] else []
    return paper


@app.get("/api/community/filters")
async def get_filter_options():
    """Get available filter options."""
    if not ready:
        raise HTTPException(status_code=503, detail="Database loading")

    years = [r[0] for r in db.execute(
        "SELECT DISTINCT year FROM papers WHERE year IS NOT NULL ORDER BY year DESC"
    ).fetchall()]

    conferences = [r[0] for r in db.execute(
        "SELECT DISTINCT conference FROM papers WHERE conference IS NOT NULL AND conference != '' ORDER BY conference"
    ).fetchall()]

    sources = [r[0] for r in db.execute(
        "SELECT DISTINCT source FROM papers WHERE source IS NOT NULL AND source != '' ORDER BY source"
    ).fetchall()]

    tracks = [r[0] for r in db.execute(
        "SELECT DISTINCT track FROM papers WHERE track IS NOT NULL AND track != '' ORDER BY track"
    ).fetchall()]

    statuses = [r[0] for r in db.execute(
        "SELECT DISTINCT paper_status FROM papers WHERE paper_status IS NOT NULL AND paper_status != '' ORDER BY paper_status"
    ).fetchall()]

    primary_areas = [r[0] for r in db.execute(
        "SELECT DISTINCT primary_area FROM papers WHERE primary_area IS NOT NULL AND primary_area != '' ORDER BY primary_area"
    ).fetchall()]

    return {
        "years": years,
        "conferences": conferences,
        "sources": sources,
        "tracks": tracks,
        "statuses": statuses,
        "primary_areas": primary_areas,
    }


@app.get("/api/search")
async def search_papers(
    query: str = Query(..., min_length=1),
    conferences: Optional[str] = None,
    start_year: Optional[int] = None,
    end_year: Optional[int] = None,
    limit: int = Query(50, ge=1, le=200),
    offset: int = Query(0, ge=0),
):
    """Full-text search with optional filters. conferences is comma-separated."""
    if not ready:
        raise HTTPException(status_code=503, detail="Database loading")

    conf_list = [_normalize_conference(c.strip()) for c in conferences.split(",")] if conferences else None

    # Try FTS first
    try:
        papers = _search_fts(query, conf_list, start_year, end_year, limit, offset)
        if papers:
            return {"papers": papers, "search_type": "fts", "count": len(papers)}
    except Exception as e:
        print(f"[Search] FTS failed: {e}, falling back to simple search")

    # Fallback to simple ILIKE search
    papers = _search_simple(query, conf_list, start_year, end_year, limit, offset)
    return {"papers": papers, "search_type": "simple", "count": len(papers)}


def _search_fts(query, conferences, start_year, end_year, limit, offset):
    """Full-text search using DuckDB FTS extension."""
    where_clauses = []
    params = []

    if conferences:
        placeholders = ",".join(["?" for _ in conferences])
        where_clauses.append(f"p.conference IN ({placeholders})")
        params.extend(conferences)
    if start_year is not None:
        where_clauses.append("p.year >= ?")
        params.append(start_year)
    if end_year is not None:
        where_clauses.append("p.year <= ?")
        params.append(end_year)

    extra_where = (" AND " + " AND ".join(where_clauses)) if where_clauses else ""

    rows = db.execute(
        f"""
        SELECT p.paper_id, p.title, p.authors, p.abstract, p.year, p.venue,
               p.conference, p.arxiv_id, p.pdf_url, p.rating_avg, p.keywords,
               p.tldr, p.primary_area,
               fts_main_papers.match_bm25(paper_id, ?) AS score
        FROM papers p
        WHERE score IS NOT NULL {extra_where}
        ORDER BY score DESC
        LIMIT ? OFFSET ?
        """,
        [query] + params + [limit, offset],
    ).fetchall()

    columns = [
        "paper_id", "title", "authors", "abstract", "year", "venue",
        "conference", "arxiv_id", "pdf_url", "rating_avg", "keywords",
        "tldr", "primary_area", "score",
    ]

    papers = []
    for row in rows:
        paper = dict(zip(columns, row))
        paper["authors"] = json.loads(paper["authors"]) if paper["authors"] else []
        paper["keywords"] = json.loads(paper["keywords"]) if paper["keywords"] else []
        papers.append(paper)

    return papers


def _search_simple(query, conferences, start_year, end_year, limit, offset):
    """Fallback ILIKE-based search."""
    where_clauses = ["(p.title ILIKE ? OR p.abstract ILIKE ? OR p.tldr ILIKE ?)"]
    pattern = f"%{query}%"
    params = [pattern, pattern, pattern]

    if conferences:
        placeholders = ",".join(["?" for _ in conferences])
        where_clauses.append(f"p.conference IN ({placeholders})")
        params.extend(conferences)
    if start_year is not None:
        where_clauses.append("p.year >= ?")
        params.append(start_year)
    if end_year is not None:
        where_clauses.append("p.year <= ?")
        params.append(end_year)

    where_sql = " AND ".join(where_clauses)

    rows = db.execute(
        f"""
        SELECT p.paper_id, p.title, p.authors, p.abstract, p.year, p.venue,
               p.conference, p.arxiv_id, p.pdf_url, p.rating_avg, p.keywords,
               p.tldr, p.primary_area
        FROM papers p
        WHERE {where_sql}
        ORDER BY
            CASE WHEN p.title ILIKE ? THEN 0 ELSE 1 END,
            p.rating_avg DESC NULLS LAST,
            p.year DESC NULLS LAST
        LIMIT ? OFFSET ?
        """,
        params + [pattern, limit, offset],
    ).fetchall()

    columns = [
        "paper_id", "title", "authors", "abstract", "year", "venue",
        "conference", "arxiv_id", "pdf_url", "rating_avg", "keywords",
        "tldr", "primary_area",
    ]

    papers = []
    for row in rows:
        paper = dict(zip(columns, row))
        paper["authors"] = json.loads(paper["authors"]) if paper["authors"] else []
        paper["keywords"] = json.loads(paper["keywords"]) if paper["keywords"] else []
        papers.append(paper)

    return papers


# =============================================================================
# Main
# =============================================================================

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=7860)

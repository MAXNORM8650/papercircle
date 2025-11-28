"""
FastAPI server for Research Discovery Agent
Provides REST API endpoints for the multi-agent paper discovery system
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict
import json
from discovery_papers import (
    create_research_agent,
    MODE_WEIGHTS,
    search_arxiv_papers,
    rate_paper_relevance,
    calculate_mmr_diversity
)

app = FastAPI(title="Research Discovery API")

# Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class DiscoveryRequest(BaseModel):
    query: str
    mode: str = "balanced"  # stable, discovery, or balanced
    apply_diversity: bool = True
    max_results: Optional[int] = None


class PaperScore(BaseModel):
    topic_relevance: float
    novelty: float
    authority_proxy: float
    final_score: float


class DiscoveredPaper(BaseModel):
    id: str
    title: str
    summary: str
    year: int
    authors: List[str]
    url: str
    published: str
    age_score: float
    scores: PaperScore
    category: str  # "overall", "hidden_gem", "canonical"


class DiscoveryResponse(BaseModel):
    query: str
    mode: str
    total_papers: int
    top_overall: List[DiscoveredPaper]
    hidden_gems: List[DiscoveredPaper]
    canonical_papers: List[DiscoveredPaper]
    all_papers: List[DiscoveredPaper]
    mode_weights: Dict[str, float]


@app.get("/")
async def root():
    return {
        "service": "Research Discovery API",
        "version": "1.0.0",
        "modes": list(MODE_WEIGHTS.keys()),
        "endpoints": ["/discover", "/modes"]
    }


@app.get("/modes")
async def get_modes():
    """Get available discovery modes and their weights"""
    return {
        "modes": MODE_WEIGHTS,
        "descriptions": {
            "stable": "Prioritize established, authoritative works",
            "discovery": "Hunt for novel, cutting-edge research",
            "balanced": "Mix of both approaches"
        }
    }


@app.post("/discover", response_model=DiscoveryResponse)
async def discover_papers(request: DiscoveryRequest):
    """
    Main endpoint for paper discovery
    Uses the multi-agent system to find and rank papers
    """
    try:
        # Validate mode
        if request.mode not in MODE_WEIGHTS:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid mode. Must be one of: {list(MODE_WEIGHTS.keys())}"
            )

        weights = MODE_WEIGHTS[request.mode]

        # Step 1: Search ArXiv
        papers_json = search_arxiv_papers(
            query=request.query,
            mode=request.mode,
            max_results=request.max_results
        )
        papers = json.loads(papers_json)

        if not papers:
            return DiscoveryResponse(
                query=request.query,
                mode=request.mode,
                total_papers=0,
                top_overall=[],
                hidden_gems=[],
                canonical_papers=[],
                all_papers=[],
                mode_weights=weights
            )

        # Step 2: Score each paper
        scored_papers = []
        for paper in papers:
            scores_json = rate_paper_relevance(
                title=paper['title'],
                abstract=paper['summary'],
                user_query=request.query
            )
            scores = json.loads(scores_json)

            # Calculate final score
            final_score = (
                weights['relevance'] * scores['topic_relevance'] +
                weights['authority'] * scores['authority_proxy'] +
                weights['novelty'] * scores['novelty']
            )

            scored_paper = {
                **paper,
                'scores': {
                    **scores,
                    'final_score': round(final_score, 3)
                }
            }
            scored_papers.append(scored_paper)

        # Step 3: Sort by final score
        scored_papers.sort(key=lambda x: x['scores']['final_score'], reverse=True)

        # Step 4: Apply MMR diversity if requested
        if request.apply_diversity:
            lambda_param = 0.7 if request.mode == "stable" else 0.5
            diversified_ids_json = calculate_mmr_diversity(
                papers_json=json.dumps(
                    [{**p, 'final_score': p['scores']['final_score']} for p in scored_papers]
                ),
                lambda_param=lambda_param,
                top_k=min(10, len(scored_papers))
            )
            diversified_ids = json.loads(diversified_ids_json)

            # Reorder top papers by MMR
            id_to_paper = {p['id']: p for p in scored_papers}
            top_papers = [id_to_paper[pid] for pid in diversified_ids if pid in id_to_paper]
            remaining_papers = [p for p in scored_papers if p['id'] not in diversified_ids]
            scored_papers = top_papers + remaining_papers

        # Step 5: Categorize papers
        # Top 5 Overall
        top_overall = scored_papers[:5]
        for p in top_overall:
            p['category'] = 'overall'

        # Hidden Gems: High novelty, sorted by novelty
        hidden_gems_candidates = [p for p in scored_papers if p['scores']['novelty'] > 0.6]
        hidden_gems_candidates.sort(key=lambda x: x['scores']['novelty'], reverse=True)
        hidden_gems = hidden_gems_candidates[:3]
        for p in hidden_gems:
            p['category'] = 'hidden_gem'

        # Canonical Papers: High authority, sorted by authority
        canonical_candidates = [p for p in scored_papers if p['scores']['authority_proxy'] > 0.5]
        canonical_candidates.sort(key=lambda x: x['scores']['authority_proxy'], reverse=True)
        canonical_papers = canonical_candidates[:3]
        for p in canonical_papers:
            p['category'] = 'canonical'

        # Convert to response format
        def to_discovered_paper(paper: dict) -> DiscoveredPaper:
            return DiscoveredPaper(
                id=paper['id'],
                title=paper['title'],
                summary=paper['summary'],
                year=paper['year'],
                authors=paper['authors'],
                url=paper['url'],
                published=paper['published'],
                age_score=paper['age_score'],
                scores=PaperScore(**paper['scores']),
                category=paper.get('category', 'overall')
            )

        return DiscoveryResponse(
            query=request.query,
            mode=request.mode,
            total_papers=len(scored_papers),
            top_overall=[to_discovered_paper(p) for p in top_overall],
            hidden_gems=[to_discovered_paper(p) for p in hidden_gems],
            canonical_papers=[to_discovered_paper(p) for p in canonical_papers],
            all_papers=[to_discovered_paper(p) for p in scored_papers],
            mode_weights=weights
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

"""
Fast Discovery API - Optimized Paper Discovery
==============================================

Two-phase approach:
1. Fast Search (2-5s) - Direct API calls, immediate results
2. Optional Enhancement - AI agent workflows on demand

No findpapers - uses direct tools from agents/research_agnet.py
"""

from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import Optional, List, Dict, Any, AsyncGenerator
import uvicorn
import asyncio
from datetime import datetime
import sys
import os
import json
from queue import Queue
from threading import Thread

# Add agents directory to path (now in backend/agents/agents/)
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'agents', 'agents'))

# Import research tools
try:
    from research_agnet import (
        PaperSearchEngine,
        PaperSearchTool,
        PaperSortTool,
        PaperAnalysisTool,
        PaperExportTool,
        VisualizationTool,
        WebSearchTool,
        Paper,
        paper_store,
        create_research_pipeline,
        quick_research
    )
    HAS_RESEARCH_TOOLS = True
except ImportError as e:
    print(f"Warning: research_agnet.py import failed: {e}")
    HAS_RESEARCH_TOOLS = False
    create_research_pipeline = None
    quick_research = None

# Try to import LLM model for multi-agent orchestrator
try:
    from smolagents import LiteLLMModel
    HAS_LLM = True
except ImportError:
    print("Warning: smolagents not available - multi-agent orchestrator disabled")
    HAS_LLM = False
    LiteLLMModel = None

# API_BASE="http://10.127.30.115:11434"
# MODEL_ID = "ollama_chat/qwen3-coder:30b"
# Model configuration for multi-agent orchestrator
MODEL_CONFIG = {
    "api_base": os.getenv("LLM_API_BASE", "http://localhost:11434"),  # Ollama default
    "model_id": os.getenv("LLM_MODEL_ID", "ollama_chat/qwen2.5:7b"),
    "num_ctx": int(os.getenv("LLM_NUM_CTX", "8192"))
}

app = FastAPI(title="Fast Discovery API", version="2.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request models
class DiscoveryRequest(BaseModel):
    query: str
    mode: Optional[str] = "balanced"
    sorting_strategy: Optional[str] = "relevance"
    sources: Optional[str] = "arxiv,semantic_scholar"
    max_results_per_source: Optional[int] = 25
    apply_diversity: Optional[bool] = True
    diversity_lambda: Optional[float] = 0.5
    min_year: Optional[int] = 2020
    max_year: Optional[int] = datetime.now().year
    custom_weights: Optional[Dict[str, float]] = None
    request_id: Optional[str] = None

class AgentWorkflowRequest(BaseModel):
    workflow: str  # "quick", "full", or "custom"
    papers: List[Dict[str, Any]]
    query: str
    tasks: Optional[List[str]] = None  # For custom workflow

class MultiAgentRequest(BaseModel):
    query: str
    max_results: Optional[int] = 30
    min_year: Optional[int] = 2020
    sort_by: Optional[str] = "relevance"
    export_formats: Optional[List[str]] = ["json"]
    generate_visualization: Optional[bool] = True
    web_search: Optional[bool] = True

# Store for active requests (for cancellation)
active_requests: Dict[str, bool] = {}
agent_message_queues: Dict[str, Queue] = {}

# MODE_WEIGHTS from discovery_papers.py
MODE_WEIGHTS = {
    "stable": {"relevance": 0.5, "authority": 0.4, "novelty": 0.1},
    "discovery": {"relevance": 0.3, "authority": 0.1, "novelty": 0.6},
    "balanced": {"relevance": 0.4, "authority": 0.3, "novelty": 0.3}
}

# ============================================================================
# Fast Search Implementation (Phase 1)
# ============================================================================

async def fast_search_papers(request: DiscoveryRequest) -> Dict[str, Any]:
    """
    Fast paper search using COMPLETE direct tools workflow (example_direct_tools pattern).

    Follows the exact pattern from agents/query.py:
    1. Search - PaperSearchTool
    2. Sort - PaperSortTool
    3. Analyze - PaperAnalysisTool (ALL analysis)
    4. Export - PaperExportTool (JSON, BibTeX)
    5. Visualize - VisualizationTool (dashboard HTML)

    Returns complete results with papers, analysis, exports, and visualization.
    """
    try:
        # Mark request as active
        if request.request_id:
            active_requests[request.request_id] = True

        print(f"\n{'='*60}")
        print(f"🚀 FAST DISCOVERY - Direct Tools Workflow")
        print(f"Query: {request.query}")
        print(f"{'='*60}\n")

        # Initialize ALL tools (following example_direct_tools pattern)
        search_tool = PaperSearchTool()
        sort_tool = PaperSortTool()
        analysis_tool = PaperAnalysisTool()
        export_tool = PaperExportTool()
        viz_tool = VisualizationTool()

        # Step 1: Search
        print("Step 1: Searching...")
        search_result = search_tool.forward(
            query=request.query,
            max_results=request.max_results_per_source,
            start_year=request.min_year,
            sources=request.sources
        )
        print(f"✓ Search complete: {search_result[:150]}...\n")

        # Check if papers were found
        papers_found = len(paper_store.papers) if hasattr(paper_store, 'papers') else 0
        if papers_found == 0:
            return {
                "query": request.query,
                "mode_used": request.mode or "balanced",
                "mode_weights": request.custom_weights or MODE_WEIGHTS.get(request.mode, MODE_WEIGHTS["balanced"]),
                "all_papers_sorted": [],
                "total_papers": 0,
                "error": "No papers found. Try different search terms or broaden your query."
            }

        # Check if cancelled
        if request.request_id and not active_requests.get(request.request_id, False):
            raise HTTPException(status_code=499, detail="Request cancelled")

        # Step 2: Sort
        print("Step 2: Sorting...")
        weights = request.custom_weights if request.custom_weights else MODE_WEIGHTS.get(request.mode, MODE_WEIGHTS["balanced"])

        # Convert mode weights to sort weights format
        sort_weights = {
            "recency": weights.get("authority", 0.3) * 0.5,
            "citations": weights.get("authority", 0.3) * 0.5,
            "similarity": weights.get("relevance", 0.4),
            "novelty": weights.get("novelty", 0.3)
        }

        sort_result = sort_tool.forward(
            sort_by="combined",
            weights=json.dumps(sort_weights),
            top_k=min(papers_found, 200)
        )
        print(f"✓ Sort complete: {sort_result[:150]}...\n")

        # Step 3: Analyze (ALL analysis types)
        print("Step 3: Analyzing...")
        analysis_result = analysis_tool.forward(analysis_type="all")
        print(f"✓ Analysis complete: {len(analysis_result)} chars\n")

        # Step 4: Export
        print("Step 4: Exporting...")
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')

        # Export JSON
        json_filename = f"results_{timestamp}.json"
        json_export = export_tool.forward(filename=json_filename, format="json")
        print(f"✓ Exported JSON: {json_filename}")

        # Export BibTeX
        bib_filename = f"refs_{timestamp}.bib"
        bib_export = export_tool.forward(filename=bib_filename, format="bib")
        print(f"✓ Exported BibTeX: {bib_filename}\n")

        # Step 5: Visualize
        print("Step 5: Creating visualization...")
        viz_filename = f"dashboard_{timestamp}.html"
        viz_result = viz_tool.forward(viz_type="dashboard", filename=viz_filename)
        print(f"✓ Visualization created: {viz_filename}\n")

        # Get final sorted papers
        sorted_papers = paper_store.papers

        # Apply diversity if requested using MMR
        if request.apply_diversity and len(sorted_papers) > 20:
            sorted_papers = apply_mmr_diversity(
                sorted_papers,
                request.diversity_lambda,
                min(len(sorted_papers), 100)
            )

        # Parse analysis results for structured data
        import re
        year_dist = {}
        top_authors = []
        trends = []
        venues_list = []

        if isinstance(analysis_result, str):
            # Extract year distribution
            year_matches = re.findall(r'(\d{4}):\s*[\s█]*\((\d+)\)', analysis_result)
            if not year_matches:
                year_matches = re.findall(r'(\d{4}):\s*(\d+)', analysis_result)
            year_dist = {year: int(count) for year, count in year_matches}

            # Extract top authors
            author_section = re.search(r'Top Authors:?(.+?)(?:\n\n|##|\Z)', analysis_result, re.DOTALL | re.IGNORECASE)
            if author_section:
                authors_text = author_section.group(1)
                author_lines = [line.strip('- •123456789. ') for line in authors_text.split('\n') if line.strip()]
                for line in author_lines[:10]:
                    match = re.match(r'(.+?):\s*(\d+)', line)
                    if match:
                        top_authors.append({"name": match.group(1).strip(), "count": int(match.group(2))})

            # Extract trends/topics
            trends_section = re.search(r'(?:Top Keywords|Topics):?(.+?)(?:\n\n|##|\Z)', analysis_result, re.DOTALL | re.IGNORECASE)
            if trends_section:
                trends_text = trends_section.group(1)
                trend_lines = [line.strip('- •123456789. ') for line in trends_text.split('\n') if line.strip()]
                for line in trend_lines[:15]:
                    match = re.match(r'(.+?):\s*(\d+)', line)
                    if match:
                        trends.append({"keyword": match.group(1).strip(), "count": int(match.group(2))})

            # Extract venues
            venue_section = re.search(r'Top Venues:?(.+?)(?:\n\n|##|\Z)', analysis_result, re.DOTALL | re.IGNORECASE)
            if venue_section:
                venue_text = venue_section.group(1)
                venue_lines = [line.strip('- •123456789. ') for line in venue_text.split('\n') if line.strip()]
                for line in venue_lines[:10]:
                    match = re.match(r'(.+?):\s*(\d+)', line)
                    if match:
                        venues_list.append({"name": match.group(1).strip(), "count": int(match.group(2))})

        # Build comprehensive response
        response = {
            "query": request.query,
            "mode_used": request.mode or "balanced",
            "mode_weights": weights,
            "total_papers": len(sorted_papers),

            # Papers
            "all_papers_sorted": [paper_to_dict(p) for p in sorted_papers],

            # Analysis results
            "analysis": {
                "full_text": analysis_result,
                "statistics": {
                    "year_distribution": year_dist,
                    "top_authors": top_authors if top_authors else [{"name": "N/A", "count": 0}],
                    "research_trends": trends if trends else [{"keyword": "N/A", "count": 0}],
                    "top_venues": venues_list if venues_list else [{"name": "N/A", "count": 0}]
                }
            },

            # Export files
            "exports": {
                "json": {
                    "filename": json_filename,
                    "message": json_export
                },
                "bibtex": {
                    "filename": bib_filename,
                    "message": bib_export
                }
            },

            # Visualization
            "visualization": {
                "filename": viz_filename,
                "message": viz_result,
                "path": viz_filename  # For frontend to download/display
            },

            # Legacy fields for compatibility
            "search_spec": {
                "core_keywords": request.query.split(),
                "suggested_mode": request.mode,
                "plausible_paper_titles": [p.title for p in sorted_papers[:3]]
            }
        }

        print(f"{'='*60}")
        print(f"✅ COMPLETE - Found {len(sorted_papers)} papers")
        print(f"   Analysis: ✓")
        print(f"   Exports: {json_filename}, {bib_filename}")
        print(f"   Visualization: {viz_filename}")
        print(f"{'='*60}\n")

        return response

    except Exception as e:
        print(f"❌ Error in fast search: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        # Clean up
        if request.request_id and request.request_id in active_requests:
            del active_requests[request.request_id]

# Old manual score calculation functions removed - now using tools from research_agnet.py
# See PaperSortTool.forward() in agents/research_agnet.py for proper implementation

def apply_mmr_diversity(papers: List[Paper], lambda_param: float, top_k: int) -> List[Paper]:
    """Apply Maximal Marginal Relevance for diversity."""
    from sklearn.feature_extraction.text import TfidfVectorizer
    from sklearn.metrics.pairwise import cosine_similarity
    import numpy as np

    if len(papers) <= top_k:
        return papers

    try:
        # Create TF-IDF vectors
        texts = [f"{p.title} {p.abstract}" for p in papers]
        vectorizer = TfidfVectorizer(max_features=100, stop_words='english')
        embeddings = vectorizer.fit_transform(texts).toarray()

        # MMR algorithm
        selected_indices = []
        remaining_indices = list(range(len(papers)))

        # Start with highest scored paper
        scores = [p.final_score for p in papers]
        first_idx = np.argmax(scores)
        selected_indices.append(first_idx)
        remaining_indices.remove(first_idx)

        # Iteratively select diverse papers
        for _ in range(min(top_k - 1, len(remaining_indices))):
            mmr_scores = []

            for idx in remaining_indices:
                relevance = scores[idx]
                similarities = cosine_similarity(
                    embeddings[idx].reshape(1, -1),
                    embeddings[selected_indices]
                )
                max_similarity = np.max(similarities)
                mmr = lambda_param * relevance - (1 - lambda_param) * max_similarity
                mmr_scores.append(mmr)

            best_idx = remaining_indices[np.argmax(mmr_scores)]
            selected_indices.append(best_idx)
            remaining_indices.remove(best_idx)

        return [papers[i] for i in selected_indices]
    except:
        # Fallback: just return top k
        return papers[:top_k]

def paper_to_dict(paper: Paper) -> Dict[str, Any]:
    """Convert Paper object to dictionary."""
    return {
        "id": paper.doi or paper.url.split('/')[-1] if paper.url else str(hash(paper.title)),
        "title": paper.title,
        "authors": paper.authors,
        "abstract": paper.abstract,
        "year": paper.year,
        "venue": paper.venue,
        "url": paper.url,
        "source": paper.source,
        "doi": paper.doi,
        "pdf_url": paper.pdf_url,
        "citations": paper.citations,
        "relevance_score": round(getattr(paper, 'relevance_score', paper.similarity_score), 3),
        "similarity_score": round(paper.similarity_score, 3),
        "recency_score": round(paper.recency_score, 3),
        "novelty_score": round(paper.novelty_score, 3),
        "combined_score": round(paper.combined_score, 3),
        "final_score": round(getattr(paper, 'combined_score', 0), 3)
    }

# ============================================================================
# API Endpoints
# ============================================================================

@app.post("/discover")
async def discover_papers(request: DiscoveryRequest):
    """
    Fast paper discovery endpoint.
    Returns results in 2-5 seconds using direct API calls.
    """
    print(f"\n{'='*60}")
    print(f"🔍 Discovery Request")
    print(f"{'='*60}")
    print(f"Query: {request.query}")
    print(f"Mode: {request.mode}")
    print(f"Sources: {request.sources}")
    print(f"Max per source: {request.max_results_per_source}")
    print(f"{'='*60}\n")

    result = await fast_search_papers(request)
    return result

@app.post("/cancel/{request_id}")
async def cancel_request(request_id: str):
    """Cancel an active search request."""
    if request_id in active_requests:
        active_requests[request_id] = False
        return {"status": "cancelled", "request_id": request_id}
    return {"status": "not_found", "request_id": request_id}

@app.post("/enhance/quick")
async def quick_research(request: AgentWorkflowRequest):
    """
    Quick research workflow - Fast analysis & sorting.
    Based on example_quick_research() from agents/query.py
    Uses direct tools pattern for reliability.
    """
    print(f"\n⚡ Quick Research: {request.query}")

    try:
        # Convert dict papers back to Paper objects
        papers = [dict_to_paper(p) for p in request.papers]
        paper_store.papers = papers
        paper_store.query = request.query

        # Initialize tools
        sort_tool = PaperSortTool()
        analysis_tool = PaperAnalysisTool()

        # Run sorting
        sort_result = sort_tool.forward(sort_by="combined", top_k=50)

        # Run basic analysis
        analysis_result = analysis_tool.forward(analysis_type="summary")

        return {
            "workflow": "quick",
            "status": "success",
            "sort_result": sort_result,
            "analysis": analysis_result,
            "papers": [paper_to_dict(p) for p in paper_store.papers[:50]]
        }
    except Exception as e:
        import traceback
        return {
            "workflow": "quick",
            "status": "error",
            "error": str(e),
            "traceback": traceback.format_exc()
        }

@app.post("/enhance/full")
async def full_pipeline(request: AgentWorkflowRequest):
    """
    Full pipeline workflow - Deep analysis, trends, visualization.
    Based on example_direct_tools() from agents/query.py
    Uses all tools for comprehensive analysis.
    """
    print(f"\n🧠 Full Pipeline: {request.query}")

    try:
        # Convert dict papers back to Paper objects
        papers = [dict_to_paper(p) for p in request.papers]
        paper_store.papers = papers
        paper_store.query = request.query

        # Initialize all tools
        sort_tool = PaperSortTool()
        analysis_tool = PaperAnalysisTool()
        export_tool = PaperExportTool()
        viz_tool = VisualizationTool()

        print("Step 1: Sorting papers...")
        sort_result = sort_tool.forward(sort_by="combined", top_k=100)

        print("Step 2: Running comprehensive analysis...")
        # Run all analyses
        results = {
            "workflow": "full",
            "status": "success",
            "summary": analysis_tool.forward(analysis_type="summary"),
            "trends": analysis_tool.forward(analysis_type="trends"),
            "authors": analysis_tool.forward(analysis_type="authors"),
            "venues": analysis_tool.forward(analysis_type="venues"),
            "topics": analysis_tool.forward(analysis_type="topics"),
        }

        print("Step 3: Generating visualization...")
        # Generate visualization
        viz_filename = f"dashboard_{datetime.now().strftime('%Y%m%d_%H%M%S')}.html"
        viz_result = viz_tool.forward(viz_type="dashboard", filename=viz_filename)
        results["visualization"] = viz_result
        results["visualization_file"] = viz_filename

        print("Step 4: Exporting results...")
        # Export to multiple formats
        export_json = export_tool.forward(filename="full_analysis.json", format="json")
        export_bib = export_tool.forward(filename="full_analysis.bib", format="bib")
        export_html = export_tool.forward(filename="full_analysis.html", format="html")

        results["exports"] = {
            "json": export_json,
            "bib": export_bib,
            "html": export_html
        }

        results["papers"] = [paper_to_dict(p) for p in paper_store.papers[:100]]

        print("✅ Full pipeline complete!")
        return results

    except Exception as e:
        import traceback
        return {
            "workflow": "full",
            "status": "error",
            "error": str(e),
            "traceback": traceback.format_exc()
        }

@app.post("/enhance/custom")
async def custom_workflow(request: AgentWorkflowRequest):
    """
    Custom workflow - User selects specific tasks.
    Based on example_manual_control() from agents/query.py
    Provides fine-grained control over analysis steps.
    """
    print(f"\n⚙️  Custom Workflow: {request.query}")
    print(f"Tasks: {request.tasks}")

    try:
        # Convert dict papers back to Paper objects
        papers = [dict_to_paper(p) for p in request.papers]
        paper_store.papers = papers
        paper_store.query = request.query

        results = {"workflow": "custom", "status": "success", "tasks": {}}

        # Initialize tools
        analysis_tool = PaperAnalysisTool()
        sort_tool = PaperSortTool()
        export_tool = PaperExportTool()
        viz_tool = VisualizationTool()

        # Execute requested tasks
        if request.tasks:
            for task in request.tasks:
                print(f"Executing task: {task}")

                if task == "sort_citations":
                    results["tasks"]["sort"] = sort_tool.forward(sort_by="citations", top_k=50)
                elif task == "sort_novelty":
                    results["tasks"]["sort"] = sort_tool.forward(sort_by="novelty", top_k=50)
                elif task == "sort_combined":
                    results["tasks"]["sort"] = sort_tool.forward(sort_by="combined", top_k=50)
                elif task == "analyze_trends":
                    results["tasks"]["trends"] = analysis_tool.forward(analysis_type="trends")
                elif task == "analyze_authors":
                    results["tasks"]["authors"] = analysis_tool.forward(analysis_type="authors")
                elif task == "analyze_venues":
                    results["tasks"]["venues"] = analysis_tool.forward(analysis_type="venues")
                elif task == "analyze_topics":
                    results["tasks"]["topics"] = analysis_tool.forward(analysis_type="topics")
                elif task == "analyze_all":
                    results["tasks"]["analysis"] = analysis_tool.forward(analysis_type="all")
                elif task == "visualize":
                    viz_file = f"viz_{datetime.now().strftime('%Y%m%d_%H%M%S')}.html"
                    results["tasks"]["visualization"] = viz_tool.forward(viz_type="dashboard", filename=viz_file)
                    results["tasks"]["visualization_file"] = viz_file
                elif task == "export_json":
                    results["tasks"]["export_json"] = export_tool.forward(filename="papers.json", format="json")
                elif task == "export_bib":
                    results["tasks"]["export_bib"] = export_tool.forward(filename="papers.bib", format="bib")
                elif task == "export_csv":
                    results["tasks"]["export_csv"] = export_tool.forward(filename="papers.csv", format="csv")
                elif task == "export_html":
                    results["tasks"]["export_html"] = export_tool.forward(filename="papers.html", format="html")

        results["papers"] = [paper_to_dict(p) for p in paper_store.papers[:50]]
        return results

    except Exception as e:
        import traceback
        return {
            "workflow": "custom",
            "status": "error",
            "error": str(e),
            "traceback": traceback.format_exc()
        }

def dict_to_paper(data: Dict[str, Any]) -> Paper:
    """Convert dictionary back to Paper object."""
    return Paper(
        title=data["title"],
        authors=data["authors"],
        abstract=data["abstract"],
        url=data["url"],
        year=data.get("year"),
        venue=data.get("venue", ""),
        source=data.get("source", ""),
        doi=data.get("doi"),
        pdf_url=data.get("pdf_url"),
        citations=data.get("citations"),
        similarity_score=data.get("relevance_score", 0),
        novelty_score=data.get("novelty_score", 0),
        recency_score=0,
        relevance_score=data.get("relevance_score", 0),
        combined_score=data.get("final_score", 0)
    )

@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "version": "2.0",
        "features": {
            "fast_search": True,
            "agent_workflows": HAS_RESEARCH_TOOLS,
            "export": True
        }
    }

@app.get("/{filename}")
async def serve_dashboard_file(filename: str):
    """Serve generated HTML dashboard and export files."""
    import os
    from fastapi.responses import FileResponse, HTMLResponse

    # Only serve specific file types
    allowed_extensions = ['.html', '.json', '.bib', '.csv']
    if not any(filename.endswith(ext) for ext in allowed_extensions):
        raise HTTPException(status_code=404, detail="File type not allowed")

    # Check if file exists in current directory
    filepath = os.path.join(os.getcwd(), filename)
    if os.path.exists(filepath):
        # Determine media type
        if filename.endswith('.html'):
            media_type = "text/html"
        elif filename.endswith('.json'):
            media_type = "application/json"
        elif filename.endswith('.bib'):
            media_type = "text/plain"
        elif filename.endswith('.csv'):
            media_type = "text/csv"
        else:
            media_type = "application/octet-stream"

        return FileResponse(filepath, media_type=media_type)

    # Return 404 with helpful message for HTML
    if filename.endswith('.html'):
        return HTMLResponse(
            content=f"""
            <html>
                <head><title>Dashboard Not Found</title></head>
                <body style="font-family: sans-serif; padding: 40px; max-width: 800px; margin: 0 auto;">
                    <h1>Dashboard Not Found</h1>
                    <p>The file <code>{filename}</code> was not found.</p>
                    <p>It may have been deleted or not yet generated.</p>
                    <p><strong>Current directory:</strong> <code>{os.getcwd()}</code></p>
                    <hr>
                    <p>Try running a new search to generate a fresh dashboard.</p>
                    <p><a href="http://localhost:5173">← Return to Paper Circle</a></p>
                </body>
            </html>
            """,
            status_code=404
        )

    raise HTTPException(status_code=404, detail=f"File not found: {filename}")

# ============================================================================
# Multi-Agent Pipeline with Streaming
# ============================================================================

@app.post("/multi-agent/stream")
async def multi_agent_pipeline_stream(request: MultiAgentRequest):
    """
    Multi-agent research pipeline with REAL orchestrator using create_research_pipeline().

    Uses the actual multi-agent orchestrator (CodeAgent) that coordinates:
    - paper_search_agent
    - sorting_agent
    - analysis_agent
    - export_agent
    - visualization_agent
    - web_agent

    Returns Server-Sent Events (SSE) stream of agent messages and final results.
    """
    if not HAS_RESEARCH_TOOLS or create_research_pipeline is None:
        raise HTTPException(status_code=503, detail="Multi-agent pipeline not available - research_agnet.py not loaded")

    if not HAS_LLM or LiteLLMModel is None:
        raise HTTPException(status_code=503, detail="Multi-agent orchestrator not available - LLM not configured. Set LLM_API_BASE and LLM_MODEL_ID environment variables.")

    request_id = f"multi_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
    message_queue = Queue()
    agent_message_queues[request_id] = message_queue

    async def event_generator() -> AsyncGenerator[str, None]:
        """Generate Server-Sent Events for agent messages."""

        def send_message(msg_type: str, content: Any):
            """Helper to send formatted SSE message."""
            message_queue.put({"type": msg_type, "content": content})

        def run_pipeline():
            """
            Run PROGRESSIVE multi-agent pipeline with direct tools.

            Strategy: Execute tools sequentially and stream intermediate results.
            This avoids slow LLM orchestrator and provides instant feedback.
            """
            try:
                send_message("status", "Starting progressive multi-agent research...")

                # Initialize all tools
                search_tool = PaperSearchTool()
                sort_tool = PaperSortTool()
                analysis_tool = PaperAnalysisTool()
                export_tool = PaperExportTool()
                viz_tool = VisualizationTool()

                # CLEAN THE QUERY
                # Remove phrases like "Find the paper on this", "Search for", etc.
                clean_query = request.query
                # Remove common prefixes
                for prefix in ["find the paper on this", "find the paper", "search for", "find papers about", "look for"]:
                    clean_query = clean_query.lower().replace(prefix, "").strip()
                # Remove quotes
                clean_query = clean_query.replace('"', '').replace("'", "").strip()
                # If query is too long (> 200 chars), extract key terms
                if len(clean_query) > 200:
                    # Extract key terms (nouns, verbs) - simple heuristic
                    words = clean_query.split()
                    # Remove common words
                    stop_words = {'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been', 'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can'}
                    key_words = [w for w in words if w.lower() not in stop_words and len(w) > 3]
                    clean_query = ' '.join(key_words[:15])  # Max 15 key terms

                send_message("agent", {
                    "agent": "query_processor",
                    "action": f"Cleaned query: '{clean_query}' (from: '{request.query[:80]}...')",
                    "timestamp": datetime.now().isoformat()
                })

                # STEP 1: SEARCH (with retry logic for rate limits)
                send_message("agent", {
                    "agent": "paper_search_agent",
                    "action": f"Searching for '{clean_query}' from year {request.min_year}...",
                    "timestamp": datetime.now().isoformat()
                })

                max_retries = 3
                retry_delay = 2
                search_result = None

                for attempt in range(max_retries):
                    try:
                        search_result = search_tool.forward(
                            query=clean_query,  # Use cleaned query
                            max_results=request.max_results,
                            start_year=request.min_year,
                            sources="arxiv,semantic_scholar"  # Limit to 2 sources to avoid rate limits
                        )
                        break  # Success
                    except Exception as e:
                        if "429" in str(e) and attempt < max_retries - 1:
                            send_message("agent", {
                                "agent": "paper_search_agent",
                                "action": f"Rate limited, retrying in {retry_delay}s... (attempt {attempt + 1}/{max_retries})",
                                "timestamp": datetime.now().isoformat()
                            })
                            import time
                            time.sleep(retry_delay)
                            retry_delay *= 2  # Exponential backoff
                        else:
                            raise

                papers_found = len(paper_store.papers) if hasattr(paper_store, 'papers') else 0

                if papers_found == 0:
                    send_message("error", f"No papers found for query: {request.query}")
                    send_message("done", True)
                    return

                send_message("agent", {
                    "agent": "paper_search_agent",
                    "action": f"✓ Found {papers_found} papers!",
                    "timestamp": datetime.now().isoformat()
                })

                # SEND INTERMEDIATE RESULT #1: Initial papers
                initial_papers = paper_store.papers[:20]
                send_message("intermediate_results", {
                    "stage": "search_complete",
                    "total_papers": papers_found,
                    "papers": [paper_to_dict(p) for p in initial_papers],
                    "message": f"Found {papers_found} papers - now sorting..."
                })

                # STEP 2: SORT
                send_message("agent", {
                    "agent": "sorting_agent",
                    "action": f"Sorting {papers_found} papers by {request.sort_by}...",
                    "timestamp": datetime.now().isoformat()
                })

                sort_result = sort_tool.forward(
                    sort_by=request.sort_by if request.sort_by != "relevance" else "combined",
                    top_k=min(papers_found, 100)
                )

                send_message("agent", {
                    "agent": "sorting_agent",
                    "action": "✓ Papers sorted and scored!",
                    "timestamp": datetime.now().isoformat()
                })

                # SEND INTERMEDIATE RESULT #2: Sorted papers
                sorted_papers = paper_store.papers[:50]
                send_message("intermediate_results", {
                    "stage": "sort_complete",
                    "total_papers": len(paper_store.papers),
                    "papers": [paper_to_dict(p) for p in sorted_papers],
                    "message": "Papers sorted - now analyzing..."
                })

                # STEP 3: ANALYZE (progressive analysis sections)
                print(f"\n{'='*60}")
                print(f"STEP 3: ANALYZE - Starting analysis...")
                print(f"{'='*60}")

                send_message("agent", {
                    "agent": "analysis_agent",
                    "action": "Analyzing research trends, authors, and topics...",
                    "timestamp": datetime.now().isoformat()
                })

                # Run complete analysis
                try:
                    analysis_result = analysis_tool.forward(analysis_type="all")
                    print(f"✓ Analysis complete: {len(analysis_result)} chars")
                except Exception as e:
                    print(f"❌ Analysis failed: {e}")
                    import traceback
                    traceback.print_exc()
                    analysis_result = f"Analysis failed: {str(e)}"

                send_message("agent", {
                    "agent": "analysis_agent",
                    "action": "✓ Analysis complete!",
                    "timestamp": datetime.now().isoformat()
                })

                # Parse and send analysis results
                all_papers = paper_store.papers if hasattr(paper_store, 'papers') else []

                # Parse analysis results to extract statistics
                import re
                year_dist = {}
                top_authors = []
                trends = []
                venues_list = []

                if isinstance(analysis_result, str):
                    # Extract year distribution
                    year_matches = re.findall(r'(\d{4}):\s*[\s█]*\((\d+)\)', analysis_result)
                    if not year_matches:
                        year_matches = re.findall(r'(\d{4}):\s*(\d+)', analysis_result)
                    year_dist = {year: int(count) for year, count in year_matches}

                    # Extract top authors (look for bullet points or numbered lists)
                    author_section = re.search(r'Top Authors:?(.+?)(?:\n\n|##|\Z)', analysis_result, re.DOTALL | re.IGNORECASE)
                    if author_section:
                        authors_text = author_section.group(1)
                        author_lines = [line.strip('- •123456789. ') for line in authors_text.split('\n') if line.strip()]
                        # Extract author name and count
                        for line in author_lines[:10]:
                            match = re.match(r'(.+?):\s*(\d+)', line)
                            if match:
                                top_authors.append({"name": match.group(1).strip(), "count": int(match.group(2))})

                    # Extract trends/topics
                    trends_section = re.search(r'(?:Top Keywords|Topics):?(.+?)(?:\n\n|##|\Z)', analysis_result, re.DOTALL | re.IGNORECASE)
                    if trends_section:
                        trends_text = trends_section.group(1)
                        trend_lines = [line.strip('- •123456789. ') for line in trends_text.split('\n') if line.strip()]
                        for line in trend_lines[:10]:
                            match = re.match(r'(.+?):\s*(\d+)', line)
                            if match:
                                trends.append({"keyword": match.group(1).strip(), "count": int(match.group(2))})

                    # Extract venues
                    venue_section = re.search(r'Top Venues:?(.+?)(?:\n\n|##|\Z)', analysis_result, re.DOTALL | re.IGNORECASE)
                    if venue_section:
                        venue_text = venue_section.group(1)
                        venue_lines = [line.strip('- •123456789. ') for line in venue_text.split('\n') if line.strip()]
                        for line in venue_lines[:10]:
                            match = re.match(r'(.+?):\s*(\d+)', line)
                            if match:
                                venues_list.append({"name": match.group(1).strip(), "count": int(match.group(2))})

                # SEND INTERMEDIATE RESULT #3: Analysis complete
                send_message("intermediate_results", {
                    "stage": "analysis_complete",
                    "statistics": {
                        "year_distribution": year_dist,
                        "top_authors": top_authors if top_authors else [{"name": "N/A", "count": 0}],
                        "research_trends": trends if trends else [{"keyword": "N/A", "count": 0}],
                        "top_venues": venues_list if venues_list else [{"name": "N/A", "count": 0}]
                    },
                    "analysis_text": analysis_result,
                    "message": "Analysis complete - now exporting..."
                })

                # STEP 4: EXPORT
                print(f"\n{'='*60}")
                print(f"STEP 4: EXPORT - Starting exports...")
                print(f"{'='*60}")

                export_files = []
                if request.export_formats:
                    send_message("agent", {
                        "agent": "export_agent",
                        "action": f"Exporting to {', '.join(request.export_formats)}...",
                        "timestamp": datetime.now().isoformat()
                    })

                    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')

                    for fmt in request.export_formats:
                        try:
                            filename = f"multi_agent_{timestamp}.{fmt}"
                            export_tool.forward(filename=filename, format=fmt)
                            export_files.append(filename)
                            print(f"✓ Exported: {filename}")
                        except Exception as e:
                            print(f"❌ Export failed ({fmt}): {e}")
                            send_message("agent", {
                                "agent": "export_agent",
                                "action": f"Warning: Export to {fmt} failed: {e}",
                                "timestamp": datetime.now().isoformat()
                            })

                    send_message("agent", {
                        "agent": "export_agent",
                        "action": f"✓ Exported to: {', '.join(export_files)}",
                        "timestamp": datetime.now().isoformat()
                    })
                else:
                    print("⊘ No export formats requested")

                # STEP 5: VISUALIZE
                print(f"\n{'='*60}")
                print(f"STEP 5: VISUALIZE - Creating dashboard...")
                print(f"{'='*60}")

                viz_file = None
                if request.generate_visualization:
                    send_message("agent", {
                        "agent": "visualization_agent",
                        "action": "Creating interactive dashboard...",
                        "timestamp": datetime.now().isoformat()
                    })

                    try:
                        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
                        viz_file = f"multi_agent_dashboard_{timestamp}.html"
                        viz_tool.forward(viz_type="dashboard", filename=viz_file)
                        print(f"✓ Dashboard created: {viz_file}")

                        send_message("agent", {
                            "agent": "visualization_agent",
                            "action": f"✓ Dashboard created: {viz_file}",
                            "timestamp": datetime.now().isoformat()
                        })
                    except Exception as e:
                        print(f"❌ Visualization failed: {e}")
                        import traceback
                        traceback.print_exc()
                        send_message("agent", {
                            "agent": "visualization_agent",
                            "action": f"Warning: Visualization failed: {e}",
                            "timestamp": datetime.now().isoformat()
                        })
                else:
                    print("⊘ Visualization not requested")

                # FINAL RESULTS
                results = {
                    "total_papers": len(all_papers),
                    "all_papers": [paper_to_dict(p) for p in all_papers],
                    "top_papers": [paper_to_dict(p) for p in all_papers[:20]],
                    "statistics": {
                        "year_distribution": year_dist,
                        "top_authors": top_authors if top_authors else [{"name": "N/A", "count": 0}],
                        "research_trends": trends if trends else [{"keyword": "N/A", "count": 0}],
                        "top_venues": venues_list if venues_list else [{"name": "N/A", "count": 0}]
                    },
                    "analysis_text": analysis_result,
                    "web_resources": [],
                    "exports": export_files,
                    "visualization": viz_file
                }

                print(f"\n{'='*60}")
                print(f"✅ PIPELINE COMPLETE!")
                print(f"   Papers: {len(all_papers)}")
                print(f"   Exports: {export_files}")
                print(f"   Visualization: {viz_file}")
                print(f"{'='*60}\n")

                send_message("results", results)
                send_message("status", "✅ Multi-agent research complete!")
                send_message("done", True)

            except Exception as e:
                import traceback
                error_msg = f"{str(e)}\n{traceback.format_exc()}"
                print(f"\n❌ PIPELINE ERROR: {error_msg}")
                send_message("error", error_msg)
                send_message("done", True)

        # Start pipeline in background thread
        thread = Thread(target=run_pipeline)
        thread.start()

        # Stream messages as they arrive
        while True:
            try:
                # Get message from queue (non-blocking with timeout)
                if not message_queue.empty():
                    msg = message_queue.get(timeout=0.1)

                    # Format as SSE
                    yield f"data: {json.dumps(msg)}\n\n"

                    # Check if done
                    if msg.get("type") == "done":
                        break
                else:
                    await asyncio.sleep(0.1)
            except Exception as e:
                yield f"data: {json.dumps({'type': 'error', 'content': str(e)})}\n\n"
                break

        # Cleanup
        if request_id in agent_message_queues:
            del agent_message_queues[request_id]

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no"
        }
    )

def run_mock_pipeline_sync(request: MultiAgentRequest, send_message):
    """Mock pipeline for demonstration when LLM is not available (synchronous version)."""
    agents = [
        ("paper_search_agent", "Searching arXiv and Semantic Scholar..."),
        ("paper_search_agent", f"Found 45 papers matching '{request.query}'"),
        ("sorting_agent", f"Sorting papers by {request.sort_by}..."),
        ("sorting_agent", "Papers sorted and scored"),
        ("analysis_agent", "Analyzing research trends..."),
        ("analysis_agent", "Identified 3 major research directions"),
        ("analysis_agent", "Top authors: Smith (5 papers), Chen (4 papers), Kumar (3 papers)"),
    ]

    if request.web_search:
        agents.extend([
            ("web_agent", "Searching for supplementary web resources..."),
            ("web_agent", "Found 12 relevant blog posts and tutorials"),
        ])

    agents.extend([
        ("export_agent", f"Exporting to {', '.join(request.export_formats)}..."),
        ("export_agent", "Export complete: research_results.json"),
    ])

    if request.generate_visualization:
        agents.extend([
            ("visualization_agent", "Generating interactive dashboard..."),
            ("visualization_agent", "Dashboard created: research_dashboard.html"),
        ])

    # Simulate agent discussions
    for agent_name, action in agents:
        time.sleep(0.5)  # Simulate processing time
        send_message("agent", {
            "agent": agent_name,
            "action": action,
            "timestamp": datetime.now().isoformat()
        })

    # Send mock final results
    time.sleep(1)
    send_message("results", {
        "total_papers": 45,
        "top_papers": [
            {
                "title": "World Models for Autonomous Agents",
                "authors": ["Smith et al."],
                "year": 2024,
                "citations": 156,
                "url": "https://arxiv.org/abs/2401.12345"
            }
        ],
        "statistics": {
            "year_distribution": {"2024": 15, "2023": 20, "2022": 10},
            "top_authors": ["Smith", "Chen", "Kumar"],
            "research_trends": ["Model-based RL", "Visual reasoning", "Planning"]
        },
        "web_resources": [
            {"title": "Introduction to World Models", "url": "https://example.com/tutorial"}
        ] if request.web_search else [],
        "exports": request.export_formats,
        "visualization": "research_dashboard.html" if request.generate_visualization else None
    })

# ============================================================================
# Main
# ============================================================================

if __name__ == "__main__":
    print("""
╔══════════════════════════════════════════════════════════════════╗
║          Fast Discovery API v2.0                                 ║
╠══════════════════════════════════════════════════════════════════╣
║  Endpoints:                                                      ║
║    POST /discover             - Fast paper search (2-5s)         ║
║    POST /multi-agent/stream   - Multi-agent pipeline (SSE)       ║
║    POST /enhance/quick        - Quick research workflow          ║
║    POST /enhance/full         - Full pipeline workflow           ║
║    POST /enhance/custom       - Custom agent workflow            ║
║    POST /cancel/{id}          - Cancel request                   ║
║    GET  /health               - Health check                     ║
╠══════════════════════════════════════════════════════════════════╣
║  Features:                                                       ║
║    ⚡ Fast direct search (no findpapers)                        ║
║    🤖 Multi-agent pipeline with streaming                        ║
║    💬 Real-time agent discussions                                ║
║    📊 Comprehensive statistics & analysis                        ║
║    🌐 Web search integration                                     ║
║    📈 Interactive visualizations                                 ║
║    📥 Multiple export formats                                    ║
╚══════════════════════════════════════════════════════════════════╝
    """)

    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")

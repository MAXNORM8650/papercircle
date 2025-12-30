"""
FastAPI server for Paperfinder Multi-Agent Discovery
Provides REST API endpoints for the refactored paper discovery system
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import json
import sys
from pathlib import Path

# Add backend directory to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

# Import from paperfinder.py (now in backend/core/)
from core.paperfinder import (
    run_multi_agent_discovery,
    MODE_WEIGHTS,
)

app = FastAPI(title="Paperfinder API", version="2.0.0")

# Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class CustomWeights(BaseModel):
    relevance: float
    authority: float
    novelty: float


class DiscoveryRequest(BaseModel):
    query: str
    mode: Optional[str] = "balanced"  # stable, discovery, or balanced
    apply_diversity: bool = True
    custom_weights: Optional[CustomWeights] = None


class ModeWeightsUpdate(BaseModel):
    relevance: float
    authority: float
    novelty: float


@app.get("/")
async def root():
    return {
        "service": "Paperfinder Multi-Agent Discovery API",
        "version": "2.0.0",
        "modes": list(MODE_WEIGHTS.keys()),
        "endpoints": [
            "/discover",
            "/modes",
            "/health"
        ]
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy"}


@app.get("/modes")
async def get_modes():
    """Get available discovery modes and their weights"""
    return {
        "modes": MODE_WEIGHTS,
        "descriptions": {
            "stable": "Prioritize established, authoritative works (Rel: 50%, Auth: 40%, Nov: 10%)",
            "discovery": "Hunt for novel, cutting-edge research (Rel: 30%, Auth: 10%, Nov: 60%)",
            "balanced": "Mix of both approaches (Rel: 40%, Auth: 30%, Nov: 30%)"
        }
    }


@app.post("/discover")
async def discover_papers(request: DiscoveryRequest):
    """
    Main endpoint for multi-agent paper discovery
    Uses QueryGenerationAgent + retrieval pipeline
    Returns full paper list with all scores
    """
    try:
        # Validate mode
        if request.mode and request.mode not in MODE_WEIGHTS:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid mode. Must be one of: {list(MODE_WEIGHTS.keys())}"
            )

        print(f"\n[API] Received discovery request:")
        print(f"  Query: {request.query}")
        print(f"  Mode: {request.mode}")
        print(f"  Apply Diversity: {request.apply_diversity}")
        if request.custom_weights:
            print(f"  Custom Weights: Rel={request.custom_weights.relevance:.2f}, "
                  f"Auth={request.custom_weights.authority:.2f}, "
                  f"Nov={request.custom_weights.novelty:.2f}")

        # If custom weights are provided, temporarily override MODE_WEIGHTS
        if request.custom_weights:
            import copy
            original_weights = copy.deepcopy(MODE_WEIGHTS)
            custom_mode_name = "custom"
            MODE_WEIGHTS[custom_mode_name] = {
                "relevance": request.custom_weights.relevance,
                "authority": request.custom_weights.authority,
                "novelty": request.custom_weights.novelty,
            }
            mode_to_use = custom_mode_name
        else:
            mode_to_use = request.mode

        # Run the multi-agent discovery pipeline
        result = run_multi_agent_discovery(
            user_text=request.query,
            mode=mode_to_use,
            apply_diversity=request.apply_diversity,
        )

        # Restore original weights if custom mode was used
        if request.custom_weights:
            MODE_WEIGHTS.clear()
            MODE_WEIGHTS.update(original_weights)

        # The result contains:
        # - search_spec (with core_keywords, must_include, nice_to_have, etc.)
        # - mode_used
        # - predicted_titles
        # - all_papers_sorted (full list with all scores & metadata)
        # - sections (overall, hidden_gems, canonical)

        # Determine which weights to return
        if request.custom_weights:
            weights_used = {
                "relevance": request.custom_weights.relevance,
                "authority": request.custom_weights.authority,
                "novelty": request.custom_weights.novelty,
            }
        else:
            weights_used = MODE_WEIGHTS.get(result["mode_used"], MODE_WEIGHTS["balanced"])

        response = {
            "query": request.query,
            "search_spec": result["search_spec"],
            "mode_used": result["mode_used"] if not request.custom_weights else "custom",
            "predicted_titles": result["predicted_titles"],
            "mode_weights": weights_used,
            "total_papers": len(result["all_papers_sorted"]),
            "all_papers_sorted": result["all_papers_sorted"],
            "sections": result["sections"],
        }

        print(f"[API] Returning {len(result['all_papers_sorted'])} papers")
        return response

    except Exception as e:
        print(f"[API ERROR] {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/mode-weights")
async def get_mode_weights():
    """Get current MODE_WEIGHTS configuration"""
    return MODE_WEIGHTS


if __name__ == "__main__":
    import uvicorn
    print("\n" + "=" * 70)
    print("🚀 Starting Paperfinder API Server")
    print("=" * 70)
    print("Available modes:", list(MODE_WEIGHTS.keys()))
    print("Server running at: http://localhost:8000")
    print("API docs at: http://localhost:8000/docs")
    print("=" * 70 + "\n")

    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")

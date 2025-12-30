"""
Research Pipeline V2 - Example with Structured Outputs
=======================================================

This demonstrates the structured outputs generated at EACH step of the pipeline.
"""

from smolagents import LiteLLMModel
from research_agentv2 import create_research_pipeline, PipelineState

# ============================================================================
# Configuration
# ============================================================================

API_BASE = "http://localhost:11431"
MODEL_ID = "ollama_chat/qwen3-coder:30b"

model = LiteLLMModel(
    model_id=MODEL_ID,
    api_base=API_BASE,
    num_ctx=8192
)


# ============================================================================
# Create Pipeline with Custom Output Directory
# ============================================================================

pipeline = create_research_pipeline(
    model=model,
    output_dir="world_models_research",  # All outputs go here
    verbose=True
)


# ============================================================================
# Example 1: Full Research Workflow
# ============================================================================
def example_full_workflow_private():
    """
    Run complete research workflow.
    At EACH step, check the output directory for updated files.
    """
    #I need to research "differentially private token generation".
    result = pipeline.run("""
    I need to research "differentially private token generation".
    
    Please:
    1. Search for papers from 2022-2024
    2. Sort them by combined score (citations + similarity + recency)
    3. Analyze the results - find trends, top authors, key topics
    4. Export everything
    
    After each step, the structured outputs are automatically updated.
    """)
    
    print(result)

def example_full_workflow(query="einforcement learning in video games"):
    """
    Run complete research workflow.
    At EACH step, check the output directory for updated files.
    """
    #I need to research "differentially private token generation".
    result = pipeline.run(f"""
    I need to research "{query}".
    
    Please:
    1. Search for papers from 2022-2024
    2. Sort them by combined score (citations + similarity + recency)
    3. Analyze the results - find trends, top authors, key topics
    4. Export everything
    
    After each step, the structured outputs are automatically updated.
    """)
    
    print(result)
    
    # Now check the output directory:
    # world_models_research/
    # ├── papers.json      <- All papers with full details
    # ├── links.json       <- Structured links (PDFs, DOIs, URLs)
    # ├── stats.json       <- Statistics leaderboard
    # ├── summary.json     <- Insights and key findings
    # ├── papers.csv       <- Spreadsheet format
    # ├── papers.bib       <- BibTeX citations
    # ├── papers.md        <- Markdown document
    # ├── dashboard.html   <- Interactive dashboard (auto-refreshes!)
    # └── step_log.json    <- Log of all processing steps


# ============================================================================
# Example 2: Monitor Progress in Real-Time
# ============================================================================

def example_realtime_monitoring():
    """
    Open dashboard.html in browser - it auto-refreshes every 10 seconds!
    Watch the outputs update as agents work.
    """
    
    print("""
    ╔═══════════════════════════════════════════════════════════════╗
    ║  REAL-TIME MONITORING                                         ║
    ╠═══════════════════════════════════════════════════════════════╣
    ║                                                               ║
    ║  Open in browser: world_models_research/dashboard.html        ║
    ║                                                               ║
    ║  The dashboard auto-refreshes every 10 seconds and shows:     ║
    ║    • Paper count and statistics                               ║
    ║    • Publication timeline chart                               ║
    ║    • Source distribution chart                                ║
    ║    • Paper leaderboard with scores                            ║
    ║    • Live insights                                            ║
    ║    • Step-by-step processing log                              ║
    ║                                                               ║
    ╚═══════════════════════════════════════════════════════════════╝
    """)
    
    # Run pipeline - watch dashboard update in real-time!
    result = pipeline.run("""
    Search for "world models" papers,
    Sort by combined score,
    Analyze trends and insights,
    Export all formats,
    Please all the years from 2020 to 2025 strickly. Also find the weblinks where people are also taking about world models.
    """)


# ============================================================================
# Example 3: Access Structured Outputs Programmatically
# ============================================================================

def example_programmatic_access():
    """
    Access the structured outputs from Python code.
    """
    import json
    from pathlib import Path
    
    output_dir = Path("world_models_research")
    
    # After running pipeline, read the outputs:
    
    # 1. Papers with all details
    with open(output_dir / "papers.json") as f:
        papers_data = json.load(f)
        print(f"Total papers: {papers_data['metadata']['total_papers']}")
        for paper in papers_data['papers'][:3]:
            print(f"  - {paper['title'][:50]}...")
    
    # 2. Links (PDFs, DOIs)
    with open(output_dir / "links.json") as f:
        links_data = json.load(f)
        print(f"\nPDFs available: {len(links_data['links']['pdfs_only'])}")
        for link in links_data['links']['pdfs_only'][:3]:
            print(f"  - {link['title'][:40]}: {link['url']}")
    
    # 3. Statistics leaderboard
    with open(output_dir / "stats.json") as f:
        stats_data = json.load(f)
        print(f"\nTop sources: {stats_data['stats']['sources']}")
        print(f"Citation stats: {stats_data['stats']['citation_stats']}")
        print("\nLeaderboard:")
        for entry in stats_data['leaderboard'][:5]:
            print(f"  #{entry['rank']}: {entry['title'][:40]}... (score: {entry['combined_score']})")
    
    # 4. Summary and insights
    with open(output_dir / "summary.json") as f:
        summary_data = json.load(f)
        print(f"\nKey findings:")
        for finding in summary_data['key_findings']:
            print(f"  • {finding}")
        print(f"\nInsights:")
        for insight in summary_data['insights'][:3]:
            print(f"  [{insight['type']}] {insight['message']}")


# ============================================================================
# Output File Structures
# ============================================================================

"""
OUTPUT FILE STRUCTURES
======================

1. papers.json
--------------
{
    "papers": [
        {
            "title": "Paper Title",
            "authors": ["Author 1", "Author 2"],
            "abstract": "...",
            "url": "https://...",
            "pdf_url": "https://...",
            "doi": "10.xxxx/...",
            "year": 2024,
            "venue": "NeurIPS",
            "source": "arxiv",
            "citations": 150,
            "similarity_score": 0.85,
            "novelty_score": 0.72,
            "recency_score": 0.95,
            "combined_score": 0.84,
            "rank": 1
        },
        ...
    ],
    "metadata": {
        "query": "world models reinforcement learning",
        "total_steps": 4,
        "last_updated": "2024-01-15T10:30:00",
        "total_papers": 87
    }
}

2. links.json
-------------
{
    "links": {
        "papers": [
            {
                "title": "Paper Title",
                "url": "https://arxiv.org/abs/...",
                "pdf_url": "https://arxiv.org/pdf/...",
                "doi_url": "https://doi.org/10.xxxx/...",
                "source": "arxiv",
                "year": 2024
            },
            ...
        ],
        "by_source": {
            "arxiv": [...],
            "semantic_scholar": [...],
            "openalex": [...]
        },
        "pdfs_only": [
            {"title": "...", "pdf": "https://...pdf"}
        ],
        "dois_only": [
            {"title": "...", "doi": "https://doi.org/..."}
        ]
    }
}

3. stats.json
-------------
{
    "stats": {
        "total_papers": 87,
        "sources": {
            "arxiv": 35,
            "semantic_scholar": 28,
            "openalex": 24
        },
        "year_distribution": {
            "2024": 25,
            "2023": 40,
            "2022": 22
        },
        "top_authors": {
            "David Ha": 5,
            "Danijar Hafner": 4,
            ...
        },
        "top_venues": {
            "NeurIPS": 15,
            "ICML": 12,
            ...
        },
        "top_keywords": {
            "world": 45,
            "model": 42,
            "reinforcement": 38,
            ...
        },
        "citation_stats": {
            "total": 5420,
            "avg": 62.3,
            "max": 1250,
            "min": 0,
            "median": 28
        },
        "score_stats": {
            "avg_similarity": 0.65,
            "avg_novelty": 0.48,
            "avg_recency": 0.72
        }
    },
    "leaderboard": [
        {
            "rank": 1,
            "title": "DreamerV3: Mastering Diverse...",
            "year": 2023,
            "citations": 450,
            "combined_score": 0.92,
            "similarity_score": 0.88,
            "novelty_score": 0.75,
            "recency_score": 0.90,
            "source": "arxiv",
            "has_pdf": true
        },
        ...
    ]
}

4. summary.json
---------------
{
    "summary": {
        "query": "world models reinforcement learning",
        "total_papers": 87,
        "unique_sources": 4,
        "year_range": {"min": 2020, "max": 2024},
        "citation_summary": {"total": 5420, "average": 62.3},
        "top_source": "arxiv",
        "papers_with_pdf": 72,
        "papers_with_doi": 65,
        "processing_steps": 4
    },
    "insights": [
        {
            "type": "trend",
            "title": "Publication Trend",
            "message": "Most papers (40) are from 2023",
            "data": {"year": 2023, "count": 40}
        },
        {
            "type": "author",
            "title": "Prolific Author",
            "message": "David Ha has 5 papers in this collection",
            "data": {"author": "David Ha", "count": 5}
        },
        {
            "type": "citation",
            "title": "Most Cited Paper",
            "message": "\"DreamerV3...\" has 450 citations",
            "data": {"title": "DreamerV3...", "citations": 450}
        },
        ...
    ],
    "key_findings": [
        "Found 87 papers related to 'world models reinforcement learning'",
        "Papers collected from 4 sources: arxiv, semantic_scholar, openalex, dblp",
        "Publication years range from 2020 to 2024",
        "Total citations: 5420, Average: 62",
        "Leading researchers: David Ha, Danijar Hafner, Yann LeCun"
    ]
}

5. step_log.json
----------------
{
    "steps": [
        {
            "step": 1,
            "timestamp": "2024-01-15T10:25:00",
            "agent": "paper_search_agent",
            "action": "Searched 'world models reinforcement learning'",
            "result_preview": "Found 87 papers...",
            "details": {"query": "...", "sources": [...], "papers_found": 87},
            "papers_count": 87
        },
        {
            "step": 2,
            "timestamp": "2024-01-15T10:26:00",
            "agent": "sorting_agent",
            "action": "Sorted 87 papers by 'combined'",
            "result_preview": "Top paper: DreamerV3...",
            "details": {"sort_by": "combined", "weights": {...}},
            "papers_count": 87
        },
        ...
    ],
    "current_step": 4
}
"""


# ============================================================================
# Main
# ============================================================================

if __name__ == "__main__":
    print("""
╔══════════════════════════════════════════════════════════════════╗
║     Research Pipeline V2 - Structured Outputs Demo               ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  At EACH STEP of multi-agent conversation, these files update:   ║
║                                                                  ║
║    📄 papers.json   - All papers with full details               ║
║    🔗 links.json    - Structured links (PDFs, DOIs, URLs)        ║
║    📊 stats.json    - Statistics & leaderboard                   ║
║    💡 summary.json  - Insights & key findings                    ║
║    🌐 dashboard.html - Interactive visualization                 ║
║                                                                  ║
║  Run: example_full_workflow() to see it in action                ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
    """)
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--query", type=str, default="reinforcement learning in video games",
                        help="Research query to run in the pipeline")
    args = parser.parse_args()
    # Uncomment to run:
    example_full_workflow(query=args.query)
    # example_full_workflow_private()
    # example_full_workflow()
    # example_realtime_monitoring()
    # example_programmatic_access()
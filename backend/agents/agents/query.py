"""
Research Pipeline - Example Usage
==================================

This file demonstrates how to use the multi-agent research pipeline.
"""

from smolagents import LiteLLMModel, CodeAgent, ToolCallingAgent
from research_pipeline import (
    create_research_pipeline,
    quick_research,
    # Individual tools if needed
    PaperSearchTool,
    PaperSortTool,
    PaperAnalysisTool,
    PaperDetailsTool,
    PaperExportTool,
    VisualizationTool,
)


# ============================================================================
# Configuration
# ============================================================================

API_BASE = "http://10.127.30.115:11434"
MODEL_ID = "ollama_chat/qwen3-coder:30b"

model = LiteLLMModel(
    model_id=MODEL_ID,
    api_base=API_BASE,
    num_ctx=8192
)


# ============================================================================
# Option 1: Full Pipeline (Recommended)
# ============================================================================

def example_full_pipeline(query):
    """Use the complete multi-agent pipeline."""
    
    # Create the pipeline
    pipeline = create_research_pipeline(model)
    
    # Complex research task - the orchestrator coordinates all agents
    result = pipeline.run("""
        I need to research papers about "world models in reinforcement learning".
        
        Please:
        1. Search for papers from 2022-2024 across all databases
        2. Sort them by a combination of citations and relevance
        3. Analyze the results - show me trends, top authors, and key topics
        4. Export the top 30 papers to:
           - refs.bib (for my LaTeX paper)
           - papers.csv (for spreadsheet analysis)
           - report.html (for easy viewing)
        5. Create a visualization dashboard
        
        Give me a summary of the key findings.
    """)
    
    print(result)
    return result


# ============================================================================
# Option 2: Quick Research (One-liner)
# ============================================================================

def example_quick_research():
    """Quick one-liner for simple research tasks."""
    
    result = quick_research(
        model=model,
        query="real time video-to-video translation using the text",
        sort_by="relevance",
        export_format="json",
        max_results=100
    )
    # breakpoint()
    print(result)
    return result


# ============================================================================
# Option 3: Step-by-Step Manual Control
# ============================================================================

def example_manual_control():
    """Manually control each step for fine-grained control."""
    
    pipeline = create_research_pipeline(model)
    
    # Step 1: Search
    print("=" * 60)
    print("STEP 1: Searching papers...")
    print("=" * 60)
    result = pipeline.run(
        "Use paper_search_agent to search for 'GRPO reinforcement learning diffusion' from 2023"
    )
    print(result)
    
    # Step 2: Sort
    print("\n" + "=" * 60)
    print("STEP 2: Sorting papers...")
    print("=" * 60)
    result = pipeline.run(
        "Use sorting_agent to sort papers by 'combined' with weights: recency=0.2, citations=0.4, similarity=0.4"
    )
    print(result)
    
    # Step 3: Analyze
    print("\n" + "=" * 60)
    print("STEP 3: Analyzing papers...")
    print("=" * 60)
    result = pipeline.run(
        "Use analysis_agent to run 'all' analysis types"
    )
    print(result)
    
    # Step 4: Get details on top papers
    print("\n" + "=" * 60)
    print("STEP 4: Getting paper details...")
    print("=" * 60)
    result = pipeline.run(
        "Use analysis_agent to get details about paper 1, 2, and 3"
    )
    print(result)
    
    # Step 5: Export in multiple formats
    print("\n" + "=" * 60)
    print("STEP 5: Exporting papers...")
    print("=" * 60)
    result = pipeline.run("""
        Use export_agent to:
        1. Export to 'papers.json' format json
        2. Export to 'refs.bib' format bib  
        3. Export to 'report.html' format html
        4. Export top 10 to 'top_papers.csv' format csv
    """)
    print(result)
    
    # Step 6: Visualize
    print("\n" + "=" * 60)
    print("STEP 6: Creating visualization...")
    print("=" * 60)
    result = pipeline.run(
        "Use visualization_agent to create a dashboard 'dashboard.html'"
    )
    print(result)
    
    return "Done!"


# ============================================================================
# Option 4: Custom Agent Configuration
# ============================================================================

def example_custom_agents():
    """Create custom agent configuration for specific needs."""
    
    # Create specialized research agent with only the tools you need
    research_agent = ToolCallingAgent(
        tools=[
            PaperSearchTool(),
            PaperSortTool(),
            PaperExportTool(),
        ],
        model=model,
        name="focused_research_agent",
        description="Searches, sorts, and exports papers.",
    )
    
    # Run directly
    result = research_agent.run(
        "Search for papers about 'vision language models', sort by citations, export to papers.json"
    )
    print(result)
    
    # Or use in a CodeAgent for more complex orchestration
    analysis_agent = ToolCallingAgent(
        tools=[PaperAnalysisTool(), VisualizationTool()],
        model=model,
        name="analysis_viz_agent",
        description="Analyzes papers and creates visualizations.",
    )
    
    orchestrator = CodeAgent(
        tools=[],
        model=model,
        managed_agents=[research_agent, analysis_agent],
        additional_authorized_imports=["json", "os"],
    )
    
    result = orchestrator.run("""
        1. Use focused_research_agent to find papers about transformers
        2. Use analysis_viz_agent to analyze and create a dashboard
    """)
    
    return result


# ============================================================================
# Option 5: Direct Tool Usage (No Agents)
# ============================================================================

def example_direct_tools():
    """Use tools directly without agents for maximum control."""
    
    # Initialize tools
    search_tool = PaperSearchTool()
    sort_tool = PaperSortTool()
    analysis_tool = PaperAnalysisTool()
    export_tool = PaperExportTool()
    viz_tool = VisualizationTool()
    
    # Step 1: Search
    print("Searching...")
    result = search_tool.forward(
        query="video-to-video translation with text prompt",
        max_results=500,
        start_year=2022,
        sources="arxiv,semantic_scholar"
    )
    print(result)
    
    # Step 2: Sort
    print("\nSorting...")
    result = sort_tool.forward(sort_by="combined", top_k=200)
    print(result)
    
    # Step 3: Analyze
    print("\nAnalyzing...")
    result = analysis_tool.forward(analysis_type="all")
    print(result)
    
    # Step 4: Export
    print("\nExporting...")
    result = export_tool.forward(filename="results.json", format="json")
    print(result)
    
    result = export_tool.forward(filename="refs.bib", format="bib")
    print(result)
    
    # Step 5: Visualize
    print("\nCreating visualization...")
    result = viz_tool.forward(viz_type="dashboard", filename="dashboard.html")
    print(result)
    
    return "Done!"


# ============================================================================
# Example Queries for the Pipeline
# ============================================================================

EXAMPLE_QUERIES = [
    # Basic search and export
    "Find papers about world models and export as bibtex",
    
    # Search with sorting
    "Search for RLHF papers from 2023, sort by citations, give me top 20",
    
    # Full research workflow
    """
    Research 'diffusion models for robotics':
    1. Search all databases from 2022
    2. Sort by relevance and novelty
    3. Analyze trends and top authors
    4. Export to papers.json and refs.bib
    5. Create visualization dashboard
    """,
    
    # Comparative analysis
    """
    I want to compare papers on 'PPO' vs 'GRPO':
    1. Search for PPO reinforcement learning papers
    2. Search for GRPO papers
    3. Analyze both sets
    4. Export combined results
    """,
    
    # Specific format requests
    "Find vision transformer papers, sort by recency, export as CSV for Excel",
    
    # Dashboard creation
    "Search for language model papers from 2024 and create an interactive dashboard",
    
    # Detailed analysis
    """
    Research 'multimodal learning':
    1. Find papers from top venues (NeurIPS, ICML, CVPR)
    2. Analyze publication trends over years
    3. Identify top 10 authors in this field
    4. Extract main topics/keywords
    5. Export comprehensive report in HTML
    """,
]


# ============================================================================
# Main
# ============================================================================

if __name__ == "__main__":
    import sys
    
    print("""
╔══════════════════════════════════════════════════════════════════╗
║           Research Pipeline - Examples                           ║
╠══════════════════════════════════════════════════════════════════╣
║  1. example_full_pipeline()    - Complete multi-agent workflow   ║
║  2. example_quick_research()   - One-liner quick research        ║
║  3. example_manual_control()   - Step-by-step manual control     ║
║  4. example_custom_agents()    - Custom agent configuration      ║
║  5. example_direct_tools()     - Direct tool usage (no agents)   ║
╚══════════════════════════════════════════════════════════════════╝
    """)
    
    # Run the full pipeline example by default
    if len(sys.argv) > 1:
        example_num = sys.argv[1]
        if example_num == "1":
            example_full_pipeline()
        elif example_num == "2":
            example_quick_research()
        elif example_num == "3":
            example_manual_control()
        elif example_num == "4":
            example_custom_agents()
        elif example_num == "5":
            example_direct_tools()
    else:
        print("Run with: python example_usage.py [1-5]")
        print("\nOr import and use directly:")
        print("  from research_pipeline import create_research_pipeline")
        print("  pipeline = create_research_pipeline(model)")
        print("  result = pipeline.run('your research task')")
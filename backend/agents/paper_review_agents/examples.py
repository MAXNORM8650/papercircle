#!/usr/bin/env python3
"""
Example: Complete Paper Review Workflow
=======================================
Shows how to use the multi-agent system for paper review.

Run with:
    python examples.py
"""

from smolagents import LiteLLMModel

# ============================================================================
# Configuration for your setup
# ============================================================================

API_BASE = "http://10.127.30.115:11434"
MODEL_ID = "ollama_chat/qwen3-coder:30b"

# Example papers to try
EXAMPLE_PAPERS = [
    "https://arxiv.org/abs/2312.00752",   # A diffusion paper
    "https://arxiv.org/abs/2303.08774",   # GPT-4 paper
    "https://arxiv.org/abs/2310.06825",   # Mistral 7B
]


def example_1_quick_review():
    """Example 1: Quick paper review with API."""
    print("\n" + "="*60)
    print("Example 1: Quick Review using API")
    print("="*60)
    
    from api import PaperReviewer, ReviewConfig
    
    config = ReviewConfig(
        api_base=API_BASE,
        model_id=MODEL_ID,
        parallel=True
    )
    
    reviewer = PaperReviewer(config)
    
    # Review a paper
    paper_url = EXAMPLE_PAPERS[0]
    print(f"\nReviewing: {paper_url}")
    
    report = reviewer.review(paper_url, output_file="example_review.md")
    
    print("\n✓ Review complete! Saved to example_review.md")
    print("\nFirst 500 characters:")
    print("-" * 40)
    print(report[:500])
    

def example_2_specific_agents():
    """Example 2: Run specific agents only."""
    print("\n" + "="*60)
    print("Example 2: Running Specific Agents")
    print("="*60)
    
    from orchestrator import MultiAgentOrchestrator, AgentRole, Config
    
    config = Config(
        api_base=API_BASE,
        model_id=MODEL_ID
    )
    
    orchestrator = MultiAgentOrchestrator(config)
    
    paper_url = EXAMPLE_PAPERS[0]
    print(f"\nRunning critique + summary for: {paper_url}")
    
    # Run only critic and summarizer
    results = orchestrator.run_pipeline(
        paper_url,
        agents_to_run=[AgentRole.CRITIC, AgentRole.SUMMARIZER]
    )
    
    print("\nCritique:")
    print("-" * 40)
    print(results["stages"].get("critic", {}).get("result", "N/A")[:500])
    
    print("\nSummary:")
    print("-" * 40)
    print(results["stages"].get("summarizer", {}).get("result", "N/A")[:500])


def example_3_find_related():
    """Example 3: Find related papers."""
    print("\n" + "="*60)
    print("Example 3: Finding Related Papers")
    print("="*60)
    
    from api import PaperReviewer, ReviewConfig
    
    config = ReviewConfig(api_base=API_BASE, model_id=MODEL_ID)
    reviewer = PaperReviewer(config)
    
    paper_url = EXAMPLE_PAPERS[0]
    print(f"\nFinding papers related to: {paper_url}")
    
    related = reviewer.find_related(paper_url, max_papers=10)
    
    print(f"\nFound {len(related)} related papers:")
    print("-" * 40)
    
    for i, paper in enumerate(related[:5], 1):
        title = paper.get("title", "Unknown")[:60]
        year = paper.get("year", "N/A")
        source = paper.get("source", "unknown")
        print(f"{i}. [{source}] {title}... ({year})")


def example_4_check_reproducibility():
    """Example 4: Check paper reproducibility."""
    print("\n" + "="*60)
    print("Example 4: Reproducibility Check")
    print("="*60)
    
    from api import PaperReviewer, ReviewConfig
    
    config = ReviewConfig(api_base=API_BASE, model_id=MODEL_ID)
    reviewer = PaperReviewer(config)
    
    paper_url = EXAMPLE_PAPERS[0]
    print(f"\nChecking reproducibility of: {paper_url}")
    
    repro = reviewer.check_reproducibility(paper_url)
    
    print("\nReproducibility Assessment:")
    print("-" * 40)
    print(f"Score: {repro.get('score', 0)}/10")
    print(f"Code Available: {repro.get('code_available', False)}")
    print(f"Hyperparameters: {repro.get('hyperparameters_provided', False)}")
    print(f"Compute Requirements: {repro.get('compute_requirements', False)}")
    
    print("\nIssues:")
    for issue in repro.get("issues", []):
        print(f"  - {issue}")
    
    print("\nPositive Aspects:")
    for pos in repro.get("positive_aspects", []):
        print(f"  + {pos}")


def example_5_compare_papers():
    """Example 5: Compare multiple papers."""
    print("\n" + "="*60)
    print("Example 5: Comparing Papers")
    print("="*60)
    
    from api import PaperReviewer, ReviewConfig
    
    config = ReviewConfig(api_base=API_BASE, model_id=MODEL_ID)
    reviewer = PaperReviewer(config)
    
    papers = EXAMPLE_PAPERS[:2]
    print(f"\nComparing {len(papers)} papers...")
    
    comparison = reviewer.compare_papers(papers)
    
    print("\nComparison Result:")
    print("-" * 40)
    print(comparison[:1000])


def example_6_use_tools_directly():
    """Example 6: Use individual tools directly."""
    print("\n" + "="*60)
    print("Example 6: Using Tools Directly")
    print("="*60)
    
    from paper_review_system import (
        download_pdf,
        extract_text_from_pdf,
        extract_paper_metadata,
        extract_citations,
        search_semantic_scholar,
        search_arxiv
    )
    import json
    
    paper_url = EXAMPLE_PAPERS[0]
    print(f"\nProcessing: {paper_url}")
    
    # Download
    print("\n1. Downloading PDF...")
    pdf_path = download_pdf(paper_url)
    print(f"   Saved to: {pdf_path}")
    
    # Extract text
    print("\n2. Extracting text...")
    text = extract_text_from_pdf(pdf_path)
    print(f"   Extracted {len(text)} characters")
    
    # Metadata
    print("\n3. Extracting metadata...")
    metadata = json.loads(extract_paper_metadata(text))
    print(f"   Title: {metadata.get('title', 'Unknown')[:60]}...")
    print(f"   arXiv ID: {metadata.get('arxiv_id', 'N/A')}")
    
    # Citations
    print("\n4. Extracting citations...")
    citations = json.loads(extract_citations(text))
    print(f"   Found {len(citations)} citations")
    
    # Related papers
    print("\n5. Searching related papers...")
    title = metadata.get("title", "machine learning")[:50]
    
    ss_results = json.loads(search_semantic_scholar(title, limit=3))
    arxiv_results = json.loads(search_arxiv(title, max_results=3))
    
    print(f"   Semantic Scholar: {len(ss_results)} results")
    print(f"   arXiv: {len(arxiv_results)} results")


def example_7_custom_agent():
    """Example 7: Create and use a custom agent."""
    print("\n" + "="*60)
    print("Example 7: Custom Agent")
    print("="*60)
    
    from smolagents import CodeAgent, tool
    
    # Create model
    model = LiteLLMModel(
        model_id=MODEL_ID,
        api_base=API_BASE,
        num_ctx=8192
    )
    
    # Create custom agent for novelty assessment
    novelty_agent = CodeAgent(
        tools=[],
        model=model,
        name="novelty_assessor",
        system_prompt="""You are an expert at assessing the novelty of research papers.

For each paper, evaluate:
1. Technical novelty (new methods, algorithms)
2. Empirical novelty (new experiments, datasets)
3. Conceptual novelty (new perspectives, frameworks)

Rate each dimension 1-10 and explain your reasoning."""
    )
    
    # Test with a paper abstract
    test_abstract = """
    We introduce Diffusion Transformers (DiTs), a new class of diffusion models 
    based on the transformer architecture. We find that the design decisions 
    for transformer-based diffusion models significantly affect performance.
    Through careful architecture design and training, DiTs achieve state-of-the-art
    FID of 2.27 on ImageNet 512x512, outperforming all prior diffusion models.
    """
    
    print("\nAssessing novelty of paper abstract...")
    result = novelty_agent.run(f"Assess the novelty of this paper:\n\n{test_abstract}")
    
    print("\nNovelty Assessment:")
    print("-" * 40)
    print(result)


def example_8_batch_processing():
    """Example 8: Process multiple papers."""
    print("\n" + "="*60)
    print("Example 8: Batch Processing")
    print("="*60)
    
    from api import PaperReviewer, ReviewConfig
    from concurrent.futures import ThreadPoolExecutor
    import time
    
    config = ReviewConfig(
        api_base=API_BASE,
        model_id=MODEL_ID,
        parallel=True
    )
    
    reviewer = PaperReviewer(config)
    
    papers = EXAMPLE_PAPERS[:2]  # Process 2 papers
    
    print(f"\nProcessing {len(papers)} papers in parallel...")
    
    start_time = time.time()
    
    def process_paper(url):
        return reviewer.summarize(url)
    
    results = {}
    with ThreadPoolExecutor(max_workers=2) as executor:
        futures = {executor.submit(process_paper, url): url for url in papers}
        for future in futures:
            url = futures[future]
            try:
                results[url] = future.result()
            except Exception as e:
                results[url] = f"Error: {e}"
    
    elapsed = time.time() - start_time
    print(f"\nProcessed {len(papers)} papers in {elapsed:.1f}s")
    
    for url, summary in results.items():
        print(f"\n{url}:")
        print("-" * 40)
        print(summary[:300] + "...")


def main():
    """Run all examples."""
    import sys
    
    examples = {
        "1": ("Quick Review", example_1_quick_review),
        "2": ("Specific Agents", example_2_specific_agents),
        "3": ("Find Related", example_3_find_related),
        "4": ("Reproducibility", example_4_check_reproducibility),
        "5": ("Compare Papers", example_5_compare_papers),
        "6": ("Tools Directly", example_6_use_tools_directly),
        "7": ("Custom Agent", example_7_custom_agent),
        "8": ("Batch Processing", example_8_batch_processing),
    }
    
    print("="*60)
    print("Multi-Agent Paper Review System - Examples")
    print("="*60)
    print(f"\nUsing: {MODEL_ID}")
    print(f"API Base: {API_BASE}")
    print("\nAvailable examples:")
    
    for key, (name, _) in examples.items():
        print(f"  {key}. {name}")
    
    print("\nUsage:")
    print("  python examples.py        # Run all examples")
    print("  python examples.py 1      # Run example 1")
    print("  python examples.py 1 3 5  # Run examples 1, 3, and 5")
    
    # Get which examples to run
    if len(sys.argv) > 1:
        to_run = sys.argv[1:]
    else:
        print("\nRunning example 6 (Tools Directly) as demo...")
        to_run = ["6"]
    
    for key in to_run:
        if key in examples:
            name, func = examples[key]
            try:
                func()
            except Exception as e:
                print(f"\n✗ Example {key} failed: {e}")
        else:
            print(f"\n✗ Unknown example: {key}")


if __name__ == "__main__":
    main()

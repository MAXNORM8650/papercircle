"""
Paper Review API
================
Simple API for reviewing research papers using multi-agent system.

Usage:
    from api import PaperReviewer
    
    reviewer = PaperReviewer()
    report = reviewer.review("https://arxiv.org/abs/2312.12345")
    print(report)
"""

from dataclasses import dataclass
from typing import Optional, List, Dict, Any
import json
from pathlib import Path


@dataclass
class ReviewConfig:
    """Configuration for paper review."""
    # LLM Settings
    api_base: str = "http://10.127.30.115:11434"
    model_id: str = "ollama_chat/qwen3-coder:30b"
    num_ctx: int = 8192
    
    # Review Settings
    parallel: bool = True
    include_literature: bool = True
    include_reproducibility: bool = True
    max_related_papers: int = 5
    
    # Output Settings
    output_format: str = "markdown"  # "markdown", "json", "html"
    save_intermediate: bool = False
    cache_dir: str = "./paper_cache"


class PaperReviewer:
    """
    High-level API for paper review.
    
    Example:
        reviewer = PaperReviewer()
        
        # Full review
        report = reviewer.review("https://arxiv.org/abs/2312.12345")
        
        # Quick summary only
        summary = reviewer.summarize("https://arxiv.org/pdf/2312.12345.pdf")
        
        # Critical review only
        critique = reviewer.critique("https://arxiv.org/abs/2312.12345")
    """
    
    def __init__(self, config: ReviewConfig = None):
        """Initialize the reviewer with configuration."""
        self.config = config or ReviewConfig()
        self._orchestrator = None
        
    def _get_orchestrator(self):
        """Lazy initialization of orchestrator."""
        if self._orchestrator is None:
            from orchestrator import MultiAgentOrchestrator, Config
            
            internal_config = Config(
                api_base=self.config.api_base,
                model_id=self.config.model_id,
                num_ctx=self.config.num_ctx,
                cache_dir=self.config.cache_dir
            )
            self._orchestrator = MultiAgentOrchestrator(internal_config)
        return self._orchestrator
    
    def review(
        self,
        paper_url: str,
        output_file: Optional[str] = None
    ) -> str:
        """
        Full comprehensive review of a paper.
        
        Args:
            paper_url: URL to paper (arXiv, PDF link, etc.)
            output_file: Optional path to save the report
            
        Returns:
            Complete review report as string
        """
        orchestrator = self._get_orchestrator()
        results = orchestrator.run_pipeline(
            paper_url,
            parallel=self.config.parallel
        )
        
        report = results.get("final_report", "Review failed")
        
        if output_file:
            Path(output_file).write_text(report)
            print(f"Report saved to {output_file}")
        
        return report
    
    def summarize(self, paper_url: str) -> str:
        """
        Get summaries at multiple levels.
        
        Args:
            paper_url: URL to paper
            
        Returns:
            Multi-level summary
        """
        from orchestrator import AgentRole
        
        orchestrator = self._get_orchestrator()
        results = orchestrator.run_pipeline(
            paper_url,
            agents_to_run=[AgentRole.SUMMARIZER]
        )
        
        return results.get("stages", {}).get("summarizer", {}).get("result", "Summarization failed")
    
    def critique(self, paper_url: str) -> str:
        """
        Get critical review only.
        
        Args:
            paper_url: URL to paper
            
        Returns:
            Critical review
        """
        from orchestrator import AgentRole
        
        orchestrator = self._get_orchestrator()
        results = orchestrator.run_pipeline(
            paper_url,
            agents_to_run=[AgentRole.CRITIC]
        )
        
        return results.get("stages", {}).get("critic", {}).get("result", "Critique failed")
    
    def find_related(self, paper_url: str, max_papers: int = 10) -> List[Dict]:
        """
        Find related papers.
        
        Args:
            paper_url: URL to paper
            max_papers: Maximum number of related papers
            
        Returns:
            List of related papers
        """
        from paper_review_system import (
            download_pdf,
            extract_text_from_pdf,
            extract_paper_metadata,
            search_semantic_scholar,
            search_arxiv
        )
        
        # Get paper metadata
        pdf_path = download_pdf(paper_url)
        paper_text = extract_text_from_pdf(pdf_path)
        metadata = json.loads(extract_paper_metadata(paper_text))
        
        title = metadata.get("title", "")
        
        # Search both sources
        ss_results = json.loads(search_semantic_scholar(title[:100], limit=max_papers//2))
        arxiv_results = json.loads(search_arxiv(title[:100], max_results=max_papers//2))
        
        related = []
        
        if isinstance(ss_results, list):
            for paper in ss_results:
                paper["source"] = "semantic_scholar"
                related.append(paper)
        
        if isinstance(arxiv_results, list):
            for paper in arxiv_results:
                paper["source"] = "arxiv"
                related.append(paper)
        
        return related
    
    def check_reproducibility(self, paper_url: str) -> Dict[str, Any]:
        """
        Check paper reproducibility.
        
        Args:
            paper_url: URL to paper
            
        Returns:
            Reproducibility assessment
        """
        from paper_review_system import download_pdf, extract_text_from_pdf
        from specialized_agents import check_reproducibility
        
        pdf_path = download_pdf(paper_url)
        paper_text = extract_text_from_pdf(pdf_path)
        
        result = check_reproducibility(paper_text)
        return json.loads(result)
    
    def compare_papers(
        self,
        paper_urls: List[str]
    ) -> str:
        """
        Compare multiple papers.
        
        Args:
            paper_urls: List of paper URLs
            
        Returns:
            Comparison report
        """
        from paper_review_system import download_pdf, extract_text_from_pdf, extract_paper_metadata
        
        papers_info = []
        
        for url in paper_urls:
            pdf_path = download_pdf(url)
            text = extract_text_from_pdf(pdf_path)
            metadata = json.loads(extract_paper_metadata(text))
            papers_info.append({
                "url": url,
                "metadata": metadata,
                "text": text[:10000]  # Truncate for comparison
            })
        
        # Use analysis agent for comparison
        orchestrator = self._get_orchestrator()
        
        comparison_prompt = "Compare these papers:\n\n"
        for i, paper in enumerate(papers_info, 1):
            comparison_prompt += f"Paper {i}: {paper['metadata'].get('title', 'Unknown')}\n"
            comparison_prompt += f"Abstract: {paper['metadata'].get('abstract', '')[:500]}\n\n"
        
        comparison_prompt += """
Provide:
1. Key similarities
2. Key differences
3. Which paper is more novel
4. Which has stronger experiments
5. Overall comparison table
"""
        
        result = orchestrator.analysis_agent.run(comparison_prompt)
        return result


# ============================================================================
# Convenience functions
# ============================================================================

def review_paper(url: str, **kwargs) -> str:
    """Quick function to review a paper."""
    config = ReviewConfig(**kwargs)
    reviewer = PaperReviewer(config)
    return reviewer.review(url)


def summarize_paper(url: str) -> str:
    """Quick function to summarize a paper."""
    reviewer = PaperReviewer()
    return reviewer.summarize(url)


def critique_paper(url: str) -> str:
    """Quick function to critique a paper."""
    reviewer = PaperReviewer()
    return reviewer.critique(url)


# ============================================================================
# Example Usage
# ============================================================================

if __name__ == "__main__":
    # Example: Review a paper
    print("Paper Review API Examples")
    print("=" * 50)
    
    # Configure with your settings
    config = ReviewConfig(
        api_base="http://10.127.30.115:11434",
        model_id="ollama_chat/gpt-oss:20b",
        parallel=True
    )
    
    reviewer = PaperReviewer(config)
    
    # Example URLs to try
    example_urls = [
        "https://arxiv.org/abs/2312.00752",  # Example paper
        "https://arxiv.org/abs/2303.08774",  # GPT-4 paper
    ]
    breakpoint()
    report = reviewer.review("https://arxiv.org/abs/2512.09929")
    summary = reviewer.summarize("https://arxiv.org/abs/2512.09929")
    repro = reviewer.check_reproducibility("https://arxiv.org/2512.09929")

    print("\nTo review a paper, run:")
    print('  report = reviewer.review("https://arxiv.org/abs/YOUR_PAPER")')
    print("\nTo get just a summary:")
    print('  summary = reviewer.summarize("https://arxiv.org/abs/YOUR_PAPER")')
    print("\nTo check reproducibility:")
    print('  repro = reviewer.check_reproducibility("https://arxiv.org/abs/YOUR_PAPER")')

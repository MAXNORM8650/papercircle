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
            from paper_review_agents.orchestrator import MultiAgentOrchestrator, Config
            
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
        from paper_review_agents.orchestrator import AgentRole
        
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
        from paper_review_agents.orchestrator import AgentRole
        
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
        from paper_review_agents.paper_review_system import (
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
        from paper_review_agents.paper_review_system import download_pdf, extract_text_from_pdf
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
        from paper_review_agents.paper_review_system import download_pdf, extract_text_from_pdf, extract_paper_metadata
        
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

    def review_with_lineage(
        self,
        paper_url: str,
        paper_id: Optional[str] = None,
        community_id: Optional[str] = None,
        extract_graph: bool = True
    ) -> Dict[str, Any]:
        """
        Full review with lineage extraction and graph generation.

        This is the main method for the enhanced review API that:
        1. Runs the complete review pipeline
        2. Extracts lineage relationships
        3. Generates graph visualization
        4. Optionally saves edges to database

        Args:
            paper_url: URL to paper (arXiv, PDF link, etc.)
            paper_id: Optional paper UUID (for database edge storage)
            community_id: Optional community context
            extract_graph: Whether to generate graph visualization

        Returns:
            Dictionary containing:
                - review_data: Complete review analysis
                - graph_data: Nodes and edges for visualization
                - lineage_relationships: Discovered paper-to-paper relationships
                - processing_time: Total time in seconds
        """
        import time
        from paper_review_agents.lineage_extractor import LineageExtractor
        from paper_review_agents.graph_generator import GraphGenerator

        start_time = time.time()

        # Run complete review pipeline
        orchestrator = self._get_orchestrator()
        results = orchestrator.run_pipeline(
            paper_url,
            parallel=self.config.parallel
        )

        # Extract lineage relationships (LLM-powered when config available)
        llm_config = None
        if hasattr(self.config, 'model_id') and self.config.model_id:
            llm_config = {
                "model_id": self.config.model_id,
                "api_base": getattr(self.config, 'api_base', None),
                "api_key": getattr(self.config, 'api_key', None),
                "num_ctx": getattr(self.config, 'num_ctx', 8192),
            }
        lineage_extractor = LineageExtractor(verbose=True, llm_config=llm_config)
        lineage_relationships = lineage_extractor.extract_all_relationships(results)

        # Convert to dict format
        lineage_data = [edge.to_dict() for edge in lineage_relationships]

        # Generate graph if requested
        graph_data = None
        if extract_graph:
            graph_generator = GraphGenerator(verbose=True)
            graph_data = graph_generator.generate_graph(results)

        processing_time = time.time() - start_time

        return {
            "paper_url": paper_url,
            "paper_id": paper_id,
            "status": "complete",
            "review_data": {
                "conference_review": results.get("stages", {}).get("critic", {}).get("result"),
                "deep_analysis": results.get("stages", {}).get("deep_analyzer", {}).get("result"),
                "contributions": results.get("stages", {}).get("contribution_analyzer", {}).get("result"),
                "reproducibility": results.get("stages", {}).get("reproducibility_checker", {}).get("result"),
                "summary": results.get("stages", {}).get("summarizer", {}).get("result"),
                "literature": results.get("stages", {}).get("literature", {})
            },
            "graph_data": graph_data,
            "lineage_relationships": lineage_data,
            "processing_time": processing_time,
            "metadata": results.get("stages", {}).get("pdf_processing", {}).get("metadata", {})
        }

    def save_lineage_to_database(
        self,
        paper_id: str,
        lineage_relationships: List[Dict[str, Any]],
        community_id: Optional[str] = None,
        supabase_client = None
    ) -> Dict[str, Any]:
        """
        Save extracted lineage relationships to database.

        Args:
            paper_id: Source paper UUID
            lineage_relationships: List of lineage edge dicts
            community_id: Optional community context
            supabase_client: Optional Supabase client

        Returns:
            Statistics about saved edges
        """
        from paper_review_agents.database_manager import find_and_save_edges, DatabaseManager

        db_manager = DatabaseManager(supabase_client)

        stats = find_and_save_edges(
            source_paper_id=paper_id,
            extracted_edges=lineage_relationships,
            db_manager=db_manager,
            community_id=community_id
        )

        return stats


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

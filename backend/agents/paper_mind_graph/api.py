"""
Paper Mind Graph - Main API
============================
High-level API for paper mind graph creation and interaction.

Example:
    from paper_mind_graph import PaperMindGraph
    
    # Create mind graph from paper
    pmg = PaperMindGraph("https://arxiv.org/abs/2312.12345")
    
    # Ask questions
    answer = pmg.ask("What is the main contribution?")
    
    # Find where something is discussed
    location = pmg.locate("attention mechanism")
    
    # Export
    pmg.export("markdown", "paper_notes.md")
"""

from typing import Optional, List, Dict, Any
from dataclasses import dataclass
from pathlib import Path
import json

from .schema import MindGraph, NodeType, EdgeType
from .ingestion import IngestionPipeline, download_pdf
from .graph_builder import GraphBuilder
from .verification import CoverageChecker, VerificationManager, CoverageReport
from .qa_system import PaperQA, QASession, QAResponse
from .export import GraphExporter


# ============================================================================
# Configuration
# ============================================================================

@dataclass
class Config:
    """Configuration for Paper Mind Graph."""
    # LLM settings
    api_base: str = "http://10.127.30.115:11434"
    model_id: str = "ollama_chat/qwen3-coder:30b"
    num_ctx: int = 8192
    
    # Processing settings
    cache_dir: str = "./paper_cache"
    max_chunk_size: int = 1500
    
    # Graph building
    extract_concepts: bool = True
    extract_methods: bool = True
    extract_experiments: bool = True
    link_figures: bool = True
    
    # Q&A settings
    top_k_retrieval: int = 5
    
    def to_dict(self) -> Dict:
        return {
            "api_base": self.api_base,
            "model_id": self.model_id,
            "num_ctx": self.num_ctx,
            "cache_dir": self.cache_dir,
            "max_chunk_size": self.max_chunk_size,
            "top_k": self.top_k_retrieval
        }


# ============================================================================
# Main Class
# ============================================================================

class PaperMindGraph:
    """
    Main class for creating and interacting with paper mind graphs.
    
    Example:
        # Create from URL
        pmg = PaperMindGraph("https://arxiv.org/abs/2312.12345")
        
        # Or from local PDF
        pmg = PaperMindGraph("path/to/paper.pdf")
        
        # Or load existing graph
        pmg = PaperMindGraph.load("paper_graph.json")
        
        # Ask questions
        answer = pmg.ask("What are the main contributions?")
        
        # Get coverage report
        report = pmg.check_coverage()
        
        # Export
        pmg.export("markdown", "notes.md")
    """
    
    def __init__(
        self,
        paper_source: str = None,
        config: Config = None,
        verbose: bool = True
    ):
        """
        Initialize Paper Mind Graph.
        
        Args:
            paper_source: URL or path to PDF (None to create empty)
            config: Configuration options
            verbose: Print progress
        """
        self.config = config or Config()
        self.verbose = verbose
        
        # Initialize components
        self._ingestion = IngestionPipeline(self.config.cache_dir)
        self._builder = None
        self._qa = None
        self._verifier = None
        self._exporter = None
        
        # The graph
        self.graph: Optional[MindGraph] = None
        
        # Process paper if provided
        if paper_source:
            self.load_paper(paper_source)
    
    def load_paper(self, paper_source: str) -> 'PaperMindGraph':
        """
        Load and process a paper.
        
        Args:
            paper_source: URL or path to PDF
            
        Returns:
            self for chaining
        """
        if self.verbose:
            print(f"📄 Loading paper: {paper_source}")
        
        # Step 1: Ingest and parse
        if self.verbose:
            print("\n📥 Step 1: Ingesting PDF...")
        self.graph = self._ingestion.ingest(paper_source)
        
        if self.verbose:
            print(f"   Title: {self.graph.metadata.title[:60]}...")
            print(f"   Pages: {self.graph.metadata.num_pages}")
            print(f"   Sections: {len(self.graph.sections)}")
            print(f"   Figures: {len(self.graph.figures)}")
            print(f"   Tables: {len(self.graph.tables)}")
            print(f"   Chunks: {len(self.graph.chunks)}")
        
        # Step 2: Build graph with LLM
        if self.verbose:
            print("\n🔬 Step 2: Building mind graph...")
        
        self._builder = GraphBuilder(self.config.to_dict())
        self.graph = self._builder.build_graph(self.graph, verbose=self.verbose)
        
        # Initialize other components
        self._init_components()
        
        if self.verbose:
            print("\n✅ Paper loaded successfully!")
            self._print_summary()
        
        return self
    
    def _init_components(self):
        """Initialize QA and other components."""
        self._qa = PaperQA(self.graph, self.config.to_dict())
        self._verifier = VerificationManager(self.graph)
        self._exporter = GraphExporter(self.graph)
    
    def _print_summary(self):
        """Print graph summary."""
        concepts = len(self.graph.get_nodes_by_type(NodeType.CONCEPT))
        methods = len(self.graph.get_nodes_by_type(NodeType.METHOD))
        experiments = len(self.graph.get_nodes_by_type(NodeType.EXPERIMENT))
        
        print(f"\n📊 Graph Summary:")
        print(f"   Total Nodes: {len(self.graph.nodes)}")
        print(f"   - Concepts: {concepts}")
        print(f"   - Methods: {methods}")
        print(f"   - Experiments: {experiments}")
        print(f"   Total Edges: {len(self.graph.edges)}")
    
    # ========================================================================
    # Q&A Methods
    # ========================================================================
    
    def ask(self, question: str) -> str:
        """
        Ask a question about the paper.
        
        Args:
            question: Your question
            
        Returns:
            Answer string with supporting evidence
        """
        if not self._qa:
            raise ValueError("No paper loaded. Call load_paper() first.")
        
        response = self._qa.ask(question)
        
        # Format response
        output = f"**Answer:**\n{response.answer}\n"
        
        if response.relevant_sections:
            output += f"\n**Sections:** {', '.join(response.relevant_sections)}"
        if response.relevant_figures:
            output += f"\n**Figures:** {', '.join(response.relevant_figures)}"
        if response.relevant_tables:
            output += f"\n**Tables:** {', '.join(response.relevant_tables)}"
        
        return output
    
    def ask_detailed(self, question: str) -> QAResponse:
        """
        Ask a question and get detailed structured response.
        
        Args:
            question: Your question
            
        Returns:
            QAResponse object with full details
        """
        if not self._qa:
            raise ValueError("No paper loaded. Call load_paper() first.")
        return self._qa.ask(question)
    
    def locate(self, item: str) -> Dict[str, Any]:
        """
        Find where something is defined/discussed in the paper.
        
        Args:
            item: What to locate (concept, term, figure, etc.)
            
        Returns:
            Dictionary with location information
        """
        if not self._qa:
            raise ValueError("No paper loaded. Call load_paper() first.")
        return self._qa.locate(item)
    
    def start_session(self) -> QASession:
        """
        Start an interactive Q&A session.
        
        Returns:
            QASession for interactive use
        """
        if not self.graph:
            raise ValueError("No paper loaded. Call load_paper() first.")
        return QASession(self.graph, self.config.to_dict())
    
    # ========================================================================
    # Graph Access Methods
    # ========================================================================
    
    def get_concepts(self) -> List[Dict]:
        """Get all concepts extracted from the paper."""
        return [
            {"id": n.id, "title": n.title, "description": n.description, "pages": n.origin_pages}
            for n in self.graph.get_nodes_by_type(NodeType.CONCEPT)
        ]
    
    def get_methods(self) -> List[Dict]:
        """Get all methods extracted from the paper."""
        return [
            {"id": n.id, "title": n.title, "description": n.description, "pages": n.origin_pages}
            for n in self.graph.get_nodes_by_type(NodeType.METHOD)
        ]
    
    def get_experiments(self) -> List[Dict]:
        """Get all experiments extracted from the paper."""
        return [
            {"id": n.id, "title": n.title, "description": n.description, "results": n.properties.get("key_results", [])}
            for n in self.graph.get_nodes_by_type(NodeType.EXPERIMENT)
        ]
    
    def get_figures(self) -> List[Dict]:
        """Get all figures in the paper."""
        return [
            {"id": f.id, "label": f.label, "caption": f.caption, "page": f.page}
            for f in self.graph.figures
        ]
    
    def get_tables(self) -> List[Dict]:
        """Get all tables in the paper."""
        return [
            {"id": t.id, "label": t.label, "caption": t.caption, "page": t.page}
            for t in self.graph.tables
        ]
    
    def get_node(self, node_id: str) -> Optional[Dict]:
        """Get a specific node by ID."""
        node = self.graph.get_node(node_id)
        return node.to_dict() if node else None
    
    def get_neighbors(self, node_id: str, hops: int = 1) -> Dict[str, Any]:
        """Get neighboring nodes."""
        neighbors = self.graph.get_neighbors(node_id, hops)
        return {nid: n.to_dict() for nid, n in neighbors.items()}
    
    # ========================================================================
    # Verification Methods
    # ========================================================================
    
    def check_coverage(self) -> CoverageReport:
        """
        Check coverage of the mind graph.
        
        Returns:
            CoverageReport with detailed coverage information
        """
        checker = CoverageChecker(self.graph)
        return checker.check_coverage()
    
    def print_coverage(self):
        """Print coverage report."""
        report = self.check_coverage()
        print(report.to_markdown())
    
    def verify_node(self, node_id: str) -> bool:
        """Mark a node as human-verified."""
        return self._verifier.verify_node(node_id)
    
    def edit_node(self, node_id: str, title: str = None, description: str = None) -> bool:
        """Edit a node's content."""
        return self._verifier.edit_node(node_id, title, description)
    
    def add_link(self, source_id: str, target_id: str, edge_type: str, reason: str = None) -> str:
        """Add a new link between nodes."""
        return self._verifier.add_edge(source_id, target_id, EdgeType(edge_type), reason)
    
    def remove_link(self, edge_id: str) -> bool:
        """Remove a link."""
        return self._verifier.remove_edge(edge_id)
    
    def get_unverified(self) -> List[Dict]:
        """Get all unverified nodes."""
        nodes = self._verifier.get_unverified_nodes()
        return [n.to_dict() for n in nodes]
    
    # ========================================================================
    # Export Methods
    # ========================================================================
    
    def export(self, format: str, output_path: str = None, **kwargs) -> str:
        """
        Export the mind graph.
        
        Args:
            format: "json", "markdown", "mermaid", "mermaid-mindmap", "mermaid-flowchart", "html"
            output_path: Optional path to save
            **kwargs: Format-specific options
            
        Returns:
            Exported content
        """
        return self._exporter.export(format, output_path, **kwargs)
    
    def export_all(self, output_dir: str):
        """Export to all formats."""
        self._exporter.export_all(output_dir)
    
    def to_json(self) -> str:
        """Export to JSON string."""
        return self.export("json")
    
    def to_markdown(self) -> str:
        """Export to Markdown string."""
        return self.export("markdown")
    
    def to_mermaid(self) -> str:
        """Export to Mermaid flowchart."""
        return self.export("mermaid-flowchart")
    
    # ========================================================================
    # Save/Load Methods
    # ========================================================================
    
    def save(self, path: str):
        """
        Save the graph to a JSON file.
        
        Args:
            path: Path to save to
        """
        Path(path).write_text(self.graph.to_json())
        if self.verbose:
            print(f"Saved to {path}")
    
    @classmethod
    def load(cls, path: str, config: Config = None) -> 'PaperMindGraph':
        """
        Load a graph from a JSON file.
        
        Args:
            path: Path to load from
            config: Optional configuration
            
        Returns:
            PaperMindGraph instance
        """
        data = json.loads(Path(path).read_text())
        graph = MindGraph.from_dict(data)
        
        pmg = cls(config=config, verbose=False)
        pmg.graph = graph
        pmg._init_components()
        
        return pmg
    
    # ========================================================================
    # Properties
    # ========================================================================
    
    @property
    def title(self) -> str:
        """Paper title."""
        return self.graph.metadata.title if self.graph else ""
    
    @property
    def abstract(self) -> str:
        """Paper abstract."""
        return self.graph.metadata.abstract if self.graph else ""
    
    @property
    def num_concepts(self) -> int:
        """Number of concepts."""
        return len(self.graph.get_nodes_by_type(NodeType.CONCEPT)) if self.graph else 0
    
    @property
    def num_methods(self) -> int:
        """Number of methods."""
        return len(self.graph.get_nodes_by_type(NodeType.METHOD)) if self.graph else 0


# ============================================================================
# Convenience Functions
# ============================================================================

def create_mind_graph(
    paper_source: str,
    config: Config = None,
    verbose: bool = True
) -> PaperMindGraph:
    """
    Create a mind graph from a paper.
    
    Args:
        paper_source: URL or path to PDF
        config: Optional configuration
        verbose: Print progress
        
    Returns:
        PaperMindGraph instance
    """
    return PaperMindGraph(paper_source, config, verbose)


def load_mind_graph(path: str, config: Config = None) -> PaperMindGraph:
    """
    Load a saved mind graph.
    
    Args:
        path: Path to JSON file
        config: Optional configuration
        
    Returns:
        PaperMindGraph instance
    """
    return PaperMindGraph.load(path, config)


# ============================================================================
# CLI
# ============================================================================

def main():
    """Command-line interface."""
    import argparse
    
    parser = argparse.ArgumentParser(
        description="Paper Mind Graph - Create knowledge graphs from research papers"
    )
    parser.add_argument("paper", help="Paper URL or path")
    parser.add_argument("--output", "-o", help="Output directory")
    parser.add_argument("--format", "-f", choices=["json", "markdown", "mermaid", "html", "all"],
                       default="all", help="Export format")
    parser.add_argument("--api-base", default="http://10.127.30.115:11434")
    parser.add_argument("--model", default="ollama_chat/qwen3-coder:30b")
    parser.add_argument("--quiet", "-q", action="store_true", help="Quiet mode")
    
    args = parser.parse_args()
    
    # Create config
    config = Config(
        api_base=args.api_base,
        model_id=args.model
    )
    
    # Create mind graph
    pmg = PaperMindGraph(args.paper, config, verbose=not args.quiet)
    
    # Export
    if args.output:
        if args.format == "all":
            pmg.export_all(args.output)
        else:
            output_path = f"{args.output}/paper.{args.format}"
            pmg.export(args.format, output_path)
            print(f"Exported to {output_path}")
    else:
        # Print coverage
        pmg.print_coverage()


if __name__ == "__main__":
    main()

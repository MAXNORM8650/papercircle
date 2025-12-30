"""
Paper Mind Graph
================
Build knowledge graphs from research papers.

Create mind maps of concepts, methods, experiments, and their relationships.
Ask questions, verify coverage, and export to multiple formats.

Quick Start:
    from paper_mind_graph import PaperMindGraph
    
    # Load a paper
    pmg = PaperMindGraph("https://arxiv.org/abs/2312.12345")
    
    # Ask questions
    answer = pmg.ask("What is the main contribution?")
    
    # Export
    pmg.export("markdown", "notes.md")
"""

from .schema import (
    MindGraph,
    GraphNode,
    GraphEdge,
    NodeType,
    EdgeType,
    VerificationStatus,
    PaperMetadata,
    Section,
    Figure,
    Table,
    Equation,
    Chunk,
)

from .api import (
    PaperMindGraph,
    Config,
    create_mind_graph,
    load_mind_graph,
)

from .ingestion import (
    IngestionPipeline,
    PDFParser,
    SemanticChunker,
    download_pdf,
    ingest_paper,
)

from .graph_builder import (
    GraphBuilder,
    ConceptExtractor,
    MethodExtractor,
    ExperimentExtractor,
    LinkageAgent,
    build_mind_graph,
)

from .verification import (
    CoverageChecker,
    VerificationManager,
    CoverageReport,
    CoverageStatus,
    check_coverage,
    get_unlinked_items,
)

from .qa_system import (
    PaperQA,
    QASession,
    QAResponse,
    GraphRetriever,
    EmbeddingStore,
    create_qa_system,
    ask_paper,
)

from .export import (
    GraphExporter,
    JSONExporter,
    MarkdownExporter,
    MermaidExporter,
    HTMLExporter,
    export_to_json,
    export_to_markdown,
    export_to_mermaid,
    export_to_html,
)

__version__ = "1.0.0"
__author__ = "Paper Mind Graph Team"

__all__ = [
    # Main API
    "PaperMindGraph",
    "Config",
    "create_mind_graph",
    "load_mind_graph",
    
    # Schema
    "MindGraph",
    "GraphNode",
    "GraphEdge",
    "NodeType",
    "EdgeType",
    "VerificationStatus",
    "PaperMetadata",
    "Section",
    "Figure",
    "Table",
    "Equation",
    "Chunk",
    
    # Ingestion
    "IngestionPipeline",
    "PDFParser",
    "SemanticChunker",
    "download_pdf",
    "ingest_paper",
    
    # Graph Building
    "GraphBuilder",
    "ConceptExtractor",
    "MethodExtractor",
    "ExperimentExtractor",
    "LinkageAgent",
    "build_mind_graph",
    
    # Verification
    "CoverageChecker",
    "VerificationManager",
    "CoverageReport",
    "CoverageStatus",
    "check_coverage",
    "get_unlinked_items",
    
    # Q&A
    "PaperQA",
    "QASession",
    "QAResponse",
    "GraphRetriever",
    "EmbeddingStore",
    "create_qa_system",
    "ask_paper",
    
    # Export
    "GraphExporter",
    "JSONExporter",
    "MarkdownExporter",
    "MermaidExporter",
    "HTMLExporter",
    "export_to_json",
    "export_to_markdown",
    "export_to_mermaid",
    "export_to_html",
]

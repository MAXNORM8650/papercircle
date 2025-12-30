"""
Paper Mind Graph - Examples
============================
Comprehensive examples showing all features of the system.
"""

import sys
sys.path.insert(0, '.')

from paper_mind_graph import (
    PaperMindGraph, Config, MindGraph, NodeType, EdgeType,
    ingest_paper, build_mind_graph, check_coverage,
    export_to_markdown, export_to_mermaid
)


# ============================================================================
# Example 1: Basic Usage - Load Paper and Ask Questions
# ============================================================================

def example_1_basic_usage():
    """
    Simplest usage: load a paper and ask questions.
    """
    print("\n" + "="*60)
    print("Example 1: Basic Usage")
    print("="*60)
    
    # Load paper from arXiv
    pmg = PaperMindGraph("https://arxiv.org/abs/2312.00752")
    
    # Ask questions
    print("\n📝 Question: What is the main contribution?")
    answer = pmg.ask("What is the main contribution of this paper?")
    print(answer)
    
    print("\n📝 Question: What datasets are used?")
    answer = pmg.ask("What datasets are used in the experiments?")
    print(answer)
    
    # Locate something
    print("\n📍 Locating 'attention mechanism':")
    location = pmg.locate("attention mechanism")
    for loc in location.get("locations", [])[:3]:
        print(f"  - {loc['type']}: {loc['title']} (pages {loc['pages']})")


# ============================================================================
# Example 2: Explore the Graph Structure
# ============================================================================

def example_2_explore_graph():
    """
    Explore the extracted concepts, methods, and experiments.
    """
    print("\n" + "="*60)
    print("Example 2: Explore Graph Structure")
    print("="*60)
    
    pmg = PaperMindGraph("https://arxiv.org/abs/2312.00752")
    
    # Get all concepts
    print("\n🧠 Extracted Concepts:")
    for concept in pmg.get_concepts()[:5]:
        print(f"  - {concept['title']}")
        print(f"    {concept['description'][:80]}...")
        print(f"    Pages: {concept['pages']}")
    
    # Get all methods
    print("\n🔧 Extracted Methods:")
    for method in pmg.get_methods()[:3]:
        print(f"  - {method['title']}")
        print(f"    {method['description'][:80]}...")
    
    # Get figures and tables
    print("\n🖼️ Figures:")
    for fig in pmg.get_figures()[:3]:
        print(f"  - {fig['label']} (p.{fig['page']}): {fig['caption'][:50]}...")
    
    print("\n📊 Tables:")
    for table in pmg.get_tables()[:3]:
        print(f"  - {table['label']} (p.{table['page']}): {table['caption'][:50]}...")


# ============================================================================
# Example 3: Check Coverage (Nothing Dropped)
# ============================================================================

def example_3_coverage_check():
    """
    Verify that all figures, tables, sections are properly linked.
    This is critical for ensuring nothing is silently dropped.
    """
    print("\n" + "="*60)
    print("Example 3: Coverage Verification")
    print("="*60)
    
    pmg = PaperMindGraph("https://arxiv.org/abs/2312.00752")
    
    # Get coverage report
    report = pmg.check_coverage()
    
    print(f"\n✅ Overall Coverage Score: {report.get_coverage_score()}%")
    
    print("\n📊 Coverage Summary:")
    print(f"  Figures: {report.linked_figures}/{report.total_figures}")
    print(f"  Tables: {report.linked_tables}/{report.total_tables}")
    print(f"  Sections with concepts: {report.sections_with_concepts}/{report.total_sections}")
    print(f"  Equations: {report.linked_equations}/{report.total_equations}")
    
    print(f"\n🔍 Nodes: {report.auto_nodes} auto-generated, {report.verified_nodes} human-verified")
    
    # Show issues
    if report.critical_issues:
        print("\n❌ Critical Issues:")
        for issue in report.critical_issues:
            print(f"  - {issue}")
    
    if report.warnings:
        print("\n⚠️ Warnings:")
        for warning in report.warnings:
            print(f"  - {warning}")
    
    # Show unlinked items
    print("\n🔴 Unlinked Items (need attention):")
    for fig in report.figures:
        if fig.status.value == "unlinked":
            print(f"  - {fig.label}: No concepts linked")
            if fig.suggestions:
                print(f"    Suggestion: {fig.suggestions[0]}")


# ============================================================================
# Example 4: Human Editing & Verification
# ============================================================================

def example_4_human_editing():
    """
    Demonstrate human-in-the-loop editing and verification.
    """
    print("\n" + "="*60)
    print("Example 4: Human Editing & Verification")
    print("="*60)
    
    pmg = PaperMindGraph("https://arxiv.org/abs/2312.00752")
    
    # Get unverified nodes
    unverified = pmg.get_unverified()
    print(f"\n📝 Unverified nodes: {len(unverified)}")
    
    if unverified:
        # Verify a node
        node_id = unverified[0]['id']
        print(f"\n✅ Verifying node: {unverified[0]['title']}")
        pmg.verify_node(node_id)
        
        # Edit a node
        print(f"\n✏️ Editing node description...")
        pmg.edit_node(
            node_id,
            description="Updated description with human clarification"
        )
    
    # Add a new link
    concepts = pmg.get_concepts()
    figures = pmg.get_figures()
    
    if concepts and figures:
        print(f"\n🔗 Adding link: {concepts[0]['title']} → {figures[0]['label']}")
        pmg.add_link(
            concepts[0]['id'],
            figures[0]['id'],
            "illustrated_by",
            reason="Figure illustrates this concept"
        )
    
    print("\n✅ Edits complete! Graph is now human-verified.")


# ============================================================================
# Example 5: Interactive Q&A Session
# ============================================================================

def example_5_qa_session():
    """
    Start an interactive Q&A session with conversation history.
    """
    print("\n" + "="*60)
    print("Example 5: Interactive Q&A Session")
    print("="*60)
    
    pmg = PaperMindGraph("https://arxiv.org/abs/2312.00752")
    
    # Start session
    session = pmg.start_session()
    
    # Ask a series of questions
    questions = [
        "What problem does this paper solve?",
        "What is the proposed method?",
        "How does it compare to baselines?",
    ]
    
    for q in questions:
        print(f"\n❓ Q: {q}")
        answer = session.ask(q)
        print(f"💬 A: {answer[:300]}...")
    
    # Get history
    print(f"\n📜 Session history: {len(session.get_history())} exchanges")


# ============================================================================
# Example 6: Export to Multiple Formats
# ============================================================================

def example_6_export():
    """
    Export the mind graph to various formats.
    """
    print("\n" + "="*60)
    print("Example 6: Export Formats")
    print("="*60)
    
    pmg = PaperMindGraph("https://arxiv.org/abs/2312.00752")
    
    # Export to Markdown
    md = pmg.export("markdown")
    print("\n📄 Markdown Export (first 500 chars):")
    print(md[:500] + "...")
    
    # Export to Mermaid (for diagrams)
    mermaid = pmg.export("mermaid-mindmap")
    print("\n📊 Mermaid Mindmap:")
    print(mermaid[:400] + "...")
    
    # Export to JSON
    json_str = pmg.export("json")
    print(f"\n📦 JSON Export: {len(json_str)} characters")
    
    # Save all formats
    print("\n💾 Saving all formats to ./exports/")
    pmg.export_all("./exports")


# ============================================================================
# Example 7: Save and Load Graphs
# ============================================================================

def example_7_save_load():
    """
    Save a graph and reload it later.
    """
    print("\n" + "="*60)
    print("Example 7: Save & Load")
    print("="*60)
    
    # Create and save
    pmg = PaperMindGraph("https://arxiv.org/abs/2312.00752")
    pmg.save("my_paper_graph.json")
    print("✅ Saved to my_paper_graph.json")
    
    # Reload later
    pmg2 = PaperMindGraph.load("my_paper_graph.json")
    print(f"✅ Loaded: {pmg2.title[:50]}...")
    print(f"   Concepts: {pmg2.num_concepts}")
    print(f"   Methods: {pmg2.num_methods}")
    
    # Can continue asking questions
    answer = pmg2.ask("What is the main idea?")
    print(f"\n💬 {answer[:200]}...")


# ============================================================================
# Example 8: Low-Level API Access
# ============================================================================

def example_8_low_level():
    """
    Direct access to graph nodes and edges for advanced use cases.
    """
    print("\n" + "="*60)
    print("Example 8: Low-Level Graph Access")
    print("="*60)
    
    pmg = PaperMindGraph("https://arxiv.org/abs/2312.00752")
    graph = pmg.graph
    
    # Access raw nodes
    print(f"\n📊 Total nodes: {len(graph.nodes)}")
    
    # Get nodes by type
    concepts = graph.get_nodes_by_type(NodeType.CONCEPT)
    methods = graph.get_nodes_by_type(NodeType.METHOD)
    print(f"   Concepts: {len(concepts)}")
    print(f"   Methods: {len(methods)}")
    
    # Explore a specific node
    if concepts:
        node = concepts[0]
        print(f"\n🔍 Node Details: {node.title}")
        print(f"   Type: {node.type.value}")
        print(f"   Description: {node.description[:100]}...")
        print(f"   Source chunks: {node.source_chunks}")
        print(f"   Origin pages: {node.origin_pages}")
        print(f"   Verification: {node.verification_status.value}")
        
        # Get neighbors
        neighbors = graph.get_neighbors(node.id, hops=1)
        print(f"   Neighbors (1 hop): {len(neighbors)}")
        for nid, neighbor in list(neighbors.items())[:3]:
            print(f"     - {neighbor.title} ({neighbor.type.value})")
    
    # Look at edges
    print(f"\n🔗 Total edges: {len(graph.edges)}")
    edge_types = {}
    for edge in graph.edges.values():
        t = edge.type.value
        edge_types[t] = edge_types.get(t, 0) + 1
    
    print("   Edge type distribution:")
    for t, count in sorted(edge_types.items(), key=lambda x: -x[1])[:5]:
        print(f"     {t}: {count}")


# ============================================================================
# Example 9: Process Multiple Papers
# ============================================================================

def example_9_batch_processing():
    """
    Process multiple papers and compare.
    """
    print("\n" + "="*60)
    print("Example 9: Batch Processing")
    print("="*60)
    
    papers = [
        "https://arxiv.org/abs/2312.00752",
        # Add more papers here
    ]
    
    results = []
    for url in papers:
        print(f"\n📄 Processing: {url}")
        try:
            pmg = PaperMindGraph(url, verbose=False)
            results.append({
                "url": url,
                "title": pmg.title[:50],
                "concepts": pmg.num_concepts,
                "methods": pmg.num_methods,
                "coverage": pmg.check_coverage().get_coverage_score()
            })
            print(f"   ✅ {pmg.title[:40]}... ({pmg.num_concepts} concepts)")
        except Exception as e:
            print(f"   ❌ Error: {e}")
    
    # Summary
    print("\n📊 Batch Summary:")
    for r in results:
        print(f"  - {r['title']}: {r['concepts']} concepts, {r['coverage']}% coverage")


# ============================================================================
# Example 10: Custom Configuration
# ============================================================================

def example_10_custom_config():
    """
    Use custom configuration for different setups.
    """
    print("\n" + "="*60)
    print("Example 10: Custom Configuration")
    print("="*60)
    
    # Configuration for local Ollama
    config = Config(
        api_base="http://10.127.30.115:11434",
        model_id="ollama_chat/qwen3-coder:30b",
        num_ctx=8192,
        cache_dir="./my_cache",
        max_chunk_size=2000,
        extract_concepts=True,
        extract_methods=True,
        extract_experiments=True,
        link_figures=True,
        top_k_retrieval=7
    )
    
    print(f"Using config:")
    print(f"  Model: {config.model_id}")
    print(f"  API: {config.api_base}")
    print(f"  Context: {config.num_ctx}")
    
    pmg = PaperMindGraph("https://arxiv.org/abs/2312.00752", config=config)
    print(f"\n✅ Loaded with custom config: {pmg.num_concepts} concepts extracted")


# ============================================================================
# Example 11: Using Individual Components
# ============================================================================

def example_11_components():
    """
    Use individual components for fine-grained control.
    """
    print("\n" + "="*60)
    print("Example 11: Individual Components")
    print("="*60)
    
    from paper_mind_graph import (
        IngestionPipeline, GraphBuilder, CoverageChecker,
        PaperQA, GraphExporter
    )
    
    # Step 1: Ingest PDF
    print("\n📥 Step 1: Ingesting PDF...")
    pipeline = IngestionPipeline()
    graph = pipeline.ingest("https://arxiv.org/abs/2312.00752")
    print(f"   Parsed: {len(graph.sections)} sections, {len(graph.figures)} figures")
    
    # Step 2: Build graph
    print("\n🔬 Step 2: Building graph...")
    builder = GraphBuilder()
    graph = builder.build_graph(graph, verbose=False)
    print(f"   Built: {len(graph.nodes)} nodes, {len(graph.edges)} edges")
    
    # Step 3: Check coverage
    print("\n✅ Step 3: Checking coverage...")
    checker = CoverageChecker(graph)
    report = checker.check_coverage()
    print(f"   Coverage: {report.get_coverage_score()}%")
    
    # Step 4: Create Q&A system
    print("\n💬 Step 4: Creating Q&A system...")
    qa = PaperQA(graph)
    response = qa.ask("What is the main method?")
    print(f"   Answer: {response.answer[:100]}...")
    
    # Step 5: Export
    print("\n📤 Step 5: Exporting...")
    exporter = GraphExporter(graph)
    md = exporter.export("markdown")
    print(f"   Exported {len(md)} characters of markdown")


# ============================================================================
# Main Runner
# ============================================================================

def main():
    """Run all examples or a specific one."""
    import argparse
    
    examples = {
        1: ("Basic Usage", example_1_basic_usage),
        2: ("Explore Graph", example_2_explore_graph),
        3: ("Coverage Check", example_3_coverage_check),
        4: ("Human Editing", example_4_human_editing),
        5: ("Q&A Session", example_5_qa_session),
        6: ("Export Formats", example_6_export),
        7: ("Save & Load", example_7_save_load),
        8: ("Low-Level API", example_8_low_level),
        9: ("Batch Processing", example_9_batch_processing),
        10: ("Custom Config", example_10_custom_config),
        11: ("Components", example_11_components),
    }
    
    parser = argparse.ArgumentParser(description="Paper Mind Graph Examples")
    parser.add_argument("example", type=int, nargs="?", default=0,
                       help="Example number to run (0 for all)")
    args = parser.parse_args()
    
    if args.example == 0:
        print("Paper Mind Graph Examples")
        print("="*60)
        for num, (name, _) in examples.items():
            print(f"  {num}. {name}")
        print("\nRun with: python examples.py <number>")
        print("e.g., python examples.py 1")
    elif args.example in examples:
        name, func = examples[args.example]
        print(f"\n🚀 Running Example {args.example}: {name}")
        func()
    else:
        print(f"Unknown example: {args.example}")
        print(f"Valid examples: {list(examples.keys())}")


if __name__ == "__main__":
    main()

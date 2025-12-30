"""
Paper Mind Graph - Export System
=================================
Export mind graphs to various formats (JSON, Markdown, Mermaid, HTML).
"""

from typing import List, Dict, Any, Optional, Set
from pathlib import Path
import json

from .schema import (
    MindGraph, GraphNode, GraphEdge, NodeType, EdgeType
)


# ============================================================================
# JSON Export
# ============================================================================

class JSONExporter:
    """Export mind graph to JSON format."""
    
    def export(self, graph: MindGraph, indent: int = 2) -> str:
        """Export full graph to JSON."""
        return graph.to_json(indent=indent)
    
    def export_nodes_only(self, graph: MindGraph) -> str:
        """Export only nodes to JSON."""
        nodes = [n.to_dict() for n in graph.nodes.values()]
        return json.dumps({"nodes": nodes}, indent=2)
    
    def export_subgraph(
        self,
        graph: MindGraph,
        node_types: List[NodeType] = None
    ) -> str:
        """Export subgraph with specific node types."""
        if node_types is None:
            node_types = [NodeType.CONCEPT, NodeType.METHOD]
        
        nodes = [
            n.to_dict() for n in graph.nodes.values()
            if n.type in node_types
        ]
        
        node_ids = {n.id for n in graph.nodes.values() if n.type in node_types}
        edges = [
            e.to_dict() for e in graph.edges.values()
            if e.source_id in node_ids and e.target_id in node_ids
        ]
        
        return json.dumps({"nodes": nodes, "edges": edges}, indent=2)


# ============================================================================
# Markdown Export
# ============================================================================

class MarkdownExporter:
    """Export mind graph to Markdown outline."""
    
    def export(self, graph: MindGraph) -> str:
        """Export full graph to Markdown."""
        md = f"# {graph.metadata.title}\n\n"
        
        # Authors and metadata
        if graph.metadata.authors:
            md += f"**Authors:** {', '.join(graph.metadata.authors)}\n\n"
        if graph.metadata.arxiv_id:
            md += f"**arXiv:** [{graph.metadata.arxiv_id}](https://arxiv.org/abs/{graph.metadata.arxiv_id})\n\n"
        
        # Abstract
        if graph.metadata.abstract:
            md += "## Abstract\n\n"
            md += f"{graph.metadata.abstract}\n\n"
        
        # Table of Contents (Sections)
        md += "## Contents\n\n"
        for section in graph.sections:
            indent = "  " * (section.level - 1)
            md += f"{indent}- {section.title}\n"
        md += "\n"
        
        # Key Concepts
        concepts = graph.get_nodes_by_type(NodeType.CONCEPT)
        if concepts:
            md += "## Key Concepts\n\n"
            for concept in concepts:
                md += f"### {concept.title}\n\n"
                md += f"{concept.description}\n\n"
                if concept.origin_pages:
                    md += f"*Pages: {', '.join(str(p) for p in concept.origin_pages)}*\n\n"
        
        # Methods
        methods = graph.get_nodes_by_type(NodeType.METHOD)
        if methods:
            md += "## Methods\n\n"
            for method in methods:
                md += f"### {method.title}\n\n"
                md += f"{method.description}\n\n"
                if method.properties.get("key_steps"):
                    md += "**Steps:**\n"
                    for step in method.properties["key_steps"]:
                        md += f"1. {step}\n"
                    md += "\n"
        
        # Experiments
        experiments = graph.get_nodes_by_type(NodeType.EXPERIMENT)
        if experiments:
            md += "## Experiments\n\n"
            for exp in experiments:
                md += f"### {exp.title}\n\n"
                md += f"{exp.description}\n\n"
                if exp.properties.get("key_results"):
                    md += "**Results:**\n"
                    for result in exp.properties["key_results"]:
                        md += f"- {result}\n"
                    md += "\n"
        
        # Figures
        if graph.figures:
            md += "## Figures\n\n"
            for fig in graph.figures:
                md += f"- **{fig.label}** (p.{fig.page}): {fig.caption[:100]}...\n"
            md += "\n"
        
        # Tables
        if graph.tables:
            md += "## Tables\n\n"
            for table in graph.tables:
                md += f"- **{table.label}** (p.{table.page}): {table.caption[:100]}...\n"
            md += "\n"
        
        return md
    
    def export_outline(self, graph: MindGraph) -> str:
        """Export a simple outline."""
        md = f"# {graph.metadata.title}\n\n"
        
        # Sections with concepts
        for section in graph.sections:
            if section.level == 1:
                md += f"\n## {section.title}\n\n"
            else:
                indent = "  " * (section.level - 1)
                md += f"{indent}- **{section.title}**\n"
            
            # Find concepts in this section
            for edge in graph.get_edges_from(section.id):
                if edge.type == EdgeType.DEFINES:
                    target = graph.get_node(edge.target_id)
                    if target and target.type == NodeType.CONCEPT:
                        md += f"    - {target.title}: {target.description[:80]}...\n"
        
        return md


# ============================================================================
# Mermaid Export
# ============================================================================

class MermaidExporter:
    """Export mind graph to Mermaid diagram format."""
    
    def export_mindmap(self, graph: MindGraph) -> str:
        """Export as Mermaid mindmap."""
        mermaid = "mindmap\n"
        mermaid += f"  root(({self._escape(graph.metadata.title[:30])}))\n"
        
        # Add top-level sections
        for section in graph.sections:
            if section.level == 1:
                section_name = self._escape(section.title[:20])
                mermaid += f"    {section_name}\n"
                
                # Add concepts under section
                for edge in graph.get_edges_from(section.id):
                    if edge.type == EdgeType.DEFINES:
                        target = graph.get_node(edge.target_id)
                        if target and target.type == NodeType.CONCEPT:
                            concept_name = self._escape(target.title[:15])
                            mermaid += f"      {concept_name}\n"
        
        return mermaid
    
    def export_flowchart(
        self,
        graph: MindGraph,
        node_types: List[NodeType] = None,
        direction: str = "TB"
    ) -> str:
        """Export as Mermaid flowchart."""
        if node_types is None:
            node_types = [NodeType.CONCEPT, NodeType.METHOD, NodeType.EXPERIMENT]
        
        mermaid = f"flowchart {direction}\n"
        
        # Filter nodes
        nodes = [n for n in graph.nodes.values() if n.type in node_types]
        node_ids = {n.id for n in nodes}
        
        # Add nodes with styling
        for node in nodes:
            label = self._escape(node.title[:20])
            node_id = self._sanitize_id(node.id)
            
            if node.type == NodeType.METHOD:
                mermaid += f"    {node_id}[/{label}/]\n"  # Parallelogram
            elif node.type == NodeType.EXPERIMENT:
                mermaid += f"    {node_id}{{{label}}}\n"  # Diamond
            elif node.type == NodeType.CONCEPT:
                mermaid += f"    {node_id}({label})\n"  # Rounded
            else:
                mermaid += f"    {node_id}[{label}]\n"  # Rectangle
        
        # Add edges
        for edge in graph.edges.values():
            if edge.source_id in node_ids and edge.target_id in node_ids:
                source = self._sanitize_id(edge.source_id)
                target = self._sanitize_id(edge.target_id)
                
                label = edge.type.value.replace("_", " ")[:10]
                mermaid += f"    {source} -->|{label}| {target}\n"
        
        # Add styling
        mermaid += "\n    classDef concept fill:#e1f5fe\n"
        mermaid += "    classDef method fill:#fff3e0\n"
        mermaid += "    classDef experiment fill:#e8f5e9\n"
        
        # Apply classes
        concepts = [self._sanitize_id(n.id) for n in nodes if n.type == NodeType.CONCEPT]
        methods = [self._sanitize_id(n.id) for n in nodes if n.type == NodeType.METHOD]
        experiments = [self._sanitize_id(n.id) for n in nodes if n.type == NodeType.EXPERIMENT]
        
        if concepts:
            mermaid += f"    class {','.join(concepts)} concept\n"
        if methods:
            mermaid += f"    class {','.join(methods)} method\n"
        if experiments:
            mermaid += f"    class {','.join(experiments)} experiment\n"
        
        return mermaid
    
    def export_graph(self, graph: MindGraph, include_figures: bool = False) -> str:
        """Export as Mermaid graph (more comprehensive)."""
        mermaid = "graph LR\n"
        
        # Paper node
        paper_id = self._sanitize_id(graph.paper_id)
        paper_title = self._escape(graph.metadata.title[:25])
        mermaid += f"    {paper_id}[[\"{paper_title}\"]]\n"
        
        # Add sections
        for section in graph.sections:
            if section.level == 1:
                sec_id = self._sanitize_id(section.id)
                sec_title = self._escape(section.title[:20])
                mermaid += f"    {sec_id}(\"{sec_title}\")\n"
                mermaid += f"    {paper_id} --> {sec_id}\n"
        
        # Add concepts
        for node in graph.get_nodes_by_type(NodeType.CONCEPT):
            node_id = self._sanitize_id(node.id)
            node_title = self._escape(node.title[:15])
            mermaid += f"    {node_id}((\"{node_title}\"))\n"
        
        # Add edges between concepts
        for edge in graph.edges.values():
            source = graph.get_node(edge.source_id)
            target = graph.get_node(edge.target_id)
            
            if source and target:
                if source.type == NodeType.CONCEPT or target.type == NodeType.CONCEPT:
                    src_id = self._sanitize_id(edge.source_id)
                    tgt_id = self._sanitize_id(edge.target_id)
                    mermaid += f"    {src_id} -.-> {tgt_id}\n"
        
        if include_figures:
            for fig in graph.figures:
                fig_id = self._sanitize_id(fig.id)
                mermaid += f"    {fig_id}[\"{fig.label}\"]\n"
        
        return mermaid
    
    def _escape(self, text: str) -> str:
        """Escape text for Mermaid."""
        return text.replace('"', "'").replace("\n", " ").replace("(", "[").replace(")", "]")
    
    def _sanitize_id(self, id: str) -> str:
        """Sanitize ID for Mermaid (no special chars)."""
        return id.replace("-", "_").replace(".", "_").replace(" ", "_")


# ============================================================================
# HTML Export
# ============================================================================

class HTMLExporter:
    """Export mind graph to interactive HTML."""
    
    def export(self, graph: MindGraph) -> str:
        """Export to interactive HTML with D3.js visualization."""
        
        # Prepare data for D3
        nodes_data = []
        for node in graph.nodes.values():
            nodes_data.append({
                "id": node.id,
                "label": node.title[:30],
                "type": node.type.value,
                "description": node.description[:200]
            })
        
        edges_data = []
        for edge in graph.edges.values():
            edges_data.append({
                "source": edge.source_id,
                "target": edge.target_id,
                "type": edge.type.value
            })
        
        html = f"""<!DOCTYPE html>
<html>
<head>
    <title>{graph.metadata.title}</title>
    <script src="https://d3js.org/d3.v7.min.js"></script>
    <style>
        body {{ font-family: Arial, sans-serif; margin: 0; padding: 20px; }}
        #graph {{ width: 100%; height: 600px; border: 1px solid #ccc; }}
        .node {{ cursor: pointer; }}
        .node circle {{ stroke: #fff; stroke-width: 2px; }}
        .node text {{ font-size: 10px; }}
        .link {{ stroke: #999; stroke-opacity: 0.6; }}
        #info {{ padding: 10px; background: #f5f5f5; margin-top: 10px; }}
        .node-concept circle {{ fill: #4CAF50; }}
        .node-method circle {{ fill: #2196F3; }}
        .node-experiment circle {{ fill: #FF9800; }}
        .node-section circle {{ fill: #9C27B0; }}
        .node-figure circle {{ fill: #E91E63; }}
        .node-table circle {{ fill: #00BCD4; }}
        .node-paper circle {{ fill: #F44336; }}
    </style>
</head>
<body>
    <h1>{graph.metadata.title}</h1>
    <div id="graph"></div>
    <div id="info">Click a node to see details</div>
    
    <script>
        const nodes = {json.dumps(nodes_data)};
        const links = {json.dumps(edges_data)};
        
        const width = document.getElementById('graph').clientWidth;
        const height = 600;
        
        const svg = d3.select('#graph')
            .append('svg')
            .attr('width', width)
            .attr('height', height);
        
        const simulation = d3.forceSimulation(nodes)
            .force('link', d3.forceLink(links).id(d => d.id).distance(100))
            .force('charge', d3.forceManyBody().strength(-200))
            .force('center', d3.forceCenter(width / 2, height / 2));
        
        const link = svg.append('g')
            .selectAll('line')
            .data(links)
            .join('line')
            .attr('class', 'link');
        
        const node = svg.append('g')
            .selectAll('g')
            .data(nodes)
            .join('g')
            .attr('class', d => 'node node-' + d.type)
            .call(d3.drag()
                .on('start', dragstarted)
                .on('drag', dragged)
                .on('end', dragended));
        
        node.append('circle')
            .attr('r', d => d.type === 'paper' ? 15 : 8);
        
        node.append('text')
            .attr('dx', 12)
            .attr('dy', 4)
            .text(d => d.label);
        
        node.on('click', (event, d) => {{
            document.getElementById('info').innerHTML = 
                '<strong>' + d.label + '</strong> (' + d.type + ')<br>' +
                d.description;
        }});
        
        simulation.on('tick', () => {{
            link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);
            
            node.attr('transform', d => 'translate(' + d.x + ',' + d.y + ')');
        }});
        
        function dragstarted(event) {{
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }}
        
        function dragged(event) {{
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }}
        
        function dragended(event) {{
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }}
    </script>
</body>
</html>"""
        
        return html


# ============================================================================
# Unified Exporter
# ============================================================================

class GraphExporter:
    """
    Unified exporter supporting multiple formats.
    """
    
    def __init__(self, graph: MindGraph):
        self.graph = graph
        self.json_exporter = JSONExporter()
        self.md_exporter = MarkdownExporter()
        self.mermaid_exporter = MermaidExporter()
        self.html_exporter = HTMLExporter()
    
    def export(
        self,
        format: str,
        output_path: str = None,
        **kwargs
    ) -> str:
        """
        Export graph to specified format.
        
        Args:
            format: "json", "markdown", "mermaid", "mermaid-mindmap", "mermaid-flowchart", "html"
            output_path: Optional path to save output
            **kwargs: Format-specific options
            
        Returns:
            Exported content as string
        """
        if format == "json":
            content = self.json_exporter.export(self.graph, **kwargs)
        elif format == "markdown":
            content = self.md_exporter.export(self.graph)
        elif format == "markdown-outline":
            content = self.md_exporter.export_outline(self.graph)
        elif format == "mermaid":
            content = self.mermaid_exporter.export_graph(self.graph, **kwargs)
        elif format == "mermaid-mindmap":
            content = self.mermaid_exporter.export_mindmap(self.graph)
        elif format == "mermaid-flowchart":
            content = self.mermaid_exporter.export_flowchart(self.graph, **kwargs)
        elif format == "html":
            content = self.html_exporter.export(self.graph)
        else:
            raise ValueError(f"Unknown format: {format}")
        
        if output_path:
            Path(output_path).write_text(content)
        
        return content
    
    def export_all(self, output_dir: str):
        """Export to all formats."""
        output_path = Path(output_dir)
        output_path.mkdir(parents=True, exist_ok=True)
        
        paper_id = self.graph.paper_id.replace("/", "_")
        
        # JSON
        (output_path / f"{paper_id}.json").write_text(
            self.export("json")
        )
        
        # Markdown
        (output_path / f"{paper_id}.md").write_text(
            self.export("markdown")
        )
        
        # Mermaid
        (output_path / f"{paper_id}_mindmap.mermaid").write_text(
            self.export("mermaid-mindmap")
        )
        (output_path / f"{paper_id}_flowchart.mermaid").write_text(
            self.export("mermaid-flowchart")
        )
        
        # HTML
        (output_path / f"{paper_id}.html").write_text(
            self.export("html")
        )
        
        print(f"Exported to {output_dir}/")


# ============================================================================
# Convenience Functions
# ============================================================================

def export_to_json(graph: MindGraph) -> str:
    """Export graph to JSON."""
    return JSONExporter().export(graph)


def export_to_markdown(graph: MindGraph) -> str:
    """Export graph to Markdown."""
    return MarkdownExporter().export(graph)


def export_to_mermaid(graph: MindGraph, style: str = "flowchart") -> str:
    """Export graph to Mermaid."""
    exporter = MermaidExporter()
    if style == "mindmap":
        return exporter.export_mindmap(graph)
    elif style == "flowchart":
        return exporter.export_flowchart(graph)
    else:
        return exporter.export_graph(graph)


def export_to_html(graph: MindGraph) -> str:
    """Export graph to interactive HTML."""
    return HTMLExporter().export(graph)

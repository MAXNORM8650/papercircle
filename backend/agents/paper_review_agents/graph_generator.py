"""
Graph Generator for Paper Review Analysis
==========================================
Converts paper review analysis into nodes/edges format for visualization.

Similar to Paper Mind Graph but focused on review-specific concepts:
- Contributions
- Methodologies
- Findings
- Limitations
- Baselines
- Artifacts
- Metrics
"""

from typing import Dict, Any, List, Optional
import json
import re
import uuid


# ============================================================================
# Node and Edge Types
# ============================================================================

NODE_TYPES = {
    "contribution": "Claimed contribution",
    "methodology": "Method or architecture used",
    "finding": "Key finding or result",
    "limitation": "Identified limitation",
    "baseline": "Baseline method for comparison",
    "artifact": "Released code/data/model",
    "metric": "Evaluation metric",
    "dataset": "Dataset used",
    "comparison": "Comparison with prior work"
}

EDGE_TYPES = {
    "uses": "Uses this method/dataset/metric",
    "improves_upon": "Improves upon this baseline",
    "evaluates_with": "Evaluates using this metric",
    "identifies": "Identifies this finding/limitation",
    "releases": "Releases this artifact",
    "compared_to": "Compared to this baseline",
    "tested_on": "Tested on this dataset"
}


# ============================================================================
# Graph Generator Class
# ============================================================================

class GraphGenerator:
    """
    Generates graph representation from paper review analysis.

    Example:
        generator = GraphGenerator()
        graph = generator.generate_graph(review_analysis)
        print(f"Created {len(graph['nodes'])} nodes and {len(graph['edges'])} edges")
    """

    def __init__(self, verbose: bool = False):
        """
        Initialize graph generator.

        Args:
            verbose: Print debug information
        """
        self.verbose = verbose

    def generate_graph(
        self,
        review_analysis: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Generate complete graph from review analysis.

        Args:
            review_analysis: Complete review analysis from orchestrator

        Returns:
            Dictionary with:
                - nodes: Dict[node_id, node_data]
                - edges: Dict[edge_id, edge_data]
                - stats: Summary statistics
        """
        graph = {
            "nodes": {},
            "edges": {},
            "stats": {
                "total_nodes": 0,
                "total_edges": 0,
                "nodes_by_type": {},
                "edges_by_type": {}
            }
        }

        # Extract nodes and edges from different analysis stages
        self._extract_contribution_nodes(review_analysis, graph)
        self._extract_methodology_nodes(review_analysis, graph)
        self._extract_finding_nodes(review_analysis, graph)
        self._extract_metric_nodes(review_analysis, graph)
        self._extract_baseline_nodes(review_analysis, graph)
        self._extract_artifact_nodes(review_analysis, graph)

        # Create edges between nodes
        self._create_edges(review_analysis, graph)

        # Update statistics
        graph["stats"]["total_nodes"] = len(graph["nodes"])
        graph["stats"]["total_edges"] = len(graph["edges"])

        for node in graph["nodes"].values():
            node_type = node["type"]
            graph["stats"]["nodes_by_type"][node_type] = graph["stats"]["nodes_by_type"].get(node_type, 0) + 1

        for edge in graph["edges"].values():
            edge_type = edge["relationship"]
            graph["stats"]["edges_by_type"][edge_type] = graph["stats"]["edges_by_type"].get(edge_type, 0) + 1

        if self.verbose:
            print(f"✅ Generated graph: {graph['stats']['total_nodes']} nodes, {graph['stats']['total_edges']} edges")

        return graph

    # ========================================================================
    # Node Extraction Methods
    # ========================================================================

    def _extract_contribution_nodes(
        self,
        review_analysis: Dict[str, Any],
        graph: Dict[str, Any]
    ):
        """Extract contribution nodes from analysis."""
        contribution_data = review_analysis.get("stages", {}).get("contribution_analyzer", {})
        contribution_text = contribution_data.get("result", "")

        if not contribution_text:
            return

        # Try to parse as JSON first
        try:
            contrib_json = json.loads(contribution_text)
            contributions = contrib_json.get("contributions", [])

            for i, contrib in enumerate(contributions):
                if isinstance(contrib, str):
                    title = contrib[:100]
                    description = contrib
                elif isinstance(contrib, dict):
                    title = contrib.get("title", contrib.get("claim", ""))[:100]
                    description = contrib.get("description", contrib.get("claim", ""))
                else:
                    continue

                node_id = f"contrib_{i+1}"
                graph["nodes"][node_id] = {
                    "id": node_id,
                    "type": "contribution",
                    "title": title,
                    "description": description,
                    "origin": "contribution_analyzer"
                }

        except json.JSONDecodeError:
            # If not JSON, parse as text
            # Look for bullet points or numbered lists
            lines = contribution_text.split('\n')
            contrib_count = 0

            for line in lines:
                line = line.strip()

                # Match patterns like "1.", "•", "-", "*"
                if re.match(r'^[\d\-\*\•]+[\.\)]\s*', line):
                    title = line[:100]
                    description = line

                    node_id = f"contrib_{contrib_count+1}"
                    graph["nodes"][node_id] = {
                        "id": node_id,
                        "type": "contribution",
                        "title": title,
                        "description": description,
                        "origin": "contribution_analyzer"
                    }
                    contrib_count += 1

    def _extract_methodology_nodes(
        self,
        review_analysis: Dict[str, Any],
        graph: Dict[str, Any]
    ):
        """Extract methodology nodes from analysis."""
        # Get methodology from deep analysis
        deep_analysis = review_analysis.get("stages", {}).get("deep_analyzer", {}).get("result", "")

        # Common methodology patterns
        methodologies = {
            'transformer': 'Transformer',
            'attention': 'Attention Mechanism',
            'lstm': 'LSTM',
            'gru': 'GRU',
            'cnn': 'Convolutional Neural Network',
            'resnet': 'ResNet',
            'bert': 'BERT',
            'gpt': 'GPT',
            'vit': 'Vision Transformer',
            'gan': 'Generative Adversarial Network',
            'vae': 'Variational Autoencoder',
            'diffusion': 'Diffusion Model',
            'reinforcement learning': 'Reinforcement Learning',
            'supervised learning': 'Supervised Learning',
            'self-supervised': 'Self-Supervised Learning',
            'few-shot': 'Few-Shot Learning',
            'zero-shot': 'Zero-Shot Learning',
            'meta-learning': 'Meta-Learning',
            'transfer learning': 'Transfer Learning'
        }

        deep_analysis_lower = deep_analysis.lower()
        method_count = 0

        for keyword, method_name in methodologies.items():
            if keyword in deep_analysis_lower:
                node_id = f"method_{method_count+1}"
                graph["nodes"][node_id] = {
                    "id": node_id,
                    "type": "methodology",
                    "title": method_name,
                    "description": f"Uses {method_name} methodology",
                    "origin": "deep_analyzer"
                }
                method_count += 1

    def _extract_finding_nodes(
        self,
        review_analysis: Dict[str, Any],
        graph: Dict[str, Any]
    ):
        """Extract key findings and limitations."""
        # Get critic review
        critic_data = review_analysis.get("stages", {}).get("critic", {})
        critic_result = critic_data.get("result", "")

        # Try to parse as JSON
        try:
            critic_json = json.loads(critic_result)

            # Extract strengths as findings
            strengths = critic_json.get("strengths", [])
            for i, strength in enumerate(strengths):
                node_id = f"finding_{i+1}"
                graph["nodes"][node_id] = {
                    "id": node_id,
                    "type": "finding",
                    "title": strength[:100] if isinstance(strength, str) else str(strength)[:100],
                    "description": strength if isinstance(strength, str) else str(strength),
                    "origin": "critic_strengths"
                }

            # Extract weaknesses as limitations
            weaknesses = critic_json.get("weaknesses", [])
            for i, weakness in enumerate(weaknesses):
                node_id = f"limit_{i+1}"
                graph["nodes"][node_id] = {
                    "id": node_id,
                    "type": "limitation",
                    "title": weakness[:100] if isinstance(weakness, str) else str(weakness)[:100],
                    "description": weakness if isinstance(weakness, str) else str(weakness),
                    "origin": "critic_weaknesses"
                }

        except json.JSONDecodeError:
            pass

    def _extract_metric_nodes(
        self,
        review_analysis: Dict[str, Any],
        graph: Dict[str, Any]
    ):
        """Extract evaluation metrics."""
        deep_analysis = review_analysis.get("stages", {}).get("deep_analyzer", {}).get("result", "")

        # Common ML metrics
        metrics = {
            'accuracy': 'Accuracy',
            'precision': 'Precision',
            'recall': 'Recall',
            'f1 score': 'F1 Score',
            'bleu': 'BLEU',
            'rouge': 'ROUGE',
            'perplexity': 'Perplexity',
            'auc': 'AUC',
            'map': 'Mean Average Precision',
            'iou': 'Intersection over Union',
            'inception score': 'Inception Score',
            'fid': 'Fréchet Inception Distance'
        }

        deep_analysis_lower = deep_analysis.lower()
        metric_count = 0

        for keyword, metric_name in metrics.items():
            if keyword in deep_analysis_lower:
                node_id = f"metric_{metric_count+1}"
                graph["nodes"][node_id] = {
                    "id": node_id,
                    "type": "metric",
                    "title": metric_name,
                    "description": f"Evaluated using {metric_name}",
                    "origin": "deep_analyzer"
                }
                metric_count += 1

    def _extract_baseline_nodes(
        self,
        review_analysis: Dict[str, Any],
        graph: Dict[str, Any]
    ):
        """Extract baseline comparisons."""
        contribution_data = review_analysis.get("stages", {}).get("contribution_analyzer", {})
        contribution_text = contribution_data.get("result", "")

        # Look for comparison keywords
        comparison_keywords = ['compared to', 'outperforms', 'better than', 'baseline', 'prior work']

        baseline_count = 0
        for keyword in comparison_keywords:
            # Find sentences containing comparison keywords
            sentences = re.split(r'[.!?]\s+', contribution_text)

            for sentence in sentences:
                if keyword in sentence.lower():
                    # This is a comparison
                    node_id = f"baseline_{baseline_count+1}"
                    graph["nodes"][node_id] = {
                        "id": node_id,
                        "type": "baseline",
                        "title": f"Comparison: {sentence[:80]}",
                        "description": sentence,
                        "origin": "contribution_analyzer"
                    }
                    baseline_count += 1
                    break  # One per keyword

    def _extract_artifact_nodes(
        self,
        review_analysis: Dict[str, Any],
        graph: Dict[str, Any]
    ):
        """Extract released artifacts (code/data/models)."""
        repro_data = review_analysis.get("stages", {}).get("reproducibility_checker", {})
        repro_result = repro_data.get("result", "")

        # Try to parse as JSON
        try:
            repro_json = json.loads(repro_result) if isinstance(repro_result, str) else repro_result

            artifacts = []

            # Check for code availability
            if repro_json.get("code_available"):
                artifacts.append({
                    "title": "Code Repository",
                    "description": "Source code released",
                    "artifact_type": "code"
                })

            # Check for dataset
            dataset_info = repro_json.get("dataset_accessible")
            if dataset_info:
                artifacts.append({
                    "title": "Dataset",
                    "description": "Dataset provided",
                    "artifact_type": "dataset"
                })

            # Check for pretrained models
            if "model" in repro_result.lower() and "pretrained" in repro_result.lower():
                artifacts.append({
                    "title": "Pretrained Model",
                    "description": "Pretrained model released",
                    "artifact_type": "model"
                })

            # Create nodes
            for i, artifact in enumerate(artifacts):
                node_id = f"artifact_{i+1}"
                graph["nodes"][node_id] = {
                    "id": node_id,
                    "type": "artifact",
                    "title": artifact["title"],
                    "description": artifact["description"],
                    "origin": "reproducibility_checker",
                    "artifact_type": artifact.get("artifact_type")
                }

        except (json.JSONDecodeError, TypeError):
            pass

    # ========================================================================
    # Edge Creation
    # ========================================================================

    def _create_edges(
        self,
        review_analysis: Dict[str, Any],
        graph: Dict[str, Any]
    ):
        """Create edges between nodes based on relationships."""

        # Connect contributions to methodologies
        contrib_nodes = [nid for nid, n in graph["nodes"].items() if n["type"] == "contribution"]
        method_nodes = [nid for nid, n in graph["nodes"].items() if n["type"] == "methodology"]

        for contrib_id in contrib_nodes:
            for method_id in method_nodes:
                # Check if contribution mentions the methodology
                contrib_desc = graph["nodes"][contrib_id]["description"].lower()
                method_title = graph["nodes"][method_id]["title"].lower()

                if method_title in contrib_desc or any(word in contrib_desc for word in method_title.split()):
                    edge_id = f"edge_{len(graph['edges'])+1}"
                    graph["edges"][edge_id] = {
                        "id": edge_id,
                        "source": contrib_id,
                        "target": method_id,
                        "relationship": "uses"
                    }

        # Connect contributions to metrics
        metric_nodes = [nid for nid, n in graph["nodes"].items() if n["type"] == "metric"]

        for contrib_id in contrib_nodes:
            for metric_id in metric_nodes:
                contrib_desc = graph["nodes"][contrib_id]["description"].lower()
                metric_title = graph["nodes"][metric_id]["title"].lower()

                if metric_title in contrib_desc:
                    edge_id = f"edge_{len(graph['edges'])+1}"
                    graph["edges"][edge_id] = {
                        "id": edge_id,
                        "source": contrib_id,
                        "target": metric_id,
                        "relationship": "evaluates_with"
                    }

        # Connect contributions to baselines
        baseline_nodes = [nid for nid, n in graph["nodes"].items() if n["type"] == "baseline"]

        for contrib_id in contrib_nodes:
            for baseline_id in baseline_nodes:
                edge_id = f"edge_{len(graph['edges'])+1}"
                graph["edges"][edge_id] = {
                    "id": edge_id,
                    "source": contrib_id,
                    "target": baseline_id,
                    "relationship": "compared_to"
                }

        # Connect contributions to findings
        finding_nodes = [nid for nid, n in graph["nodes"].items() if n["type"] == "finding"]

        for contrib_id in contrib_nodes:
            for finding_id in finding_nodes:
                edge_id = f"edge_{len(graph['edges'])+1}"
                graph["edges"][edge_id] = {
                    "id": edge_id,
                    "source": contrib_id,
                    "target": finding_id,
                    "relationship": "identifies"
                }

        # Connect methodologies to artifacts
        artifact_nodes = [nid for nid, n in graph["nodes"].items() if n["type"] == "artifact"]

        for method_id in method_nodes:
            for artifact_id in artifact_nodes:
                if graph["nodes"][artifact_id].get("artifact_type") == "code":
                    edge_id = f"edge_{len(graph['edges'])+1}"
                    graph["edges"][edge_id] = {
                        "id": edge_id,
                        "source": method_id,
                        "target": artifact_id,
                        "relationship": "releases"
                    }


# ============================================================================
# Convenience Functions
# ============================================================================

def generate_review_graph(review_analysis: Dict[str, Any]) -> Dict[str, Any]:
    """
    Convenience function to generate graph from review analysis.

    Args:
        review_analysis: Complete review analysis data

    Returns:
        Graph dictionary with nodes and edges
    """
    generator = GraphGenerator(verbose=False)
    return generator.generate_graph(review_analysis)


def export_graph_for_frontend(graph: Dict[str, Any]) -> Dict[str, Any]:
    """
    Export graph in format expected by frontend InteractiveGraph component.

    Args:
        graph: Graph from generate_graph()

    Returns:
        Frontend-compatible graph format
    """
    return {
        "nodes": graph["nodes"],
        "edges": graph["edges"],
        "stats": graph["stats"]
    }


def generate_mermaid_mindmap(graph: Dict[str, Any]) -> str:
    """
    Generate Mermaid mindmap syntax from graph.

    Args:
        graph: Graph from generate_graph()

    Returns:
        Mermaid mindmap code
    """
    lines = ["mindmap"]
    lines.append("  root((Paper))")

    # Group nodes by type
    nodes_by_type = {}
    for node in graph["nodes"].values():
        node_type = node["type"]
        if node_type not in nodes_by_type:
            nodes_by_type[node_type] = []
        nodes_by_type[node_type].append(node)

    # Add nodes by type
    for node_type, nodes in nodes_by_type.items():
        lines.append(f"    {node_type.capitalize()}")

        for node in nodes[:5]:  # Limit to 5 per type
            title = node["title"].replace('"', "'")[:50]
            lines.append(f"      {title}")

    return "\n".join(lines)

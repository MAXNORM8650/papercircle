"""
Paper Mind Graph - Graph Construction Agents
=============================================
Multi-agent system for automatically building the mind graph from paper content.
"""

from smolagents import LiteLLMModel, CodeAgent, ToolCallingAgent, tool
from typing import List, Dict, Any, Optional
import json
import re

from .schema import (
    MindGraph, GraphNode, GraphEdge, NodeType, EdgeType,
    VerificationStatus, Chunk, generate_id, create_node, create_edge
)


# ============================================================================
# Configuration
# ============================================================================

DEFAULT_CONFIG = {
    "api_base": "http://10.127.30.115:11434",
    "model_id": "ollama_chat/qwen3-coder:30b",
    "api_key": None,
    "num_ctx": 8192
}


# ============================================================================
# Extraction Tools
# ============================================================================

@tool
def extract_concepts_from_chunk(chunk_text: str, section_title: str = "") -> str:
    """
    Placeholder for concept extraction - will be called by LLM agent.
    Returns JSON with extracted concepts.
    
    Args:
        chunk_text: The text chunk to analyze
        section_title: Title of the section this chunk is from
        
    Returns:
        JSON string with extracted concepts
    """
    # This is a tool definition - actual extraction done by LLM
    return json.dumps({"concepts": [], "note": "Use LLM to extract"})


@tool
def extract_methods_from_chunk(chunk_text: str) -> str:
    """
    Placeholder for method extraction.
    
    Args:
        chunk_text: The text chunk to analyze
        
    Returns:
        JSON string with extracted methods
    """
    return json.dumps({"methods": []})


@tool
def link_figure_to_concepts(figure_caption: str, nearby_text: str, existing_concepts: str) -> str:
    """
    Placeholder for linking figures to concepts.
    
    Args:
        figure_caption: The figure's caption
        nearby_text: Text around the figure
        existing_concepts: JSON list of existing concept names
        
    Returns:
        JSON with figure linkages
    """
    return json.dumps({"links": []})


# ============================================================================
# Specialized Extraction Agents
# ============================================================================

class ConceptExtractor:
    """Extracts key concepts from paper text using a single LLM call per section."""

    def __init__(self, model: LiteLLMModel):
        self.agent = ToolCallingAgent(
            tools=[],
            model=model,
            name="concept_extractor",
            max_steps=2,
            instructions="""You extract key concepts from research paper text.
Return ONLY a JSON object with a "concepts" array. Each concept: name, description, type (definition/technique/theory/phenomenon/other), importance (core/supporting/background).
Be selective — only meaningful concepts, not every noun. Max 8 concepts per section."""
        )

    def extract(self, chunk: Chunk, section_title: str = "") -> List[Dict]:
        """Extract concepts from a chunk."""
        prompt = f"""Extract key concepts from this section.

Section: {section_title}
Text: {chunk.text[:2000]}

Return JSON: {{"concepts": [{{"name":"...","description":"...","type":"...","importance":"..."}}]}}"""

        try:
            result = self.agent.run(prompt)
            json_match = re.search(r'\{[\s\S]*\}', str(result))
            if json_match:
                data = json.loads(json_match.group())
                return data.get("concepts", [])
        except Exception as e:
            print(f"Concept extraction error: {e}")
        return []

    def extract_batch(self, chunks: List[Chunk], section_title: str = "") -> List[Dict]:
        """Extract concepts from multiple chunks in a single LLM call."""
        combined_text = "\n\n".join(c.text[:1500] for c in chunks[:3])
        prompt = f"""Extract key concepts from this paper section.

Section: {section_title}
Text: {combined_text[:4000]}

Return JSON: {{"concepts": [{{"name":"...","description":"...","type":"...","importance":"..."}}]}}
Max 8 concepts. Only return JSON."""

        try:
            result = self.agent.run(prompt)
            json_match = re.search(r'\{[\s\S]*\}', str(result))
            if json_match:
                data = json.loads(json_match.group())
                return data.get("concepts", [])
        except Exception as e:
            print(f"Batch concept extraction error: {e}")
        return []


class MethodExtractor:
    """Extracts methods and algorithms using a single LLM call."""

    def __init__(self, model: LiteLLMModel):
        self.agent = ToolCallingAgent(
            tools=[],
            model=model,
            name="method_extractor",
            max_steps=2,
            instructions="""You extract methods, algorithms, and techniques from research papers.
Return ONLY JSON: {"methods": [{"name":"...","description":"...","category":"proposed|baseline|component","key_steps":["..."]}]}
Focus on concrete, implementable methods. Max 6 methods."""
        )

    def extract(self, chunk: Chunk, section_title: str = "") -> List[Dict]:
        """Extract methods from a chunk."""
        prompt = f"""Identify methods/algorithms/techniques in this text:
Section: {section_title}
Text: {chunk.text[:2000]}
Return JSON: {{"methods": [{{"name":"...","description":"...","category":"...","key_steps":["..."]}}]}}"""

        try:
            result = self.agent.run(prompt)
            json_match = re.search(r'\{[\s\S]*\}', str(result))
            if json_match:
                data = json.loads(json_match.group())
                return data.get("methods", [])
        except Exception as e:
            print(f"Method extraction error: {e}")
        return []


class ExperimentExtractor:
    """Extracts experimental details using a single LLM call."""

    def __init__(self, model: LiteLLMModel):
        self.agent = ToolCallingAgent(
            tools=[],
            model=model,
            name="experiment_extractor",
            max_steps=2,
            instructions="""You extract experimental details from research papers.

For each text about experiments, identify:
- Experimental setups
- Datasets used
- Evaluation metrics
- Key results

Output JSON format:
{
  "experiments": [
    {
      "name": "ImageNet Classification",
      "setup": "Trained on ImageNet-1K with standard augmentation",
      "datasets": ["ImageNet-1K"],
      "metrics": ["Top-1 accuracy", "Top-5 accuracy"],
      "key_results": ["Achieves 87.5% top-1 accuracy"]
    }
  ],
  "datasets": [
    {
      "name": "ImageNet-1K",
      "description": "1000-class image classification benchmark"
    }
  ]
}"""
        )
    
    def extract(self, chunk: Chunk) -> Dict:
        """Extract experimental details from a chunk."""
        prompt = f"""Extract experimental details from this text:
{chunk.text[:2000]}
Return JSON: {{"experiments": [{{"name":"...","setup":"...","datasets":["..."],"metrics":["..."],"key_results":["..."]}}], "datasets": [{{"name":"...","description":"..."}}]}}"""

        try:
            result = self.agent.run(prompt)
            json_match = re.search(r'\{[\s\S]*\}', str(result))
            if json_match:
                return json.loads(json_match.group())
        except Exception as e:
            print(f"Experiment extraction error: {e}")
        return {"experiments": [], "datasets": []}


class LinkageAgent:
    """Links figures/tables to concepts using simple heuristics (no LLM needed)."""

    def __init__(self, model: LiteLLMModel):
        # No LLM agent needed — use string matching for figure/table linking
        pass

    def link_figure(
        self,
        figure_caption: str,
        nearby_text: str,
        existing_nodes: List[str]
    ) -> List[Dict]:
        """Find what concepts/methods a figure relates to using keyword matching."""
        linkages = []
        text = (figure_caption + " " + nearby_text).lower()

        for node_name in existing_nodes:
            # Check if node name appears in caption or nearby text
            if node_name.lower() in text:
                linkages.append({
                    "target": node_name,
                    "relationship": "illustrates",
                    "reason": f"Figure caption references {node_name}"
                })

        return linkages[:5]  # Limit to 5 linkages


# ============================================================================
# Main Graph Builder
# ============================================================================

class GraphBuilder:
    """
    Orchestrates multiple agents to build the mind graph from paper structure.
    """
    
    def __init__(self, config: Dict = None):
        self.config = config or DEFAULT_CONFIG

        # Build model kwargs - num_ctx is Ollama-specific
        model_kwargs = {
            "model_id": self.config["model_id"],
            "api_base": self.config["api_base"],
            "api_key": self.config.get("api_key"),
            "drop_params": True,  # Drop unsupported params for OpenRouter/other providers
        }
        # Only add num_ctx for Ollama models
        if "ollama" in self.config["model_id"].lower():
            model_kwargs["num_ctx"] = self.config.get("num_ctx", 8192)

        # Initialize model
        self.model = LiteLLMModel(**model_kwargs)
        
        # Initialize specialized extractors
        self.concept_extractor = ConceptExtractor(self.model)
        self.method_extractor = MethodExtractor(self.model)
        self.experiment_extractor = ExperimentExtractor(self.model)
        self.linkage_agent = LinkageAgent(self.model)
    
    def build_graph(self, graph: MindGraph, verbose: bool = True) -> MindGraph:
        """
        Build the complete mind graph from paper structure.
        
        Args:
            graph: MindGraph with parsed structure (from ingestion)
            verbose: Print progress
            
        Returns:
            Updated MindGraph with concept nodes and edges
        """
        if verbose:
            print("\n" + "="*60)
            print("Building Mind Graph")
            print("="*60)
        
        # Phase 1: Extract concepts from chunks
        if verbose:
            print("\n📚 Phase 1: Extracting concepts...")
        concepts_found = self._extract_concepts(graph, verbose)
        
        # Phase 2: Extract methods
        if verbose:
            print("\n🔧 Phase 2: Extracting methods...")
        methods_found = self._extract_methods(graph, verbose)
        
        # Phase 3: Extract experiments and datasets
        if verbose:
            print("\n🧪 Phase 3: Extracting experiments...")
        self._extract_experiments(graph, verbose)
        
        # Phase 4: Link figures and tables
        if verbose:
            print("\n🔗 Phase 4: Linking figures and tables...")
        self._link_visuals(graph, concepts_found + methods_found, verbose)
        
        # Phase 5: Find inter-concept relationships
        if verbose:
            print("\n🕸️ Phase 5: Finding relationships...")
        self._find_relationships(graph, verbose)
        
        if verbose:
            print("\n✅ Graph construction complete!")
            print(f"   Nodes: {len(graph.nodes)}")
            print(f"   Edges: {len(graph.edges)}")
        
        return graph
    
    def _extract_concepts(self, graph: MindGraph, verbose: bool) -> List[str]:
        """Extract concept nodes from chunks."""
        concepts_found = []
        
        # Group chunks by section
        section_chunks = {}
        for chunk in graph.chunks:
            if chunk.source_type == "body":
                sid = chunk.section_id or "unknown"
                if sid not in section_chunks:
                    section_chunks[sid] = []
                section_chunks[sid].append(chunk)
        
        # Process each section — batch chunks for fewer LLM calls
        for section_id, chunks in section_chunks.items():
            # Get section title
            section_title = ""
            for section in graph.sections:
                if section.id == section_id:
                    section_title = section.title
                    break

            if verbose:
                print(f"   Processing: {section_title or section_id} ({len(chunks)} chunks)")

            # Batch: extract concepts from first 3 chunks in ONE LLM call
            batch_chunks = chunks[:3]
            concepts_list = self.concept_extractor.extract_batch(batch_chunks, section_title)

            # Use first chunk for node metadata
            chunk = batch_chunks[0] if batch_chunks else None
            if not chunk:
                continue

            for concept in concepts_list:
                
                for concept in concepts:
                    # Create concept node
                    node = create_node(
                        node_type=NodeType.CONCEPT,
                        title=concept["name"],
                        description=concept.get("description", ""),
                        source_chunks=[chunk.id],
                        origin_pages=list(range(chunk.page_span[0], chunk.page_span[1] + 1))
                    )
                    node.properties["concept_type"] = concept.get("type", "other")
                    node.properties["importance"] = concept.get("importance", "supporting")
                    
                    graph.add_node(node)
                    concepts_found.append(concept["name"])
                    
                    # Link to section
                    if section_id in graph.nodes:
                        edge = create_edge(
                            EdgeType.DEFINES,
                            section_id,
                            node.id,
                            reason=f"Section defines {concept['name']}",
                            source_chunks=[chunk.id]
                        )
                        graph.add_edge(edge)
        
        return concepts_found
    
    def _extract_methods(self, graph: MindGraph, verbose: bool) -> List[str]:
        """Extract method nodes from chunks."""
        methods_found = []
        
        # Find method-related sections
        method_sections = []
        for section in graph.sections:
            if any(kw in section.title.lower() for kw in 
                   ["method", "approach", "model", "architecture", "algorithm", "framework"]):
                method_sections.append(section.id)
        
        # Process method section chunks (limit to 3 total to reduce LLM calls)
        method_chunks_processed = 0
        for chunk in graph.chunks:
            if chunk.section_id in method_sections and chunk.source_type == "body" and method_chunks_processed < 3:
                method_chunks_processed += 1
                if verbose:
                    print(f"   Processing method chunk: {chunk.id}")

                methods = self.method_extractor.extract(chunk, "")
                
                for method in methods:
                    node = create_node(
                        node_type=NodeType.METHOD,
                        title=method["name"],
                        description=method.get("description", ""),
                        source_chunks=[chunk.id],
                        origin_pages=list(range(chunk.page_span[0], chunk.page_span[1] + 1))
                    )
                    node.properties["category"] = method.get("category", "component")
                    node.properties["key_steps"] = method.get("key_steps", [])
                    
                    graph.add_node(node)
                    methods_found.append(method["name"])
                    
                    # If proposed method, link from paper
                    if method.get("category") == "proposed":
                        edge = create_edge(
                            EdgeType.PROPOSES,
                            graph.paper_id,
                            node.id,
                            reason="Paper proposes this method"
                        )
                        graph.add_edge(edge)
        
        return methods_found
    
    def _extract_experiments(self, graph: MindGraph, verbose: bool):
        """Extract experiment and dataset nodes."""
        # Find experiment-related sections
        exp_sections = []
        for section in graph.sections:
            if any(kw in section.title.lower() for kw in 
                   ["experiment", "evaluation", "result", "ablation", "analysis"]):
                exp_sections.append(section.id)
        
        # Process experiment chunks (limit to 3 total to reduce LLM calls)
        exp_chunks_processed = 0
        for chunk in graph.chunks:
            if chunk.section_id in exp_sections and chunk.source_type == "body" and exp_chunks_processed < 3:
                exp_chunks_processed += 1
                if verbose:
                    print(f"   Processing experiment chunk: {chunk.id}")
                
                data = self.experiment_extractor.extract(chunk)
                
                # Add experiment nodes
                for exp in data.get("experiments", []):
                    node = create_node(
                        node_type=NodeType.EXPERIMENT,
                        title=exp["name"],
                        description=exp.get("setup", ""),
                        source_chunks=[chunk.id]
                    )
                    node.properties["metrics"] = exp.get("metrics", [])
                    node.properties["key_results"] = exp.get("key_results", [])
                    
                    graph.add_node(node)
                    
                    # Link to datasets
                    for ds_name in exp.get("datasets", []):
                        # Find or create dataset node
                        ds_node = None
                        for n in graph.nodes.values():
                            if n.type == NodeType.DATASET and n.title == ds_name:
                                ds_node = n
                                break
                        
                        if ds_node:
                            edge = create_edge(
                                EdgeType.EVALUATES_ON,
                                node.id,
                                ds_node.id,
                                reason=f"Experiment evaluates on {ds_name}"
                            )
                            graph.add_edge(edge)
                
                # Add dataset nodes
                for ds in data.get("datasets", []):
                    # Check if already exists
                    exists = any(
                        n.type == NodeType.DATASET and n.title == ds["name"]
                        for n in graph.nodes.values()
                    )
                    
                    if not exists:
                        node = create_node(
                            node_type=NodeType.DATASET,
                            title=ds["name"],
                            description=ds.get("description", ""),
                            source_chunks=[chunk.id]
                        )
                        graph.add_node(node)
    
    def _link_visuals(self, graph: MindGraph, concept_names: List[str], verbose: bool):
        """Link figures and tables to concepts/methods."""
        # Get all concept and method nodes
        target_nodes = [
            n.title for n in graph.nodes.values()
            if n.type in [NodeType.CONCEPT, NodeType.METHOD, NodeType.EXPERIMENT]
        ]
        
        # Process figures
        for fig in graph.figures:
            if verbose:
                print(f"   Linking: {fig.label}")
            
            linkages = self.linkage_agent.link_figure(
                fig.caption,
                fig.nearby_text,
                target_nodes
            )
            
            for link in linkages:
                # Find target node
                target = None
                for n in graph.nodes.values():
                    if n.title == link["target"]:
                        target = n
                        break
                
                if target:
                    edge_type = EdgeType.ILLUSTRATED_BY
                    if link.get("relationship") == "summarizes":
                        edge_type = EdgeType.SUMMARIZED_BY
                    
                    edge = create_edge(
                        edge_type,
                        target.id,
                        fig.id,
                        reason=link.get("reason", "")
                    )
                    graph.add_edge(edge)
        
        # Process tables similarly
        for table in graph.tables:
            if verbose:
                print(f"   Linking: {table.label}")
            
            linkages = self.linkage_agent.link_figure(
                table.caption,
                table.nearby_text,
                target_nodes
            )
            
            for link in linkages:
                target = None
                for n in graph.nodes.values():
                    if n.title == link["target"]:
                        target = n
                        break
                
                if target:
                    edge = create_edge(
                        EdgeType.SUMMARIZED_BY,
                        target.id,
                        table.id,
                        reason=link.get("reason", "")
                    )
                    graph.add_edge(edge)
    
    def _find_relationships(self, graph: MindGraph, verbose: bool):
        """Find relationships between concepts/methods."""
        # Get all concepts and methods
        concepts = [n for n in graph.nodes.values() if n.type == NodeType.CONCEPT]
        methods = [n for n in graph.nodes.values() if n.type == NodeType.METHOD]
        
        # Link methods to concepts they use
        for method in methods:
            for concept in concepts:
                # Simple heuristic: if concept name appears in method description
                if concept.title.lower() in method.description.lower():
                    edge = create_edge(
                        EdgeType.DEPENDS_ON,
                        method.id,
                        concept.id,
                        reason=f"Method uses {concept.title}"
                    )
                    graph.add_edge(edge)
        
        # Link experiments to methods
        experiments = [n for n in graph.nodes.values() if n.type == NodeType.EXPERIMENT]
        for exp in experiments:
            for method in methods:
                if method.title.lower() in exp.description.lower():
                    edge = create_edge(
                        EdgeType.USES_METHOD,
                        exp.id,
                        method.id,
                        reason=f"Experiment evaluates {method.title}"
                    )
                    graph.add_edge(edge)


# ============================================================================
# Convenience Functions
# ============================================================================

def build_mind_graph(graph: MindGraph, config: Dict = None) -> MindGraph:
    """Build mind graph from paper structure."""
    builder = GraphBuilder(config)
    return builder.build_graph(graph)

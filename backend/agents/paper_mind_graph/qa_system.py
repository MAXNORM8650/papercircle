"""
Paper Mind Graph - RAG & Q&A System
====================================
Retrieval-Augmented Generation for answering questions about papers.
"""

from typing import List, Dict, Any, Optional, Tuple
from dataclasses import dataclass, field
import json
import numpy as np

from smolagents import LiteLLMModel, CodeAgent

from .schema import (
    MindGraph, GraphNode, GraphEdge, NodeType, EdgeType, Chunk
)


# ============================================================================
# Configuration
# ============================================================================

DEFAULT_CONFIG = {
    "api_base": "http://10.127.30.115:11434",
    "model_id": "ollama_chat/qwen3-coder:30b",
    "embedding_model": "ollama/nomic-embed-text",
    "num_ctx": 8192,
    "top_k": 5
}


# ============================================================================
# Embedding Store
# ============================================================================

class EmbeddingStore:
    """
    Simple in-memory embedding store for chunks and nodes.
    """
    
    def __init__(self, config: Dict = None):
        self.config = config or DEFAULT_CONFIG
        self.embeddings: Dict[str, np.ndarray] = {}
        self.texts: Dict[str, str] = {}
        self.metadata: Dict[str, Dict] = {}
        
        # Try to use sentence-transformers or fallback to simple approach
        self.model = None
        try:
            from sentence_transformers import SentenceTransformer
            self.model = SentenceTransformer('all-MiniLM-L6-v2')
        except ImportError:
            print("Warning: sentence-transformers not installed. Using simple embeddings.")
    
    def add(self, id: str, text: str, metadata: Dict = None):
        """Add a text with its embedding."""
        self.texts[id] = text
        self.metadata[id] = metadata or {}
        
        if self.model:
            embedding = self.model.encode(text)
            self.embeddings[id] = embedding
        else:
            # Simple word-based embedding fallback
            self.embeddings[id] = self._simple_embed(text)
    
    def _simple_embed(self, text: str) -> np.ndarray:
        """Simple bag-of-words embedding fallback."""
        words = text.lower().split()
        # Create a simple hash-based embedding
        embedding = np.zeros(256)
        for word in words:
            idx = hash(word) % 256
            embedding[idx] += 1
        # Normalize
        norm = np.linalg.norm(embedding)
        if norm > 0:
            embedding = embedding / norm
        return embedding
    
    def search(self, query: str, top_k: int = 5) -> List[Tuple[str, float, str]]:
        """
        Search for similar texts.
        
        Returns:
            List of (id, score, text) tuples
        """
        if not self.embeddings:
            return []
        
        # Get query embedding
        if self.model:
            query_emb = self.model.encode(query)
        else:
            query_emb = self._simple_embed(query)
        
        # Compute similarities
        scores = []
        for id, emb in self.embeddings.items():
            score = np.dot(query_emb, emb)
            scores.append((id, score, self.texts[id]))
        
        # Sort by score descending
        scores.sort(key=lambda x: x[1], reverse=True)
        
        return scores[:top_k]
    
    def get_metadata(self, id: str) -> Dict:
        """Get metadata for an item."""
        return self.metadata.get(id, {})


# ============================================================================
# Graph-Aware Retriever
# ============================================================================

class GraphRetriever:
    """
    Retrieves relevant context from both chunks and the graph.
    """
    
    def __init__(self, graph: MindGraph, config: Dict = None):
        self.graph = graph
        self.config = config or DEFAULT_CONFIG
        self.store = EmbeddingStore(config)
        
        # Index chunks
        self._index_chunks()
        
        # Index node descriptions
        self._index_nodes()
    
    def _index_chunks(self):
        """Index all chunks for retrieval."""
        for chunk in self.graph.chunks:
            self.store.add(
                id=chunk.id,
                text=chunk.text,
                metadata={
                    "type": "chunk",
                    "source_type": chunk.source_type,
                    "section_id": chunk.section_id,
                    "page_span": chunk.page_span
                }
            )
    
    def _index_nodes(self):
        """Index node descriptions for retrieval."""
        for node_id, node in self.graph.nodes.items():
            if node.type in [NodeType.CONCEPT, NodeType.METHOD, NodeType.EXPERIMENT]:
                text = f"{node.title}: {node.description}"
                self.store.add(
                    id=f"node_{node_id}",
                    text=text,
                    metadata={
                        "type": "node",
                        "node_id": node_id,
                        "node_type": node.type.value
                    }
                )
    
    def retrieve(
        self,
        query: str,
        top_k: int = 5,
        include_graph_context: bool = True
    ) -> Dict[str, Any]:
        """
        Retrieve relevant context for a query.
        
        Args:
            query: User question
            top_k: Number of items to retrieve
            include_graph_context: Whether to include graph neighbors
            
        Returns:
            Dictionary with chunks, nodes, and edges
        """
        # Search embedding store
        results = self.store.search(query, top_k=top_k * 2)  # Get extra for filtering
        
        retrieved_chunks = []
        retrieved_nodes = []
        retrieved_edges = []
        seen_nodes = set()
        
        for id, score, text in results[:top_k]:
            metadata = self.store.get_metadata(id)
            
            if metadata.get("type") == "chunk":
                # Find the chunk
                for chunk in self.graph.chunks:
                    if chunk.id == id:
                        retrieved_chunks.append({
                            "id": chunk.id,
                            "text": chunk.text,
                            "source_type": chunk.source_type,
                            "section_id": chunk.section_id,
                            "page_span": chunk.page_span,
                            "score": float(score)
                        })
                        
                        # Get associated nodes
                        if chunk.section_id and chunk.section_id in self.graph.nodes:
                            seen_nodes.add(chunk.section_id)
                        break
            
            elif metadata.get("type") == "node":
                node_id = metadata.get("node_id")
                if node_id and node_id in self.graph.nodes:
                    seen_nodes.add(node_id)
        
        # Expand with graph context
        if include_graph_context:
            expanded_nodes = set()
            for node_id in seen_nodes:
                neighbors = self.graph.get_neighbors(node_id, hops=1)
                expanded_nodes.update(neighbors.keys())
            seen_nodes.update(expanded_nodes)
        
        # Build node list
        for node_id in seen_nodes:
            node = self.graph.get_node(node_id)
            if node:
                retrieved_nodes.append({
                    "id": node.id,
                    "type": node.type.value,
                    "title": node.title,
                    "description": node.description,
                    "origin_pages": node.origin_pages
                })
                
                # Get edges for this node
                for edge in self.graph.get_edges_from(node_id):
                    if edge.target_id in seen_nodes:
                        retrieved_edges.append({
                            "source": node_id,
                            "target": edge.target_id,
                            "type": edge.type.value,
                            "reason": edge.reason
                        })
        
        return {
            "chunks": retrieved_chunks,
            "nodes": retrieved_nodes,
            "edges": retrieved_edges
        }


# ============================================================================
# Q&A Agent
# ============================================================================

@dataclass
class QAResponse:
    """Response from the Q&A system."""
    answer: str
    supporting_chunks: List[Dict]
    supporting_nodes: List[Dict]
    relevant_figures: List[str]
    relevant_tables: List[str]
    relevant_sections: List[str]
    confidence: float = 0.0
    
    def to_dict(self) -> Dict:
        return {
            "answer": self.answer,
            "supporting_chunks": self.supporting_chunks,
            "supporting_nodes": self.supporting_nodes,
            "relevant_figures": self.relevant_figures,
            "relevant_tables": self.relevant_tables,
            "relevant_sections": self.relevant_sections,
            "confidence": self.confidence
        }


class PaperQA:
    """
    Question-answering system for papers using RAG + Graph.
    """
    
    def __init__(self, graph: MindGraph, config: Dict = None):
        self.graph = graph
        self.config = config or DEFAULT_CONFIG
        
        # Initialize retriever
        self.retriever = GraphRetriever(graph, config)
        
        # Initialize LLM
        self.model = LiteLLMModel(
            model_id=self.config["model_id"],
            api_base=self.config["api_base"],
            num_ctx=self.config.get("num_ctx", 8192)
        )
        
        # Create QA agent
        self.agent = CodeAgent(
            tools=[],
            model=self.model,
            name="paper_qa",
            additional_authorized_imports=["json", "os", "datetime", "time", "numpy", "pandas"],
            instructions="""You are a research paper Q&A assistant. 

Given context from a paper (text chunks and a concept graph), answer questions accurately.

For each answer:
1. Directly answer the question based ONLY on the provided context
2. List which sections support your answer
3. List which figures/tables are relevant
4. If you cannot answer from the context, say so clearly

Always cite specific parts of the context. Be precise and accurate."""
        )
    
    def ask(
        self,
        question: str,
        top_k: int = 5
    ) -> QAResponse:
        """
        Answer a question about the paper.
        
        Args:
            question: User's question
            top_k: Number of chunks to retrieve
            
        Returns:
            QAResponse with answer and supporting evidence
        """
        # Retrieve context
        context = self.retriever.retrieve(question, top_k=top_k)
        
        # Build prompt
        prompt = self._build_prompt(question, context)
        
        # Get answer from LLM
        try:
            result = self.agent.run(prompt)
            
            # Parse response
            return self._parse_response(result, context)
            
        except Exception as e:
            return QAResponse(
                answer=f"Error generating answer: {e}",
                supporting_chunks=[],
                supporting_nodes=[],
                relevant_figures=[],
                relevant_tables=[],
                relevant_sections=[],
                confidence=0.0
            )
    
    def _build_prompt(self, question: str, context: Dict) -> str:
        """Build the prompt for the QA agent."""
        prompt = f"""Answer this question about the research paper:

**Question:** {question}

**Paper Title:** {self.graph.metadata.title}

---

**Retrieved Context (Text Chunks):**

"""
        for chunk in context["chunks"]:
            section = ""
            if chunk.get("section_id"):
                sec_node = self.graph.get_node(chunk["section_id"])
                if sec_node:
                    section = f" (from {sec_node.title})"
            prompt += f"[Chunk {chunk['id']}{section}, pages {chunk['page_span']}]:\n{chunk['text'][:500]}\n\n"
        
        prompt += """---

**Relevant Concepts (from Graph):**

"""
        for node in context["nodes"]:
            prompt += f"- **{node['title']}** ({node['type']}): {node['description'][:200]}\n"
        
        prompt += """---

**Graph Relationships:**

"""
        for edge in context["edges"][:10]:
            source = self.graph.get_node(edge["source"])
            target = self.graph.get_node(edge["target"])
            if source and target:
                prompt += f"- {source.title} --[{edge['type']}]--> {target.title}\n"
        
        prompt += """---

Based on the above context, answer the question.

Format your response as:
1. **Answer:** [Your detailed answer]
2. **Supporting Sections:** [List section names that support this]
3. **Relevant Figures/Tables:** [List any figures or tables that relate to the answer]
4. **Confidence:** [High/Medium/Low based on how well the context supports your answer]
"""
        
        return prompt
    
    def _parse_response(self, result: str, context: Dict) -> QAResponse:
        """Parse the LLM response into structured QAResponse."""
        # Extract answer
        answer = result
        if "**Answer:**" in result:
            parts = result.split("**Answer:**")
            if len(parts) > 1:
                answer_part = parts[1].split("**Supporting")[0] if "**Supporting" in parts[1] else parts[1]
                answer = answer_part.strip()
        
        # Find relevant sections
        sections = []
        for node in context["nodes"]:
            if node["type"] == "section":
                sections.append(node["title"])
        
        # Find figures and tables
        figures = []
        tables = []
        for node in context["nodes"]:
            if node["type"] == "figure":
                figures.append(node["title"])
            elif node["type"] == "table":
                tables.append(node["title"])
        
        # Also check if any figures/tables are mentioned in retrieved chunks
        for chunk in context["chunks"]:
            for fig in self.graph.figures:
                if fig.label.lower() in chunk["text"].lower():
                    if fig.label not in figures:
                        figures.append(fig.label)
            for table in self.graph.tables:
                if table.label.lower() in chunk["text"].lower():
                    if table.label not in tables:
                        tables.append(table.label)
        
        # Determine confidence
        confidence = 0.5
        if "high" in result.lower():
            confidence = 0.9
        elif "low" in result.lower():
            confidence = 0.3
        
        return QAResponse(
            answer=answer,
            supporting_chunks=context["chunks"],
            supporting_nodes=context["nodes"],
            relevant_figures=figures,
            relevant_tables=tables,
            relevant_sections=sections,
            confidence=confidence
        )
    
    def locate(self, item: str) -> Dict[str, Any]:
        """
        Locate where something is defined/discussed in the paper.
        
        Args:
            item: What to locate (concept, term, figure, etc.)
            
        Returns:
            Dictionary with location information
        """
        result = {
            "item": item,
            "found": False,
            "locations": []
        }
        
        # Search in nodes
        for node_id, node in self.graph.nodes.items():
            if item.lower() in node.title.lower():
                result["found"] = True
                result["locations"].append({
                    "type": node.type.value,
                    "title": node.title,
                    "pages": node.origin_pages,
                    "description": node.description[:200]
                })
        
        # Search in figures
        for fig in self.graph.figures:
            if item.lower() in fig.caption.lower() or item.lower() in fig.label.lower():
                result["found"] = True
                result["locations"].append({
                    "type": "figure",
                    "title": fig.label,
                    "pages": [fig.page],
                    "description": fig.caption[:200]
                })
        
        # Search in tables
        for table in self.graph.tables:
            if item.lower() in table.caption.lower() or item.lower() in table.label.lower():
                result["found"] = True
                result["locations"].append({
                    "type": "table",
                    "title": table.label,
                    "pages": [table.page],
                    "description": table.caption[:200]
                })
        
        # Search in chunks
        for chunk in self.graph.chunks:
            if item.lower() in chunk.text.lower():
                result["locations"].append({
                    "type": f"text ({chunk.source_type})",
                    "title": f"Chunk in section {chunk.section_id}",
                    "pages": list(range(chunk.page_span[0], chunk.page_span[1] + 1)),
                    "description": chunk.text[:200]
                })
                result["found"] = True
                if len(result["locations"]) >= 5:
                    break
        
        return result


# ============================================================================
# Interactive Q&A Session
# ============================================================================

class QASession:
    """
    Interactive Q&A session for a paper.
    """
    
    def __init__(self, graph: MindGraph, config: Dict = None):
        self.graph = graph
        self.qa = PaperQA(graph, config)
        self.history: List[Dict] = []
    
    def ask(self, question: str) -> str:
        """Ask a question and get a formatted response."""
        response = self.qa.ask(question)
        
        # Log to history
        self.history.append({
            "question": question,
            "response": response.to_dict()
        })
        
        # Format response
        output = f"""**Answer:**
{response.answer}

**Supporting Evidence:**
"""
        
        if response.relevant_sections:
            output += f"- Sections: {', '.join(response.relevant_sections)}\n"
        if response.relevant_figures:
            output += f"- Figures: {', '.join(response.relevant_figures)}\n"
        if response.relevant_tables:
            output += f"- Tables: {', '.join(response.relevant_tables)}\n"
        
        output += f"\n*Confidence: {response.confidence:.0%}*"
        
        return output
    
    def locate(self, item: str) -> str:
        """Locate something in the paper."""
        result = self.qa.locate(item)
        
        if not result["found"]:
            return f"Could not find '{item}' in the paper."
        
        output = f"**Found '{item}' in:**\n\n"
        
        for loc in result["locations"][:5]:
            pages = ", ".join(str(p) for p in loc["pages"])
            output += f"- **{loc['title']}** ({loc['type']}) - Page(s): {pages}\n"
            output += f"  {loc['description']}...\n\n"
        
        return output
    
    def get_history(self) -> List[Dict]:
        """Get conversation history."""
        return self.history


# ============================================================================
# Convenience Functions
# ============================================================================

def create_qa_system(graph: MindGraph, config: Dict = None) -> PaperQA:
    """Create a Q&A system for a paper."""
    return PaperQA(graph, config)


def ask_paper(graph: MindGraph, question: str, config: Dict = None) -> QAResponse:
    """Quick function to ask a question about a paper."""
    qa = PaperQA(graph, config)
    return qa.ask(question)

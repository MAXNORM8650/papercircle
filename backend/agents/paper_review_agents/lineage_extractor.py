"""
Methodology Lineage Extraction Module
=======================================
Traces how research methods flow across papers — building a methodology
genealogy that shows which paper introduced a technique, which improved it,
which applied it to a new domain, and which evaluated or challenged it.

Two extraction modes:
1. LLM Agent mode (when llm_config provided):
   - A single ToolCallingAgent ("methodology_lineage_analyst") with a
     get_citation_context tool to look up how methods are referenced
   - Reads contributions, analysis text, and citation contexts
   - Reasons about methodological connections between papers

2. Keyword/regex fallback (always runs as complement):
   - Citation context keyword matching (extends, prerequisite, survey)
   - Shared methodology component matching (applies)
   - Research theme clustering (survey)
   - Explicit relationship patterns in contribution text
"""

from typing import List, Dict, Any, Optional, Tuple
from dataclasses import dataclass
import json
import re
from difflib import SequenceMatcher


# ============================================================================
# Data Structures
# ============================================================================

@dataclass
class EdgeData:
    """Represents a lineage edge between papers."""
    target_paper_title: str
    target_paper_arxiv_id: Optional[str]
    edge_type: str  # extends, applies, evaluates, contradicts, survey, prerequisite
    similarity_score: float
    rationale: str
    matched_paper_id: Optional[str] = None
    metadata: Dict[str, Any] = None

    def to_dict(self) -> Dict[str, Any]:
        return {
            "target_paper_title": self.target_paper_title,
            "target_paper_arxiv_id": self.target_paper_arxiv_id,
            "edge_type": self.edge_type,
            "similarity_score": self.similarity_score,
            "rationale": self.rationale,
            "matched_paper_id": self.matched_paper_id,
            "metadata": self.metadata or {}
        }


# ============================================================================
# Citation Context Tool (for the Lineage Agent)
# ============================================================================

def _create_citation_context_tool(paper_text: str):
    """
    Create a GetCitationContext tool bound to a specific paper's text.
    Uses smolagents.Tool subclass pattern used throughout the codebase.
    """
    from smolagents import Tool

    class GetCitationContextTool(Tool):
        """Look up how a specific paper is cited within the text."""

        name = "get_citation_context"
        description = (
            "Look up how a specific paper is referenced in the analyzed paper's text. "
            "Returns the surrounding sentences where the paper title appears, "
            "helping you understand the nature of the relationship (extends, evaluates, etc). "
            "Pass the paper title or its first few distinctive words."
        )
        inputs = {
            "citation_title": {
                "type": "string",
                "description": "Title (or first few words) of the cited paper to look up"
            }
        }
        output_type = "string"

        def __init__(self, text: str):
            super().__init__()
            self._paper_text = text

        def forward(self, citation_title: str) -> str:
            if not citation_title or not self._paper_text:
                return "No context found."

            text_lower = self._paper_text.lower()

            # Try progressively shorter title prefixes
            for n_words in [6, 4, 3]:
                title_words = citation_title.strip().split()[:n_words]
                if not title_words:
                    continue
                search_phrase = " ".join(title_words).lower()
                pos = text_lower.find(search_phrase)
                if pos != -1:
                    window = 400
                    start = max(0, pos - window)
                    end = min(len(self._paper_text), pos + len(search_phrase) + window)
                    context = self._paper_text[start:end]
                    return f"Context where '{citation_title[:60]}' is cited:\n\n...{context}..."

            return f"Citation '{citation_title[:60]}' not found in paper text. It may be referenced by author name or abbreviation."

    return GetCitationContextTool(paper_text)


# ============================================================================
# Main Lineage Extractor Class
# ============================================================================

class LineageExtractor:
    """
    Extracts lineage relationships from paper review analysis.

    When llm_config is provided, uses a ToolCallingAgent with a
    get_citation_context tool for deep analysis. Keyword methods
    always run as a complement to catch anything the LLM misses.

    Example:
        # With LLM (recommended):
        extractor = LineageExtractor(
            verbose=True,
            llm_config={"model_id": "ollama_chat/qwen3:30b", "api_base": "http://..."}
        )

        # Without LLM (keyword-only fallback):
        extractor = LineageExtractor(verbose=True)

        edges = extractor.extract_all_relationships(review_results)
    """

    VALID_EDGE_TYPES = {"extends", "applies", "evaluates", "contradicts", "prerequisite", "survey"}

    def __init__(self, verbose: bool = False, llm_config: Optional[Dict[str, Any]] = None):
        """
        Initialize the lineage extractor.

        Args:
            verbose: Print debug information
            llm_config: LLM configuration dict with keys:
                - model_id: e.g. "ollama_chat/qwen3:30b"
                - api_base: e.g. "http://localhost:11434"
                - api_key: (optional) API key
                - num_ctx: (optional) context window size
        """
        self.verbose = verbose
        self.llm_config = llm_config
        self.use_llm = llm_config is not None

        # Keywords for classifying citation context (fallback)
        self.extends_keywords = ['extend', 'build', 'improve', 'advance', 'enhance']
        self.prerequisite_keywords = ['foundational', 'seminal', 'based on', 'inspired by']
        self.survey_keywords = ['survey', 'review', 'comprehensive', 'overview']
        self.contradicts_keywords = ['contradict', 'refute', 'challenge', 'differ']
        self.evaluates_keywords = ['evaluate', 'compare', 'benchmark', 'test against']

    # ========================================================================
    # Main Entry Point
    # ========================================================================

    def extract_all_relationships(
        self,
        paper_analysis: Dict[str, Any]
    ) -> List[EdgeData]:
        """
        Extract all types of lineage relationships from paper analysis.

        Args:
            paper_analysis: Complete analysis output from orchestrator

        Returns:
            List of EdgeData objects representing discovered relationships
        """
        all_edges = []

        # LLM agent pass — deep relationship analysis
        if self.use_llm:
            if self.verbose:
                print("🤖 Running LLM lineage analysis agent...")
            llm_edges = self._llm_extract_relationships(paper_analysis)
            all_edges.extend(llm_edges)
            if self.verbose:
                print(f"   Agent found {len(llm_edges)} relationships")

        # Keyword-based extraction (complement / fallback)
        if self.verbose:
            print("📊 Extracting citation relationships (keywords)...")
        citation_edges = self.extract_citation_relationships(paper_analysis)
        all_edges.extend(citation_edges)

        if self.verbose:
            print("🔧 Extracting methodology relationships...")
        method_edges = self.extract_methodology_relationships(paper_analysis)
        all_edges.extend(method_edges)

        if self.verbose:
            print("🏷️  Extracting theme relationships...")
        theme_edges = self.extract_theme_relationships(paper_analysis)
        all_edges.extend(theme_edges)

        if self.verbose:
            print("💡 Extracting contribution-based relationships...")
        contrib_edges = self.extract_contribution_relationships(paper_analysis)
        all_edges.extend(contrib_edges)

        # Deduplicate edges (same target + type → keep highest score)
        unique_edges = self._deduplicate_edges(all_edges)

        if self.verbose:
            llm_count = len([
                e for e in unique_edges
                if e.metadata and e.metadata.get("source") == "llm_lineage_agent"
            ])
            keyword_count = len(unique_edges) - llm_count
            print(f"✅ Found {len(unique_edges)} unique lineage relationships "
                  f"({llm_count} from LLM agent, {keyword_count} from keywords)")

        return unique_edges

    # ========================================================================
    # LLM Agent-Based Extraction
    # ========================================================================

    def _create_lineage_agent(self, paper_text: str):
        """
        Create a single ToolCallingAgent for lineage analysis.

        The agent has one tool: get_citation_context — which lets it look up
        how specific papers are cited in the text before classifying relationships.
        """
        from smolagents import LiteLLMModel, ToolCallingAgent

        model_kwargs = {
            "model_id": self.llm_config["model_id"],
            "api_base": self.llm_config.get("api_base"),
            "api_key": self.llm_config.get("api_key", "not-needed"),
            "drop_params": True,
        }
        if "ollama" in self.llm_config["model_id"].lower():
            model_kwargs["num_ctx"] = self.llm_config.get("num_ctx", 8192)

        model = LiteLLMModel(**model_kwargs)
        context_tool = _create_citation_context_tool(paper_text)

        agent = ToolCallingAgent(
            tools=[context_tool],
            model=model,
            name="methodology_lineage_analyst",
            description="Traces methodology lineage — how methods are introduced, improved, applied, and evaluated across papers.",
            max_steps=25,
            instructions="""You are a methodology lineage analyst. Your job is to trace how research methods flow across papers — which paper introduced a technique, which improved it, which applied it to a new domain, and which evaluated or challenged it.

This builds a METHODOLOGY GENEALOGY: a graph showing how ideas and techniques evolve across the research literature.

RELATIONSHIP TYPES (use exactly these strings):
- "extends": This paper improves, advances, or builds a new method on top of the cited work's methodology (e.g., "We improve the attention mechanism from [X] by adding sparse routing")
- "applies": This paper takes the cited work's method and applies it to a different problem or domain (e.g., "We adapt BERT for medical text classification")
- "evaluates": This paper benchmarks against or systematically compares with the cited work's approach (e.g., "We compare our method against [X] on three benchmarks")
- "contradicts": This paper challenges the cited work's methodology or findings with evidence (e.g., "Contrary to [X], we show that larger models are not necessary")
- "prerequisite": The cited work provides a foundational method or theory that this paper's approach depends on (e.g., the original Transformer paper for any attention-based method)
- "survey": The cited work is mentioned in a literature overview without direct methodological connection

FOCUS ON METHODOLOGY:
- Pay special attention to: architectures, training procedures, loss functions, optimization techniques, data processing methods, evaluation protocols
- Trace the chain: "Paper A proposed method M → Paper B improved M with technique T → This paper combines M+T with new idea N"
- The most valuable edges are "extends" and "applies" — these show how methods evolve

WORKFLOW:
1. Read the paper's contributions and technical analysis carefully — identify the KEY methods used
2. For important cited papers, use get_citation_context to see HOW their methods are referenced
3. Ask: "Did this paper USE their method? IMPROVE it? COMPARE against it? BUILD on it?"
4. Classify each methodological connection (aim for 8-15 significant relationships)
5. Skip generic/ceremonial citations that don't involve methodology

YOUR FINAL ANSWER must be a JSON object with this exact format:
{
  "relationships": [
    {
      "target_title": "exact paper title from the citation list",
      "edge_type": "extends",
      "confidence": 0.85,
      "rationale": "Improves the sparse attention mechanism from this work by adding learned routing"
    }
  ]
}""",
        )

        return agent

    def _llm_extract_relationships(self, paper_analysis: Dict[str, Any]) -> List[EdgeData]:
        """
        Use a ToolCallingAgent to deeply analyze paper relationships.

        The agent can call get_citation_context to look up HOW specific
        papers are cited, then reasons about the relationship type.
        """
        paper_text = paper_analysis.get("stages", {}).get("pdf_processing", {}).get("text", "")
        metadata = paper_analysis.get("stages", {}).get("pdf_processing", {}).get("metadata", {})

        literature_data = paper_analysis.get("stages", {}).get("literature", {})
        citations = literature_data.get("citations", [])
        related = literature_data.get("semantic_scholar", []) + literature_data.get("arxiv", [])

        contribution_text = paper_analysis.get("stages", {}).get("contribution_analyzer", {}).get("result", "")
        analysis_text = paper_analysis.get("stages", {}).get("deep_analyzer", {}).get("result", "")

        if not paper_text and not citations:
            return []

        # Create agent with the citation context tool
        try:
            agent = self._create_lineage_agent(paper_text)
        except Exception as e:
            if self.verbose:
                print(f"   Failed to create lineage agent: {e}")
            return []

        # Build compact citation list for the prompt
        citation_lines = []
        for c in citations[:20]:
            title = c.get("title", "").strip()
            if title and len(title) >= 10:
                year = c.get("year", "N/A")
                venue = c.get("venue", "")
                line = f"- {title} ({year})"
                if venue:
                    line += f" [{venue}]"
                citation_lines.append(line)

        related_lines = []
        for r in related[:10]:
            title = r.get("title", "").strip()
            if title and len(title) >= 10:
                related_lines.append(f"- {title} ({r.get('year', 'N/A')})")

        prompt = f"""Trace the methodology lineage for this paper — how its methods connect to other papers.

PAPER BEING ANALYZED:
Title: {metadata.get('title', 'Unknown')}
Abstract: {metadata.get('abstract', '')[:800]}

KEY CONTRIBUTIONS & METHODS:
{(contribution_text[:2000] if isinstance(contribution_text, str) else str(contribution_text)[:2000]) if contribution_text else 'Not available'}

TECHNICAL ANALYSIS (architectures, training, techniques used):
{(analysis_text[:1500] if isinstance(analysis_text, str) else str(analysis_text)[:1500]) if analysis_text else 'Not available'}

CITED PAPERS:
{chr(10).join(citation_lines) if citation_lines else 'None extracted'}

RELATED PAPERS (from search):
{chr(10).join(related_lines) if related_lines else 'None found'}

TASK: Identify the methodology lineage.
1. What are the KEY methods/techniques in this paper?
2. For each method, use get_citation_context to find WHERE the foundational/related papers are cited
3. Classify: did this paper EXTEND their method? APPLY it? EVALUATE against it? BUILD on it as a prerequisite?
4. Return the methodology connections as JSON."""

        try:
            result = agent.run(prompt)
            return self._parse_agent_result(result, citations, related)
        except Exception as e:
            if self.verbose:
                print(f"   Lineage agent run failed: {e}")
            return []

    def _parse_agent_result(
        self,
        result: str,
        citations: List[Dict],
        related_papers: List[Dict]
    ) -> List[EdgeData]:
        """Parse the agent's JSON response into EdgeData objects."""
        if not result:
            return []

        result_str = str(result)

        # Try to extract JSON from the response
        parsed = None

        # 1. Direct parse
        try:
            parsed = json.loads(result_str)
        except (json.JSONDecodeError, TypeError):
            pass

        # 2. Code-fenced JSON
        if not parsed:
            json_match = re.search(r'```(?:json)?\s*([\s\S]*?)\s*```', result_str)
            if json_match:
                try:
                    parsed = json.loads(json_match.group(1))
                except (json.JSONDecodeError, TypeError):
                    pass

        # 3. Find any JSON object with "relationships" key
        if not parsed:
            json_match = re.search(r'\{[^{}]*"relationships"\s*:\s*\[[\s\S]*?\]\s*\}', result_str)
            if json_match:
                try:
                    parsed = json.loads(json_match.group())
                except (json.JSONDecodeError, TypeError):
                    pass

        if not parsed or "relationships" not in parsed:
            if self.verbose:
                print(f"   Could not parse agent JSON response (length={len(result_str)})")
            return []

        all_papers = citations + related_papers
        edges = []

        for rel in parsed["relationships"]:
            edge_type = rel.get("edge_type", "").strip().lower()
            if edge_type not in self.VALID_EDGE_TYPES:
                continue

            target_title = rel.get("target_title", "").strip()
            if not target_title or len(target_title) < 5:
                continue

            # Match to a known paper to recover arXiv ID and canonical title
            arxiv_id = None
            for paper in all_papers:
                paper_title = paper.get("title", "").strip()
                if not paper_title:
                    continue
                # Exact match (case-insensitive)
                if paper_title.lower() == target_title.lower():
                    arxiv_id = self._extract_arxiv_id(paper.get("url", ""))
                    target_title = paper_title  # Use canonical title
                    break
                # Fuzzy match
                if SequenceMatcher(None, paper_title.lower(), target_title.lower()).ratio() > 0.85:
                    arxiv_id = self._extract_arxiv_id(paper.get("url", ""))
                    target_title = paper_title
                    break

            confidence = min(1.0, max(0.0, float(rel.get("confidence", 0.7))))

            edges.append(EdgeData(
                target_paper_title=target_title,
                target_paper_arxiv_id=arxiv_id,
                edge_type=edge_type,
                similarity_score=confidence,
                rationale=rel.get("rationale", "LLM-classified relationship"),
                metadata={
                    "source": "llm_lineage_agent",
                    "classification_method": "agent",
                }
            ))

        return edges

    # ========================================================================
    # Keyword-Based Extraction Methods (complement / fallback)
    # ========================================================================

    def extract_citation_relationships(
        self,
        paper_analysis: Dict[str, Any]
    ) -> List[EdgeData]:
        """
        Extract relationships from citation analysis using keyword matching.
        """
        edges = []

        literature_data = paper_analysis.get("stages", {}).get("literature", {})
        citations = literature_data.get("citations", [])

        if not citations:
            return edges

        paper_text = paper_analysis.get("stages", {}).get("pdf_processing", {}).get("text", "")

        for citation in citations[:20]:
            title = citation.get("title", "").strip()
            if not title or len(title) < 10:
                continue

            edge_type, score, rationale = self._classify_citation(title, paper_text, citation)
            arxiv_id = self._extract_arxiv_id(citation.get("url", ""))

            edge = EdgeData(
                target_paper_title=title,
                target_paper_arxiv_id=arxiv_id,
                edge_type=edge_type,
                similarity_score=score,
                rationale=rationale,
                metadata={
                    "source": "citation_analysis",
                    "classification_method": "keyword",
                    "citation_year": citation.get("year"),
                    "citation_venue": citation.get("venue")
                }
            )
            edges.append(edge)

        return edges

    def extract_methodology_relationships(
        self,
        paper_analysis: Dict[str, Any]
    ) -> List[EdgeData]:
        """Extract relationships based on shared methodologies."""
        edges = []

        literature_data = paper_analysis.get("stages", {}).get("literature", {})
        semantic_scholar = literature_data.get("semantic_scholar", [])
        arxiv_papers = literature_data.get("arxiv", [])
        related_papers = semantic_scholar + arxiv_papers

        if not related_papers:
            return edges

        paper_text = paper_analysis.get("stages", {}).get("pdf_processing", {}).get("text", "")
        methodology_components = self._extract_methodology_components(paper_text)

        for paper in related_papers[:10]:
            title = paper.get("title", "").strip()
            abstract = paper.get("abstract", "")

            if not title or len(title) < 10:
                continue

            shared_components, similarity = self._compare_methodologies(
                methodology_components,
                abstract + " " + title
            )

            if similarity >= 0.3 and len(shared_components) >= 1:
                rationale = f"Shares {len(shared_components)} methodological component(s): {', '.join(shared_components[:3])}"
                arxiv_id = self._extract_arxiv_id(paper.get("url", ""))

                edge = EdgeData(
                    target_paper_title=title,
                    target_paper_arxiv_id=arxiv_id,
                    edge_type="applies",
                    similarity_score=similarity,
                    rationale=rationale,
                    metadata={
                        "source": "methodology_analysis",
                        "classification_method": "keyword",
                        "shared_components": shared_components,
                        "paper_year": paper.get("year")
                    }
                )
                edges.append(edge)

        return edges

    def extract_theme_relationships(
        self,
        paper_analysis: Dict[str, Any]
    ) -> List[EdgeData]:
        """Extract relationships based on thematic clustering."""
        edges = []

        metadata = paper_analysis.get("stages", {}).get("pdf_processing", {}).get("metadata", {})
        abstract = metadata.get("abstract", "")
        title = metadata.get("title", "")

        main_themes = self._extract_themes(title + " " + abstract)

        literature_data = paper_analysis.get("stages", {}).get("literature", {})
        semantic_scholar = literature_data.get("semantic_scholar", [])
        arxiv_papers = literature_data.get("arxiv", [])
        related_papers = semantic_scholar + arxiv_papers

        for paper in related_papers[:15]:
            paper_title = paper.get("title", "").strip()
            paper_abstract = paper.get("abstract", "")

            if not paper_title or len(paper_title) < 10:
                continue

            related_themes = self._extract_themes(paper_title + " " + paper_abstract)
            shared_themes = set(main_themes) & set(related_themes)
            if len(shared_themes) == 0:
                continue

            overlap_ratio = len(shared_themes) / max(len(main_themes), len(related_themes))

            if overlap_ratio >= 0.4:
                rationale = f"Shares research themes: {', '.join(list(shared_themes)[:3])}"
                arxiv_id = self._extract_arxiv_id(paper.get("url", ""))

                edge = EdgeData(
                    target_paper_title=paper_title,
                    target_paper_arxiv_id=arxiv_id,
                    edge_type="survey",
                    similarity_score=overlap_ratio,
                    rationale=rationale,
                    metadata={
                        "source": "theme_clustering",
                        "classification_method": "keyword",
                        "shared_themes": list(shared_themes),
                        "paper_year": paper.get("year")
                    }
                )
                edges.append(edge)

        return edges

    def extract_contribution_relationships(
        self,
        paper_analysis: Dict[str, Any]
    ) -> List[EdgeData]:
        """Extract relationships based on contribution analysis."""
        edges = []

        contribution_data = paper_analysis.get("stages", {}).get("contribution_analyzer", {})
        if not contribution_data:
            return edges

        contribution_text = contribution_data.get("result", "")
        if not contribution_text:
            return edges

        literature_data = paper_analysis.get("stages", {}).get("literature", {})
        citations = literature_data.get("citations", [])

        edges.extend(self._extract_explicit_relationships(str(contribution_text), citations))

        return edges

    # ========================================================================
    # Helper Methods
    # ========================================================================

    def _classify_citation(
        self,
        cited_title: str,
        paper_text: str,
        citation: Dict
    ) -> Tuple[str, float, str]:
        """Classify a citation as extends/prerequisite/survey using keywords."""
        context = self._find_citation_context(cited_title, paper_text)

        if not context:
            return ("prerequisite", 0.5, f"Cites foundational work: {cited_title[:60]}")

        context_lower = context.lower()

        for keyword in self.extends_keywords:
            if keyword in context_lower:
                return ("extends", 0.85, f"Extends work on: {cited_title[:60]}")

        for keyword in self.contradicts_keywords:
            if keyword in context_lower:
                return ("contradicts", 0.8, f"Challenges findings from: {cited_title[:60]}")

        for keyword in self.evaluates_keywords:
            if keyword in context_lower:
                return ("evaluates", 0.8, f"Evaluates approach from: {cited_title[:60]}")

        for keyword in self.survey_keywords:
            if keyword in context_lower:
                return ("survey", 0.75, f"Surveys related work including: {cited_title[:60]}")

        for keyword in self.prerequisite_keywords:
            if keyword in context_lower:
                return ("prerequisite", 0.8, f"Builds on foundational work: {cited_title[:60]}")

        # Default classification based on citation year
        year = citation.get("year")
        if year and isinstance(year, int):
            current_year = 2026
            age = current_year - year
            if age > 5:
                return ("prerequisite", 0.6, f"Foundational reference: {cited_title[:60]}")
            elif age < 2:
                return ("extends", 0.6, f"Recent related work: {cited_title[:60]}")

        return ("prerequisite", 0.5, f"Referenced work: {cited_title[:60]}")

    def _find_citation_context(self, title: str, paper_text: str, window: int = 200) -> str:
        """Find the context around a citation in the paper text."""
        title_words = title.split()[:5]
        search_phrase = " ".join(title_words)

        text_lower = paper_text.lower()
        search_lower = search_phrase.lower()

        pos = text_lower.find(search_lower)
        if pos == -1:
            return ""

        start = max(0, pos - window)
        end = min(len(paper_text), pos + len(search_phrase) + window)

        return paper_text[start:end]

    def _extract_methodology_components(self, text: str) -> List[str]:
        """Extract methodology components from paper text."""
        methodologies = [
            'transformer', 'attention', 'lstm', 'gru', 'rnn', 'cnn', 'convolution',
            'resnet', 'bert', 'gpt', 'vit', 'clip', 'gan', 'vae', 'diffusion',
            'reinforcement learning', 'supervised learning', 'unsupervised learning',
            'self-supervised', 'few-shot', 'zero-shot', 'meta-learning',
            'neural architecture search', 'knowledge distillation', 'pruning',
            'quantization', 'fine-tuning', 'pretraining', 'transfer learning'
        ]

        text_lower = text.lower()
        found_components = []

        for method in methodologies:
            if method in text_lower:
                found_components.append(method)

        return found_components

    def _compare_methodologies(
        self,
        components1: List[str],
        text2: str
    ) -> Tuple[List[str], float]:
        """Compare methodology components between two papers."""
        text2_lower = text2.lower()
        shared = []

        for comp in components1:
            if comp in text2_lower:
                shared.append(comp)

        if not components1:
            similarity = 0.0
        else:
            similarity = len(shared) / len(components1)

        return shared, similarity

    def _extract_themes(self, text: str) -> List[str]:
        """Extract research themes from text."""
        themes = {
            'computer vision': ['vision', 'image', 'visual', 'object detection', 'segmentation'],
            'natural language': ['nlp', 'language', 'text', 'translation', 'qa', 'generation'],
            'reinforcement learning': ['reinforcement', 'rl', 'agent', 'policy', 'reward'],
            'generative models': ['generative', 'generation', 'gan', 'vae', 'diffusion'],
            'optimization': ['optimization', 'gradient', 'convergence', 'training'],
            'graph learning': ['graph', 'node', 'edge', 'gnn', 'network'],
            'multimodal': ['multimodal', 'cross-modal', 'vision-language'],
            'interpretability': ['interpretability', 'explainability', 'explanation'],
            'robustness': ['robust', 'adversarial', 'attack', 'defense'],
            'efficiency': ['efficient', 'lightweight', 'fast', 'compression']
        }

        text_lower = text.lower()
        found_themes = []

        for theme, keywords in themes.items():
            for keyword in keywords:
                if keyword in text_lower:
                    found_themes.append(theme)
                    break

        return found_themes

    def _extract_explicit_relationships(
        self,
        contribution_text: str,
        citations: List[Dict]
    ) -> List[EdgeData]:
        """Extract explicit relationship mentions from contribution text."""
        edges = []

        patterns = [
            (r'extend(?:s|ing)? (?:the work of )?([^.]+)', 'extends'),
            (r'improve(?:s|ing)? (?:upon )?([^.]+)', 'extends'),
            (r'contradict(?:s|ing)? ([^.]+)', 'contradicts'),
            (r'evaluate(?:s|ing)? ([^.]+)', 'evaluates'),
            (r'compare(?:s|d)? (?:with |to )?([^.]+)', 'evaluates'),
        ]

        for pattern, edge_type in patterns:
            matches = re.finditer(pattern, contribution_text, re.IGNORECASE)

            for match in matches:
                target_mention = match.group(1).strip()
                matched_citation = self._match_citation(target_mention, citations)

                if matched_citation:
                    title = matched_citation.get("title", "").strip()
                    arxiv_id = self._extract_arxiv_id(matched_citation.get("url", ""))

                    edge = EdgeData(
                        target_paper_title=title,
                        target_paper_arxiv_id=arxiv_id,
                        edge_type=edge_type,
                        similarity_score=0.9,
                        rationale=f"Explicitly {edge_type} in contribution statement",
                        metadata={
                            "source": "contribution_text",
                            "classification_method": "regex",
                        }
                    )
                    edges.append(edge)

        return edges

    def _match_citation(self, mention: str, citations: List[Dict]) -> Optional[Dict]:
        """Match a mention to a citation by fuzzy title matching."""
        best_match = None
        best_score = 0.0

        for citation in citations:
            title = citation.get("title", "")
            if not title:
                continue

            score = SequenceMatcher(None, mention.lower(), title.lower()).ratio()

            if score > best_score:
                best_score = score
                best_match = citation

        return best_match if best_score > 0.6 else None

    def _extract_arxiv_id(self, url: str) -> Optional[str]:
        """Extract arXiv ID from URL."""
        if not url:
            return None

        match = re.search(r'arxiv\.org/(?:abs|pdf)/(\d+\.\d+)', url)
        if match:
            return match.group(1)

        return None

    def _deduplicate_edges(self, edges: List[EdgeData]) -> List[EdgeData]:
        """
        Remove duplicate edges (same target + type).
        Keep the one with highest similarity score.
        """
        groups = {}

        for edge in edges:
            key = (edge.target_paper_title.lower(), edge.edge_type)

            if key not in groups:
                groups[key] = edge
            else:
                if edge.similarity_score > groups[key].similarity_score:
                    groups[key] = edge

        return list(groups.values())

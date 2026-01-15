"""
Lineage Extraction Module
==========================
Extracts paper-to-paper relationships from review analysis data.

Supports 4 types of relationships:
1. Citation relationships (extends, prerequisite, survey)
2. Methodology relationships (applies)
3. Theme cluster relationships (survey)
4. Contribution-based relationships (extends, contradicts, evaluates)
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
# Main Lineage Extractor Class
# ============================================================================

class LineageExtractor:
    """
    Extracts lineage relationships from paper review analysis.

    Example:
        extractor = LineageExtractor()
        edges = extractor.extract_all_relationships(review_results)
        for edge in edges:
            print(f"{edge.edge_type}: {edge.target_paper_title} ({edge.similarity_score:.2f})")
    """

    def __init__(self, verbose: bool = False):
        """
        Initialize the lineage extractor.

        Args:
            verbose: Print debug information
        """
        self.verbose = verbose

        # Keywords for classifying citation context
        self.extends_keywords = ['extend', 'build', 'improve', 'advance', 'enhance']
        self.prerequisite_keywords = ['foundational', 'seminal', 'based on', 'inspired by']
        self.survey_keywords = ['survey', 'review', 'comprehensive', 'overview']
        self.contradicts_keywords = ['contradict', 'refute', 'challenge', 'differ']
        self.evaluates_keywords = ['evaluate', 'compare', 'benchmark', 'test against']

    def extract_all_relationships(
        self,
        paper_analysis: Dict[str, Any]
    ) -> List[EdgeData]:
        """
        Extract all types of lineage relationships from paper analysis.

        Args:
            paper_analysis: Complete analysis output from orchestrator
                Should contain: citations, related_papers, methodology, contributions

        Returns:
            List of EdgeData objects representing discovered relationships
        """
        all_edges = []

        # Extract citation relationships
        if self.verbose:
            print("📊 Extracting citation relationships...")
        citation_edges = self.extract_citation_relationships(paper_analysis)
        all_edges.extend(citation_edges)

        # Extract methodology relationships
        if self.verbose:
            print("🔧 Extracting methodology relationships...")
        method_edges = self.extract_methodology_relationships(paper_analysis)
        all_edges.extend(method_edges)

        # Extract theme cluster relationships
        if self.verbose:
            print("🏷️  Extracting theme relationships...")
        theme_edges = self.extract_theme_relationships(paper_analysis)
        all_edges.extend(theme_edges)

        # Extract contribution-based relationships
        if self.verbose:
            print("💡 Extracting contribution-based relationships...")
        contrib_edges = self.extract_contribution_relationships(paper_analysis)
        all_edges.extend(contrib_edges)

        # Deduplicate edges (same target + type)
        unique_edges = self._deduplicate_edges(all_edges)

        if self.verbose:
            print(f"✅ Found {len(unique_edges)} unique lineage relationships")

        return unique_edges

    def extract_citation_relationships(
        self,
        paper_analysis: Dict[str, Any]
    ) -> List[EdgeData]:
        """
        Extract relationships from citation analysis.

        Uses the Literature Expert agent's citation extraction output.
        Classifies each citation as extends/prerequisite/survey based on context.

        Args:
            paper_analysis: Analysis data containing citation information

        Returns:
            List of EdgeData for citation relationships
        """
        edges = []

        # Get citations from literature stage
        literature_data = paper_analysis.get("stages", {}).get("literature", {})
        citations = literature_data.get("citations", [])

        if not citations:
            return edges

        # Get paper text for context analysis
        paper_text = paper_analysis.get("stages", {}).get("pdf_processing", {}).get("text", "")

        for citation in citations[:20]:  # Limit to top 20 citations
            title = citation.get("title", "").strip()
            if not title or len(title) < 10:
                continue

            # Classify citation type based on context
            edge_type, score, rationale = self._classify_citation(title, paper_text, citation)

            # Extract arXiv ID if available
            arxiv_id = self._extract_arxiv_id(citation.get("url", ""))

            edge = EdgeData(
                target_paper_title=title,
                target_paper_arxiv_id=arxiv_id,
                edge_type=edge_type,
                similarity_score=score,
                rationale=rationale,
                metadata={
                    "source": "citation_analysis",
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
        """
        Extract relationships based on shared methodologies.

        Uses the find_methodology_links tool output to identify papers
        using similar techniques, architectures, or datasets.

        Args:
            paper_analysis: Analysis data containing methodology information

        Returns:
            List of EdgeData for methodology relationships
        """
        edges = []

        # Get related papers from Semantic Scholar / arXiv
        literature_data = paper_analysis.get("stages", {}).get("literature", {})
        semantic_scholar = literature_data.get("semantic_scholar", [])
        arxiv_papers = literature_data.get("arxiv", [])
        related_papers = semantic_scholar + arxiv_papers

        if not related_papers:
            return edges

        # Get methodology links from analysis
        # This would come from the analysis agent or knowledge graph agent
        paper_text = paper_analysis.get("stages", {}).get("pdf_processing", {}).get("text", "")
        methodology_components = self._extract_methodology_components(paper_text)

        # Compare with related papers (use title/abstract as proxy for now)
        for paper in related_papers[:10]:  # Limit to top 10
            title = paper.get("title", "").strip()
            abstract = paper.get("abstract", "")

            if not title or len(title) < 10:
                continue

            # Check for methodology overlap
            shared_components, similarity = self._compare_methodologies(
                methodology_components,
                abstract + " " + title
            )

            if similarity >= 0.3 and len(shared_components) >= 1:  # At least 1 shared component
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
        """
        Extract relationships based on thematic clustering.

        Uses the identify_paper_clusters tool to group papers by research area.
        Creates survey edges for papers in the same cluster.

        Args:
            paper_analysis: Analysis data

        Returns:
            List of EdgeData for theme relationships
        """
        edges = []

        # Get paper metadata
        metadata = paper_analysis.get("stages", {}).get("pdf_processing", {}).get("metadata", {})
        abstract = metadata.get("abstract", "")
        title = metadata.get("title", "")

        # Extract thematic keywords
        main_themes = self._extract_themes(title + " " + abstract)

        # Get related papers
        literature_data = paper_analysis.get("stages", {}).get("literature", {})
        semantic_scholar = literature_data.get("semantic_scholar", [])
        arxiv_papers = literature_data.get("arxiv", [])
        related_papers = semantic_scholar + arxiv_papers

        for paper in related_papers[:15]:  # Limit to top 15
            paper_title = paper.get("title", "").strip()
            paper_abstract = paper.get("abstract", "")

            if not paper_title or len(paper_title) < 10:
                continue

            # Extract themes from related paper
            related_themes = self._extract_themes(paper_title + " " + paper_abstract)

            # Calculate theme overlap
            shared_themes = set(main_themes) & set(related_themes)
            if len(shared_themes) == 0:
                continue

            overlap_ratio = len(shared_themes) / max(len(main_themes), len(related_themes))

            if overlap_ratio >= 0.4:  # At least 40% theme overlap
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
        """
        Extract relationships based on contribution analysis.

        Uses the extract_contributions tool output to identify papers
        that are extended, contradicted, or evaluated.

        Args:
            paper_analysis: Analysis data containing contribution information

        Returns:
            List of EdgeData for contribution-based relationships
        """
        edges = []

        # Get contribution analysis
        contribution_data = paper_analysis.get("stages", {}).get("contribution_analyzer", {})
        if not contribution_data:
            return edges

        contribution_text = contribution_data.get("result", "")
        if not contribution_text:
            return edges

        # Get citations for matching
        literature_data = paper_analysis.get("stages", {}).get("literature", {})
        citations = literature_data.get("citations", [])

        # Look for explicit relationship mentions in contributions
        # e.g., "extends the work of", "contradicts", "evaluates"
        edges.extend(self._extract_explicit_relationships(contribution_text, citations))

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
        """
        Classify a citation as extends/prerequisite/survey.

        Args:
            cited_title: Title of cited paper
            paper_text: Full text of citing paper
            citation: Citation metadata

        Returns:
            (edge_type, confidence_score, rationale)
        """
        # Search for citation context in paper text
        context = self._find_citation_context(cited_title, paper_text)

        if not context:
            # Default to prerequisite if no context found
            return ("prerequisite", 0.5, f"Cites foundational work: {cited_title[:60]}")

        context_lower = context.lower()

        # Check for explicit relationship keywords
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
            # Older papers (>5 years) more likely to be prerequisites
            # Recent papers (<2 years) more likely to be extended/evaluated
            current_year = 2026
            age = current_year - year

            if age > 5:
                return ("prerequisite", 0.6, f"Foundational reference: {cited_title[:60]}")
            elif age < 2:
                return ("extends", 0.6, f"Recent related work: {cited_title[:60]}")

        return ("prerequisite", 0.5, f"Referenced work: {cited_title[:60]}")

    def _find_citation_context(self, title: str, paper_text: str, window: int = 200) -> str:
        """
        Find the context around a citation in the paper text.

        Args:
            title: Title to search for
            paper_text: Full paper text
            window: Characters before/after to include

        Returns:
            Context string or empty if not found
        """
        # Try to find title or first few words of title
        title_words = title.split()[:5]  # First 5 words
        search_phrase = " ".join(title_words)

        # Case-insensitive search
        text_lower = paper_text.lower()
        search_lower = search_phrase.lower()

        pos = text_lower.find(search_lower)
        if pos == -1:
            return ""

        # Extract context window
        start = max(0, pos - window)
        end = min(len(paper_text), pos + len(search_phrase) + window)

        return paper_text[start:end]

    def _extract_methodology_components(self, text: str) -> List[str]:
        """
        Extract methodology components from paper text.

        Args:
            text: Paper text

        Returns:
            List of methodology keywords
        """
        # Common ML/AI methodology keywords
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
        """
        Compare methodology components between two papers.

        Args:
            components1: Methodology components from first paper
            text2: Text from second paper

        Returns:
            (shared_components, similarity_score)
        """
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
        """
        Extract research themes from text.

        Args:
            text: Paper title + abstract

        Returns:
            List of theme keywords
        """
        # Common research themes
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
        """
        Extract explicit relationship mentions from contribution text.

        Args:
            contribution_text: Text describing contributions
            citations: List of cited papers

        Returns:
            List of EdgeData for explicit relationships
        """
        edges = []

        # Patterns to search for
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

                # Try to match with a citation
                matched_citation = self._match_citation(target_mention, citations)

                if matched_citation:
                    title = matched_citation.get("title", "").strip()
                    arxiv_id = self._extract_arxiv_id(matched_citation.get("url", ""))

                    edge = EdgeData(
                        target_paper_title=title,
                        target_paper_arxiv_id=arxiv_id,
                        edge_type=edge_type,
                        similarity_score=0.9,  # High confidence for explicit mentions
                        rationale=f"Explicitly {edge_type} in contribution statement",
                        metadata={"source": "contribution_text"}
                    )
                    edges.append(edge)

        return edges

    def _match_citation(self, mention: str, citations: List[Dict]) -> Optional[Dict]:
        """
        Match a mention to a citation by fuzzy title matching.

        Args:
            mention: Mentioned paper/work
            citations: List of citations

        Returns:
            Matched citation dict or None
        """
        best_match = None
        best_score = 0.0

        for citation in citations:
            title = citation.get("title", "")
            if not title:
                continue

            # Calculate similarity
            score = SequenceMatcher(None, mention.lower(), title.lower()).ratio()

            if score > best_score:
                best_score = score
                best_match = citation

        # Return match if score > 0.6
        return best_match if best_score > 0.6 else None

    def _extract_arxiv_id(self, url: str) -> Optional[str]:
        """
        Extract arXiv ID from URL.

        Args:
            url: URL string

        Returns:
            arXiv ID or None
        """
        if not url:
            return None

        # Pattern: arxiv.org/abs/XXXX.XXXXX or arxiv.org/pdf/XXXX.XXXXX
        match = re.search(r'arxiv\.org/(?:abs|pdf)/(\d+\.\d+)', url)
        if match:
            return match.group(1)

        return None

    def _deduplicate_edges(self, edges: List[EdgeData]) -> List[EdgeData]:
        """
        Remove duplicate edges (same target + type).
        Keep the one with highest similarity score.

        Args:
            edges: List of EdgeData

        Returns:
            Deduplicated list
        """
        # Group by (target_title, edge_type)
        groups = {}

        for edge in edges:
            key = (edge.target_paper_title.lower(), edge.edge_type)

            if key not in groups:
                groups[key] = edge
            else:
                # Keep edge with higher similarity score
                if edge.similarity_score > groups[key].similarity_score:
                    groups[key] = edge

        return list(groups.values())

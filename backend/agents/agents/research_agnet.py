"""
Multi-Agent Research Pipeline System
=====================================

A comprehensive multi-agent system for academic paper research with:
- Parallel execution via CodeAgent orchestration
- Multiple specialized agents (search, web, analysis, sorting, export)
- Multiple output formats (JSON, CSV, BibTeX, Markdown, HTML)
- Sorting by similarity, novelty, recency, citations
- Visualization generation

Architecture:
    ┌─────────────────────────────────────────────────────────────┐
    │                    ORCHESTRATOR (CodeAgent)                  │
    │              Coordinates all agents, parallel execution      │
    └─────────────────────────────────────────────────────────────┘
                                    │
            ┌───────────────────────┼───────────────────────┐
            │                       │                       │
            ▼                       ▼                       ▼
    ┌───────────────┐     ┌───────────────┐     ┌───────────────┐
    │  Paper Search │     │   Web Search  │     │   Analysis    │
    │     Agent     │     │     Agent     │     │     Agent     │
    └───────────────┘     └───────────────┘     └───────────────┘
            │                       │                       │
            └───────────────────────┼───────────────────────┘
                                    │
            ┌───────────────────────┼───────────────────────┐
            │                       │                       │
            ▼                       ▼                       ▼
    ┌───────────────┐     ┌───────────────┐     ┌───────────────┐
    │    Sorting    │     │    Export     │     │ Visualization │
    │     Agent     │     │     Agent     │     │     Agent     │
    └───────────────┘     └───────────────┘     └───────────────┘

Usage:
    from research_pipeline import create_research_pipeline
    
    pipeline = create_research_pipeline(model)
    result = pipeline.run("Find papers about world models, sort by citations, export as bibtex")
"""

import os
import json
import csv
import re
import time
import hashlib
from io import StringIO
from datetime import datetime
from typing import List, Dict, Optional, Any, Tuple
from dataclasses import dataclass, asdict, field
from concurrent.futures import ThreadPoolExecutor, as_completed
import requests

# smolagents imports
from smolagents import Tool, CodeAgent, ToolCallingAgent

# Optional imports
try:
    import arxiv
    HAS_ARXIV = True
except ImportError:
    HAS_ARXIV = False

try:
    import numpy as np
    HAS_NUMPY = True
except ImportError:
    HAS_NUMPY = False

try:
    from sklearn.feature_extraction.text import TfidfVectorizer
    from sklearn.metrics.pairwise import cosine_similarity
    HAS_SKLEARN = True
except ImportError:
    HAS_SKLEARN = False


# ============================================================================
# Data Models
# ============================================================================

@dataclass
class Paper:
    """Represents an academic paper with all metadata."""
    title: str
    authors: List[str]
    abstract: str
    url: str
    year: Optional[int]
    venue: str
    source: str
    doi: Optional[str] = None
    pdf_url: Optional[str] = None
    citations: Optional[int] = None
    categories: List[str] = field(default_factory=list)
    
    # Computed scores (filled by sorting agent)
    similarity_score: float = 0.0
    novelty_score: float = 0.0
    recency_score: float = 0.0
    relevance_score: float = 0.0
    combined_score: float = 0.0
    
    def to_dict(self) -> dict:
        return asdict(self)
    
    def to_bibtex(self, index: int = 0) -> str:
        first_author = self.authors[0].split()[-1] if self.authors else "unknown"
        cite_key = re.sub(r'[^a-zA-Z0-9]', '', first_author.lower())
        cite_key = f"{cite_key}{self.year or 'xxxx'}_{index}"
        
        entry_type = "article"
        if "arxiv" in self.source.lower():
            entry_type = "misc"
        elif any(kw in (self.venue or "").lower() for kw in ["conference", "proceedings"]):
            entry_type = "inproceedings"
        
        lines = [f"@{entry_type}{{{cite_key},"]
        lines.append(f"  title = {{{self.title}}},")
        lines.append(f"  author = {{{' and '.join(self.authors)}}},")
        if self.year:
            lines.append(f"  year = {{{self.year}}},")
        if self.venue:
            lines.append(f"  journal = {{{self.venue}}},")
        if self.doi:
            lines.append(f"  doi = {{{self.doi}}},")
        if self.url:
            lines.append(f"  url = {{{self.url}}},")
        lines.append("}")
        return "\n".join(lines)
    
    def to_csv_row(self) -> list:
        return [
            self.title, "; ".join(self.authors), self.year or "",
            self.venue, self.doi or "", self.url, self.pdf_url or "",
            self.source, self.citations or "", self.combined_score,
            self.abstract[:300] if self.abstract else ""
        ]
    
    @staticmethod
    def csv_header() -> list:
        return ["Title", "Authors", "Year", "Venue", "DOI", "URL", "PDF", 
                "Source", "Citations", "Score", "Abstract"]


# ============================================================================
# Global Paper Storage (shared between agents)
# ============================================================================

class PaperStore:
    """Thread-safe storage for papers shared between agents."""
    
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._papers = []
            cls._instance._query = ""
        return cls._instance
    
    @property
    def papers(self) -> List[Paper]:
        return self._papers
    
    @papers.setter
    def papers(self, value: List[Paper]):
        self._papers = value
    
    @property
    def query(self) -> str:
        return self._query
    
    @query.setter
    def query(self, value: str):
        self._query = value
    
    def clear(self):
        self._papers = []
        self._query = ""
    
    def add_papers(self, papers: List[Paper]):
        # Deduplicate by title
        existing_titles = {re.sub(r'[^a-z0-9]', '', p.title.lower()) for p in self._papers}
        for paper in papers:
            norm_title = re.sub(r'[^a-z0-9]', '', paper.title.lower())
            if norm_title not in existing_titles:
                self._papers.append(paper)
                existing_titles.add(norm_title)


# Global store instance
paper_store = PaperStore()


# ============================================================================
# Search Engine (Core functionality)
# ============================================================================

class PaperSearchEngine:
    """Multi-database paper search engine."""
    
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({"User-Agent": "ResearchPipeline/2.0"})
    
    def search_arxiv(self, query: str, max_results: int = 30, start_year: int = 2020) -> List[Paper]:
        papers = []
        
        if HAS_ARXIV:
            try:
                client = arxiv.Client()
                search = arxiv.Search(
                    query=query,
                    max_results=max_results,
                    sort_by=arxiv.SortCriterion.SubmittedDate,
                    sort_order=arxiv.SortOrder.Descending
                )
                for result in client.results(search):
                    if result.published.year >= start_year:
                        papers.append(Paper(
                            title=result.title,
                            authors=[a.name for a in result.authors[:10]],
                            abstract=result.summary,
                            url=result.entry_id,
                            year=result.published.year,
                            venue="arXiv",
                            doi=result.doi,
                            pdf_url=result.pdf_url,
                            source="arxiv",
                            categories=list(result.categories)
                        ))
                return papers
            except Exception as e:
                print(f"[arXiv] Error: {e}")
        
        # Fallback API
        try:
            clean_query = query.replace('"', '')
            params = {
                "search_query": f"all:{clean_query}",
                "start": 0,
                "max_results": max_results,
                "sortBy": "submittedDate",
                "sortOrder": "descending"
            }
            resp = self.session.get("http://export.arxiv.org/api/query", params=params, timeout=30)
            resp.raise_for_status()
            
            import xml.etree.ElementTree as ET
            root = ET.fromstring(resp.content)
            ns = {"atom": "http://www.w3.org/2005/Atom"}
            
            for entry in root.findall("atom:entry", ns):
                title_elem = entry.find("atom:title", ns)
                title = title_elem.text.strip().replace("\n", " ") if title_elem is not None else ""
                if not title:
                    continue
                
                published = entry.find("atom:published", ns)
                year = int(published.text[:4]) if published is not None and published.text else None
                if year and year < start_year:
                    continue
                
                authors = [a.find("atom:name", ns).text for a in entry.findall("atom:author", ns)[:10]
                          if a.find("atom:name", ns) is not None]
                
                summary = entry.find("atom:summary", ns)
                abstract = summary.text.strip().replace("\n", " ") if summary is not None else ""
                
                url, pdf_url = "", ""
                for link in entry.findall("atom:link", ns):
                    if link.get("type") == "text/html":
                        url = link.get("href", "")
                    elif link.get("title") == "pdf":
                        pdf_url = link.get("href", "")
                
                papers.append(Paper(
                    title=title, authors=authors, abstract=abstract,
                    url=url, year=year, venue="arXiv", pdf_url=pdf_url, source="arxiv"
                ))
        except Exception as e:
            print(f"[arXiv API] Error: {e}")
        
        return papers

    def search_semantic_scholar(self, query: str, max_results: int = 30, start_year: int = 2020) -> List[Paper]:
        papers = []
        params = {
            "query": query,
            "limit": min(100, max_results),
            "year": f"{start_year}-",
            "fields": "title,authors,abstract,url,year,venue,externalIds,citationCount,openAccessPdf"
        }
        
        try:
            resp = self.session.get(
                "https://api.semanticscholar.org/graph/v1/paper/search",
                params=params, timeout=30
            )
            if resp.status_code == 429:
                time.sleep(3)
                resp = self.session.get(
                    "https://api.semanticscholar.org/graph/v1/paper/search",
                    params=params, timeout=30
                )
            resp.raise_for_status()
            
            for item in resp.json().get("data", [])[:max_results]:
                title = item.get("title", "")
                if not title:
                    continue
                
                ext_ids = item.get("externalIds", {}) or {}
                oa_pdf = item.get("openAccessPdf", {}) or {}
                
                papers.append(Paper(
                    title=title,
                    authors=[a.get("name", "") for a in item.get("authors", [])[:10]],
                    abstract=item.get("abstract", "") or "",
                    url=item.get("url", ""),
                    year=item.get("year"),
                    venue=item.get("venue", "") or "",
                    doi=ext_ids.get("DOI"),
                    pdf_url=oa_pdf.get("url"),
                    citations=item.get("citationCount"),
                    source="semantic_scholar"
                ))
        except Exception as e:
            print(f"[Semantic Scholar] Error: {e}")
        
        return papers

    def search_openalex(self, query: str, max_results: int = 30, start_year: int = 2020) -> List[Paper]:
        papers = []
        params = {
            "search": query,
            "filter": f"publication_year:>{start_year-1}",
            "per-page": min(50, max_results),
            "cursor": "*",
            "sort": "publication_date:desc",
            "mailto": "research@example.com"
        }
        
        try:
            resp = self.session.get("https://api.openalex.org/works", params=params, timeout=30)
            resp.raise_for_status()
            
            for item in resp.json().get("results", [])[:max_results]:
                title = item.get("title", "")
                if not title:
                    continue
                
                authors = [a.get("author", {}).get("display_name", "") 
                          for a in item.get("authorships", [])[:10]]
                
                venue = ""
                loc = item.get("primary_location", {}) or {}
                src = loc.get("source", {}) or {}
                venue = src.get("display_name", "")
                
                # Reconstruct abstract
                abstract = ""
                abs_idx = item.get("abstract_inverted_index", {})
                if abs_idx:
                    words = [(pos, word) for word, positions in abs_idx.items() for pos in positions]
                    words.sort()
                    abstract = " ".join(w for _, w in words)[:1500]
                
                papers.append(Paper(
                    title=title, authors=authors, abstract=abstract,
                    url=item.get("id", ""),
                    year=item.get("publication_year"),
                    venue=venue,
                    doi=(item.get("doi", "") or "").replace("https://doi.org/", "") or None,
                    pdf_url=item.get("open_access", {}).get("oa_url"),
                    citations=item.get("cited_by_count"),
                    source="openalex"
                ))
        except Exception as e:
            print(f"[OpenAlex] Error: {e}")
        
        return papers

    def search_dblp(self, query: str, max_results: int = 30, start_year: int = 2020) -> List[Paper]:
        papers = []
        
        try:
            resp = self.session.get(
                "https://dblp.org/search/publ/api",
                params={"q": query, "h": max_results, "format": "json"},
                timeout=30
            )
            resp.raise_for_status()
            
            for hit in resp.json().get("result", {}).get("hits", {}).get("hit", []):
                info = hit.get("info", {})
                title = info.get("title", "")
                if not title:
                    continue
                
                year = None
                if info.get("year"):
                    try:
                        year = int(info["year"])
                        if year < start_year:
                            continue
                    except:
                        pass
                
                authors_data = info.get("authors", {}).get("author", [])
                if isinstance(authors_data, str):
                    authors = [authors_data]
                elif isinstance(authors_data, dict):
                    authors = [authors_data.get("text", "")]
                else:
                    authors = [a.get("text", "") if isinstance(a, dict) else a for a in authors_data[:10]]
                
                papers.append(Paper(
                    title=title.rstrip("."), authors=authors, abstract="",
                    url=info.get("url", ""), year=year,
                    venue=info.get("venue", ""), doi=info.get("doi"),
                    source="dblp"
                ))
        except Exception as e:
            print(f"[DBLP] Error: {e}")
        
        return papers

    def search_all(self, query: str, sources: List[str] = None, 
                   max_per_source: int = 25, start_year: int = 2020) -> List[Paper]:
        """Parallel search across all databases."""
        sources = sources or ["arxiv", "semantic_scholar", "openalex", "dblp"]
        source_funcs = {
            "arxiv": self.search_arxiv,
            "semantic_scholar": self.search_semantic_scholar,
            "openalex": self.search_openalex,
            "dblp": self.search_dblp,
        }
        
        all_papers = []
        with ThreadPoolExecutor(max_workers=4) as executor:
            futures = {
                executor.submit(source_funcs[s], query, max_per_source, start_year): s
                for s in sources if s in source_funcs
            }
            for future in as_completed(futures):
                try:
                    all_papers.extend(future.result())
                except Exception as e:
                    print(f"[{futures[future]}] Failed: {e}")
        
        # Deduplicate
        seen = set()
        unique = []
        for p in all_papers:
            key = re.sub(r'[^a-z0-9]', '', p.title.lower())
            if key not in seen:
                seen.add(key)
                unique.append(p)
        
        return unique


# Global search engine
search_engine = PaperSearchEngine()


# ============================================================================
# TOOL 1: Paper Search Tool
# ============================================================================

class PaperSearchTool(Tool):
    """Search academic papers across multiple databases."""
    
    name = "paper_search"
    description = """Search for academic papers across arXiv, Semantic Scholar, OpenAlex, and DBLP.
    
Args:
    query: Search query (e.g., "world models reinforcement learning")
    max_results: Max papers per source (default: 25)
    start_year: Filter papers from this year (default: 2020)
    sources: Comma-separated sources (default: all)

Returns:
    Summary of found papers. Papers are stored for subsequent sorting/export.
"""
    inputs = {
        "query": {"type": "string", "description": "Search query"},
        "max_results": {"type": "integer", "description": "Max results per source", "nullable": True},
        "start_year": {"type": "integer", "description": "Start year filter", "nullable": True},
        "sources": {"type": "string", "description": "Comma-separated: arxiv,semantic_scholar,openalex,dblp", "nullable": True},
    }
    output_type = "string"
    
    def forward(self, query: str, max_results: int = None, start_year: int = None, sources: str = None) -> str:
        max_results = max_results or 25
        start_year = start_year or 2020
        source_list = [s.strip() for s in sources.split(",")] if sources else None
        
        print(f"[PaperSearch] Searching: '{query}' across {source_list or 'all sources'}")
        
        papers = search_engine.search_all(query, source_list, max_results, start_year)
        
        paper_store.papers = papers
        paper_store.query = query
        
        # Summary by source
        by_source = {}
        for p in papers:
            by_source[p.source] = by_source.get(p.source, 0) + 1
        
        summary = f"Found {len(papers)} papers for '{query}':\n"
        for src, count in sorted(by_source.items(), key=lambda x: -x[1]):
            summary += f"  - {src}: {count}\n"
        
        # Top 5 preview
        summary += "\nTop papers:\n"
        for i, p in enumerate(papers[:5], 1):
            summary += f"{i}. [{p.year}] {p.title[:80]}{'...' if len(p.title) > 80 else ''}\n"
            summary += f"   Authors: {', '.join(p.authors[:3])}{'...' if len(p.authors) > 3 else ''}\n"
        
        return summary


# ============================================================================
# TOOL 2: Paper Sorting Tool
# ============================================================================

class PaperSortTool(Tool):
    """Sort papers by various criteria."""
    
    name = "sort_papers"
    description = """Sort the collected papers by different criteria.
    
Args:
    sort_by: Sorting criterion - one of:
        - "recency": Most recent first (by year)
        - "citations": Most cited first
        - "similarity": Most similar to query (uses TF-IDF)
        - "novelty": Prioritize unique/novel papers
        - "relevance": Combined relevance score
        - "combined": Weighted combination of all factors
    weights: For "combined" sort - JSON string like '{"recency": 0.3, "citations": 0.3, "similarity": 0.4}'
    top_k: Return only top K papers (default: all)

Returns:
    Sorted papers summary.
"""
    inputs = {
        "sort_by": {"type": "string", "description": "Sort criterion: recency, citations, similarity, novelty, relevance, combined", "nullable": True},
        "weights": {"type": "string", "description": "JSON weights for combined sorting", "nullable": True},
        "top_k": {"type": "integer", "description": "Return top K papers", "nullable": True},
    }
    output_type = "string"
    
    def forward(self, sort_by: str = "relevance", weights: str = None, top_k: int = None) -> str:
        papers = paper_store.papers
        query = paper_store.query
        
        if not papers:
            return "No papers to sort. Run paper_search first."
        
        print(f"[Sort] Sorting {len(papers)} papers by '{sort_by}'")
        
        # Calculate scores
        papers = self._calculate_scores(papers, query)
        
        # Sort
        sort_by = sort_by.lower()
        if sort_by == "recency":
            papers.sort(key=lambda p: -(p.year or 0))
        elif sort_by == "citations":
            papers.sort(key=lambda p: -(p.citations or 0))
        elif sort_by == "similarity":
            papers.sort(key=lambda p: -p.similarity_score)
        elif sort_by == "novelty":
            papers.sort(key=lambda p: -p.novelty_score)
        elif sort_by == "combined":
            w = json.loads(weights) if weights else {"recency": 0.25, "citations": 0.25, "similarity": 0.3, "novelty": 0.2}
            for p in papers:
                p.combined_score = (
                    w.get("recency", 0.25) * p.recency_score +
                    w.get("citations", 0.25) * (min(p.citations or 0, 1000) / 1000) +
                    w.get("similarity", 0.3) * p.similarity_score +
                    w.get("novelty", 0.2) * p.novelty_score
                )
            papers.sort(key=lambda p: -p.combined_score)
        else:  # relevance (default)
            for p in papers:
                p.relevance_score = 0.4 * p.similarity_score + 0.3 * p.recency_score + 0.3 * (min(p.citations or 0, 500) / 500)
            papers.sort(key=lambda p: -p.relevance_score)
        
        # Apply top_k
        if top_k:
            papers = papers[:top_k]
        
        paper_store.papers = papers
        
        # Generate summary
        result = f"Sorted {len(papers)} papers by '{sort_by}':\n\n"
        for i, p in enumerate(papers[:10], 1):
            score = p.combined_score if sort_by == "combined" else (
                p.similarity_score if sort_by == "similarity" else
                p.citations if sort_by == "citations" else
                p.recency_score if sort_by == "recency" else
                p.relevance_score
            )
            result += f"{i}. [{p.year}] {p.title[:70]}{'...' if len(p.title) > 70 else ''}\n"
            result += f"   Score: {score:.3f} | Citations: {p.citations or 'N/A'} | Source: {p.source}\n"
        
        if len(papers) > 10:
            result += f"\n... and {len(papers) - 10} more papers"
        
        return result
    
    def _calculate_scores(self, papers: List[Paper], query: str) -> List[Paper]:
        """Calculate all sorting scores."""
        current_year = datetime.now().year
        
        # Recency score
        for p in papers:
            if p.year:
                p.recency_score = max(0, 1 - (current_year - p.year) / 10)
            else:
                p.recency_score = 0.5
        
        # Similarity score (TF-IDF)
        if HAS_SKLEARN and query:
            try:
                texts = [query] + [f"{p.title} {p.abstract}" for p in papers]
                vectorizer = TfidfVectorizer(max_features=5000, stop_words='english')
                tfidf_matrix = vectorizer.fit_transform(texts)
                similarities = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:])[0]
                for p, sim in zip(papers, similarities):
                    p.similarity_score = float(sim)
            except:
                for p in papers:
                    # Fallback: keyword matching
                    keywords = set(query.lower().split())
                    title_words = set(p.title.lower().split())
                    p.similarity_score = len(keywords & title_words) / max(len(keywords), 1)
        else:
            # Simple keyword matching
            keywords = set(query.lower().split())
            for p in papers:
                title_words = set(p.title.lower().split())
                p.similarity_score = len(keywords & title_words) / max(len(keywords), 1)
        
        # Novelty score (inverse document frequency of terms)
        all_titles = " ".join(p.title.lower() for p in papers)
        word_freq = {}
        for word in all_titles.split():
            word_freq[word] = word_freq.get(word, 0) + 1
        
        for p in papers:
            title_words = p.title.lower().split()
            if title_words:
                avg_freq = sum(word_freq.get(w, 1) for w in title_words) / len(title_words)
                p.novelty_score = 1 / (1 + avg_freq / len(papers))
            else:
                p.novelty_score = 0.5
        
        return papers


# ============================================================================
# TOOL 3: Paper Details Tool
# ============================================================================

class PaperDetailsTool(Tool):
    """Get detailed information about a specific paper."""
    
    name = "get_paper_details"
    description = """Get detailed information about a paper by index, DOI, or title.
    
Args:
    identifier: Paper index (1-based), DOI, or partial title match

Returns:
    Detailed paper information.
"""
    inputs = {
        "identifier": {"type": "string", "description": "Paper index, DOI, or title"},
    }
    output_type = "string"
    
    def forward(self, identifier: str) -> str:
        papers = paper_store.papers
        
        # Try index
        try:
            idx = int(identifier) - 1
            if 0 <= idx < len(papers):
                return self._format_paper(papers[idx])
        except ValueError:
            pass
        
        # Try DOI
        if identifier.startswith("10.") or "doi.org" in identifier:
            doi = identifier.replace("https://doi.org/", "").replace("http://doi.org/", "")
            for p in papers:
                if p.doi == doi:
                    return self._format_paper(p)
            # Fetch from API
            return self._fetch_from_api(doi)
        
        # Try title match
        identifier_lower = identifier.lower()
        for p in papers:
            if identifier_lower in p.title.lower():
                return self._format_paper(p)
        
        return f"Paper not found: {identifier}"
    
    def _format_paper(self, p: Paper) -> str:
        lines = [
            f"# {p.title}",
            f"\n**Authors:** {', '.join(p.authors)}",
            f"**Year:** {p.year or 'N/A'}",
            f"**Venue:** {p.venue or 'N/A'}",
            f"**Source:** {p.source}",
            f"**Citations:** {p.citations or 'N/A'}",
        ]
        if p.doi:
            lines.append(f"**DOI:** https://doi.org/{p.doi}")
        if p.url:
            lines.append(f"**URL:** {p.url}")
        if p.pdf_url:
            lines.append(f"**PDF:** {p.pdf_url}")
        if p.categories:
            lines.append(f"**Categories:** {', '.join(p.categories)}")
        
        lines.append(f"\n**Scores:**")
        lines.append(f"  - Similarity: {p.similarity_score:.3f}")
        lines.append(f"  - Recency: {p.recency_score:.3f}")
        lines.append(f"  - Novelty: {p.novelty_score:.3f}")
        
        lines.append(f"\n## Abstract\n{p.abstract or 'No abstract available.'}")
        return "\n".join(lines)
    
    def _fetch_from_api(self, doi: str) -> str:
        try:
            resp = requests.get(
                f"https://api.semanticscholar.org/graph/v1/paper/DOI:{doi}",
                params={"fields": "title,authors,abstract,year,venue,citationCount"},
                timeout=30
            )
            resp.raise_for_status()
            data = resp.json()
            return f"""# {data.get('title', 'Unknown')}
**Authors:** {', '.join(a.get('name', '') for a in data.get('authors', []))}
**Year:** {data.get('year', 'N/A')}
**Venue:** {data.get('venue', 'N/A')}
**Citations:** {data.get('citationCount', 'N/A')}

## Abstract
{data.get('abstract', 'No abstract available.')}"""
        except Exception as e:
            return f"Error fetching paper: {e}"


# ============================================================================
# TOOL 4: Export Tool
# ============================================================================

class PaperExportTool(Tool):
    """Export papers to various formats."""
    
    name = "export_papers"
    description = """Export papers to file in various formats.
    
Args:
    filename: Output filename (e.g., "papers.json", "refs.bib", "results.csv")
    format: Output format - json, csv, bib, markdown, html (auto-detected from extension)
    top_k: Export only top K papers (default: all)

Returns:
    Confirmation with file path and content preview.
"""
    inputs = {
        "filename": {"type": "string", "description": "Output filename"},
        "format": {"type": "string", "description": "Format: json, csv, bib, markdown, html", "nullable": True},
        "top_k": {"type": "integer", "description": "Export top K papers only", "nullable": True},
    }
    output_type = "string"
    
    def forward(self, filename: str, format: str = None, top_k: int = None) -> str:
        papers = paper_store.papers
        query = paper_store.query
        
        if not papers:
            return "No papers to export. Run paper_search first."
        
        if top_k:
            papers = papers[:top_k]
        
        # Auto-detect format
        if not format:
            ext = os.path.splitext(filename)[1].lower()
            format = {".json": "json", ".csv": "csv", ".bib": "bib", 
                     ".md": "markdown", ".html": "html", ".txt": "text"}.get(ext, "json")
        
        format = format.lower()
        
        # Generate content
        if format == "json":
            content = json.dumps({
                "query": query,
                "exported_at": datetime.now().isoformat(),
                "total": len(papers),
                "papers": [p.to_dict() for p in papers]
            }, indent=2, ensure_ascii=False)
        
        elif format == "csv":
            output = StringIO()
            writer = csv.writer(output)
            writer.writerow(Paper.csv_header())
            for p in papers:
                writer.writerow(p.to_csv_row())
            content = output.getvalue()
        
        elif format == "bib":
            content = "\n\n".join(p.to_bibtex(i) for i, p in enumerate(papers))
        
        elif format == "markdown":
            content = self._to_markdown(papers, query)
        
        elif format == "html":
            content = self._to_html(papers, query)
        
        else:
            content = self._to_text(papers, query)
        
        # Write file
        try:
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(content)
            
            preview = content[:500] + "..." if len(content) > 500 else content
            return f"✓ Exported {len(papers)} papers to {filename} ({format})\n\nPreview:\n{preview}"
        except Exception as e:
            return f"Error: {e}"
    
    def _to_markdown(self, papers: List[Paper], query: str) -> str:
        lines = [
            f"# Research Papers: {query}",
            f"\nExported: {datetime.now().strftime('%Y-%m-%d %H:%M')}",
            f"Total papers: {len(papers)}\n",
            "---\n"
        ]
        for i, p in enumerate(papers, 1):
            lines.append(f"## {i}. {p.title}\n")
            lines.append(f"**Authors:** {', '.join(p.authors[:5])}{'...' if len(p.authors) > 5 else ''}")
            lines.append(f"**Year:** {p.year} | **Venue:** {p.venue} | **Citations:** {p.citations or 'N/A'}")
            if p.pdf_url:
                lines.append(f"**PDF:** [{p.pdf_url}]({p.pdf_url})")
            if p.doi:
                lines.append(f"**DOI:** [https://doi.org/{p.doi}](https://doi.org/{p.doi})")
            if p.abstract:
                lines.append(f"\n> {p.abstract[:500]}{'...' if len(p.abstract) > 500 else ''}\n")
            lines.append("---\n")
        return "\n".join(lines)
    
    def _to_html(self, papers: List[Paper], query: str) -> str:
        html = f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Research Papers: {query}</title>
    <style>
        body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 900px; margin: 0 auto; padding: 20px; background: #f5f5f5; }}
        h1 {{ color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px; }}
        .paper {{ background: white; padding: 20px; margin: 15px 0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }}
        .paper h2 {{ margin-top: 0; color: #1a73e8; font-size: 1.2em; }}
        .meta {{ color: #666; font-size: 0.9em; margin: 10px 0; }}
        .meta span {{ margin-right: 15px; }}
        .abstract {{ color: #444; line-height: 1.6; margin-top: 10px; padding: 10px; background: #f9f9f9; border-radius: 4px; }}
        .links a {{ color: #4CAF50; margin-right: 15px; text-decoration: none; }}
        .links a:hover {{ text-decoration: underline; }}
        .score {{ background: #e8f5e9; padding: 3px 8px; border-radius: 3px; font-size: 0.85em; }}
    </style>
</head>
<body>
    <h1>📚 Research Papers: {query}</h1>
    <p>Exported: {datetime.now().strftime('%Y-%m-%d %H:%M')} | Total: {len(papers)} papers</p>
"""
        for i, p in enumerate(papers, 1):
            html += f"""
    <div class="paper">
        <h2>{i}. {p.title}</h2>
        <div class="meta">
            <span>👥 {', '.join(p.authors[:3])}{'...' if len(p.authors) > 3 else ''}</span>
            <span>📅 {p.year or 'N/A'}</span>
            <span>📖 {p.venue or 'N/A'}</span>
            <span>📊 {p.citations or 0} citations</span>
            <span class="score">Score: {p.combined_score:.2f}</span>
        </div>
        <div class="links">
            {f'<a href="{p.pdf_url}" target="_blank">📄 PDF</a>' if p.pdf_url else ''}
            {f'<a href="https://doi.org/{p.doi}" target="_blank">🔗 DOI</a>' if p.doi else ''}
            {f'<a href="{p.url}" target="_blank">🌐 Link</a>' if p.url else ''}
        </div>
        <div class="abstract">{p.abstract[:400] + '...' if p.abstract and len(p.abstract) > 400 else p.abstract or 'No abstract'}</div>
    </div>"""
        
        html += "\n</body>\n</html>"
        return html
    
    def _to_text(self, papers: List[Paper], query: str) -> str:
        lines = [f"Research Papers: {query}", f"Total: {len(papers)}", "=" * 60, ""]
        for i, p in enumerate(papers, 1):
            lines.append(f"{i}. {p.title}")
            lines.append(f"   Authors: {', '.join(p.authors[:5])}")
            lines.append(f"   Year: {p.year} | Venue: {p.venue} | Citations: {p.citations or 'N/A'}")
            if p.pdf_url:
                lines.append(f"   PDF: {p.pdf_url}")
            lines.append("")
        return "\n".join(lines)


# ============================================================================
# TOOL 5: Analysis Tool
# ============================================================================

class PaperAnalysisTool(Tool):
    """Analyze the collected papers."""
    
    name = "analyze_papers"
    description = """Analyze the collected papers and generate statistics.
    
Args:
    analysis_type: Type of analysis:
        - "summary": Overall summary statistics
        - "trends": Year-over-year trends
        - "authors": Top authors analysis
        - "venues": Top venues analysis
        - "topics": Topic/keyword extraction
        - "all": Complete analysis

Returns:
    Analysis results.
"""
    inputs = {
        "analysis_type": {"type": "string", "description": "Analysis type: summary, trends, authors, venues, topics, all", "nullable": True},
    }
    output_type = "string"
    
    def forward(self, analysis_type: str = "summary") -> str:
        papers = paper_store.papers
        
        if not papers:
            return "No papers to analyze. Run paper_search first."
        
        analysis_type = analysis_type.lower()
        
        if analysis_type == "all":
            return "\n\n".join([
                self._summary(papers),
                self._trends(papers),
                self._authors(papers),
                self._venues(papers),
                self._topics(papers),
            ])
        elif analysis_type == "summary":
            return self._summary(papers)
        elif analysis_type == "trends":
            return self._trends(papers)
        elif analysis_type == "authors":
            return self._authors(papers)
        elif analysis_type == "venues":
            return self._venues(papers)
        elif analysis_type == "topics":
            return self._topics(papers)
        else:
            return f"Unknown analysis type: {analysis_type}"
    
    def _summary(self, papers: List[Paper]) -> str:
        years = [p.year for p in papers if p.year]
        citations = [p.citations for p in papers if p.citations]
        sources = {}
        for p in papers:
            sources[p.source] = sources.get(p.source, 0) + 1
        
        lines = [
            "## 📊 Summary Statistics",
            f"- Total papers: {len(papers)}",
            f"- Year range: {min(years) if years else 'N/A'} - {max(years) if years else 'N/A'}",
            f"- Average citations: {sum(citations)/len(citations):.1f}" if citations else "- Citations: N/A",
            f"- Total citations: {sum(citations)}" if citations else "",
            "- Sources: " + ", ".join(f"{k}: {v}" for k, v in sorted(sources.items(), key=lambda x: -x[1])),
        ]
        return "\n".join(lines)
    
    def _trends(self, papers: List[Paper]) -> str:
        by_year = {}
        for p in papers:
            if p.year:
                by_year[p.year] = by_year.get(p.year, 0) + 1
        
        lines = ["## 📈 Publication Trends"]
        for year in sorted(by_year.keys(), reverse=True):
            bar = "█" * min(by_year[year], 30)
            lines.append(f"{year}: {bar} ({by_year[year]})")
        return "\n".join(lines)
    
    def _authors(self, papers: List[Paper]) -> str:
        author_count = {}
        for p in papers:
            for author in p.authors:
                author_count[author] = author_count.get(author, 0) + 1
        
        top_authors = sorted(author_count.items(), key=lambda x: -x[1])[:15]
        
        lines = ["## 👥 Top Authors"]
        for author, count in top_authors:
            lines.append(f"- {author}: {count} papers")
        return "\n".join(lines)
    
    def _venues(self, papers: List[Paper]) -> str:
        venue_count = {}
        for p in papers:
            if p.venue:
                venue_count[p.venue] = venue_count.get(p.venue, 0) + 1
        
        top_venues = sorted(venue_count.items(), key=lambda x: -x[1])[:10]
        
        lines = ["## 📖 Top Venues"]
        for venue, count in top_venues:
            lines.append(f"- {venue[:50]}: {count} papers")
        return "\n".join(lines)
    
    def _topics(self, papers: List[Paper]) -> str:
        # Simple keyword extraction
        stopwords = {'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 
                    'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been',
                    'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
                    'could', 'should', 'may', 'might', 'can', 'this', 'that', 'these',
                    'those', 'it', 'its', 'as', 'we', 'our', 'using', 'based', 'via'}
        
        word_freq = {}
        for p in papers:
            words = re.findall(r'\b[a-z]{3,}\b', p.title.lower())
            for word in words:
                if word not in stopwords:
                    word_freq[word] = word_freq.get(word, 0) + 1
        
        top_words = sorted(word_freq.items(), key=lambda x: -x[1])[:20]
        
        lines = ["## 🏷️ Top Keywords"]
        for word, count in top_words:
            lines.append(f"- {word}: {count}")
        return "\n".join(lines)


# ============================================================================
# TOOL 6: Visualization Tool
# ============================================================================

class VisualizationTool(Tool):
    """Generate visualizations for paper analysis."""
    
    name = "visualize_papers"
    description = """Generate visualization HTML for papers.
    
Args:
    viz_type: Visualization type:
        - "timeline": Papers over time
        - "sources": Distribution by source
        - "citations": Citation distribution
        - "wordcloud": Keyword visualization
        - "dashboard": Complete dashboard
    filename: Output HTML filename

Returns:
    Path to generated visualization.
"""
    inputs = {
        "viz_type": {"type": "string", "description": "Viz type: timeline, sources, citations, wordcloud, dashboard", "nullable": True},
        "filename": {"type": "string", "description": "Output HTML filename", "nullable": True},
    }
    output_type = "string"
    
    def forward(self, viz_type: str = "dashboard", filename: str = None) -> str:
        papers = paper_store.papers
        query = paper_store.query
        
        if not papers:
            return "No papers to visualize. Run paper_search first."
        
        filename = filename or f"viz_{viz_type}.html"
        
        # Generate data
        by_year = {}
        by_source = {}
        citations = []
        keywords = {}
        
        for p in papers:
            if p.year:
                by_year[p.year] = by_year.get(p.year, 0) + 1
            by_source[p.source] = by_source.get(p.source, 0) + 1
            if p.citations:
                citations.append(p.citations)
            for word in re.findall(r'\b[a-z]{4,}\b', p.title.lower()):
                if word not in {'with', 'from', 'using', 'based', 'that', 'this', 'have', 'been'}:
                    keywords[word] = keywords.get(word, 0) + 1
        
        top_keywords = sorted(keywords.items(), key=lambda x: -x[1])[:30]
        
        html = self._generate_dashboard(query, papers, by_year, by_source, citations, top_keywords)
        
        with open(filename, 'w') as f:
            f.write(html)
        
        return f"✓ Generated visualization: {filename}"
    
    def _generate_dashboard(self, query, papers, by_year, by_source, citations, keywords) -> str:
        years = sorted(by_year.keys())
        year_counts = [by_year[y] for y in years]
        sources = list(by_source.keys())
        source_counts = [by_source[s] for s in sources]
        
        return f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Research Dashboard: {query}</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        * {{ box-sizing: border-box; }}
        body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; }}
        .container {{ max-width: 1400px; margin: 0 auto; }}
        h1 {{ color: white; text-align: center; margin-bottom: 30px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }}
        .stats {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }}
        .stat-card {{ background: white; padding: 20px; border-radius: 12px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }}
        .stat-card h3 {{ margin: 0; color: #666; font-size: 0.9em; }}
        .stat-card .value {{ font-size: 2.5em; font-weight: bold; color: #667eea; margin: 10px 0; }}
        .charts {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 20px; margin-bottom: 30px; }}
        .chart-card {{ background: white; padding: 20px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }}
        .chart-card h3 {{ margin-top: 0; color: #333; }}
        .keywords {{ background: white; padding: 20px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }}
        .keywords h3 {{ margin-top: 0; }}
        .keyword-cloud {{ display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; }}
        .keyword {{ padding: 5px 15px; border-radius: 20px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; }}
        .papers-list {{ background: white; padding: 20px; border-radius: 12px; margin-top: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); max-height: 500px; overflow-y: auto; }}
        .paper-item {{ padding: 15px; border-bottom: 1px solid #eee; }}
        .paper-item:last-child {{ border-bottom: none; }}
        .paper-title {{ font-weight: bold; color: #333; }}
        .paper-meta {{ color: #666; font-size: 0.9em; margin-top: 5px; }}
    </style>
</head>
<body>
    <div class="container">
        <h1>📚 Research Dashboard: {query}</h1>
        
        <div class="stats">
            <div class="stat-card">
                <h3>Total Papers</h3>
                <div class="value">{len(papers)}</div>
            </div>
            <div class="stat-card">
                <h3>Sources</h3>
                <div class="value">{len(by_source)}</div>
            </div>
            <div class="stat-card">
                <h3>Year Range</h3>
                <div class="value">{min(years) if years else 'N/A'}-{max(years) if years else ''}</div>
            </div>
            <div class="stat-card">
                <h3>Avg Citations</h3>
                <div class="value">{sum(citations)//len(citations) if citations else 0}</div>
            </div>
        </div>
        
        <div class="charts">
            <div class="chart-card">
                <h3>📈 Publications Over Time</h3>
                <canvas id="timelineChart"></canvas>
            </div>
            <div class="chart-card">
                <h3>📊 Papers by Source</h3>
                <canvas id="sourcesChart"></canvas>
            </div>
        </div>
        
        <div class="keywords">
            <h3>🏷️ Top Keywords</h3>
            <div class="keyword-cloud">
                {"".join(f'<span class="keyword" style="font-size: {min(1 + count/5, 2)}em">{word}</span>' for word, count in keywords[:20])}
            </div>
        </div>
        
        <div class="papers-list">
            <h3>📄 Top Papers</h3>
            {"".join(f'''<div class="paper-item">
                <div class="paper-title">{p.title[:100]}{"..." if len(p.title) > 100 else ""}</div>
                <div class="paper-meta">👥 {", ".join(p.authors[:3])} | 📅 {p.year or "N/A"} | 📊 {p.citations or 0} citations</div>
            </div>''' for p in papers[:20])}
        </div>
    </div>
    
    <script>
        new Chart(document.getElementById('timelineChart'), {{
            type: 'bar',
            data: {{
                labels: {list(years)},
                datasets: [{{
                    label: 'Papers',
                    data: {year_counts},
                    backgroundColor: 'rgba(102, 126, 234, 0.8)',
                    borderRadius: 5,
                }}]
            }},
            options: {{ responsive: true, plugins: {{ legend: {{ display: false }} }} }}
        }});
        
        new Chart(document.getElementById('sourcesChart'), {{
            type: 'doughnut',
            data: {{
                labels: {sources},
                datasets: [{{
                    data: {source_counts},
                    backgroundColor: ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe'],
                }}]
            }},
            options: {{ responsive: true }}
        }});
    </script>
</body>
</html>"""


# ============================================================================
# TOOL 7: Web Search Tool (for supplementary info)
# ============================================================================

class WebSearchTool(Tool):
    """Search the web for additional context."""
    
    name = "web_search"
    description = """Search the web for additional information about papers or topics.
    
Args:
    query: Search query

Returns:
    Web search results.
"""
    inputs = {
        "query": {"type": "string", "description": "Search query"},
    }
    output_type = "string"
    
    def forward(self, query: str) -> str:
        try:
            from smolagents import DuckDuckGoSearchTool
            tool = DuckDuckGoSearchTool()
            return tool.forward(query)
        except Exception as e:
            return f"Web search unavailable: {e}"


# ============================================================================
# MAIN: Create Research Pipeline
# ============================================================================

def create_research_pipeline(model, verbose: bool = False):
    """
    Create a complete multi-agent research pipeline.
    
    Architecture:
    - Orchestrator (CodeAgent): Coordinates all agents, handles parallel execution
    - Paper Search Agent: Searches academic databases
    - Analysis Agent: Analyzes and sorts papers
    - Export Agent: Exports results in various formats
    - Web Agent: Supplementary web searches
    
    Args:
        model: LLM model to use
        verbose: Whether to print agent actions
    
    Returns:
        CodeAgent orchestrator
    """
    
    # Agent 1: Paper Search Agent
    paper_search_agent = ToolCallingAgent(
        tools=[PaperSearchTool()],
        model=model,
        name="paper_search_agent",
        description="""Searches academic papers across arXiv, Semantic Scholar, OpenAlex, and DBLP.
        
Use this agent to find papers on a topic. Example:
- "Search for papers about world models in reinforcement learning"
- "Find papers on diffusion policy from 2023"

Returns a summary of found papers which are stored for analysis/export.""",
    )
    
    # Agent 2: Sorting/Ranking Agent
    sorting_agent = CodeAgent(
        tools=[PaperSortTool()],
        model=model,
        name="sorting_agent",
        description="""Sorts and ranks papers by various criteria.
        
Sorting options:
- "recency": Most recent papers first
- "citations": Most cited papers first
- "similarity": Most relevant to query
- "novelty": Most unique/novel papers
- "combined": Weighted combination

Example: "Sort papers by citations" or "Rank by similarity to the query" """,
        additional_authorized_imports=[
            "json", "os", "re", "time", "datetime", 
            "collections", "itertools", "functools"
        ],
    )
    
    # Agent 3: Analysis Agent
    analysis_agent = ToolCallingAgent(
        tools=[PaperAnalysisTool(), PaperDetailsTool()],
        model=model,
        name="analysis_agent",
        description="""Analyzes papers and provides detailed information.
        
Capabilities:
- Generate statistics (summary, trends, top authors, venues, topics)
- Get detailed information about specific papers

Example: "Analyze publication trends" or "Get details about paper 1" """,
    )
    
    # Agent 4: Export Agent
    export_agent = CodeAgent(
        tools=[PaperExportTool()],
        model=model,
        name="export_agent",
        description="""Exports papers to various formats.
        
Supported formats:
- JSON (.json): Structured data
- CSV (.csv): Spreadsheet format
- BibTeX (.bib): LaTeX citations
- Markdown (.md): Readable document
- HTML (.html): Web page

Example: "Export papers to refs.bib" or "Save results as papers.json" """,
        additional_authorized_imports=[
            "json", "os", "re", "time", "datetime", 
            "collections", "itertools", "functools"
        ],
    )
    
    # Agent 5: Visualization Agent
    viz_agent = CodeAgent(
        tools=[VisualizationTool()],
        model=model,
        name="visualization_agent",
        description="""Generates visualizations and dashboards.
        
Creates interactive HTML dashboards with:
- Publication timeline
- Source distribution
- Citation statistics
- Keyword cloud
- Paper listings

Example: "Create a dashboard" or "Generate visualization" """,
        additional_authorized_imports=[
            "json", "os", "re", "time", "datetime", 
            "collections", "itertools", "functools"
        ],
    )
    
    # Agent 6: Web Agent (optional supplementary searches)
    web_agent = ToolCallingAgent(
        tools=[WebSearchTool()],
        model=model,
        name="web_agent",
        description="""Searches the web for additional context about papers or topics.
        
Use for supplementary information not in academic databases.
Example: "Search web for latest news about transformers" """,
    )
    
    # Orchestrator: CodeAgent that coordinates all agents
    orchestrator = CodeAgent(
        tools=[],  # Orchestrator uses managed agents
        model=model,
        managed_agents=[
            paper_search_agent,
            sorting_agent,
            analysis_agent,
            export_agent,
            viz_agent,
            web_agent,
        ],
        additional_authorized_imports=[
            "json", "os", "re", "time", "datetime", 
            "collections", "itertools", "functools"
        ],
        planning_interval=3,  # Re-plan every 3 steps
    )
    
    return orchestrator


# ============================================================================
# Convenience function for quick setup
# ============================================================================

def quick_research(model, query: str, sort_by: str = "relevance", 
                   export_format: str = "json", max_results: int = 30) -> str:
    """
    Quick one-liner research function.
    
    Args:
        model: LLM model
        query: Search query
        sort_by: Sort criterion
        export_format: Output format (json, csv, bib, html, markdown)
        max_results: Max papers per source
    
    Returns:
        Path to exported file
    """
    pipeline = create_research_pipeline(model)
    
    task = f"""
    1. Use paper_search_agent to search for papers about: "{query}" (max {max_results} per source)
    2. Use sorting_agent to sort papers by "{sort_by}"
    3. Use analysis_agent to generate a summary analysis
    4. Use export_agent to export to "research_results.{export_format}"
    5. Use visualization_agent to create a dashboard "research_dashboard.html"
    
    Return the file paths and a brief summary of findings.
    """
    
    return pipeline.run(task)


# ============================================================================
# Example usage
# ============================================================================

if __name__ == "__main__":
    print("""
╔══════════════════════════════════════════════════════════════════╗
║           Multi-Agent Research Pipeline System                   ║
╠══════════════════════════════════════════════════════════════════╣
║  Agents:                                                         ║
║    • paper_search_agent  - Search academic databases             ║
║    • sorting_agent       - Sort by relevance/citations/etc       ║
║    • analysis_agent      - Analyze trends, authors, topics       ║
║    • export_agent        - Export to JSON/CSV/BibTeX/HTML        ║
║    • visualization_agent - Generate interactive dashboards       ║
║    • web_agent           - Supplementary web searches            ║
╠══════════════════════════════════════════════════════════════════╣
║  Usage:                                                          ║
║    pipeline = create_research_pipeline(model)                    ║
║    result = pipeline.run("Find papers about X, sort by Y, ...")  ║
╚══════════════════════════════════════════════════════════════════╝
    """)
    
    # Example with mock model for testing
    print("\nTo use:")
    print("""
from smolagents import LiteLLMModel
from research_pipeline import create_research_pipeline

model = LiteLLMModel(
    model_id="ollama_chat/qwen2.5:32b",
    api_base="http://10.127.30.115:11434",
    num_ctx=8192
)

pipeline = create_research_pipeline(model)

# Complex research task
result = pipeline.run('''
    1. Search for papers about "world models reinforcement learning" from 2023
    2. Sort by combined score (recency + citations + similarity)
    3. Analyze the top papers - show trends and top authors
    4. Export top 20 papers to:
       - refs.bib (for LaTeX)
       - papers.json (for processing)
       - report.html (for viewing)
    5. Generate a visualization dashboard
''')
print(result)
    """)
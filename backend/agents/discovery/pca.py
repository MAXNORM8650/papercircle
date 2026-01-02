"""
Multi-Agent Research Pipeline with Structured Step Outputs
============================================================

At each step of the multi-agent conversation, this pipeline produces:
1. papers.json - All papers with full details
2. links.json - Structured web links
3. stats.json - Statistics leaderboard
4. summary.json - Structured insights

These files are updated incrementally at each agent step.

Usage:
    pipeline = create_research_pipeline(model, output_dir="research_output")
    result = pipeline.run("Find papers about world models...")
    
    # Check outputs at any time in research_output/
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
from pathlib import Path
import requests

# smolagents imports
from smolagents import Tool, CodeAgent, ToolCallingAgent, WebSearchTool

# Optional imports
try:
    import arxiv
    HAS_ARXIV = True
    # print("arxiv module found.")
except ImportError:
    HAS_ARXIV = False
    print("arxiv module NOT found.")

try:
    from sklearn.feature_extraction.text import TfidfVectorizer
    from sklearn.metrics.pairwise import cosine_similarity
    HAS_SKLEARN = True
    # print("sklearn module found.")
except ImportError:
    HAS_SKLEARN = False
    print("sklearn module NOT found.")

try:
    from sentence_transformers import SentenceTransformer
    HAS_SENTENCE_TRANSFORMERS = True
    print("sentence_transformers module found.")
except ImportError:
    HAS_SENTENCE_TRANSFORMERS = False
    print("sentence_transformers module NOT found.")

try:
    from rank_bm25 import BM25Okapi
    HAS_BM25 = True
    # print("rank_bm25 module found.")
except ImportError:
    HAS_BM25 = False
    print("rank_bm25 module NOT found.")

try:
    from advanced_reranker import AdvancedReranker, RerankerConfig, MultiStageRetriever
    HAS_RERANKER = True
    print("Advanced reranker module found.")
except ImportError:
    HAS_RERANKER = False
    print("Advanced reranker module NOT found.")

import re
import requests
from markdownify import markdownify
from requests.exceptions import RequestException
from smolagents import tool


@tool
def visit_webpage(url: str) -> str:
    """Visits a webpage at the given URL and returns its content as a markdown string.

    Args:
        url: The URL of the webpage to visit.

    Returns:
        The content of the webpage converted to Markdown, or an error message if the request fails.
    """
    try:
        # Send a GET request to the URL
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for bad status codes

        # Convert the HTML content to Markdown
        markdown_content = markdownify(response.text).strip()

        # Remove multiple line breaks
        markdown_content = re.sub(r"\n{3,}", "\n\n", markdown_content)

        return markdown_content

    except RequestException as e:
        return f"Error fetching the webpage: {str(e)}"
    except Exception as e:
        return f"An unexpected error occurred: {str(e)}"
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

    # Database-specific fields
    id: Optional[str] = None
    track: Optional[str] = None
    status: Optional[str] = None
    keywords: Optional[str] = None
    tldr: Optional[str] = None
    primary_area: Optional[str] = None

    # Computed scores
    similarity_score: float = 0.0
    novelty_score: float = 0.0
    recency_score: float = 0.0
    relevance_score: float = 0.0
    bm25_score: float = 0.0
    combined_score: float = 0.0
    rank: int = 0
    
    def to_dict(self) -> dict:
        return asdict(self)
    
    def to_link_entry(self) -> dict:
        """Convert to link structure."""
        return {
            "title": self.title,
            "url": self.url,
            "pdf_url": self.pdf_url,
            "doi_url": f"https://doi.org/{self.doi}" if self.doi else None,
            "source": self.source,
            "year": self.year,
        }
    
    def to_bibtex(self, index: int = 0) -> str:
        first_author = self.authors[0].split()[-1] if self.authors else "unknown"
        cite_key = re.sub(r'[^a-zA-Z0-9]', '', first_author.lower())
        cite_key = f"{cite_key}{self.year or 'xxxx'}_{index}"
        
        entry_type = "article"
        if "arxiv" in self.source.lower():
            entry_type = "misc"
        
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


# ============================================================================
# Pipeline State - Tracks everything and produces structured outputs
# ============================================================================

class PipelineState:
    """
    Maintains state across all agent steps and produces structured outputs.
    
    Outputs at each step:
    - papers.json: All papers with details
    - links.json: Structured web links
    - stats.json: Statistics leaderboard  
    - summary.json: Insights and summary
    - step_log.json: Log of all steps
    """
    
    def __init__(self, output_dir: str = "research_output"):
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)

        # State
        self.papers: List[Paper] = []
        self.query: str = ""
        self.steps: List[Dict] = []
        self.current_step: int = 0
        self.start_time: datetime = datetime.now()

        # Retrieval metrics tracking (per step)
        self.retrieval_metrics: List[Dict] = []
        self.ground_truth_title: str = ""
        self.ground_truth_id: str = ""

        # Statistics tracking
        self.stats = {
            "total_papers": 0,
            "sources": {},
            "year_distribution": {},
            "top_authors": {},
            "top_venues": {},
            "top_keywords": {},
            "citation_stats": {"total": 0, "avg": 0, "max": 0, "min": 0},
            "score_stats": {"avg_similarity": 0, "avg_novelty": 0, "avg_recency": 0},
        }

        # Initialize output files
        self._init_outputs()
    
    def _init_outputs(self):
        """Initialize output files with empty structures."""
        self._save_json("papers.json", {"papers": [], "metadata": self._get_metadata()})
        self._save_json("links.json", {"links": [], "metadata": self._get_metadata()})
        self._save_json("stats.json", {"stats": self.stats, "leaderboard": [], "metadata": self._get_metadata()})
        self._save_json("summary.json", {"summary": {}, "insights": [], "metadata": self._get_metadata()})
        self._save_json("step_log.json", {"steps": [], "metadata": self._get_metadata()})
        self._save_json("retrieval_metrics.json", {"metrics_per_step": [], "metadata": self._get_metadata()})
    
    def _get_metadata(self) -> dict:
        """Get current metadata."""
        return {
            "query": self.query,
            "total_steps": self.current_step,
            "last_updated": datetime.now().isoformat(),
            "started_at": self.start_time.isoformat(),
            "total_papers": len(self.papers),
        }
    
    def _save_json(self, filename: str, data: dict):
        """Save JSON file."""
        filepath = self.output_dir / filename
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False, default=str)
    
    def _save_all_formats(self):
        """Save papers in all formats."""
        # JSON
        self._save_json("papers.json", {
            "papers": [p.to_dict() for p in self.papers],
            "metadata": self._get_metadata()
        })
        
        # CSV with all database fields
        csv_path = self.output_dir / "papers.csv"
        with open(csv_path, 'w', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerow([
                "Rank", "ID", "Title", "Authors", "Year", "Venue", "Track", "Status",
                "Primary Area", "Keywords", "Citations", "BM25 Score", "Combined Score",
                "DOI", "URL", "PDF", "Source", "TLDR", "Abstract"
            ])
            for p in self.papers:
                writer.writerow([
                    p.rank, p.id or "", p.title, "; ".join(p.authors[:5]), p.year, p.venue,
                    p.track or "", p.status or "", p.primary_area or "", p.keywords or "",
                    p.citations or 0, f"{p.bm25_score:.3f}", f"{p.combined_score:.3f}",
                    p.doi or "", p.url, p.pdf_url or "", p.source,
                    p.tldr or "", p.abstract[:300]
                ])
        
        # BibTeX
        bib_path = self.output_dir / "papers.bib"
        with open(bib_path, 'w', encoding='utf-8') as f:
            f.write("\n\n".join(p.to_bibtex(i) for i, p in enumerate(self.papers)))
        
        # Markdown
        md_path = self.output_dir / "papers.md"
        with open(md_path, 'w', encoding='utf-8') as f:
            f.write(f"# Research Papers: {self.query}\n\n")
            f.write(f"Updated: {datetime.now().strftime('%Y-%m-%d %H:%M')}\n")
            f.write(f"Total: {len(self.papers)} papers\n\n---\n\n")
            for p in self.papers:
                f.write(f"## {p.rank}. {p.title}\n\n")
                f.write(f"**Authors:** {', '.join(p.authors[:5])}\n\n")
                f.write(f"**Year:** {p.year} | **Venue:** {p.venue} | **Citations:** {p.citations or 'N/A'} | **Score:** {p.combined_score:.3f}\n\n")
                if p.pdf_url:
                    f.write(f"[PDF]({p.pdf_url}) | ")
                if p.doi:
                    f.write(f"[DOI](https://doi.org/{p.doi})\n\n")
                f.write(f"> {p.abstract[:400]}...\n\n---\n\n")
    
    def log_step(self, agent_name: str, action: str, result: str, details: dict = None):
        """Log an agent step and update all outputs."""
        self.current_step += 1
        
        step_entry = {
            "step": self.current_step,
            "timestamp": datetime.now().isoformat(),
            "agent": agent_name,
            "action": action,
            "result_preview": result[:500] if result else "",
            "details": details or {},
            "papers_count": len(self.papers),
        }
        
        self.steps.append(step_entry)
        
        # Update all outputs
        self._update_all_outputs()
        
        # Print step info
        print(f"\n{'='*70}")
        print(f"📍 STEP {self.current_step}: {agent_name} - {action}")
        print(f"{'='*70}")
        print(f"Papers: {len(self.papers)} | Time: {datetime.now().strftime('%H:%M:%S')}")
        print(f"Output files updated in: {self.output_dir}/")
        print(f"{'='*70}\n")
        
        return step_entry
    
    def _update_all_outputs(self):
        """Update all output files with current state."""
        
        # 1. Update papers.json
        self._save_json("papers.json", {
            "papers": [p.to_dict() for p in self.papers],
            "metadata": self._get_metadata()
        })
        
        # 2. Update links.json
        links_data = {
            "links": {
                "papers": [p.to_link_entry() for p in self.papers],
                "by_source": self._group_links_by_source(),
                "pdfs_only": [{"title": p.title, "pdf": p.pdf_url} for p in self.papers if p.pdf_url],
                "dois_only": [{"title": p.title, "doi": f"https://doi.org/{p.doi}"} for p in self.papers if p.doi],
            },
            "metadata": self._get_metadata()
        }
        self._save_json("links.json", links_data)
        
        # 3. Update stats.json
        self._update_stats()
        stats_data = {
            "stats": self.stats,
            "leaderboard": self._generate_leaderboard(),
            "metadata": self._get_metadata()
        }
        self._save_json("stats.json", stats_data)
        
        # 4. Update summary.json
        summary_data = {
            "summary": self._generate_summary(),
            "insights": self._generate_insights(),
            "key_findings": self._generate_key_findings(),
            "metadata": self._get_metadata()
        }
        self._save_json("summary.json", summary_data)
        
        # 5. Update step_log.json
        self._save_json("step_log.json", {
            "steps": self.steps,
            "current_step": self.current_step,
            "metadata": self._get_metadata()
        })
        
        # 6. Save all formats
        self._save_all_formats()
        
        # 7. Generate HTML dashboard
        self._generate_dashboard()
    
    def _group_links_by_source(self) -> dict:
        """Group paper links by source."""
        by_source = {}
        for p in self.papers:
            if p.source not in by_source:
                by_source[p.source] = []
            by_source[p.source].append(p.to_link_entry())
        return by_source
    
    def _update_stats(self):
        """Update statistics from current papers."""
        if not self.papers:
            return
        
        self.stats["total_papers"] = len(self.papers)
        
        # Source distribution
        sources = {}
        for p in self.papers:
            sources[p.source] = sources.get(p.source, 0) + 1
        self.stats["sources"] = sources
        
        # Year distribution
        years = {}
        for p in self.papers:
            if p.year:
                years[p.year] = years.get(p.year, 0) + 1
        self.stats["year_distribution"] = dict(sorted(years.items(), reverse=True))
        
        # Top authors
        authors = {}
        for p in self.papers:
            for author in p.authors:
                authors[author] = authors.get(author, 0) + 1
        self.stats["top_authors"] = dict(sorted(authors.items(), key=lambda x: -x[1])[:20])
        
        # Top venues
        venues = {}
        for p in self.papers:
            if p.venue:
                venues[p.venue] = venues.get(p.venue, 0) + 1
        self.stats["top_venues"] = dict(sorted(venues.items(), key=lambda x: -x[1])[:15])
        
        # Keywords
        stopwords = {'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
                    'of', 'with', 'by', 'from', 'is', 'are', 'using', 'based', 'via', 'its'}
        keywords = {}
        for p in self.papers:
            words = re.findall(r'\b[a-z]{4,}\b', p.title.lower())
            for word in words:
                if word not in stopwords:
                    keywords[word] = keywords.get(word, 0) + 1
        self.stats["top_keywords"] = dict(sorted(keywords.items(), key=lambda x: -x[1])[:30])
        
        # Citation stats
        citations = [p.citations for p in self.papers if p.citations]
        if citations:
            self.stats["citation_stats"] = {
                "total": sum(citations),
                "avg": round(sum(citations) / len(citations), 1),
                "max": max(citations),
                "min": min(citations),
                "median": sorted(citations)[len(citations)//2]
            }
        
        # Score stats
        if self.papers:
            self.stats["score_stats"] = {
                "avg_similarity": round(sum(p.similarity_score for p in self.papers) / len(self.papers), 3),
                "avg_novelty": round(sum(p.novelty_score for p in self.papers) / len(self.papers), 3),
                "avg_recency": round(sum(p.recency_score for p in self.papers) / len(self.papers), 3),
                "avg_bm25": round(sum(p.bm25_score for p in self.papers) / len(self.papers), 3),
                "avg_combined": round(sum(p.combined_score for p in self.papers) / len(self.papers), 3),
            }
    
    def _generate_leaderboard(self) -> List[dict]:
        """Generate paper leaderboard."""
        leaderboard = []
        for i, p in enumerate(self.papers, 1):
            leaderboard.append({
                "rank": i,
                "title": p.title[:80],
                "year": p.year,
                "citations": p.citations or 0,
                "combined_score": round(p.combined_score, 3),
                "similarity_score": round(p.similarity_score, 3),
                "novelty_score": round(p.novelty_score, 3),
                "recency_score": round(p.recency_score, 3),
                "bm25_score": round(p.bm25_score, 3),
                "source": p.source,
                "has_pdf": bool(p.pdf_url),
            })
        return leaderboard
    
    def _generate_summary(self) -> dict:
        """Generate structured summary."""
        if not self.papers:
            return {"status": "No papers collected yet"}
        
        years = [p.year for p in self.papers if p.year]
        citations = [p.citations for p in self.papers if p.citations]
        
        return {
            "query": self.query,
            "total_papers": len(self.papers),
            "unique_sources": len(self.stats["sources"]),
            "year_range": {
                "min": min(years) if years else None,
                "max": max(years) if years else None,
            },
            "citation_summary": {
                "total": sum(citations) if citations else 0,
                "average": round(sum(citations) / len(citations), 1) if citations else 0,
            },
            "top_source": max(self.stats["sources"].items(), key=lambda x: x[1])[0] if self.stats["sources"] else None,
            "papers_with_pdf": sum(1 for p in self.papers if p.pdf_url),
            "papers_with_doi": sum(1 for p in self.papers if p.doi),
            "processing_steps": self.current_step,
        }
    
    def _generate_insights(self) -> List[dict]:
        """Generate insights from the data."""
        insights = []
        
        if not self.papers:
            return [{"type": "info", "message": "No papers collected yet. Run a search first."}]
        
        # Insight 1: Publication trend
        years = self.stats["year_distribution"]
        if years:
            recent_year = max(years.keys())
            insights.append({
                "type": "trend",
                "title": "Publication Trend",
                "message": f"Most papers ({years[recent_year]}) are from {recent_year}",
                "data": {"year": recent_year, "count": years[recent_year]}
            })
        
        # Insight 2: Top source
        sources = self.stats["sources"]
        if sources:
            top_source = max(sources.items(), key=lambda x: x[1])
            insights.append({
                "type": "source",
                "title": "Primary Source",
                "message": f"{top_source[0]} contributes {top_source[1]} papers ({100*top_source[1]//len(self.papers)}%)",
                "data": {"source": top_source[0], "count": top_source[1]}
            })
        
        # Insight 3: Prolific author
        authors = self.stats["top_authors"]
        if authors:
            top_author = list(authors.items())[0]
            insights.append({
                "type": "author",
                "title": "Prolific Author",
                "message": f"{top_author[0]} has {top_author[1]} papers in this collection",
                "data": {"author": top_author[0], "count": top_author[1]}
            })
        
        # Insight 4: Citation leader
        if self.papers:
            top_cited = max(self.papers, key=lambda p: p.citations or 0)
            if top_cited.citations:
                insights.append({
                    "type": "citation",
                    "title": "Most Cited Paper",
                    "message": f'"{top_cited.title}..." has {top_cited.citations} citations',
                    "data": {"title": top_cited.title, "citations": top_cited.citations}
                })
        
        # Insight 5: Hot keywords
        keywords = list(self.stats["top_keywords"].items())[:5]
        if keywords:
            insights.append({
                "type": "keywords",
                "title": "Hot Topics",
                "message": f"Top keywords: {', '.join(k[0] for k in keywords)}",
                "data": {"keywords": dict(keywords)}
            })
        
        # Insight 6: PDF availability
        pdf_count = sum(1 for p in self.papers if p.pdf_url)
        insights.append({
            "type": "availability",
            "title": "Open Access",
            "message": f"{pdf_count}/{len(self.papers)} papers ({100*pdf_count//len(self.papers)}%) have direct PDF links",
            "data": {"with_pdf": pdf_count, "total": len(self.papers)}
        })
        
        return insights
    
    def _generate_key_findings(self) -> List[str]:
        """Generate human-readable key findings."""
        findings = []
        
        if not self.papers:
            return ["No papers collected yet."]
        
        findings.append(f"Found {len(self.papers)} papers related to '{self.query}'")
        
        sources = self.stats["sources"]
        if sources:
            findings.append(f"Papers collected from {len(sources)} sources: {', '.join(sources.keys())}")
        
        years = self.stats["year_distribution"]
        if years:
            findings.append(f"Publication years range from {min(years.keys())} to {max(years.keys())}")
        
        citations = [p.citations for p in self.papers if p.citations]
        if citations:
            findings.append(f"Total citations: {sum(citations)}, Average: {sum(citations)//len(citations)}")
        
        top_authors = list(self.stats["top_authors"].keys())[:3]
        if top_authors:
            findings.append(f"Leading researchers: {', '.join(top_authors)}")
        
        return findings
    
    def _generate_dashboard(self):
        """Generate interactive HTML dashboard."""
        years = sorted(self.stats["year_distribution"].keys()) if self.stats["year_distribution"] else []
        year_counts = [self.stats["year_distribution"].get(y, 0) for y in years]
        sources = list(self.stats["sources"].keys())
        source_counts = [self.stats["sources"].get(s, 0) for s in sources]
        keywords = list(self.stats["top_keywords"].items())[:25]
        
        html = f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="10">
    <title>Research Dashboard: {self.query}</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        * {{ box-sizing: border-box; margin: 0; padding: 0; }}
        body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color: #e2e8f0; min-height: 100vh; padding: 20px; }}
        .container {{ max-width: 1600px; margin: 0 auto; }}
        header {{ text-align: center; padding: 20px; margin-bottom: 30px; }}
        header h1 {{ font-size: 2em; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }}
        .meta {{ color: #94a3b8; margin-top: 10px; font-size: 0.9em; }}
        .grid {{ display: grid; gap: 20px; }}
        .grid-4 {{ grid-template-columns: repeat(4, 1fr); }}
        .grid-2 {{ grid-template-columns: repeat(2, 1fr); }}
        .grid-3 {{ grid-template-columns: repeat(3, 1fr); }}
        .card {{ background: #1e293b; border-radius: 12px; padding: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.3); }}
        .stat-card {{ text-align: center; }}
        .stat-card .value {{ font-size: 2.5em; font-weight: bold; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }}
        .stat-card .label {{ color: #94a3b8; margin-top: 5px; }}
        .card h3 {{ color: #f1f5f9; margin-bottom: 15px; display: flex; align-items: center; gap: 10px; }}
        .step-log {{ max-height: 300px; overflow-y: auto; }}
        .step {{ padding: 10px; border-left: 3px solid #667eea; margin: 10px 0; background: #0f172a; border-radius: 0 8px 8px 0; }}
        .step .agent {{ color: #667eea; font-weight: bold; }}
        .step .time {{ color: #64748b; font-size: 0.8em; }}
        .leaderboard {{ max-height: 400px; overflow-y: auto; }}
        .leaderboard table {{ width: 100%; border-collapse: collapse; }}
        .leaderboard th {{ text-align: left; padding: 10px; color: #94a3b8; border-bottom: 1px solid #334155; position: sticky; top: 0; background: #1e293b; }}
        .leaderboard td {{ padding: 10px; border-bottom: 1px solid #334155; }}
        .leaderboard tr:hover {{ background: #334155; }}
        .rank {{ color: #fbbf24; font-weight: bold; }}
        .score {{ color: #34d399; }}
        .insights {{ display: grid; gap: 15px; }}
        .insight {{ padding: 15px; background: #0f172a; border-radius: 8px; border-left: 4px solid #667eea; }}
        .insight.trend {{ border-color: #34d399; }}
        .insight.citation {{ border-color: #fbbf24; }}
        .insight.author {{ border-color: #f472b6; }}
        .insight h4 {{ color: #f1f5f9; margin-bottom: 5px; }}
        .insight p {{ color: #94a3b8; }}
        .keywords {{ display: flex; flex-wrap: wrap; gap: 10px; }}
        .keyword {{ padding: 5px 12px; background: linear-gradient(135deg, #667eea33, #764ba233); border: 1px solid #667eea55; border-radius: 20px; font-size: 0.9em; }}
        .files {{ display: grid; gap: 10px; }}
        .file {{ display: flex; align-items: center; gap: 10px; padding: 10px; background: #0f172a; border-radius: 8px; }}
        .file-icon {{ font-size: 1.5em; }}
        .file-name {{ color: #f1f5f9; }}
        .file-size {{ color: #64748b; font-size: 0.8em; }}
        @media (max-width: 1200px) {{ .grid-4 {{ grid-template-columns: repeat(2, 1fr); }} .grid-3 {{ grid-template-columns: 1fr; }} }}
        @media (max-width: 768px) {{ .grid-4, .grid-2 {{ grid-template-columns: 1fr; }} }}
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>📚 Research Dashboard</h1>
            <div class="meta">
                Query: <strong>{self.query}</strong> | 
                Step: <strong>{self.current_step}</strong> | 
                Last Updated: <strong>{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</strong>
                <br>Auto-refreshes every 10 seconds
            </div>
        </header>
        
        <div class="grid grid-4" style="margin-bottom: 20px;">
            <div class="card stat-card">
                <div class="value">{len(self.papers)}</div>
                <div class="label">Total Papers</div>
            </div>
            <div class="card stat-card">
                <div class="value">{len(self.stats['sources'])}</div>
                <div class="label">Sources</div>
            </div>
            <div class="card stat-card">
                <div class="value">{self.stats['citation_stats'].get('total', 0)}</div>
                <div class="label">Total Citations</div>
            </div>
            <div class="card stat-card">
                <div class="value">{self.current_step}</div>
                <div class="label">Processing Steps</div>
            </div>
        </div>
        
        <div class="grid grid-2" style="margin-bottom: 20px;">
            <div class="card">
                <h3>📈 Publications Over Time</h3>
                <canvas id="timelineChart"></canvas>
            </div>
            <div class="card">
                <h3>📊 Papers by Source</h3>
                <canvas id="sourceChart"></canvas>
            </div>
        </div>
        
        <div class="grid grid-3" style="margin-bottom: 20px;">
            <div class="card">
                <h3>🏆 Paper Leaderboard</h3>
                <div class="leaderboard">
                    <table>
                        <thead>
                            <tr><th>#</th><th>Title</th><th>Year</th><th>Score</th><th>Cites</th></tr>
                        </thead>
                        <tbody>
                            {"".join(f'''<tr>
                                <td class="rank">{p.rank}</td>
                                <td>{p.title}{"..." if len(p.title) > 50 else ""}</td>
                                <td>{p.year or "N/A"}</td>
                                <td class="score">{p.combined_score:.2f}</td>
                                <td>{p.citations or 0}</td>
                            </tr>''' for p in self.papers[:15])}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div class="card">
                <h3>💡 Insights</h3>
                <div class="insights">
                    {"".join(f'''<div class="insight {i.get('type', '')}">
                        <h4>{i.get('title', '')}</h4>
                        <p>{i.get('message', '')}</p>
                    </div>''' for i in self._generate_insights()[:6])}
                </div>
            </div>
            
            <div class="card">
                <h3>📝 Step Log</h3>
                <div class="step-log">
                    {"".join(f'''<div class="step">
                        <span class="agent">{s['agent']}</span>: {s['action']}
                        <div class="time">Step {s['step']} - {s['timestamp'][11:19]}</div>
                    </div>''' for s in reversed(self.steps[-10:]))}
                </div>
            </div>
        </div>
        
        <div class="grid grid-2">
            <div class="card">
                <h3>🏷️ Top Keywords</h3>
                <div class="keywords">
                    {"".join(f'<span class="keyword" style="font-size: {min(0.8 + count/10, 1.4)}em">{word} ({count})</span>' for word, count in keywords)}
                </div>
            </div>
            
            <div class="card">
                <h3>📁 Output Files</h3>
                <div class="files">
                    <div class="file"><span class="file-icon">📄</span><span class="file-name">papers.json</span><span class="file-size">Full paper data</span></div>
                    <div class="file"><span class="file-icon">🔗</span><span class="file-name">links.json</span><span class="file-size">Structured links</span></div>
                    <div class="file"><span class="file-icon">📊</span><span class="file-name">stats.json</span><span class="file-size">Statistics</span></div>
                    <div class="file"><span class="file-icon">💡</span><span class="file-name">summary.json</span><span class="file-size">Insights</span></div>
                    <div class="file"><span class="file-icon">📑</span><span class="file-name">papers.csv</span><span class="file-size">Spreadsheet</span></div>
                    <div class="file"><span class="file-icon">📚</span><span class="file-name">papers.bib</span><span class="file-size">BibTeX</span></div>
                </div>
            </div>
        </div>
    </div>
    
    <script>
        new Chart(document.getElementById('timelineChart'), {{
            type: 'bar',
            data: {{
                labels: {list(years)},
                datasets: [{{ label: 'Papers', data: {year_counts}, backgroundColor: 'rgba(102, 126, 234, 0.8)', borderRadius: 5 }}]
            }},
            options: {{ responsive: true, plugins: {{ legend: {{ display: false }} }} }}
        }});
        
        new Chart(document.getElementById('sourceChart'), {{
            type: 'doughnut',
            data: {{
                labels: {sources},
                datasets: [{{ data: {source_counts}, backgroundColor: ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'] }}]
            }},
            options: {{ responsive: true }}
        }});
    </script>
</body>
</html>"""
        
        with open(self.output_dir / "dashboard.html", 'w') as f:
            f.write(html)
    
    def add_papers(self, papers: List[Paper], auto_rank: bool = True):
        """Add papers to the collection (with deduplication and optional auto-ranking)."""
        papers_before = len(self.papers)
        existing_titles = {re.sub(r'[^a-z0-9]', '', p.title.lower()) for p in self.papers}

        for paper in papers:
            norm_title = re.sub(r'[^a-z0-9]', '', paper.title.lower())
            if norm_title not in existing_titles:
                self.papers.append(paper)
                existing_titles.add(norm_title)

        papers_added = len(self.papers) - papers_before

        # Auto-rank by BM25 score if enabled
        if auto_rank and self.papers:
            # Sort by BM25 score (highest first)
            self.papers.sort(key=lambda p: p.bm25_score, reverse=True)

        # Update ranks
        for i, p in enumerate(self.papers, 1):
            p.rank = i

        # Calculate retrieval metrics if ground truth is set
        if self.ground_truth_title or self.ground_truth_id:
            self._calculate_step_metrics()

        print(f"[Pipeline] Added {papers_added} new papers (total: {len(self.papers)})")
        return papers_added

    def _calculate_step_metrics(self):
        """Calculate retrieval metrics at current step."""
        if not self.papers:
            return

        # Find relevant paper rank
        relevant_rank = None
        for i, paper in enumerate(self.papers, 1):
            # Match by ID
            if self.ground_truth_id and paper.id == self.ground_truth_id:
                relevant_rank = i
                break

            # Match by title
            if self.ground_truth_title:
                paper_title_norm = re.sub(r'[^a-z0-9]', '', paper.title.lower())
                gt_title_norm = re.sub(r'[^a-z0-9]', '', self.ground_truth_title.lower())
                if paper_title_norm == gt_title_norm or gt_title_norm in paper_title_norm:
                    if len(gt_title_norm) > 20:
                        relevant_rank = i
                        break

        # Calculate metrics
        metrics = {
            "step": self.current_step,
            "timestamp": datetime.now().isoformat(),
            "total_papers": len(self.papers),
            "found": relevant_rank is not None,
            "rank": relevant_rank,
            "mrr": 1.0 / relevant_rank if relevant_rank else 0.0,
        }

        # Recall@K and Hit Rate@K
        for k in [1, 5, 10, 20, 50]:
            hit = relevant_rank is not None and relevant_rank <= k
            metrics[f"recall@{k}"] = 1.0 if hit else 0.0
            metrics[f"hit@{k}"] = 1.0 if hit else 0.0

        self.retrieval_metrics.append(metrics)

        # Save to file
        self._save_json("retrieval_metrics.json", {
            "metrics_per_step": self.retrieval_metrics,
            "ground_truth": {
                "title": self.ground_truth_title,
                "id": self.ground_truth_id
            },
            "metadata": self._get_metadata()
        })

        return metrics
    
    def get_structured_output(self) -> dict:
        """Get current structured output."""
        return {
            "papers": {
                "total": len(self.papers),
                "data": [p.to_dict() for p in self.papers]
            },
            "links": {
                "all": [p.to_link_entry() for p in self.papers],
                "pdfs": [{"title": p.title, "url": p.pdf_url} for p in self.papers if p.pdf_url],
            },
            "stats": self.stats,
            "leaderboard": self._generate_leaderboard(),
            "summary": self._generate_summary(),
            "insights": self._generate_insights(),
            "step": self.current_step,
        }


# Global pipeline state
pipeline_state = PipelineState()


# ============================================================================
# Search Engine
# ============================================================================

class OfflinePaperSearchEngine:
    """Search papers from local database folder with BM25 and semantic ranking."""

    def __init__(self, database_path: str = "./research_output/database",
                 use_semantic: bool = False, use_bm25: bool = True, use_cache: bool = False,
                 use_reranker: bool = False, reranker_backend: str = "vllm",
                 reranker_model: str = "Qwen/Qwen3-Reranker-0.6B", first_stage_k: int = 200):
        self.database_path = Path(database_path)
        self.use_semantic = use_semantic and HAS_SENTENCE_TRANSFORMERS
        self.use_bm25 = use_bm25 and HAS_BM25
        self.use_cache = use_cache

        # Reranker configuration
        self.use_reranker = use_reranker and HAS_RERANKER
        self.first_stage_k = first_stage_k
        self.reranker = None
        self.multi_stage_retriever = None

        print(f"[Offline] Initializing search engine")
        print(f"[Offline] Database: {self.database_path}")
        print(f"[Offline] Cache: {'DISABLED' if not use_cache else 'ENABLED'}")
        print(f"[Offline] Ranking: {'BM25' if self.use_bm25 else 'Simple'}")

        # Initialize reranker if requested
        if self.use_reranker:
            try:
                reranker_config = RerankerConfig(
                    model_name=reranker_model,
                    backend=reranker_backend,
                    top_n=50
                )
                self.reranker = AdvancedReranker(reranker_config)
                self.multi_stage_retriever = MultiStageRetriever(
                    first_stage_k=first_stage_k,
                    final_top_n=50,
                    reranker_config=reranker_config
                )
                print(f"[Offline] Reranker enabled: {reranker_backend} / {reranker_model}")
            except Exception as e:
                print(f"[Offline] Failed to initialize reranker: {e}")
                self.use_reranker = False
        else:
            print(f"[Offline] Reranker: DISABLED")

        # Pre-computed index cache (disabled by default)
        self.cache_dir = self.database_path / ".cache"
        self.cached_papers = None
        self.cached_paper_index = None
        self.cached_conf_year_index = None
        self.cached_bm25_index = None

        # Skip cache loading - always use direct database access
        # if self.use_cache and self.cache_dir.exists():
        #     self._load_cached_indices()

        # Initialize semantic model if available
        self.semantic_model = None
        if self.use_semantic:
            try:
                print("[Offline] Loading semantic model (all-MiniLM-L6-v2)...")
                self.semantic_model = SentenceTransformer('all-MiniLM-L6-v2')
                print("[Offline] Semantic model loaded successfully")
            except Exception as e:
                print(f"[Offline] Failed to load semantic model: {e}")
                self.use_semantic = False

    def _load_cached_indices(self):
        """Load pre-computed indices from cache (FAST!)"""
        try:
            import pickle

            papers_cache = self.cache_dir / "papers.pkl"
            bm25_cache = self.cache_dir / "bm25_index.pkl"

            if papers_cache.exists():
                print("[Offline] ⚡ Loading pre-computed paper index...")
                with open(papers_cache, 'rb') as f:
                    data = pickle.load(f)
                    self.cached_papers = data['papers']
                    self.cached_paper_index = data['paper_index']
                    self.cached_conf_year_index = data['conf_year_index']
                print(f"[Offline] ✅ Loaded {len(self.cached_papers)} papers from cache")

            if bm25_cache.exists() and self.use_bm25:
                print("[Offline] ⚡ Loading pre-computed BM25 index...")
                with open(bm25_cache, 'rb') as f:
                    self.cached_bm25_index = pickle.load(f)
                print("[Offline] ✅ BM25 index loaded")

        except Exception as e:
            print(f"[Offline] Could not load cached indices: {e}")
            print("[Offline] Run 'python build_offline_index.py' to build indices")
            self.cached_papers = None
            self.cached_bm25_index = None

    def search_offline(self, query: str, conferences: List[str] = None,
                      start_year: int = None, end_year: int = None,
                      max_results: int = 50, ranking_method: str = "bm25") -> List[Paper]:
        """
        Search papers from local database with advanced ranking.

        Args:
            query: Search query
            conferences: List of conferences to search
            start_year: Start year filter
            end_year: End_year filter
            max_results: Maximum results to return
            ranking_method: "bm25", "semantic", "hybrid", or "simple"
        """
        # DIRECT DATABASE ACCESS - No cache, always load from JSON
        print(f"[Offline] Loading papers directly from database...")
        all_papers = self._load_papers(conferences, start_year, end_year)

        if not all_papers:
            print("[Offline] No papers loaded")
            return []

        # Choose ranking method
        # Special case: If reranker-only mode (no BM25/semantic), load all papers for direct reranking
        if self.use_reranker and not self.use_bm25 and not self.use_semantic:
            print(f"[Offline] Reranker-only mode: Loading all {len(all_papers)} papers for direct reranking")
            # Create dummy scored papers (score doesn't matter, will be reranked)
            scored_papers = [(1.0, p, conf, file_stem, year) for p, conf, file_stem, year in all_papers]
        elif ranking_method == "bm25" and self.use_bm25:
            scored_papers = self._rank_bm25(query, all_papers)
        elif ranking_method == "semantic" and self.use_semantic:
            scored_papers = self._rank_semantic(query, all_papers)
        elif ranking_method == "hybrid" and (self.use_bm25 or self.use_semantic):
            scored_papers = self._rank_hybrid(query, all_papers)
        else:
            # Fallback to simple term-based ranking
            scored_papers = self._rank_simple(query, all_papers)

        print(f"[Offline] Ranking method: {ranking_method}, Found {len(scored_papers)} relevant papers")

        # Convert to Paper objects
        papers = self._convert_to_papers(scored_papers[:max(max_results * 4, self.first_stage_k) if self.use_reranker else max_results])

        # Apply reranking if enabled
        if self.use_reranker and len(papers) > max_results:
            papers=papers[:4*max_results]  # Limit to top 4x max_results for efficiency
            print(f"[Offline] Applying cross-encoder reranking...")
            start_time = time.time()

            # Convert Papers to dicts for reranker
            papers_dicts = []
            for p in papers:
                papers_dicts.append({
                    'title': p.title,
                    'abstract': p.abstract,
                    'authors': p.authors,
                    'year': p.year,
                    'url': p.url,
                    'bm25_score': p.bm25_score,
                    'keywords': p.keywords or '',
                })

            # Rerank
            reranked_dicts = self.multi_stage_retriever.retrieve(
                query=query,
                first_stage_results=papers_dicts,
                text_field="title_abstract"
            )

            # Convert back to Papers and update scores
            reranked_papers = []
            for i, d in enumerate(reranked_dicts[:max_results], 1):
                # Find original paper
                for p in papers:
                    if p.title == d.get('title'):
                        # Update with rerank score
                        p.combined_score = d.get('rerank_score', p.bm25_score)
                        p.relevance_score = d.get('rerank_score', 0.0)
                        p.rank = i
                        reranked_papers.append(p)
                        break

            elapsed = time.time() - start_time
            print(f"[Offline] Reranking completed: {len(reranked_papers)} papers in {elapsed:.2f}s")

            return reranked_papers
        else:
            # No reranking, just return top results
            return papers[:max_results]

    def _search_with_cache(self, query: str, conferences: List[str] = None,
                          start_year: int = None, end_year: int = None,
                          max_results: int = 50) -> List[Paper]:
        """Fast search using pre-computed indices (10-50x faster!)"""
        print("[Offline] ⚡ Using cached indices for fast search")

        # Step 1: Filter papers by conference/year (FAST - using index)
        candidate_indices = self._filter_cached_papers(conferences, start_year, end_year)

        if not candidate_indices:
            print("[Offline] No papers match filters")
            return []

        print(f"[Offline] Searching {len(candidate_indices)} candidate papers")

        # Step 2: Rank using pre-computed BM25 index (FAST - no re-tokenization)
        tokenized_query = query.lower().split()
        all_scores = self.cached_bm25_index.get_scores(tokenized_query)

        # Extract scores for candidates only
        scored_papers = []
        for idx in candidate_indices:
            score = all_scores[idx]
            if score > 0:
                paper = self.cached_papers[idx].copy()
                paper['score'] = float(score)
                scored_papers.append(paper)

        # Sort by score
        scored_papers.sort(key=lambda x: x['score'], reverse=True)

        print(f"[Offline] ✅ Found {len(scored_papers)} relevant papers")

        # Convert to Paper objects
        results = []
        for paper in scored_papers[:max_results]:
            results.append(Paper(
                title=paper.get('title', ''),
                authors=paper.get('authors', []) if isinstance(paper.get('authors'), list) else [],
                abstract=paper.get('abstract', ''),
                year=paper.get('year', 0),
                citations=0,
                url=paper.get('url', ''),
                source=f"{paper.get('conf', '').upper()} {paper.get('year', '')}",
                pdf_url='',
                venue=paper.get('conf', '').upper(),
                bm25_score=float(paper.get('score', 0.0))
            ))

        return results

    def _filter_cached_papers(self, conferences: List[str] = None,
                             start_year: int = None, end_year: int = None) -> List[int]:
        """Filter papers using pre-computed index (FAST!)"""
        if not (conferences or start_year or end_year):
            # No filters - return all papers
            return list(range(len(self.cached_papers)))

        indices = set()

        # Use pre-computed conf/year index for O(1) lookup
        for (conf, year), paper_indices in self.cached_conf_year_index.items():
            # Check conference filter
            if conferences and conf not in conferences:
                continue

            # Check year filter
            if start_year and year < start_year:
                continue
            if end_year and year > end_year:
                continue

            indices.update(paper_indices)

        return list(indices)

    def _load_papers(self, conferences: List[str] = None, start_year: int = None,
                     end_year: int = None) -> List[Tuple]:
        """Load papers from database with filtering."""
        all_papers = []

        if conferences:
            # Load only specified conferences
            for conf in conferences:
                conf_dir = self.database_path / conf.lower()
                if not conf_dir.exists():
                    print(f"[Offline] Conference directory not found: {conf}")
                    continue

                for json_file in conf_dir.glob("*.json"):
                    try:
                        with open(json_file, 'r', encoding='utf-8') as f:
                            data = json.load(f)
                            if isinstance(data, list):
                                all_papers.extend([(p, conf, json_file.stem) for p in data if isinstance(p, dict)])
                    except Exception as e:
                        print(f"[Offline] Error loading {json_file}: {e}")
        else:
            # Load all conferences
            for conf_dir in self.database_path.iterdir():
                if conf_dir.is_dir():
                    for json_file in conf_dir.glob("*.json"):
                        try:
                            with open(json_file, 'r', encoding='utf-8') as f:
                                data = json.load(f)
                                if isinstance(data, list):
                                    all_papers.extend([(p, conf_dir.name, json_file.stem) for p in data if isinstance(p, dict)])
                        except Exception as e:
                            print(f"[Offline] Error loading {json_file}: {e}")

        print(f"[Offline] Loaded {len(all_papers)} papers from database")

        # Filter by year
        if start_year or end_year:
            filtered_papers = []
            for p, conf, file_stem in all_papers:
                year_match = re.search(r'(\d{4})', file_stem)
                if year_match:
                    year = int(year_match.group(1))
                    if start_year and year < start_year:
                        continue
                    if end_year and year > end_year:
                        continue
                filtered_papers.append((p, conf, file_stem, year if year_match else None))
            all_papers = filtered_papers
        else:
            all_papers = [(p, conf, file_stem, None) for p, conf, file_stem in all_papers]

        print(f"[Offline] After year filtering: {len(all_papers)} papers")
        return all_papers

    def _rank_simple(self, query: str, all_papers: List[Tuple]) -> List[Tuple]:
        """Simple term-based ranking (original method)."""
        query_lower = query.lower()
        query_terms = set(re.findall(r'\b\w+\b', query_lower))

        scored_papers = []
        for p, conf, file_stem, year in all_papers:
            title = p.get("title", "")
            abstract = p.get("abstract", "")
            keywords = p.get("keywords", "")

            score = 0.0

            # Term matching with weights
            title_lower = title.lower()
            title_terms = set(re.findall(r'\b\w+\b', title_lower))
            score += len(query_terms & title_terms) * 3.0

            abstract_lower = abstract.lower()
            abstract_terms = set(re.findall(r'\b\w+\b', abstract_lower))
            score += len(query_terms & abstract_terms) * 1.0

            keywords_lower = keywords.lower()
            keywords_terms = set(re.findall(r'\b\w+\b', keywords_lower))
            score += len(query_terms & keywords_terms) * 2.0

            # Substring matching bonus
            if query_lower in title_lower:
                score += 10.0
            if query_lower in abstract_lower:
                score += 5.0

            if score > 0:
                scored_papers.append((score, p, conf, file_stem, year))

        scored_papers.sort(reverse=True, key=lambda x: x[0])
        return scored_papers

    def _rank_bm25(self, query: str, all_papers: List[Tuple]) -> List[Tuple]:
        """BM25 ranking algorithm."""
        if not HAS_BM25:
            print("[Offline] BM25 not available, falling back to simple ranking")
            return self._rank_simple(query, all_papers)

        # Prepare documents
        documents = []
        for p, conf, file_stem, year in all_papers:
            title = p.get("title", "")
            abstract = p.get("abstract", "")
            keywords = p.get("keywords", "")
            # Combine with title weighted more
            doc = f"{title} {title} {title} {keywords} {keywords} {abstract}"
            documents.append(doc.lower())

        # Tokenize
        tokenized_docs = [doc.split() for doc in documents]

        # Create BM25 object
        bm25 = BM25Okapi(tokenized_docs)

        # Score query
        tokenized_query = query.lower().split()
        scores = bm25.get_scores(tokenized_query)

        # Combine scores with paper data
        scored_papers = []
        for i, score in enumerate(scores):
            if score > 0:
                p, conf, file_stem, year = all_papers[i]
                scored_papers.append((score, p, conf, file_stem, year))

        scored_papers.sort(reverse=True, key=lambda x: x[0])
        return scored_papers

    def _rank_semantic(self, query: str, all_papers: List[Tuple]) -> List[Tuple]:
        """Semantic similarity ranking using sentence transformers."""
        if not self.semantic_model:
            print("[Offline] Semantic model not available, falling back to simple ranking")
            return self._rank_simple(query, all_papers)

        # Prepare texts
        texts = []
        for p, conf, file_stem, year in all_papers:
            title = p.get("title", "")
            abstract = p.get("abstract", "")[:1000]  # Limit abstract length
            text = f"{title}. {abstract}"
            texts.append(text)

        # Encode query and documents
        query_embedding = self.semantic_model.encode([query], show_progress_bar=False)
        doc_embeddings = self.semantic_model.encode(texts, show_progress_bar=False, batch_size=32)

        # Calculate cosine similarity
        from sklearn.metrics.pairwise import cosine_similarity
        similarities = cosine_similarity(query_embedding, doc_embeddings)[0]

        # Combine scores with paper data
        scored_papers = []
        for i, score in enumerate(similarities):
            if score > 0.1:  # Threshold
                p, conf, file_stem, year = all_papers[i]
                scored_papers.append((float(score), p, conf, file_stem, year))

        scored_papers.sort(reverse=True, key=lambda x: x[0])
        return scored_papers

    def _rank_hybrid(self, query: str, all_papers: List[Tuple]) -> List[Tuple]:
        """Hybrid ranking combining BM25 and semantic similarity."""
        bm25_weight = 0.4
        semantic_weight = 0.6

        # Get BM25 scores
        if self.use_bm25:
            bm25_results = self._rank_bm25(query, all_papers)
            bm25_scores = {i: score for i, (score, *_) in enumerate(bm25_results)}
            # Normalize BM25 scores
            max_bm25 = max(bm25_scores.values()) if bm25_scores else 1.0
            bm25_scores = {k: v/max_bm25 for k, v in bm25_scores.items()}
        else:
            bm25_scores = {}
            bm25_weight = 0.0
            semantic_weight = 1.0

        # Get semantic scores
        if self.use_semantic:
            semantic_results = self._rank_semantic(query, all_papers)
            semantic_scores = {i: score for i, (score, *_) in enumerate(semantic_results)}
            # Semantic scores already 0-1 from cosine similarity
        else:
            semantic_scores = {}
            semantic_weight = 0.0
            bm25_weight = 1.0

        # If neither available, fall back to simple
        if not bm25_scores and not semantic_scores:
            return self._rank_simple(query, all_papers)

        # Combine scores
        combined_scores = []
        all_indices = set(bm25_scores.keys()) | set(semantic_scores.keys())

        for i in all_indices:
            bm25_score = bm25_scores.get(i, 0.0)
            semantic_score = semantic_scores.get(i, 0.0)
            combined_score = bm25_weight * bm25_score + semantic_weight * semantic_score

            if combined_score > 0:
                p, conf, file_stem, year = all_papers[i]
                combined_scores.append((combined_score, p, conf, file_stem, year))

        combined_scores.sort(reverse=True, key=lambda x: x[0])
        return combined_scores

    def _convert_to_papers(self, scored_papers: List[Tuple]) -> List[Paper]:
        """Convert scored paper tuples to Paper objects with all database fields."""
        papers = []
        for score, p, conf, file_stem, year in scored_papers:
            # Extract year from filename if not available
            if not year:
                year_match = re.search(r'(\d{4})', file_stem)
                year = int(year_match.group(1)) if year_match else None

            # Extract authors - handle both formats
            author_str = p.get("author", "") or p.get("author_site", "")
            authors = []
            if author_str:
                if ";" in author_str:
                    authors = [a.strip() for a in author_str.split(";") if a.strip()]
                elif "," in author_str:
                    authors = [a.strip() for a in author_str.split(",") if a.strip()]
                else:
                    authors = [author_str.strip()]

            # Extract keywords - handle both string and list formats
            keywords_data = p.get("keywords", "")
            if isinstance(keywords_data, list):
                keywords = "; ".join(keywords_data)
            else:
                keywords = keywords_data

            papers.append(Paper(
                # Core fields
                title=p.get("title", ""),
                authors=authors[:10],
                abstract=p.get("abstract", ""),
                url=p.get("site", "") or p.get("proceeding", "") or "",
                year=year,
                venue=f"{conf.upper()} {year}" if year else conf.upper(),
                doi=None,
                pdf_url=p.get("pdf", ""),
                citations=None,
                source=f"offline_{conf}",
                categories=[],

                # Database-specific fields (from JSON)
                id=p.get("id", ""),
                track=p.get("track", ""),
                status=p.get("status", ""),
                keywords=keywords,
                tldr=p.get("tldr", ""),
                primary_area=p.get("primary_area", ""),

                # Scores
                similarity_score=float(score),
                bm25_score=float(score) if isinstance(score, (int, float)) else 0.0,
            ))

        return papers


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
                    query=query, max_results=max_results,
                    sort_by=arxiv.SortCriterion.SubmittedDate,
                    sort_order=arxiv.SortOrder.Descending
                )
                for result in client.results(search):
                    if result.published.year >= start_year:
                        # Extract authors, filtering out None values
                        author_list = [a.name for a in result.authors[:10] if a.name]
                        papers.append(Paper(
                            title=result.title, authors=author_list,
                            abstract=result.summary, url=result.entry_id, year=result.published.year,
                            venue="arXiv", doi=result.doi, pdf_url=result.pdf_url, source="arxiv",
                            categories=list(result.categories)
                        ))
                return papers
            except Exception as e:
                print(f"[arXiv] Error: {e}")
        
        # Fallback to API
        try:
            params = {"search_query": f"all:{query.replace('\"', '')}", "start": 0,
                     "max_results": max_results, "sortBy": "submittedDate", "sortOrder": "descending"}
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
                
                authors = []
                for a in entry.findall("atom:author", ns)[:10]:
                    name_elem = a.find("atom:name", ns)
                    if name_elem is not None and name_elem.text:
                        authors.append(name_elem.text)
                summary = entry.find("atom:summary", ns)
                abstract = summary.text.strip().replace("\n", " ") if summary is not None else ""
                
                url, pdf_url = "", ""
                for link in entry.findall("atom:link", ns):
                    if link.get("type") == "text/html":
                        url = link.get("href", "")
                    elif link.get("title") == "pdf":
                        pdf_url = link.get("href", "")
                
                papers.append(Paper(title=title, authors=authors, abstract=abstract, url=url,
                                   year=year, venue="arXiv", pdf_url=pdf_url, source="arxiv"))
        except Exception as e:
            print(f"[arXiv API] Error: {e}")
        
        return papers

    def search_semantic_scholar(self, query: str, max_results: int = 30, start_year: int = 2020) -> List[Paper]:
        papers = []
        params = {"query": query, "limit": min(100, max_results), "year": f"{start_year}-",
                 "fields": "title,authors,abstract,url,year,venue,externalIds,citationCount,openAccessPdf"}
        
        try:
            resp = self.session.get("https://api.semanticscholar.org/graph/v1/paper/search",
                                   params=params, timeout=30)
            if resp.status_code == 429:
                time.sleep(3)
                resp = self.session.get("https://api.semanticscholar.org/graph/v1/paper/search",
                                       params=params, timeout=30)
            resp.raise_for_status()
            
            for item in resp.json().get("data", [])[:max_results]:
                title = item.get("title", "")
                if not title:
                    continue
                ext_ids = item.get("externalIds", {}) or {}
                oa_pdf = item.get("openAccessPdf", {}) or {}

                # Extract authors, filtering out None values
                author_list = []
                for a in item.get("authors", [])[:10]:
                    if a:
                        name = a.get("name") or ""
                        if name:
                            author_list.append(name)

                papers.append(Paper(
                    title=title, authors=author_list,
                    abstract=item.get("abstract") or "", url=item.get("url") or "",
                    year=item.get("year"), venue=item.get("venue") or "",
                    doi=ext_ids.get("DOI"), pdf_url=oa_pdf.get("url"),
                    citations=item.get("citationCount"), source="semantic_scholar"
                ))
        except Exception as e:
            print(f"[Semantic Scholar] Error: {e}")
        
        return papers

    def search_openalex(self, query: str, max_results: int = 30, start_year: int = 2020) -> List[Paper]:
        papers = []
        params = {"search": query, "filter": f"publication_year:>{start_year-1}",
                 "per-page": min(50, max_results), "cursor": "*",
                 "sort": "publication_date:desc", "mailto": "research@example.com"}
        
        try:
            resp = self.session.get("https://api.openalex.org/works", params=params, timeout=30)
            resp.raise_for_status()
            
            for item in resp.json().get("results", [])[:max_results]:
                title = item.get("title", "")
                if not title:
                    continue

                # Extract authors, filtering out None values
                authors = []
                for a in item.get("authorships", [])[:10]:
                    if a:
                        author_info = a.get("author", {})
                        if author_info:
                            name = author_info.get("display_name") or ""
                            if name:
                                authors.append(name)

                venue = ""
                loc = item.get("primary_location", {}) or {}
                src = loc.get("source", {}) or {}
                venue = src.get("display_name") or ""

                abstract = ""
                abs_idx = item.get("abstract_inverted_index", {})
                if abs_idx:
                    words = [(pos, word) for word, positions in abs_idx.items() for pos in positions]
                    words.sort()
                    abstract = " ".join(w for _, w in words)[:1500]

                papers.append(Paper(
                    title=title, authors=authors, abstract=abstract, url=item.get("id") or "",
                    year=item.get("publication_year"), venue=venue,
                    doi=(item.get("doi") or "").replace("https://doi.org/", "") or None,
                    pdf_url=item.get("open_access", {}).get("oa_url"),
                    citations=item.get("cited_by_count"), source="openalex"
                ))
        except Exception as e:
            print(f"[OpenAlex] Error: {e}")
        
        return papers

    def search_dblp(self, query: str, max_results: int = 30, start_year: int = 2020) -> List[Paper]:
        papers = []
        
        try:
            resp = self.session.get("https://dblp.org/search/publ/api",
                                   params={"q": query, "h": max_results, "format": "json"}, timeout=30)
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
                authors = []
                if isinstance(authors_data, str):
                    if authors_data:
                        authors = [authors_data]
                elif isinstance(authors_data, dict):
                    text = authors_data.get("text", "")
                    if text:
                        authors = [text]
                else:
                    for a in authors_data[:10]:
                        if isinstance(a, dict):
                            text = a.get("text", "")
                            if text:
                                authors.append(text)
                        elif a:
                            authors.append(str(a))
                
                papers.append(Paper(
                    title=title.rstrip("."), authors=authors, abstract="", url=info.get("url", ""),
                    year=year, venue=info.get("venue", ""), doi=info.get("doi"), source="dblp"
                ))
        except Exception as e:
            print(f"[DBLP] Error: {e}")
        
        return papers

    def search_all(self, query: str, sources: List[str] = None,
                   max_per_source: int = 25, start_year: int = 2020) -> List[Paper]:
        sources = sources or ["arxiv", "semantic_scholar", "openalex", "dblp"]
        source_funcs = {
            "arxiv": self.search_arxiv, "semantic_scholar": self.search_semantic_scholar,
            "openalex": self.search_openalex, "dblp": self.search_dblp,
        }
        
        all_papers = []
        with ThreadPoolExecutor(max_workers=4) as executor:
            futures = {executor.submit(source_funcs[s], query, max_per_source, start_year): s
                      for s in sources if s in source_funcs}
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


search_engine = PaperSearchEngine()
# Initialize offline search engine with reranker enabled by default (if available)
offline_search_engine = OfflinePaperSearchEngine(
    use_reranker=False,  # Enable reranking for better results
    reranker_backend="vllm",  # Use vLLM for fast inference
    reranker_model="Qwen/Qwen3-Reranker-0.6B",
    first_stage_k=200  # Retrieve 200 candidates, rerank to top-50
)


# ============================================================================
# Tools with Structured Output
# ============================================================================

class IntentClassificationTool(Tool):
    """Classify user intent from natural language queries."""

    name = "classify_intent"
    description = """Classify user search intent to determine search mode, filters, and preferences.

Args:
    query: Natural language query to analyze

Returns:
    JSON with classified intent including:
    - search_mode: "online", "offline", or "both"
    - conferences: List of conference names to search
    - start_year: Start year filter
    - end_year: End year filter
    - max_results: Maximum results requested
    - ranking_preferences: Preferred ranking method
"""
    inputs = {
        "query": {
            "type": "string",
            "description": "Natural language query to classify"
        }
    }
    output_type = "string"

    def __init__(self):
        super().__init__()

    def forward(self, query: str) -> str:
        """Parse query and extract intent."""
        query_lower = query.lower()

        # Initialize intent structure
        intent = {
            "search_mode": "both",  # default
            "conferences": [],
            "start_year": None,
            "end_year": None,
            "max_results": None,
            "ranking_preferences": [],
            "keywords": []
        }

        # 1. Detect search mode
        offline_indicators = [
            "offline", "local", "database", "stored", "cached", "indexed",
            "local database", "offline search", "from database"
        ]
        online_indicators = [
            "online", "live", "web", "internet", "arxiv", "semantic scholar",
            "latest", "recent papers", "new papers"
        ]

        has_offline = any(indicator in query_lower for indicator in offline_indicators)
        has_online = any(indicator in query_lower for indicator in online_indicators)

        if has_offline and not has_online:
            intent["search_mode"] = "offline"
        elif has_online and not has_offline:
            intent["search_mode"] = "online"
        elif has_offline and has_online:
            intent["search_mode"] = "both"
        else:
            # Default: if no explicit mode, check for conference mentions (offline) or recency (online)
            conferences_mentioned = any(conf in query_lower for conf in [
                "cvpr", "iccv", "eccv", "nips", "neurips", "iclr", "icml",
                "aaai", "ijcai", "acl", "emnlp", "naacl"
            ])
            if conferences_mentioned:
                intent["search_mode"] = "offline"
            else:
                intent["search_mode"] = "both"

        # 2. Extract conferences
        conference_mappings = {
            'neurips': 'nips', 'nips': 'nips',
            'iclr': 'iclr', 'icml': 'icml',
            'cvpr': 'cvpr', 'iccv': 'iccv', 'eccv': 'eccv',
            'aaai': 'aaai', 'ijcai': 'ijcai',
            'acl': 'acl', 'emnlp': 'emnlp', 'naacl': 'naacl',
            'coling': 'coling', 'aistats': 'aistats',
            'uai': 'uai', 'colt': 'colt', 'acml': 'acml',
            'corl': 'corl', 'rss': 'rss',
            'icra': 'icra', 'iros': 'iros',
            'siggraph': 'siggraph', 'siggraphasia': 'siggraphasia',
            'wacv': 'wacv', 'acmmm': 'acmmm',
            'kdd': 'kdd', 'www': 'www',
            'alt': 'alt', 'automl': 'automl',
            'colm': 'colm', '3dv': '3dv'
        }

        for conf_name, normalized in conference_mappings.items():
            if conf_name in query_lower:
                if normalized not in intent["conferences"]:
                    intent["conferences"].append(normalized)

        # 3. Extract year ranges
        # Pattern: YYYY-YYYY, YYYY to YYYY, from YYYY, since YYYY, until YYYY, YYYY onwards
        year_patterns = [
            (r'(\d{4})\s*-\s*(\d{4})', 'range'),  # 2020-2024
            (r'(\d{4})\s+to\s+(\d{4})', 'range'),  # 2020 to 2024
            (r'from\s+(\d{4})', 'start'),  # from 2020
            (r'since\s+(\d{4})', 'start'),  # since 2020
            (r'after\s+(\d{4})', 'start'),  # after 2020
            (r'until\s+(\d{4})', 'end'),  # until 2024
            (r'before\s+(\d{4})', 'end'),  # before 2024
            (r'in\s+(\d{4})', 'exact'),  # in 2023
        ]

        import re
        for pattern, pattern_type in year_patterns:
            match = re.search(pattern, query_lower)
            if match:
                if pattern_type == 'range':
                    intent["start_year"] = int(match.group(1))
                    intent["end_year"] = int(match.group(2))
                elif pattern_type == 'start':
                    intent["start_year"] = int(match.group(1))
                elif pattern_type == 'end':
                    intent["end_year"] = int(match.group(1))
                elif pattern_type == 'exact':
                    intent["start_year"] = int(match.group(1))
                    intent["end_year"] = int(match.group(1))
                break

        # 4. Extract max results
        result_patterns = [
            r'top\s+(\d+)',
            r'(\d+)\s+papers',
            r'limit\s+(\d+)',
            r'max\s+(\d+)',
            r'first\s+(\d+)'
        ]

        for pattern in result_patterns:
            match = re.search(pattern, query_lower)
            if match:
                intent["max_results"] = int(match.group(1))
                break

        # 5. Detect ranking preferences
        if any(word in query_lower for word in ["recent", "latest", "newest", "new"]):
            intent["ranking_preferences"].append("recency")
        if any(word in query_lower for word in ["cited", "citations", "popular", "influential"]):
            intent["ranking_preferences"].append("citations")
        if any(word in query_lower for word in ["relevant", "similar", "related", "matching"]):
            intent["ranking_preferences"].append("similarity")
        if any(word in query_lower for word in ["novel", "unique", "innovative", "original"]):
            intent["ranking_preferences"].append("novelty")
        if any(word in query_lower for word in ["bm25", "keyword", "term"]):
            intent["ranking_preferences"].append("bm25")

        # Default ranking if none specified
        if not intent["ranking_preferences"]:
            intent["ranking_preferences"] = ["relevance"]

        # 6. Extract core search keywords (remove noise words)
        noise_words = {
            "offline", "online", "search", "find", "papers", "from", "in", "at",
            "the", "a", "an", "and", "or", "of", "to", "for", "with", "by",
            "latest", "recent", "new", "top", "best", "relevant", "related",
            "since", "until", "before", "after", "limit", "max", "first"
        }

        # Remove conference names and years from keywords
        cleaned_query = query_lower
        for conf in intent["conferences"]:
            cleaned_query = cleaned_query.replace(conf, "")
        if intent["start_year"]:
            cleaned_query = cleaned_query.replace(str(intent["start_year"]), "")
        if intent["end_year"]:
            cleaned_query = cleaned_query.replace(str(intent["end_year"]), "")

        words = re.findall(r'\b\w+\b', cleaned_query)
        intent["keywords"] = [w for w in words if w not in noise_words and len(w) > 2]

        return json.dumps(intent, indent=2)


class PaperSearchTool(Tool):
    """Search academic papers with structured output at each step."""

    name = "paper_search"
    description = """Search for academic papers (online or offline). Updates structured outputs (papers.json, links.json, stats.json, summary.json).

IMPORTANT SEARCH MODE LOGIC:
- If query contains "offline:" → ALWAYS use offline database (ignore sources parameter)
- If conferences specified WITHOUT sources → Use offline database
- If sources specified → Use online search
- Default: Try both if unclear

Args:
    query: Search query. Use "offline: <query>" prefix for OFFLINE retrieval from local database.
    max_results: Max papers per source (default: 25 for online, 50 for offline)
    start_year: Filter year (default: 2020)
    end_year: End year filter (for offline searches)
    conferences: Comma-separated conference names (case-insensitive). When specified WITHOUT sources, triggers OFFLINE search.
                Available: nips/neurips, iclr, icml, cvpr, iccv, eccv, aaai, ijcai, acl, emnlp,
                          naacl, coling, aistats, uai, colt, acml, corl, rss, icra, iros,
                          siggraph, wacv, acmmm, kdd, www, alt, automl, colm, 3dv
    sources: Comma-separated list of ONLINE sources: arxiv,semantic_scholar,openalex,dblp
             DO NOT set this parameter for offline searches!

Examples:
- Offline: query="offline: transformers", conferences="iclr", sources=None
- Online: query="transformers", sources="arxiv,semantic_scholar"
- Both: query="transformers" (no conferences or sources)
"""
    inputs = {
        "query": {
            "type": "string",
            "description": "Search query string. Use 'offline: ' prefix for offline database search."
        },
        "max_results": {
            "type": "integer",
            "nullable": True,
            "description": "Maximum number of papers to retrieve. Default: 50 for offline, 100 for online."
        },
        "start_year": {
            "type": "integer",
            "nullable": True,
            "description": "Start year for filtering (e.g., 2020). For year ranges, use BOTH start_year AND end_year. Do NOT use 'year_range' parameter."
        },
        "end_year": {
            "type": "integer",
            "nullable": True,
            "description": "End year for filtering (e.g., 2025). For year ranges, use BOTH start_year AND end_year. Do NOT use 'year_range' parameter."
        },
        "conferences": {
            "type": "string",
            "nullable": True,
            "description": "Comma-separated conference names WITHOUT spaces (e.g., 'iclr,nips,cvpr'). When used WITHOUT 'sources', triggers OFFLINE search. Available: nips, iclr, icml, cvpr, iccv, eccv, aaai, ijcai, acl, emnlp, naacl, coling, aistats, uai, colt, acml, corl, rss, icra, iros, siggraph, wacv, acmmm, kdd, www, alt, automl, colm, 3dv"
        },
        "sources": {
            "type": "string",
            "nullable": True,
            "description": "Comma-separated ONLINE sources (e.g., 'arxiv,semantic_scholar'). Options: arxiv, semantic_scholar, openalex, dblp. Do NOT use with 'conferences' for offline search."
        },
    }
    output_type = "string"

    def __init__(self, state: PipelineState = None):
        super().__init__()
        self.state = state or pipeline_state

    def _is_offline_query(self, query: str) -> bool:
        """Auto-detect if query is for offline retrieval."""
        query_lower = query.lower()

        # List of offline indicators
        offline_indicators = [
            "offline:",
            "use the local database",
            "search locally",
            "using offline data",
            "do an offline lookup",
            "within the local index",
            "only from stored data",
            "locally indexed",
            "offline search:",
            "local database",
            "stored data",
            "local index",
        ]

        return any(indicator in query_lower for indicator in offline_indicators)

    def _clean_query(self, query: str) -> str:
        """Remove offline indicators from query."""
        # Remove common offline prefixes
        patterns = [
            r'^offline:\s*',
            r'^use the local database to\s*',
            r'^search locally for\s*',
            r'^using offline data,?\s*',
            r'^do an offline lookup to\s*',
            r'^within the local index,?\s*',
            r'^only from stored data,?\s*',
            r'^offline search:\s*',
        ]

        cleaned = query
        for pattern in patterns:
            cleaned = re.sub(pattern, '', cleaned, flags=re.IGNORECASE)

        return cleaned.strip()

    def _normalize_conference_names(self, conferences: str) -> List[str]:
        """
        Normalize conference names to match database format.
        Handles common variations and makes case-insensitive.
        """
        if not conferences:
            return None

        # Conference name mappings (common variations → database name)
        name_mappings = {
            'neurips': 'nips',
            'nips': 'nips',
            'iclr': 'iclr',
            'icml': 'icml',
            'cvpr': 'cvpr',
            'iccv': 'iccv',
            'eccv': 'eccv',
            'aaai': 'aaai',
            'ijcai': 'ijcai',
            'acl': 'acl',
            'emnlp': 'emnlp',
            'naacl': 'naacl',
            'coling': 'coling',
            'aistats': 'aistats',
            'uai': 'uai',
            'colt': 'colt',
            'acml': 'acml',
            'corl': 'corl',
            'rss': 'rss',
            'icra': 'icra',
            'iros': 'iros',
            'siggraph': 'siggraph',
            'siggraphasia': 'siggraphasia',
            'wacv': 'wacv',
            'acmmm': 'acmmm',
            'kdd': 'kdd',
            'www': 'www',
            'alt': 'alt',
            'automl': 'automl',
            'colm': 'colm',
            '3dv': '3dv',
        }

        # Parse and normalize
        conf_list = []
        for conf in conferences.split(","):
            conf = conf.strip().lower()
            if conf in name_mappings:
                normalized = name_mappings[conf]
                if normalized not in conf_list:  # Avoid duplicates
                    conf_list.append(normalized)
            elif conf:  # Unknown conference, keep as-is
                conf_list.append(conf)

        return conf_list if conf_list else None

    def forward(self, query: str, max_results: int = None, start_year: int = None,
                end_year: int = None, conferences: str = None, sources: str = None) -> str:

        # Auto-detect offline retrieval
        is_offline = self._is_offline_query(query)

        # IMPORTANT: If query explicitly says "offline:", ALWAYS use offline mode
        if "offline:" in query.lower() or "local database" in query.lower():
            is_offline = True
            sources = None  # Ignore sources parameter for offline queries

        # If conferences are specified and no explicit online sources, prefer offline
        elif conferences and not sources:
            is_offline = True

        # If sources are explicitly set to online sources, force online mode
        if sources and any(s.strip() in ['arxiv', 'semantic_scholar', 'openalex', 'dblp'] for s in sources.split(',')):
            is_offline = False

        if is_offline:
            # Clean query
            actual_query = self._clean_query(query)

            max_results = max_results or 50

            # Normalize conference names (handles CVPR→cvpr, NIPS→nips, etc.)
            conf_list = self._normalize_conference_names(conferences)

            self.state.query = actual_query

            # Log offline search details
            print(f"\n{'='*70}")
            print(f"🔍 OFFLINE SEARCH INITIATED")
            print(f"{'='*70}")
            print(f"Original Query: {query}")
            print(f"Cleaned Query: {actual_query}")
            print(f"Conferences: {conf_list}")
            print(f"Year Range: {start_year} - {end_year}")
            print(f"Max Results: {max_results}")
            print(f"{'='*70}\n")

            # Offline search (automatically uses BM25 with cached indices)
            papers = offline_search_engine.search_offline(
                query=actual_query,
                conferences=conf_list,
                start_year=start_year,
                end_year=end_year,
                max_results=max_results,
                ranking_method="bm25"  # Use BM25 by default
            )

            papers_added = self.state.add_papers(papers)

            # Get latest metrics if ground truth is set
            current_metrics = {}
            if self.state.retrieval_metrics:
                current_metrics = self.state.retrieval_metrics[-1]

            # Log step
            self.state.log_step(
                agent_name="offline_search_agent",
                action=f"Offline search: '{actual_query}'",
                result=f"Found {len(papers)} papers from local database",
                details={
                    "query": actual_query,
                    "conferences": conf_list,
                    "start_year": start_year,
                    "end_year": end_year,
                    "papers_found": len(papers),
                    "papers_added": papers_added,
                    "retrieval_metrics": current_metrics
                }
            )

            search_type = "Offline"
            search_source = f"Local database ({len(conf_list) if conf_list else 'all'} conferences)"
        else:
            # Online search
            max_results = max_results or 25
            start_year = start_year or 2020
            source_list = [s.strip() for s in sources.split(",")] if sources else None

            self.state.query = query

            # Search
            papers = search_engine.search_all(query, source_list, max_results, start_year)
            papers_added = self.state.add_papers(papers)

            # Get latest metrics if ground truth is set
            current_metrics = {}
            if self.state.retrieval_metrics:
                current_metrics = self.state.retrieval_metrics[-1]

            # Log step
            self.state.log_step(
                agent_name="online_search_agent",
                action=f"Online search: '{query}'",
                result=f"Found {len(papers)} papers",
                details={
                    "query": query,
                    "sources": source_list,
                    "papers_found": len(papers),
                    "papers_added": papers_added,
                    "retrieval_metrics": current_metrics
                }
            )

            search_type = "Online"
            search_source = f"{len(source_list or ['all'])} sources"

        # Return structured summary
        output = self.state.get_structured_output()

        # Include retrieval metrics if available
        metrics_text = ""
        if self.state.retrieval_metrics:
            latest = self.state.retrieval_metrics[-1]
            metrics_text = f"""
### Retrieval Metrics (Step {latest['step']}):
- Papers in Collection: {latest['total_papers']}
- Ground Truth Found: {'✓ YES' if latest['found'] else '✗ NO'}
- Rank: {latest['rank'] if latest['rank'] else 'Not Found'}
- MRR: {latest['mrr']:.4f}
- Recall@10: {latest['recall@10']:.1%}
- Recall@50: {latest['recall@50']:.1%}
"""

        return f"""## {search_type} Search Complete

**Query:** {query}
**Papers Found:** {len(papers)} | **Papers Added:** {papers_added} | **Total:** {len(self.state.papers)}
**Search Source:** {search_source}
{metrics_text}
### Top 5 Papers:
{chr(10).join(f"{i+1}. [{p.year}] {p.title[:70]}... (BM25: {p.bm25_score:.3f})" for i, p in enumerate(self.state.papers[:5]))}

### Output Files Updated:
- papers.json: {len(self.state.papers)} papers
- links.json: {len([p for p in self.state.papers if p.pdf_url])} PDFs
- stats.json: Statistics updated
- summary.json: Insights generated
- retrieval_metrics.json: Step-by-step metrics
- dashboard.html: Visualization ready

**View dashboard:** {self.state.output_dir}/dashboard.html
"""


class PaperSortTool(Tool):
    """Sort papers with structured output update."""

    name = "sort_papers"
    description = """Sort papers by criteria. Updates all structured outputs with new rankings.

Args:
    sort_by: recency, citations, similarity, novelty, bm25, combined, relevance, reranker
    weights: JSON weights for combined (e.g., '{"recency": 0.3, "citations": 0.4, "bm25": 0.2}')
    top_k: Keep only top K papers

Special sorting methods:
    - reranker: Use cross-encoder reranker to sort papers by relevance (best quality, slower)
"""
    inputs = {
        "sort_by": {
            "type": "string",
            "description": "Sorting criterion: recency, citations, similarity, novelty, bm25, combined, relevance, or reranker (cross-encoder reranking).",
            "nullable": True
        },
        "weights": {
            "type": "string",
            "nullable": True,
            "description": (
                "JSON-encoded weights for combined scoring, e.g. "
                '\'{"recency": 0.3, "citations": 0.4, "similarity": 0.2, "novelty": 0.1, "bm25": 0.2}\''
            ),
        },
        "top_k": {
            "type": "integer",
            "nullable": True,
            "description": "If set, keep only the top K papers after sorting."
        },
    }
    output_type = "string"
    
    def __init__(self, state: PipelineState = None):
        super().__init__()
        self.state = state or pipeline_state
    
    def forward(self, sort_by: str = "relevance", weights: str = None, top_k: int = None) -> str:
        papers = self.state.papers
        query = self.state.query
        
        if not papers:
            return "No papers to sort. Run paper_search first."
        
        # Calculate scores
        current_year = datetime.now().year
        
        # Recency
        for p in papers:
            p.recency_score = max(0, 1 - (current_year - (p.year or current_year)) / 10)
        
        # Similarity (TF-IDF or keyword)
        if HAS_SKLEARN and query:
            try:
                texts = [query] + [f"{p.title} {p.abstract}" for p in papers]
                vectorizer = TfidfVectorizer(max_features=5000, stop_words='english')
                tfidf = vectorizer.fit_transform(texts)
                sims = cosine_similarity(tfidf[0:1], tfidf[1:])[0]
                for p, sim in zip(papers, sims):
                    p.similarity_score = float(sim)
            except:
                keywords = set(query.lower().split())
                for p in papers:
                    title_words = set(p.title.lower().split())
                    p.similarity_score = len(keywords & title_words) / max(len(keywords), 1)
        else:
            keywords = set(query.lower().split())
            for p in papers:
                title_words = set(p.title.lower().split())
                p.similarity_score = len(keywords & title_words) / max(len(keywords), 1)
        
        # Novelty
        all_titles = " ".join(p.title.lower() for p in papers)
        word_freq = {}
        for word in all_titles.split():
            word_freq[word] = word_freq.get(word, 0) + 1
        
        for p in papers:
            words = p.title.lower().split()
            if words:
                avg_freq = sum(word_freq.get(w, 1) for w in words) / len(words)
                p.novelty_score = 1 / (1 + avg_freq / len(papers))
            else:
                p.novelty_score = 0.5
        
        # Normalize BM25 scores if present
        bm25_scores = [p.bm25_score for p in papers if p.bm25_score > 0]
        max_bm25 = max(bm25_scores) if bm25_scores else 1.0
        for p in papers:
            if max_bm25 > 0:
                p.bm25_score = p.bm25_score / max_bm25

        # Sort
        sort_by = sort_by.lower()
        if sort_by == "reranker":
            # Use cross-encoder reranker to sort papers
            if not query:
                return "Cannot use reranker sorting without a query. Use paper_search first to set the query."

            if not HAS_RERANKER:
                print("[Sort] Reranker not available, falling back to relevance sorting")
                sort_by = "relevance"
            else:
                print(f"[Sort] Reranking {len(papers)} papers with cross-encoder...")
                start_time = time.time()

                # Convert papers to dicts
                papers_dicts = []
                for p in papers:
                    papers_dicts.append({
                        'title': p.title,
                        'abstract': p.abstract,
                        'authors': p.authors,
                        'year': p.year,
                        'url': p.url,
                        'bm25_score': p.bm25_score,
                        'keywords': p.keywords or '',
                    })

                # Use the global offline_search_engine's reranker if available
                if offline_search_engine.reranker:
                    reranked_dicts = offline_search_engine.reranker.rerank_papers(
                        query=query,
                        papers=papers_dicts,
                        top_n=len(papers),
                        text_field="title_abstract"
                    )
                else:
                    # Create a temporary reranker
                    from advanced_reranker import AdvancedReranker, RerankerConfig
                    reranker_config = RerankerConfig(
                        model_name="Qwen/Qwen3-Reranker-0.6B",
                        backend="vllm",
                        top_n=len(papers)
                    )
                    temp_reranker = AdvancedReranker(reranker_config)
                    reranked_dicts = temp_reranker.rerank_papers(
                        query=query,
                        papers=papers_dicts,
                        top_n=len(papers),
                        text_field="title_abstract"
                    )

                # Update papers with rerank scores and reorder
                papers_by_title = {p.title: p for p in papers}
                papers = []
                for i, d in enumerate(reranked_dicts, 1):
                    if d['title'] in papers_by_title:
                        p = papers_by_title[d['title']]
                        p.relevance_score = d.get('rerank_score', 0.0)
                        p.combined_score = d.get('rerank_score', 0.0)
                        p.rank = i
                        papers.append(p)

                elapsed = time.time() - start_time
                print(f"[Sort] Reranking completed in {elapsed:.2f}s")

        if sort_by == "recency":
            papers.sort(key=lambda p: -(p.year or 0))
        elif sort_by == "citations":
            papers.sort(key=lambda p: -(p.citations or 0))
        elif sort_by == "similarity":
            papers.sort(key=lambda p: -p.similarity_score)
        elif sort_by == "novelty":
            papers.sort(key=lambda p: -p.novelty_score)
        elif sort_by == "bm25":
            papers.sort(key=lambda p: -p.bm25_score)
        elif sort_by == "combined":
            w = json.loads(weights) if weights else {
                "recency": 0.2, "citations": 0.2, "similarity": 0.25,
                "novelty": 0.15, "bm25": 0.2
            }
            for p in papers:
                p.combined_score = (
                    w.get("recency", 0.2) * p.recency_score +
                    w.get("citations", 0.2) * (min(p.citations or 0, 1000) / 1000) +
                    w.get("similarity", 0.25) * p.similarity_score +
                    w.get("novelty", 0.15) * p.novelty_score +
                    w.get("bm25", 0.2) * p.bm25_score
                )
            papers.sort(key=lambda p: -p.combined_score)
        elif sort_by == "relevance":
            for p in papers:
                p.relevance_score = (
                    0.3 * p.similarity_score +
                    0.2 * p.recency_score +
                    0.2 * (min(p.citations or 0, 500) / 500) +
                    0.3 * p.bm25_score
                )
                p.combined_score = p.relevance_score
            papers.sort(key=lambda p: -p.relevance_score)
        
        # Apply top_k
        if top_k is not None:
            papers = papers[:top_k]
        
        # Update ranks
        for i, p in enumerate(papers, 1):
            p.rank = i
        
        self.state.papers = papers
        
        # Log step
        self.state.log_step(
            agent_name="sorting_agent",
            action=f"Sorted {len(papers)} papers by '{sort_by}'",
            result=f"Top paper: {papers[0].title[:50]}..." if papers else "No papers",
            details={"sort_by": sort_by, "weights": weights, "top_k": top_k}
        )
        
        # Return leaderboard
        leaderboard = self.state._generate_leaderboard()[:10]
        
        return f"""## Sorting Complete

**Sorted by:** {sort_by}
**Total Papers:** {len(papers)}

### Leaderboard (Top 10):
{json.dumps(leaderboard, indent=2)}

### Score Distribution:
- Avg Similarity: {self.state.stats['score_stats'].get('avg_similarity', 0):.3f}
- Avg Novelty: {self.state.stats['score_stats'].get('avg_novelty', 0):.3f}
- Avg Recency: {self.state.stats['score_stats'].get('avg_recency', 0):.3f}
- Avg BM25: {self.state.stats['score_stats'].get('avg_bm25', 0):.3f}
- Avg Combined: {self.state.stats['score_stats'].get('avg_combined', 0):.3f}

**All outputs updated in:** {self.state.output_dir}/
"""


class PaperAnalysisTool(Tool):
    """Analyze papers with structured output."""
    
    name = "analyze_papers"
    description = """Analyze papers and generate insights. Updates summary.json with findings.
    
Args:
    analysis_type: summary, trends, authors, venues, topics, all
"""
    inputs = {
        "analysis_type": {"type": "string", "description": "Analyze papers and generate insights. Updates summary.json with findings", "nullable": True},
    }
    output_type = "string"
    
    def __init__(self, state: PipelineState = None):
        super().__init__()
        self.state = state or pipeline_state
    
    def forward(self, analysis_type: str = "all") -> str:
        if not self.state.papers:
            return "No papers to analyze."

        # Log step
        self.state.log_step(
            agent_name="analysis_agent",
            action=f"Analyzing papers ({analysis_type})",
            result=f"Generated insights from {len(self.state.papers)} papers",
            details={"analysis_type": analysis_type}
        )

        output = self.state.get_structured_output()
        summary = output.get('summary', {})
        insights = output.get('insights', [])
        stats = output.get('stats', {})

        # Format as text to avoid JSON parser confusion
        insights_text = "\n".join([
            f"  - {insight.get('title', 'N/A')}: {insight.get('message', 'N/A')}"
            for insight in insights[:5]
        ])

        top_authors = list(stats.get('top_authors', {}).items())[:5]
        authors_text = "\n".join([f"  - {author}: {count} papers" for author, count in top_authors])

        top_keywords = list(stats.get('top_keywords', {}).items())[:10]
        keywords_text = ", ".join([kw for kw, _ in top_keywords])

        return f"""## Analysis Complete

### Summary:
- Query: {summary.get('query', 'N/A')}
- Total Papers: {summary.get('total_papers', 0)}
- Unique Sources: {summary.get('unique_sources', 0)}
- Year Range: {summary.get('year_range', {}).get('min', 'N/A')} - {summary.get('year_range', {}).get('max', 'N/A')}
- Total Citations: {summary.get('citation_summary', {}).get('total', 0)}
- Average Citations: {summary.get('citation_summary', {}).get('average', 0)}

### Key Insights:
{insights_text}

### Statistics:
- Total Papers: {stats.get('total_papers', 0)}
- Sources: {len(stats.get('sources', {}))} sources
- Citation Stats: {stats.get('citation_stats', {}).get('total', 0)} total citations

### Top 5 Authors:
{authors_text}

### Top Keywords:
{keywords_text}

**Full analysis available in:** {self.state.output_dir}/summary.json
**View dashboard:** {self.state.output_dir}/dashboard.html
"""


class PaperExportTool(Tool):
    """Export papers with all formats."""
    
    name = "export_papers"
    description = """Export papers to file. All formats are automatically maintained.
    
Args:
    format: json, csv, bib, markdown, html, all
    filename: Custom filename (optional)
"""
    inputs = {
        "format": {
            "type": "string",
            "nullable": True,
            "description": "Export format: json, csv, bib, markdown, html, or all (default)."
        },
        "filename": {
            "type": "string",
            "nullable": True,
            "description": "Optional custom filename without extension. Defaults to standard names."
        },
    }
    output_type = "string"
    
    def __init__(self, state: PipelineState = None):
        super().__init__()
        self.state = state or pipeline_state
    
    def forward(self, format: str = "all", filename: str = None) -> str:
        if not self.state.papers:
            return "No papers to export."
        
        # Log step
        self.state.log_step(
            agent_name="export_agent",
            action=f"Exporting papers ({format})",
            result=f"Exported {len(self.state.papers)} papers",
            details={"format": format, "filename": filename}
        )
        
        files = [
            f"📄 papers.json - Full paper data ({len(self.state.papers)} papers)",
            f"🔗 links.json - Structured links ({len([p for p in self.state.papers if p.pdf_url])} PDFs)",
            f"📊 stats.json - Statistics and leaderboard",
            f"💡 summary.json - Insights and findings",
            f"📑 papers.csv - Spreadsheet format",
            f"📚 papers.bib - BibTeX citations",
            f"📝 papers.md - Markdown document",
            f"🌐 dashboard.html - Interactive dashboard",
            f"📋 step_log.json - Processing log",
        ]
        
        return f"""## Export Complete

### Output Directory: {self.state.output_dir}/

### Generated Files:
{chr(10).join(files)}

### Quick Access:
- View Dashboard: {self.state.output_dir}/dashboard.html
- Import to Zotero: {self.state.output_dir}/papers.bib
- Open in Excel: {self.state.output_dir}/papers.csv
- API/Processing: {self.state.output_dir}/papers.json
"""


class GetStructuredOutputTool(Tool):
    """Get current structured output."""

    name = "get_output"
    description = """Get current structured output (papers, links, stats, summary) as formatted text."""
    inputs = {}
    output_type = "string"

    def __init__(self, state: PipelineState = None):
        super().__init__()
        self.state = state or pipeline_state

    def forward(self) -> str:
        output = self.state.get_structured_output()

        # Return as formatted text instead of raw JSON to avoid parser confusion
        summary = output.get("summary", {})

        return f"""## Current Pipeline Output

**Query:** {summary.get('query', 'N/A')}
**Total Papers:** {summary.get('total_papers', 0)}
**Unique Sources:** {summary.get('unique_sources', 0)}

### Year Range:
- Min: {summary.get('year_range', {}).get('min', 'N/A')}
- Max: {summary.get('year_range', {}).get('max', 'N/A')}

### Citations:
- Total: {summary.get('citation_summary', {}).get('total', 0)}
- Average: {summary.get('citation_summary', {}).get('average', 0)}

### Top Source: {summary.get('top_source', 'N/A')}
### Papers with PDF: {summary.get('papers_with_pdf', 0)}
### Papers with DOI: {summary.get('papers_with_doi', 0)}
### Processing Steps: {summary.get('processing_steps', 0)}

**Output Directory:** {self.state.output_dir}/
**Files:** papers.json, links.json, stats.json, summary.json, dashboard.html
"""


# ============================================================================
# Create Pipeline
# ============================================================================

def create_research_pipeline(model, output_dir: str = "research_output", verbose: bool = True, custom_instructions: str = None):
    """
    Create multi-agent research pipeline with structured outputs at each step.

    Outputs updated at each step:
    - papers.json: All papers with details
    - links.json: Structured web links
    - stats.json: Statistics leaderboard
    - summary.json: Insights and summary
    - dashboard.html: Interactive visualization

    Args:
        model: LLM model to use
        output_dir: Directory for output files
        verbose: Enable verbose logging
        custom_instructions: Optional custom instructions for paper search agent
    """

    # Initialize state
    state = PipelineState(output_dir=output_dir)

    # Update global state reference
    global pipeline_state
    pipeline_state = state
    web_agent = ToolCallingAgent(
        tools=[WebSearchTool(), visit_webpage],
        model=model,
        max_steps=1,
        name="web_search_agent",
        description="Runs web searches for you. Use ONLY when strictly necessary for the research task require some meaning from the web about paper search title.",
    )
    # Create agents with shared state
    intent_agent = ToolCallingAgent(
        tools=[IntentClassificationTool()],
        model=model,
        managed_agents=[web_agent],
        name="intent_classification_agent",
        description="Classifies user search intent to determine search mode (online/offline/both), conferences, year ranges, and ranking preferences and the query meaning from web if needed.",
    )

    # Build paper search agent description with custom instructions if provided
    paper_search_description = "Searches academic papers (online or offline). Supports multi-step accumulative search with deduplication. Updates papers.json, links.json, stats.json at each search."
    if custom_instructions:
        paper_search_description = f"{paper_search_description}\n\nIMPORTANT INSTRUCTIONS:\n{custom_instructions}"

    paper_search_agent = ToolCallingAgent(
        tools=[PaperSearchTool(state)],
        model=model,
        name="paper_search_agent",
        description=paper_search_description,
    )

    sorting_agent = ToolCallingAgent(
        tools=[PaperSortTool(state)],
        model=model,
        name="sorting_agent",
        description="Sorts/ranks papers by recency, citations, similarity, novelty, bm25, combined. Updates leaderboard with BM25 and other scores.",
    )

    analysis_agent = ToolCallingAgent(
        tools=[PaperAnalysisTool(state)],
        model=model,
        name="analysis_agent",
        description="Analyzes papers, generates insights. Updates summary.json.",
    )

    export_agent = ToolCallingAgent(
        tools=[PaperExportTool(state), GetStructuredOutputTool(state)],
        model=model,
        name="export_agent",
        description="Exports papers in all formats. Gets current structured output.",
    )
    # Orchestrator - CodeAgent for full research pipeline
    orchestrator = CodeAgent(
        tools=[],
        model=model,
        managed_agents=[intent_agent, paper_search_agent, sorting_agent, analysis_agent, export_agent],
        additional_authorized_imports=["json", "os", "datetime", "time", "numpy", "pandas"],
        planning_interval=1,
        max_steps=2,
        instructions="""                                                                                                                                                    
            CRITICAL INSTRUCTIONS FOR EFFICIENCY:                                                                                                                                       
            When query says "offline:" or mentions conferences, use paper_search_agent FIRST with offline database                                                                   
            ALWAYS search offline database BEFORE any online search                                                                                                                  
            For benchmarking queries, do MINIMAL steps: search → done (no sorting, no analysis unless requested)                                                                     
            Pass parameters EXACTLY as specified (do not add extra parameters like 'year_range')                                                                                     
            When conferences are specified, DO NOT set 'sources' parameter (triggers offline mode automatically)"""
    )
    
    print(f"""
╔══════════════════════════════════════════════════════════════════╗
║         Multi-Agent Research Pipeline Initialized                ║
╠══════════════════════════════════════════════════════════════════╣
║  Output Directory: {output_dir:<43} ║
║                                                                  ║
║  Structured outputs updated at EACH step:                        ║
║    📄 papers.json  - All papers with details                     ║
║    🔗 links.json   - Structured web links                        ║
║    📊 stats.json   - Statistics & leaderboard with BM25          ║
║    💡 summary.json - Insights & summary                          ║
║    🌐 dashboard.html - Live dashboard (auto-refresh)             ║
║                                                                  ║
║  NEW FEATURES:                                                   ║
║    🎯 Intent Classification - Auto-detect search mode & filters  ║
║    🔍 Multi-Step Search - Accumulative search with dedup         ║
║    📊 BM25 Ranking - Enhanced scoring with BM25 algorithm        ║
║    ⚙️  Flexible Sorting - similarity, BM25, novelty, recency     ║
║                                                                  ║
║  Agents: intent_classification, paper_search, sorting,           ║
║          analysis, export, web_search                            ║
╚══════════════════════════════════════════════════════════════════╝
    """)
    
    return orchestrator

# ============================================================================
# Benchmark Functions - Lightweight search without agent overhead
# ============================================================================

def benchmark_search(
    query: str,
    conferences: List[str] = None,
    start_year: int = None,
    end_year: int = None,
    max_results: int = 50,
    ranking_method: str = "bm25",
    relevant_id: str = None,
    relevant_title: str = None,
    database_option: str = "offline"
) -> dict:
    """
    Lightweight search function for benchmarking without agent overhead.

    Args:
        query: Search query
        conferences: List of conference names
        start_year: Start year filter
        end_year: End year filter
        max_results: Maximum results to return
        ranking_method: "bm25", "semantic", "hybrid"
        relevant_id: Ground truth paper ID for evaluation
        relevant_title: Ground truth paper title for evaluation
        database_option: "offline", "online", or "both"

    Returns:
        dict with:
            - papers: List of Paper objects
            - metrics: Evaluation metrics (if relevant_id/title provided)
            - timing: Performance metrics
    """
    import time

    start_time = time.time()

    # Step 1: Search
    search_start = time.time()

    if database_option == "offline":
        papers = offline_search_engine.search_offline(
            query=query,
            conferences=conferences,
            start_year=start_year,
            end_year=end_year,
            max_results=max_results,
            ranking_method=ranking_method
        )
    elif database_option == "online":
        papers = search_engine.search_all(
            query=query,
            sources=["arxiv", "semantic_scholar"],
            max_per_source=max_results // 2,
            start_year=start_year or 2020
        )
    else:  # both
        offline_papers = offline_search_engine.search_offline(
            query=query,
            conferences=conferences,
            start_year=start_year,
            end_year=end_year,
            max_results=max_results // 2,
            ranking_method=ranking_method
        )
        online_papers = search_engine.search_all(
            query=query,
            sources=["arxiv", "semantic_scholar"],
            max_per_source=max_results // 4,
            start_year=start_year or 2020
        )
        papers = offline_papers + online_papers

    search_time = time.time() - search_start

    # Step 2: Calculate evaluation metrics if ground truth provided
    metrics = {}
    if relevant_id or relevant_title:
        metrics = calculate_retrieval_metrics(
            papers=papers,
            relevant_id=relevant_id,
            relevant_title=relevant_title,
            k_values=[1, 5, 10, 20, 50]
        )

    total_time = time.time() - start_time

    return {
        "papers": papers,
        "metrics": metrics,
        "timing": {
            "search_time": search_time,
            "total_time": total_time,
            "papers_found": len(papers)
        },
        "query": query,
        "database_option": database_option
    }


def calculate_retrieval_metrics(
    papers: List[Paper],
    relevant_id: str = None,
    relevant_title: str = None,
    k_values: List[int] = [1, 5, 10, 20, 50]
) -> dict:
    """
    Calculate IR metrics: Recall@K, Precision@K, MRR, Hit Rate.

    Args:
        papers: Retrieved papers (ordered by relevance)
        relevant_id: Ground truth paper ID
        relevant_title: Ground truth paper title
        k_values: List of K values for metrics

    Returns:
        dict with metrics for each K value
    """
    # Find if relevant paper is in results
    relevant_rank = None

    for i, paper in enumerate(papers):
        # Match by ID (if available in paper metadata)
        if relevant_id and hasattr(paper, 'id') and paper.id == relevant_id:
            relevant_rank = i + 1
            break

        # Match by title (normalized comparison)
        if relevant_title:
            paper_title_norm = re.sub(r'[^a-z0-9]', '', paper.title.lower())
            relevant_title_norm = re.sub(r'[^a-z0-9]', '', relevant_title.lower())

            # Exact match or high overlap
            if paper_title_norm == relevant_title_norm:
                relevant_rank = i + 1
                break

            # Check for substring match (paper title contains relevant title)
            if relevant_title_norm in paper_title_norm or paper_title_norm in relevant_title_norm:
                if len(relevant_title_norm) > 20:  # Avoid false positives with short titles
                    relevant_rank = i + 1
                    break

    # Calculate metrics
    metrics = {
        "found": relevant_rank is not None,
        "rank": relevant_rank,
        "mrr": 1.0 / relevant_rank if relevant_rank else 0.0,
        "reciprocal_rank": 1.0 / relevant_rank if relevant_rank else 0.0
    }

    # Recall@K, Precision@K, Hit Rate@K
    for k in k_values:
        hit = relevant_rank is not None and relevant_rank <= k
        metrics[f"recall@{k}"] = 1.0 if hit else 0.0
        metrics[f"precision@{k}"] = (1.0 / k) if hit else 0.0
        metrics[f"hit_rate@{k}"] = 1.0 if hit else 0.0

    return metrics


def run_benchmark_parallel(
    benchmark_queries: List[dict],
    max_workers: int = 4,
    output_file: str = "benchmark_results.json"
) -> dict:
    """
    Run multiple benchmark queries in parallel.

    Args:
        benchmark_queries: List of query dicts with format:
            {
                "id": "q000001",
                "query": "search query",
                "filters": {"conferences": [...], "start_year": ..., "end_year": ...},
                "database_option": "offline",
                "relevant_id": "paper_id",
                "relevant_title": "Paper Title"
            }
        max_workers: Number of parallel workers
        output_file: Output JSON file for results

    Returns:
        dict with aggregated results and metrics
    """
    from concurrent.futures import ThreadPoolExecutor, as_completed
    import time

    results = []
    start_time = time.time()

    print(f"\n{'='*70}")
    print(f"🚀 PARALLEL BENCHMARK STARTED")
    print(f"{'='*70}")
    print(f"Total Queries: {len(benchmark_queries)}")
    print(f"Max Workers: {max_workers}")
    print(f"{'='*70}\n")

    # Run queries in parallel
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        # Submit all queries
        future_to_query = {}
        for query_data in benchmark_queries:
            future = executor.submit(
                benchmark_search,
                query=query_data["query"],
                conferences=query_data.get("filters", {}).get("conferences"),
                start_year=query_data.get("filters", {}).get("start_year"),
                end_year=query_data.get("filters", {}).get("end_year"),
                max_results=query_data.get("max_results", 50),
                ranking_method=query_data.get("ranking_method", "bm25"),
                relevant_id=query_data.get("relevant_id"),
                relevant_title=query_data.get("relevant_title"),
                database_option=query_data.get("database_option", "offline")
            )
            future_to_query[future] = query_data

        # Collect results as they complete
        for i, future in enumerate(as_completed(future_to_query), 1):
            query_data = future_to_query[future]
            try:
                result = future.result()
                result["query_id"] = query_data.get("id", f"q{i:06d}")
                results.append(result)

                # Print progress
                found = result["metrics"].get("found", False)
                rank = result["metrics"].get("rank", "N/A")
                print(f"✓ [{i}/{len(benchmark_queries)}] {query_data['id']}: "
                      f"Found={found}, Rank={rank}, Time={result['timing']['search_time']:.3f}s")
            except Exception as e:
                print(f"✗ [{i}/{len(benchmark_queries)}] {query_data['id']}: ERROR - {e}")
                results.append({
                    "query_id": query_data.get("id"),
                    "error": str(e),
                    "query": query_data["query"]
                })

    total_time = time.time() - start_time

    # Aggregate metrics
    aggregated = aggregate_benchmark_metrics(results)
    aggregated["total_time"] = total_time
    aggregated["queries_per_second"] = len(benchmark_queries) / total_time

    # Save results
    output_data = {
        "summary": aggregated,
        "individual_results": [
            {
                "query_id": r.get("query_id"),
                "query": r.get("query"),
                "metrics": r.get("metrics", {}),
                "timing": r.get("timing", {}),
                "papers_found": r.get("timing", {}).get("papers_found", 0)
            }
            for r in results
        ]
    }

    with open(output_file, 'w') as f:
        json.dump(output_data, f, indent=2)

    print(f"\n{'='*70}")
    print(f"✅ BENCHMARK COMPLETE")
    print(f"{'='*70}")
    print(f"Total Time: {total_time:.2f}s")
    print(f"Queries/Second: {aggregated['queries_per_second']:.2f}")
    print(f"Mean MRR: {aggregated['mean_mrr']:.4f}")
    print(f"Mean Recall@10: {aggregated['mean_recall@10']:.4f}")
    print(f"Hit Rate@10: {aggregated['hit_rate@10']:.2%}")
    print(f"\nResults saved to: {output_file}")
    print(f"{'='*70}\n")

    return output_data


def aggregate_benchmark_metrics(results: List[dict]) -> dict:
    """Aggregate metrics across all benchmark queries."""
    valid_results = [r for r in results if "metrics" in r and r["metrics"]]

    if not valid_results:
        return {"error": "No valid results to aggregate"}

    # Extract all metric keys from first result
    sample_metrics = valid_results[0]["metrics"]
    k_values = [1, 5, 10, 20, 50]

    aggregated = {
        "total_queries": len(results),
        "successful_queries": len(valid_results),
        "failed_queries": len(results) - len(valid_results)
    }

    # Calculate mean for each metric
    for metric_name in ["mrr", "recall@1", "recall@5", "recall@10", "recall@20", "recall@50",
                        "precision@1", "precision@5", "precision@10", "precision@20", "precision@50",
                        "hit_rate@1", "hit_rate@5", "hit_rate@10", "hit_rate@20", "hit_rate@50"]:
        values = [r["metrics"].get(metric_name, 0.0) for r in valid_results]
        aggregated[f"mean_{metric_name}"] = sum(values) / len(values) if values else 0.0

    # Hit rate (percentage of queries where relevant doc was found)
    found_count = sum(1 for r in valid_results if r["metrics"].get("found", False))
    aggregated["overall_hit_rate"] = found_count / len(valid_results) if valid_results else 0.0

    # Timing stats
    search_times = [r.get("timing", {}).get("search_time", 0) for r in valid_results]
    if search_times:
        aggregated["mean_search_time"] = sum(search_times) / len(search_times)
        aggregated["median_search_time"] = sorted(search_times)[len(search_times) // 2]
        aggregated["min_search_time"] = min(search_times)
        aggregated["max_search_time"] = max(search_times)

    return aggregated


# ============================================================================
# Example
# ============================================================================

if __name__ == "__main__":
    from smolagents import LiteLLMModel
    API_BASE = "http://localhost:11434"
    MODEL_ID = "ollama_chat/relational/orlex:latest"

    model = LiteLLMModel(
        model_id=MODEL_ID,
        api_base=API_BASE,
        num_ctx=8192
    )
# {"id":"q000001","query":"from the offline corpus, research on score-regularized policy optimization using diffusion behavior models from ICLR in the poster track (2024), especially works that extract deterministic inference policies from pretrained diffusion behavior models","filters":{"conferences":["iclr"],"years":[2024],"tracks":["poster"],"keywords":["diffusion","policy optimization","offline reinforcement learning"]},"database_option":"offline","relevant_id":"iclr2024:xCRr9DrolJ","relevant_title":"Score Regularized Policy Optimization through Diffusion Behavior"}
    pipeline = create_research_pipeline(model, output_dir="paper_circle_related_work")
    result = pipeline.run("""
    1. Search for offline and online only varified, A multi-agent research paper discovery and analysis framework".
    2. Sort by best papers
    3. Analyze trends and insights  
    4. Export all formats
    """)
    # pipeline = create_research_pipeline(model, output_dir="my_research")
    # result = pipeline.run('''
    #     1. Search for offline "world models using " papers
    #     2. Sort by combined score
    #     3. Analyze trends and insights
    #     4. Export all formats
    # ''')
#     print("""
# Usage:
#     # Check outputs anytime:
#     # - my_research/papers.json
#     # - my_research/links.json  
#     # - my_research/stats.json
#     # - my_research/summary.json
#     # - my_research/dashboard.html (live view)
#     """)
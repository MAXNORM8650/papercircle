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
    from research_pipeline_v2 import create_research_pipeline
    
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
except ImportError:
    HAS_ARXIV = False

try:
    from sklearn.feature_extraction.text import TfidfVectorizer
    from sklearn.metrics.pairwise import cosine_similarity
    HAS_SKLEARN = True
except ImportError:
    HAS_SKLEARN = False

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
    
    # Computed scores
    similarity_score: float = 0.0
    novelty_score: float = 0.0
    recency_score: float = 0.0
    relevance_score: float = 0.0
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
        
        # CSV
        csv_path = self.output_dir / "papers.csv"
        with open(csv_path, 'w', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerow(["Rank", "Title", "Authors", "Year", "Venue", "Citations", 
                           "Score", "DOI", "URL", "PDF", "Source", "Abstract"])
            for p in self.papers:
                writer.writerow([
                    p.rank, p.title, "; ".join(p.authors[:5]), p.year, p.venue,
                    p.citations or 0, f"{p.combined_score:.3f}", p.doi or "",
                    p.url, p.pdf_url or "", p.source, p.abstract[:300]
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
            for p in self.papers[:50]:
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
                "avg_combined": round(sum(p.combined_score for p in self.papers) / len(self.papers), 3),
            }
    
    def _generate_leaderboard(self) -> List[dict]:
        """Generate paper leaderboard."""
        leaderboard = []
        for i, p in enumerate(self.papers[:50], 1):
            leaderboard.append({
                "rank": i,
                "title": p.title[:80],
                "year": p.year,
                "citations": p.citations or 0,
                "combined_score": round(p.combined_score, 3),
                "similarity_score": round(p.similarity_score, 3),
                "novelty_score": round(p.novelty_score, 3),
                "recency_score": round(p.recency_score, 3),
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
                    "message": f'"{top_cited.title[:50]}..." has {top_cited.citations} citations',
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
                                <td>{p.title[:50]}{"..." if len(p.title) > 50 else ""}</td>
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
    
    def add_papers(self, papers: List[Paper]):
        """Add papers to the collection (with deduplication)."""
        existing_titles = {re.sub(r'[^a-z0-9]', '', p.title.lower()) for p in self.papers}
        
        for paper in papers:
            norm_title = re.sub(r'[^a-z0-9]', '', paper.title.lower())
            if norm_title not in existing_titles:
                self.papers.append(paper)
                existing_titles.add(norm_title)
        
        # Update ranks
        for i, p in enumerate(self.papers, 1):
            p.rank = i
    
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


# ============================================================================
# Tools with Structured Output
# ============================================================================

class PaperSearchTool(Tool):
    """Search academic papers with structured output at each step."""
    
    name = "paper_search"
    description = """Search for academic papers. Updates structured outputs (papers.json, links.json, stats.json, summary.json).
    
Args:
    query: Search query
    max_results: Max papers per source (default: 25)
    start_year: Filter year (default: 2020)
    sources: Comma-separated: arxiv,semantic_scholar,openalex,dblp
"""
    inputs = {
        "query": {
            "type": "string",
            "description": "Search query string"
        },
        "max_results": {
            "type": "integer",
            "nullable": True,
            "description": "Maximum number of papers to retrieve per source"
        },
        "start_year": {
            "type": "integer",
            "nullable": True,
            "description": "Filter results to papers published from this year onward"
        },
        "sources": {
            "type": "string",
            "nullable": True,
            "description": "Comma-separated list of sources: arxiv, semantic_scholar, openalex, dblp"
        },
    }
    output_type = "string"
    
    def __init__(self, state: PipelineState = None):
        super().__init__()
        self.state = state or pipeline_state
    
    def forward(self, query: str, max_results: int = None, start_year: int = None, sources: str = None) -> str:
        max_results = max_results or 25
        start_year = start_year or 2020
        source_list = [s.strip() for s in sources.split(",")] if sources else None
        
        self.state.query = query
        
        # Search
        papers = search_engine.search_all(query, source_list, max_results, start_year)
        self.state.add_papers(papers)
        
        # Log step and update outputs
        self.state.log_step(
            agent_name="paper_search_agent",
            action=f"Searched '{query}' across {len(source_list or ['all'])} sources",
            result=f"Found {len(papers)} papers",
            details={"query": query, "sources": source_list, "papers_found": len(papers)}
        )
        
        # Return structured summary
        output = self.state.get_structured_output()
        
        return f"""## Search Complete

**Query:** {query}
**Papers Found:** {len(papers)} (Total: {len(self.state.papers)})

### Sources:
{json.dumps(output['stats']['sources'], indent=2)}

### Top 5 Papers:
{chr(10).join(f"{i+1}. [{p.year}] {p.title[:70]}..." for i, p in enumerate(self.state.papers[:5]))}

### Output Files Updated:
- papers.json: {len(self.state.papers)} papers
- links.json: {len([p for p in self.state.papers if p.pdf_url])} PDFs
- stats.json: Statistics updated
- summary.json: Insights generated
- dashboard.html: Visualization ready

**View dashboard:** {self.state.output_dir}/dashboard.html
"""


class PaperSortTool(Tool):
    """Sort papers with structured output update."""
    
    name = "sort_papers"
    description = """Sort papers by criteria. Updates all structured outputs with new rankings.
    
Args:
    sort_by: recency, citations, similarity, novelty, combined
    weights: JSON weights for combined (e.g., '{"recency": 0.3, "citations": 0.4}')
    top_k: Keep only top K papers
"""
    inputs = {
        "sort_by": {
            "type": "string",
            "description": "Sorting criterion: recency, citations, similarity, novelty, combined, or relevance (default).",
            "nullable": True
        },
        "weights": {
            "type": "string",
            "nullable": True,
            "description": (
                "JSON-encoded weights for combined scoring, e.g. "
                '\'{"recency": 0.3, "citations": 0.4, "similarity": 0.2, "novelty": 0.1}\''
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
        else:  # relevance
            for p in papers:
                p.relevance_score = 0.4 * p.similarity_score + 0.3 * p.recency_score + 0.3 * (min(p.citations or 0, 500) / 500)
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
        
        return f"""## Analysis Complete

### Summary:
{json.dumps(output['summary'], indent=2)}

### Key Insights:
{json.dumps(output['insights'], indent=2)}

### Statistics:
- Total Papers: {output['stats']['total_papers']}
- Sources: {json.dumps(output['stats']['sources'])}
- Year Distribution: {json.dumps(output['stats']['year_distribution'])}
- Citation Stats: {json.dumps(output['stats']['citation_stats'])}

### Top Authors:
{json.dumps(dict(list(output['stats']['top_authors'].items())[:10]), indent=2)}

### Top Keywords:
{json.dumps(dict(list(output['stats']['top_keywords'].items())[:15]), indent=2)}

**Full analysis in:** {self.state.output_dir}/summary.json
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
    description = """Get current structured output (papers, links, stats, summary) as JSON."""
    inputs = {}
    output_type = "string"
    
    def __init__(self, state: PipelineState = None):
        super().__init__()
        self.state = state or pipeline_state
    
    def forward(self) -> str:
        output = self.state.get_structured_output()
        return json.dumps(output, indent=2, default=str)


# ============================================================================
# Create Pipeline
# ============================================================================

def create_research_pipeline(model, output_dir: str = "research_output", verbose: bool = True):
    """
    Create multi-agent research pipeline with structured outputs at each step.
    
    Outputs updated at each step:
    - papers.json: All papers with details
    - links.json: Structured web links
    - stats.json: Statistics leaderboard
    - summary.json: Insights and summary
    - dashboard.html: Interactive visualization
    """
    
    # Initialize state
    state = PipelineState(output_dir=output_dir)
    
    # Update global state reference
    global pipeline_state
    pipeline_state = state
    
    # Create agents with shared state
    paper_search_agent = ToolCallingAgent(
        tools=[PaperSearchTool(state)],
        model=model,
        name="paper_search_agent",
        description="Searches academic papers. Updates papers.json, links.json, stats.json at each search.",
    )
    
    sorting_agent = ToolCallingAgent(
        tools=[PaperSortTool(state)],
        model=model,
        name="sorting_agent",
        description="Sorts/ranks papers by recency, citations, similarity, novelty, combined. Updates leaderboard.",
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
    web_agent = ToolCallingAgent(
        tools=[WebSearchTool(), visit_webpage],
        model=model,
        max_steps=10,
        name="web_search_agent",
        description="Runs web searches for you.",
    )
    # Orchestrator
    orchestrator = CodeAgent(
        tools=[],
        model=model,
        managed_agents=[paper_search_agent, sorting_agent, analysis_agent, export_agent, web_agent],
        additional_authorized_imports=["json", "os", "datetime", "time", "numpy", "pandas"],
        planning_interval=2,
    )
    
    print(f"""
╔══════════════════════════════════════════════════════════════════╗
║         Research Pipeline Initialized                            ║
╠══════════════════════════════════════════════════════════════════╣
║  Output Directory: {output_dir:<43} ║
║                                                                  ║
║  Structured outputs updated at EACH step:                        ║
║    📄 papers.json  - All papers with details                     ║
║    🔗 links.json   - Structured web links                        ║
║    📊 stats.json   - Statistics & leaderboard                    ║
║    💡 summary.json - Insights & summary                          ║
║    🌐 dashboard.html - Live dashboard (auto-refresh)             ║
║                                                                  ║
║  Agents: paper_search, sorting, analysis, export                 ║
╚══════════════════════════════════════════════════════════════════╝
    """)
    
    return orchestrator


# ============================================================================
# Example
# ============================================================================

if __name__ == "__main__":
    pipeline = create_research_pipeline(model, output_dir="my_research")
    result = pipeline.run('''
        1. Search for "world models using " papers
        2. Sort by combined score
        3. Analyze trends and insights
        4. Export all formats
    ''')
#     print("""
# Usage:
#     from research_pipeline_v2 import create_research_pipeline
    
#     # pipeline = create_research_pipeline(model, output_dir="my_research")
    
#     result = pipeline.run('''
#         1. Search for "world models reinforcement learning" papers
#         2. Sort by combined score
#         3. Analyze trends and insights
#         4. Export all formats
#     ''')
    
#     # Check outputs anytime:
#     # - my_research/papers.json
#     # - my_research/links.json  
#     # - my_research/stats.json
#     # - my_research/summary.json
#     # - my_research/dashboard.html (live view)
#     """)
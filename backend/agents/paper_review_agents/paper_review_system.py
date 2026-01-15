"""
Open-Source Multi-Agent Research Paper Review System
=====================================================
A comprehensive system for post-mortem analysis of research papers using smolagents.
Inspired by paperreview.ai - creates detailed analysis and paper linkages.

Features:
- PDF extraction from URLs
- Multi-agent collaboration for comprehensive analysis
- Citation network analysis
- Strength/weakness identification
- Related work linkage
"""

from smolagents import (
    LiteLLMModel,
    CodeAgent,
    ToolCallingAgent,
    tool,
    MultiStepAgent
)
from dataclasses import dataclass, field
from typing import Optional, List, Dict, Any
from enum import Enum
import json
import re
import requests
from pathlib import Path
import hashlib


# ============================================================================
# Configuration
# ============================================================================

@dataclass
class Config:
    """Configuration for the paper review system."""
    api_base: str = "http://10.127.30.115:11434"
    model_id: str = "ollama_chat/gpt-oss:20b"
    api_key: Optional[str] = None
    num_ctx: int = 8192
    cache_dir: str = "./paper_cache"
    max_paper_length: int = 50000  # characters
    

# ============================================================================
# Data Models
# ============================================================================

@dataclass
class PaperMetadata:
    """Metadata extracted from a paper."""
    title: str = ""
    authors: List[str] = field(default_factory=list)
    abstract: str = ""
    venue: str = ""
    year: str = ""
    arxiv_id: str = ""
    doi: str = ""
    

@dataclass 
class PaperSection:
    """A section of the paper."""
    name: str
    content: str
    subsections: List['PaperSection'] = field(default_factory=list)


@dataclass
class Citation:
    """A citation reference."""
    key: str
    title: str
    authors: str
    year: str
    venue: str = ""
    url: str = ""


@dataclass
class PaperAnalysis:
    """Complete analysis of a paper."""
    metadata: PaperMetadata
    sections: List[PaperSection]
    citations: List[Citation]
    main_contributions: List[str]
    methodology: str
    strengths: List[str]
    weaknesses: List[str]
    questions: List[str]
    related_papers: List[Dict[str, str]]
    overall_assessment: str
    novelty_score: int  # 1-10
    clarity_score: int  # 1-10
    significance_score: int  # 1-10


# ============================================================================
# Tools for PDF Processing
# ============================================================================

@tool
def download_pdf(url: str, save_path: str = None) -> str:
    """
    Download a PDF from a URL and return the local path.

    Args:
        url: The URL of the PDF to download, or a local file path
        save_path: Optional path to save the PDF (auto-generated if not provided)

    Returns:
        The local path where the PDF was saved
    """
    import os

    # Check if url is already a local file path
    if os.path.exists(url) and url.endswith('.pdf'):
        return url

    # Create cache directory
    cache_dir = "./paper_cache"
    os.makedirs(cache_dir, exist_ok=True)

    # Generate filename from URL hash if not provided
    if save_path is None:
        url_hash = hashlib.md5(url.encode()).hexdigest()[:12]
        save_path = os.path.join(cache_dir, f"paper_{url_hash}.pdf")

    # Handle arXiv URLs
    if "arxiv.org" in url:
        if "/abs/" in url:
            url = url.replace("/abs/", "/pdf/")
        if not url.endswith(".pdf"):
            url += ".pdf"

    # Download
    headers = {
        "User-Agent": "Mozilla/5.0 (compatible; ResearchBot/1.0)"
    }

    response = requests.get(url, headers=headers, stream=True, timeout=60)
    response.raise_for_status()

    with open(save_path, 'wb') as f:
        for chunk in response.iter_content(chunk_size=8192):
            f.write(chunk)

    return save_path


@tool
def extract_text_from_pdf(pdf_path: str) -> str:
    """
    Extract text content from a PDF file.
    
    Args:
        pdf_path: Path to the PDF file
        
    Returns:
        Extracted text content from the PDF
    """
    try:
        import pymupdf  # PyMuPDF
        
        doc = pymupdf.open(pdf_path)
        text_parts = []
        
        for page_num, page in enumerate(doc):
            text = page.get_text()
            text_parts.append(f"\n--- Page {page_num + 1} ---\n{text}")
        
        doc.close()
        return "\n".join(text_parts)
        
    except ImportError:
        # Fallback to pdfplumber
        try:
            import pdfplumber
            
            text_parts = []
            with pdfplumber.open(pdf_path) as pdf:
                for i, page in enumerate(pdf.pages):
                    text = page.extract_text() or ""
                    text_parts.append(f"\n--- Page {i + 1} ---\n{text}")
            
            return "\n".join(text_parts)
            
        except ImportError:
            return "Error: Neither pymupdf nor pdfplumber is installed. Install with: pip install pymupdf pdfplumber"


@tool
def extract_paper_metadata(paper_text: str) -> str:
    """
    Extract metadata (title, authors, abstract) from paper text.
    
    Args:
        paper_text: The full text of the paper
        
    Returns:
        JSON string with extracted metadata
    """
    metadata = {
        "title": "",
        "authors": [],
        "abstract": "",
        "arxiv_id": "",
    }
    
    lines = paper_text.split('\n')
    
    # Try to find title (usually in first few lines, largest text)
    for i, line in enumerate(lines[:20]):
        line = line.strip()
        if len(line) > 20 and len(line) < 200 and not line.startswith('arXiv'):
            if not any(x in line.lower() for x in ['abstract', 'introduction', 'university', '@']):
                metadata["title"] = line
                break
    
    # Find abstract
    abstract_match = re.search(
        r'abstract[:\s]*\n?(.*?)(?=\n\s*(?:1\.?\s*)?introduction|\n\s*keywords|\n\s*1\s+\w)',
        paper_text,
        re.IGNORECASE | re.DOTALL
    )
    if abstract_match:
        metadata["abstract"] = abstract_match.group(1).strip()[:2000]
    
    # Find arXiv ID
    arxiv_match = re.search(r'arXiv:(\d{4}\.\d{4,5})', paper_text)
    if arxiv_match:
        metadata["arxiv_id"] = arxiv_match.group(1)
    
    return json.dumps(metadata, indent=2)


@tool
def extract_citations(paper_text: str) -> str:
    """
    Extract citation references from the paper.
    
    Args:
        paper_text: The full text of the paper
        
    Returns:
        JSON string with list of extracted citations
    """
    citations = []
    
    # Find references section
    ref_match = re.search(
        r'(?:references|bibliography)\s*\n(.*?)(?:\n\s*(?:appendix|supplementary)|$)',
        paper_text,
        re.IGNORECASE | re.DOTALL
    )
    
    if ref_match:
        ref_text = ref_match.group(1)
        
        # Split by reference numbers or bullets
        ref_patterns = [
            r'\n\s*\[(\d+)\]\s*',  # [1] format
            r'\n\s*(\d+)\.\s+',     # 1. format
        ]
        
        for pattern in ref_patterns:
            refs = re.split(pattern, ref_text)
            if len(refs) > 3:  # Found references
                for i in range(1, len(refs), 2):
                    if i + 1 < len(refs):
                        ref_num = refs[i]
                        ref_content = refs[i + 1].strip()[:500]
                        
                        # Try to extract title (often in quotes or italics)
                        title_match = re.search(r'["""]([^"""]+)["""]', ref_content)
                        title = title_match.group(1) if title_match else ref_content[:100]
                        
                        citations.append({
                            "key": f"[{ref_num}]",
                            "title": title,
                            "full_text": ref_content
                        })
                break
    
    return json.dumps(citations[:50], indent=2)  # Limit to 50 citations


@tool
def search_semantic_scholar(query: str, limit: int = 5) -> str:
    """
    Search for related papers using Semantic Scholar API.
    
    Args:
        query: Search query (paper title or keywords)
        limit: Maximum number of results to return
        
    Returns:
        JSON string with search results
    """
    import urllib.parse
    
    base_url = "https://api.semanticscholar.org/graph/v1/paper/search"
    params = {
        "query": query,
        "limit": limit,
        "fields": "title,authors,year,abstract,citationCount,url,venue"
    }
    
    try:
        response = requests.get(
            base_url,
            params=params,
            headers={"Accept": "application/json"},
            timeout=30
        )
        response.raise_for_status()
        
        data = response.json()
        results = []
        
        for paper in data.get("data", []):
            authors = [a.get("name", "") for a in paper.get("authors", [])]
            results.append({
                "title": paper.get("title", ""),
                "authors": ", ".join(authors[:3]) + ("..." if len(authors) > 3 else ""),
                "year": paper.get("year", ""),
                "venue": paper.get("venue", ""),
                "citations": paper.get("citationCount", 0),
                "abstract": (paper.get("abstract") or "")[:500],
                "url": paper.get("url", "")
            })

        return json.dumps(results, indent=2)

    except Exception as e:
        # Return empty array instead of error dict to maintain type consistency
        # This prevents TypeError when concatenating with other results
        print(f"⚠️  Semantic Scholar search failed: {str(e)}")
        return json.dumps([])


@tool
def search_arxiv(query: str, max_results: int = 5) -> str:
    """
    Search for papers on arXiv.
    
    Args:
        query: Search query
        max_results: Maximum number of results
        
    Returns:
        JSON string with arXiv search results
    """
    import urllib.parse
    import xml.etree.ElementTree as ET
    
    base_url = "http://export.arxiv.org/api/query"
    params = {
        "search_query": f"all:{query}",
        "start": 0,
        "max_results": max_results,
        "sortBy": "relevance",
        "sortOrder": "descending"
    }
    
    try:
        response = requests.get(base_url, params=params, timeout=30)
        response.raise_for_status()
        
        # Parse XML response
        root = ET.fromstring(response.content)
        ns = {"atom": "http://www.w3.org/2005/Atom"}
        
        results = []
        for entry in root.findall("atom:entry", ns):
            title = entry.find("atom:title", ns)
            summary = entry.find("atom:summary", ns)
            published = entry.find("atom:published", ns)
            
            authors = []
            for author in entry.findall("atom:author", ns):
                name = author.find("atom:name", ns)
                if name is not None:
                    authors.append(name.text)
            
            # Get PDF link
            pdf_link = ""
            for link in entry.findall("atom:link", ns):
                if link.get("title") == "pdf":
                    pdf_link = link.get("href", "")
                    break
            
            results.append({
                "title": title.text.strip() if title is not None else "",
                "authors": ", ".join(authors[:3]) + ("..." if len(authors) > 3 else ""),
                "year": published.text[:4] if published is not None else "",
                "abstract": (summary.text or "").strip()[:500],
                "pdf_url": pdf_link
            })

        return json.dumps(results, indent=2)

    except Exception as e:
        # Return empty array instead of error dict to maintain type consistency
        # This prevents TypeError when concatenating with other results
        print(f"⚠️  arXiv search failed: {str(e)}")
        return json.dumps([])


# ============================================================================
# Specialized Agents
# ============================================================================

def create_pdf_processor_agent(model: LiteLLMModel) -> ToolCallingAgent:
    """Create an agent specialized in PDF processing and text extraction."""
    
    return ToolCallingAgent(
        tools=[download_pdf, extract_text_from_pdf, extract_paper_metadata],
        model=model,
        name="pdf_processor",
        description="Specializes in downloading PDFs and extracting text content and metadata from research papers.",
        instructions="""You are a PDF processing specialist. Your job is to:
1. Download PDFs from URLs (including arXiv links)
2. Extract text content from PDFs
3. Extract metadata like title, authors, and abstract

Always return clean, well-structured text. Handle arXiv URLs by converting /abs/ to /pdf/ format."""
    )


def create_analysis_agent(model: LiteLLMModel) -> ToolCallingAgent:
    """Create an agent specialized in deep paper analysis."""
    
    return ToolCallingAgent(
        tools=[],
        model=model,
        name="paper_analyzer",
        description="Analyzes research papers in depth, identifying methodology, contributions, and structure.",
        instructions="""You are a senior research paper analyst. Your job is to provide deep analysis of research papers:

1. **Methodology Analysis**: Identify and explain the paper's methodology in detail
2. **Main Contributions**: List the key contributions claimed by the paper
3. **Technical Depth**: Assess the technical rigor and mathematical foundations
4. **Experimental Design**: Evaluate the experimental setup, baselines, and metrics
5. **Section Summary**: Provide brief summaries of each major section

Be thorough but concise. Focus on technical accuracy and scientific rigor."""
    )


def create_critique_agent(model: LiteLLMModel) -> ToolCallingAgent:
    """Create an agent specialized in critical paper review."""
    
    return ToolCallingAgent(
        tools=[],
        model=model,
        name="paper_critic",
        description="Provides critical review of papers, identifying strengths, weaknesses, and open questions.",
        instructions="""You are a critical paper reviewer with expertise across ML/AI. Provide balanced critique:

**Strengths**: What does this paper do well? Consider:
- Novelty of approach
- Quality of experiments
- Clarity of presentation
- Significance of results

**Weaknesses**: What are the limitations? Consider:
- Missing baselines or comparisons
- Questionable assumptions
- Limited scope or applicability
- Reproducibility concerns

**Questions**: What would you ask the authors?

**Scores** (1-10):
- Novelty: How new is this work?
- Clarity: How well is it written?
- Significance: How important is the contribution?

Be constructive and specific. Avoid generic criticism."""
    )


def create_literature_agent(model: LiteLLMModel) -> ToolCallingAgent:
    """Create an agent specialized in finding related work and citations."""
    
    return ToolCallingAgent(
        tools=[search_semantic_scholar, search_arxiv, extract_citations],
        model=model,
        name="literature_expert",
        description="Finds related papers, analyzes citations, and builds knowledge graphs of paper relationships.",
        instructions="""You are a literature review specialist. Your job is to:

1. Extract and analyze citations from papers
2. Find related work using Semantic Scholar and arXiv
3. Identify key papers in the same research area
4. Map relationships between papers (builds on, competes with, extends)

For each related paper, explain:
- How it relates to the main paper
- Whether it's cited in the paper
- Its relevance and importance"""
    )


# ============================================================================
# Main Pipeline Orchestrator
# ============================================================================

class PaperReviewPipeline:
    """
    Multi-agent pipeline for comprehensive paper review.
    
    Agents:
    1. PDF Processor - Downloads and extracts text
    2. Analyzer - Deep technical analysis
    3. Critic - Strengths/weaknesses review
    4. Literature Expert - Related work and citations
    """
    
    def __init__(self, config: Config = None):
        self.config = config or Config()
        
        # Build model kwargs - num_ctx is Ollama-specific
        model_kwargs = {
            "model_id": self.config.model_id,
            "api_base": self.config.api_base,
            "api_key": self.config.api_key,
            "drop_params": True,  # Drop unsupported params for OpenRouter/other providers
        }
        # Only add num_ctx for Ollama models
        if "ollama" in self.config.model_id.lower():
            model_kwargs["num_ctx"] = self.config.num_ctx

        # Initialize model
        self.model = LiteLLMModel(**model_kwargs)
        
        # Create specialized agents
        self.pdf_agent = create_pdf_processor_agent(self.model)
        self.analysis_agent = create_analysis_agent(self.model)
        self.critique_agent = create_critique_agent(self.model)
        self.literature_agent = create_literature_agent(self.model)
        
        # Create managed agents for orchestration
        self.managed_agents = [
            self.pdf_agent,
            self.analysis_agent,
            self.critique_agent,
            self.literature_agent,
        ]
        # Create orchestrator agent
        self.orchestrator = CodeAgent(
            tools=[download_pdf, extract_text_from_pdf, search_semantic_scholar, search_arxiv],
            model=self.model,
            managed_agents=self.managed_agents,
            name="orchestrator",
            description="Coordinates the paper review pipeline",
            instructions="""You are the orchestrator of a multi-agent paper review system.

Given a paper URL or PDF, coordinate the review process:
1. Use pdf_processor to download and extract paper text
2. Use literature_expert to find related papers
3. Compile a comprehensive review

Be efficient and thorough."""
        )
    
    def review_paper(self, paper_url: str, detailed: bool = True) -> Dict[str, Any]:
        """
        Run complete paper review pipeline.
        
        Args:
            paper_url: URL to the paper (PDF link or arXiv URL)
            detailed: Whether to run full detailed analysis
            
        Returns:
            Dictionary with complete paper analysis
        """
        print(f"\n{'='*60}")
        print(f"Starting Paper Review Pipeline")
        print(f"URL: {paper_url}")
        print(f"{'='*60}\n")
        
        results = {}
        
        # Step 1: Download and extract PDF
        print("📥 Step 1: Downloading and extracting PDF...")
        try:
            pdf_path = download_pdf(paper_url)
            paper_text = extract_text_from_pdf(pdf_path)
            results["pdf_path"] = pdf_path
            results["text_length"] = len(paper_text)
            print(f"   ✓ Extracted {len(paper_text)} characters")
        except Exception as e:
            print(f"   ✗ Error: {e}")
            return {"error": f"Failed to process PDF: {e}"}
        
        # Step 2: Extract metadata
        print("\n📋 Step 2: Extracting metadata...")
        try:
            metadata_json = extract_paper_metadata(paper_text)
            metadata = json.loads(metadata_json)
            results["metadata"] = metadata
            print(f"   ✓ Title: {metadata.get('title', 'Unknown')[:60]}...")
        except Exception as e:
            print(f"   ✗ Error: {e}")
            results["metadata"] = {}
        
        # Step 3: Deep analysis
        print("\n🔬 Step 3: Running deep analysis...")
        try:
            analysis_prompt = f"""Analyze this research paper in detail:

Title: {metadata.get('title', 'Unknown')}

Paper text (truncated):
{paper_text[:self.config.max_paper_length]}

Provide:
1. Summary of the paper (2-3 paragraphs)
2. Main contributions (bullet points)
3. Methodology overview
4. Key results and findings
5. Technical approach details"""

            analysis_result = self.analysis_agent.run(analysis_prompt)
            results["analysis"] = analysis_result
            print("   ✓ Analysis complete")
        except Exception as e:
            print(f"   ✗ Error: {e}")
            results["analysis"] = f"Error during analysis: {e}"
        
        # Step 4: Critical review
        print("\n⚖️ Step 4: Running critical review...")
        try:
            critique_prompt = f"""Provide a critical review of this paper:

Title: {metadata.get('title', 'Unknown')}

Abstract: {metadata.get('abstract', 'No abstract found')}

Paper text (truncated):
{paper_text[:self.config.max_paper_length]}

Provide:
1. Strengths (at least 3)
2. Weaknesses (at least 3)
3. Questions for authors (at least 3)
4. Scores (1-10): Novelty, Clarity, Significance
5. Overall assessment and recommendation"""

            critique_result = self.critique_agent.run(critique_prompt)
            results["critique"] = critique_result
            print("   ✓ Critique complete")
        except Exception as e:
            print(f"   ✗ Error: {e}")
            results["critique"] = f"Error during critique: {e}"
        
        # Step 5: Find related work
        print("\n📚 Step 5: Finding related papers...")
        try:
            # Search for related papers
            title = metadata.get('title', '')
            if title:
                ss_results = search_semantic_scholar(title[:100], limit=5)
                arxiv_results = search_arxiv(title[:100], max_results=5)
                
                results["related_semantic_scholar"] = json.loads(ss_results)
                results["related_arxiv"] = json.loads(arxiv_results)
                print(f"   ✓ Found related papers")
            
            # Extract citations
            citations_json = extract_citations(paper_text)
            results["citations"] = json.loads(citations_json)
            print(f"   ✓ Extracted {len(results.get('citations', []))} citations")
            
        except Exception as e:
            print(f"   ✗ Error: {e}")
            results["related_papers"] = []
        
        # Step 6: Generate final report
        print("\n📝 Step 6: Generating final report...")
        results["status"] = "complete"
        
        return results
    
    def generate_report(self, results: Dict[str, Any], output_format: str = "markdown") -> str:
        """
        Generate a formatted report from review results.
        
        Args:
            results: Dictionary of review results
            output_format: Output format ("markdown", "json", "html")
            
        Returns:
            Formatted report string
        """
        if output_format == "json":
            return json.dumps(results, indent=2)
        
        metadata = results.get("metadata", {})
        
        report = f"""# Paper Review Report

## Paper Information
- **Title**: {metadata.get('title', 'Unknown')}
- **Authors**: {', '.join(metadata.get('authors', ['Unknown']))}
- **arXiv ID**: {metadata.get('arxiv_id', 'N/A')}

## Abstract
{metadata.get('abstract', 'No abstract available')}

---

## Deep Analysis
{results.get('analysis', 'Analysis not available')}

---

## Critical Review
{results.get('critique', 'Critique not available')}

---

## Related Papers

### From Semantic Scholar
"""
        for paper in results.get("related_semantic_scholar", [])[:5]:
            if isinstance(paper, dict):
                report += f"- **{paper.get('title', 'Unknown')}** ({paper.get('year', 'N/A')}) - {paper.get('citations', 0)} citations\n"
        
        report += "\n### From arXiv\n"
        for paper in results.get("related_arxiv", [])[:5]:
            if isinstance(paper, dict):
                report += f"- **{paper.get('title', 'Unknown')}** ({paper.get('year', 'N/A')})\n"
        
        report += f"""
---

## Citations Extracted
Found {len(results.get('citations', []))} citations in the paper.

---

*Report generated by Open-Source Paper Review System*
"""
        return report


# ============================================================================
# CLI Interface
# ============================================================================

def main():
    """Main entry point for CLI usage."""
    import argparse
    
    parser = argparse.ArgumentParser(
        description="Multi-Agent Paper Review System",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python paper_review_system.py https://arxiv.org/abs/2312.12345
  python paper_review_system.py paper.pdf --local
  python paper_review_system.py https://arxiv.org/pdf/2312.12345.pdf --output report.md
        """
    )
    
    parser.add_argument("paper", help="Paper URL or local PDF path")
    parser.add_argument("--local", action="store_true", help="Paper is a local file")
    parser.add_argument("--output", "-o", help="Output file path")
    parser.add_argument("--format", "-f", choices=["markdown", "json"], default="markdown")
    parser.add_argument("--api-base", default="http://10.127.30.115:11434")
    parser.add_argument("--model", default="ollama_chat/gpt-oss:20b")
    
    args = parser.parse_args()
    
    # Create config
    config = Config(
        api_base=args.api_base,
        model_id=args.model
    )
    
    # Create pipeline
    pipeline = PaperReviewPipeline(config)
    
    # Run review
    if args.local:
        # For local files, skip download
        paper_text = extract_text_from_pdf(args.paper)
        # TODO: Add local file handling
        print("Local file support coming soon!")
        return
    else:
        results = pipeline.review_paper(args.paper)
    
    # Generate report
    report = pipeline.generate_report(results, args.format)
    
    # Output
    if args.output:
        with open(args.output, 'w') as f:
            f.write(report)
        print(f"\n✓ Report saved to {args.output}")
    else:
        print("\n" + "="*60)
        print(report)


if __name__ == "__main__":
    main()

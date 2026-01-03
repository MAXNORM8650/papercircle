"""
Paper Mind Graph - Ingestion & Parsing Layer
=============================================
Handles PDF parsing, structure extraction, and chunking.
"""

import re
import json
import hashlib
import requests
from pathlib import Path
from typing import List, Dict, Any, Optional, Tuple
from dataclasses import dataclass

from .schema import (
    PaperMetadata, Section, Figure, Table, Equation, Chunk,
    SourceLocation, MindGraph, generate_id
)


# ============================================================================
# PDF Download
# ============================================================================

def download_pdf(url: str, cache_dir: str = "./paper_cache") -> str:
    """
    Download a PDF from URL (handles arXiv, direct links).
    
    Args:
        url: URL to the PDF
        cache_dir: Directory to cache downloads
        
    Returns:
        Local path to the PDF
    """
    import os
    os.makedirs(cache_dir, exist_ok=True)
    
    # Generate filename from URL hash
    url_hash = hashlib.md5(url.encode()).hexdigest()[:12]
    save_path = os.path.join(cache_dir, f"paper_{url_hash}.pdf")
    
    # Check cache
    if os.path.exists(save_path):
        return save_path
    
    # Handle arXiv URLs
    if "arxiv.org" in url:
        if "/abs/" in url:
            url = url.replace("/abs/", "/pdf/")
        if not url.endswith(".pdf"):
            url += ".pdf"
    
    # Download
    headers = {"User-Agent": "Mozilla/5.0 (compatible; PaperMindGraph/1.0)"}
    response = requests.get(url, headers=headers, stream=True, timeout=60)
    response.raise_for_status()
    
    with open(save_path, 'wb') as f:
        for chunk in response.iter_content(chunk_size=8192):
            f.write(chunk)
    
    return save_path


# ============================================================================
# PDF Parsing
# ============================================================================

class PDFParser:
    """
    Parse PDFs to extract structure, text, figures, tables, equations.
    Uses PyMuPDF (fitz) for robust extraction.
    """
    
    def __init__(self, pdf_path: str):
        self.pdf_path = pdf_path
        self.doc = None
        
    def __enter__(self):
        try:
            import pymupdf as fitz
        except ImportError:
            import fitz
        self.doc = fitz.open(self.pdf_path)
        return self
    
    def __exit__(self, *args):
        if self.doc:
            self.doc.close()
    
    def extract_text_with_positions(self) -> List[Dict]:
        """Extract text blocks with page and position info."""
        blocks = []
        
        for page_num, page in enumerate(self.doc):
            text_dict = page.get_text("dict")
            
            for block in text_dict.get("blocks", []):
                if block.get("type") == 0:  # Text block
                    text = ""
                    for line in block.get("lines", []):
                        for span in line.get("spans", []):
                            text += span.get("text", "")
                        text += "\n"
                    
                    if text.strip():
                        blocks.append({
                            "page": page_num + 1,
                            "bbox": block.get("bbox"),
                            "text": text.strip(),
                            "type": "text"
                        })
        
        return blocks
    
    def extract_metadata(self) -> PaperMetadata:
        """Extract paper metadata."""
        metadata = PaperMetadata(num_pages=len(self.doc))
        
        # Try PDF metadata first
        pdf_meta = self.doc.metadata
        if pdf_meta.get("title"):
            metadata.title = pdf_meta["title"]
        if pdf_meta.get("author"):
            metadata.authors = [a.strip() for a in pdf_meta["author"].split(",")]
        
        # Extract from first pages if needed
        first_page_text = ""
        for i in range(min(2, len(self.doc))):
            first_page_text += self.doc[i].get_text()
        
        # Find title (usually first large text)
        if not metadata.title:
            lines = first_page_text.split('\n')
            for line in lines[:10]:
                line = line.strip()
                if len(line) > 20 and len(line) < 200:
                    if not any(x in line.lower() for x in ['abstract', 'introduction', '@', 'university']):
                        metadata.title = line
                        break
        
        # Find abstract
        abstract_match = re.search(
            r'abstract[:\s]*\n?(.*?)(?=\n\s*(?:1\.?\s*)?introduction|\n\s*keywords|\n\s*1\s+\w)',
            first_page_text,
            re.IGNORECASE | re.DOTALL
        )
        if abstract_match:
            metadata.abstract = abstract_match.group(1).strip()[:2000]
        
        # Find arXiv ID
        arxiv_match = re.search(r'arXiv:(\d{4}\.\d{4,5})', first_page_text)
        if arxiv_match:
            metadata.arxiv_id = arxiv_match.group(1)
        
        return metadata
    
    def extract_sections(self) -> List[Section]:
        """Extract sections and their hierarchy."""
        sections = []
        full_text = ""
        
        for page in self.doc:
            full_text += page.get_text()
        
        # Section patterns (handles "1 Introduction", "1. Introduction", "1.1 Background")
        section_pattern = r'\n\s*(\d+(?:\.\d+)*)\s*\.?\s+([A-Z][^\n]{2,60})\s*\n'
        
        matches = list(re.finditer(section_pattern, full_text))
        
        for i, match in enumerate(matches):
            num = match.group(1)
            title = match.group(2).strip()
            level = num.count('.') + 1
            
            # Get text until next section
            start = match.end()
            if i + 1 < len(matches):
                end = matches[i + 1].start()
            else:
                end = len(full_text)
            
            text = full_text[start:end].strip()
            
            # Find page span
            page_start = self._find_page_for_position(match.start())
            page_end = self._find_page_for_position(end)
            
            section_id = f"sec_{num.replace('.', '_')}"
            
            section = Section(
                id=section_id,
                title=f"{num} {title}",
                level=level,
                text=text[:10000],  # Limit text length
                page_span=(page_start, page_end)
            )
            
            # Set parent/child relationships
            if level > 1:
                parent_num = '.'.join(num.split('.')[:-1])
                parent_id = f"sec_{parent_num.replace('.', '_')}"
                section.parent_id = parent_id
                
                # Update parent's children
                for s in sections:
                    if s.id == parent_id:
                        s.children_ids.append(section_id)
                        break
            
            sections.append(section)
        
        return sections
    
    def _find_page_for_position(self, char_pos: int) -> int:
        """Find which page a character position is on."""
        current_pos = 0
        for page_num, page in enumerate(self.doc):
            page_text = page.get_text()
            if current_pos + len(page_text) > char_pos:
                return page_num + 1
            current_pos += len(page_text)
        return len(self.doc)
    
    def extract_figures(self) -> List[Figure]:
        """Extract figures and their captions."""
        figures = []
        full_text = ""
        page_offsets = [0]
        
        for page in self.doc:
            page_text = page.get_text()
            full_text += page_text
            page_offsets.append(len(full_text))
        
        # Find figure captions
        fig_pattern = r'(Figure|Fig\.?)\s*(\d+)[:\.]?\s*([^\n]+(?:\n(?![A-Z0-9])[^\n]+)*)'
        
        for match in re.finditer(fig_pattern, full_text, re.IGNORECASE):
            fig_num = match.group(2)
            caption = match.group(3).strip()[:500]
            
            # Find page
            pos = match.start()
            page = 1
            for i, offset in enumerate(page_offsets[1:], 1):
                if pos < offset:
                    page = i
                    break
            
            # Get nearby text (before and after caption)
            start = max(0, match.start() - 500)
            end = min(len(full_text), match.end() + 200)
            nearby = full_text[start:end]
            
            fig = Figure(
                id=f"fig_{fig_num}",
                label=f"Figure {fig_num}",
                caption=caption,
                page=page,
                nearby_text=nearby
            )
            figures.append(fig)
        
        return figures
    
    def extract_tables(self) -> List[Table]:
        """Extract tables and their captions."""
        tables = []
        full_text = ""
        page_offsets = [0]
        
        for page in self.doc:
            page_text = page.get_text()
            full_text += page_text
            page_offsets.append(len(full_text))
        
        # Find table captions
        table_pattern = r'(Table)\s*(\d+)[:\.]?\s*([^\n]+(?:\n(?![A-Z0-9])[^\n]+)*)'
        
        for match in re.finditer(table_pattern, full_text, re.IGNORECASE):
            table_num = match.group(2)
            caption = match.group(3).strip()[:500]
            
            # Find page
            pos = match.start()
            page = 1
            for i, offset in enumerate(page_offsets[1:], 1):
                if pos < offset:
                    page = i
                    break
            
            # Get nearby text
            start = max(0, match.start() - 200)
            end = min(len(full_text), match.end() + 500)
            nearby = full_text[start:end]
            
            table = Table(
                id=f"table_{table_num}",
                label=f"Table {table_num}",
                caption=caption,
                page=page,
                nearby_text=nearby
            )
            tables.append(table)
        
        return tables
    
    def extract_equations(self) -> List[Equation]:
        """Extract equations (numbered ones)."""
        equations = []
        full_text = ""
        
        for page_num, page in enumerate(self.doc):
            page_text = page.get_text()
            full_text += page_text
        
        # Find numbered equations
        eq_pattern = r'\((\d+(?:\.\d+)?)\)\s*$'
        
        lines = full_text.split('\n')
        for i, line in enumerate(lines):
            match = re.search(eq_pattern, line.strip())
            if match:
                eq_num = match.group(1)
                
                # Get context (a few lines before)
                start = max(0, i - 3)
                context = '\n'.join(lines[start:i+1])
                
                eq = Equation(
                    id=f"eq_{eq_num.replace('.', '_')}",
                    latex="",  # Would need LaTeX parser
                    equation_number=eq_num,
                    context=context
                )
                equations.append(eq)
        
        return equations
    
    def extract_all(self) -> Dict[str, Any]:
        """Extract all structure from the PDF."""
        return {
            "metadata": self.extract_metadata(),
            "sections": self.extract_sections(),
            "figures": self.extract_figures(),
            "tables": self.extract_tables(),
            "equations": self.extract_equations()
        }


# ============================================================================
# Chunking
# ============================================================================

class SemanticChunker:
    """
    Create semantic chunks from paper structure.
    Chunks by structure, not arbitrary token counts.
    """
    
    def __init__(self, max_chunk_size: int = 1500):
        self.max_chunk_size = max_chunk_size
    
    def chunk_paper(
        self,
        metadata: PaperMetadata,
        sections: List[Section],
        figures: List[Figure],
        tables: List[Table],
        equations: List[Equation]
    ) -> List[Chunk]:
        """Create semantic chunks from paper structure."""
        chunks = []
        
        # Abstract as its own chunk
        if metadata.abstract:
            chunks.append(Chunk(
                id=generate_id("chunk"),
                text=metadata.abstract,
                source_type="abstract",
                section_id=None,
                page_span=(1, 1)
            ))
        
        # Chunk sections
        for section in sections:
            section_chunks = self._chunk_section(section)
            chunks.extend(section_chunks)
        
        # Figures as chunks (caption + nearby text)
        for fig in figures:
            text = f"{fig.label}: {fig.caption}\n\nContext: {fig.nearby_text[:500]}"
            chunks.append(Chunk(
                id=generate_id("chunk"),
                text=text,
                source_type="figure",
                section_id=None,
                page_span=(fig.page, fig.page)
            ))
        
        # Tables as chunks
        for table in tables:
            text = f"{table.label}: {table.caption}\n\nContext: {table.nearby_text[:500]}"
            if table.content:
                text += f"\n\nContent:\n{table.content[:500]}"
            chunks.append(Chunk(
                id=generate_id("chunk"),
                text=text,
                source_type="table",
                section_id=None,
                page_span=(table.page, table.page)
            ))
        
        # Equations as chunks
        for eq in equations:
            text = f"Equation {eq.equation_number}:\n{eq.context}"
            chunks.append(Chunk(
                id=generate_id("chunk"),
                text=text,
                source_type="equation",
                section_id=None,
                page_span=(eq.page, eq.page)
            ))
        
        return chunks
    
    def _chunk_section(self, section: Section) -> List[Chunk]:
        """Chunk a section by paragraphs."""
        chunks = []
        
        if not section.text:
            return chunks
        
        # Split by paragraphs
        paragraphs = re.split(r'\n\s*\n', section.text)
        
        current_chunk = ""
        for para in paragraphs:
            para = para.strip()
            if not para:
                continue
            
            # If adding this paragraph would exceed limit, save current chunk
            if len(current_chunk) + len(para) > self.max_chunk_size and current_chunk:
                chunks.append(Chunk(
                    id=generate_id("chunk"),
                    text=current_chunk.strip(),
                    source_type="body",
                    section_id=section.id,
                    page_span=section.page_span
                ))
                current_chunk = para
            else:
                current_chunk += "\n\n" + para if current_chunk else para
        
        # Save remaining text
        if current_chunk.strip():
            chunks.append(Chunk(
                id=generate_id("chunk"),
                text=current_chunk.strip(),
                source_type="body",
                section_id=section.id,
                page_span=section.page_span
            ))
        
        return chunks


# ============================================================================
# Main Ingestion Pipeline
# ============================================================================

class IngestionPipeline:
    """
    Complete pipeline for ingesting a paper and creating initial structure.
    """
    
    def __init__(self, cache_dir: str = "./paper_cache"):
        self.cache_dir = cache_dir
        self.chunker = SemanticChunker()
    
    def ingest(self, paper_source: str) -> MindGraph:
        """
        Ingest a paper from URL or file path.
        
        Args:
            paper_source: URL or local path to PDF
            
        Returns:
            MindGraph with parsed structure and chunks
        """
        # Download if URL
        if paper_source.startswith("http"):
            pdf_path = download_pdf(paper_source, self.cache_dir)
        else:
            pdf_path = paper_source
        
        # Parse PDF
        with PDFParser(pdf_path) as parser:
            metadata = parser.extract_metadata()
            sections = parser.extract_sections()
            figures = parser.extract_figures()
            tables = parser.extract_tables()
            equations = parser.extract_equations()
        
        # Generate paper ID
        paper_id = generate_id("paper")
        if metadata.arxiv_id:
            paper_id = f"paper_{metadata.arxiv_id.replace('.', '_')}"
        
        # Create chunks
        chunks = self.chunker.chunk_paper(
            metadata, sections, figures, tables, equations
        )
        
        # Create mind graph
        graph = MindGraph(
            paper_id=paper_id,
            metadata=metadata,
            sections=sections,
            figures=figures,
            tables=tables,
            equations=equations,
            chunks=chunks
        )
        
        # Add basic structural nodes
        self._add_structural_nodes(graph)
        
        return graph
    
    def _add_structural_nodes(self, graph: MindGraph):
        """Add nodes for paper structure (sections, figures, tables)."""
        from .schema import GraphNode, NodeType, GraphEdge, EdgeType
        
        # Paper root node
        paper_node = GraphNode(
            id=graph.paper_id,
            type=NodeType.PAPER,
            title=graph.metadata.title,
            description=graph.metadata.abstract,
            origin_pages=[1]
        )
        graph.add_node(paper_node)
        
        # Section nodes
        for section in graph.sections:
            section_node = GraphNode(
                id=section.id,
                type=NodeType.SECTION,
                title=section.title,
                description=section.text[:500] if section.text else "",
                origin_pages=list(range(section.page_span[0], section.page_span[1] + 1))
            )
            graph.add_node(section_node)
            
            # Edge from paper or parent section
            if section.parent_id:
                edge = GraphEdge(
                    id=generate_id("edge"),
                    type=EdgeType.HAS_SUBSECTION,
                    source_id=section.parent_id,
                    target_id=section.id
                )
            else:
                edge = GraphEdge(
                    id=generate_id("edge"),
                    type=EdgeType.HAS_SECTION,
                    source_id=graph.paper_id,
                    target_id=section.id
                )
            graph.add_edge(edge)
        
        # Figure nodes
        for fig in graph.figures:
            fig_node = GraphNode(
                id=fig.id,
                type=NodeType.FIGURE,
                title=fig.label,
                description=fig.caption,
                label=fig.label,
                caption=fig.caption,
                origin_pages=[fig.page]
            )
            graph.add_node(fig_node)
        
        # Table nodes
        for table in graph.tables:
            table_node = GraphNode(
                id=table.id,
                type=NodeType.TABLE,
                title=table.label,
                description=table.caption,
                label=table.label,
                caption=table.caption,
                origin_pages=[table.page]
            )
            graph.add_node(table_node)
        
        # Equation nodes
        for eq in graph.equations:
            eq_node = GraphNode(
                id=eq.id,
                type=NodeType.EQUATION,
                title=f"Equation {eq.equation_number}",
                description=eq.context[:200],
                latex=eq.latex,
                equation_number=eq.equation_number,
                origin_pages=[eq.page]
            )
            graph.add_node(eq_node)


# ============================================================================
# Convenience Functions
# ============================================================================

def ingest_paper(paper_source: str) -> MindGraph:
    """Quick function to ingest a paper."""
    pipeline = IngestionPipeline()
    return pipeline.ingest(paper_source)


def parse_pdf(pdf_path: str) -> Dict[str, Any]:
    """Quick function to parse a PDF."""
    with PDFParser(pdf_path) as parser:
        return parser.extract_all()

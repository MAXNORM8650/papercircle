"""
Supabase Integration for AI Discovery Pipeline
==============================================
Automatically saves AI Discovery results directly to Supabase.

This module extends PipelineState to save papers to Supabase in addition to local files.
Works both locally and in deployed serverless environments.
"""

import os
from datetime import datetime
from typing import List, Dict, Optional
try:
    from supabase import create_client, Client
    HAS_SUPABASE = True
except ImportError:
    HAS_SUPABASE = False
    print("Warning: supabase-py not installed. Install with: pip install supabase")


class SupabasePipelineSaver:
    """
    Saves pipeline results directly to Supabase.
    
    Papers are saved to:
    - `papers` table - Full paper data
    - `community_papers_global` table - Makes them available in Community Papers tab
    """
    
    def __init__(self, use_supabase: bool = True):
        self.use_supabase = use_supabase and HAS_SUPABASE
        self.supabase: Optional[Client] = None
        
        if self.use_supabase:
            self._init_supabase()
    
    def _init_supabase(self):
        """Initialize Supabase client."""
        try:
            supabase_url = os.getenv("VITE_SUPABASE_URL")
            # Try service role key first, fall back to anon key
            supabase_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("VITE_SUPABASE_ANON_KEY")
            
            if not supabase_url or not supabase_key:
                print("⚠️  Supabase credentials not found in environment. Skipping Supabase sync.")
                self.use_supabase = False
                return
            
            self.supabase = create_client(supabase_url, supabase_key)
            print("✅ Supabase client initialized for AI Discovery pipeline")
            
        except Exception as e:
            print(f"❌ Failed to initialize Supabase client: {e}")
            self.use_supabase = False
    
    def save_papers_to_supabase(self, papers: List, query: str, run_timestamp: str = None):
        """
        Save papers from AI Discovery to Supabase.
        
        Args:
            papers: List of Paper objects from the pipeline
            query: The search query used
            run_timestamp: Optional timestamp (defaults to current time)
        """
        if not self.use_supabase or not self.supabase:
            return
        
        if not papers:
            print("No papers to save to Supabase")
            return
        
        # Generate run timestamp if not provided
        if not run_timestamp:
            run_timestamp = datetime.utcnow().strftime("%Y%m%d_%H%M%S")
        
        saved_count = 0
        skipped_count = 0
        error_count = 0
        
        print(f"\n💾 Saving {len(papers)} papers from AI Discovery to Supabase...")
        
        for paper in papers:
            try:
                # Check if paper already exists (by title or arxiv_id)
                existing = None
                
                # Try to find by arxiv_id first
                if hasattr(paper, 'id') and paper.id:
                    arxiv_id = paper.id if 'arxiv.org' in str(paper.url) else None
                    if arxiv_id:
                        result = self.supabase.table('papers').select('id').eq('arxiv_id', arxiv_id).limit(1).execute()
                        if result.data:
                            existing = result.data[0]
                
                # Fall back to title search
                if not existing and paper.title:
                    result = self.supabase.table('papers').select('id').eq('title', paper.title).limit(1).execute()
                    if result.data:
                        existing = result.data[0]
                
                # Prepare paper record
                paper_record = {
                    'title': paper.title,
                    'authors': paper.authors if isinstance(paper.authors, list) else [paper.authors] if paper.authors else [],
                    'abstract': paper.abstract or '',
                    'year': paper.year,
                    'venue': paper.venue or '',
                    'pdf_url': paper.pdf_url or paper.url or '',
                    'arxiv_id': paper.id if hasattr(paper, 'id') and 'arxiv.org' in str(paper.url) else None,
                    'import_source': 'ai_discovery',
                    'keywords': paper.keywords.split(';') if isinstance(paper.keywords, str) else paper.keywords if paper.keywords else [],
                    'tldr': paper.tldr if hasattr(paper, 'tldr') else '',
                    'track': paper.track if hasattr(paper, 'track') else '',
                    'paper_status': paper.status if hasattr(paper, 'status') else '',
                    'primary_area': paper.primary_area if hasattr(paper, 'primary_area') else '',
                    'citation_count': paper.citations if hasattr(paper, 'citations') else 0,
                }
                
                # Insert or update paper
                if existing:
                    paper_id = existing['id']
                    # Optionally update existing paper
                    # self.supabase.table('papers').update(paper_record).eq('id', paper_id).execute()
                    skipped_count += 1
                else:
                    # Insert new paper
                    insert_result = self.supabase.table('papers').insert(paper_record).execute()
                    if insert_result.data:
                        paper_id = insert_result.data[0]['id']
                        saved_count += 1
                    else:
                        error_count += 1
                        continue
                
                # Add to community_papers_global for visibility
                cpg_record = {
                    'paper_id': paper_id,
                    'source': 'ai_discovery',
                    'run_timestamp': run_timestamp,
                    'query': query[:255] if query else None,  # Limit query length
                    'rank': paper.rank if hasattr(paper, 'rank') else None,
                    'similarity_score': paper.similarity_score if hasattr(paper, 'similarity_score') else None,
                    'novelty_score': paper.novelty_score if hasattr(paper, 'novelty_score') else None,
                    'recency_score': paper.recency_score if hasattr(paper, 'recency_score') else None,
                    'bm25_score': paper.bm25_score if hasattr(paper, 'bm25_score') else None,
                    'combined_score': paper.combined_score if hasattr(paper, 'combined_score') else None,
                }
                
                # Upsert to community_papers_global
                try:
                    self.supabase.table('community_papers_global').upsert(
                        cpg_record,
                        on_conflict='paper_id,run_timestamp'
                    ).execute()
                except Exception as upsert_error:
                    # If upsert fails, try insert
                    try:
                        self.supabase.table('community_papers_global').insert(cpg_record).execute()
                    except Exception as insert_error:
                        print(f"  ⚠️  Could not add to community_papers_global: {insert_error}")
                
            except Exception as e:
                print(f"  ❌ Error saving paper '{paper.title[:50]}...': {e}")
                error_count += 1
                continue
        
        print(f"✅ Supabase sync complete:")
        print(f"   - Saved: {saved_count} new papers")
        print(f"   - Skipped: {skipped_count} (already exist)")
        print(f"   - Errors: {error_count}")
        print(f"   - Papers are now available in Community Papers tab!")
        
        return {
            'saved': saved_count,
            'skipped': skipped_count,
            'errors': error_count,
            'run_timestamp': run_timestamp
        }


# Global instance
supabase_saver = SupabasePipelineSaver()


def save_pipeline_to_supabase(pipeline_state, use_supabase: bool = True):
    """
    Save pipeline results to Supabase.
    
    Args:
        pipeline_state: The PipelineState object from pca.py
        use_supabase: Whether to save to Supabase (set to False to disable)
    
    Returns:
        dict with save statistics
    """
    if not use_supabase:
        return None
    
    return supabase_saver.save_papers_to_supabase(
        papers=pipeline_state.papers,
        query=pipeline_state.query,
        run_timestamp=None  # Auto-generate
    )

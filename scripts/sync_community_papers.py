#!/usr/bin/env python3
"""
Community Papers Sync Script
=============================
Standalone Python script to sync papers from local files to Supabase.
Run this locally or via cron/GitHub Actions - NO server needed!

Usage:
    python sync_community_papers.py --source full
    python sync_community_papers.py --source research_output
    python sync_community_papers.py --source conference_db
"""

import json
import os
import re
import time
import argparse
from pathlib import Path
from datetime import datetime
from typing import Optional, List, Dict, Any
from dotenv import load_dotenv
from supabase import create_client, Client

# Load environment variables
load_dotenv()

# Supabase client
SUPABASE_URL = os.getenv("VITE_SUPABASE_URL", "")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
if not SUPABASE_SERVICE_KEY:
    SUPABASE_SERVICE_KEY = os.getenv("VITE_SUPABASE_ANON_KEY", "")
    print("⚠️  Warning: Using anon key instead of service role key.")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

# Paths
SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
RESEARCH_OUTPUT_PATH = PROJECT_ROOT / "research_output"
DATABASE_PATH = RESEARCH_OUTPUT_PATH / "database"

# ============================================================================
# Helper Functions
# ============================================================================

def parse_timestamp_dir(dirname: str) -> Optional[str]:
    """Parse YYYYMMDD_HHMMSS format directory name."""
    pattern = r'^(\d{8}_\d{6})$'
    match = re.match(pattern, dirname)
    return match.group(1) if match else None


def create_sync_run(source_type: str) -> str:
    """Create a new sync run record in Supabase."""
    run_timestamp = datetime.utcnow().strftime("%Y%m%d_%H%M%S")
    
    result = supabase.table('sync_runs').insert({
        'run_timestamp': run_timestamp,
        'source_type': source_type,
        'status': 'pending'
    }).execute()
    
    run_id = result.data[0]['id']
    print(f"📝 Created sync run: {run_id} ({source_type})")
    return run_id


def update_sync_run(run_id: str, **kwargs):
    """Update sync run status."""
    supabase.table('sync_runs').update(kwargs).eq('id', run_id).execute()


# ============================================================================
# Import Functions
# ============================================================================

def import_paper(paper_data: dict, source: str, run_timestamp: str, query: str = '') -> str:
    """Import a paper from research_output run with retry logic."""
    title = paper_data.get('title', '').strip()
    if not title:
        return 'skipped'
    
    # Check if paper exists by title
    for attempt in range(3):
        try:
            existing = supabase.table('papers').select('id').eq('title', title).limit(1).execute()
            break
        except Exception as e:
            if attempt < 2:
                time.sleep(0.5 * (attempt + 1))
                continue
            else:
                print(f"Failed to check existing paper after 3 attempts: {e}")
                return 'skipped'
    
    authors = paper_data.get('authors', [])
    if isinstance(authors, str):
        authors = [a.strip() for a in authors.split(',')]
    
    arxiv_id = paper_data.get('arxiv_id', '').strip()
    
    paper_record = {
        'title': title,
        'authors': authors,
        'abstract': paper_data.get('abstract', ''),
        'year': paper_data.get('year'),
        'venue': paper_data.get('venue', ''),
        'pdf_url': paper_data.get('pdf', paper_data.get('pdf_url', '')),
        'arxiv_id': arxiv_id if arxiv_id else None,
        'import_source': source,
        'primary_area': paper_data.get('primary_area', ''),
        'keywords': paper_data.get('keywords', '').split(';') if isinstance(paper_data.get('keywords'), str) else [],
        'tldr': paper_data.get('tldr', ''),
    }
    
    # Insert or update
    for attempt in range(3):
        try:
            if existing.data:
                paper_id = existing.data[0]['id']
                supabase.table('papers').update(paper_record).eq('id', paper_id).execute()
                result = 'updated'
            else:
                insert_result = supabase.table('papers').insert(paper_record).execute()
                paper_id = insert_result.data[0]['id']
                result = 'imported'
            break
        except Exception as e:
            if attempt < 2:
                time.sleep(0.5 * (attempt + 1))
                continue
            else:
                print(f"Failed to insert/update paper '{title}' after 3 attempts: {e}")
                return 'skipped'
    
    # Add to community_papers_global
    cpg_record = {
        'paper_id': paper_id,
        'source': source,
        'run_timestamp': run_timestamp,
        'query': query,
        'rank': paper_data.get('rank'),
        'similarity_score': paper_data.get('similarity_score'),
        'novelty_score': paper_data.get('novelty_score'),
        'recency_score': paper_data.get('recency_score'),
        'bm25_score': paper_data.get('bm25_score'),
        'combined_score': paper_data.get('combined_score'),
    }
    
    try:
        supabase.table('community_papers_global').upsert(
            cpg_record,
            on_conflict='paper_id,run_timestamp'
        ).execute()
    except:
        supabase.table('community_papers_global').insert(cpg_record).execute()
    
    return result


def import_conference_paper(paper_data: dict, conference: str, year: int) -> str:
    """Import a paper from conference database with retry logic."""
    title = paper_data.get('title', '').strip()
    if not title:
        return 'skipped'
    
    # Check if paper exists
    for attempt in range(3):
        try:
            existing = supabase.table('papers').select('id').eq('title', title).limit(1).execute()
            break
        except Exception as e:
            if attempt < 2:
                time.sleep(0.5 * (attempt + 1))
                continue
            else:
                print(f"Failed to check existing paper after 3 attempts: {e}")
                return 'skipped'
    
    # Parse authors
    authors_str = paper_data.get('author', '')
    authors = [a.strip() for a in authors_str.split(';')] if authors_str else []
    
    # Parse rating average
    rating_avg = None
    if paper_data.get('rating_avg'):
        try:
            rating_val = paper_data['rating_avg']
            if isinstance(rating_val, list) and len(rating_val) > 0:
                rating_avg = float(rating_val[0])
            elif isinstance(rating_val, (int, float)):
                rating_avg = float(rating_val)
        except:
            pass
    
    # Parse keywords
    keywords = []
    if paper_data.get('keywords'):
        kw = paper_data['keywords']
        if isinstance(kw, str):
            keywords = [k.strip() for k in kw.split(';')]
        elif isinstance(kw, list):
            keywords = kw
    
    paper_record = {
        'title': title,
        'authors': authors,
        'abstract': paper_data.get('abstract', ''),
        'year': year,
        'venue': f"{conference} {year}",
        'conference': conference,
        'import_source': 'conference_db',
        'track': paper_data.get('track', ''),
        'paper_status': paper_data.get('status', ''),
        'primary_area': paper_data.get('primary_area', ''),
        'keywords': keywords,
        'tldr': paper_data.get('tldr', ''),
        'rating_avg': rating_avg,
        'github_url': paper_data.get('github', ''),
        'pdf_url': paper_data.get('site', ''),
    }
    
    # Insert or update
    for attempt in range(3):
        try:
            if existing.data:
                paper_id = existing.data[0]['id']
                supabase.table('papers').update(paper_record).eq('id', paper_id).execute()
                result = 'updated'
            else:
                insert_result = supabase.table('papers').insert(paper_record).execute()
                paper_id = insert_result.data[0]['id']
                result = 'imported'
            break
        except Exception as e:
            if attempt < 2:
                time.sleep(0.5 * (attempt + 1))
                continue
            else:
                print(f"Failed to insert/update conference paper '{title}' after 3 attempts: {e}")
                return 'skipped'
    
    # Add to community_papers_global
    cpg_record = {
        'paper_id': paper_id,
        'source': 'conference_db',
        'run_timestamp': f"{conference}_{year}",
    }
    
    try:
        supabase.table('community_papers_global').upsert(
            cpg_record,
            on_conflict='paper_id,run_timestamp'
        ).execute()
    except:
        supabase.table('community_papers_global').insert(cpg_record).execute()
    
    return result


# ============================================================================
# Sync Functions
# ============================================================================

def sync_research_output_runs(run_id: str):
    """Sync papers from research_output timestamped directories."""
    try:
        update_sync_run(run_id, status='running', started_at=datetime.utcnow().isoformat())
        
        papers_imported = 0
        papers_skipped = 0
        papers_updated = 0
        
        if not RESEARCH_OUTPUT_PATH.exists():
            raise Exception(f"Research output path not found: {RESEARCH_OUTPUT_PATH}")
        
        # Load existing titles for duplicate checking
        print("📚 Loading existing papers for duplicate check...")
        existing_titles = set()
        try:
            offset = 0
            limit = 1000
            while True:
                response = supabase.table('papers').select('title').range(offset, offset + limit - 1).execute()
                if not response.data:
                    break
                for row in response.data:
                    if row.get('title'):
                        existing_titles.add(row['title'].lower().strip())
                if len(response.data) < limit:
                    break
                offset += limit
        except Exception as e:
            print(f"⚠️  Warning: Could not load existing titles: {e}")
        
        print(f"✓ Found {len(existing_titles)} existing papers")
        
        # Process timestamped directories
        for item in sorted(RESEARCH_OUTPUT_PATH.iterdir()):
            if not item.is_dir():
                continue
            
            timestamp = parse_timestamp_dir(item.name)
            if not timestamp:
                continue
            
            papers_json = item / "papers.json"
            if not papers_json.exists():
                continue
            
            try:
                with open(papers_json, 'r') as f:
                    data = json.load(f)
                
                papers_list = data.get('papers', data.get('leaderboard', []))
                if isinstance(data, list):
                    papers_list = data
                
                query = data.get('metadata', {}).get('query', '')
                
                print(f"\n📁 Processing {timestamp}: {len(papers_list)} papers")
                
                for paper_data in papers_list:
                    title = paper_data.get('title', '').strip()
                    if not title:
                        papers_skipped += 1
                        continue
                    
                    if title.lower() in existing_titles:
                        papers_skipped += 1
                        continue
                    
                    result = import_paper(paper_data, 'research_run', timestamp, query)
                    if result == 'imported':
                        papers_imported += 1
                        existing_titles.add(title.lower())
                        print(f"  ✓ Imported: {title[:80]}")
                    elif result == 'updated':
                        papers_updated += 1
                    else:
                        papers_skipped += 1
                
                print(f"  → Imported: {papers_imported}, Skipped: {papers_skipped}")
                
            except Exception as e:
                print(f"❌ Error processing {item.name}: {e}")
                continue
        
        update_sync_run(
            run_id,
            status='completed',
            papers_imported=papers_imported,
            papers_skipped=papers_skipped,
            papers_updated=papers_updated,
            completed_at=datetime.utcnow().isoformat()
        )
        
        print(f"\n✅ Sync complete: {papers_imported} imported, {papers_skipped} skipped, {papers_updated} updated")
        
    except Exception as e:
        update_sync_run(
            run_id,
            status='failed',
            error_message=str(e),
            completed_at=datetime.utcnow().isoformat()
        )
        print(f"❌ Sync failed: {e}")
        raise


def sync_conference_database(run_id: str):
    """Sync papers from static conference database."""
    try:
        update_sync_run(run_id, status='running', started_at=datetime.utcnow().isoformat())
        
        papers_imported = 0
        papers_skipped = 0
        papers_updated = 0
        
        if not DATABASE_PATH.exists():
            raise Exception(f"Database path not found: {DATABASE_PATH}")
        
        # Load existing titles
        print("📚 Loading existing papers for duplicate check...")
        existing_titles = set()
        try:
            offset = 0
            limit = 1000
            while True:
                response = supabase.table('papers').select('title').range(offset, offset + limit - 1).execute()
                if not response.data:
                    break
                for row in response.data:
                    if row.get('title'):
                        existing_titles.add(row['title'].lower().strip())
                if len(response.data) < limit:
                    break
                offset += limit
        except Exception as e:
            print(f"⚠️  Warning: Could not load existing titles: {e}")
        
        print(f"✓ Found {len(existing_titles)} existing papers")
        
        # Iterate through conference directories
        for conf_dir in sorted(DATABASE_PATH.iterdir()):
            if not conf_dir.is_dir():
                continue
            
            conference = conf_dir.name.upper()
            if conference == 'NIPS':
                conference = 'NeurIPS'
            
            # Iterate through year files
            for year_file in sorted(conf_dir.glob("*.json")):
                try:
                    year_match = re.search(r'(\d{4})', year_file.stem)
                    if not year_match:
                        continue
                    year = int(year_match.group(1))
                    
                    with open(year_file, 'r') as f:
                        papers_list = json.load(f)
                    
                    if not isinstance(papers_list, list):
                        continue
                    
                    print(f"\n📁 Processing {conference} {year}: {len(papers_list)} papers")
                    
                    for paper_data in papers_list:
                        title = paper_data.get('title', '').strip()
                        if not title:
                            papers_skipped += 1
                            continue
                        
                        if title.lower() in existing_titles:
                            papers_skipped += 1
                            continue
                        
                        result = import_conference_paper(paper_data, conference, year)
                        if result == 'imported':
                            papers_imported += 1
                            existing_titles.add(title.lower())
                            print(f"  ✓ Imported: {title[:80]}")
                        elif result == 'updated':
                            papers_updated += 1
                        else:
                            papers_skipped += 1
                    
                    print(f"  → {conference} {year}: Imported: {papers_imported}, Skipped: {papers_skipped}")
                    time.sleep(0.5)
                    
                except Exception as e:
                    print(f"❌ Error processing {year_file}: {e}")
                    time.sleep(1)
                    continue
        
        update_sync_run(
            run_id,
            status='completed',
            papers_imported=papers_imported,
            papers_skipped=papers_skipped,
            papers_updated=papers_updated,
            completed_at=datetime.utcnow().isoformat()
        )
        
        print(f"\n✅ Sync complete: {papers_imported} imported, {papers_skipped} skipped, {papers_updated} updated")
        
    except Exception as e:
        update_sync_run(
            run_id,
            status='failed',
            error_message=str(e),
            completed_at=datetime.utcnow().isoformat()
        )
        print(f"❌ Sync failed: {e}")
        raise


# ============================================================================
# Main
# ============================================================================

def main():
    parser = argparse.ArgumentParser(description='Sync community papers to Supabase')
    parser.add_argument(
        '--source',
        choices=['full', 'research_output', 'conference_db'],
        default='full',
        help='Source type to sync (default: full)'
    )
    
    args = parser.parse_args()
    
    print(f"""
╔══════════════════════════════════════════════════════╗
║     Community Papers Sync to Supabase               ║
║     Source: {args.source:<40} ║
╚══════════════════════════════════════════════════════╝
""")
    
    run_id = create_sync_run(args.source)
    
    try:
        if args.source in ['full', 'research_output']:
            print("\n🔄 Syncing research output runs...")
            sync_research_output_runs(run_id)
        
        if args.source in ['full', 'conference_db']:
            print("\n🔄 Syncing conference database...")
            sync_conference_database(run_id)
        
        print("\n" + "="*60)
        print("🎉 Sync completed successfully!")
        print("="*60)
        
    except KeyboardInterrupt:
        print("\n\n⚠️  Sync interrupted by user")
        update_sync_run(run_id, status='cancelled', completed_at=datetime.utcnow().isoformat())
    except Exception as e:
        print(f"\n\n❌ Sync failed: {e}")
        raise


if __name__ == "__main__":
    main()

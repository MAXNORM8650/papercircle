"""
Smart Output Manager for AI Discovery Pipeline
==============================================
Manages output storage based on environment:
- LOCAL: Saves to `research_output/` directory
- DEPLOYED (Serverless): Saves directly to Supabase (no file system needed)

This prevents storage bloat in serverless environments while maintaining
local development workflow.
"""

import os
from pathlib import Path
from datetime import datetime
from typing import Optional


def is_serverless_environment() -> bool:
    """
    Detect if running in a serverless environment.
    
    Checks for common serverless environment variables:
    - VERCEL
    - AWS_LAMBDA_FUNCTION_NAME
    - FUNCTIONS_WORKER_RUNTIME (Azure)
    - K_SERVICE (Google Cloud Run)
    """
    serverless_indicators = [
        'VERCEL',
        'AWS_LAMBDA_FUNCTION_NAME',
        'FUNCTIONS_WORKER_RUNTIME',
        'K_SERVICE',
        'RAILWAY_ENVIRONMENT',  # Railway
        'RENDER',  # Render
    ]
    
    return any(os.getenv(indicator) for indicator in serverless_indicators)


def get_smart_output_dir(base_dir: str = "research_output", query: str = "") -> str:
    """
    Get output directory based on environment.
    
    - LOCAL: Creates timestamped directory under base_dir
    - SERVERLESS: Returns temp directory (files will be saved to Supabase instead)
    
    Args:
        base_dir: Base directory for local output
        query: The search query (used for directory naming)
    
    Returns:
        str: Path to output directory
    """
    # If in serverless environment, use temp directory
    # Files will still be created but won't persist (that's OK - Supabase is the source of truth)
    if is_serverless_environment():
        # Use /tmp in serverless (ephemeral but needed for pipeline to work)
        timestamp = datetime.utcnow().strftime("%Y%m%d_%H%M%S")
        temp_dir = f"/tmp/ai_discovery_{timestamp}"
        print(f"🌐 Serverless environment detected - using temp directory: {temp_dir}")
        print(f"📊 Papers will be saved to Supabase (Community Papers)")
        return temp_dir
    
    # Local environment - use persistent storage with timestamp
    timestamp = datetime.utcnow().strftime("%Y%m%d_%H%M%S")
    output_dir = Path(base_dir) / timestamp
    output_dir.mkdir(parents=True, exist_ok=True)
    
    print(f"💻 Local environment - saving to: {output_dir}")
    print(f"📊 Papers will also be synced to Supabase")
    
    return str(output_dir)


def cleanup_old_runs(base_dir: str = "research_output", keep_last_n: int = 10):
    """
    Clean up old research output directories to save space.
    Only runs in local environment.
    
    Args:
        base_dir: Base directory containing timestamped runs
        keep_last_n: Number of most recent runs to keep (default: 10)
    """
    if is_serverless_environment():
        return  # No cleanup needed in serverless
    
    base_path = Path(base_dir)
    if not base_path.exists():
        return
    
    # Get all timestamped directories
    timestamp_dirs = []
    for item in base_path.iterdir():
        if item.is_dir() and len(item.name) == 15 and '_' in item.name:
            # Looks like YYYYMMDD_HHMMSS format
            try:
                datetime.strptime(item.name, "%Y%m%d_%H%M%S")
                timestamp_dirs.append(item)
            except ValueError:
                continue
    
    # Sort by name (timestamp) descending
    timestamp_dirs.sort(reverse=True)
    
    # Delete old directories
    deleted_count = 0
    for old_dir in timestamp_dirs[keep_last_n:]:
        try:
            import shutil
            shutil.rmtree(old_dir)
            deleted_count += 1
            print(f"🗑️  Cleaned up old run: {old_dir.name}")
        except Exception as e:
            print(f"⚠️  Could not delete {old_dir.name}: {e}")
    
    if deleted_count > 0:
        print(f"✅ Cleaned up {deleted_count} old research runs (kept {keep_last_n} most recent)")


def should_use_supabase() -> bool:
    """
    Determine if Supabase should be used for storage.
    
    Returns True if:
    - In serverless environment (required)
    - Or Supabase credentials are available (optional in local)
    """
    # Always use Supabase in serverless
    if is_serverless_environment():
        return True
    
    # In local, use if credentials are available
    supabase_url = os.getenv("VITE_SUPABASE_URL")
    supabase_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("VITE_SUPABASE_ANON_KEY")
    
    return bool(supabase_url and supabase_key)


# ============================================================================
# Usage Example
# ============================================================================

if __name__ == "__main__":
    print("\n" + "="*70)
    print("AI Discovery Output Manager - Environment Detection")
    print("="*70)
    
    print(f"\nServerless Environment: {is_serverless_environment()}")
    print(f"Use Supabase: {should_use_supabase()}")
    
    output_dir = get_smart_output_dir(query="test query")
    print(f"\nOutput Directory: {output_dir}")
    
    if not is_serverless_environment():
        print("\nCleaning up old runs...")
        cleanup_old_runs(keep_last_n=5)
    
    print("\n" + "="*70)

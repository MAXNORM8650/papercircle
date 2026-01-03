#!/usr/bin/env python3
"""
Migrate only the most recent N research runs to Supabase Storage
"""

import os
import sys
import json
from pathlib import Path

# Add parent directory to path to import utils
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from utils.storage import upload_research_output

def migrate_recent_runs(num_runs=20, research_dir="../research_output"):
    """
    Migrate the N most recent research runs to Supabase Storage

    Args:
        num_runs: Number of most recent runs to migrate (default: 20)
        research_dir: Path to research_output directory
    """

    research_path = Path(research_dir)

    if not research_path.exists():
        print(f"❌ Directory not found: {research_path}")
        return

    print(f"🔍 Finding {num_runs} most recent research runs...\n")

    # Get all run directories (timestamped folders)
    all_runs = [d for d in research_path.iterdir() if d.is_dir() and d.name[0].isdigit()]

    if not all_runs:
        print("⚠️  No research run directories found")
        return

    # Sort by modification time (most recent first) and take the first N
    recent_runs = sorted(all_runs, key=lambda x: x.stat().st_mtime, reverse=True)[:num_runs]

    print(f"📊 Found {len(all_runs)} total runs")
    print(f"📤 Will migrate {len(recent_runs)} most recent runs:\n")

    for i, run in enumerate(recent_runs[:5], 1):
        print(f"   {i}. {run.name}")
    if len(recent_runs) > 5:
        print(f"   ... and {len(recent_runs) - 5} more\n")

    # Calculate total size
    total_size = sum(sum(f.stat().st_size for f in run.rglob('*') if f.is_file())
                     for run in recent_runs)
    size_mb = total_size / (1024 * 1024)
    print(f"📦 Total size: {size_mb:.1f} MB\n")

    # Statistics
    total_files = 0
    uploaded_files = 0
    failed_files = 0

    # Process each run
    for idx, run_dir in enumerate(recent_runs, 1):
        run_id = run_dir.name
        print(f"[{idx}/{len(recent_runs)}] 📤 Migrating: {run_id}")

        # Find all uploadable files
        files_to_upload = []
        for ext in ['.json', '.html', '.csv', '.txt', '.md']:
            files_to_upload.extend(run_dir.glob(f"*{ext}"))

        if not files_to_upload:
            print(f"         ⚠️  No files to upload\n")
            continue

        # Upload each file
        for file_path in files_to_upload:
            total_files += 1
            file_name = file_path.name

            try:
                # Read and upload based on file type
                if file_path.suffix == '.json':
                    with open(file_path, 'r', encoding='utf-8') as f:
                        data = json.load(f)
                    result = upload_research_output(run_id, file_name, data)
                else:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    result = upload_research_output(run_id, file_name, content)

                print(f"         ✅ {file_name}")
                uploaded_files += 1

            except Exception as e:
                print(f"         ❌ {file_name}: {e}")
                failed_files += 1

        print()  # Blank line between runs

    # Summary
    print("=" * 60)
    print("📊 Migration Summary")
    print("=" * 60)
    print(f"Runs migrated: {len(recent_runs)} (of {len(all_runs)} total)")
    print(f"Total files processed: {total_files}")
    print(f"✅ Successfully uploaded: {uploaded_files}")
    print(f"❌ Failed: {failed_files}")
    print(f"📦 Data uploaded: ~{size_mb:.1f} MB")
    print("=" * 60)

    if uploaded_files > 0:
        print("\n🎉 Migration complete!")
        print("\nView your files at:")
        print("https://app.supabase.com/project/fusfnkihcwnvjzalcxgy/storage/buckets/research-outputs")

if __name__ == "__main__":
    # Check environment variables
    if not os.getenv("SUPABASE_URL") or not os.getenv("SUPABASE_SERVICE_ROLE_KEY"):
        print("❌ Missing environment variables!")
        print("\nPlease set:")
        print("  export SUPABASE_URL='https://fusfnkihcwnvjzalcxgy.supabase.co'")
        print("  export SUPABASE_SERVICE_ROLE_KEY='your-service-role-key'")
        sys.exit(1)

    print("=" * 60)
    print("Migrate Recent Research Runs to Supabase Storage")
    print("=" * 60)
    print()

    migrate_recent_runs(num_runs=20)

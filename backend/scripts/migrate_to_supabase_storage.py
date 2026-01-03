#!/usr/bin/env python3
"""
Migrate existing research_output/ files to Supabase Storage
Run this once to upload all existing local files to the cloud
"""

import os
import sys
import json
from pathlib import Path

# Add parent directory to path to import utils
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from utils.storage import upload_research_output, SupabaseStorage


def migrate_research_outputs(research_dir: str = "research_output"):
    """
    Migrate all existing research outputs to Supabase Storage

    Args:
        research_dir: Path to research_output directory (default: "research_output")
    """

    research_path = Path(research_dir)

    if not research_path.exists():
        print(f"❌ Directory not found: {research_path}")
        return

    print(f"🔍 Scanning {research_path}...\n")

    # Get all run directories (timestamped folders)
    run_dirs = [d for d in research_path.iterdir() if d.is_dir() and d.name[0].isdigit()]

    if not run_dirs:
        print("⚠️  No research run directories found")
        return

    print(f"Found {len(run_dirs)} research runs\n")

    # Statistics
    total_files = 0
    uploaded_files = 0
    failed_files = 0

    # Process each run
    for run_dir in sorted(run_dirs):
        run_id = run_dir.name
        print(f"📤 Migrating: {run_id}")

        # Find all uploadable files
        files_to_upload = []
        for ext in ['.json', '.html', '.csv', '.txt', '.md']:
            files_to_upload.extend(run_dir.glob(f"*{ext}"))

        if not files_to_upload:
            print(f"   ⚠️  No files to upload\n")
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

                else:  # HTML, CSV, TXT, MD
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    result = upload_research_output(run_id, file_name, content)

                print(f"   ✅ {file_name} → {result['url']}")
                uploaded_files += 1

            except Exception as e:
                print(f"   ❌ {file_name}: {e}")
                failed_files += 1

        print()  # Blank line between runs

    # Summary
    print("=" * 60)
    print("📊 Migration Summary")
    print("=" * 60)
    print(f"Total research runs: {len(run_dirs)}")
    print(f"Total files processed: {total_files}")
    print(f"✅ Successfully uploaded: {uploaded_files}")
    print(f"❌ Failed: {failed_files}")
    print("=" * 60)

    if uploaded_files > 0:
        print("\n🎉 Migration complete!")
        print("\nYou can now view your files at:")
        print("https://app.supabase.com/project/YOUR_PROJECT/storage/buckets/research-outputs")


def verify_migration():
    """Verify that files were uploaded correctly"""

    print("\n🔍 Verifying uploads...")

    storage = SupabaseStorage("research-outputs")

    try:
        files = storage.list_files()
        print(f"✅ Found {len(files)} files in Supabase Storage")

        # Group by run_id
        runs = {}
        for file in files:
            parts = file['name'].split('/')
            if len(parts) >= 2:
                run_id = parts[0]
                if run_id not in runs:
                    runs[run_id] = []
                runs[run_id].append(parts[1])

        print(f"\n📁 Runs in cloud storage: {len(runs)}")
        for run_id, files in sorted(runs.items())[:5]:  # Show first 5
            print(f"   {run_id}: {len(files)} files")

        if len(runs) > 5:
            print(f"   ... and {len(runs) - 5} more")

    except Exception as e:
        print(f"❌ Verification failed: {e}")


def test_upload():
    """Test upload with a small file"""

    print("🧪 Testing upload functionality...\n")

    test_data = {
        "test": True,
        "message": "This is a test upload",
        "timestamp": str(Path(__file__).stat().st_mtime)
    }

    try:
        result = upload_research_output("test_migration", "test.json", test_data)
        print(f"✅ Test upload successful!")
        print(f"   URL: {result['url']}")
        print(f"\n   Try opening this URL in your browser to verify it's accessible.\n")
        return True
    except Exception as e:
        print(f"❌ Test upload failed: {e}")
        print(f"\n   Check your environment variables:")
        print(f"   - SUPABASE_URL")
        print(f"   - SUPABASE_SERVICE_ROLE_KEY")
        return False


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Migrate research outputs to Supabase Storage")
    parser.add_argument(
        "--test",
        action="store_true",
        help="Run test upload only"
    )
    parser.add_argument(
        "--verify",
        action="store_true",
        help="Verify existing uploads"
    )
    parser.add_argument(
        "--dir",
        default="research_output",
        help="Research output directory (default: research_output)"
    )

    args = parser.parse_args()

    print("=" * 60)
    print("Supabase Storage Migration Tool")
    print("=" * 60)
    print()

    if args.test:
        test_upload()

    elif args.verify:
        verify_migration()

    else:
        # Check environment variables
        if not os.getenv("SUPABASE_URL") or not os.getenv("SUPABASE_SERVICE_ROLE_KEY"):
            print("❌ Missing environment variables!")
            print("\nPlease set:")
            print("  export SUPABASE_URL='https://your-project.supabase.co'")
            print("  export SUPABASE_SERVICE_ROLE_KEY='your-service-role-key'")
            sys.exit(1)

        # Run test first
        if not test_upload():
            print("\n⚠️  Fix the test upload before migrating all files")
            sys.exit(1)

        # Ask for confirmation
        print("\n⚠️  This will upload all files in research_output/ to Supabase Storage")
        response = input("Continue? (yes/no): ")

        if response.lower() in ['yes', 'y']:
            migrate_research_outputs(args.dir)
            verify_migration()
        else:
            print("❌ Migration cancelled")

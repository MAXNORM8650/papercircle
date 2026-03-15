"""
Build HuggingFace Dataset from local conference database.
=========================================================
Reads all JSON files from research_output/database/ and creates a Parquet dataset,
then uploads it to HuggingFace Hub.

Usage:
    python scripts/build_hf_dataset.py --repo-id <your-hf-username>/papercircle-papers
    python scripts/build_hf_dataset.py --repo-id <your-hf-username>/papercircle-papers --local-only
"""

import json
import os
import re
import sys
import argparse
import uuid
from pathlib import Path

import pandas as pd
from huggingface_hub import HfApi, create_repo


DATABASE_PATH = Path(__file__).parent.parent / "research_output" / "database"


def parse_conference_papers(database_path: Path) -> list[dict]:
    """Parse all conference JSON files into a flat list of paper dicts."""
    all_papers = []
    seen_titles = set()

    for conf_dir in sorted(database_path.iterdir()):
        if not conf_dir.is_dir():
            continue

        conference = conf_dir.name.upper()
        if conference == "NIPS":
            conference = "NeurIPS"

        for year_file in sorted(conf_dir.glob("*.json")):
            year_match = re.search(r"(\d{4})", year_file.stem)
            if not year_match:
                continue
            year = int(year_match.group(1))

            try:
                with open(year_file, "r", encoding="utf-8") as f:
                    papers_list = json.load(f)
            except Exception as e:
                print(f"  Error reading {year_file}: {e}")
                continue

            if not isinstance(papers_list, list):
                continue

            print(f"  {conference} {year}: {len(papers_list)} papers")

            for paper_data in papers_list:
                title = (paper_data.get("title") or "").strip()
                if not title:
                    continue

                # Deduplicate by title
                title_key = title.lower()
                if title_key in seen_titles:
                    continue
                seen_titles.add(title_key)

                # Parse authors
                authors_str = paper_data.get("author", "")
                if isinstance(authors_str, str):
                    authors = [a.strip() for a in authors_str.split(";") if a.strip()]
                elif isinstance(authors_str, list):
                    authors = authors_str
                else:
                    authors = []

                # Parse keywords
                keywords_raw = paper_data.get("keywords", "")
                if isinstance(keywords_raw, str):
                    keywords = [k.strip() for k in keywords_raw.split(";") if k.strip()]
                elif isinstance(keywords_raw, list):
                    keywords = keywords_raw
                else:
                    keywords = []

                # Parse rating
                rating_avg = None
                if paper_data.get("rating_avg"):
                    try:
                        val = paper_data["rating_avg"]
                        if isinstance(val, list) and len(val) > 0:
                            rating_avg = float(val[0])
                        elif isinstance(val, (int, float)):
                            rating_avg = float(val)
                    except (ValueError, TypeError):
                        pass

                # Ensure unique paper_id by prefixing with conference_year
                raw_id = paper_data.get("id", str(uuid.uuid4()))
                paper_id = f"{conference.lower()}_{year}_{raw_id}"

                paper = {
                    "paper_id": paper_id,
                    "title": title,
                    "authors": json.dumps(authors),
                    "abstract": paper_data.get("abstract", "") or "",
                    "year": year,
                    "venue": f"{conference} {year}",
                    "conference": conference,
                    "source": "conference_db",
                    "track": paper_data.get("track", "") or "",
                    "paper_status": paper_data.get("status", "") or "",
                    "primary_area": paper_data.get("primary_area", "") or "",
                    "keywords": json.dumps(keywords),
                    "tldr": paper_data.get("tldr", "") or "",
                    "pdf_url": paper_data.get("site", "") or paper_data.get("pdf", "") or "",
                    "arxiv_id": paper_data.get("arxiv_id", "") or "",
                    "rating_avg": rating_avg,
                    "github_url": paper_data.get("github", "") or "",
                    "bibtex": paper_data.get("bibtex", "") or "",
                }

                all_papers.append(paper)

    return all_papers


def main():
    parser = argparse.ArgumentParser(description="Build HF dataset from conference papers")
    parser.add_argument("--repo-id", required=True, help="HuggingFace repo ID (e.g. username/papercircle-papers)")
    parser.add_argument("--local-only", action="store_true", help="Only build Parquet locally, don't upload")
    parser.add_argument("--database-path", default=str(DATABASE_PATH), help="Path to conference database")
    args = parser.parse_args()

    database_path = Path(args.database_path)
    if not database_path.exists():
        print(f"Error: Database path not found: {database_path}")
        sys.exit(1)

    print(f"Parsing conference papers from: {database_path}")
    papers = parse_conference_papers(database_path)
    print(f"\nTotal unique papers: {len(papers)}")

    # Build DataFrame
    df = pd.DataFrame(papers)
    print(f"DataFrame shape: {df.shape}")
    print(f"Columns: {list(df.columns)}")

    # Save as Parquet
    output_dir = Path(__file__).parent.parent / "hf_spaces" / "data"
    output_dir.mkdir(parents=True, exist_ok=True)
    parquet_path = output_dir / "papers.parquet"
    df.to_parquet(parquet_path, index=False, engine="pyarrow")
    size_mb = parquet_path.stat().st_size / (1024 * 1024)
    print(f"Saved Parquet: {parquet_path} ({size_mb:.1f} MB)")

    if args.local_only:
        print("Local-only mode. Skipping upload.")
        return

    # Upload to HuggingFace Hub
    print(f"\nUploading to HuggingFace Hub: {args.repo_id}")
    api = HfApi()

    # Create repo if it doesn't exist
    try:
        create_repo(args.repo_id, repo_type="dataset", exist_ok=True)
    except Exception as e:
        print(f"Warning creating repo: {e}")

    api.upload_file(
        path_or_fileobj=str(parquet_path),
        path_in_repo="data/papers.parquet",
        repo_id=args.repo_id,
        repo_type="dataset",
    )
    print(f"Upload complete! Dataset available at: https://huggingface.co/datasets/{args.repo_id}")


if __name__ == "__main__":
    main()

"""
Enhanced Paper Review Benchmarking
===================================
Comprehensive benchmarking with multi-conference support and structured evaluation.

Usage Examples:
    # Run ICLR benchmark with limit
    python benchmark_paper_review.py \\
        --data /path/to/benchmarks/reviewbench/iclr2024.json \\
        --conference iclr \\
        --limit 100

    # Run all conferences in a directory
    python benchmark_paper_review.py \\
        --data /path/to/benchmarks/reviewbench \\
        --all-conferences

    # Custom model and parallel workers
    python benchmark_paper_review.py \\
        --data iclr2024.json \\
        --model ollama_chat/qwen3-coder:70b \\
        --parallel 5 \\
        --limit 50

    # Skip content metrics for faster execution
    python benchmark_paper_review.py \\
        --data iclr2024.json \\
        --skip-content-metrics \\
        --limit 200
"""

import argparse
import sys
from pathlib import Path

from benchmark_framework import BenchmarkFramework, BenchmarkConfig
from review_schemas import ConferenceFormat
import benchmark_framework
print(f"DEBUG: benchmark_framework location: {benchmark_framework.__file__}")


def main():
    parser = argparse.ArgumentParser(
        description="Enhanced Paper Review Benchmark with Multi-Conference Support",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__
    )

    # Data options
    parser.add_argument(
        "--data",
        required=True,
        help="Path to benchmark JSON file or directory containing benchmark files"
    )
    parser.add_argument(
        "--output",
        default="benchmark_results/results/gpt-oss:120b",
        help="Output directory for results (default: benchmark_results)"
    )

    # Conference options
    parser.add_argument(
        "--conference",
        choices=["iclr", "neurips", "icml"],
        help="Conference format (auto-detect if not specified)"
    )
    parser.add_argument(
        "--all-conferences",
        action="store_true",
        help="Run all conferences found in the data directory"
    )

    # Execution options
    parser.add_argument(
        "--limit",
        type=int,
        help="Limit number of papers to process (default: all papers)"
    )
    parser.add_argument(
        "--parallel",
        type=int,
        default=1,
        help="Number of parallel review workers (default: 3)"
    )
    parser.add_argument(
        "--no-cache",
        action="store_true",
        help="Ignore cached results and re-run all reviews"
    )

    # Model options
    parser.add_argument(
        "--model",
        default="ollama_chat/gpt-oss:120b",
        help="Model ID to use for reviews (default: ollama_chat/qwen3-coder:30b)"
    )
    parser.add_argument(
        "--api-base",
        default="http://10.127.30.115:11434",
        help="API base URL (default: http://10.127.30.115:11434)"
    )
    parser.add_argument(
        "--num-ctx",
        type=int,
        default=32000,
        help="Context window size (default: 32000)"
    )

    # Evaluation options
    parser.add_argument(
        "--skip-content-metrics",
        action="store_true",
        help="Skip expensive content metrics computation (faster execution)"
    )

    args = parser.parse_args()

    # Validate data path
    data_path = Path(args.data)
    if not data_path.exists():
        print(f"Error: Data path does not exist: {data_path}")
        sys.exit(1)

    # Determine which benchmarks to run
    benchmarks_to_run = []

    if args.all_conferences and data_path.is_dir():
        # Run all conferences found in directory
        conference_files = {
            ConferenceFormat.ICLR: data_path / "iclr2024.json",
            ConferenceFormat.NEURIPS: data_path / "nips2024.json",
            ConferenceFormat.ICML: data_path / "icml2025.json",
        }

        for conf, filepath in conference_files.items():
            if filepath.exists():
                benchmarks_to_run.append((conf, filepath))
                print(f"Found {conf.value.upper()}: {filepath}")

        if not benchmarks_to_run:
            print(f"Error: No conference files found in {data_path}")
            sys.exit(1)

    else:
        # Single conference or auto-detect
        if not data_path.is_file():
            print(f"Error: {data_path} is not a file. Use --all-conferences for directories.")
            sys.exit(1)

        conf = ConferenceFormat[args.conference.upper()] if args.conference else None
        benchmarks_to_run.append((conf, data_path))

    # Run benchmarks
    for conference, data_file in benchmarks_to_run:
        print("\n" + "="*70)
        print(f"RUNNING BENCHMARK: {conference.value.upper() if conference else 'AUTO-DETECT'}")
        print(f"Data: {data_file}")
        print("="*70 + "\n")

        # Create output directory for this conference
        if conference:
            output_dir = Path(args.output) / conference.value
        else:
            output_dir = Path(args.output) / "auto"

        # Create configuration
        config = BenchmarkConfig(
            data_path=str(data_file),
            output_dir=str(output_dir),
            limit=args.limit,
            parallel_reviews=args.parallel,
            skip_cached=not args.no_cache,
            model_id=args.model,
            api_base=args.api_base,
            num_ctx=args.num_ctx,
            conference=conference,
            compute_content_metrics=not args.skip_content_metrics
        )

        # Run benchmark
        try:
            benchmark = BenchmarkFramework(config)
            benchmark.run_benchmark()

            print("\n" + "="*70)
            print(f"✓ COMPLETED: {conference.value.upper() if conference else 'AUTO-DETECT'}")
            print(f"Results: {output_dir}/benchmark_summary.json")
            print("="*70 + "\n")

        except Exception as e:
            print(f"\n" + "="*70)
            print(f"✗ FAILED: {conference.value.upper() if conference else 'AUTO-DETECT'}")
            print(f"Error: {str(e)}")
            print("="*70 + "\n")
            import traceback
            traceback.print_exc()

    print("\n" + "="*70)
    print("ALL BENCHMARKS COMPLETE")
    print("="*70)


if __name__ == "__main__":
    main()

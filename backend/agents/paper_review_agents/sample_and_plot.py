#!/usr/bin/env python3
"""
Sample Papers and Plot Results
================================
Utility script for sampling papers and visualizing benchmark results.

Usage:
    # Sample 50 papers from ICLR dataset
    python sample_and_plot.py sample \\
        --data /path/to/iclr2024.json \\
        --output sampled_papers.json \\
        --n 50 \\
        --seed 42

    # Plot correlation graphs from benchmark results
    python sample_and_plot.py plot \\
        --results benchmark_results/iclr/benchmark_summary.json \\
        --conference iclr \\
        --output-dir plots/

    # Combined: sample and run benchmark, then plot
    python sample_and_plot.py sample \\
        --data /path/to/iclr2024.json \\
        --output sampled_papers.json \\
        --n 50

    python benchmark_paper_review.py \\
        --data sampled_papers.json \\
        --conference iclr

    python sample_and_plot.py plot \\
        --results benchmark_results/auto/benchmark_summary.json \\
        --conference iclr \\
        --output-dir plots/
"""

import argparse
import sys
from pathlib import Path

from benchmark_utils import BenchmarkSampler, BenchmarkVisualizer
from review_schemas import ConferenceFormat


def sample_command(args):
    """Handle sample subcommand."""
    print("\n" + "="*60)
    print("SAMPLING PAPERS")
    print("="*60 + "\n")

    sampled = BenchmarkSampler.sample_papers(
        data_path=args.data,
        n_samples=args.n,
        seed=args.seed,
        output_path=args.output
    )

    print(f"\n✓ Sampled {len(sampled)} papers")
    if args.output:
        print(f"✓ Saved to: {args.output}")
        print(f"\nNext step: Run benchmark on sampled papers:")
        print(f"  python benchmark_paper_review.py --data {args.output} --conference <iclr|neurips|icml>")


def plot_command(args):
    """Handle plot subcommand."""
    print("\n" + "="*60)
    print("PLOTTING RESULTS")
    print("="*60 + "\n")

    # Validate results file exists
    if not Path(args.results).exists():
        print(f"Error: Results file not found: {args.results}")
        sys.exit(1)

    # Get conference
    conference = ConferenceFormat[args.conference.upper()]

    # Create output directory if specified
    output_dir = args.output_dir
    if output_dir:
        Path(output_dir).mkdir(parents=True, exist_ok=True)
        print(f"Saving plots to: {output_dir}\n")

    # Generate all correlation plots
    BenchmarkVisualizer.plot_all_correlations(
        results_path=args.results,
        conference=conference,
        output_dir=output_dir
    )

    # Also generate error distribution plots if requested
    if args.error_dist:
        print("\nGenerating error distribution plots...")

        if conference == ConferenceFormat.ICLR:
            scores = ["rating", "soundness", "presentation", "contribution"]
        elif conference == ConferenceFormat.NEURIPS:
            scores = ["rating"]
        elif conference == ConferenceFormat.ICML:
            scores = ["recommendation"]
        else:
            scores = []

        for score in scores:
            output_path = None
            if output_dir:
                output_path = Path(output_dir) / f"{score}_error_dist.png"

            BenchmarkVisualizer.plot_error_distribution(
                results_path=args.results,
                score_name=score,
                conference=conference,
                output_path=output_path
            )

        print(f"\n✓ Generated {len(scores)} error distribution plots")

    print("\n" + "="*60)
    print("PLOTTING COMPLETE")
    print("="*60)


def main():
    parser = argparse.ArgumentParser(
        description="Sample papers and visualize benchmark results",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__
    )

    subparsers = parser.add_subparsers(dest='command', help='Command to run')

    # Sample command
    sample_parser = subparsers.add_parser('sample', help='Sample random papers')
    sample_parser.add_argument('--data', required=True, help='Path to benchmark JSON file')
    sample_parser.add_argument('--output', required=True, help='Output path for sampled papers')
    sample_parser.add_argument('--n', type=int, default=50, help='Number of papers to sample (default: 50)')
    sample_parser.add_argument('--seed', type=int, default=42, help='Random seed (default: 42)')

    # Plot command
    plot_parser = subparsers.add_parser('plot', help='Plot benchmark results')
    plot_parser.add_argument('--results', required=True, help='Path to benchmark_summary.json')
    plot_parser.add_argument('--conference', required=True, choices=['iclr', 'neurips', 'icml'], help='Conference format')
    plot_parser.add_argument('--output-dir', help='Directory to save plots (default: show plots)')
    plot_parser.add_argument('--error-dist', action='store_true', help='Also generate error distribution plots')

    args = parser.parse_args()

    if not args.command:
        parser.print_help()
        sys.exit(1)

    if args.command == 'sample':
        sample_command(args)
    elif args.command == 'plot':
        plot_command(args)


if __name__ == "__main__":
    main()

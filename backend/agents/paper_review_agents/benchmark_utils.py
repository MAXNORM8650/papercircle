"""
Benchmark Utilities
===================
Utilities for sampling papers and visualizing benchmark results.
"""

import json
import random
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from pathlib import Path
from typing import List, Dict, Any, Optional
from review_schemas import ConferenceFormat


class BenchmarkSampler:
    """Sample papers from benchmark datasets for evaluation."""

    @staticmethod
    def sample_papers(
        data_path: str,
        n_samples: int = 50,
        seed: int = 42,
        output_path: Optional[str] = None
    ) -> List[Dict]:
        """
        Sample random papers from a dataset with reproducible seed.

        Args:
            data_path: Path to benchmark JSON file
            n_samples: Number of papers to sample
            seed: Random seed for reproducibility
            output_path: Optional path to save sampled papers

        Returns:
            List of sampled paper dictionaries
        """
        # Set seed for reproducibility
        random.seed(seed)
        np.random.seed(seed)

        # Load data
        with open(data_path, 'r') as f:
            papers = json.load(f)

        print(f"Total papers in dataset: {len(papers)}")

        # Sample
        if len(papers) <= n_samples:
            print(f"Warning: Dataset has only {len(papers)} papers, using all")
            sampled = papers
        else:
            sampled = random.sample(papers, n_samples)
            print(f"Sampled {n_samples} random papers (seed={seed})")

        # Save if requested
        if output_path:
            with open(output_path, 'w') as f:
                json.dump(sampled, f, indent=2)
            print(f"Saved sampled papers to: {output_path}")

        return sampled


class BenchmarkVisualizer:
    """Visualize benchmark results with plots and charts."""

    @staticmethod
    def plot_correlation_scatter(
        results_path: str,
        score_name: str,
        conference: ConferenceFormat,
        output_path: Optional[str] = None
    ):
        """
        Plot predicted vs ground truth scores with correlation.

        Args:
            results_path: Path to benchmark_summary.json
            score_name: Name of score to plot (e.g., "rating", "soundness")
            conference: Conference format
            output_path: Optional path to save plot
        """
        # Load results
        with open(results_path, 'r') as f:
            data = json.load(f)

        results = data.get("results", [])

        # Extract scores
        predicted = []
        ground_truth = []

        for result in results:
            if not result.get("success"):
                continue

            pred_review = result.get("predicted_review", {})
            gt = result.get("ground_truth", {})

            pred_val = pred_review.get(score_name)
            gt_val = gt.get(score_name)

            if pred_val is not None and gt_val is not None:
                predicted.append(pred_val)
                ground_truth.append(gt_val)

        if not predicted:
            print(f"No data available for {score_name}")
            return

        predicted = np.array(predicted)
        ground_truth = np.array(ground_truth)

        # Calculate correlation
        from scipy.stats import pearsonr, spearmanr
        pearson_corr, pearson_p = pearsonr(predicted, ground_truth)
        spearman_corr, spearman_p = spearmanr(predicted, ground_truth)

        # Calculate MSE and MAE
        mse = np.mean((predicted - ground_truth) ** 2)
        mae = np.mean(np.abs(predicted - ground_truth))

        # Create plot
        plt.figure(figsize=(10, 8))

        # Scatter plot
        plt.scatter(ground_truth, predicted, alpha=0.6, s=100, edgecolors='black', linewidth=0.5)

        # Perfect prediction line
        min_val = min(ground_truth.min(), predicted.min())
        max_val = max(ground_truth.max(), predicted.max())
        plt.plot([min_val, max_val], [min_val, max_val], 'r--', linewidth=2, label='Perfect Prediction')

        # Add regression line
        z = np.polyfit(ground_truth, predicted, 1)
        p = np.poly1d(z)
        plt.plot(ground_truth, p(ground_truth), "b-", alpha=0.5, linewidth=2, label=f'Fit: y={z[0]:.2f}x+{z[1]:.2f}')

        # Labels and title
        plt.xlabel('Ground Truth Score', fontsize=14, fontweight='bold')
        plt.ylabel('Predicted Score', fontsize=14, fontweight='bold')
        plt.title(f'{score_name.upper()} - {conference.value.upper()} Reviews\nPredicted vs Ground Truth',
                  fontsize=16, fontweight='bold')

        # Add statistics text
        stats_text = f'Pearson r = {pearson_corr:.3f} (p={pearson_p:.4f})\n'
        stats_text += f'Spearman ρ = {spearman_corr:.3f} (p={spearman_p:.4f})\n'
        stats_text += f'MSE = {mse:.3f}\n'
        stats_text += f'MAE = {mae:.3f}\n'
        stats_text += f'N = {len(predicted)}'

        plt.text(0.05, 0.95, stats_text,
                 transform=plt.gca().transAxes,
                 fontsize=11,
                 verticalalignment='top',
                 bbox=dict(boxstyle='round', facecolor='wheat', alpha=0.8))

        plt.legend(loc='lower right', fontsize=11)
        plt.grid(True, alpha=0.3)
        plt.tight_layout()

        # Save or show
        if output_path:
            plt.savefig(output_path, dpi=300, bbox_inches='tight')
            print(f"Saved plot to: {output_path}")
        else:
            plt.show()

        plt.close()

    @staticmethod
    def plot_all_correlations(
        results_path: str,
        conference: ConferenceFormat,
        output_dir: Optional[str] = None
    ):
        """
        Plot correlation graphs for all scores.

        Args:
            results_path: Path to benchmark_summary.json
            conference: Conference format
            output_dir: Optional directory to save plots
        """
        if output_dir:
            Path(output_dir).mkdir(parents=True, exist_ok=True)

        # Define scores to plot based on conference
        if conference == ConferenceFormat.ICLR:
            scores = ["rating", "soundness", "presentation", "contribution", "confidence"]
        elif conference == ConferenceFormat.NEURIPS:
            scores = ["rating", "confidence"]
        elif conference == ConferenceFormat.ICML:
            scores = ["recommendation"]
        else:
            scores = []

        print(f"\nGenerating correlation plots for {len(scores)} scores...")

        for score in scores:
            output_path = None
            if output_dir:
                output_path = Path(output_dir) / f"{score}_correlation.png"

            BenchmarkVisualizer.plot_correlation_scatter(
                results_path,
                score,
                conference,
                output_path
            )

        print(f"\nCompleted! {len(scores)} plots generated.")

    @staticmethod
    def plot_error_distribution(
        results_path: str,
        score_name: str,
        conference: ConferenceFormat,
        output_path: Optional[str] = None
    ):
        """
        Plot distribution of prediction errors.

        Args:
            results_path: Path to benchmark_summary.json
            score_name: Name of score
            conference: Conference format
            output_path: Optional path to save plot
        """
        # Load results
        with open(results_path, 'r') as f:
            data = json.load(f)

        results = data.get("results", [])

        # Extract errors
        errors = []

        for result in results:
            if not result.get("success"):
                continue

            eval_data = result.get("evaluation", {})
            score_metrics = eval_data.get("score_metrics", {}).get(score_name, {})

            error = score_metrics.get("error")
            if error is not None:
                errors.append(error)

        if not errors:
            print(f"No data available for {score_name}")
            return

        errors = np.array(errors)

        # Create plot
        fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 5))

        # Histogram
        ax1.hist(errors, bins=30, edgecolor='black', alpha=0.7)
        ax1.axvline(0, color='red', linestyle='--', linewidth=2, label='Zero Error')
        ax1.axvline(errors.mean(), color='green', linestyle='--', linewidth=2, label=f'Mean Error: {errors.mean():.3f}')
        ax1.set_xlabel('Prediction Error (Predicted - Ground Truth)', fontsize=12, fontweight='bold')
        ax1.set_ylabel('Frequency', fontsize=12, fontweight='bold')
        ax1.set_title(f'{score_name.upper()} - Error Distribution', fontsize=14, fontweight='bold')
        ax1.legend()
        ax1.grid(True, alpha=0.3)

        # Box plot
        ax2.boxplot(errors, vert=True)
        ax2.axhline(0, color='red', linestyle='--', linewidth=2, label='Zero Error')
        ax2.set_ylabel('Prediction Error', fontsize=12, fontweight='bold')
        ax2.set_title(f'{score_name.upper()} - Error Box Plot', fontsize=14, fontweight='bold')
        ax2.grid(True, alpha=0.3, axis='y')

        # Add statistics
        stats_text = f'Mean: {errors.mean():.3f}\n'
        stats_text += f'Median: {np.median(errors):.3f}\n'
        stats_text += f'Std: {errors.std():.3f}\n'
        stats_text += f'MAE: {np.abs(errors).mean():.3f}'

        ax2.text(1.15, 0.5, stats_text,
                 transform=ax2.transAxes,
                 fontsize=11,
                 verticalalignment='center',
                 bbox=dict(boxstyle='round', facecolor='wheat', alpha=0.8))

        plt.suptitle(f'{conference.value.upper()} - {score_name.upper()}', fontsize=16, fontweight='bold', y=1.02)
        plt.tight_layout()

        # Save or show
        if output_path:
            plt.savefig(output_path, dpi=300, bbox_inches='tight')
            print(f"Saved plot to: {output_path}")
        else:
            plt.show()

        plt.close()


class ModelComparison:
    """Load and compare results across multiple models."""

    @staticmethod
    def load_all_model_results(
        results_dir: str,
        conference: str
    ) -> Dict[str, Dict[str, Any]]:
        """
        Load benchmark results for all models.

        Args:
            results_dir: Base results directory
            conference: Conference name (iclr, neurips, icml)

        Returns:
            Dict mapping model names to their result data
        """
        results_path = Path(results_dir)
        all_results = {}

        # Find all model directories
        for model_dir in results_path.iterdir():
            if not model_dir.is_dir():
                continue

            # Look for conference-specific results
            summary_path = model_dir / conference / "benchmark_summary.json"
            if summary_path.exists():
                model_name = model_dir.name
                with open(summary_path, 'r') as f:
                    all_results[model_name] = json.load(f)
                print(f"Loaded results for {model_name}")

        return all_results


__all__ = [
    'BenchmarkSampler',
    'BenchmarkVisualizer',
    'ModelComparison',
]

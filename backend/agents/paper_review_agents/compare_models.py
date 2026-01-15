#!/usr/bin/env python3
"""
Model Comparison Script
======================
Compare benchmark results across multiple models with statistical analysis.

Usage:
    python compare_models.py --conference iclr --output-dir benchmark_results/comparison_plots
"""

import argparse
import json
import sys
from pathlib import Path
from typing import Dict, List, Any, Tuple
from collections import defaultdict

import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats
from scipy.stats import pearsonr, spearmanr

from benchmark_utils import ModelComparison


# Model color scheme
MODEL_COLORS = {
    'gpt-oss:20b': '#3498db',  # blue
    'gpt-oss:120b': '#2ecc71',  # green
    'qwen3-coder-30b': '#e67e22',  # orange
    'qwen3-coder-30b-a3b-instruct:q3_k_m': '#e74c3c'  # red
}

SCORE_METRICS = ['rating', 'soundness', 'presentation', 'contribution', 'confidence']


def bootstrap_ci(data: np.ndarray, n_iterations: int = 1000, ci: float = 95) -> Tuple[float, float]:
    """
    Calculate bootstrap confidence interval.

    Args:
        data: Input data array
        n_iterations: Number of bootstrap iterations
        ci: Confidence interval percentage

    Returns:
        Tuple of (lower_bound, upper_bound)
    """
    if len(data) == 0:
        return (np.nan, np.nan)

    bootstrap_means = []
    n = len(data)

    for _ in range(n_iterations):
        sample = np.random.choice(data, size=n, replace=True)
        bootstrap_means.append(np.mean(sample))

    alpha = (100 - ci) / 2
    lower = np.percentile(bootstrap_means, alpha)
    upper = np.percentile(bootstrap_means, 100 - alpha)

    return (lower, upper)


def calculate_aggregated_metrics(results: List[Dict]) -> Dict[str, Dict]:
    """
    Calculate aggregated metrics from individual results.

    Args:
        results: List of result dictionaries

    Returns:
        Dict with metrics for each score type
    """
    metrics = {}

    for score_name in SCORE_METRICS:
        predicted = []
        ground_truth = []
        errors = []

        for result in results:
            if not result.get("success"):
                continue

            eval_data = result.get("evaluation", {})
            score_metrics = eval_data.get("score_metrics", {}).get(score_name, {})

            pred = score_metrics.get("predicted")
            gt = score_metrics.get("ground_truth")
            error = score_metrics.get("error")

            if pred is not None and gt is not None:
                predicted.append(pred)
                ground_truth.append(gt)
                if error is not None:
                    errors.append(error)

        if not predicted:
            continue

        predicted = np.array(predicted)
        ground_truth = np.array(ground_truth)
        errors = np.array(errors) if errors else predicted - ground_truth

        # Calculate metrics
        mse = np.mean(errors ** 2)
        mae = np.mean(np.abs(errors))
        rmse = np.sqrt(mse)

        # Bootstrap CIs
        mse_ci = bootstrap_ci(errors ** 2)
        mae_ci = bootstrap_ci(np.abs(errors))

        # Correlations
        if len(predicted) > 2:
            pearson_r, pearson_p = pearsonr(predicted, ground_truth)
            spearman_r, spearman_p = spearmanr(predicted, ground_truth)
        else:
            pearson_r = pearson_p = spearman_r = spearman_p = np.nan

        # Accuracy thresholds
        abs_errors = np.abs(errors)
        acc_05 = np.mean(abs_errors <= 0.5) * 100
        acc_10 = np.mean(abs_errors <= 1.0) * 100
        acc_15 = np.mean(abs_errors <= 1.5) * 100

        metrics[score_name] = {
            'mse': mse,
            'mse_ci': mse_ci,
            'mae': mae,
            'mae_ci': mae_ci,
            'rmse': rmse,
            'pearson_r': pearson_r,
            'pearson_p': pearson_p,
            'spearman_r': spearman_r,
            'spearman_p': spearman_p,
            'acc_05': acc_05,
            'acc_10': acc_10,
            'acc_15': acc_15,
            'errors': errors,
            'n_samples': len(predicted)
        }

    return metrics


def analyze_failures(results: List[Dict]) -> Dict:
    """
    Analyze failure patterns in results.

    Args:
        results: List of result dictionaries

    Returns:
        Dict with failure statistics
    """
    total = len(results)
    successful = sum(1 for r in results if r.get("success"))
    failed = total - successful

    failure_types = defaultdict(int)
    for result in results:
        if not result.get("success"):
            error = result.get("error", "Unknown")
            failure_types[error] += 1

    parsing_failures = 0
    for result in results:
        if result.get("success"):
            if not result.get("evaluation", {}).get("parsing_success"):
                parsing_failures += 1

    return {
        'total': total,
        'successful': successful,
        'failed': failed,
        'success_rate': (successful / total * 100) if total > 0 else 0,
        'failure_types': dict(failure_types),
        'parsing_failures': parsing_failures
    }


def plot_performance_dashboard(all_metrics: Dict[str, Dict], output_path: str):
    """
    Create multi-panel performance metrics dashboard.

    Args:
        all_metrics: Dict mapping model names to their metrics
        output_path: Path to save figure
    """
    fig = plt.figure(figsize=(20, 12))
    gs = fig.add_gridspec(2, 3, hspace=0.3, wspace=0.3)

    # 1. MSE Comparison
    ax1 = fig.add_subplot(gs[0, 0])
    models = list(all_metrics.keys())
    x = np.arange(len(SCORE_METRICS))
    width = 0.2

    for i, model in enumerate(models):
        mse_values = [all_metrics[model].get(score, {}).get('mse', np.nan) for score in SCORE_METRICS]
        mse_ci_lower = [all_metrics[model].get(score, {}).get('mse_ci', (np.nan, np.nan))[0] for score in SCORE_METRICS]
        mse_ci_upper = [all_metrics[model].get(score, {}).get('mse_ci', (np.nan, np.nan))[1] for score in SCORE_METRICS]

        # Calculate error bars
        errors = [
            [mse - lower for mse, lower in zip(mse_values, mse_ci_lower)],
            [upper - mse for mse, upper in zip(mse_values, mse_ci_upper)]
        ]

        ax1.bar(x + i * width, mse_values, width, label=model,
                color=MODEL_COLORS.get(model, f'C{i}'),
                yerr=errors, capsize=3)

    ax1.set_xlabel('Metric', fontweight='bold')
    ax1.set_ylabel('MSE', fontweight='bold')
    ax1.set_title('Mean Squared Error Comparison (with 95% CI)', fontweight='bold', fontsize=12)
    ax1.set_xticks(x + width * 1.5)
    ax1.set_xticklabels(SCORE_METRICS, rotation=45, ha='right')
    ax1.legend(loc='upper left', fontsize=8)
    ax1.grid(True, alpha=0.3, axis='y')

    # 2. MAE Comparison
    ax2 = fig.add_subplot(gs[0, 1])
    for i, model in enumerate(models):
        mae_values = [all_metrics[model].get(score, {}).get('mae', np.nan) for score in SCORE_METRICS]
        mae_ci_lower = [all_metrics[model].get(score, {}).get('mae_ci', (np.nan, np.nan))[0] for score in SCORE_METRICS]
        mae_ci_upper = [all_metrics[model].get(score, {}).get('mae_ci', (np.nan, np.nan))[1] for score in SCORE_METRICS]

        errors = [
            [mae - lower for mae, lower in zip(mae_values, mae_ci_lower)],
            [upper - mae for mae, upper in zip(mae_values, mae_ci_upper)]
        ]

        ax2.bar(x + i * width, mae_values, width, label=model,
                color=MODEL_COLORS.get(model, f'C{i}'),
                yerr=errors, capsize=3)

    ax2.set_xlabel('Metric', fontweight='bold')
    ax2.set_ylabel('MAE', fontweight='bold')
    ax2.set_title('Mean Absolute Error Comparison (with 95% CI)', fontweight='bold', fontsize=12)
    ax2.set_xticks(x + width * 1.5)
    ax2.set_xticklabels(SCORE_METRICS, rotation=45, ha='right')
    ax2.legend(loc='upper left', fontsize=8)
    ax2.grid(True, alpha=0.3, axis='y')

    # 3. Pearson Correlation Heatmap
    ax3 = fig.add_subplot(gs[0, 2])
    corr_matrix = np.zeros((len(models), len(SCORE_METRICS)))
    for i, model in enumerate(models):
        for j, score in enumerate(SCORE_METRICS):
            corr_matrix[i, j] = all_metrics[model].get(score, {}).get('pearson_r', 0)

    im = ax3.imshow(corr_matrix, cmap='RdYlGn', aspect='auto', vmin=-1, vmax=1)
    ax3.set_xticks(np.arange(len(SCORE_METRICS)))
    ax3.set_yticks(np.arange(len(models)))
    ax3.set_xticklabels(SCORE_METRICS, rotation=45, ha='right')
    ax3.set_yticklabels(models)
    ax3.set_title('Pearson Correlation (Predicted vs Ground Truth)', fontweight='bold', fontsize=12)

    # Add correlation values
    for i in range(len(models)):
        for j in range(len(SCORE_METRICS)):
            text = ax3.text(j, i, f'{corr_matrix[i, j]:.2f}',
                           ha="center", va="center", color="black", fontsize=9)

    plt.colorbar(im, ax=ax3)

    # 4. Spearman Correlation Heatmap
    ax4 = fig.add_subplot(gs[1, 0])
    corr_matrix_s = np.zeros((len(models), len(SCORE_METRICS)))
    for i, model in enumerate(models):
        for j, score in enumerate(SCORE_METRICS):
            corr_matrix_s[i, j] = all_metrics[model].get(score, {}).get('spearman_r', 0)

    im = ax4.imshow(corr_matrix_s, cmap='RdYlGn', aspect='auto', vmin=-1, vmax=1)
    ax4.set_xticks(np.arange(len(SCORE_METRICS)))
    ax4.set_yticks(np.arange(len(models)))
    ax4.set_xticklabels(SCORE_METRICS, rotation=45, ha='right')
    ax4.set_yticklabels(models)
    ax4.set_title('Spearman Correlation (Predicted vs Ground Truth)', fontweight='bold', fontsize=12)

    for i in range(len(models)):
        for j in range(len(SCORE_METRICS)):
            text = ax4.text(j, i, f'{corr_matrix_s[i, j]:.2f}',
                           ha="center", va="center", color="black", fontsize=9)

    plt.colorbar(im, ax=ax4)

    # 5. Accuracy at Different Thresholds
    ax5 = fig.add_subplot(gs[1, 1])
    thresholds = [0.5, 1.0, 1.5]

    for model in models:
        acc_values_by_threshold = {0.5: [], 1.0: [], 1.5: []}
        for score in SCORE_METRICS:
            metrics = all_metrics[model].get(score, {})
            acc_values_by_threshold[0.5].append(metrics.get('acc_05', 0))
            acc_values_by_threshold[1.0].append(metrics.get('acc_10', 0))
            acc_values_by_threshold[1.5].append(metrics.get('acc_15', 0))

        avg_acc = [np.mean(acc_values_by_threshold[t]) for t in thresholds]
        ax5.plot(thresholds, avg_acc, marker='o', linewidth=2,
                label=model, color=MODEL_COLORS.get(model))

    ax5.set_xlabel('Error Threshold', fontweight='bold')
    ax5.set_ylabel('Accuracy (%)', fontweight='bold')
    ax5.set_title('Average Accuracy at Different Thresholds', fontweight='bold', fontsize=12)
    ax5.set_xticks(thresholds)
    ax5.set_xticklabels([f'±{t}' for t in thresholds])
    ax5.legend(fontsize=8)
    ax5.grid(True, alpha=0.3)
    ax5.set_ylim([0, 100])

    # 6. Sample Size
    ax6 = fig.add_subplot(gs[1, 2])
    for i, model in enumerate(models):
        n_samples = [all_metrics[model].get(score, {}).get('n_samples', 0) for score in SCORE_METRICS]
        ax6.bar(x + i * width, n_samples, width, label=model,
                color=MODEL_COLORS.get(model, f'C{i}'))

    ax6.set_xlabel('Metric', fontweight='bold')
    ax6.set_ylabel('Number of Samples', fontweight='bold')
    ax6.set_title('Sample Size per Metric', fontweight='bold', fontsize=12)
    ax6.set_xticks(x + width * 1.5)
    ax6.set_xticklabels(SCORE_METRICS, rotation=45, ha='right')
    ax6.legend(loc='upper right', fontsize=8)
    ax6.grid(True, alpha=0.3, axis='y')

    plt.suptitle('Model Performance Comparison Dashboard', fontsize=16, fontweight='bold', y=0.995)
    plt.savefig(output_path, dpi=300, bbox_inches='tight')
    print(f"Saved: {output_path}")
    plt.close()


def plot_success_failure_analysis(all_failures: Dict[str, Dict], output_path: str):
    """
    Create success/failure analysis visualization.

    Args:
        all_failures: Dict mapping model names to their failure statistics
        output_path: Path to save figure
    """
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 6))

    models = list(all_failures.keys())

    # Success rate bar chart
    success_rates = [all_failures[m]['success_rate'] for m in models]
    successful_counts = [all_failures[m]['successful'] for m in models]
    failed_counts = [all_failures[m]['failed'] for m in models]

    x = np.arange(len(models))
    bars = ax1.bar(x, success_rates, color=[MODEL_COLORS.get(m) for m in models], alpha=0.7, edgecolor='black')

    # Add counts on bars
    for i, (bar, succ, fail) in enumerate(zip(bars, successful_counts, failed_counts)):
        height = bar.get_height()
        ax1.text(bar.get_x() + bar.get_width()/2., height + 1,
                f'{succ}/{succ+fail}',
                ha='center', va='bottom', fontweight='bold')

    ax1.set_ylabel('Success Rate (%)', fontweight='bold')
    ax1.set_title('Model Success Rates', fontweight='bold', fontsize=14)
    ax1.set_xticks(x)
    ax1.set_xticklabels(models, rotation=45, ha='right')
    ax1.set_ylim([0, 110])
    ax1.grid(True, alpha=0.3, axis='y')
    ax1.axhline(y=100, color='gray', linestyle='--', alpha=0.5)

    # Failure breakdown
    all_failure_types = set()
    for failures in all_failures.values():
        all_failure_types.update(failures['failure_types'].keys())

    failure_matrix = np.zeros((len(models), len(all_failure_types)))
    failure_types_list = sorted(all_failure_types)

    for i, model in enumerate(models):
        for j, failure_type in enumerate(failure_types_list):
            failure_matrix[i, j] = all_failures[model]['failure_types'].get(failure_type, 0)

    # Stacked bar chart for failure types
    bottom = np.zeros(len(models))
    for j, failure_type in enumerate(failure_types_list):
        ax2.bar(x, failure_matrix[:, j], bottom=bottom, label=failure_type, alpha=0.7)
        bottom += failure_matrix[:, j]

    ax2.set_ylabel('Number of Failures', fontweight='bold')
    ax2.set_title('Failure Type Breakdown', fontweight='bold', fontsize=14)
    ax2.set_xticks(x)
    ax2.set_xticklabels(models, rotation=45, ha='right')
    ax2.legend(loc='upper right', fontsize=9)
    ax2.grid(True, alpha=0.3, axis='y')

    plt.tight_layout()
    plt.savefig(output_path, dpi=300, bbox_inches='tight')
    print(f"Saved: {output_path}")
    plt.close()


def plot_metric_comparison(all_metrics: Dict[str, Dict], metric_name: str, output_path: str):
    """
    Create detailed comparison for a specific metric.

    Args:
        all_metrics: Dict mapping model names to their metrics
        metric_name: Name of the metric to plot
        output_path: Path to save figure
    """
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 6))

    models = list(all_metrics.keys())
    errors_by_model = []
    model_labels = []

    for model in models:
        metric_data = all_metrics[model].get(metric_name, {})
        errors = metric_data.get('errors', np.array([]))
        if len(errors) > 0:
            errors_by_model.append(errors)
            model_labels.append(model)

    # Box plot
    bp = ax1.boxplot(errors_by_model, labels=model_labels, patch_artist=True, widths=0.6)

    for patch, model in zip(bp['boxes'], model_labels):
        patch.set_facecolor(MODEL_COLORS.get(model))
        patch.set_alpha(0.7)

    ax1.axhline(y=0, color='red', linestyle='--', linewidth=2, alpha=0.5, label='Zero Error')
    ax1.set_ylabel('Prediction Error', fontweight='bold')
    ax1.set_title(f'{metric_name.upper()} - Error Distribution', fontweight='bold', fontsize=14)
    ax1.set_xticklabels(model_labels, rotation=45, ha='right')
    ax1.grid(True, alpha=0.3, axis='y')
    ax1.legend()

    # Statistical significance (ANOVA or Kruskal-Wallis)
    if len(errors_by_model) > 1:
        # Test for normality
        normality_p_values = [stats.shapiro(errors)[1] if len(errors) > 3 else 0
                              for errors in errors_by_model]

        if all(p > 0.05 for p in normality_p_values):
            # Use ANOVA
            f_stat, p_value = stats.f_oneway(*errors_by_model)
            test_name = "ANOVA"
        else:
            # Use Kruskal-Wallis
            h_stat, p_value = stats.kruskal(*errors_by_model)
            test_name = "Kruskal-Wallis"

        sig_text = f"{test_name} p-value: {p_value:.4f}"
        if p_value < 0.001:
            sig_text += " ***"
        elif p_value < 0.01:
            sig_text += " **"
        elif p_value < 0.05:
            sig_text += " *"

        ax1.text(0.05, 0.95, sig_text, transform=ax1.transAxes,
                fontsize=10, verticalalignment='top',
                bbox=dict(boxstyle='round', facecolor='wheat', alpha=0.8))

    # Performance metrics table
    ax2.axis('tight')
    ax2.axis('off')

    table_data = [['Model', 'MSE', 'MAE', 'Pearson r', 'Spearman ρ', 'N']]

    for model in models:
        metric_data = all_metrics[model].get(metric_name, {})
        row = [
            model[:20],  # Truncate long names
            f"{metric_data.get('mse', np.nan):.3f}",
            f"{metric_data.get('mae', np.nan):.3f}",
            f"{metric_data.get('pearson_r', np.nan):.3f}",
            f"{metric_data.get('spearman_r', np.nan):.3f}",
            f"{metric_data.get('n_samples', 0)}"
        ]
        table_data.append(row)

    table = ax2.table(cellText=table_data, cellLoc='center', loc='center',
                     colWidths=[0.3, 0.15, 0.15, 0.15, 0.15, 0.1])
    table.auto_set_font_size(False)
    table.set_fontsize(9)
    table.scale(1, 2)

    # Style header row
    for i in range(len(table_data[0])):
        table[(0, i)].set_facecolor('#40466e')
        table[(0, i)].set_text_props(weight='bold', color='white')

    # Color code model rows
    for i, model in enumerate(models, start=1):
        if i < len(table_data):
            table[(i, 0)].set_facecolor(MODEL_COLORS.get(model))
            table[(i, 0)].set_alpha(0.3)

    ax2.set_title(f'{metric_name.upper()} - Performance Metrics', fontweight='bold', fontsize=14)

    plt.tight_layout()
    plt.savefig(output_path, dpi=300, bbox_inches='tight')
    print(f"Saved: {output_path}")
    plt.close()


def plot_publication_ready_summary(all_metrics: Dict[str, Dict], all_failures: Dict[str, Dict], output_path: str):
    """
    Create single publication-ready summary figure.

    Args:
        all_metrics: Dict mapping model names to their metrics
        all_failures: Dict mapping model names to their failure statistics
        output_path: Path to save figure
    """
    fig = plt.figure(figsize=(16, 10))
    gs = fig.add_gridspec(2, 2, hspace=0.25, wspace=0.25)

    models = list(all_metrics.keys())
    x = np.arange(len(SCORE_METRICS))
    width = 0.2

    # 1. MAE Comparison
    ax1 = fig.add_subplot(gs[0, 0])
    for i, model in enumerate(models):
        mae_values = [all_metrics[model].get(score, {}).get('mae', np.nan) for score in SCORE_METRICS]
        ax1.bar(x + i * width, mae_values, width, label=model,
                color=MODEL_COLORS.get(model, f'C{i}'), alpha=0.8, edgecolor='black', linewidth=0.5)

    ax1.set_xlabel('Metric', fontweight='bold', fontsize=11)
    ax1.set_ylabel('Mean Absolute Error', fontweight='bold', fontsize=11)
    ax1.set_title('(A) Error Comparison', fontweight='bold', fontsize=13, loc='left')
    ax1.set_xticks(x + width * 1.5)
    ax1.set_xticklabels([s.capitalize() for s in SCORE_METRICS], rotation=45, ha='right')
    ax1.legend(loc='upper left', fontsize=8, framealpha=0.9)
    ax1.grid(True, alpha=0.3, axis='y')

    # 2. Correlation Heatmap
    ax2 = fig.add_subplot(gs[0, 1])
    corr_matrix = np.zeros((len(models), len(SCORE_METRICS)))
    for i, model in enumerate(models):
        for j, score in enumerate(SCORE_METRICS):
            corr_matrix[i, j] = all_metrics[model].get(score, {}).get('pearson_r', 0)

    im = ax2.imshow(corr_matrix, cmap='RdYlGn', aspect='auto', vmin=-1, vmax=1)
    ax2.set_xticks(np.arange(len(SCORE_METRICS)))
    ax2.set_yticks(np.arange(len(models)))
    ax2.set_xticklabels([s.capitalize() for s in SCORE_METRICS], rotation=45, ha='right')
    ax2.set_yticklabels([m.split(':')[0] for m in models])  # Shorten names
    ax2.set_title('(B) Correlation (Predicted vs Ground Truth)', fontweight='bold', fontsize=13, loc='left')

    for i in range(len(models)):
        for j in range(len(SCORE_METRICS)):
            color = 'white' if abs(corr_matrix[i, j]) > 0.5 else 'black'
            text = ax2.text(j, i, f'{corr_matrix[i, j]:.2f}',
                           ha="center", va="center", color=color, fontsize=9, fontweight='bold')

    cbar = plt.colorbar(im, ax=ax2)
    cbar.set_label('Pearson r', fontweight='bold')

    # 3. Success Rates
    ax3 = fig.add_subplot(gs[1, 0])
    success_rates = [all_failures[m]['success_rate'] for m in models]
    bars = ax3.bar(range(len(models)), success_rates,
                   color=[MODEL_COLORS.get(m) for m in models],
                   alpha=0.8, edgecolor='black', linewidth=0.5)

    for i, (bar, rate) in enumerate(zip(bars, success_rates)):
        ax3.text(bar.get_x() + bar.get_width()/2., rate + 2,
                f'{rate:.1f}%', ha='center', va='bottom', fontweight='bold', fontsize=10)

    ax3.set_ylabel('Success Rate (%)', fontweight='bold', fontsize=11)
    ax3.set_title('(C) Completion Success Rate', fontweight='bold', fontsize=13, loc='left')
    ax3.set_xticks(range(len(models)))
    ax3.set_xticklabels([m.split(':')[0] for m in models], rotation=45, ha='right')
    ax3.set_ylim([0, 110])
    ax3.grid(True, alpha=0.3, axis='y')
    ax3.axhline(y=100, color='gray', linestyle='--', alpha=0.5)

    # 4. Accuracy at Thresholds
    ax4 = fig.add_subplot(gs[1, 1])
    thresholds = [0.5, 1.0, 1.5]

    for model in models:
        acc_values_by_threshold = {0.5: [], 1.0: [], 1.5: []}
        for score in SCORE_METRICS:
            metrics = all_metrics[model].get(score, {})
            acc_values_by_threshold[0.5].append(metrics.get('acc_05', 0))
            acc_values_by_threshold[1.0].append(metrics.get('acc_10', 0))
            acc_values_by_threshold[1.5].append(metrics.get('acc_15', 0))

        avg_acc = [np.mean(acc_values_by_threshold[t]) for t in thresholds]
        ax4.plot(thresholds, avg_acc, marker='o', linewidth=2.5, markersize=8,
                label=model.split(':')[0], color=MODEL_COLORS.get(model))

    ax4.set_xlabel('Error Threshold', fontweight='bold', fontsize=11)
    ax4.set_ylabel('Average Accuracy (%)', fontweight='bold', fontsize=11)
    ax4.set_title('(D) Accuracy at Different Error Thresholds', fontweight='bold', fontsize=13, loc='left')
    ax4.set_xticks(thresholds)
    ax4.set_xticklabels([f'±{t}' for t in thresholds])
    ax4.legend(fontsize=9, framealpha=0.9)
    ax4.grid(True, alpha=0.3)
    ax4.set_ylim([0, 100])

    plt.suptitle('Benchmark Model Comparison Summary', fontsize=16, fontweight='bold', y=0.98)
    plt.savefig(output_path, dpi=300, bbox_inches='tight')
    print(f"Saved: {output_path}")
    plt.close()


def main():
    parser = argparse.ArgumentParser(
        description="Compare benchmark results across multiple models"
    )
    parser.add_argument('--results-dir', default='benchmark_results/results',
                       help='Base directory containing model results')
    parser.add_argument('--conference', required=True, choices=['iclr', 'neurips', 'icml'],
                       help='Conference format')
    parser.add_argument('--output-dir', default='benchmark_results/comparison_plots',
                       help='Directory to save comparison plots')

    args = parser.parse_args()

    # Create output directory
    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    print("\n" + "="*60)
    print("MODEL COMPARISON ANALYSIS")
    print("="*60 + "\n")

    # Load all model results
    print(f"Loading results from: {args.results_dir}")
    all_results = ModelComparison.load_all_model_results(args.results_dir, args.conference)

    if not all_results:
        print("Error: No model results found!")
        sys.exit(1)

    print(f"\nFound {len(all_results)} models: {', '.join(all_results.keys())}\n")

    # Calculate metrics for each model
    print("Calculating aggregated metrics...")
    all_metrics = {}
    all_failures = {}

    for model_name, data in all_results.items():
        results = data.get("results", [])
        print(f"  {model_name}: {len(results)} papers")

        all_metrics[model_name] = calculate_aggregated_metrics(results)
        all_failures[model_name] = analyze_failures(results)

    print("\n" + "="*60)
    print("GENERATING PLOTS")
    print("="*60 + "\n")

    # Generate all plots
    plot_performance_dashboard(
        all_metrics,
        str(output_dir / "performance_dashboard.png")
    )

    plot_success_failure_analysis(
        all_failures,
        str(output_dir / "success_failure_analysis.png")
    )

    for metric in SCORE_METRICS:
        plot_metric_comparison(
            all_metrics,
            metric,
            str(output_dir / f"{metric}_comparison.png")
        )

    plot_publication_ready_summary(
        all_metrics,
        all_failures,
        str(output_dir / "publication_ready_summary.png")
    )

    # Save summary statistics to JSON
    summary_stats = {
        'models': list(all_results.keys()),
        'metrics': all_metrics,
        'failures': all_failures
    }

    summary_path = output_dir / "comparison_summary.json"
    with open(summary_path, 'w') as f:
        # Convert numpy types to Python types for JSON serialization
        def convert_types(obj):
            if isinstance(obj, np.integer):
                return int(obj)
            elif isinstance(obj, np.floating):
                return float(obj)
            elif isinstance(obj, np.ndarray):
                return obj.tolist()
            elif isinstance(obj, dict):
                return {k: convert_types(v) for k, v in obj.items()}
            elif isinstance(obj, list):
                return [convert_types(item) for item in obj]
            return obj

        summary_stats = convert_types(summary_stats)
        json.dump(summary_stats, f, indent=2)

    print(f"\nSaved summary statistics to: {summary_path}")

    print("\n" + "="*60)
    print("COMPARISON COMPLETE")
    print("="*60)
    print(f"\nAll plots saved to: {output_dir}")


if __name__ == "__main__":
    main()

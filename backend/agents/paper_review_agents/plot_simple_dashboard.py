#!/usr/bin/env python3
"""
Simple Dashboard Generator
==========================
Generate a clean 4-panel comparison dashboard.
"""

import json
import numpy as np
import matplotlib.pyplot as plt
from pathlib import Path

# Model short names
MODEL_SHORT_NAMES = {
    'gpt-oss:120b': 'GPT-120B',
    'gpt-oss:20b': 'GPT-20B',
    'qwen3-coder-30b': 'Qwen-30B',
    'qwen3-coder-30b-a3b-instruct:q3_k_m': 'Qwen-30B-Q3'
}

# Model colors
MODEL_COLORS = {
    'GPT-20B': '#3498db',
    'GPT-120B': '#2ecc71',
    'Qwen-30B': '#e67e22',
    'Qwen-30B-Q3': '#e74c3c'
}

SCORE_METRICS = ['rating', 'soundness', 'presentation', 'contribution', 'confidence']

def load_data(json_path):
    """Load comparison summary data."""
    with open(json_path, 'r') as f:
        return json.load(f)

def plot_simple_dashboard(data, output_path):
    """
    Create simple 4-panel dashboard.

    Args:
        data: Loaded comparison summary data
        output_path: Path to save figure
    """
    fig, axes = plt.subplots(1, 4, figsize=(20, 5))

    # Get short names for models
    models = data['models']
    short_models = [MODEL_SHORT_NAMES.get(m, m) for m in models]
    colors = [MODEL_COLORS.get(sm, '#95a5a6') for sm in short_models]

    # Panel 1: Average MSE with 95% CI
    ax1 = axes[0]
    avg_mse = []
    mse_errors = []

    for model in models:
        mse_values = []
        ci_lower_values = []
        ci_upper_values = []

        for score in SCORE_METRICS:
            if score in data['metrics'][model]:
                mse = data['metrics'][model][score]['mse']
                ci = data['metrics'][model][score]['mse_ci']
                mse_values.append(mse)
                ci_lower_values.append(ci[0])
                ci_upper_values.append(ci[1])

        avg = np.mean(mse_values)
        avg_mse.append(avg)

        # Calculate average CI
        avg_ci_lower = np.mean(ci_lower_values)
        avg_ci_upper = np.mean(ci_upper_values)
        mse_errors.append([avg - avg_ci_lower, avg_ci_upper - avg])

    mse_errors = np.array(mse_errors).T
    x_pos = np.arange(len(short_models))

    bars1 = ax1.bar(x_pos, avg_mse, color=colors, alpha=0.8, edgecolor='black', linewidth=1.5)
    ax1.errorbar(x_pos, avg_mse, yerr=mse_errors, fmt='none', ecolor='black',
                 capsize=5, capthick=2, linewidth=1.5)

    # Add values on bars
    for i, (bar, val) in enumerate(zip(bars1, avg_mse)):
        ax1.text(bar.get_x() + bar.get_width()/2., val + mse_errors[1][i] + 0.1,
                f'{val:.2f}', ha='center', va='bottom', fontweight='bold', fontsize=11)

    ax1.set_ylabel('Mean Squared Error', fontweight='bold', fontsize=13)
    ax1.set_title('(A) Average MSE (with 95% CI)', fontweight='bold', fontsize=14)
    ax1.set_xticks(x_pos)
    ax1.set_xticklabels(short_models, fontsize=11, fontweight='bold')
    ax1.grid(True, alpha=0.3, axis='y')
    ax1.set_ylim([0, max(avg_mse) + max(mse_errors[1]) + 0.5])

    # Panel 2: Average Correlation
    ax2 = axes[1]
    avg_corr_pearson = []
    avg_corr_spearman = []

    for model in models:
        pearson_values = []
        spearman_values = []

        for score in SCORE_METRICS:
            if score in data['metrics'][model]:
                pearson_values.append(data['metrics'][model][score]['pearson_r'])
                spearman_values.append(data['metrics'][model][score]['spearman_r'])

        avg_corr_pearson.append(np.mean(pearson_values))
        avg_corr_spearman.append(np.mean(spearman_values))

    width = 0.35
    x_pos = np.arange(len(short_models))

    bars2a = ax2.bar(x_pos - width/2, avg_corr_pearson, width, label='Pearson',
                     color=colors, alpha=0.8, edgecolor='black', linewidth=1.5)
    bars2b = ax2.bar(x_pos + width/2, avg_corr_spearman, width, label='Spearman',
                     color=colors, alpha=0.5, edgecolor='black', linewidth=1.5, hatch='//')

    # Add values on bars
    for i, (val_p, val_s) in enumerate(zip(avg_corr_pearson, avg_corr_spearman)):
        ax2.text(i - width/2, val_p + 0.01 if val_p > 0 else val_p - 0.03,
                f'{val_p:.2f}', ha='center', va='bottom' if val_p > 0 else 'top',
                fontweight='bold', fontsize=10)
        ax2.text(i + width/2, val_s + 0.01 if val_s > 0 else val_s - 0.03,
                f'{val_s:.2f}', ha='center', va='bottom' if val_s > 0 else 'top',
                fontweight='bold', fontsize=10)

    ax2.axhline(y=0, color='gray', linestyle='--', linewidth=1.5, alpha=0.7)
    ax2.set_ylabel('Correlation Coefficient', fontweight='bold', fontsize=13)
    ax2.set_title('(B) Average Correlation', fontweight='bold', fontsize=14)
    ax2.set_xticks(x_pos)
    ax2.set_xticklabels(short_models, fontsize=11, fontweight='bold')
    ax2.legend(fontsize=11, framealpha=0.9, loc='upper left')
    ax2.grid(True, alpha=0.3, axis='y')
    ax2.set_ylim([-0.15, 0.25])

    # Panel 3: Accuracy at Different Thresholds
    ax3 = axes[2]
    thresholds = [0.5, 1.0, 1.5]

    for i, model in enumerate(models):
        acc_values_by_threshold = {0.5: [], 1.0: [], 1.5: []}

        for score in SCORE_METRICS:
            if score in data['metrics'][model]:
                metrics = data['metrics'][model][score]
                acc_values_by_threshold[0.5].append(metrics.get('acc_05', 0))
                acc_values_by_threshold[1.0].append(metrics.get('acc_10', 0))
                acc_values_by_threshold[1.5].append(metrics.get('acc_15', 0))

        avg_acc = [np.mean(acc_values_by_threshold[t]) for t in thresholds]

        ax3.plot(thresholds, avg_acc, marker='o', linewidth=3, markersize=10,
                label=short_models[i], color=colors[i])

    ax3.set_xlabel('Error Threshold', fontweight='bold', fontsize=13)
    ax3.set_ylabel('Average Accuracy (%)', fontweight='bold', fontsize=13)
    ax3.set_title('(C) Accuracy at Different Thresholds', fontweight='bold', fontsize=14)
    ax3.set_xticks(thresholds)
    ax3.set_xticklabels([f'±{t}' for t in thresholds], fontsize=11)
    ax3.legend(fontsize=11, framealpha=0.9, loc='lower right')
    ax3.grid(True, alpha=0.3)
    ax3.set_ylim([0, 100])

    # Panel 4: Model Success Rate
    ax4 = axes[3]
    successful_counts = [data['failures'][m]['successful'] for m in models]
    success_rates = [(succ / 50) * 100 for succ in successful_counts]  # Recalculate as X/50

    x_pos = np.arange(len(short_models))
    bars4 = ax4.bar(x_pos, success_rates, color=colors, alpha=0.8,
                    edgecolor='black', linewidth=1.5)

    # Add values on bars
    for i, (bar, rate, succ) in enumerate(zip(bars4, success_rates, successful_counts)):
        ax4.text(bar.get_x() + bar.get_width()/2., rate + 2,
                f'{rate:.0f}%', ha='center', va='bottom', fontweight='bold', fontsize=12)
        ax4.text(bar.get_x() + bar.get_width()/2., rate/2,
                f'{succ}/50', ha='center', va='center', fontweight='bold',
                fontsize=10, color='white')

    ax4.set_ylabel('Success Rate (%)', fontweight='bold', fontsize=13)
    ax4.set_title('(D) Model Success Rate', fontweight='bold', fontsize=14)
    ax4.set_xticks(x_pos)
    ax4.set_xticklabels(short_models, fontsize=11, fontweight='bold')
    ax4.set_ylim([0, 110])
    ax4.grid(True, alpha=0.3, axis='y')
    ax4.axhline(y=100, color='gray', linestyle='--', linewidth=1.5, alpha=0.5)

    plt.tight_layout()
    plt.savefig(output_path, dpi=300, bbox_inches='tight')
    print(f"Saved: {output_path}")
    plt.close()

def main():
    # Load data
    data_path = Path("benchmark_results/comparison_plots/comparison_summary.json")
    output_path = Path("benchmark_results/comparison_plots/simple_dashboard.png")

    print("Loading comparison data...")
    data = load_data(data_path)

    print("Generating simple dashboard...")
    plot_simple_dashboard(data, output_path)

    print("\nDashboard complete!")

if __name__ == "__main__":
    main()

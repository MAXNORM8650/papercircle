"""
Error Analysis Tools
====================
Tools for analyzing benchmark results to identify improvement opportunities.
"""

import json
import numpy as np
from typing import Dict, List, Any, Tuple
from pathlib import Path
from review_schemas import ConferenceFormat


class ErrorAnalyzer:
    """
    Analyze benchmark results to identify patterns and suggest improvements.

    This tool helps iteratively improve the review system by identifying:
    - Systematic scoring biases
    - Common failure modes
    - Papers that are particularly difficult to review
    - Actionable improvement suggestions
    """

    @staticmethod
    def load_results(summary_path: str) -> Dict[str, Any]:
        """
        Load benchmark summary results.

        Args:
            summary_path: Path to benchmark_summary.json

        Returns:
            Loaded results dictionary
        """
        with open(summary_path, 'r') as f:
            return json.load(f)

    @staticmethod
    def analyze_score_bias(results: List[Dict]) -> Dict[str, Any]:
        """
        Identify systematic bias in score predictions.

        Args:
            results: List of result dictionaries

        Returns:
            Dictionary with bias analysis
        """
        bias_analysis = {}

        # Collect all errors by score type
        score_errors = {}

        for result in results:
            if not result.get("success"):
                continue

            eval_data = result.get("evaluation", {})
            score_metrics = eval_data.get("score_metrics", {})

            for score_name, metrics in score_metrics.items():
                if metrics.get("missing"):
                    continue

                if score_name not in score_errors:
                    score_errors[score_name] = []

                score_errors[score_name].append(metrics["error"])

        # Analyze bias for each score
        for score_name, errors in score_errors.items():
            if not errors:
                continue

            errors_array = np.array(errors)

            bias_analysis[score_name] = {
                "mean_error": float(np.mean(errors_array)),
                "median_error": float(np.median(errors_array)),
                "std_error": float(np.std(errors_array)),
                "bias_direction": "over-prediction" if np.mean(errors_array) > 0 else "under-prediction",
                "bias_magnitude": float(abs(np.mean(errors_array))),
                "is_significant": abs(np.mean(errors_array)) > 0.5,  # Threshold for significance
                "sample_size": len(errors)
            }

        return bias_analysis

    @staticmethod
    def analyze_failure_modes(results: List[Dict]) -> Dict[str, Any]:
        """
        Categorize and count different types of failures.

        Args:
            results: List of result dictionaries

        Returns:
            Dictionary with failure mode analysis
        """
        failure_modes = {
            "parsing_failures": 0,
            "missing_scores": {},
            "out_of_range_scores": {},
            "format_violations": [],
            "total_failures": 0,
            "total_successes": 0
        }

        for result in results:
            if not result.get("success"):
                failure_modes["total_failures"] += 1
                continue

            failure_modes["total_successes"] += 1

            # Check for parsing failures
            eval_data = result.get("evaluation", {})
            if not eval_data.get("parsing_success"):
                failure_modes["parsing_failures"] += 1

            # Check for missing scores
            score_metrics = eval_data.get("score_metrics", {})
            for score_name, metrics in score_metrics.items():
                if metrics.get("missing"):
                    failure_modes["missing_scores"][score_name] = \
                        failure_modes["missing_scores"].get(score_name, 0) + 1

                # Check for out-of-range scores
                pred = metrics.get("predicted")
                if pred is not None:
                    # Define valid ranges
                    valid_ranges = {
                        "rating": (1, 10),
                        "soundness": (1, 4),
                        "presentation": (1, 4),
                        "contribution": (1, 4),
                        "confidence": (1, 5),
                        "recommendation": (1, 4)
                    }

                    if score_name in valid_ranges:
                        min_val, max_val = valid_ranges[score_name]
                        if pred < min_val or pred > max_val:
                            failure_modes["out_of_range_scores"][score_name] = \
                                failure_modes["out_of_range_scores"].get(score_name, 0) + 1

        return failure_modes

    @staticmethod
    def identify_difficult_papers(results: List[Dict], top_k: int = 10) -> List[Dict]:
        """
        Find papers with highest prediction errors.

        Args:
            results: List of result dictionaries
            top_k: Number of most difficult papers to return

        Returns:
            List of most difficult papers with their errors
        """
        papers_with_errors = []

        for result in results:
            if not result.get("success"):
                continue

            # Calculate total absolute error across all scores
            eval_data = result.get("evaluation", {})
            score_metrics = eval_data.get("score_metrics", {})

            total_abs_error = 0
            count = 0

            for score_name, metrics in score_metrics.items():
                if not metrics.get("missing") and metrics.get("absolute_error") is not None:
                    total_abs_error += metrics["absolute_error"]
                    count += 1

            if count > 0:
                avg_abs_error = total_abs_error / count

                papers_with_errors.append({
                    "paper_id": result.get("paper_id"),
                    "title": result.get("title"),
                    "avg_abs_error": avg_abs_error,
                    "total_abs_error": total_abs_error,
                    "score_count": count,
                    "score_details": score_metrics
                })

        # Sort by average absolute error
        papers_with_errors.sort(key=lambda x: x["avg_abs_error"], reverse=True)

        return papers_with_errors[:top_k]

    @staticmethod
    def suggest_improvements(
        bias_analysis: Dict,
        failure_modes: Dict,
        difficult_papers: List[Dict]
    ) -> List[str]:
        """
        Generate actionable improvement suggestions based on analysis.

        Args:
            bias_analysis: Output from analyze_score_bias
            failure_modes: Output from analyze_failure_modes
            difficult_papers: Output from identify_difficult_papers

        Returns:
            List of actionable suggestions
        """
        suggestions = []

        # Parsing failure suggestions
        parsing_rate = failure_modes["total_successes"] / \
                      (failure_modes["total_successes"] + failure_modes["total_failures"]) \
                      if (failure_modes["total_successes"] + failure_modes["total_failures"]) > 0 else 0

        if failure_modes["parsing_failures"] > 0:
            parsing_success_rate = 1 - (failure_modes["parsing_failures"] / failure_modes["total_successes"])
            if parsing_success_rate < 0.95:
                suggestions.append(
                    f"CRITICAL: Only {parsing_success_rate:.1%} of reviews parse correctly. "
                    f"Review the JSON schema in agent prompts and add more explicit formatting instructions."
                )

        # Score bias suggestions
        for score_name, analysis in bias_analysis.items():
            if analysis["is_significant"]:
                direction = analysis["bias_direction"]
                magnitude = analysis["bias_magnitude"]

                if direction == "over-prediction":
                    suggestions.append(
                        f"{score_name.upper()}: Systematic over-prediction by {magnitude:.2f} points. "
                        f"Add calibration examples with LOWER scores to the prompt. "
                        f"Example: Include reviews with {score_name}=1-2 to teach the model about weak papers."
                    )
                else:
                    suggestions.append(
                        f"{score_name.upper()}: Systematic under-prediction by {magnitude:.2f} points. "
                        f"Add calibration examples with HIGHER scores to the prompt. "
                        f"Example: Include reviews with {score_name}=9-10 to teach the model about excellent papers."
                    )

        # Missing score suggestions
        if failure_modes["missing_scores"]:
            for score_name, count in failure_modes["missing_scores"].items():
                if count > failure_modes["total_successes"] * 0.1:  # More than 10%
                    suggestions.append(
                        f"{score_name.upper()}: Missing in {count} reviews ({count/failure_modes['total_successes']:.1%}). "
                        f"Ensure the JSON schema explicitly requires this field with example value."
                    )

        # Out of range suggestions
        if failure_modes["out_of_range_scores"]:
            for score_name, count in failure_modes["out_of_range_scores"].items():
                suggestions.append(
                    f"{score_name.upper()}: Out-of-range values in {count} reviews. "
                    f"Add explicit range constraints to the prompt (e.g., 'rating MUST be between 1 and 10')."
                )

        # Difficult papers
        if difficult_papers:
            avg_error = np.mean([p["avg_abs_error"] for p in difficult_papers[:5]])
            suggestions.append(
                f"INSIGHT: Top 5 most difficult papers have average error of {avg_error:.2f}. "
                f"Manually inspect these papers to understand what makes them difficult. "
                f"Paper IDs: {', '.join([p['paper_id'] for p in difficult_papers[:5]])}"
            )

        # General suggestion if no specific issues
        if not suggestions:
            suggestions.append(
                "GOOD: No major issues detected. System is performing well. "
                "Consider running on larger dataset for more comprehensive evaluation."
            )

        return suggestions

    @staticmethod
    def generate_report(summary_path: str, output_path: Optional[str] = None) -> str:
        """
        Generate a comprehensive error analysis report.

        Args:
            summary_path: Path to benchmark_summary.json
            output_path: Optional path to save report (default: same dir as summary)

        Returns:
            Report text
        """
        # Load results
        data = ErrorAnalyzer.load_results(summary_path)
        results = data.get("results", [])

        if not results:
            return "Error: No results to analyze"

        # Run all analyses
        bias_analysis = ErrorAnalyzer.analyze_score_bias(results)
        failure_modes = ErrorAnalyzer.analyze_failure_modes(results)
        difficult_papers = ErrorAnalyzer.identify_difficult_papers(results, top_k=10)
        suggestions = ErrorAnalyzer.suggest_improvements(bias_analysis, failure_modes, difficult_papers)

        # Generate report
        report_lines = [
            "="*70,
            "ERROR ANALYSIS REPORT",
            "="*70,
            "",
            f"Data: {summary_path}",
            f"Total Reviews: {len(results)}",
            f"Conference: {data.get('config', {}).get('conference', 'Unknown')}",
            "",
            "="*70,
            "1. SCORE BIAS ANALYSIS",
            "="*70,
            ""
        ]

        for score_name, analysis in bias_analysis.items():
            report_lines.extend([
                f"{score_name.upper()}:",
                f"  Mean Error: {analysis['mean_error']:+.3f} ({analysis['bias_direction']})",
                f"  Magnitude: {analysis['bias_magnitude']:.3f}",
                f"  Significant: {'YES' if analysis['is_significant'] else 'No'}",
                f"  Sample Size: {analysis['sample_size']}",
                ""
            ])

        report_lines.extend([
            "="*70,
            "2. FAILURE MODE ANALYSIS",
            "="*70,
            "",
            f"Total Successful: {failure_modes['total_successes']}",
            f"Total Failed: {failure_modes['total_failures']}",
            f"Parsing Failures: {failure_modes['parsing_failures']}",
            ""
        ])

        if failure_modes["missing_scores"]:
            report_lines.append("Missing Scores:")
            for score, count in failure_modes["missing_scores"].items():
                report_lines.append(f"  {score}: {count}")
            report_lines.append("")

        if failure_modes["out_of_range_scores"]:
            report_lines.append("Out-of-Range Scores:")
            for score, count in failure_modes["out_of_range_scores"].items():
                report_lines.append(f"  {score}: {count}")
            report_lines.append("")

        report_lines.extend([
            "="*70,
            "3. MOST DIFFICULT PAPERS",
            "="*70,
            ""
        ])

        for i, paper in enumerate(difficult_papers, 1):
            report_lines.extend([
                f"{i}. {paper['paper_id']}",
                f"   Title: {paper['title'][:60]}...",
                f"   Avg Absolute Error: {paper['avg_abs_error']:.3f}",
                ""
            ])

        report_lines.extend([
            "="*70,
            "4. IMPROVEMENT SUGGESTIONS",
            "="*70,
            ""
        ])

        for i, suggestion in enumerate(suggestions, 1):
            report_lines.append(f"{i}. {suggestion}")
            report_lines.append("")

        report_lines.append("="*70)

        report_text = "\n".join(report_lines)

        # Save report if output path specified
        if output_path:
            with open(output_path, 'w') as f:
                f.write(report_text)
            print(f"\nReport saved to: {output_path}")
        elif output_path is None:
            # Save to same directory as summary
            report_path = Path(summary_path).parent / "error_analysis_report.txt"
            with open(report_path, 'w') as f:
                f.write(report_text)
            print(f"\nReport saved to: {report_path}")

        return report_text


__all__ = [
    'ErrorAnalyzer',
]

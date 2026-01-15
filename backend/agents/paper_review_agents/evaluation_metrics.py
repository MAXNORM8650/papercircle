"""
Evaluation Metrics for Review Benchmarking
===========================================
Comprehensive metrics for evaluating predicted reviews against ground truth.
"""

import numpy as np
from typing import Dict, List, Any, Optional
from scipy.stats import pearsonr, spearmanr
from review_schemas import ConferenceFormat


class EvaluationMetrics:
    """Utilities for computing evaluation metrics."""

    @staticmethod
    def compute_score_metrics(
        predicted: Dict[str, Any],
        ground_truth: Dict[str, Any],
        conference: ConferenceFormat
    ) -> Dict[str, Dict[str, float]]:
        """
        Compute metrics for numerical scores.

        Args:
            predicted: Predicted review dictionary
            ground_truth: Ground truth scores dictionary
            conference: Conference format

        Returns:
            Dictionary of metrics for each score type
        """
        metrics = {}

        # Define score mappings based on conference
        if conference == ConferenceFormat.ICLR:
            score_pairs = [
                ("rating", "rating", 1.0),  # 1-10 scale, no conversion needed
                ("soundness", "soundness", 1.0),  # 1-4 scale
                ("presentation", "presentation", 1.0),  # 1-4 scale
                ("contribution", "contribution", 1.0),  # 1-4 scale
                ("confidence", "confidence", 1.0),  # 1-5 scale
            ]

        elif conference == ConferenceFormat.NEURIPS:
            score_pairs = [
                ("rating", "rating", 1.0),  # 1-10 scale
                ("confidence", "confidence", 1.0),  # 1-5 scale
            ]

        elif conference == ConferenceFormat.ICML:
            score_pairs = [
                ("recommendation", "recommendation", 1.0),  # 1-4 scale (inverted!)
            ]

        else:
            score_pairs = []

        # Compute metrics for each score
        for pred_key, gt_key, scale_factor in score_pairs:
            pred_val = predicted.get(pred_key)
            gt_val = ground_truth.get(gt_key)

            if pred_val is not None and gt_val is not None:
                # Apply scale factor if needed
                pred_val_scaled = pred_val * scale_factor
                gt_val_scaled = gt_val * scale_factor

                error = pred_val_scaled - gt_val_scaled
                abs_error = abs(error)
                squared_error = error ** 2

                metrics[pred_key] = {
                    "predicted": pred_val_scaled,
                    "ground_truth": gt_val_scaled,
                    "error": error,
                    "absolute_error": abs_error,
                    "squared_error": squared_error,
                    "within_half": abs_error <= 0.5,
                    "within_one": abs_error <= 1.0,
                    "within_one_half": abs_error <= 1.5,
                }
            else:
                # Missing value
                metrics[pred_key] = {
                    "predicted": pred_val,
                    "ground_truth": gt_val,
                    "error": None,
                    "absolute_error": None,
                    "squared_error": None,
                    "within_half": False,
                    "within_one": False,
                    "within_one_half": False,
                    "missing": True
                }

        return metrics

    @staticmethod
    def compute_content_metrics(
        predicted: Dict[str, Any],
        ground_truth: Dict[str, Any],
        conference: ConferenceFormat
    ) -> Dict[str, Any]:
        """
        Compute content quality metrics (word counts, section completeness).

        Args:
            predicted: Predicted review dictionary
            ground_truth: Ground truth data (including word count fields)
            conference: Conference format

        Returns:
            Dictionary of content metrics
        """
        metrics = {}

        if conference == ConferenceFormat.ICLR:
            # Word count alignment
            sections = ["summary", "strengths", "weaknesses", "questions"]

            for section in sections:
                if section in predicted:
                    pred_content = predicted[section]

                    # Handle both list and string formats
                    if isinstance(pred_content, list):
                        pred_text = " ".join(str(item) for item in pred_content)
                    else:
                        pred_text = str(pred_content)

                    pred_wc = len(pred_text.split())
                    target_wc = ground_truth.get(f"wc_{section}", 0)

                    if target_wc > 0:
                        metrics[f"{section}_wc"] = pred_wc
                        metrics[f"{section}_wc_target"] = target_wc
                        metrics[f"{section}_wc_ratio"] = pred_wc / target_wc
                        metrics[f"{section}_wc_diff"] = abs(pred_wc - target_wc)

            # Section completeness
            metrics["has_summary"] = bool(predicted.get("summary"))
            metrics["has_strengths"] = bool(predicted.get("strengths"))
            metrics["has_weaknesses"] = bool(predicted.get("weaknesses"))
            metrics["has_questions"] = bool(predicted.get("questions"))

            # Count items in lists
            strengths = predicted.get("strengths", [])
            weaknesses = predicted.get("weaknesses", [])
            questions = predicted.get("questions", [])

            metrics["num_strengths"] = len(strengths) if isinstance(strengths, list) else 0
            metrics["num_weaknesses"] = len(weaknesses) if isinstance(weaknesses, list) else 0
            metrics["num_questions"] = len(questions) if isinstance(questions, list) else 0

            # Total review word count
            total_wc = sum([
                metrics.get("summary_wc", 0),
                metrics.get("strengths_wc", 0),
                metrics.get("weaknesses_wc", 0),
                metrics.get("questions_wc", 0)
            ])
            metrics["total_wc"] = total_wc
            target_total_wc = ground_truth.get("wc_review", 0)
            if target_total_wc > 0:
                metrics["total_wc_ratio"] = total_wc / target_total_wc

        elif conference == ConferenceFormat.NEURIPS:
            # Similar logic for NeurIPS
            sections_map = {
                "summary_and_contributions": "wc_summary_and_contributions",
                "strengths": "wc_strengths",
                "weaknesses_and_improvements": "wc_improvement",
                "limitations": "wc_limitations"
            }

            for section, wc_field in sections_map.items():
                if section in predicted:
                    pred_text = str(predicted[section])
                    pred_wc = len(pred_text.split())
                    target_wc = ground_truth.get(wc_field, 0)

                    if target_wc > 0:
                        metrics[f"{section}_wc"] = pred_wc
                        metrics[f"{section}_wc_ratio"] = pred_wc / target_wc

        elif conference == ConferenceFormat.ICML:
            # ICML has many detailed sections
            sections_map = {
                "summary": "wc_summary",
                "claims_and_evidence": "wc_claims_and_evidence",
                "methods_and_evaluation": "wc_methods_and_evaluation",
                "strengths_and_weaknesses": "wc_strengths_and_weaknesses",
            }

            for section, wc_field in sections_map.items():
                if section in predicted:
                    pred_text = str(predicted[section])
                    pred_wc = len(pred_text.split())
                    target_wc = ground_truth.get(wc_field, 0)

                    if target_wc > 0:
                        metrics[f"{section}_wc"] = pred_wc
                        metrics[f"{section}_wc_ratio"] = pred_wc / target_wc

        return metrics

    @staticmethod
    def compute_all(
        predicted: Dict[str, Any],
        ground_truth: Dict[str, Any],
        conference: ConferenceFormat,
        include_content: bool = True
    ) -> Dict[str, Any]:
        """
        Compute all evaluation metrics for a single review.

        Args:
            predicted: Predicted review dictionary
            ground_truth: Ground truth data
            conference: Conference format
            include_content: Whether to compute content metrics

        Returns:
            Complete evaluation dictionary
        """
        evaluation = {
            "parsing_success": "_parse_error" not in predicted,
            "score_metrics": EvaluationMetrics.compute_score_metrics(
                predicted, ground_truth, conference
            )
        }

        if include_content:
            evaluation["content_metrics"] = EvaluationMetrics.compute_content_metrics(
                predicted, ground_truth, conference
            )

        return evaluation

    @staticmethod
    def aggregate_results(
        results: List[Dict[str, Any]],
        conference: ConferenceFormat
    ) -> Dict[str, Any]:
        """
        Aggregate metrics across multiple results.

        Args:
            results: List of result dictionaries
            conference: Conference format

        Returns:
            Aggregated metrics dictionary
        """
        # Collect all score metrics
        score_collections = {}

        for result in results:
            if not result.get("success"):
                continue

            eval_data = result.get("evaluation", {})
            score_metrics = eval_data.get("score_metrics", {})

            for score_name, metrics in score_metrics.items():
                # Skip if missing
                if metrics.get("missing"):
                    continue

                if score_name not in score_collections:
                    score_collections[score_name] = {
                        "errors": [],
                        "absolute_errors": [],
                        "squared_errors": [],
                        "within_half": [],
                        "within_one": [],
                        "within_one_half": [],
                        "predicted": [],
                        "ground_truth": []
                    }

                score_collections[score_name]["errors"].append(metrics["error"])
                score_collections[score_name]["absolute_errors"].append(metrics["absolute_error"])
                score_collections[score_name]["squared_errors"].append(metrics["squared_error"])
                score_collections[score_name]["within_half"].append(metrics["within_half"])
                score_collections[score_name]["within_one"].append(metrics["within_one"])
                score_collections[score_name]["within_one_half"].append(metrics["within_one_half"])
                score_collections[score_name]["predicted"].append(metrics["predicted"])
                score_collections[score_name]["ground_truth"].append(metrics["ground_truth"])

        # Compute aggregate statistics
        aggregated = {}

        for score_name, data in score_collections.items():
            if not data["predicted"]:
                continue

            pred_array = np.array(data["predicted"])
            gt_array = np.array(data["ground_truth"])

            # Compute correlation (need at least 2 points)
            pearson_corr = 0.0
            spearman_corr = 0.0
            if len(pred_array) > 1:
                try:
                    pearson_corr = pearsonr(pred_array, gt_array)[0]
                    spearman_corr = spearmanr(pred_array, gt_array)[0]
                except:
                    pearson_corr = 0.0
                    spearman_corr = 0.0

            aggregated[score_name] = {
                "mse": float(np.mean(data["squared_errors"])),
                "mae": float(np.mean(data["absolute_errors"])),
                "rmse": float(np.sqrt(np.mean(data["squared_errors"]))),
                "correlation": float(pearson_corr),
                "spearman": float(spearman_corr),
                "accuracy_half": float(np.mean(data["within_half"])),
                "accuracy_one": float(np.mean(data["within_one"])),
                "accuracy_one_half": float(np.mean(data["within_one_half"])),
                "mean_error": float(np.mean(data["errors"])),
                "std_error": float(np.std(data["errors"])),
                "min_error": float(np.min(np.abs(data["errors"]))),
                "max_error": float(np.max(np.abs(data["errors"]))),
                "count": len(data["predicted"])
            }

        return {
            "score_metrics": aggregated,
            "total_papers": len(results),
            "successful_parses": len([r for r in results if r.get("evaluation", {}).get("parsing_success")])
        }


__all__ = [
    'EvaluationMetrics',
]

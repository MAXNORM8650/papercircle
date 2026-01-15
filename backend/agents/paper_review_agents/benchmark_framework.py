"""
Comprehensive Benchmarking Framework
=====================================
Production-ready framework for benchmarking paper review systems across multiple conferences.
"""

import json
import os
from typing import List, Dict, Any, Optional
from dataclasses import dataclass, asdict
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed
from tqdm import tqdm

from orchestrator import MultiAgentOrchestrator, AgentRole, Config
from review_schemas import ConferenceFormat
from conference_detector import ConferenceDetector
from review_formatter import ReviewFormatter
from evaluation_metrics import EvaluationMetrics


@dataclass
class BenchmarkConfig:
    """Configuration for benchmark runs."""

    # Data paths
    data_path: str
    output_dir: str
    cache_dir: str = "./benchmark_cache"

    # Execution settings
    limit: Optional[int] = None  # None = all papers
    parallel_reviews: int = 3  # Number of concurrent reviews
    skip_cached: bool = True  # Skip papers that already have cached results

    # Model settings
    model_id: str = "ollama_chat/qwen3-coder:30b"
    api_base: str = "http://10.127.30.115:11434"
    num_ctx: int = 32000

    # Conference format
    conference: Optional[ConferenceFormat] = None  # Auto-detect if None

    # Evaluation settings
    compute_content_metrics: bool = True  # Compute word count and content metrics
    save_individual_results: bool = True  # Save result file for each paper


class BenchmarkFramework:
    """
    Comprehensive benchmarking framework for paper review systems.

    Features:
    - Multi-conference support (ICLR, NeurIPS, ICML)
    - Parallel execution with progress tracking
    - Robust error handling and caching
    - Multiple evaluation metrics
    - Detailed result analysis
    """

    def __init__(self, config: BenchmarkConfig):
        """
        Initialize benchmark framework.

        Args:
            config: Benchmark configuration
        """
        self.config = config
        self.results = []
        self.errors = []

        # Setup directories
        os.makedirs(config.output_dir, exist_ok=True)
        os.makedirs(config.cache_dir, exist_ok=True)

        # Detect conference if not specified
        if not config.conference:
            sample_data = self._load_sample_data()
            self.conference = ConferenceDetector.detect_from_data(sample_data[0])
        else:
            self.conference = config.conference

        print(f"\n{'='*60}")
        print(f"Benchmark Configuration")
        print(f"{'='*60}")
        print(f"Conference: {self.conference.value.upper()}")
        print(f"Data path: {config.data_path}")
        print(f"Output dir: {config.output_dir}")
        print(f"Model: {config.model_id}")
        print(f"Parallel workers: {config.parallel_reviews}")
        print(f"{'='*60}\n")

        # Initialize orchestrator with conference format
        orch_config = Config(
            model_id=config.model_id,
            api_base=config.api_base,
            num_ctx=config.num_ctx,
            cache_dir=config.cache_dir
        )
        self.orchestrator = MultiAgentOrchestrator(
            config=orch_config,
            conference=self.conference
        )

    def _load_sample_data(self) -> List[Dict]:
        """Load a sample of data for conference detection."""
        with open(self.config.data_path, 'r') as f:
            data = json.load(f)
        return data[:1] if data else []

    def load_papers(self) -> List[Dict]:
        """
        Load and filter papers from benchmark data.

        Returns:
            List of valid papers for benchmarking
        """
        print(f"Loading papers from {self.config.data_path}...")

        with open(self.config.data_path, 'r') as f:
            papers = json.load(f)

        # Filter papers with valid data
        valid_papers = []
        for paper in papers:
            if ConferenceDetector.is_valid_paper(paper, self.conference):
                valid_papers.append(paper)

        print(f"Found {len(valid_papers)} valid papers from {len(papers)} total")

        if self.config.limit:
            valid_papers = valid_papers[:self.config.limit]
            print(f"Limited to {len(valid_papers)} papers")

        return valid_papers

    def run_single_paper(self, paper: Dict) -> Optional[Dict]:
        """
        Run review for a single paper.

        Args:
            paper: Paper data dictionary

        Returns:
            Result dictionary if successful, None if failed
        """
        paper_id = paper.get("id", "unknown")
        cache_file = Path(self.config.output_dir) / f"{paper_id}_result.json"

        # Check cache
        if self.config.skip_cached and cache_file.exists():
            try:
                with open(cache_file, 'r') as f:
                    cached = json.load(f)
                    # Verify cached result has predictions
                    if cached.get("predicted_review"):
                        return cached
            except Exception as e:
                # Cache read failed, continue with fresh review
                pass

        try:
            # Get PDF URL
            pdf_url = ConferenceDetector.get_pdf_url(paper, self.conference)
            if not pdf_url:
                raise Exception("No PDF URL found")

            # Run orchestrator with CRITIC agent only (for efficiency)
            result = self.orchestrator.run_pipeline(
                pdf_url,
                agents_to_run=[AgentRole.CRITIC],
                conference=self.conference
            )

            # Extract and parse review
            critic_result = result.get("stages", {}).get("critic", {})

            if not critic_result.get("success"):
                raise Exception(f"Critic failed: {critic_result.get('error')}")

            review_text = critic_result.get("result")
            if not review_text:
                raise Exception("Empty review output")

            # Try to parse the result
            # The tool returns JSON directly, so try parsing it first
            predicted_review = None
            parse_method = None

            # Debug: Print first 200 chars of result
            result_preview = str(review_text)[:200] if review_text else "None"
            result_type = type(review_text).__name__

            # Method 1: Check if it's already a dict (some agent types return dict directly)
            if isinstance(review_text, dict):
                predicted_review = review_text
                parse_method = "direct_dict"

            # Method 2: Try direct JSON parse (tool returned JSON string)
            elif not predicted_review:
                try:
                    predicted_review = json.loads(review_text)
                    parse_method = "json_loads"
                except (json.JSONDecodeError, TypeError):
                    pass

            # Method 3: Try extracting JSON from text (ReviewFormatter)
            if not predicted_review:
                try:
                    predicted_review = ReviewFormatter.parse_and_validate(
                        review_text,
                        self.conference,
                        strict=False  # Lenient parsing
                    )
                    parse_method = "review_formatter"
                except Exception as e:
                    # Last resort: create empty review with error
                    predicted_review = ReviewFormatter._get_empty_review(
                        self.conference,
                        error=f"All parse methods failed. Type: {result_type}, Preview: {result_preview}, Error: {str(e)}"
                    )
                    parse_method = "failed"

            if not predicted_review:
                raise Exception(f"Could not parse review output (type: {result_type})")

            # Extract ground truth
            ground_truth = self._extract_ground_truth(paper)

            # Compute evaluation
            evaluation = EvaluationMetrics.compute_all(
                predicted_review,
                ground_truth,
                self.conference,
                include_content=self.config.compute_content_metrics
            )

            print(f"DEBUG: review_text type: {type(review_text)}")
            print(f"DEBUG: review_text content: {str(review_text)[:200]}")
            
            result_data = {
                "paper_id": paper_id,
                "title": paper.get("title", ""),
                "predicted_review": predicted_review,
                "ground_truth": ground_truth,
                "evaluation": evaluation,
                "raw_output": review_text,
                "success": True
            }

            # Save individual result
            if self.config.save_individual_results:
                with open(cache_file, 'w') as f:
                    json.dump(result_data, f, indent=2)

            return result_data

        except Exception as e:
            error_data = {
                "paper_id": paper_id,
                "title": paper.get("title", ""),
                "error": str(e),
                "success": False
            }
            self.errors.append(error_data)
            return None

    def _extract_ground_truth(self, paper: Dict) -> Dict:
        """
        Extract ground truth scores and metadata based on conference.

        Args:
            paper: Paper data dictionary

        Returns:
            Ground truth dictionary
        """
        if self.conference == ConferenceFormat.ICLR:
            # Extract average values (stored as [mean, std])
            return {
                "rating": paper.get("rating_avg", [None])[0],
                "soundness": paper.get("soundness_avg", [None])[0],
                "presentation": paper.get("presentation_avg", [None])[0],
                "contribution": paper.get("contribution_avg", [None])[0],
                "confidence": paper.get("confidence_avg", [None])[0],
                # Word counts as proxy for content length
                "wc_summary": paper.get("wc_summary_avg", [0])[0],
                "wc_strengths": paper.get("wc_strengths_avg", [0])[0],
                "wc_weaknesses": paper.get("wc_weaknesses_avg", [0])[0],
                "wc_questions": paper.get("wc_questions_avg", [0])[0],
                "wc_review": paper.get("wc_review_avg", [0])[0],
            }

        elif self.conference == ConferenceFormat.NEURIPS:
            return {
                "rating": paper.get("rating_avg", [None])[0],
                "confidence": paper.get("confidence_avg", [None])[0],
                "wc_summary_and_contributions": paper.get("wc_summary_and_contributions_avg", [0])[0],
                "wc_strengths": paper.get("wc_strengths_avg", [0])[0],
                "wc_improvement": paper.get("wc_improvement_avg", [0])[0],
                "wc_limitations": paper.get("wc_limitations_avg", [0])[0],
            }

        elif self.conference == ConferenceFormat.ICML:
            return {
                "recommendation": paper.get("recommendation_avg", [None])[0],
                "wc_summary": paper.get("wc_summary_avg", [0])[0],
                "wc_claims_and_evidence": paper.get("wc_claims_and_evidence_avg", [0])[0],
                "wc_methods_and_evaluation": paper.get("wc_methods_and_evaluation_avg", [0])[0],
                "wc_strengths_and_weaknesses": paper.get("wc_strengths_and_weaknesses_avg", [0])[0],
            }

        return {}

    def run_benchmark(self):
        """Run complete benchmark across all papers."""
        papers = self.load_papers()

        print(f"\n{'='*60}")
        print(f"Starting Benchmark")
        print(f"{'='*60}")
        print(f"Total papers: {len(papers)}")
        print(f"Conference: {self.conference.value.upper()}")
        print(f"Model: {self.config.model_id}")
        print(f"Parallel workers: {self.config.parallel_reviews}")
        print(f"{'='*60}\n")

        # Run reviews in parallel
        with ThreadPoolExecutor(max_workers=self.config.parallel_reviews) as executor:
            futures = {
                executor.submit(self.run_single_paper, paper): paper
                for paper in papers
            }

            for future in tqdm(as_completed(futures), total=len(papers), desc="Reviewing papers"):
                try:
                    result = future.result()
                    if result and result.get("success"):
                        self.results.append(result)
                except Exception as e:
                    paper = futures[future]
                    print(f"\nUnexpected error for {paper.get('id')}: {e}")

        # Save summary
        self._save_results()

        # Print analysis
        self._print_analysis()

    def _save_results(self):
        """Save comprehensive results summary."""
        summary = {
            "config": {
                "data_path": self.config.data_path,
                "conference": self.conference.value,
                "model_id": self.config.model_id,
                "limit": self.config.limit,
                "total_papers_in_file": len(self.results) + len(self.errors),
            },
            "statistics": {
                "total_papers": len(self.results) + len(self.errors),
                "successful": len(self.results),
                "failed": len(self.errors),
                "success_rate": len(self.results) / (len(self.results) + len(self.errors)) if (len(self.results) + len(self.errors)) > 0 else 0,
            },
            "results": self.results,
            "errors": self.errors
        }

        summary_path = Path(self.config.output_dir) / "benchmark_summary.json"
        with open(summary_path, 'w') as f:
            json.dump(summary, f, indent=2)

        print(f"\n{'='*60}")
        print(f"Results saved to: {summary_path}")
        print(f"{'='*60}\n")

    def _print_analysis(self):
        """Print detailed analysis of results."""
        if not self.results:
            print("\n" + "="*60)
            print("ERROR: No successful results to analyze")
            print("="*60)
            return

        print("\n" + "="*60)
        print("BENCHMARK ANALYSIS")
        print("="*60)

        # Aggregate metrics
        metrics = EvaluationMetrics.aggregate_results(self.results, self.conference)

        # Print score metrics
        print("\n--- Score Prediction Metrics ---\n")
        for score_name, stats in metrics["score_metrics"].items():
            print(f"{score_name.upper()}:")
            print(f"  MSE:                {stats['mse']:.4f}")
            print(f"  MAE:                {stats['mae']:.4f}")
            print(f"  RMSE:               {stats['rmse']:.4f}")
            print(f"  Correlation (Pearson):  {stats['correlation']:.4f}")
            print(f"  Correlation (Spearman): {stats['spearman']:.4f}")
            print(f"  Accuracy (±0.5):    {stats['accuracy_half']:.2%}")
            print(f"  Accuracy (±1.0):    {stats['accuracy_one']:.2%}")
            print(f"  Accuracy (±1.5):    {stats['accuracy_one_half']:.2%}")
            print(f"  Mean Error:         {stats['mean_error']:.4f}")
            print(f"  Std Error:          {stats['std_error']:.4f}")
            print(f"  Sample Size:        {stats['count']}")
            print()

        # Execution statistics
        total = len(self.results) + len(self.errors)
        parsing_success = metrics.get("successful_parses", 0)

        print("--- Execution Statistics ---\n")
        print(f"Total Papers:       {total}")
        print(f"Successful Reviews: {len(self.results)} ({len(self.results)/total:.2%})")
        print(f"Failed Reviews:     {len(self.errors)} ({len(self.errors)/total:.2%})")
        print(f"Parsing Success:    {parsing_success}/{len(self.results)} ({parsing_success/len(self.results):.2%})")

        # Print errors if any
        if self.errors:
            print("\n--- Failed Papers ---\n")
            for error in self.errors[:10]:  # Show first 10 errors
                print(f"  {error['paper_id']}: {error.get('error', 'Unknown error')}")
            if len(self.errors) > 10:
                print(f"  ... and {len(self.errors) - 10} more")

        print("\n" + "="*60)


__all__ = [
    'BenchmarkConfig',
    'BenchmarkFramework',
]

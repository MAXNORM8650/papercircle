# PaperCircle Benchmarks

PaperCircle includes two benchmark suites for evaluating system quality:

1. **Paper Review Benchmark** — AI-generated review quality vs human reviewers
2. **Retrieval Benchmark** — Paper search and ranking accuracy

## Resources

| Resource | Link |
|----------|------|
| Benchmark Leaderboard | [ItsMaxNorm/pc-bench](https://huggingface.co/spaces/ItsMaxNorm/pc-bench) |
| Benchmark Results (dataset) | [ItsMaxNorm/pc-benchmark](https://huggingface.co/datasets/ItsMaxNorm/pc-benchmark) |
| Papers Database | [ItsMaxNorm/pc-database](https://huggingface.co/datasets/ItsMaxNorm/pc-database) |
| Papers API | [ItsMaxNorm/papercircle-papers-api](https://huggingface.co/spaces/ItsMaxNorm/papercircle-papers-api) |

---

## 1. Paper Review Benchmark

Evaluates AI-generated conference-style reviews against averaged human reviewer scores.

### Supported Conferences

| Conference | Score Metrics | Content Metrics |
|------------|--------------|-----------------|
| **ICLR** | Rating (1-10), Soundness (1-4), Presentation (1-4), Contribution (1-4), Confidence (1-5) | Summary, Strengths, Weaknesses, Questions word counts |
| **NeurIPS** | Rating (1-10), Confidence (1-5) | Summary & Contributions, Strengths, Improvements, Limitations word counts |
| **ICML** | Recommendation (1-4) | Summary, Claims & Evidence, Methods & Evaluation, Strengths & Weaknesses word counts |

### Evaluation Metrics

**Score metrics (per dimension):**
- **MSE** — Mean Squared Error
- **MAE** — Mean Absolute Error
- **RMSE** — Root Mean Squared Error
- **Pearson r** — Linear correlation with human scores
- **Spearman ρ** — Rank correlation with human scores
- **Accuracy ±0.5 / ±1.0 / ±1.5** — Percentage of predictions within threshold of ground truth

**Content metrics:**
- Section completeness (has summary, strengths, weaknesses, questions)
- Number of listed items per section
- Word count alignment (predicted vs target per section)

### Running the Review Benchmark

```bash
# Single conference
python backend/agents/paper_review_agents/benchmark_paper_review.py \
  --data iclr2024.json --conference iclr --limit 100

# Auto-detect conference format
python backend/agents/paper_review_agents/benchmark_paper_review.py \
  --data iclr2024.json --limit 50

# All conferences in a directory
python backend/agents/paper_review_agents/benchmark_paper_review.py \
  --data /path/to/benchmarks --all-conferences

# Custom model and parallelism
python backend/agents/paper_review_agents/benchmark_paper_review.py \
  --data iclr2024.json --model ollama_chat/qwen3-coder:30b --parallel 5

# Skip content metrics for faster runs
python backend/agents/paper_review_agents/benchmark_paper_review.py \
  --data iclr2024.json --skip-content-metrics
```

### CLI Arguments

| Argument | Default | Description |
|----------|---------|-------------|
| `--data` | required | Path to benchmark JSON file or directory |
| `--output` | `benchmark_results/` | Output directory |
| `--conference` | auto-detect | `iclr`, `neurips`, or `icml` |
| `--all-conferences` | false | Run all conference files in directory |
| `--limit` | all | Number of papers to process |
| `--parallel` | 1 | Parallel workers (recommended: 3-5) |
| `--model` | `ollama_chat/gpt-oss:120b` | LLM model ID |
| `--api-base` | `http://10.127.30.115:11434` | LLM API base URL |
| `--no-cache` | false | Ignore cached results |
| `--skip-content-metrics` | false | Skip content metrics for speed |

### Input Data Format

JSON array of paper objects. Example for ICLR:

```json
[
  {
    "id": "paper_123",
    "title": "Paper Title",
    "rating_avg": [6.5, 1.2],
    "soundness_avg": [3.0, 0.5],
    "presentation_avg": [2.8, 0.4],
    "contribution_avg": [3.2, 0.6],
    "confidence_avg": [3.8, 0.8],
    "wc_summary_avg": [150, 30],
    "wc_strengths_avg": [200, 40],
    "wc_weaknesses_avg": [180, 35],
    "wc_questions_avg": [80, 20]
  }
]
```

Score fields use `[mean, std]` format from averaged human reviews.

### Output Format

Results are saved to `benchmark_results/{conference}/benchmark_summary.json`:

```json
{
  "config": {
    "data_path": "iclr2024.json",
    "conference": "iclr",
    "model_id": "ollama_chat/qwen3-coder:30b",
    "total_papers_in_file": 500
  },
  "statistics": {
    "total_papers": 100,
    "successful": 95,
    "failed": 5,
    "success_rate": 0.95
  },
  "results": [
    {
      "paper_id": "paper_123",
      "title": "Paper Title",
      "predicted_review": { ... },
      "ground_truth": { ... },
      "evaluation": {
        "score_metrics": { ... },
        "content_metrics": { ... }
      },
      "success": true
    }
  ]
}
```

### Visualization

```python
from backend.agents.paper_review_agents.benchmark_utils import BenchmarkVisualizer

viz = BenchmarkVisualizer()

# Scatter plots: predicted vs ground truth
viz.plot_all_correlations("benchmark_results/iclr/benchmark_summary.json", "iclr", "plots/")

# Error distribution histograms
viz.plot_error_distribution("benchmark_results/iclr/benchmark_summary.json", "iclr", "plots/")
```

### Multi-Model Comparison

```python
from backend.agents.paper_review_agents.benchmark_utils import ModelComparison

comparison = ModelComparison()
results = comparison.load_all_model_results("benchmark_results/", "iclr")
# Compare MSE, correlation, accuracy across models
```

---

## 2. Retrieval Benchmark

Evaluates paper search quality across multiple retrieval strategies.

### Evaluation Metrics

- **Recall@k** (k=1, 5, 10, 20, 50) — Percentage of queries where the relevant paper appears in top-k results
- **MRR** (Mean Reciprocal Rank) — Average of 1/rank for the relevant paper
- **Success Rate** — Percentage of queries that return results
- **Found Rate** — Percentage of queries where the relevant paper is found

### Retrieval Baselines

| Baseline | Description | MRR | Recall@10 | Speed |
|----------|-------------|-----|-----------|-------|
| **BM25** | Keyword-based ranking | 0.42 | 0.65 | ~0.8s |
| **BM25 + Reranker** | BM25 candidates + cross-encoder reranking | **0.71** | **0.92** | ~1.7s |
| **Semantic** | Sentence transformer embeddings | 0.38 | 0.61 | ~2.1s |
| **Hybrid** | BM25 + semantic weighted average | 0.48 | 0.73 | ~2.3s |

### Running the Retrieval Benchmark

#### Multi-Agent Pipeline Benchmark

```bash
# Quick test
python benchmark_pipeline.py --limit 10

# Full run
python benchmark_pipeline.py \
  --benchmark benchmarks/offline_queries_100k_semantic_v3.jsonl \
  --limit 50 \
  --output benchmarks/pipeline_results.json \
  --model ollama_chat/qwen3-coder:30b
```

#### Multi-Baseline Comparison

```bash
# BM25 + Reranker (recommended)
python benchmark_multiagent.py \
  --queries queries.json --baseline bm25+reranker --workers 4

# BM25 only (fastest)
python benchmark_multiagent.py \
  --queries queries.json --baseline bm25

# Semantic embeddings
python benchmark_multiagent.py \
  --queries queries.json --baseline semantic

# Hybrid
python benchmark_multiagent.py \
  --queries queries.json --baseline hybrid
```

### CLI Arguments

| Argument | Default | Description |
|----------|---------|-------------|
| `--queries`, `-q` | required | Path to JSON/JSONL benchmark queries |
| `--workers`, `-w` | 2 | Parallel workers |
| `--output`, `-o` | auto | Output JSON file |
| `--baseline`, `-b` | `bm25+reranker` | Retrieval baseline |
| `--reranker-backend` | `vllm` | `vllm`, `cross_encoder`, or `ensemble` |
| `--reranker-model` | `Qwen/Qwen3-Reranker-0.6B` | Reranker model |
| `--limit`, `-l` | all | Limit number of queries |
| `--model` | default | LLM model ID |
| `--api-base` | `http://localhost:11431` | API base URL |

### Query Format

JSONL file, one query per line:

```json
{
  "id": "q000001",
  "query": "offline: find recent work on Game Theory at IJCAI 2023",
  "filters": {
    "conferences": ["ijcai"],
    "start_year": 2023,
    "end_year": 2023
  },
  "relevant_id": "ijcai2023:paper305",
  "relevant_title": "Fairly Allocating Goods and (Terrible) Chores"
}
```

### Output Format

```json
{
  "benchmark_info": {
    "total_queries": 50,
    "retrieval_baseline": "bm25+reranker",
    "reranker_model": "Qwen/Qwen3-Reranker-0.6B"
  },
  "summary": {
    "overall_hit_rate": 0.92,
    "mean_mrr": 0.71,
    "mean_recall@1": 0.54,
    "mean_recall@5": 0.85,
    "mean_recall@10": 0.92,
    "mean_total_time": 1.73
  },
  "individual_results": [ ... ]
}
```

### Reranker Setup

For the `bm25+reranker` baseline, start a vLLM server:

```bash
python -m vllm.entrypoints.openai.api_server \
  --model Qwen/Qwen3-Reranker-0.6B \
  --port 8000 \
  --trust-remote-code
```

Alternatively, use `--reranker-backend cross_encoder` (no server needed, slower).

---

## Offline Retrieval

The system supports offline paper retrieval from a local database organized by conference:

```
database/
├── nips/
│   ├── nips2020.json
│   ├── nips2021.json
│   └── ...
├── cvpr/
├── icml/
└── ...
```

Prefix queries with `offline:` to use local retrieval:

```python
result = pipeline.run("offline: world models for robotics")
```

---

## Supported Conferences

The benchmark database and API support 30+ conferences:

ICLR, NeurIPS, ICML, CVPR, ICCV, ECCV, AAAI, IJCAI, ACL, EMNLP, NAACL, COLING, COLM, ICRA, IROS, RSS, CoRL, KDD, WWW, AISTATS, UAI, COLT, ACML, WACV, SIGGRAPH, SIGGRAPH Asia, ACM MM, 3DV, AutoML, ALT

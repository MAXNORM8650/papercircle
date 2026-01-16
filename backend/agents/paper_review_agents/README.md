<p align="center">
  <img src="https://raw.githubusercontent.com/yourusername/papercircle/main/public/paper-circle-logo.svg" alt="PaperCircle" width="120"/>
</p>

<h1 align="center">Paper Review Agents</h1>

<p align="center">
  <b>Multi-Agent AI System for Automated Research Paper Review</b><br/>
  <i>Conference-quality reviews using specialized LLM agents</i>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/python-3.10+-blue.svg" alt="Python 3.10+"/>
  <img src="https://img.shields.io/badge/smolagents-powered-green.svg" alt="smolagents"/>
  <img src="https://img.shields.io/badge/license-MIT-yellow.svg" alt="MIT"/>
</p>

---

## Overview

A production-ready system that generates ICLR/NeurIPS/ICML-style paper reviews using multiple specialized AI agents. Each agent handles a specific aspect of review: analysis, critique, reproducibility, and literature linking.

```
Paper PDF → Orchestrator → [Analyzer | Critic | Literature Expert | ...] → Structured Review
```

## Quick Start

```bash
# Install
pip install -r requirements.txt

# Review a paper
python paper_review_system.py https://arxiv.org/abs/2312.00752 -o review.md
```

## Usage

```python
from api import PaperReviewer, ReviewConfig

reviewer = PaperReviewer(ReviewConfig(
    api_base="http://localhost:11434",      # Ollama endpoint
    model_id="ollama_chat/qwen3-coder:30b"
))

# Full review
report = reviewer.review("https://arxiv.org/abs/2312.00752")

# Quick operations
summary = reviewer.summarize("https://arxiv.org/abs/2312.00752")
critique = reviewer.critique("https://arxiv.org/abs/2312.00752")
related = reviewer.find_related("https://arxiv.org/abs/2312.00752")
```

## Agents

| Agent | Purpose | Output |
|-------|---------|--------|
| **PDF Processor** | Download & extract | Text, metadata |
| **Deep Analyzer** | Technical analysis | Methodology, findings |
| **Critic** | Review assessment | Strengths, weaknesses, scores |
| **Literature Expert** | Related work | Citations, connections |
| **Reproducibility** | Reproduction check | Code/data availability score |
| **Summarizer** | Multi-level summaries | 1-sentence to technical |

## Benchmarking

Evaluate against real ICLR/NeurIPS/ICML reviews:

```bash
# Sample papers
python sample_and_plot.py sample --data iclr2024.json --output sampled.json --n 50 --seed 42

# Run benchmark
python benchmark_paper_review.py --data sampled.json --conference iclr

# Visualize
python sample_and_plot.py plot --results benchmark_results/iclr/benchmark_summary.json
```

**Benchmark Results (Qwen3-Coder 30B on ICLR 2024):**

| Metric | Rating (1-10) | Soundness (1-4) | Presentation (1-4) |
|--------|---------------|-----------------|-------------------|
| MAE | ~1.2 | ~0.6 | ~0.5 |
| Correlation | ~0.5 | ~0.4 | ~0.4 |
| Success Rate | 76%+ | - | - |

## Configuration

```python
ReviewConfig(
    api_base="http://localhost:11434",    # LLM endpoint
    model_id="ollama_chat/qwen3:30b",     # Model ID
    num_ctx=8192,                          # Context window
    parallel=True,                         # Parallel agents
    include_literature=True,               # Related work search
    output_format="markdown"               # Output: markdown/json/html
)
```

## LLM Support

Via LiteLLM: Ollama, OpenAI, Anthropic, vLLM, Azure OpenAI, and more.

```python
# Local (Ollama)
model_id = "ollama_chat/qwen3-coder:30b"

# OpenAI
model_id = "gpt-4"

# Anthropic
model_id = "claude-3-opus-20240229"
```

## Project Structure

```
paper_review_agents/
├── specialized_agents.py    # Agent definitions
├── review_schemas.py        # Conference-specific formats
├── benchmark_framework.py   # Benchmarking infra
├── evaluation_metrics.py    # MSE, MAE, Correlation
├── sample_and_plot.py       # Sampling & visualization
└── api.py                   # High-level API
```

## Docs

- [BENCHMARK.md](BENCHMARK.md) - Detailed benchmarking guide
- [QUICK_START.md](QUICK_START.md) - Step-by-step tutorial

---

<p align="center">
  Part of <a href="https://github.com/yourusername/papercircle">PaperCircle</a> - AI-powered research discovery
</p>

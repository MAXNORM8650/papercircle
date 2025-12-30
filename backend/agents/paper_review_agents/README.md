# 🔬 Open-Source Multi-Agent Paper Review System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.10+](https://img.shields.io/badge/python-3.10+-blue.svg)](https://www.python.org/downloads/)
[![smolagents](https://img.shields.io/badge/powered%20by-smolagents-green.svg)](https://github.com/huggingface/smolagents)

A comprehensive, open-source system for automated research paper analysis using multiple specialized AI agents. Inspired by [paperreview.ai](https://paperreview.ai/), this system provides deep analysis, critical review, reproducibility assessment, and literature linkage for any research paper.

## ✨ Features

- **📥 PDF Processing**: Download and extract text from arXiv, PDFs, and other sources
- **🔬 Deep Analysis**: Technical methodology breakdown, contribution identification
- **⚖️ Critical Review**: Strengths, weaknesses, and reviewer-style feedback
- **📚 Literature Linking**: Find related papers via Semantic Scholar and arXiv
- **🔄 Reproducibility Check**: Assess code availability, hyperparameters, etc.
- **📝 Multi-Level Summaries**: One-sentence to technical summaries
- **🗺️ Knowledge Graphs**: Citation networks and paper relationships
- **⚡ Parallel Execution**: Run multiple agents concurrently

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      ORCHESTRATOR                                │
│  Coordinates agents, manages dependencies, aggregates results    │
└─────────────────────────────────────────────────────────────────┘
                               │
         ┌─────────────────────┼─────────────────────┐
         │                     │                     │
         ▼                     ▼                     ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│  PDF Processor  │ │  Deep Analyzer  │ │     Critic      │
│                 │ │                 │ │                 │
│ • Download PDF  │ │ • Methodology   │ │ • Strengths     │
│ • Extract text  │ │ • Contributions │ │ • Weaknesses    │
│ • Metadata      │ │ • Key findings  │ │ • Questions     │
└─────────────────┘ └─────────────────┘ └─────────────────┘
         │                     │                     │
         ▼                     ▼                     ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ Literature      │ │ Reproducibility │ │   Summarizer    │
│ Expert          │ │ Checker         │ │                 │
│                 │ │                 │ │                 │
│ • Related work  │ │ • Code check    │ │ • Multi-level   │
│ • Citations     │ │ • Details check │ │ • Accessible    │
│ • Connections   │ │ • Score         │ │ • Technical     │
└─────────────────┘ └─────────────────┘ └─────────────────┘
```

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/paper-review-agents.git
cd paper-review-agents

# Install dependencies
pip install -r requirements.txt

# For PDF processing
pip install pymupdf pdfplumber
```

### Basic Usage

```python
from api import PaperReviewer, ReviewConfig

# Configure with your local LLM
config = ReviewConfig(
    api_base="http://10.127.30.115:11434",  # Ollama endpoint
    model_id="ollama_chat/qwen3-coder:30b",
    num_ctx=8192
)

# Create reviewer
reviewer = PaperReviewer(config)

# Full comprehensive review
report = reviewer.review("https://arxiv.org/abs/2312.00752")
print(report)

# Quick summary only
summary = reviewer.summarize("https://arxiv.org/abs/2312.00752")

# Critical review only
critique = reviewer.critique("https://arxiv.org/abs/2312.00752")

# Check reproducibility
repro = reviewer.check_reproducibility("https://arxiv.org/abs/2312.00752")

# Find related papers
related = reviewer.find_related("https://arxiv.org/abs/2312.00752")

# Compare multiple papers
comparison = reviewer.compare_papers([
    "https://arxiv.org/abs/2312.00752",
    "https://arxiv.org/abs/2303.08774"
])
```

### CLI Usage

```bash
# Full review
python paper_review_system.py https://arxiv.org/abs/2312.00752

# Save to file
python paper_review_system.py https://arxiv.org/abs/2312.00752 -o report.md

# With custom endpoint
python paper_review_system.py https://arxiv.org/abs/2312.00752 \
    --api-base http://localhost:11434 \
    --model ollama_chat/llama3:70b
```

### Using the Orchestrator Directly

```python
from orchestrator import MultiAgentOrchestrator, AgentRole, Config

# Configure
config = Config(
    api_base="http://10.127.30.115:11434",
    model_id="ollama_chat/qwen3-coder:30b"
)

# Create orchestrator
orchestrator = MultiAgentOrchestrator(config)

# Run full pipeline
results = orchestrator.run_pipeline(
    "https://arxiv.org/abs/2312.00752",
    parallel=True  # Run agents in parallel
)

# Access results
print(results["final_report"])

# Run specific agents only
results = orchestrator.run_pipeline(
    "https://arxiv.org/abs/2312.00752",
    agents_to_run=[AgentRole.CRITIC, AgentRole.SUMMARIZER]
)
```

## 🤖 Agents

### 1. PDF Processor
Downloads and processes PDFs from various sources (arXiv, direct links).

**Tools:**
- `download_pdf`: Handle various URL formats
- `extract_text_from_pdf`: Extract text via PyMuPDF/pdfplumber
- `extract_paper_metadata`: Get title, authors, abstract

### 2. Deep Analyzer
Provides in-depth technical analysis of the paper.

**Outputs:**
- Methodology breakdown
- Key technical innovations
- Main results and findings
- Limitations

### 3. Critic
Conference-reviewer-style critical assessment.

**Outputs:**
- Strengths (specific, not generic)
- Weaknesses (constructive)
- Questions for authors
- Scores: Novelty, Clarity, Significance (1-10)
- Overall recommendation

### 4. Literature Expert
Finds and analyzes related work.

**Tools:**
- `search_semantic_scholar`: Academic paper search
- `search_arxiv`: arXiv search
- `extract_citations`: Parse reference section

### 5. Contribution Analyzer
Extracts and validates claimed contributions.

**Tools:**
- `extract_contributions`: Find explicit claims
- `compare_to_baselines`: Analyze comparisons

### 6. Reproducibility Checker
Assesses whether results can be reproduced.

**Tools:**
- `check_reproducibility`: Score availability of details
- `extract_experimental_setup`: Get datasets, metrics, etc.

### 7. Summarizer
Creates accessible summaries at multiple levels.

**Outputs:**
- One-sentence summary (<280 chars)
- One-paragraph summary
- Executive summary for practitioners
- Technical summary for researchers

### 8. Knowledge Graph Builder
Maps relationships between papers.

**Tools:**
- `build_citation_graph`: Create citation network
- `identify_paper_clusters`: Group by theme
- `find_methodology_links`: Connect by technique

## ⚙️ Configuration

```python
from api import ReviewConfig

config = ReviewConfig(
    # LLM Settings
    api_base="http://localhost:11434",     # Ollama endpoint
    model_id="ollama_chat/qwen3-coder:30b", # Model to use
    num_ctx=8192,                          # Context window
    
    # Review Settings
    parallel=True,                         # Run agents in parallel
    include_literature=True,               # Search for related work
    include_reproducibility=True,          # Check reproducibility
    max_related_papers=5,                  # Limit related papers
    
    # Output Settings
    output_format="markdown",              # "markdown", "json", "html"
    save_intermediate=False,               # Save intermediate results
    cache_dir="./paper_cache"              # PDF cache directory
)
```

## 🔧 Supported LLM Backends

Via LiteLLM, supports many backends:

```python
# Ollama (local)
model_id = "ollama_chat/qwen3-coder:30b"
api_base = "http://localhost:11434"

# OpenAI
model_id = "gpt-4"
api_base = None  # Uses OPENAI_API_KEY

# Anthropic
model_id = "claude-3-opus-20240229"
api_base = None  # Uses ANTHROPIC_API_KEY

# vLLM
model_id = "openai/mistralai/Mistral-7B-Instruct-v0.1"
api_base = "http://localhost:8000/v1"

# Azure OpenAI
model_id = "azure/gpt-4-deployment"
api_base = "https://your-resource.openai.azure.com"
```

## 📊 Output Example

```markdown
# Paper Review Report

## 📄 Paper Information
**Title**: Diffusion Models for Image Generation
**arXiv ID**: 2312.00752

### Abstract
We present a novel approach to...

---

## 🔬 Deep Analysis

The paper introduces a new framework for...

### Methodology
1. Training objective: ...
2. Architecture: ...
3. Sampling process: ...

### Key Findings
- Achieves state-of-the-art FID of 2.1 on ImageNet
- 3x faster sampling than DDPM
- ...

---

## ⚖️ Critical Review

### Strengths
1. Novel theoretical contribution combining...
2. Comprehensive experiments across 5 datasets...
3. Clear writing and excellent figures...

### Weaknesses
1. Limited ablation on architecture choices...
2. No comparison with recent work X...
3. Computational cost not reported...

### Questions
1. How does performance scale with model size?
2. ...

### Scores
- Novelty: 7/10
- Clarity: 8/10
- Significance: 7/10

---

## 📚 Related Work

### Semantic Scholar Results
- **DDPM: Denoising Diffusion Probabilistic Models** (2020) - 5000 citations
- **Score-Based Generative Modeling** (2021) - 2000 citations
...
```

## 🛠️ Extending the System

### Adding a New Agent

```python
from smolagents import CodeAgent, tool

@tool
def my_custom_tool(paper_text: str) -> str:
    """My custom analysis tool."""
    # Your logic here
    return result

def create_my_agent(model):
    return CodeAgent(
        tools=[my_custom_tool],
        model=model,
        name="my_agent",
        system_prompt="You are an expert at..."
    )

# Register with orchestrator
orchestrator.my_agent = create_my_agent(model)
```

### Custom Pipeline

```python
from orchestrator import AgentTask, AgentRole

# Define custom task
custom_task = AgentTask(
    role=AgentRole.MY_ROLE,
    prompt="Analyze {paper_text} for...",
    dependencies=["pdf_processor"],
    timeout=600
)

# Add to pipeline
results = orchestrator.run_custom_pipeline([custom_task])
```

## 📁 Project Structure

```
paper_review_agents/
├── paper_review_system.py   # Core system with PDF tools
├── specialized_agents.py    # Specialized agent modules
├── orchestrator.py          # Multi-agent orchestration
├── api.py                   # High-level API
├── requirements.txt         # Dependencies
└── README.md               # This file
```

## 🤝 Contributing

Contributions welcome! Areas of interest:
- New specialized agents
- Better PDF parsing
- Support for more paper sources
- Visualization tools
- Web interface

## 📝 License

MIT License - See LICENSE file.

## 🙏 Acknowledgments

- [smolagents](https://github.com/huggingface/smolagents) by Hugging Face
- [LiteLLM](https://github.com/BerriAI/litellm) for LLM abstraction
- [Semantic Scholar API](https://api.semanticscholar.org/)
- Inspired by [paperreview.ai](https://paperreview.ai/)

---

Made with ❤️ for the research community

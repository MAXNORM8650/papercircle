# Offline Retrieval Benchmark

This directory contains the implementation and benchmarking tools for evaluating offline paper retrieval from the local database.

## Overview

The system has been enhanced with offline retrieval capabilities that allow searching papers from the organized local database (`/database` folder) instead of relying on online APIs.

## What's New

### 1. Offline Retrieval Engine (`agent.py`)

**New Class: `OfflinePaperSearchEngine`**

Located in `agent.py`, this class provides offline retrieval from the local database:

- **Database Structure**: Organized by conference folders (e.g., `nips`, `cvpr`, `aaai`) containing JSON files for each year (e.g., `nips2023.json`)
- **Search Algorithm**:
  - Term-based matching on title, abstract, and keywords
  - Weighted scoring: Title (3x) > Keywords (2x) > Abstract (1x)
  - Substring matching for exact phrase detection
- **Filtering**: Supports conference and year range filters

**Updated: `PaperSearchTool`**

The main search tool now detects the "offline: " prefix in queries and routes to offline retrieval:

```python
# Online search (default)
query = "world models using transformers"

# Offline search (with "offline: " prefix)
query = "offline: world models using transformers"
```

### 2. Benchmark Script (`benchmark_offline.py`)

A comprehensive benchmarking tool to evaluate offline retrieval performance.

**Features:**
- Loads queries from JSONL benchmark file
- Evaluates retrieval accuracy using standard IR metrics
- Saves detailed results and summary statistics

**Metrics:**
- **Recall@k**: Percentage of queries where the relevant paper appears in top-k results (k=1,5,10,20,50)
- **MRR (Mean Reciprocal Rank)**: Average of 1/rank for relevant papers
- **Success Rate**: Percentage of queries that return results
- **Found Rate**: Percentage of queries where the relevant paper was found

## Usage

### Running the Benchmark

#### Basic Usage (Test with 100 queries)
```bash
python benchmark_offline.py --queries benchmarks/offline_queries_100k.jsonl --limit 100
```

#### Full Benchmark (All queries)
```bash
python benchmark_offline.py --queries benchmarks/offline_queries_100k.jsonl --output benchmarks/full_results.json
```

#### Custom Configuration
```bash
python benchmark_offline.py \
  --queries benchmarks/offline_queries_100k.jsonl \
  --limit 1000 \
  --output benchmarks/results_1k.json \
  --database /path/to/database \
  --top-k "1,3,5,10,20,50,100"
```

### Command Line Arguments

- `--queries`: Path to benchmark queries file (JSONL format)
- `--limit`: Number of queries to process (default: all queries)
- `--output`: Output file for results (default: `benchmarks/results.json`)
- `--database`: Path to database folder (default: `/Users/komal.kumar/Documents/websites/pc-data/database`)
- `--top-k`: Comma-separated k values for Recall@k (default: "1,5,10,20,50")

### Using Offline Retrieval in Agent

```python
from agent import create_research_pipeline
from smolagents import LiteLLMModel

# Initialize model
model = LiteLLMModel(model_id="ollama_chat/qwen3-coder:30b", api_base="http://localhost:11431")

# Create pipeline
pipeline = create_research_pipeline(model, output_dir="research_output")

# Use offline retrieval (note the "offline: " prefix)
result = pipeline.run("""
    Search for offline papers about:
    - Query: "offline: world models for robotics"
    - Conferences: nips,icml,iclr
    - Year range: 2020-2024
""")
```

## Benchmark Query Format

Each line in the benchmark file is a JSON object with:

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

## Example Results

**Sample Test Results (5 queries):**

```
Total Queries:       5
Successful:          5 (100.00%)
Failed:              0

Retrieval Statistics:
Papers Found:        4 (80.00%)
Papers Not Found:    1
Avg Results/Query:   50.00

Recall@k:
  Recall@ 1:         0.00%
  Recall@ 5:         20.00%
  Recall@10:         20.00%
  Recall@20:         80.00%
  Recall@50:         80.00%

MRR (Mean Reciprocal Rank): 0.0796
```

## Output Files

After running the benchmark, you'll find:

1. **`results.json`**: Full detailed results including:
   - Aggregate metrics
   - Per-query results with rankings
   - Top-5 retrieved papers for each query
   - Found/not found status

2. **`results_summary.txt`**: Human-readable summary of metrics

## Improving Retrieval Performance

The current implementation uses a simple term-based ranking algorithm. To improve performance, consider:

1. **Better Text Processing**:
   - Lemmatization/stemming
   - Better stopword handling
   - N-gram matching

2. **Advanced Ranking**:
   - TF-IDF weighting
   - BM25 algorithm
   - Semantic embeddings (BERT, sentence transformers)

3. **Query Enhancement**:
   - Query expansion
   - Synonym matching
   - Field-specific boosting

4. **Machine Learning**:
   - Learning-to-rank models
   - Neural retrieval models

## Database Structure

```
database/
├── nips/
│   ├── nips2020.json
│   ├── nips2021.json
│   └── ...
├── cvpr/
│   ├── cvpr2020.json
│   └── ...
├── icml/
└── ...
```

Each JSON file contains an array of paper objects with fields like:
- `title`: Paper title
- `abstract`: Paper abstract
- `author`: Authors
- `keywords`: Keywords
- `id`: Paper ID
- `pdf`: PDF URL
- etc.

## Next Steps

1. **Run Full Benchmark**: Test with more queries to get comprehensive metrics
   ```bash
   python benchmark_offline.py --limit 10000 --output benchmarks/results_10k.json
   ```

2. **Analyze Results**: Review detailed results to identify failure patterns
   ```python
   import json
   with open('benchmarks/results_10k.json') as f:
       results = json.load(f)
   # Analyze queries where papers were not found
   not_found = [r for r in results['detailed_results'] if not r['found_rank']]
   ```

3. **Improve Ranking**: Implement more sophisticated retrieval algorithms (TF-IDF, BM25, semantic search)

4. **Optimize Performance**: Add caching, indexing, or database optimization for faster retrieval

## Files Modified/Created

1. **`agent.py`**: Added `OfflinePaperSearchEngine` class and updated `PaperSearchTool`
2. **`benchmark_offline.py`**: New benchmark script
3. **`BENCHMARK_README.md`**: This documentation

## Requirements

All requirements are already in your environment:
- Python 3.8+
- Standard libraries: `json`, `pathlib`, `re`, `hashlib`
- Dependencies: `tqdm` (for progress bars)

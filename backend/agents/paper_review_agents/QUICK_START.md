# Quick Start Guide - Paper Review Benchmarking

## 🚀 5-Minute Setup

### 1. Sample 50 Papers

```bash
python sample_and_plot.py sample \
  --data /Users/komal.kumar/Documents/websites/pc-data/benchmarks/reviewbench/iclr2024.json \
  --output sampled_50.json \
  --n 50 \
  --seed 42
```

### 2. Run Benchmark

```bash
python benchmark_paper_review.py \
  --data sampled_50.json \
  --conference iclr
```

### 3. Generate Plots

```bash
python sample_and_plot.py plot \
  --results benchmark_results/iclr/benchmark_summary.json \
  --conference iclr \
  --output-dir plots/
```

---

## 📊 Common Commands

### Testing (5-10 papers)

```bash
python benchmark_paper_review.py \
  --data /path/to/iclr2024.json \
  --conference iclr \
  --limit 10
```

### Standard Benchmark (50-100 papers)

```bash
# Sample first
python sample_and_plot.py sample \
  --data /path/to/iclr2024.json \
  --output sampled.json \
  --n 50

# Run benchmark
python benchmark_paper_review.py \
  --data sampled.json \
  --conference iclr
```

### All Conferences

```bash
python benchmark_paper_review.py \
  --data /Users/komal.kumar/Documents/websites/pc-data/benchmarks/reviewbench \
  --all-conferences \
  --limit 50
```

### With Custom Model

```bash
python benchmark_paper_review.py \
  --data sampled.json \
  --model ollama_chat/qwen3-coder:70b \
  --parallel 5
```

---

## 📁 Output Files

```
benchmark_results/iclr/
├── benchmark_summary.json      # Main results
├── {paper_id}_result.json      # Individual papers
└── error_analysis_report.txt   # Auto-generated

plots/
├── rating_correlation.png
├── soundness_correlation.png
├── presentation_correlation.png
└── contribution_correlation.png
```

---

## 🔍 Check Results

### View Summary

```bash
cat benchmark_results/iclr/benchmark_summary.json | jq '.statistics'
```

### Generate Error Report

```python
from error_analysis import ErrorAnalyzer
report = ErrorAnalyzer.generate_report(
    'benchmark_results/iclr/benchmark_summary.json'
)
print(report)
```

---

## 🎯 Expected Performance

| Metric | Target |
|--------|--------|
| Success Rate | >90% |
| Parsing Success | >95% |
| Correlation (rating) | >0.5 |
| MAE (1-4 scale) | <1.0 |
| Accuracy (±1.0) | >70% |

---

## 🐛 Troubleshooting

### High Failure Rate?

```bash
# Check model server
curl http://10.127.30.115:11434

# Try with fewer workers
python benchmark_paper_review.py --data sampled.json --parallel 1
```

### Poor Correlation?

```bash
# Generate error analysis
python -c "from error_analysis import ErrorAnalyzer; ..."

# Re-run without cache after adjusting prompts
python benchmark_paper_review.py --data sampled.json --no-cache
```

---

## 📈 Workflow

```
Sample → Benchmark → Analyze → Adjust Prompts → Re-run → Plot
   ↓         ↓          ↓            ↓             ↓       ↓
  50      Results   Errors      specialized    Better   Graphs
papers              Report      _agents.py    Metrics
```

---

## 🔗 File Locations

- **Data**: `/Users/komal.kumar/Documents/websites/pc-data/benchmarks/reviewbench/`
- **Scripts**: `backend/agents/paper_review_agents/`
- **Results**: `benchmark_results/`
- **Plots**: `plots/`

---

## 💡 Pro Tips

1. **Always sample with seed** for reproducibility
2. **Start with 10 papers** to test
3. **Use caching** - saves hours on re-runs
4. **Generate plots** to visualize patterns
5. **Iterate on prompts** based on error analysis

---

## 📚 Full Documentation

See [BENCHMARK.md](BENCHMARK.md) for complete documentation.

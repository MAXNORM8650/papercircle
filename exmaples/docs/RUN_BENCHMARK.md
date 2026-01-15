# Multi-Agent Pipeline Benchmark

## Quick Start

Test the pipeline with 10 queries (fast):

```bash
python benchmark_pipeline.py --limit 10
```

## Full Options

```bash
python benchmark_pipeline.py \
  --benchmark benchmarks/offline_queries_100k_semantic_v3.jsonl \
  --limit 50 \
  --output benchmarks/pipeline_results.json \
  --api-base http://localhost:11431 \
  --model ollama_chat/qwen3-coder:30b
```

## What It Measures

- **Recall@k**: How often the relevant paper appears in top-k results
- **MRR**: Mean Reciprocal Rank (average 1/rank of correct paper)
- **Success Rate**: Percentage of queries that complete successfully
- **Found Rate**: Percentage where relevant paper is found
- **Avg Time**: Average time per query

## Expected Performance

With accelerated search:
- **Time**: ~10-20s per query (LLM reasoning + fast search)
- **Recall@5**: 40-60% (target paper in top 5)
- **Recall@10**: 50-70% (target paper in top 10)

## Output

Results saved to `benchmarks/pipeline_benchmark_results.json`:

```json
{
  "metrics": {
    "total_queries": 10,
    "successful": 10,
    "found": 7,
    "recall@1": 0.3,
    "recall@5": 0.6,
    "recall@10": 0.7,
    "mrr": 0.45,
    "avg_time": 12.5
  },
  "results": [ ... ]
}
```

## Validation Checks

The benchmark validates:
- ✅ Conference name normalization works (CVPR → cvpr)
- ✅ Filters are applied correctly
- ✅ Accelerated search returns results
- ✅ No papers lost due to caching
- ✅ Agent can iteratively refine queries

---
title: PaperCircle Papers API
emoji: 📄
colorFrom: blue
colorTo: purple
sdk: docker
app_port: 7860
pinned: false
license: mit
short_description: Paper circle offline database
---

# PaperCircle Papers API

FastAPI service serving conference papers from a Parquet dataset via DuckDB.
Provides full-text search and filtered browsing for 230K+ academic papers.

## Environment Variables

- `HF_DATASET_REPO`: HuggingFace dataset repo ID (default: `ItsMaxNorm/pc-database`)
- `PARQUET_PATH`: Local path to papers.parquet (alternative to HF download)

## Endpoints

- `GET /health` — Health check
- `GET /api/community/papers` — Paginated papers with filters
- `GET /api/community/papers/{paper_id}` — Single paper
- `GET /api/community/filters` — Filter options
- `GET /api/search?query=...` — Full-text search

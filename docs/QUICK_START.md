# Paper Circle - Quick Start Guide

## API Services

### Paper Analysis API (Mind Graph)
**Port:** 8006
**URL:** http://127.0.0.1:8006

**Start:** `python3 backend/apis/paper_analysis_api.py`

**Features:**
- Concept extraction and mind mapping
- Methodology identification
- Experimental design analysis
- Question answering about papers

---

### Paper Review API
**Port:** 8005
**URL:** http://127.0.0.1:8005

**Start:** `python3 backend/apis/paper_review_server.py`

**Features:**
- Conference-style peer review (ICLR/NeurIPS/ICML format)
- Automatic lineage extraction (4 relationship types)
- Graph generation for visualization
- Reproducibility assessment
- Multi-level summaries

---

## One-Command Startup

```bash
# Start both APIs in background
cd /Users/komal.kumar/Documents/websites/papercircle

# Start Paper Analysis API
python3 backend/apis/paper_analysis_api.py > /tmp/paper_analysis.log 2>&1 &

# Start Paper Review API
python3 backend/apis/paper_review_server.py > /tmp/paper_review.log 2>&1 &

# Verify both are running
curl -s http://127.0.0.1:8006/ && echo "✓ Paper Analysis API running"
curl -s http://127.0.0.1:8005/ && echo "✓ Paper Review API running"
```

---

## Frontend

**Start:** `npm run dev`
**URL:** http://localhost:5173

**Dual Analysis View:**
1. Navigate to any Circle/Community
2. Click "Analysis Hub" tab
3. Select a paper
4. Use toggle to switch between:
   - Mind Graph Analysis (Port 8006)
   - Review Analysis (Port 8005)
   - Both (side-by-side)

---

## Environment Variables

Ensure `.env` file contains:
```bash
# Supabase
VITE_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_key
VITE_SUPABASE_ANON_KEY=your_anon_key

# Ollama
OLLAMA_API_BASE=http://10.127.30.115:11434
OLLAMA_MODEL=ollama_chat/qwen3-coder:30b

# LLM Config
NUM_CTX=8192
```

---

## Testing

### Test Paper Review API
```bash
curl -X POST http://127.0.0.1:8005/review/url \
  -H "Content-Type: application/json" \
  -d '{
    "paper_url": "https://arxiv.org/abs/1706.03762",
    "extract_graph": true,
    "save_lineage": true
  }'
```

### Test Paper Analysis API
```bash
curl -X POST http://127.0.0.1:8006/analysis/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "paper_id": "your_paper_uuid",
    "arxiv_id": "1706.03762"
  }'
```

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                  Frontend (React)                    │
│              http://localhost:5173                   │
└──────────────┬──────────────────┬───────────────────┘
               │                  │
               ▼                  ▼
┌──────────────────────┐  ┌──────────────────────┐
│ Paper Analysis API   │  │ Paper Review API     │
│ Port 8006            │  │ Port 8005            │
│                      │  │                      │
│ - Mind Graph         │  │ - Conference Review  │
│ - Concepts           │  │ - Lineage Extraction │
│ - Mind Map           │  │ - Graph Generation   │
└──────────────────────┘  └──────────────────────┘
        │                         │
        └────────┬────────────────┘
                 ▼
        ┌────────────────┐
        │   Supabase DB   │
        │                 │
        │ - papers        │
        │ - edges         │
        │ - analyses      │
        └────────────────┘
```

---

## Troubleshooting

### APIs not responding?
```bash
# Check if ports are in use
lsof -i :8005 -i :8006

# Check logs
tail -f /tmp/paper_analysis.log
tail -f /tmp/paper_review.log

# Kill and restart
pkill -f paper_analysis_api
pkill -f paper_review_server
# Then restart as shown above
```

### Port conflicts?
If VS Code or other apps use ports 8005/8006, change ports in:
- `backend/apis/paper_analysis_api.py` (uvicorn.run line)
- `backend/apis/paper_review_server.py` (uvicorn.run line)
- `src/components/Papers/*.tsx` (API_BASE constants)

### Database connection issues?
```bash
# Test Supabase connection
python3 << EOF
import os
from pathlib import Path
from supabase import create_client

env_file = Path(".env")
for line in env_file.read_text().split("\n"):
    if "=" in line and not line.startswith("#"):
        k, v = line.split("=", 1)
        os.environ[k] = v

client = create_client(
    os.getenv("VITE_SUPABASE_URL"),
    os.getenv("SUPABASE_SERVICE_ROLE_KEY")
)
result = client.table("papers").select("id").limit(1).execute()
print(f"✓ Connected! Found {len(result.data)} papers")
EOF
```

---

## Key Files

**Backend:**
- `backend/apis/paper_analysis_api.py` - Mind Graph API
- `backend/apis/paper_review_server.py` - Review API
- `backend/apis/paper_review_api.py` - Review logic
- `backend/agents/paper_review_agents/lineage_extractor.py` - Lineage extraction
- `backend/agents/paper_review_agents/graph_generator.py` - Graph generation
- `backend/agents/paper_review_agents/database_manager.py` - DB operations

**Frontend:**
- `src/components/Papers/AnalysisHubView.tsx` - Main hub
- `src/components/Papers/DualAnalysisView.tsx` - Dual view
- `src/components/Papers/PaperAnalysisView.tsx` - Mind Graph display
- `src/components/Papers/PaperReviewView.tsx` - Review display

**Docs:**
- `docs/PAPER_REVIEW_AGENTS_IMPLEMENTATION.md` - Full implementation details
- `docs/API_TESTING_STATUS.md` - Testing status and checklist
- `docs/QUICK_START.md` - This file

---

**Last Updated:** 2026-01-11

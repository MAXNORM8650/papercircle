# Paper Review API Testing Status

**Date:** 2026-01-11
**Status:** ✅ APIs Running and Accessible

---

## Current API Configuration

### Paper Analysis API (Mind Graph)
- **Port:** 8006 (changed from 8001 due to VS Code port conflict)
- **URL:** http://127.0.0.1:8006
- **Status:** ✅ Running (PID 26526)
- **Test:** `curl http://127.0.0.1:8006/` → Success

### Paper Review API
- **Port:** 8005 (changed from 8002 due to VS Code port conflict)
- **URL:** http://127.0.0.1:8005
- **Status:** ✅ Running (PID 22907)
- **Test:** `curl http://127.0.0.1:8005/` → Success

---

## Port Conflict Resolution

### Problem
Both APIs (ports 8001 and 8002) were binding successfully but all HTTP requests timed out. Investigation revealed VS Code Helper processes were occupying ports 8001-8004, creating a port conflict that prevented FastAPI from serving requests.

### Solution
Moved APIs to higher port numbers:
- Paper Analysis API: 8001 → **8006**
- Paper Review API: 8002 → **8005**

### Files Updated
**Backend:**
- `backend/apis/paper_analysis_api.py` - uvicorn.run port changed to 8006
- `backend/apis/paper_review_server.py` - uvicorn.run port changed to 8005

**Frontend:**
- `src/components/Papers/AnalysisHubView.tsx` - API_BASE updated to port 8006
- `src/components/Papers/PaperAnalysisView.tsx` - API_BASE updated to port 8006
- `src/components/Papers/PaperReviewView.tsx` - API_BASE updated to port 8005
- `src/components/Papers/DualAnalysisView.tsx` - Port labels updated (8006/8005)

---

## Testing Checklist

### ✅ Completed Tests

1. **Basic Connectivity**
   - [x] Paper Analysis API responds to root endpoint
   - [x] Paper Review API responds to root endpoint
   - [x] Both APIs running simultaneously without conflicts
   - [x] Supabase client initialization (0.12s - fast, not blocking)
   - [x] Ollama server connectivity confirmed

### 🔄 In Progress

2. **Paper Review API Endpoints**
   - [ ] POST /review/url - Test with sample arXiv paper
   - [ ] POST /review/paper - Test with paper_id from database
   - [ ] GET /review/{review_id} - Test cached review retrieval
   - [ ] GET /review/paper/{paper_id}/lineage - Test lineage endpoint
   - [ ] POST /review/save-lineage - Test edge saving

3. **Paper Analysis API Endpoints**
   - [ ] POST /analysis/analyze - Test paper analysis
   - [ ] GET /analysis/circle/{community_id}/overview - Test overview
   - [ ] POST /analysis/session/{session_id}/analyze-all - Test batch analysis

### ⏸️ Pending

4. **End-to-End Frontend Testing**
   - [ ] Start development server (npm run dev)
   - [ ] Navigate to Analysis Hub
   - [ ] Toggle dual view mode
   - [ ] Select a paper
   - [ ] Click "Review Paper" button
   - [ ] Verify all tabs display correctly
   - [ ] Test download functionality (JSON/Markdown)
   - [ ] Verify lineage edges saved to database

5. **Integration Testing**
   - [ ] Review paper → Extract lineage → View in Lineage View
   - [ ] Generate graph → View in Interactive Graph
   - [ ] Verify AI-generated edges appear with `is_ai_generated=true`
   - [ ] Test paper matching algorithms (exact, fuzzy, arXiv ID)

---

## Quick Start Commands

### Start Both APIs
```bash
# Terminal 1: Paper Analysis API (Mind Graph)
cd /Users/komal.kumar/Documents/websites/papercircle
python3 backend/apis/paper_analysis_api.py

# Terminal 2: Paper Review API
cd /Users/komal.kumar/Documents/websites/papercircle
python3 backend/apis/paper_review_server.py
```

### Test API Health
```bash
# Paper Analysis API
curl http://127.0.0.1:8006/

# Paper Review API
curl http://127.0.0.1:8005/
```

### Test Review Endpoint (Sample)
```bash
curl -X POST http://127.0.0.1:8005/review/url \
  -H "Content-Type: application/json" \
  -d '{
    "paper_url": "https://arxiv.org/abs/1706.03762",
    "extract_graph": false,
    "save_lineage": false
  }' \
  --max-time 120
```

### Start Frontend
```bash
cd /Users/komal.kumar/Documents/websites/papercircle
npm run dev
# Then navigate to http://localhost:5173
```

---

## Known Issues

### Resolved
- ✅ **Port conflicts with VS Code** - Moved to ports 8005/8006
- ✅ **Supabase client blocking** - Verified fast initialization (0.12s)
- ✅ **FastAPI timeout issues** - Resolved by port change

### Current
- None

---

## Next Steps

1. **Immediate:**
   - Test POST /review/url endpoint with a sample arXiv paper
   - Verify lineage extraction works correctly
   - Check graph generation output

2. **Short-term:**
   - Start frontend and test full UI workflow
   - Verify database integration (edges saved correctly)
   - Test dual view display with real data

3. **Documentation:**
   - Update main README with new port configuration
   - Document API endpoints in detail
   - Create user guide for dual analysis view

---

## Performance Benchmarks

### API Response Times
- **Paper Analysis API** root endpoint: < 10ms
- **Paper Review API** root endpoint: < 10ms
- **Supabase client creation**: 120ms
- **Supabase query (1 row)**: 2.42s

### Expected Processing Times (from docs)
- Full review: 30-60 seconds
- Lineage extraction: 5-10 seconds
- Graph generation: 2-3 seconds
- Database operations: < 1 second

---

## Contact & Support

If you encounter issues:
1. Check API logs in `/tmp/paper_analysis_8006.log` and `/tmp/review_server_8005.log`
2. Verify both servers are running with `lsof -i :8005 -i :8006`
3. Test basic connectivity with curl commands above
4. Check Ollama server status: `curl http://10.127.30.115:11434/`

**Last Updated:** 2026-01-11 05:45 AM

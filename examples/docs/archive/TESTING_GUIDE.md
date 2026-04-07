# Testing Guide - Fast Discovery System

## 🧪 Complete Testing Workflow

### Prerequisites Check

```bash
# 1. Check Python version (need 3.8+)
python3 --version

# 2. Check Node.js version (need 16+)
node --version

# 3. Check npm
npm --version
```

## 📦 Installation

### Step 1: Install Python Dependencies

```bash
# Option A: Install all at once
pip3 install -r requirements-fast-api.txt

# Option B: Install individually
pip3 install fastapi uvicorn pydantic arxiv requests scikit-learn numpy pandas
```

Verify installation:
```bash
python3 -c "import fastapi, uvicorn, arxiv; print('✅ All packages installed!')"
```

### Step 2: Install Node Dependencies (if needed)

```bash
npm install
```

## 🚀 Start Services

### Terminal 1: Start Backend

```bash
# Using startup script
./start_fast_api.sh

# OR run directly
python3 fast_discovery_api.py
```

**Expected Output:**
```
╔══════════════════════════════════════════════════════════════════╗
║          Fast Discovery API v2.0                                 ║
╠══════════════════════════════════════════════════════════════════╣
║  Endpoints:                                                      ║
║    POST /discover          - Fast paper search (2-5s)            ║
║    POST /enhance/quick     - Quick research workflow             ║
║    POST /enhance/full      - Full pipeline workflow              ║
║    POST /enhance/custom    - Custom agent workflow               ║
║    POST /cancel/{id}       - Cancel request                      ║
║    GET  /health            - Health check                        ║
╚══════════════════════════════════════════════════════════════════╝

INFO:     Started server process [12345]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
```

### Terminal 2: Start Frontend

```bash
npm run dev
```

**Expected Output:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

## ✅ Test Checklist

### 1. Backend Health Check

```bash
curl http://localhost:8000/health
```

**Expected:**
```json
{
  "status": "healthy",
  "version": "2.0",
  "features": {
    "fast_search": true,
    "agent_workflows": true,
    "export": true
  }
}
```

✅ **Pass:** Backend is running correctly

### 2. API Documentation

Open: http://localhost:8000/docs

✅ **Pass:** You see FastAPI Swagger UI with all endpoints

### 3. Fast Search Test (CLI)

```bash
curl -X POST http://localhost:8000/discover \
  -H "Content-Type: application/json" \
  -d '{
    "query": "transformers",
    "mode": "balanced",
    "sources": "arxiv",
    "max_results_per_source": 5,
    "min_year": 2023
  }'
```

**Expected:**
- Response within 5 seconds
- JSON with papers array
- Each paper has: title, authors, abstract, scores

✅ **Pass:** Returns papers quickly

### 4. Frontend Integration Test

#### 4a. Access UI
1. Open http://localhost:5173
2. Navigate to "Discover" or "AI Discovery"

✅ **Pass:** Discovery page loads

#### 4b. Fast Search
1. Enter query: "neural networks"
2. Click "Search" button
3. **Watch the timer**

**Expected:**
- Processing steps appear
- Results in 2-5 seconds
- Papers display with scores

✅ **Pass:** Fast results appear

#### 4c. Export Test - Bulk
1. After search completes
2. Click "BibTeX" button in results header

**Expected:**
- Download starts immediately
- File: `papers.bib`
- Contains BibTeX entries

✅ **Pass:** BibTeX downloaded

Repeat with "CSV" button:

**Expected:**
- Download: `papers.csv`
- Contains: Title, Authors, Year, Scores, etc.

✅ **Pass:** CSV downloaded

#### 4d. Export Test - Per Paper
1. Find any paper card
2. Click `.bib` button

**Expected:**
- Single paper BibTeX downloads
- Filename from paper title

✅ **Pass:** Single paper BibTeX works

Repeat with `.csv`:

✅ **Pass:** Single paper CSV works

#### 4e. Agent Enhancement Test
1. After fast search
2. Click "Enhance with AI Agents"
3. Choose "Quick Research"

**Expected:**
- Processing starts
- Papers re-sorted
- Analysis results shown

✅ **Pass:** Quick Research works

Repeat with "Full Pipeline":

**Expected:**
- Deep analysis runs
- Trends, authors, topics shown
- Takes 30-60 seconds

✅ **Pass:** Full Pipeline works

#### 4f. Settings Test
1. Click "Show Settings"
2. Try different Discovery Modes:
   - Stable
   - Discovery
   - Balanced
   - Custom

✅ **Pass:** Modes work correctly

3. Try Quick Presets:
   - Literature Review
   - Cutting Edge
   - Balanced Search

✅ **Pass:** Presets apply correctly

4. Adjust filters:
   - Change data sources
   - Adjust max results
   - Toggle diversity

✅ **Pass:** Filters work

#### 4g. Add to Community Test
1. If logged in with communities
2. Search for papers
3. Click "Add to Community" on a paper
4. Select community
5. Submit

✅ **Pass:** Paper added to community

## 🐛 Common Issues & Fixes

### Issue 1: Backend won't start

**Error:**
```
ModuleNotFoundError: No module named 'fastapi'
```

**Fix:**
```bash
pip3 install -r requirements-fast-api.txt
```

### Issue 2: Frontend can't connect to backend

**Error in browser console:**
```
Failed to fetch
```

**Fix:**
1. Check backend is running: `curl http://localhost:8000/health`
2. Check `.env` file has: `VITE_PAPERFINDER_API_URL=http://localhost:8000`
3. Restart frontend: `npm run dev`

### Issue 3: CORS errors

**Error:**
```
Access to fetch blocked by CORS policy
```

**Fix:**
Check `fast_discovery_api.py` has correct origins:
```python
allow_origins=["http://localhost:5173", "http://localhost:3000"],
```

### Issue 4: Slow results (>10 seconds)

**Possible causes:**
- Too many sources
- High `max_results_per_source`
- Slow internet

**Fix:**
- Reduce to 1-2 sources (just arXiv)
- Lower max_results_per_source to 10-15
- Check internet connection

### Issue 5: No papers found

**Fix:**
- Broaden query (fewer specific terms)
- Increase year range (lower min_year)
- Try different sources
- Increase max_results_per_source

### Issue 6: Export doesn't work

**Browser blocks download**

**Fix:**
- Check browser download settings
- Allow downloads from localhost
- Try different browser

### Issue 7: Agent workflows fail

**Error:**
```
ImportError: research_agnet.py not found
```

**Fix:**
- Ensure `agents/research_agnet.py` exists
- Check file path in `fast_discovery_api.py`
- Agent workflows are optional - fast search still works

## 📊 Performance Benchmarks

Test these on your system:

### Fast Search Performance

| Sources | Max/Source | Expected Time | Papers |
|---------|-----------|---------------|--------|
| arxiv | 10 | 2-3s | ~10 |
| arxiv | 25 | 3-4s | ~25 |
| arxiv,sem_scholar | 25 | 4-6s | ~40-50 |
| all 4 sources | 25 | 6-10s | ~80-100 |

### Agent Enhancement Performance

| Workflow | Expected Time | Output |
|----------|---------------|--------|
| Quick Research | 10-15s | Sorted + basic analysis |
| Full Pipeline | 30-60s | Deep analysis + viz |
| Custom (1 task) | 5-10s | Task-specific |

## ✅ Final Verification

Run all tests above, check off each one.

**All ✅?** Your Fast Discovery system is working perfectly! 🎉

**Some ❌?** Check troubleshooting section above.

## 📝 Test Results Template

Copy and fill out:

```
Fast Discovery Test Results
===========================

Date: ___________
Tester: ___________

Backend:
[ ] Health check passes
[ ] API docs accessible
[ ] Fast search works (<5s)

Frontend:
[ ] UI loads correctly
[ ] Fast search integration works
[ ] Bulk export (BibTeX) works
[ ] Bulk export (CSV) works
[ ] Per-paper export works
[ ] Agent enhancement works
[ ] Settings work
[ ] Presets work

Performance:
Fast search time: ___ seconds
Quick research time: ___ seconds
Full pipeline time: ___ seconds

Issues Found:
_________________________________
_________________________________

Notes:
_________________________________
_________________________________
```

## 🎯 Next Steps

After testing passes:
1. ✅ System is production-ready
2. 📚 Use for real research
3. 🚀 Deploy to production (optional)
4. 🎉 Enjoy fast paper discovery!

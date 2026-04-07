# Quick Start Guide - Fast Discovery System

## 🚀 Getting Started (2 Minutes)

### Step 1: Install Dependencies

```bash
# Install Python packages
pip3 install fastapi uvicorn pydantic arxiv requests scikit-learn numpy pandas

# Install Node packages (if not already done)
npm install
```

### Step 2: Start the Backend

```bash
# Option 1: Use startup script
./start_fast_api.sh

# Option 2: Run directly
python3 fast_discovery_api.py
```

You should see:
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

INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
```

### Step 3: Start the Frontend

```bash
# In a new terminal
npm run dev
```

### Step 4: Test It!

1. Open http://localhost:5173
2. Navigate to Discovery (AI Discovery)
3. Enter a query like "transformer attention mechanisms"
4. Click Search
5. **Results appear in ~3 seconds!** 🎉

## ✅ Verification

### Test Backend Health
```bash
curl http://localhost:8000/health
```

Expected response:
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

### Test Fast Search
```bash
curl -X POST http://localhost:8000/discover \
  -H "Content-Type: application/json" \
  -d '{
    "query": "neural networks",
    "mode": "balanced",
    "sources": "arxiv",
    "max_results_per_source": 10
  }'
```

## 📊 What Changed

### Before (findpapers)
- ⏱️  40-80 seconds wait time
- 🐌 Complex setup
- ❌ Often failed

### After (Fast Discovery)
- ⚡ 2-5 seconds results
- 🎯 Simple, direct API calls
- ✅ Reliable

## 🎯 Usage Examples

### Example 1: Quick Paper Lookup
```
1. Enter "vision transformers"
2. Wait 3 seconds
3. Click "BibTeX"
4. Done! Download complete
```

### Example 2: Deep Research
```
1. Enter "reinforcement learning"
2. Get fast results (3s)
3. Click "Enhance with AI Agents" → "Full Pipeline"
4. Wait 45s for analysis
5. View trends, top authors, visualization
6. Export everything
```

### Example 3: Per-Paper Export
```
1. Search "diffusion models"
2. Browse results
3. Click [.bib] on interesting paper
4. Single paper BibTeX downloaded
```

## 🔧 Configuration

### Change API Port

Edit `fast_discovery_api.py`:
```python
# At the bottom
uvicorn.run(app, host="0.0.0.0", port=9000, log_level="info")
```

Then update frontend `.env`:
```
VITE_PAPERFINDER_API_URL=http://localhost:9000
```

### Adjust Search Parameters

In the UI:
- Click "Show Settings"
- Adjust sources, max results, diversity, etc.
- Or use Quick Presets

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check Python version
python3 --version  # Should be 3.8+

# Install missing packages
pip3 install -r requirements.txt
```

### Frontend can't connect
1. Check backend is running: `curl http://localhost:8000/health`
2. Check CORS settings in `fast_discovery_api.py`
3. Verify `.env` has correct API URL

### Slow results
- Reduce `max_results_per_source` (try 10-15)
- Use fewer sources (just arXiv or Semantic Scholar)
- Check internet connection

### No results
- Try broader query
- Increase `max_results_per_source`
- Add more sources
- Check year range (increase min_year)

## 📚 API Endpoints

### POST /discover
Fast paper search (2-5s)

**Request:**
```json
{
  "query": "neural networks",
  "mode": "balanced",
  "sources": "arxiv,semantic_scholar",
  "max_results_per_source": 25,
  "min_year": 2020
}
```

**Response:**
```json
{
  "query": "neural networks",
  "mode_used": "balanced",
  "total_papers": 47,
  "all_papers_sorted": [
    {
      "title": "Paper Title",
      "authors": ["Author 1", "Author 2"],
      "year": 2024,
      "final_score": 0.85,
      ...
    }
  ]
}
```

### POST /enhance/quick
Quick research workflow

### POST /enhance/full
Full analysis pipeline

### POST /enhance/custom
Custom agent tasks

## 🎉 Success!

You now have a **blazing-fast paper discovery system**:
- ⚡ 10x faster than findpapers
- 📥 Instant export (BibTeX, CSV)
- 🤖 Optional AI enhancement
- 🎨 Beautiful, user-friendly UI

**Enjoy discovering papers!** 🚀📚

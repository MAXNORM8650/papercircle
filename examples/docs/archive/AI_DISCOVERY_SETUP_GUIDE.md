# AI Discovery System - Complete Setup & Testing Guide

## ✅ What's Fixed

Both **Fast Discovery** and **Multi-Agent Pipeline** now work correctly:

### Fast Discovery (Direct Tools)
Follows `example_direct_tools()` pattern from `agents/query.py`:
1. ✅ **Search** - PaperSearchTool (arXiv, Semantic Scholar, OpenAlex, DBLP)
2. ✅ **Sort** - PaperSortTool (combined scoring)
3. ✅ **Analyze** - PaperAnalysisTool (ALL analysis types)
4. ✅ **Export** - PaperExportTool (JSON + BibTeX)
5. ✅ **Visualize** - VisualizationTool (dashboard.html)

### Multi-Agent Pipeline (Orchestrator)
Uses real `create_research_pipeline()` with CodeAgent orchestrator:
1. ✅ **Orchestrator** coordinates 6 specialized agents
2. ✅ **Natural language** task execution
3. ✅ **Agent collaboration** (agents talk to each other)
4. ✅ **Streaming updates** via SSE
5. ✅ **Complete results** with analysis, exports, and visualization

---

## 🚀 Quick Start

### Prerequisites
```bash
# Python packages
pip install -r requirements.txt

# Additional for Multi-Agent (optional)
pip install smolagents litellm

# For Multi-Agent: Ollama with a model (optional)
# Download from https://ollama.ai
ollama pull qwen2.5:7b
```

### Start the API

```bash
cd /Users/komal.kumar/Documents/websites/papercircle

# Start API
python fast_discovery_api.py
```

**Expected Output:**
```
╔══════════════════════════════════════════════════════════════════╗
║          Fast Discovery API v2.0                                 ║
╠══════════════════════════════════════════════════════════════════╣
║  Endpoints:                                                      ║
║    POST /discover             - Fast paper search (2-5s)         ║
║    POST /multi-agent/stream   - Multi-agent pipeline (SSE)       ║
║    POST /enhance/quick        - Quick research workflow          ║
║    POST /enhance/full         - Full pipeline workflow           ║
║    POST /enhance/custom       - Custom agent workflow            ║
╚══════════════════════════════════════════════════════════════════╝

INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### Start the Frontend

```bash
# In another terminal
npm run dev
```

---

## 🧪 Test Fast Discovery

### Via Web UI

1. Go to http://localhost:5173
2. Click **Discover** tab
3. Select **Fast Discovery** mode
4. Choose mode: **Balanced** / **Stable** / **Discovery**
5. Enter query: `"vision language models"`
6. Click **Search**

### Expected Results (takes a few seconds)

#### Console Output (Backend):
```
============================================================
🚀 FAST DISCOVERY - Direct Tools Workflow
Query: vision language models
============================================================

Step 1: Searching...
✓ Search complete: Found 87 papers for 'vision language models':...

Step 2: Sorting...
✓ Sort complete: Sorted 87 papers by 'combined':...

Step 3: Analyzing...
✓ Analysis complete: 3521 chars

Step 4: Exporting...
✓ Exported JSON: results_20251211_143022.json
✓ Exported BibTeX: refs_20251211_143022.bib

Step 5: Creating visualization...
✓ Visualization created: dashboard_20251211_143022.html

============================================================
✅ COMPLETE - Found 87 papers
   Analysis: ✓
   Exports: results_20251211_143022.json, refs_20251211_143022.bib
   Visualization: dashboard_20251211_143022.html
============================================================
```

#### Web UI Display:

**✅ Results Header:**
- "Found 87 papers"
- "Mode: balanced • Analysis Complete • Dashboard Created"
- Export buttons (BibTeX, CSV, View Dashboard)

**✅ Research Statistics Card:**
- Total Papers: 87
- Top Authors: 15
- Keywords: 20
- Publications by Year (chart)
- Top Authors with counts
- Key Topics with frequencies
- Top Venues with counts

**✅ Papers List:**
- Numbered cards (#1, #2, ...)
- All metadata (title, authors, year, venue, abstract)
- Scores (Final, Relevance, Novelty)
- Action buttons (View Paper, PDF, Export)

**✅ Files Created:**
- `results_TIMESTAMP.json` - All papers in JSON
- `refs_TIMESTAMP.bib` - BibTeX citations
- `dashboard_TIMESTAMP.html` - Interactive dashboard

**✅ View Dashboard:**
- Click "View Dashboard" button
- Opens HTML with:
  - Publications timeline (Chart.js)
  - Papers by source (pie chart)
  - Keyword cloud
  - Top papers listing

---

## 🤖 Test Multi-Agent Pipeline

### Prerequisites for Multi-Agent

```bash
# Set environment variables (optional, defaults provided)
export LLM_API_BASE="http://localhost:11434"
export LLM_MODEL_ID="ollama_chat/qwen2.5:7b"
export LLM_NUM_CTX="8192"

# Start Ollama (if using)
ollama serve
```

### Via Web UI

1. Go to http://localhost:5173
2. Click **Discover** tab
3. Select **Multi-Agent Pipeline** mode
4. Choose settings
5. Enter query: `"diffusion models for video generation"`
6. Click **Search**

### Expected Results

#### Phase 1: Agent Discussion View

**Real-time streaming messages:**
```
[system] Creating LLM model: ollama_chat/qwen2.5:7b
[system] Creating multi-agent orchestrator with 6 specialized agents...
[orchestrator] Orchestrator ready - coordinating agents for research task
[orchestrator] Executing multi-agent research workflow...
[orchestrator] Agents are now collaborating to complete the research task...
[paper_search_agent] Searching for papers...
[sorting_agent] Sorting and scoring papers...
[analysis_agent] Analyzing trends and statistics...
[export_agent] Exporting results...
[visualization_agent] Creating dashboard...
[orchestrator] All agents completed their tasks successfully!
[system] Extracting structured results for display...
```

#### Phase 2: Results & Statistics View

**Switch to "Results & Statistics" tab to see:**

**✅ Research Statistics:**
- Total Papers
- Top Authors with paper counts
- Research Trends with frequencies
- Top Venues with paper counts
- Year Distribution chart

**✅ Full Analysis Text:**
- Complete analysis from PaperAnalysisTool
- Summary statistics
- Trends analysis
- Author analysis
- Venue analysis
- Topic analysis

**✅ All Papers:**
- Complete list with scores
- Export buttons
- Links to papers and PDFs

**✅ Orchestrator Summary:**
- Natural language summary from orchestrator
- Key findings
- Notable papers

**✅ Files Created:**
- `research_results.json`
- `research_refs.bib`
- `dashboard.html`

---

## 🔍 API Testing (Command Line)

### Test Fast Discovery

```bash
curl -X POST http://localhost:8000/discover \
  -H "Content-Type: application/json" \
  -d '{
    "query": "transformers attention mechanism",
    "mode": "balanced",
    "sources": "arxiv,semantic_scholar",
    "max_results_per_source": 20,
    "min_year": 2020
  }'
```

**Expected Response:**
```json
{
  "query": "transformers attention mechanism",
  "mode_used": "balanced",
  "total_papers": 73,
  "all_papers_sorted": [
    {
      "id": "...",
      "title": "Attention Is All You Need",
      "authors": ["Vaswani et al."],
      "year": 2017,
      "final_score": 0.895,
      "relevance_score": 0.92,
      "novelty_score": 0.87,
      ...
    },
    ...
  ],
  "analysis": {
    "full_text": "## 📊 Summary Statistics\n- Total papers: 73\n...",
    "statistics": {
      "year_distribution": {"2023": 25, "2022": 30, "2021": 18},
      "top_authors": [
        {"name": "Smith, J.", "count": 5},
        ...
      ],
      "research_trends": [
        {"keyword": "transformer", "count": 45},
        {"keyword": "attention", "count": 67},
        ...
      ],
      "top_venues": [
        {"name": "NeurIPS", "count": 12},
        ...
      ]
    }
  },
  "exports": {
    "json": {
      "filename": "results_20251211_143530.json",
      "message": "✓ Exported 73 papers..."
    },
    "bibtex": {
      "filename": "refs_20251211_143530.bib",
      "message": "✓ Exported 73 papers..."
    }
  },
  "visualization": {
    "filename": "dashboard_20251211_143530.html",
    "message": "✓ Generated visualization: dashboard_20251211_143530.html",
    "path": "dashboard_20251211_143530.html"
  }
}
```

### Test Multi-Agent (with streaming)

```bash
curl -X POST http://localhost:8000/multi-agent/stream \
  -H "Content-Type: application/json" \
  -d '{
    "query": "neural architecture search",
    "max_results": 30,
    "min_year": 2021,
    "sort_by": "relevance",
    "export_formats": ["json", "bib"],
    "generate_visualization": true,
    "web_search": false
  }'
```

**Expected Stream:**
```
data: {"type":"status","content":"Initializing multi-agent orchestrator..."}

data: {"type":"agent","content":{"agent":"system","action":"Creating LLM model: ollama_chat/qwen2.5:7b","timestamp":"2025-12-11T14:35:30.123Z"}}

data: {"type":"agent","content":{"agent":"orchestrator","action":"Orchestrator ready - coordinating agents for research task","timestamp":"2025-12-11T14:35:31.456Z"}}

...

data: {"type":"results","content":{"total_papers":42,"all_papers":[...],"statistics":{...}}}

data: {"type":"status","content":"Research pipeline complete!"}

data: {"type":"done","content":true}
```

---

## 📁 File Structure

### Generated Files (in project root)

```
/Users/komal.kumar/Documents/websites/papercircle/
├── results_TIMESTAMP.json          # Fast Discovery results
├── refs_TIMESTAMP.bib               # Fast Discovery BibTeX
├── dashboard_TIMESTAMP.html         # Fast Discovery visualization
├── research_results.json            # Multi-Agent results
├── research_refs.bib                # Multi-Agent BibTeX
└── dashboard.html                   # Multi-Agent visualization
```

### Dashboard HTML Features

Open any `dashboard_*.html` file in browser to see:

**📊 Interactive Charts (Chart.js):**
- Publications over time (bar chart)
- Papers by source (doughnut chart)

**📈 Statistics:**
- Total papers
- Sources count
- Year range
- Average citations

**🏷️ Keyword Cloud:**
- Top 20 keywords sized by frequency

**📄 Top Papers List:**
- Scrollable list with metadata
- Authors, year, citations

---

## 🔧 Troubleshooting

### Issue: "No papers found"
**Cause:** Query too specific or no matching papers in databases
**Solution:**
- Try broader query terms
- Reduce min_year constraint
- Check if databases are accessible

### Issue: "Multi-agent pipeline not available"
**Cause:** LLM not configured or smolagents not installed
**Solution:**
```bash
pip install smolagents litellm

# Set environment variables
export LLM_API_BASE="http://localhost:11434"
export LLM_MODEL_ID="ollama_chat/qwen2.5:7b"

# Or use remote API
export LLM_API_BASE="https://api.openai.com/v1"
export LLM_MODEL_ID="gpt-4"
export OPENAI_API_KEY="your-key"
```

### Issue: "research_agnet.py import failed"
**Cause:** agents directory not in path
**Solution:** Already handled in code, but verify:
```bash
ls agents/research_agnet.py  # Should exist
```

### Issue: "Dashboard not opening"
**Cause:** File path incorrect
**Solution:** Dashboard files are created in current working directory
- Check console logs for exact filename
- Files are in project root: `/Users/komal.kumar/Documents/websites/papercircle/dashboard_*.html`

### Issue: "Slow performance"
**Cause:** Large max_results or many sources
**Solution:**
- Reduce `max_results_per_source` (default: 20-25)
- Use fewer sources (remove OpenAlex or DBLP if not needed)
- Fast Discovery should still complete in 5-10 seconds max

---

## 🎯 Architecture Summary

### Fast Discovery Architecture

```
User Request
    ↓
POST /discover
    ↓
Direct Tools Workflow:
1. PaperSearchTool.forward()
    ├─ arXiv API
    ├─ Semantic Scholar API
    ├─ OpenAlex API
    └─ DBLP API
    ↓
2. PaperSortTool.forward()
    └─ Calculate scores, sort papers
    ↓
3. PaperAnalysisTool.forward("all")
    └─ Generate statistics, trends, authors, venues, topics
    ↓
4. PaperExportTool.forward()
    ├─ Export JSON
    └─ Export BibTeX
    ↓
5. VisualizationTool.forward()
    └─ Create dashboard.html
    ↓
Return: {papers, analysis, exports, visualization}
```

### Multi-Agent Architecture

```
User Request
    ↓
POST /multi-agent/stream (SSE)
    ↓
Create LLM Model (LiteLLMModel)
    ↓
Create Orchestrator (create_research_pipeline)
    ├─ paper_search_agent (ToolCallingAgent)
    ├─ sorting_agent (CodeAgent)
    ├─ analysis_agent (ToolCallingAgent)
    ├─ export_agent (CodeAgent)
    ├─ visualization_agent (CodeAgent)
    └─ web_agent (ToolCallingAgent)
    ↓
Orchestrator.run(natural_language_task)
    ↓
[Agents collaborate to complete task]
    ↓
Extract Results from paper_store
    ↓
Stream: SSE messages → Frontend
Return: {papers, analysis, exports, visualization, orchestrator_summary}
```

---

## ✅ Verification Checklist

### Fast Discovery
- [ ] API starts without errors
- [ ] Search returns results in 2-10 seconds
- [ ] Papers displayed with scores
- [ ] Statistics card shows year distribution, authors, trends, venues
- [ ] "View Dashboard" button appears
- [ ] Dashboard HTML opens and displays charts
- [ ] Export BibTeX works
- [ ] Export CSV works
- [ ] JSON and BibTeX files created in project root

### Multi-Agent Pipeline
- [ ] LLM model loads successfully
- [ ] Orchestrator creates 6 agents
- [ ] Agent Discussion shows real-time messages
- [ ] Messages from different agents appear
- [ ] "Results & Statistics" tab becomes available
- [ ] Statistics display with all data
- [ ] Full analysis text is readable
- [ ] All papers list displays
- [ ] Export files created: research_results.json, research_refs.bib
- [ ] dashboard.html created and displays

---

## 🚦 Status Indicators

### API Startup

✅ **Successful:**
```
HAS_RESEARCH_TOOLS = True
HAS_LLM = True (for multi-agent)
╔══════════════════════════════════════════════════════════════════╗
║          Fast Discovery API v2.0                                 ║
...
```

❌ **Issues:**
```
Warning: research_agnet.py import failed: ...
Warning: smolagents not available - multi-agent orchestrator disabled
```

### Fast Discovery Response

✅ **Successful:**
- `total_papers > 0`
- `all_papers_sorted` is array with papers
- `analysis.statistics` exists with data
- `visualization.filename` exists
- `exports.json.filename` exists

### Multi-Agent Response

✅ **Successful:**
- Receives agent messages with different agent names
- `type: "results"` message arrives
- `total_papers > 0`
- `orchestrator_summary` contains text
- `type: "done"` message arrives

---

## 📚 Documentation References

- **Main API:** `fast_discovery_api.py`
- **Research Pipeline:** `agents/research_agnet.py`
- **Usage Examples:** `agents/query.py`
- **Frontend:** `src/components/Papers/AIDiscoveryView.tsx`
- **Fix Summary:** `AI_DISCOVERY_FIXED.md`

---

## 🎉 Success Metrics

✅ **Fast Discovery works when:**
1. Returns results in < 10 seconds
2. Shows analysis statistics
3. Creates visualization dashboard
4. Exports JSON and BibTeX files
5. All 5 tools executed: Search, Sort, Analyze, Export, Visualize

✅ **Multi-Agent works when:**
1. Orchestrator coordinates all agents
2. Agent messages stream in real-time
3. Different agents appear in discussion
4. Complete results with analysis
5. Natural language task execution works

---

**System Status:** ✅ **READY FOR TESTING**

Both Fast Discovery and Multi-Agent Pipeline are fully functional and ready to use!

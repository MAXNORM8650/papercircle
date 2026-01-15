# AI Discovery V4 - Fast & Powerful Workflow

## 🚀 Overview

Complete redesign of AI Discovery based on **direct tools pattern** from `agents/query.py` for maximum speed and user control. No more slow findpapers - get results in seconds, then optionally enhance with AI agents.

## ⚡ Two-Phase Approach

### Phase 1: Fast Search (2-5 seconds)
- **Direct API calls** to arXiv, Semantic Scholar, OpenAlex, DBLP
- **Immediate results** - papers appear as they're found
- **Basic scoring** - relevance, authority, novelty
- **Export ready** - Download BibTeX/CSV immediately

### Phase 2: AI Agent Enhancement (Optional)
- **User-triggered** - Choose when to use agents
- **Three workflow options**:
  1. **Quick Research** - Fast analysis & advanced sorting
  2. **Full Pipeline** - Deep analysis, trends, visualization
  3. **Custom Workflow** - Pick specific agent tasks

## 🎯 Key Features

### 1. **Lightning Fast Initial Results**
```
User enters query
     ↓
Fast search (2-5s) - Direct API calls
     ↓
Papers displayed immediately
     ↓
Ready to export/use
```

**No More:**
- ❌ Waiting for findpapers (30-60s+)
- ❌ Complex multi-agent startup
- ❌ Mandatory processing pipelines

**Now:**
- ✅ Results in ~3 seconds
- ✅ Simple, direct API calls
- ✅ Progressive enhancement

### 2. **Export Functionality**

#### Bulk Export (All Papers)
- Click "BibTeX" or "CSV" button in results header
- Exports all filtered papers
- Instant download

#### Per-Paper Export
- Each paper card has export buttons
- `.bib` - Export as BibTeX entry
- `.csv` - Export as CSV row
- Filename auto-generated from paper title

**BibTeX Format:**
```bibtex
@article{FirstAuthor2024_1,
  title = {Paper Title},
  author = {Author1 and Author2 and Author3},
  year = {2024},
  journal = {Venue Name},
  url = {https://arxiv.org/...},
  abstract = {Paper abstract...}
}
```

**CSV Format:**
```csv
Title,Authors,Year,Venue,URL,Relevance,Authority,Novelty,Final Score,Abstract
"Title",,"Author1; Author2",2024,"Venue","https://...",0.850,0.720,0.650,0.740,"Abstract..."
```

### 3. **Agent Workflow Options**

After fast search completes, users can enhance results:

#### 🔹 Quick Research
- **Time:** ~10-15 seconds
- **What it does:**
  - Advanced sorting (by citations, novelty, combined scores)
  - Basic analysis (top authors, venues, trends)
  - Enhanced metadata
- **Based on:** `example_quick_research()` from `agents/query.py`

#### 🔹 Full Pipeline
- **Time:** ~30-60 seconds
- **What it does:**
  - Deep trend analysis
  - Author/venue statistics
  - Topic extraction
  - Visualization dashboard
  - Comprehensive report
- **Based on:** `example_full_pipeline()` from `agents/query.py`

#### 🔹 Custom Workflow
- **Time:** Variable
- **What it does:**
  - User selects specific tasks:
    - ✓ Advanced sorting
    - ✓ Trend analysis
    - ✓ Author analysis
    - ✓ Export enhanced data
    - ✓ Generate visualizations
- **Based on:** `example_manual_control()` from `agents/query.py`

### 4. **Compact, User-Friendly UI**

**Before (Old):**
- Complex settings shown upfront
- Overwhelming for beginners
- Lots of scrolling

**After (New):**
- Clean, minimal interface
- Settings collapsed by default
- Quick presets visible
- Progressive disclosure

**Layout:**
```
┌─────────────────────────────────────┐
│ Search Bar                    [Search]│
├─────────────────────────────────────┤
│ 🚀 Fast Results (5 papers)          │
│ [BibTeX] [CSV] [Enhance with AI ▼] │
│                      [Show Settings] │
├─────────────────────────────────────┤
│ Paper 1  [View] [.bib] [.csv] [+]  │
│ Paper 2  [View] [.bib] [.csv] [+]  │
│ Paper 3  [View] [.bib] [.csv] [+]  │
└─────────────────────────────────────┘
```

## 📊 Workflow Comparison

### Old Workflow (findpapers)
```
User Query
   ↓ 30-60s (findpapers searching...)
Papers Retrieved
   ↓ 10-20s (multi-agent processing...)
Results Ready
```
**Total: 40-80 seconds**

### New Workflow (Fast + Optional Enhancement)
```
User Query
   ↓ 2-5s (direct API search)
✅ Papers Ready - Can export/use immediately
   ↓ 0s (user decides if needed)
   ↓ Optional: 10-60s (AI agent enhancement)
✅ Enhanced Results
```
**Total: 2-5 seconds (fast) or 12-65 seconds (with enhancement)**

## 🎨 UI Components

### 1. Results Header
- Paper count & mode
- **Export buttons** (BibTeX, CSV)
- **Enhance with AI Agents** dropdown (appears after search)
- Settings toggle

### 2. Agent Workflow Dropdown
Appears only after fast search completes:
```
┌────────────────────────────────┐
│ Enhance with AI Agents      ▼ │
├────────────────────────────────┤
│ ⚡ Quick Research             │
│   Fast analysis & sorting      │
│                                │
│ 🧠 Full Pipeline               │
│   Deep analysis, visualization │
│                                │
│ ⚙️  Custom Workflow            │
│   Choose specific tasks        │
└────────────────────────────────┘
```

### 3. Paper Card Actions
Each paper has:
- **View Paper** - Opens PDF/URL
- **Export group** - `.bib` and `.csv` buttons
- **Add to Community** - (if user has communities)

### 4. Settings Panel (Collapsible)
- **Quick Presets** - One-click configurations
- **Discovery Modes** - Stable, Discovery, Balanced, Custom
- **Data Sources** - Select databases
- **Sorting Strategy** - How to rank results
- **Advanced Parameters** - Filters, diversity, etc.

## 💡 Usage Examples

### Example 1: Quick Paper Lookup
```
1. Enter "transformer attention mechanisms"
2. Wait 3 seconds
3. Click "BibTeX"
4. Done! - Have 25 papers in BibTeX format
```

### Example 2: Literature Review
```
1. Click "📚 Literature Review" preset
2. Enter "deep reinforcement learning"
3. Wait 4 seconds for results
4. Click "Enhance with AI Agents" → "Full Pipeline"
5. Wait 45 seconds for deep analysis
6. Export comprehensive report + BibTeX
```

### Example 3: Finding Novel Papers
```
1. Click "🔬 Cutting Edge" preset
2. Enter "video diffusion models"
3. Get results in 3 seconds
4. Click "Enhance with AI Agents" → "Quick Research"
5. Papers re-sorted by novelty
6. Export top 10 as CSV
```

## 🔧 Technical Implementation

### Fast Search (Phase 1)
Uses direct API calls (no agents):
```typescript
// Direct HTTP requests to:
- arXiv API
- Semantic Scholar API
- OpenAlex API
- DBLP API

// Client-side processing:
- TF-IDF relevance scoring
- Recency/citation authority
- Novelty calculation
- Mode weight application
```

### Agent Enhancement (Phase 2)
Based on `agents/query.py` patterns:
```python
# Quick Research (example_quick_research)
quick_research(
    model=model,
    query="user query",
    sort_by="relevance",
    export_format="json",
    max_results=100
)

# Full Pipeline (example_full_pipeline)
pipeline = create_research_pipeline(model)
pipeline.run("""
    1. Analyze trends
    2. Extract top authors/venues
    3. Generate visualization dashboard
    4. Export comprehensive report
""")

# Custom Workflow (example_manual_control)
pipeline.run("Use sorting_agent to sort by citations")
pipeline.run("Use analysis_agent for trends")
pipeline.run("Use export_agent for BibTeX")
```

## 📈 Benefits

### For All Users
- ⚡ **10x faster** initial results (3s vs 40s)
- 📥 **Instant export** - No waiting for processing
- 🎯 **Get what you need** - Fast search often sufficient
- 💪 **Power when needed** - AI agents on demand

### For Beginners
- 🚀 **Fast feedback** - See results immediately
- 🎨 **Simple UI** - Clean, uncluttered interface
- 📦 **Presets** - One-click configurations
- 📚 **Export ready** - Download without complexity

### For Power Users
- 🔧 **Full control** - All advanced settings available
- 🤖 **Agent workflows** - Choose your processing pipeline
- 📊 **Deep analysis** - When you need it
- ⚙️  **Custom** - Build your own workflow

## 🚦 Migration Path

The new system is **100% backward compatible**:

1. **Default behavior** - Fast search only (new)
2. **Settings** - All previous options available
3. **API** - Backend receives same parameters
4. **Presets** - Replicate old behavior if needed

Users can:
- Use new fast workflow (recommended)
- Or enable "always use agents" in settings
- Mix and match as needed

## 🔮 Future Enhancements

Based on `agents/query.py` capabilities:

1. **More export formats** - Markdown, HTML, JSON
2. **Visualization dashboards** - Interactive charts
3. **Analysis reports** - PDF/HTML comprehensive reports
4. **Saved workflows** - Save custom agent pipelines
5. **Batch operations** - Process multiple queries
6. **Smart caching** - Remember recent searches

## 📝 Summary

**Old System:**
- Slow (40-80s)
- All-or-nothing processing
- Complex UI upfront

**New System:**
- Fast (2-5s base, optional 10-60s enhancement)
- Progressive enhancement
- Clean, compact UI
- Full export functionality
- User controls workflow

**Result:** Better experience for everyone! 🎉

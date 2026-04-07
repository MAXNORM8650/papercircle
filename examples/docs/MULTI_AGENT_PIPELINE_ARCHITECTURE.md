# Multi-Agent Research Pipeline Architecture
## Draft-Based Iterative Improvement System

---

## 🏗️ System Overview

The Paper Circle Agent (PCA) is a **multi-agent research pipeline** that uses **draft-based iterative improvement** to search, rank, analyze, and export academic papers. Each agent contributes to refining a "draft" of research results that improves with each step.

### Core Philosophy: Iterative Refinement
- **Step 1:** Understand user intent (Draft v0.1)
- **Step 2:** Search for initial papers (Draft v0.2)
- **Step 3:** Rank and filter results (Draft v0.3)
- **Step 4:** Analyze and generate insights (Draft v0.4)
- **Step 5:** Export in multiple formats (Draft v1.0)

At each step, the pipeline produces **structured outputs** that update incrementally, allowing real-time monitoring of research progress.

---

## 📊 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER QUERY                               │
│              "Find papers about world models in RL"              │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    ORCHESTRATOR AGENT                            │
│                    (CodeAgent)                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  • Manages multi-agent workflow                          │  │
│  │  • Planning interval: 1 step                             │  │
│  │  • Max steps: 2 (can be configured)                      │  │
│  │  • Coordinates draft iterations                          │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
              ┌──────────────┴──────────────┐
              │   PIPELINE STATE MANAGER    │
              │  (Shared Across All Agents) │
              │                             │
              │  • papers: List[Paper]      │
              │  • steps: List[Dict]        │
              │  • stats: Dict              │
              │  • retrieval_metrics: List  │
              │  • current_step: int        │
              └──────────────┬──────────────┘
                             │
         ┌───────────────────┼───────────────────┐
         │                   │                   │
         ▼                   ▼                   ▼
┌────────────────┐  ┌────────────────┐  ┌────────────────┐
│  Step Logging  │  │ Output Files   │  │  Real-time     │
│                │  │ Generation     │  │  Dashboard     │
│ • Timestamp    │  │                │  │                │
│ • Agent name   │  │ • papers.json  │  │ • HTML view    │
│ • Action       │  │ • links.json   │  │ • Auto-refresh │
│ • Result       │  │ • stats.json   │  │ • Charts       │
│ • Papers count │  │ • summary.json │  │                │
└────────────────┘  │ • papers.csv   │  └────────────────┘
                    │ • papers.bib   │
                    │ • papers.md    │
                    └────────────────┘

═══════════════════════════════════════════════════════════════════
                        AGENT PIPELINE FLOW
═══════════════════════════════════════════════════════════════════

STEP 1: INTENT CLASSIFICATION
┌─────────────────────────────────────────────────────────────────┐
│  INTENT CLASSIFICATION AGENT (ToolCallingAgent)                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Tool: IntentClassificationTool                           │  │
│  │                                                           │  │
│  │  Analyzes query to extract:                              │  │
│  │  • Search mode (online/offline/both)                     │  │
│  │  • Conferences (CVPR, NeurIPS, ICLR, etc.)               │  │
│  │  • Year range (start_year, end_year)                     │  │
│  │  • Max results requested                                 │  │
│  │  • Ranking preferences (recency/citations/novelty)       │  │
│  │  • Core keywords                                         │  │
│  └───────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Managed Sub-Agent: Web Search Agent                     │  │
│  │  • Tools: WebSearchTool, visit_webpage                   │  │
│  │  • Used for clarifying paper title meanings             │  │
│  │  • Max steps: 1                                          │  │
│  └───────────────────────────────────────────────────────────┘  │
└───────────────────────────┬─────────────────────────────────────┘
                            │ Output: Intent JSON
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  Draft v0.1: Intent classified, search parameters extracted     │
└─────────────────────────────────────────────────────────────────┘

STEP 2: PAPER SEARCH (Multi-Source)
┌─────────────────────────────────────────────────────────────────┐
│  PAPER SEARCH AGENT (ToolCallingAgent)                           │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Tool: PaperSearchTool                                    │  │
│  │                                                           │  │
│  │  Search Modes:                                           │  │
│  │  ┌─────────────────────────────────────────────────────┐ │  │
│  │  │ OFFLINE SEARCH (Local Database)                     │ │  │
│  │  │  • OfflinePaperSearchEngine                         │ │  │
│  │  │  • BM25 ranking algorithm                           │ │  │
│  │  │  • Semantic search (optional)                       │ │  │
│  │  │  • Conference filtering                             │ │  │
│  │  │  • Year range filtering                             │ │  │
│  │  │  • Advanced reranker (optional)                     │ │  │
│  │  └─────────────────────────────────────────────────────┘ │  │
│  │  ┌─────────────────────────────────────────────────────┐ │  │
│  │  │ ONLINE SEARCH (Live APIs)                           │ │  │
│  │  │  • ArXiv API                                        │ │  │
│  │  │  • Semantic Scholar API                             │ │  │
│  │  │  • Concurrent search (ThreadPool)                   │ │  │
│  │  │  • Citation extraction                              │ │  │
│  │  │  • PDF link resolution                              │ │  │
│  │  └─────────────────────────────────────────────────────┘ │  │
│  │                                                           │  │
│  │  Features:                                               │  │
│  │  • Deduplication (by normalized title)                  │  │
│  │  • Accumulative search (multi-step)                     │  │
│  │  • Auto-ranking by BM25 score                           │  │
│  │  • Retrieval metrics calculation                        │  │
│  └───────────────────────────────────────────────────────────┘  │
└───────────────────────────┬─────────────────────────────────────┘
                            │ Output: List[Paper]
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  Draft v0.2: Initial papers collected, deduplicated             │
│  • papers.json updated                                          │
│  • links.json updated                                           │
│  • stats.json updated                                           │
└─────────────────────────────────────────────────────────────────┘

STEP 3: RANKING & SORTING
┌─────────────────────────────────────────────────────────────────┐
│  SORTING AGENT (ToolCallingAgent)                                │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Tool: PaperSortTool                                      │  │
│  │                                                           │  │
│  │  Ranking Methods:                                        │  │
│  │  ┌─────────────────────────────────────────────────────┐ │  │
│  │  │ • recency: Sort by publication year                 │ │  │
│  │  │ • citations: Sort by citation count                 │ │  │
│  │  │ • similarity: TF-IDF cosine similarity              │ │  │
│  │  │ • novelty: Inverse document frequency               │ │  │
│  │  │ • bm25: BM25 relevance score                        │ │  │
│  │  │ • combined: Weighted combination of above           │ │  │
│  │  └─────────────────────────────────────────────────────┘ │  │
│  │                                                           │  │
│  │  Score Computation:                                      │  │
│  │  • Normalize scores to [0, 1]                           │  │
│  │  • Apply weights (configurable)                         │  │
│  │  • Update Paper.rank field                              │  │
│  │  • Generate leaderboard                                 │  │
│  └───────────────────────────────────────────────────────────┘  │
└───────────────────────────┬─────────────────────────────────────┘
                            │ Output: Ranked papers
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  Draft v0.3: Papers ranked by relevance/quality                 │
│  • Leaderboard in stats.json                                   │
│  • BM25 scores computed                                         │
│  • Combined scores calculated                                   │
└─────────────────────────────────────────────────────────────────┘

STEP 4: ANALYSIS & INSIGHTS
┌─────────────────────────────────────────────────────────────────┐
│  ANALYSIS AGENT (ToolCallingAgent)                               │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Tool: PaperAnalysisTool                                  │  │
│  │                                                           │  │
│  │  Analytics Generated:                                    │  │
│  │  ┌─────────────────────────────────────────────────────┐ │  │
│  │  │ Statistics:                                         │ │  │
│  │  │ • Source distribution                               │ │  │
│  │  │ • Year distribution                                 │ │  │
│  │  │ • Top authors (by paper count)                      │ │  │
│  │  │ • Top venues                                        │ │  │
│  │  │ • Hot keywords (TF extraction)                      │ │  │
│  │  │ • Citation statistics (total/avg/max/min)           │ │  │
│  │  │ • Score statistics                                  │ │  │
│  │  └─────────────────────────────────────────────────────┘ │  │
│  │  ┌─────────────────────────────────────────────────────┐ │  │
│  │  │ Insights:                                           │ │  │
│  │  │ • Publication trends                                │ │  │
│  │  │ • Primary source identification                     │ │  │
│  │  │ • Prolific authors                                  │ │  │
│  │  │ • Citation leaders                                  │ │  │
│  │  │ • Hot topics/keywords                               │ │  │
│  │  │ • PDF availability metrics                          │ │  │
│  │  └─────────────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────────────┘  │
└───────────────────────────┬─────────────────────────────────────┘
                            │ Output: Analytics + Insights
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  Draft v0.4: Insights generated, trends identified              │
│  • summary.json updated                                         │
│  • Insights added                                               │
│  • Key findings extracted                                       │
└─────────────────────────────────────────────────────────────────┘

STEP 5: EXPORT & OUTPUT
┌─────────────────────────────────────────────────────────────────┐
│  EXPORT AGENT (ToolCallingAgent)                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Tools:                                                   │  │
│  │  • PaperExportTool                                        │  │
│  │  • GetStructuredOutputTool                                │  │
│  │                                                           │  │
│  │  Export Formats:                                         │  │
│  │  ┌─────────────────────────────────────────────────────┐ │  │
│  │  │ • JSON (papers.json, links.json, stats.json)        │ │  │
│  │  │ • CSV (papers.csv) - Spreadsheet compatible         │ │  │
│  │  │ • BibTeX (papers.bib) - Citation manager ready      │ │  │
│  │  │ • Markdown (papers.md) - Human readable             │ │  │
│  │  │ • HTML (dashboard.html) - Interactive visual        │ │  │
│  │  └─────────────────────────────────────────────────────┘ │  │
│  │                                                           │  │
│  │  Dashboard Features:                                     │  │
│  │  • Auto-refresh every 10 seconds                        │  │
│  │  • Chart.js visualizations                              │  │
│  │  • Publication timeline                                 │  │
│  │  • Source distribution chart                            │  │
│  │  • Paper leaderboard                                    │  │
│  │  • Real-time step log                                   │  │
│  │  • Keyword cloud                                        │  │
│  └───────────────────────────────────────────────────────────┘  │
└───────────────────────────┬─────────────────────────────────────┘
                            │ Output: All formats
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  Draft v1.0: Final output in multiple formats                   │
│  • All files generated                                          │
│  • Dashboard ready for viewing                                  │
│  • Research complete                                            │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Iterative Draft Improvement

### How Drafts Evolve

```
User Query
    │
    ├─→ [Draft 0.1] Intent understood
    │       ↓
    ├─→ [Draft 0.2] Papers collected (initial set)
    │       ↓
    │   (Agent may search again for more papers)
    │       ↓
    ├─→ [Draft 0.2.1] More papers added (accumulative)
    │       ↓
    ├─→ [Draft 0.3] Papers ranked
    │       ↓
    │   (Agent may re-rank with different criteria)
    │       ↓
    ├─→ [Draft 0.3.1] Papers re-ranked (improved)
    │       ↓
    ├─→ [Draft 0.4] Insights generated
    │       ↓
    └─→ [Draft 1.0] Final export
```

### Multi-Step Accumulation

The pipeline supports **accumulative search**:
- Step 1: Search ArXiv → Get 20 papers
- Step 2: Search Semantic Scholar → Add 15 new papers (35 total)
- Step 3: Search offline database → Add 30 new papers (65 total)
- Deduplication happens automatically

---

## 📦 Data Models

### Paper Object
```python
@dataclass
class Paper:
    # Core metadata
    title: str
    authors: List[str]
    abstract: str
    url: str
    year: Optional[int]
    venue: str
    source: str

    # Optional metadata
    doi: Optional[str]
    pdf_url: Optional[str]
    citations: Optional[int]
    categories: List[str]

    # Database-specific
    id: Optional[str]
    track: Optional[str]
    status: Optional[str]
    keywords: Optional[str]
    tldr: Optional[str]
    primary_area: Optional[str]

    # Computed scores
    similarity_score: float = 0.0
    novelty_score: float = 0.0
    recency_score: float = 0.0
    relevance_score: float = 0.0
    bm25_score: float = 0.0
    combined_score: float = 0.0
    rank: int = 0
```

### PipelineState
```python
class PipelineState:
    papers: List[Paper]          # All collected papers
    query: str                   # Original user query
    steps: List[Dict]           # Log of all agent steps
    current_step: int           # Current step number
    retrieval_metrics: List[Dict]  # Evaluation metrics
    stats: Dict                 # Computed statistics
    ground_truth_title: str     # For benchmarking
    ground_truth_id: str        # For benchmarking
```

---

## 🛠️ Tools Reference

### 1. IntentClassificationTool
**Purpose:** Parse natural language query into structured search parameters

**Extracts:**
- Search mode (online/offline/both)
- Conferences (CVPR, NeurIPS, ICLR, etc.)
- Year ranges (2020-2024, since 2020, etc.)
- Max results (top 10, first 50, etc.)
- Ranking preferences (recency, citations, novelty)
- Core keywords

**Example:**
```
Input: "Find top 20 papers about transformers from NeurIPS 2023"
Output: {
  "search_mode": "offline",
  "conferences": ["nips"],
  "start_year": 2023,
  "end_year": 2023,
  "max_results": 20,
  "ranking_preferences": ["relevance"],
  "keywords": ["transformers"]
}
```

### 2. PaperSearchTool
**Purpose:** Search papers from online/offline sources

**Parameters:**
- `query`: Search query
- `sources`: List of sources (arxiv, semantic_scholar, offline)
- `max_results`: Maximum results per source
- `conferences`: Conference filters (offline only)
- `start_year`, `end_year`: Year range
- `ranking_method`: bm25/semantic/hybrid

**Features:**
- Concurrent API calls
- Automatic deduplication
- BM25 scoring
- Retrieval metrics calculation

### 3. PaperSortTool
**Purpose:** Rank papers by different criteria

**Methods:**
- `recency`: Sort by year (newest first)
- `citations`: Sort by citation count
- `similarity`: TF-IDF cosine similarity to query
- `novelty`: Inverse document frequency scoring
- `bm25`: BM25 relevance score
- `combined`: Weighted combination

**Score Normalization:**
All scores normalized to [0, 1] for fair comparison

### 4. PaperAnalysisTool
**Purpose:** Generate statistics and insights

**Computes:**
- Source distribution
- Year trends
- Top authors (by count)
- Top venues
- Hot keywords
- Citation statistics
- PDF availability

**Generates:**
- Structured insights (JSON)
- Key findings (text)
- Trend analysis

### 5. PaperExportTool
**Purpose:** Export results in multiple formats

**Outputs:**
- JSON (structured data)
- CSV (spreadsheet)
- BibTeX (citations)
- Markdown (readable)
- HTML dashboard (interactive)

### 6. GetStructuredOutputTool
**Purpose:** Get current pipeline state

**Returns:**
- All papers with metadata
- Links (all/PDFs/DOIs)
- Statistics
- Leaderboard
- Summary and insights

---

## 🎯 Search Engine Architecture

### Offline Search (Local Database)
```
OfflinePaperSearchEngine
    │
    ├─→ Load database files (JSON/CSV)
    │   └─→ Parse Paper objects
    │
    ├─→ Apply filters
    │   ├─→ Conference filter
    │   ├─→ Year range filter
    │   └─→ Track/status filter
    │
    ├─→ Ranking
    │   ├─→ BM25 (default)
    │   ├─→ Semantic (optional)
    │   └─→ Hybrid (optional)
    │
    └─→ Advanced Reranker (optional)
        └─→ Multi-stage retrieval
            ├─→ First stage: BM25 (top 200)
            └─→ Second stage: Reranker (top 50)
```

**Optimization:**
- Cache support (optional)
- Pre-computed indices
- Parallel processing
- Lazy loading

### Online Search (Live APIs)
```
MultiSourceSearchEngine
    │
    ├─→ ArXiv API
    │   ├─→ Query construction
    │   ├─→ Result parsing
    │   └─→ PDF link extraction
    │
    ├─→ Semantic Scholar API
    │   ├─→ Query construction
    │   ├─→ Citation extraction
    │   └─→ DOI resolution
    │
    └─→ Concurrent Execution
        └─→ ThreadPoolExecutor
            ├─→ Parallel API calls
            └─→ Result merging
```

---

## 📈 Evaluation Metrics

### Retrieval Quality (if ground truth provided)
- **Recall@K**: Proportion of relevant papers in top K
- **Precision@K**: Accuracy of top K results
- **MRR (Mean Reciprocal Rank)**: 1/rank of first relevant paper
- **Hit Rate@K**: Binary hit (1 if relevant in top K, else 0)

**K values:** [1, 5, 10, 20, 50]

### Performance Metrics
- Search time
- Total processing time
- Papers found
- Papers after deduplication

---

## 🔧 Configuration Options

### Pipeline Creation
```python
pipeline = create_research_pipeline(
    model=llm_model,
    output_dir="research_output",
    verbose=True,
    custom_instructions="Focus on recent papers with code availability"
)
```

### Search Engine Options
```python
OfflinePaperSearchEngine(
    database_path="./research_output/database",
    use_semantic=False,      # Enable semantic search
    use_bm25=True,          # Enable BM25 ranking
    use_cache=False,        # Enable index caching
    use_reranker=False,     # Enable advanced reranker
    reranker_backend="vllm",
    reranker_model="Qwen/Qwen3-Reranker-0.6B",
    first_stage_k=200       # First-stage retrieval count
)
```

---

## 🚀 Usage Patterns

### Basic Research Query
```python
result = pipeline.run("Find papers about attention mechanisms in transformers")
```

### Targeted Conference Search
```python
result = pipeline.run("offline: Find CVPR 2024 papers about 3D reconstruction")
```

### Benchmarking Mode
```python
result = benchmark_search(
    query="world models in reinforcement learning",
    conferences=["nips", "iclr", "icml"],
    start_year=2020,
    end_year=2024,
    max_results=50,
    ranking_method="bm25",
    relevant_title="World Models"  # Ground truth for evaluation
)
```

### Parallel Benchmark
```python
results = run_benchmark_parallel(
    benchmark_queries=[
        {"query": "...", "relevant_id": "paper123", ...},
        {"query": "...", "relevant_id": "paper456", ...},
    ],
    max_workers=4,
    output_file="benchmark_results.json"
)
```

---

## 📂 Output Structure

```
research_output/
├── papers.json          # All papers with full metadata
├── links.json           # Structured links (all/PDFs/DOIs)
├── stats.json           # Statistics and leaderboard
├── summary.json         # Insights and key findings
├── step_log.json        # Agent step history
├── retrieval_metrics.json  # Evaluation metrics (if benchmarking)
├── papers.csv           # Spreadsheet format
├── papers.bib           # BibTeX citations
├── papers.md            # Markdown report
└── dashboard.html       # Interactive dashboard
```

---

## 🎨 Dashboard Features

### Real-time Updates
- Auto-refreshes every 10 seconds
- Shows current step and timestamp
- Live paper count

### Visualizations
- **Publications Over Time**: Bar chart (Chart.js)
- **Papers by Source**: Doughnut chart
- **Leaderboard**: Sortable table with scores
- **Insights**: Card-based layout with type badges
- **Step Log**: Chronological agent activity
- **Keyword Cloud**: Sized by frequency

### Styling
- Dark theme (Tailwind-inspired)
- Gradient accents
- Responsive grid layout
- Smooth animations

---

## 🔍 Key Innovations

### 1. Draft-Based Iteration
Unlike traditional pipelines that run once, this system:
- Supports multi-step accumulative search
- Updates outputs incrementally
- Allows mid-flight inspection
- Enables iterative refinement

### 2. Unified State Management
- Single PipelineState shared across all agents
- Automatic output synchronization
- Built-in deduplication
- Retrieval metrics tracking

### 3. Multi-Source Search
- Online: ArXiv, Semantic Scholar
- Offline: Local conference databases
- Hybrid: Combined search
- Concurrent execution for speed

### 4. Advanced Ranking
- BM25 algorithm (industry-standard)
- Semantic similarity (embeddings)
- Multi-criteria scoring (novelty, recency, citations)
- Weighted combination
- Optional neural reranker

### 5. Comprehensive Outputs
- 9 different file formats
- Interactive dashboard
- Real-time monitoring
- Export-ready citations

---

## 🧪 Benchmarking Support

### Lightweight Mode
The pipeline includes a **benchmarking mode** that bypasses agent overhead:
- Direct function calls (no LLM)
- Fast execution
- Evaluation metrics
- Parallel processing

**Use case:** Testing retrieval quality on labeled datasets

### Evaluation Pipeline
```python
benchmark_search()           # Single query
    ↓
calculate_retrieval_metrics()  # Compute IR metrics
    ↓
run_benchmark_parallel()     # Multiple queries in parallel
    ↓
JSON output with metrics     # Recall@K, MRR, etc.
```

---

## 🏆 Best Practices

### For Research Queries
1. Use natural language (intent agent will parse)
2. Specify conferences for offline search
3. Mention year ranges if needed
4. State ranking preferences (recent, cited, etc.)

### For Benchmarking
1. Use `benchmark_search()` instead of agent pipeline
2. Provide ground truth (ID or title)
3. Run in parallel with `run_benchmark_parallel()`
4. Use appropriate ranking method (bm25 recommended)

### For Production
1. Enable caching for large databases
2. Use reranker for better quality (slower)
3. Set appropriate `first_stage_k` (default 200)
4. Monitor `dashboard.html` for progress

---

## 🔮 Future Enhancements

### Potential Improvements
- [ ] Graph-based paper relationships
- [ ] Author network analysis
- [ ] Citation graph visualization
- [ ] Multi-hop reasoning (find papers cited by top papers)
- [ ] Incremental database updates
- [ ] User feedback loop (relevance feedback)
- [ ] Export to Zotero/Mendeley

### Scalability
- [ ] Distributed search (multi-node)
- [ ] Streaming results
- [ ] Incremental reranking
- [ ] GPU acceleration for embeddings

---

## 📚 Dependencies

### Core
- `smolagents`: Agent framework
- `requests`: HTTP client
- `markdownify`: HTML to Markdown

### Search & Ranking
- `arxiv`: ArXiv API client
- `sklearn`: TF-IDF, cosine similarity
- `sentence-transformers`: Semantic embeddings (optional)
- `rank-bm25`: BM25 algorithm (optional)
- `advanced_reranker`: Neural reranker (optional)

### Visualization
- `chart.js`: JavaScript charts (via CDN)

---

## 🎓 Summary

This multi-agent pipeline demonstrates:
1. **Modular agent design** with specialized tools
2. **Draft-based iterative improvement** for quality
3. **Hybrid search** (online + offline)
4. **Advanced ranking** (BM25, semantic, multi-criteria)
5. **Real-time monitoring** (live dashboard)
6. **Comprehensive outputs** (9 formats)
7. **Benchmarking support** (evaluation metrics)

**Core Value Proposition:**
Instead of a single-pass search, the pipeline builds up a "research draft" that improves with each agent step, producing publication-ready outputs in multiple formats.

# AI Discovery - Enhanced User Interface

## Overview
The AI Discovery feature has been significantly improved with comprehensive user controls inspired by the research agent examples in `agents/query.py` and `agents/research_agnet.py`. Users now have full control over the discovery process with an intuitive, user-friendly interface.

## New Features

### 1. **Discovery Mode Presets**
Four preset modes based on `discovery_papers.py`:

- **Stable Mode** (R:50%, A:40%, N:10%)
  - Focus: Authoritative, well-cited papers
  - Best for: Literature reviews, foundational research

- **Discovery Mode** (R:30%, A:10%, N:60%)
  - Focus: Novel, cutting-edge research
  - Best for: Finding innovative approaches, latest trends

- **Balanced Mode** (R:40%, A:30%, N:30%)
  - Focus: Mix of quality and novelty
  - Best for: Comprehensive research overview

- **Custom Mode**
  - Focus: User-defined weight combinations
  - Best for: Specific research needs

### 2. **Multi-Source Selection**
Users can select which academic databases to search:
- **arXiv** - Pre-print server for physics, CS, math
- **Semantic Scholar** - AI-powered academic search
- **OpenAlex** - Open catalog of scholarly papers
- **DBLP** - Computer science bibliography

### 3. **Advanced Sorting Strategies**
Six different sorting options from `research_agnet.py`:

- **Relevance** - Best overall match to query
- **Recency** - Newest papers first
- **Citations** - Most cited (most influential)
- **Similarity** - Closest match using TF-IDF
- **Novelty** - Most unique/novel papers
- **Combined** - Weighted combination of all factors

### 4. **Search Parameters**
- **Max Results Per Source** (10-100)
- **Publication Year Range**
- **MMR Diversity Control** with lambda parameter

### 5. **Quick Presets**
- 📚 Literature Review
- 🔬 Cutting Edge
- ⚖️ Balanced Search

### 6. **Interactive Help**
Built-in explanations for all features

## Usage

The enhanced interface is fully backward compatible. Default settings work for most users, while advanced options are available when needed.

**Quick Start:**
1. Enter your research query
2. (Optional) Click a preset or adjust settings
3. Click Search
4. Review and filter results

## Technical Details

See `src/components/Papers/AIDiscoveryView.tsx` for implementation.

The UI now sends comprehensive parameters including mode, sources, sorting strategy, diversity settings, and custom weights to the backend API.

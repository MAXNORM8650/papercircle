# AI Discovery V2 Updates

## Summary of Latest Improvements

This document details the second round of improvements to the AI Discovery feature based on user feedback.

## ✨ New Features

### 1. **Explicit Search Trigger** ✅
**Before**: Search triggered automatically when switching to AI Discovery tab
**After**: Search only triggers when user clicks the Search button

- Users must explicitly click "Search" or press Enter to start discovery
- No automatic searches when navigating or changing tabs
- Full control over when API calls are made
- Prevents accidental expensive API calls

### 2. **Custom MODE_WEIGHTS Configuration** ✅
**New Feature**: Users can now customize scoring weights

- Toggle "Custom Weights" checkbox in filters
- Three sliders for customizing:
  - **Relevance Weight**: How much to prioritize query matching
  - **Authority Weight**: How much to prioritize paper quality/citations
  - **Novelty Weight**: How much to prioritize uniqueness/novelty
- Weights auto-normalize to sum to 100%
- Real-time display of total percentage
- Custom weights sent to API and used for scoring

**UI Elements**:
- Purple-highlighted section when enabled
- Color-coded sliders (blue, yellow, green)
- Live percentage updates
- Explanation text about normalization

### 3. **Enhanced Filters** ✅
**New Filters Added**:

#### Publication Year Range
- Min Year and Max Year input fields
- Filters papers by publication date
- Default: 2020 to current year
- Useful for finding recent work or historical papers

#### Organized Filter Sections
Filters now grouped into logical sections:
1. **MODE_WEIGHTS Configuration** (collapsible)
2. **Score Thresholds** (4 sliders)
3. **Publication Year Range** (date filters)

All sections are collapsible and hidden by default.

### 4. **Expanded Metadata Display** ✅
**New Information Shown on Each Paper**:

Papers now display comprehensive metadata:
- **Venue**: Journal or conference name (e.g., "arXiv", "NeurIPS")
- **Source**: Where the paper was found (e.g., "arxiv", "scopus")
- **Primary Category**: arXiv category (e.g., "cs.CV", "cs.AI")
- **DOI Badge**: Visual indicator if DOI is available
- **All Categories**: Full list of paper categories (when available)

**Visual Improvements**:
- Color-coded metadata badges
- Emoji icons for quick recognition
- Compact, scannable layout
- All metadata from paperfinder.py JSON output

### 5. **API Enhancements** ✅
**Updated Backend**:

`paperfinder_api.py` now supports:
- Custom weights parameter in request body
- Temporary MODE_WEIGHTS override
- Safe weight restoration after custom searches
- Detailed logging of custom weights

**API Request Example**:
```json
{
  "query": "efficient finetuning for LLMs",
  "mode": null,
  "apply_diversity": true,
  "custom_weights": {
    "relevance": 0.5,
    "authority": 0.3,
    "novelty": 0.2
  }
}
```

## 📋 Complete Feature List

### Search Behavior
- ✅ Manual search trigger (button/Enter only)
- ✅ No auto-search on tab switch
- ✅ Loading states with progress indicators
- ✅ Error handling with helpful messages

### Filtering System
- ✅ **MODE_WEIGHTS Customization** (3 sliders)
- ✅ **Score Thresholds** (4 sliders):
  - Min Final Score
  - Min Relevance Score
  - Min Authority Score
  - Min Novelty Score
- ✅ **Date Range** (2 inputs):
  - From Year
  - To Year
- ✅ Collapsible filter sections
- ✅ Real-time client-side filtering
- ✅ Reset all filters button

### Metadata Display
- ✅ Title, authors, year (basic info)
- ✅ Venue (journal/conference)
- ✅ Source (arxiv, scopus, etc.)
- ✅ Primary category (arXiv)
- ✅ DOI indicator
- ✅ All 4 AI scores with bars
- ✅ Color-coded badges
- ✅ Emoji icons for quick scanning

### Community Integration
- ✅ Auto-save to database
- ✅ Auto-save to current community
- ✅ Bulk "Save All" button
- ✅ Individual "Add to Community" option
- ✅ Duplicate detection

## 🎯 Usage Examples

### Example 1: Finding Recent Novel Papers
1. Enter your research query
2. Click "Show Filters"
3. Enable "Custom Weights"
4. Set Novelty Weight to 70%
5. Set Year Range: 2024 to 2025
6. Click Search
7. Results show cutting-edge 2024-2025 papers ranked by novelty

### Example 2: Finding Authoritative Papers
1. Enter query
2. Enable Custom Weights
3. Set Authority Weight to 80%
4. Set Min Authority Score to 60%
5. Search
6. Results show high-quality, well-cited papers

### Example 3: Balanced Search with Filters
1. Enter query
2. Keep default weights (or let AI decide)
3. Set Min Final Score to 50%
4. Set Year Range: 2020-2024
5. Search
6. Get balanced results from last 4 years above quality threshold

## 🔧 Technical Implementation

### Frontend Changes
**AIDiscoveryView.tsx**:
- Added `triggerSearch` prop for explicit search control
- Added MODE_WEIGHTS state (relevanceWeight, authorityWeight, noveltyWeight)
- Added date filter state (minYear, maxYear)
- Added customMode toggle
- Auto-normalization of weights
- Enhanced metadata rendering
- Organized filter UI with sections

**DiscoverView.tsx**:
- Added search trigger mechanism
- State for `triggerAiSearch` and `aiSearchQuery`
- Only passes search query when button clicked
- Removed auto-search behavior

### Backend Changes
**paperfinder_api.py**:
- Added `CustomWeights` model
- Updated `DiscoveryRequest` with optional `custom_weights`
- Temporary MODE_WEIGHTS override logic
- Safe restoration after custom searches
- Enhanced logging

### Data Flow
```
User clicks Search
  ↓
DiscoverView sets triggerAiSearch=true
  ↓
AIDiscoveryView useEffect detects trigger
  ↓
searchPapers() called
  ↓
POST /discover with custom_weights (if enabled)
  ↓
API temporarily overrides MODE_WEIGHTS
  ↓
run_multi_agent_discovery() with custom mode
  ↓
API restores original weights
  ↓
Results returned with all metadata
  ↓
Frontend applies client-side filters
  ↓
Display papers with full metadata
```

## 📊 Filter Logic

All filters are applied client-side with AND logic:

```typescript
const filtered = papers.filter(paper =>
  paper.final_score >= minFinalScore &&
  paper.relevance_score >= minRelevance &&
  paper.authority_score >= minAuthority &&
  paper.novelty_score >= minNovelty &&
  paper.year >= minYear &&
  paper.year <= maxYear
);
```

Papers must pass ALL active filters to be shown.

## 🎨 UI/UX Improvements

### Filter Organization
1. **MODE_WEIGHTS Configuration** (purple section)
   - Toggle to enable/disable
   - Three gradient sliders
   - Auto-normalization indicator
   - Explanation text

2. **Score Thresholds** (standard section)
   - Four gradient sliders
   - Color-coded by score type
   - Percentage display

3. **Publication Year Range** (standard section)
   - Two number inputs
   - Min/Max validation
   - Current year default

### Visual Design
- Gradient sliders for better visual feedback
- Color coding:
  - Purple: Final Score
  - Blue: Relevance
  - Yellow: Authority
  - Green: Novelty
- Emoji icons for quick metadata scanning
- Compact badges for metadata
- Clear section dividers

## 🚀 Getting Started

### Setup
1. Start API server:
   ```bash
   ./start_paperfinder_api.sh
   ```

2. Start frontend:
   ```bash
   npm run dev
   ```

### Basic Search
1. Navigate to Discover Papers
2. Click "AI Discovery" tab
3. Enter your research query
4. Click "Search" or press Enter
5. View results with full metadata

### Custom Weight Search
1. Complete basic search steps above
2. Click "Show Filters"
3. Toggle "Custom Weights" ON
4. Adjust sliders to preference
5. Click "Search" again
6. Results use your custom weights

### Filtering Results
1. After search completes
2. Click "Show Filters"
3. Adjust any score sliders
4. Adjust year range
5. Results filter in real-time (no re-search needed)

## 📝 API Changes

### New Request Schema
```typescript
{
  query: string;
  mode?: "stable" | "discovery" | "balanced" | null;
  apply_diversity: boolean;
  custom_weights?: {
    relevance: number;
    authority: number;
    novelty: number;
  };
}
```

### Response Schema (unchanged)
```typescript
{
  query: string;
  search_spec: {...};
  mode_used: string;
  predicted_titles: string[];
  mode_weights: {
    relevance: number;
    authority: number;
    novelty: number;
  };
  total_papers: number;
  all_papers_sorted: Paper[];
  sections: {...};
}
```

## 🐛 Bug Fixes

1. **Fixed auto-search on tab switch** - Now requires explicit button click
2. **Fixed weight normalization** - Weights always sum to 100%
3. **Fixed metadata display** - All fields from JSON now visible
4. **Fixed filter persistence** - Filters don't reset on re-search

## 📚 Documentation Updates

Updated files:
- `AI_DISCOVERY_SETUP.md` - Complete setup guide
- `AI_DISCOVERY_IMPROVEMENTS.md` - Feature comparison
- `AI_DISCOVERY_V2_UPDATES.md` - This file

## 💡 Best Practices

### For Finding Novel Papers
- Enable Custom Weights
- Set Novelty Weight to 60-80%
- Set recent year range (2023-2025)
- Lower Min Authority Score threshold

### For Finding Authoritative Papers
- Enable Custom Weights
- Set Authority Weight to 60-80%
- Include older papers (2010+)
- Raise Min Authority Score threshold

### For Balanced Results
- Use default weights (or let AI decide)
- Adjust score thresholds to filter quality
- Use year range for recency control

## 🔜 Future Enhancements

Potential next features:
- [ ] Save custom weight presets
- [ ] Venue/conference filters
- [ ] Author filters
- [ ] Citation count display
- [ ] Sort by any metric
- [ ] Compare different weight configurations
- [ ] Export filtered results
- [ ] Schedule recurring searches

---

**Version**: 2.0.0
**Last Updated**: 2025-11-29
**Status**: Production Ready

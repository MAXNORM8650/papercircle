# AI Discovery UI Reorganization Guide

## Current Issues

1. ❌ `/enhance` endpoints not accessible from UI
2. ❌ Results page not organized (papers at bottom, stats at top)
3. ❌ No quick navigation to sections
4. ❌ Multi-agent not using all features

## Required Changes

### 1. Add Enhancement Workflow Buttons

After getting Fast Discovery results, user should be able to enhance them:

```tsx
{/* Enhancement Workflows (after Fast Discovery) */}
{results && discoveryType === 'fast' && !loading && (
  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border-2 border-purple-200 p-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">
      🚀 Enhance Results with AI Agents
    </h3>
    <p className="text-sm text-gray-600 mb-4">
      Run additional analysis on your {results.total_papers} papers
    </p>
    <div className="flex gap-3">
      <button
        onClick={() => runEnhancement('quick')}
        className="flex-1 px-4 py-3 bg-white border-2 border-purple-300 text-purple-700 rounded-lg hover:bg-purple-50 transition-colors"
      >
        <div className="font-semibold">Quick Research</div>
        <div className="text-xs">Sort + Basic Analysis</div>
      </button>
      <button
        onClick={() => runEnhancement('full')}
        className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
      >
        <div className="font-semibold">Full Pipeline</div>
        <div className="text-xs">Complete Analysis + Viz</div>
      </button>
      <button
        onClick={() => runEnhancement('custom')}
        className="flex-1 px-4 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <div className="font-semibold">Custom Workflow</div>
        <div className="text-xs">Select Tasks</div>
      </button>
    </div>
  </div>
)}
```

### 2. Reorganize Results Section (Proper Order)

```tsx
{/* Results View - PROPER ORDER */}
{currentView === 'results' && (multiAgentResults || intermediateResults) && (
  <div className="space-y-6">

    {/* SECTION 1: PAPERS (FIRST!) */}
    <div id="papers" className="scroll-mt-20">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          📄 Papers ({totalPapers})
        </h2>
        {/* Paper list here */}
      </div>
    </div>

    {/* SECTION 2: WEB LINKS (SECOND) */}
    {webResources && webResources.length > 0 && (
      <div id="weblinks" className="scroll-mt-20">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            🔗 Web Resources ({webResources.length})
          </h2>
          {/* Web links here */}
        </div>
      </div>
    )}

    {/* SECTION 3: STATISTICS (THIRD) */}
    <div id="statistics" className="scroll-mt-20">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          📊 Research Statistics
        </h2>
        {/* Stats cards, charts here */}
      </div>
    </div>

    {/* SECTION 4: ANALYSIS & DASHBOARD (FOURTH) */}
    <div id="analysis" className="scroll-mt-20">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          📈 Analysis & Visualization
        </h2>
        {/* Full analysis text, dashboard link here */}
      </div>
    </div>

  </div>
)}
```

### 3. Add Quick Navigation Menu

```tsx
{/* Sticky Navigation Bar */}
<div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
  <div className="flex gap-2 p-3 overflow-x-auto">
    <a
      href="#papers"
      className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors whitespace-nowrap"
    >
      📄 Papers
    </a>
    <a
      href="#weblinks"
      className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors whitespace-nowrap"
    >
      🔗 Web Links
    </a>
    <a
      href="#statistics"
      className="px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors whitespace-nowrap"
    >
      📊 Statistics
    </a>
    <a
      href="#analysis"
      className="px-4 py-2 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors whitespace-nowrap"
    >
      📈 Analysis
    </a>
  </div>
</div>
```

### 4. Enhancement Functions

```typescript
const runEnhancement = async (type: 'quick' | 'full' | 'custom') => {
  if (!results || !results.all_papers_sorted) return;

  setLoading(true);
  try {
    const endpoint = `${apiUrl}/enhance/${type}`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: searchQuery,
        papers: results.all_papers_sorted,
        tasks: type === 'custom' ? ['analyze_trends', 'visualize'] : []
      })
    });

    const data = await response.json();

    // Merge enhancement results with existing results
    setResults(prev => ({
      ...prev,
      ...data,
      enhanced: true,
      enhancement_type: type
    }));

    alert(`✅ ${type} enhancement complete!`);
  } catch (error) {
    console.error('Enhancement error:', error);
    alert('Enhancement failed. Check console.');
  } finally {
    setLoading(false);
  }
};
```

## Implementation Steps

### Step 1: Update State
```typescript
const [enhancementResults, setEnhancementResults] = useState<any>(null);
const [showEnhancementOptions, setShowEnhancementOptions] = useState(false);
```

### Step 2: Add Enhancement UI After Fast Discovery Results
Place the enhancement workflow buttons right after the results header.

### Step 3: Reorganize Results Display
Move sections in this order:
1. Papers (all_papers_sorted)
2. Web Links (web_resources)
3. Statistics (year_dist, authors, trends, venues)
4. Analysis & Dashboard (analysis_text, visualization)

### Step 4: Add Section IDs
Each major section gets an `id` attribute for anchor navigation.

### Step 5: Add Sticky Nav
Create a sticky navigation bar that appears when scrolling through results.

## Expected User Flow

### Fast Discovery + Enhancement
```
1. User searches → Fast Discovery (2-5s)
   ↓
2. Papers appear with basic scores
   ↓
3. User clicks "Full Pipeline" enhancement
   ↓
4. Additional analysis runs (5-10s)
   ↓
5. Results update with:
   - Better scores
   - Statistics
   - Web links
   - Dashboard
```

### Multi-Agent Direct
```
1. User searches → Multi-Agent (8-10s)
   ↓
2. Progressive results:
   - 2s: Papers appear
   - 4s: Papers sorted
   - 7s: Statistics appear
   - 10s: Everything complete
   ↓
3. Organized display:
   - Papers first
   - Web links second
   - Statistics third
   - Analysis fourth
```

## Benefits

### Better UX
- ✅ Results organized logically (papers first!)
- ✅ Quick navigation between sections
- ✅ Progressive disclosure (basic → enhanced)
- ✅ All `/enhance` endpoints accessible

### Better Performance
- ✅ Fast Discovery gets instant results
- ✅ Enhancement is optional
- ✅ User can browse while enhancement runs

### Better Features
- ✅ Quick Research (fast, essential analysis)
- ✅ Full Pipeline (comprehensive, all features)
- ✅ Custom Workflow (user picks tasks)

## API Endpoints Used

| Endpoint | Purpose | Speed |
|----------|---------|-------|
| `POST /discover` | Fast search | 2-5s |
| `POST /enhance/quick` | Quick analysis | +3-5s |
| `POST /enhance/full` | Full analysis + viz | +8-10s |
| `POST /enhance/custom` | Selected tasks | Variable |
| `POST /multi-agent/stream` | Full progressive pipeline | 8-10s |

## File Changes Needed

1. **AIDiscoveryView.tsx**
   - Add enhancement buttons UI
   - Add `runEnhancement()` function
   - Reorganize results sections
   - Add sticky navigation
   - Add section IDs

2. **Backend (already done)**
   - ✅ `/enhance/quick` endpoint
   - ✅ `/enhance/full` endpoint
   - ✅ `/enhance/custom` endpoint
   - ✅ `/multi-agent/stream` progressive

## Summary

The key insight is: **Fast Discovery + Enhancement = Best of both worlds**

- Users get instant results (Fast Discovery)
- Then optionally enhance with deeper analysis
- Multi-Agent shows progressive results with proper organization
- Clear navigation between sections

This makes the system both **fast** (instant papers) and **powerful** (comprehensive analysis when needed).

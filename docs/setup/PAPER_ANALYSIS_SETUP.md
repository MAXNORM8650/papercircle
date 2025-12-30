# Paper Analysis API Setup Guide

## 🚨 Current Issue: RLS Policy Blocking Paper Creation

The paper analysis is failing with this error:
```
new row violates row-level security policy for table "papers"
```

**Cause**: The API is using the anonymous key which requires user authentication. When analyzing papers from arXiv that don't exist in the database, the API needs to create them but doesn't have permission.

## ✅ Solution: Add Service Role Key

### Step 1: Get Your Service Role Key

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project (`fusfnkihcwnvjzalcxgy`)
3. Go to **Settings** → **API**
4. Scroll down to **Project API keys**
5. Copy the **`service_role`** key (⚠️ NOT the anon key!)

### Step 2: Add Key to .env File

Add this line to your `.env` file:

```bash
SUPABASE_SERVICE_ROLE_KEY=eyJ...your_service_role_key_here...
```

⚠️ **SECURITY WARNING**:
- The service role key bypasses ALL Row Level Security policies
- **NEVER** commit it to git
- **NEVER** expose it in client-side code
- Only use it in backend APIs (like paper_analysis_api.py)

### Step 3: Restart the API

```bash
pkill -f paper_analysis_api
nohup python3 paper_analysis_api.py > /tmp/api.log 2>&1 &
```

## 📊 How the Analysis Works

### Current Flow:

1. **User clicks "AI Analysis" tab** on a paper
2. **Frontend checks** if paper exists in database
3. **If NOT found** → Uses `/analyze/url` endpoint with arXiv ID
4. **Backend**:
   - Downloads paper from arXiv
   - Analyzes with `paper_mind_graph` (2-5 minutes)
   - Creates paper entry in database
   - Saves analysis results
5. **Frontend polls** `/analysis/arxiv/{arxiv_id}` every 5 seconds
6. **When complete** → Displays results in 8 tabs

### Analysis Features (8 Tabs):

1. **Overview** - Summary statistics and key insights
2. **Knowledge Graph** - Interactive visualization of concepts
3. **Concepts** - List of all extracted concepts
4. **Methods** - Research methods and techniques
5. **Experiments** - Experimental setups and results
6. **Mindmap** - Mermaid mindmap diagram
7. **Flowchart** - Mermaid flowchart visualization
8. **Q&A** - Ask questions about the paper

## 🔄 Analysis Status & Persistence

### Current Behavior:

- Analysis runs in background (doesn't block UI)
- Results are saved to `paper_analysis` table
- Linked to paper, community, and session (if applicable)
- Polling continues for up to 5 minutes
- If analysis takes longer, status message shows to check back later

### After Page Refresh:

Once analysis is complete and saved:
- Click "AI Analysis" tab → Loads existing analysis instantly
- No re-analysis needed (unless you force it)
- Results persist across sessions

## 📁 Accessing Analysis Results

### By Paper:
```
Circle → Papers → Select Paper → AI Analysis Tab
```

### By Session:
```
Circle → Sessions → Select Session → Paper Analysis Button
```

### Linkage View (Requested Feature):

You requested a structured linkage view showing:
```
Circle
  ├── Session 1
  │     ├── Paper A (Analysis ✓)
  │     ├── Paper B (Analysis ✓)
  │     └── Paper C (Analysis ✗)
  ├── Session 2
  │     └── Paper D (Analysis ✓)
  └── Papers (not in sessions)
        ├── Paper E (Analysis ✓)
        └── Paper F (Analysis ✗)
```

This feature is **not yet implemented** but can be added. Would you like me to create this view?

## 🐛 Troubleshooting

### Issue: "Spinning indicator stops"

**Cause**: Long-running analysis (2-5 minutes) causes browser to stop showing progress

**Solution**: The polling mechanism should keep checking. After 5 minutes, it shows:
```
"Analysis is taking longer than expected. Please check back later."
```

Refresh the page and click "AI Analysis" tab again to check if complete.

### Issue: "Linkage error: expected string or bytes-like object"

**Cause**: This is from `paper_mind_graph` library processing figures/relationships

**Status**: Does NOT affect the analysis - it's a non-fatal warning. The analysis completes successfully despite this error.

### Issue: Results not showing after analysis completes

**Possible causes**:
1. RLS policy blocking save (need service role key)
2. Analysis failed silently (check `/tmp/api.log`)
3. Polling stopped before completion (refresh and check again)

**Check logs**:
```bash
tail -50 /tmp/api.log
```

Look for:
- ✅ `Paper loaded successfully!`
- ✅ `URL analysis completed in X.XX seconds`
- ❌ `URL analysis failed: ...`

## 🚀 Next Steps

1. **Add service role key to .env** (required)
2. **Restart the API** (required)
3. **Test analysis** on a paper that doesn't exist in DB
4. **Let me know** if you want the Linkage view feature implemented

## 📝 Example: Testing the Flow

1. Go to a circle
2. Go to Papers tab
3. Click on any paper
4. Click "AI Analysis" tab
5. Click "Start Analysis" button
6. You should see:
   - "Processing..." message
   - Spinning indicator
   - After 2-5 minutes: Results appear in tabs
7. Refresh page and click "AI Analysis" again
   - Should load instantly from database

## 🔍 Monitoring Analysis Progress

While analysis is running, you can monitor progress:

```bash
# Watch API logs in real-time
tail -f /tmp/api.log

# Check if analysis is running
ps aux | grep paper_analysis_api

# Test API health
curl http://localhost:8001/
```

You'll see progress like:
```
🔍 Starting URL analysis: https://arxiv.org/abs/1706.03762
🕸️ Phase 1: Extracting text...
🧠 Phase 2: Identifying concepts...
🔬 Phase 3: Finding methods...
📊 Phase 4: Analyzing experiments...
🕸️ Phase 5: Finding relationships...
✅ Paper loaded successfully!
```

---

**Need help?** Check the logs or let me know what error you're seeing!

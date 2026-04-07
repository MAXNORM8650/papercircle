# API Migration Guide: Python to Serverless

## ✅ What Changed

Your PaperCircle app has been migrated from Python FastAPI to JavaScript serverless functions!

### Before (Old Architecture)
```
Frontend → Python API (port 8003) → Supabase
          ↑ (must be running!)
```

### After (New Architecture)
```
Frontend → JS Serverless APIs (Vercel) → Supabase
Local Files → Python Sync Script → Supabase
```

## 📁 Files Created

### 1. Python Sync Script (Run Locally)
- `scripts/sync_community_papers.py` - Migrates papers to Supabase
- `scripts/README.md` - Usage instructions

### 2. JavaScript Serverless APIs (Auto-Deployed)
- `api/community-papers.js` - Main community papers API
- `api/sync-status.js` - Check sync job status
- `api/arxiv.js` - ArXiv proxy (already existed)

### 3. Frontend Updates
- `src/components/Papers/CommunityPapersTab.tsx` - Updated to use serverless APIs

## 🚀 How to Use

### Step 1: Install Dependencies (Python)
```bash
cd /Users/komal.kumar/Documents/websites/papercircle
pip install supabase-py python-dotenv
```

### Step 2: Run Sync Script (When You Have New Papers)
```bash
# Sync all sources
python scripts/sync_community_papers.py --source full

# Or sync specific sources
python scripts/sync_community_papers.py --source research_output
python scripts/sync_community_papers.py --source conference_db
```

### Step 3: Deploy Serverless Functions
Your serverless functions will auto-deploy when you push to Git:
```bash
git add api/ src/
git commit -m "Migrate to serverless APIs"
git push
```

Vercel will automatically detect and deploy the new `api/*.js` files!

## 🧪 Testing Locally

### Option 1: Test with Deployed APIs
Just run your frontend - it will use the deployed serverless functions:
```bash
npm run dev
```

### Option 2: Test Serverless Functions Locally
Install Vercel CLI:
```bash
npm install -g vercel
```

Run locally:
```bash
vercel dev
```

This will run both your frontend AND the serverless functions locally.

## 📊 Check Sync Status

### Via API:
```bash
# Get recent sync runs
curl http://localhost:3000/api/sync-status

# Get specific run
curl http://localhost:3000/api/sync-status?runId=xxx
```

### Via Supabase:
Check the `sync_runs` table in your Supabase dashboard.

## 🔄 Scheduling Sync (Optional)

### Option 1: Manual
Just run the script whenever you want:
```bash
python scripts/sync_community_papers.py --source full
```

### Option 2: Cron Job
```bash
# Edit crontab
crontab -e

# Add this line to run daily at 2 AM
0 2 * * * cd /Users/komal.kumar/Documents/websites/papercircle && python scripts/sync_community_papers.py --source full
```

### Option 3: GitHub Actions
See `scripts/README.md` for GitHub Actions workflow example.

## 🎯 Benefits

✅ **No Python Server Needed** - Python script only runs when syncing
✅ **Auto-Scaling** - Serverless functions scale automatically  
✅ **Simpler Deployment** - No need to deploy/maintain Python API
✅ **Cost Effective** - Pay only when APIs are called
✅ **Reliable** - Vercel handles all infrastructure

## 🐛 Troubleshooting

### "Failed to load community papers"
1. Check if you've run the sync script: `python scripts/sync_community_papers.py --source full`
2. Verify Supabase has data in `papers` and `community_papers_global` tables
3. Check browser console for actual error

### "Missing Supabase credentials" 
Make sure your `.env` file has:
```env
VITE_SUPABASE_URL=your_url
SUPABASE_SERVICE_ROLE_KEY=your_key
```

### Sync script fails
1. Check `research_output/` directory exists
2. Verify Supabase credentials in `.env`
3. Check Python dependencies are installed

## 📝 API Endpoints

### GET `/api/community-papers`
Get paginated papers with filters
```
?page=1&limit=20&conference=NeurIPS&year=2024&sortBy=imported_at
```

### GET `/api/community-papers?action=filters`
Get available filter options (years, conferences, etc.)

### GET `/api/community-papers?paperId=xxx`
Get single paper by ID

### GET `/api/community-papers?shareToken=xxx`
Get paper by share token

### POST `/api/community-papers`
Body:
```json
{
  "action": "share",
  "paperId": "xxx"
}
```

### GET `/api/sync-status`
Get recent sync runs

### GET `/api/sync-status?runId=xxx`
Get specific sync run status

## 🎉 You're All Set!

Your app now uses modern serverless architecture. Just sync papers when needed and your APIs will always be available!

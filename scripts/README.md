# Community Papers Sync Scripts

## Overview

This directory contains Python scripts for syncing papers from local files to Supabase. These scripts run **locally** or via **scheduled jobs** - they don't need to be deployed as servers!

## Architecture

```
Local Files → Python Sync Script → Supabase → JS Serverless APIs → Frontend
```

- **Python Script**: Runs locally/scheduled to sync data TO Supabase
- **JS APIs**: Deployed on Vercel, read FROM Supabase (no Python needed!)
- **Frontend**: Calls JS APIs

## Setup

1. **Install dependencies:**
   ```bash
   pip install supabase-py python-dotenv
   ```

2. **Configure environment variables:**
   Create `.env` in project root with:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

## Usage

### Run Full Sync (All Sources)
```bash
python scripts/sync_community_papers.py --source full
```

### Sync Only Research Output
```bash
python scripts/sync_community_papers.py --source research_output
```

### Sync Only Conference Database
```bash
python scripts/sync_community_papers.py --source conference_db
```

## Scheduling Options

### Option 1: Manual Run
Just run the script when you have new papers:
```bash
cd /Users/komal.kumar/Documents/websites/papercircle
python scripts/sync_community_papers.py --source full
```

### Option 2: Cron Job (macOS/Linux)
Add to crontab (`crontab -e`):
```bash
# Run every day at 2 AM
0 2 * * * cd /Users/komal.kumar/Documents/websites/papercircle && python scripts/sync_community_papers.py --source full >> logs/sync.log 2>&1
```

### Option 3: GitHub Actions
Create `.github/workflows/sync-papers.yml`:
```yaml
name: Sync Community Papers

on:
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM UTC
  workflow_dispatch:  # Allow manual trigger

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.10'
      
      - name: Install dependencies
        run: |
          pip install supabase-py python-dotenv
      
      - name: Run sync
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.SUPABASE_SERVICE_ROLE_KEY }}
        run: |
          python scripts/sync_community_papers.py --source full
```

## Monitoring

Check sync status via the API:
```bash
# Get recent sync runs
curl https://papercircle.vercel.app/api/sync-status

# Get specific run
curl https://papercircle.vercel.app/api/sync-status?runId=xxx
```

Or check directly in Supabase `sync_runs` table.

## What Gets Synced?

### Research Output
- Location: `research_output/YYYYMMDD_HHMMSS/papers.json`
- Format: Timestamped directories with paper data
- Source: Your research pipeline runs

### Conference Database
- Location: `research_output/database/{conference}/{year}.json`
- Format: Static conference data (ICLR, NeurIPS, etc.)
- Source: Historical conference papers

## Troubleshooting

### "Research output path not found"
Make sure the directory exists:
```bash
mkdir -p research_output/database
```

### "Missing Supabase credentials"
Check your `.env` file has the correct variables.

### Duplicate Papers
The script automatically checks for existing papers by title and skips duplicates.

## Benefits of This Approach

✅ **No server needed** - Python script runs on-demand  
✅ **Serverless APIs** - JS functions auto-scale on Vercel  
✅ **Data persistence** - Everything stored in Supabase  
✅ **Flexible scheduling** - Run manually, cron, or GitHub Actions  
✅ **Simple deployment** - Just deploy JS functions, no Python server  

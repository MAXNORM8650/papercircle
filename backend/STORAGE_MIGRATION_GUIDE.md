# Supabase Storage Migration Guide

## Overview

This guide shows how to migrate from local file storage to Supabase Storage for production deployment.

## 1. Setup (Already Done Above)

- ✅ Created `backend/utils/storage.py` helper module
- ✅ Install `supabase` Python package
- ✅ Set environment variables (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`)

## 2. Modify `pca.py` to Upload to Cloud

### Current Code (Local Storage)

```python
# In PipelineState._save_outputs() around line 550
def _save_outputs(self):
    """Save all outputs to local filesystem"""
    self.output_dir.mkdir(parents=True, exist_ok=True)

    # Save papers.json locally
    with open(self.output_dir / "papers.json", "w") as f:
        json.dump([asdict(p) for p in self.papers], f, indent=2, default=str)

    # Save dashboard.html locally
    with open(self.output_dir / "dashboard.html", "w") as f:
        f.write(html_content)
```

### New Code (Cloud Storage)

```python
# Add import at top of file
from utils.storage import upload_research_output, SupabaseStorage

# Modify _save_outputs() method
def _save_outputs(self):
    """Save outputs to Supabase Storage AND local (for backward compatibility)"""

    # Still save locally for development
    self.output_dir.mkdir(parents=True, exist_ok=True)

    # Get run_id from output_dir (e.g., "20260103_174904")
    run_id = self.output_dir.name

    # 1. Save papers.json
    papers_data = [asdict(p) for p in self.papers]

    # Local
    with open(self.output_dir / "papers.json", "w") as f:
        json.dump(papers_data, f, indent=2, default=str)

    # Cloud
    try:
        result = upload_research_output(run_id, "papers.json", papers_data)
        print(f"✅ Uploaded papers.json: {result['url']}")
    except Exception as e:
        print(f"⚠️  Cloud upload failed: {e}")

    # 2. Save other JSON files
    for filename in ["links.json", "stats.json", "summary.json", "retrieval_metrics.json", "step_log.json"]:
        # Get data for this file
        if filename == "stats.json":
            data = self.stats
        elif filename == "summary.json":
            data = self.summary
        # ... etc

        # Local
        with open(self.output_dir / filename, "w") as f:
            json.dump(data, f, indent=2, default=str)

        # Cloud
        try:
            upload_research_output(run_id, filename, data)
            print(f"✅ Uploaded {filename}")
        except Exception as e:
            print(f"⚠️  Failed to upload {filename}: {e}")

    # 3. Save dashboard.html
    html_content = self._generate_dashboard()

    # Local
    with open(self.output_dir / "dashboard.html", "w") as f:
        f.write(html_content)

    # Cloud
    try:
        result = upload_research_output(run_id, "dashboard.html", html_content)
        print(f"✅ Uploaded dashboard.html: {result['url']}")

        # Store dashboard URL for easy access
        self.dashboard_url = result['url']
    except Exception as e:
        print(f"⚠️  Failed to upload dashboard.html: {e}")
```

## 3. Modify Research Pipeline API

### Update `research_pipeline_api.py`

**Current code** returns local file paths:
```python
@app.get("/research/status/{timestamp}")
async def get_research_status(timestamp: str):
    output_dir = Path(f"research_output/{timestamp}")

    return {
        "timestamp": timestamp,
        "dashboard_path": f"/research-dashboard/{timestamp}",  # ❌ Local path
        "files": {
            "papers": f"research_output/{timestamp}/papers.json"  # ❌ Local path
        }
    }
```

**New code** returns Supabase URLs:
```python
from utils.storage import get_research_output_url

@app.get("/research/status/{timestamp}")
async def get_research_status(timestamp: str):
    output_dir = Path(f"research_output/{timestamp}")

    # Check if files exist in cloud storage
    try:
        dashboard_url = get_research_output_url(timestamp, "dashboard.html")
        papers_url = get_research_output_url(timestamp, "papers.json")

        return {
            "timestamp": timestamp,
            "dashboard_url": dashboard_url,  # ✅ Cloud URL
            "files": {
                "papers": papers_url,  # ✅ Cloud URL
                "stats": get_research_output_url(timestamp, "stats.json"),
                "summary": get_research_output_url(timestamp, "summary.json"),
            },
            "storage": "supabase"  # Indicate storage type
        }
    except Exception as e:
        # Fallback to local if cloud fails
        return {
            "timestamp": timestamp,
            "dashboard_path": f"/research-dashboard/{timestamp}",
            "storage": "local",
            "error": str(e)
        }
```

## 4. Update Frontend to Use Cloud URLs

### Modify `AIDiscoveryViewNew.tsx`

**Current code** opens local dashboard:
```typescript
const openDashboard = () => {
  if (timestamp) {
    window.open(`/research-dashboard/${timestamp}`, '_blank');  // ❌ Local route
  }
};
```

**New code** opens cloud URL:
```typescript
const openDashboard = () => {
  if (timestamp && summary?.dashboard_url) {
    // Open cloud-hosted dashboard
    window.open(summary.dashboard_url, '_blank');  // ✅ Cloud URL
  } else if (timestamp) {
    // Fallback to local route
    window.open(`/research-dashboard/${timestamp}`, '_blank');
  }
};
```

### Update status polling to get cloud URL:
```typescript
const pollStatus = async () => {
  const response = await fetch(`${apiUrl}/research/status/${timestamp}`);
  const data = await response.json();

  setSummary({
    ...data,
    dashboard_url: data.dashboard_url  // Store cloud URL
  });
};
```

## 5. Environment Variables

### Backend (Railway/Render)
```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Frontend (Vercel)
```bash
# No changes needed - URLs come from API responses
```

## 6. Migration Script for Existing Data

Upload existing local research outputs to cloud:

```python
# migrate_to_cloud.py
from pathlib import Path
from utils.storage import upload_research_output, SupabaseStorage
import json

def migrate_existing_outputs():
    """Migrate all existing research_output/ folders to Supabase"""

    research_output_dir = Path("research_output")

    for run_dir in research_output_dir.iterdir():
        if not run_dir.is_dir():
            continue

        run_id = run_dir.name
        print(f"\n📤 Migrating {run_id}...")

        # Upload all JSON and HTML files
        for file_path in run_dir.glob("*"):
            if file_path.suffix in ['.json', '.html', '.csv', '.txt']:
                try:
                    if file_path.suffix == '.json':
                        with open(file_path) as f:
                            data = json.load(f)
                        result = upload_research_output(run_id, file_path.name, data)
                    else:
                        with open(file_path) as f:
                            content = f.read()
                        result = upload_research_output(run_id, file_path.name, content)

                    print(f"  ✅ {file_path.name}")
                except Exception as e:
                    print(f"  ❌ {file_path.name}: {e}")

if __name__ == "__main__":
    migrate_existing_outputs()
    print("\n🎉 Migration complete!")
```

**Run migration**:
```bash
cd backend
python migrate_to_cloud.py
```

## 7. Testing

### Test Upload
```python
from utils.storage import upload_research_output

# Test uploading JSON
result = upload_research_output(
    "test_20260103",
    "test.json",
    {"message": "Hello from cloud!"}
)
print(f"Uploaded to: {result['url']}")
```

### Test Download
```python
from utils.storage import SupabaseStorage

storage = SupabaseStorage("research-outputs")
data = storage.download_json("test_20260103/test.json")
print(data)  # {"message": "Hello from cloud!"}
```

### Test Public Access
Open the URL in your browser:
```
https://your-project.supabase.co/storage/v1/object/public/research-outputs/test_20260103/test.json
```

## 8. Benefits of Cloud Storage

✅ **Persistent Storage**: Files survive server restarts
✅ **Global CDN**: Fast access worldwide
✅ **Scalable**: No disk space limits
✅ **Shareable**: Direct public URLs
✅ **Versioned**: Can enable versioning in Supabase
✅ **Backup**: Supabase handles backups

## 9. Cost Estimation

### Supabase Storage Pricing (as of 2024)

**Free Tier**:
- 1 GB storage
- 2 GB bandwidth per month

**Pro Plan** ($25/month):
- 100 GB storage
- 200 GB bandwidth
- Then $0.021/GB storage, $0.09/GB bandwidth

### Estimated Usage for PaperCircle:

Each research run ~5-10 MB:
- dashboard.html: ~500 KB
- papers.json: ~2-5 MB
- Other files: ~1-3 MB

**100 research runs** = ~500 MB to 1 GB

**Fits in free tier!** 🎉

## 10. Rollout Strategy

### Phase 1: Dual Write (Recommended)
- Write to BOTH local AND cloud
- Read from local (current behavior)
- Verify cloud uploads working

### Phase 2: Dual Read
- Write to both
- Read from cloud with local fallback
- Test in production

### Phase 3: Cloud Only
- Remove local file writes
- Read only from cloud
- Clean up old local files

This gradual approach minimizes risk!

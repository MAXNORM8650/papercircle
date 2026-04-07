# PaperCircle Production Deployment Guide

Complete guide to deploy PaperCircle to production with Supabase Storage.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                       PRODUCTION                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Users → Frontend (Vercel)                             │
│            ↓                                            │
│         Backend APIs (Railway)                          │
│            ↓                                            │
│         Supabase (Database + Storage)                   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Prerequisites

✅ GitHub account (for code hosting)
✅ Vercel account (for frontend)
✅ Railway account (for backend) - OR Render/Fly.io
✅ Supabase project (already have)

---

## Part 1: Setup Supabase Storage

### 1.1 Create Storage Buckets

**Via Supabase Dashboard**:
1. Go to https://app.supabase.com
2. Select your project
3. Click **Storage** in sidebar
4. Create two buckets:
   - `research-outputs` (Public: ✅)
   - `paper-cache` (Public: ❌)

**Via SQL** (faster):
```sql
-- Run in Supabase SQL Editor

-- Create buckets
INSERT INTO storage.buckets (id, name, public)
VALUES
  ('research-outputs', 'research-outputs', true),
  ('paper-cache', 'paper-cache', false);

-- Set policies
CREATE POLICY "Public read access to research outputs"
ON storage.objects FOR SELECT
USING (bucket_id = 'research-outputs');

CREATE POLICY "Authenticated users can upload research outputs"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'research-outputs'
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Service role full access to paper cache"
ON storage.objects
USING (bucket_id = 'paper-cache');
```

### 1.2 Test Storage Access

```bash
cd backend

# Set environment variables
export SUPABASE_URL="https://your-project.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Run test
python scripts/migrate_to_supabase_storage.py --test
```

Expected output:
```
✅ Test upload successful!
   URL: https://your-project.supabase.co/storage/v1/object/public/research-outputs/test_migration/test.json
```

### 1.3 Migrate Existing Files (Optional)

```bash
# Dry run - see what would be uploaded
python scripts/migrate_to_supabase_storage.py --verify

# Actually migrate
python scripts/migrate_to_supabase_storage.py
```

This uploads all existing `research_output/` files to Supabase.

---

## Part 2: Deploy Backend to Railway

### 2.1 Install Railway CLI

```bash
npm install -g @railway/cli
railway login
```

### 2.2 Prepare Backend for Deployment

**Create `backend/requirements.txt`**:
```bash
cd backend
pip freeze > requirements.txt
```

**Create `backend/Procfile`** (tells Railway how to run your app):
```
web: uvicorn apis.community_papers_api:app --host 0.0.0.0 --port $PORT
research: uvicorn apis.research_pipeline_api:app --host 0.0.0.0 --port $PORT
```

**Create `backend/railway.json`**:
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "uvicorn apis.community_papers_api:app --host 0.0.0.0 --port $PORT",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### 2.3 Deploy to Railway

**Option A: Via Dashboard** (Recommended):

1. Go to https://railway.app
2. Click **New Project**
3. Select **Deploy from GitHub repo**
4. Choose `papercircle` repository
5. Select `backend/` as root directory
6. Railway will auto-detect Python and deploy

**Option B: Via CLI**:

```bash
cd backend
railway init
railway up
```

### 2.4 Set Environment Variables in Railway

In Railway dashboard:
1. Go to your project
2. Click **Variables** tab
3. Add these:

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
PORT=8000
```

### 2.5 Get Your Backend URL

Railway will give you a public URL like:
```
https://papercircle-production.up.railway.app
```

Test it:
```bash
curl https://papercircle-production.up.railway.app/health
```

---

## Part 3: Deploy Frontend to Vercel

### 3.1 Install Vercel CLI

```bash
npm install -g vercel
```

### 3.2 Update Environment Variables

**Create `.env.production` in project root**:

```bash
# Backend API URLs (use your Railway URL)
VITE_COMMUNITY_API_URL=https://papercircle-production.up.railway.app
VITE_COMMUNITY_PAPERS_API_URL=https://papercircle-production.up.railway.app
VITE_RESEARCH_PIPELINE_API_URL=https://papercircle-production.up.railway.app

# Supabase (same as development)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3.3 Deploy to Vercel

**Option A: Via Dashboard** (Recommended):

1. Go to https://vercel.com
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Set **Root Directory**: `./` (leave as root)
5. Framework Preset: **Vite**
6. Add environment variables from `.env.production`
7. Click **Deploy**

**Option B: Via CLI**:

```bash
# From project root
vercel

# For production
vercel --prod
```

### 3.4 Set Environment Variables in Vercel

In Vercel dashboard:
1. Go to **Settings** → **Environment Variables**
2. Add all variables from `.env.production`
3. Click **Save**
4. Redeploy: **Deployments** → **...** → **Redeploy**

### 3.5 Get Your Frontend URL

Vercel gives you:
```
https://papercircle.vercel.app
```

---

## Part 4: Update CORS for Production

Update your FastAPI backends to allow your production frontend.

**Edit `backend/apis/community_papers_api.py`**:

```python
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:5173",  # Local dev
    "https://papercircle.vercel.app",  # Production
    "https://papercircle-*.vercel.app",  # Preview deployments
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**Do the same for `backend/apis/research_pipeline_api.py`**.

Commit and push - Railway will auto-redeploy.

---

## Part 5: Test Production Deployment

### 5.1 Test Frontend

1. Visit `https://papercircle.vercel.app`
2. Navigate to **Discover** → **Community**
3. Verify papers load

### 5.2 Test AI Discovery

1. Click **AI Discovery**
2. Enter a search query
3. Start research
4. Verify:
   - Progress updates stream correctly
   - Dashboard opens in new window
   - Dashboard URL is from Supabase Storage (not local)

### 5.3 Test Community Papers Sync

1. Navigate to **Community** tab
2. Click **Sync Papers** button
3. Verify papers appear

### 5.4 Check Storage

1. Go to Supabase Dashboard → **Storage** → **research-outputs**
2. Verify new files appear after AI Discovery runs

---

## Part 6: Monitoring & Debugging

### Railway Logs

```bash
railway logs
```

Or in dashboard: **Deployments** → **View Logs**

### Vercel Logs

In Vercel dashboard: **Deployments** → Select deployment → **Functions** tab

### Supabase Logs

Dashboard → **Logs** → **Storage Logs**

### Common Issues

**Issue**: Frontend can't connect to backend
- ✅ Check CORS settings
- ✅ Verify environment variables in Vercel
- ✅ Check Railway service is running

**Issue**: Files not uploading to Supabase
- ✅ Check storage policies
- ✅ Verify `SUPABASE_SERVICE_ROLE_KEY` is set
- ✅ Check bucket names match

**Issue**: AI Discovery times out
- ✅ Railway free tier has limits - upgrade if needed
- ✅ Check Railway logs for errors

---

## Cost Summary

### Free Tier (Great for starting!)

| Service | Free Tier | Paid Tier |
|---------|-----------|-----------|
| **Vercel** | 100 GB bandwidth/month | $20/month (Pro) |
| **Railway** | $5 free credit/month | $5/month minimum |
| **Supabase** | 500 MB database, 1 GB storage | $25/month (Pro) |

**Total**: ~$0-10/month for moderate usage

### Recommended Start

- ✅ Vercel Free (frontend)
- ✅ Railway $5/month (backend) - 500 execution hours
- ✅ Supabase Free (database + storage)

**Total: $5/month**

---

## Deployment Checklist

### Pre-Deployment
- [ ] Supabase storage buckets created
- [ ] Storage policies set
- [ ] Test upload to Supabase successful
- [ ] Existing files migrated (optional)

### Backend (Railway)
- [ ] `requirements.txt` created
- [ ] `Procfile` created
- [ ] Environment variables set
- [ ] Deployed successfully
- [ ] Health check passing
- [ ] Logs show no errors

### Frontend (Vercel)
- [ ] `.env.production` created
- [ ] Environment variables set in Vercel
- [ ] Deployed successfully
- [ ] Can access frontend URL
- [ ] API calls working

### Final Tests
- [ ] Community papers load
- [ ] AI Discovery works
- [ ] Dashboard opens from cloud URL
- [ ] Files saved to Supabase Storage
- [ ] Comments, likes, shares work

---

## Next Steps

### Custom Domain (Optional)

**Vercel**:
1. Go to **Settings** → **Domains**
2. Add your domain (e.g., `papercircle.com`)
3. Follow DNS setup instructions

**Railway**:
1. Go to **Settings** → **Networking**
2. Add custom domain (e.g., `api.papercircle.com`)

### Monitoring

Set up monitoring:
- Railway has built-in metrics
- Vercel Analytics (free)
- Sentry for error tracking (optional)

### Continuous Deployment

Already set up! 🎉

When you push to GitHub:
- Vercel auto-deploys frontend
- Railway auto-deploys backend

---

## Support & Resources

- **Railway Docs**: https://docs.railway.app
- **Vercel Docs**: https://vercel.com/docs
- **Supabase Storage Docs**: https://supabase.com/docs/guides/storage

---

## Quick Reference

### Environment Variables Needed

**Backend (Railway)**:
```bash
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

**Frontend (Vercel)**:
```bash
VITE_COMMUNITY_API_URL=https://xxx.up.railway.app
VITE_COMMUNITY_PAPERS_API_URL=https://xxx.up.railway.app
VITE_RESEARCH_PIPELINE_API_URL=https://xxx.up.railway.app
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

### Useful Commands

```bash
# Railway
railway login
railway logs
railway up

# Vercel
vercel login
vercel logs
vercel --prod

# Supabase Storage Test
python backend/scripts/migrate_to_supabase_storage.py --test
```

Good luck with deployment! 🚀

# 🔧 arXiv Search - Quick Fix Guide

## The Problem

You're seeing: **"Error searching arXiv. Please try again."**

**Root Cause**: Browser CORS restrictions prevent direct calls to the arXiv API.

## The Solution ✅

You need to run a simple proxy server that acts as a bridge between your app and arXiv.

## Fix It in 2 Steps

### Step 1: Start the Proxy Server

Open a **new terminal** window and run:

```bash
./start-arxiv-proxy.sh
```

You should see:
```
╔════════════════════════════════════════╗
║   arXiv CORS Proxy Server Running     ║
╚════════════════════════════════════════╝

🚀 Server: http://localhost:3001
📡 Endpoint: http://localhost:3001/api/arxiv

✅ Ready to proxy arXiv API requests
```

### Step 2: Keep It Running

**Leave this terminal open!** The proxy must keep running while you use arXiv search.

Now try searching arXiv again - it should work! 🎉

## Alternative: Manual Start

If the script doesn't work:

```bash
# Install dependencies (first time only)
npm install express cors node-fetch

# Start the proxy
node arxiv-proxy.js
```

## Typical Workflow

You'll need **2 terminals**:

**Terminal 1** - Proxy Server:
```bash
./start-arxiv-proxy.sh
# Keep this running
```

**Terminal 2** - Main App:
```bash
npm run dev
# Your React app
```

## Troubleshooting

### "Command not found: ./start-arxiv-proxy.sh"

Make it executable:
```bash
chmod +x start-arxiv-proxy.sh
./start-arxiv-proxy.sh
```

### Port 3001 already in use?

Something else is using that port. Either:
- Kill the other process, or
- Edit `arxiv-proxy.js` and change `PORT = 3001` to `3002`

### Still not working?

1. **Check proxy is running**: Visit http://localhost:3001 in browser
   - Should show: `{"status":"running",...}`

2. **Check browser console** (F12 in browser)
   - Look for detailed error messages

3. **Check proxy logs** in the proxy terminal
   - Should show requests being processed

## What This Proxy Does

```
Your Browser    →    Proxy Server    →    arXiv API
    ↓                     ↓                    ↓
Makes request    Adds CORS headers    Returns data
    ←                     ←                    ←
Gets response    Forwards response    Sends XML
```

Simple! The proxy just adds the magic CORS headers that browsers require.

## One-Time Setup

After the first time, you just need to:
```bash
./start-arxiv-proxy.sh
```

That's it! No installation needed again.

## Need More Help?

- Full documentation: `ARXIV_PROXY_SETUP.md`
- Check browser console (F12) for detailed errors
- Check proxy terminal for request logs

---

**TL;DR**: Run `./start-arxiv-proxy.sh` in a separate terminal, keep it running, try arXiv search again. ✨

# arXiv Proxy Server Setup

## Why Do You Need This?

When searching arXiv from the browser, you'll encounter CORS (Cross-Origin Resource Sharing) errors because browsers block direct requests to the arXiv API from web applications. This proxy server solves that problem by acting as a middleman between your app and arXiv.

## Quick Start

### Option 1: Using the Startup Script (Recommended)

```bash
./start-arxiv-proxy.sh
```

This will:
1. Check if Node.js is installed
2. Install dependencies if needed
3. Start the proxy server

### Option 2: Manual Setup

```bash
# Install dependencies
npm install express cors node-fetch

# Start the server
node arxiv-proxy.js
```

## Verification

Once started, you should see:

```
╔════════════════════════════════════════╗
║   arXiv CORS Proxy Server Running     ║
╚════════════════════════════════════════╝

🚀 Server: http://localhost:3001
📡 Endpoint: http://localhost:3001/api/arxiv

✅ Ready to proxy arXiv API requests
   Press Ctrl+C to stop
```

You can test it by visiting http://localhost:3001 in your browser - you should see a JSON response with server status.

## Usage

1. **Start the proxy server** (in one terminal):
   ```bash
   ./start-arxiv-proxy.sh
   ```

2. **Start the main app** (in another terminal):
   ```bash
   npm run dev
   ```

3. **Use arXiv search** in the app:
   - Go to Discover Papers → arXiv Live
   - Enter your search query
   - Click Search

## Troubleshooting

### "Cannot connect to arXiv proxy server"

**Problem**: The proxy server isn't running or is on a different port.

**Solution**:
1. Open a new terminal window
2. Navigate to the project directory
3. Run: `./start-arxiv-proxy.sh`
4. Try searching again

### "Error: listen EADDRINUSE :::3001"

**Problem**: Port 3001 is already in use.

**Solution**:
1. Stop the other process using port 3001
2. Or edit `arxiv-proxy.js` and change `PORT = 3001` to another port like `3002`
3. Also update `.env` with: `VITE_ARXIV_PROXY_URL=http://localhost:3002/api/arxiv`

### Dependencies not found

**Problem**: Missing npm packages.

**Solution**:
```bash
npm install express cors node-fetch
```

### Still getting CORS errors

**Problem**: Proxy not configured correctly.

**Solution**:
1. Check proxy is running: Visit http://localhost:3001
2. Check browser console for actual error
3. Verify `.env` has correct proxy URL (if you changed it)

## How It Works

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Browser   │ ─────→  │ Proxy Server│ ─────→  │ arXiv API   │
│ (React App) │ ←───── │ (Port 3001) │ ←───── │             │
└─────────────┘         └─────────────┘         └─────────────┘
   No CORS issues!      Adds CORS headers        Raw XML data
```

The proxy:
1. Receives requests from your React app
2. Forwards them to arXiv API
3. Adds CORS headers to the response
4. Returns data to your app

## Configuration

### Change Proxy Port

Edit `arxiv-proxy.js`:
```javascript
const PORT = 3002; // Change from 3001 to 3002
```

Then add to `.env`:
```
VITE_ARXIV_PROXY_URL=http://localhost:3002/api/arxiv
```

### Change Proxy Host

For production or different environments, update `.env`:
```
VITE_ARXIV_PROXY_URL=https://your-proxy-domain.com/api/arxiv
```

## Production Deployment

For production, you can:

1. **Deploy proxy as a separate service**:
   - Deploy `arxiv-proxy.js` to a Node.js hosting service
   - Update `VITE_ARXIV_PROXY_URL` to the production URL

2. **Use Supabase Edge Functions**:
   - Deploy the existing `supabase/functions/arxiv-search`
   - Configure the app to use it

3. **Use a commercial proxy service**:
   - Services like CORS Anywhere or custom API Gateway
   - Update the proxy URL in `.env`

## Development Workflow

### Recommended Setup

Run both servers simultaneously:

**Terminal 1** (Proxy):
```bash
./start-arxiv-proxy.sh
```

**Terminal 2** (Main App):
```bash
npm run dev
```

### Using tmux or screen

For a better experience, use tmux:

```bash
# Create new tmux session
tmux new -s papercircle

# Split window horizontally
Ctrl+B then "

# In top pane
./start-arxiv-proxy.sh

# Switch to bottom pane (Ctrl+B then arrow down)
npm run dev

# Detach: Ctrl+B then D
# Reattach: tmux attach -t papercircle
```

## API Endpoints

### GET /
Returns server status and information.

**Response**:
```json
{
  "status": "running",
  "service": "arXiv CORS Proxy",
  "port": 3001,
  "endpoints": ["/api/arxiv"]
}
```

### GET /api/arxiv
Proxies requests to arXiv API.

**Query Parameters** (all optional):
- `search_query` - arXiv search query
- `start` - Result offset
- `max_results` - Number of results
- `sortBy` - Sort field (submittedDate, relevance)
- `sortOrder` - ascending/descending

**Example**:
```
http://localhost:3001/api/arxiv?search_query=machine+learning&max_results=10
```

## Logs

The proxy server logs all requests:

```
Proxying request to: https://export.arxiv.org/api/query?search_query=...
Successfully fetched data, length: 45231
```

Check these logs if searches aren't working as expected.

## Security Notes

⚠️ **For Development Only**

This proxy has no authentication and allows all CORS requests. For production:

1. Add rate limiting
2. Implement authentication
3. Restrict CORS to specific domains
4. Add request validation
5. Implement caching
6. Add monitoring/logging

## Alternative Solutions

If you don't want to run a proxy server, you can:

1. **Use Supabase Edge Functions** (requires Supabase setup)
2. **Use a browser extension** like "CORS Unblock" (development only)
3. **Disable CORS in browser** (not recommended, security risk)

## Summary

✅ **Do This**:
1. Run `./start-arxiv-proxy.sh` in one terminal
2. Run `npm run dev` in another terminal
3. Use arXiv search normally

❌ **Don't Do This**:
- Try to use arXiv without the proxy
- Deploy the proxy as-is to production
- Share the proxy URL publicly

---

**Questions?** Check the main project README or the browser console for detailed error messages.

/**
 * Simple CORS proxy for arXiv API
 * Run this server to enable arXiv searches in local development
 */
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    status: 'running',
    service: 'arXiv CORS Proxy',
    port: PORT,
    endpoints: ['/api/arxiv (GET/POST)']
  });
});

function getArxivParams(req) {
  const raw = { ...req.query, ...(req.body || {}) };

  let search_query =
    raw.search_query ||
    raw.searchQuery ||
    raw.query ||
    raw.q;

  const id_list = raw.id_list;

  return { search_query, id_list, raw };
}

app.all('/api/arxiv', async (req, res) => {
  try {
    console.log('📥 Incoming request:');
    console.log('  METHOD:', req.method);
    console.log('  QUERY :', req.query);
    console.log('  BODY  :', req.body);

    const { search_query, id_list, raw } = getArxivParams(req);

    if (!search_query && !id_list) {
      return res.status(400).json({
        error: "Missing required query parameter.",
        required: ["search_query", "id_list"],
        example_get:
          "/api/arxiv?search_query=all:LLM&start=0&max_results=5",
        example_post_body: {
          search_query: "all:LLM",
          start: 0,
          max_results: 5
        },
        received: raw
      });
    }

    const params = new URLSearchParams();

    if (search_query) params.set('search_query', search_query);
    if (id_list) params.set('id_list', id_list);

    for (const [key, value] of Object.entries(raw)) {
      if (['search_query', 'searchQuery', 'query', 'q', 'id_list'].includes(key)) {
        continue;
      }
      if (value !== undefined && value !== null) {
        params.set(key, String(value));
      }
    }

    const arxivUrl = `https://export.arxiv.org/api/query?${params.toString()}`;
    console.log('🔎 Proxying to:', arxivUrl);

    // ✅ Using Node's global fetch
    const response = await fetch(arxivUrl);

    if (!response.ok) {
      console.error('❌ arXiv API error:', response.status);
      return res.status(response.status).json({
        error: `arXiv API returned ${response.status}`
      });
    }

    const xmlData = await response.text();
    console.log('✅ Successfully fetched data. Length:', xmlData.length);

    res.set('Content-Type', 'application/xml');
    res.send(xmlData);
  } catch (error) {
    console.error('⚠ Proxy error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log('');
  console.log('╔════════════════════════════════════════╗');
  console.log('║   arXiv CORS Proxy Server Running     ║');
  console.log('╚════════════════════════════════════════╝');
  console.log('');
  console.log(`🚀 Server: http://localhost:${PORT}`);
  console.log(`📡 Endpoint (GET/POST): http://localhost:${PORT}/api/arxiv`);
  console.log('');
});
/**
 * Vercel Serverless Function: arXiv CORS Proxy
 * Deployed at: https://papercircle.vercel.app/api/arxiv
 */

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Get search parameters from query or body
    const params = req.method === 'GET' ? req.query : req.body;

    const search_query =
      params.search_query ||
      params.searchQuery ||
      params.query ||
      params.q;

    const id_list = params.id_list;

    if (!search_query && !id_list) {
      return res.status(400).json({
        error: 'Missing required query parameter',
        required: ['search_query', 'id_list'],
        example: '/api/arxiv?search_query=all:LLM&start=0&max_results=5'
      });
    }

    // Build arXiv API URL
    const arxivParams = new URLSearchParams();

    if (search_query) arxivParams.set('search_query', search_query);
    if (id_list) arxivParams.set('id_list', id_list);

    // Add other parameters
    for (const [key, value] of Object.entries(params)) {
      if (['search_query', 'searchQuery', 'query', 'q', 'id_list'].includes(key)) {
        continue;
      }
      if (value !== undefined && value !== null) {
        arxivParams.set(key, String(value));
      }
    }

    const arxivUrl = `https://export.arxiv.org/api/query?${arxivParams.toString()}`;
    console.log('Proxying to arXiv:', arxivUrl);

    // Fetch from arXiv API
    const response = await fetch(arxivUrl);

    if (!response.ok) {
      return res.status(response.status).json({
        error: `arXiv API returned ${response.status}`
      });
    }

    const xmlData = await response.text();

    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(xmlData);

  } catch (error) {
    console.error('ArXiv proxy error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}

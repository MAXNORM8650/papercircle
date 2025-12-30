/**
 * Direct arXiv API client for local development
 * Falls back to direct API calls when Supabase Edge Functions are unavailable
 */

export interface ArxivPaper {
  id: string;
  title: string;
  summary: string;
  authors: string[];
  published: string;
  updated?: string;
  link: string;
  pdfLink: string;
  categories: string[];
}

export interface ArxivSearchParams {
  query?: string;
  category?: string;
  author?: string;
  title?: string;
  abstract?: string;
  startDate?: string;
  endDate?: string;
  maxResults?: number;
  start?: number;
  sortBy?: 'relevance' | 'lastUpdatedDate' | 'submittedDate';
  sortOrder?: 'ascending' | 'descending';
}

function buildArxivQuery(params: ArxivSearchParams): string {
  const parts: string[] = [];

  if (params.query) {
    parts.push(`all:${params.query}`);
  }

  if (params.category && params.category !== 'all') {
    parts.push(`cat:${params.category}`);
  }

  if (params.author) {
    parts.push(`au:${params.author}`);
  }

  if (params.title) {
    parts.push(`ti:${params.title}`);
  }

  if (params.abstract) {
    parts.push(`abs:${params.abstract}`);
  }

  if (params.startDate && params.endDate) {
    const start = params.startDate.replace(/-/g, '');
    const end = params.endDate.replace(/-/g, '');
    parts.push(`submittedDate:[${start}0000 TO ${end}2359]`);
  } else if (params.startDate) {
    const start = params.startDate.replace(/-/g, '');
    parts.push(`submittedDate:[${start}0000 TO *]`);
  } else if (params.endDate) {
    const end = params.endDate.replace(/-/g, '');
    parts.push(`submittedDate:[* TO ${end}2359]`);
  }

  // If no search terms provided, return empty string to search all papers
  // This is important for date-only searches
  return parts.length > 0 ? parts.join(' AND ') : '';
}

function parseArxivXML(xmlText: string): ArxivPaper[] {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
  const entries = xmlDoc.getElementsByTagName('entry');
  const papers: ArxivPaper[] = [];

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];

    const idElement = entry.getElementsByTagName('id')[0];
    const titleElement = entry.getElementsByTagName('title')[0];
    const summaryElement = entry.getElementsByTagName('summary')[0];
    const publishedElement = entry.getElementsByTagName('published')[0];
    const updatedElement = entry.getElementsByTagName('updated')[0];

    if (!idElement || !titleElement) continue;

    // Extract arXiv ID
    const fullId = idElement.textContent || '';
    const arxivId = fullId.split('/').pop()?.split('v')[0] || '';

    // Extract authors
    const authorElements = entry.getElementsByTagName('author');
    const authors: string[] = [];
    for (let j = 0; j < authorElements.length; j++) {
      const nameElement = authorElements[j].getElementsByTagName('name')[0];
      if (nameElement?.textContent) {
        authors.push(nameElement.textContent.trim());
      }
    }

    // Extract links
    const linkElements = entry.getElementsByTagName('link');
    let pdfLink = '';
    let webLink = '';
    for (let j = 0; j < linkElements.length; j++) {
      const href = linkElements[j].getAttribute('href') || '';
      if (href.includes('.pdf')) {
        pdfLink = href;
      } else if (!webLink) {
        webLink = href;
      }
    }

    // Extract categories
    const categoryElements = entry.getElementsByTagName('category');
    const categories: string[] = [];
    for (let j = 0; j < categoryElements.length; j++) {
      const term = categoryElements[j].getAttribute('term');
      if (term) categories.push(term);
    }

    papers.push({
      id: arxivId,
      title: titleElement.textContent?.replace(/\s+/g, ' ').trim() || '',
      summary: summaryElement?.textContent?.replace(/\s+/g, ' ').trim() || '',
      authors,
      published: publishedElement?.textContent || '',
      updated: updatedElement?.textContent || undefined,
      link: webLink,
      pdfLink: pdfLink || `https://arxiv.org/pdf/${arxivId}.pdf`,
      categories,
    });
  }

  return papers;
}

export async function searchArxivDirect(params: ArxivSearchParams): Promise<ArxivPaper[]> {
  const searchQuery = buildArxivQuery(params);
  const maxResults = params.maxResults || 30;
  const start = params.start || 0;
  const sortBy = params.sortBy || 'submittedDate';
  const sortOrder = params.sortOrder || 'descending';

  // Use local CORS proxy to avoid CORS issues
  // Make sure arxiv-proxy server is running on port 3001
  const proxyUrl = import.meta.env.VITE_ARXIV_PROXY_URL || 'http://localhost:3001/api/arxiv';

  // Build query params, use 'all' if no specific query provided
  const finalQuery = searchQuery || 'all';

  const queryParams = new URLSearchParams({
    search_query: finalQuery,
    start: start.toString(),
    max_results: maxResults.toString(),
    sortBy,
    sortOrder,
  });

  const url = `${proxyUrl}?${queryParams.toString()}`;

  try {
    console.log('Searching arXiv with query:', searchQuery);
    console.log('Using proxy URL:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/xml, text/xml, */*',
      },
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Proxy error response:', errorText);

      if (response.status === 0 || !response.status) {
        throw new Error('Cannot connect to arXiv proxy server. Please make sure it is running on http://localhost:3001. Run: npm install --prefix . express cors node-fetch && node arxiv-proxy.js');
      }

      throw new Error(`Proxy returned status ${response.status}: ${errorText.substring(0, 200)}`);
    }

    const xmlText = await response.text();
    console.log('Received XML, length:', xmlText.length);

    if (xmlText.length < 100) {
      console.error('Suspiciously short response:', xmlText);
      throw new Error('Invalid response from arXiv API');
    }

    const papers = parseArxivXML(xmlText);
    console.log('Parsed papers:', papers.length);

    return papers;
  } catch (error) {
    console.error('Error fetching from arXiv:', error);

    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Cannot connect to arXiv proxy server. Please make sure the proxy server is running:\n\n1. Install dependencies: npm install express cors node-fetch\n2. Start proxy: node arxiv-proxy.js\n3. Try searching again');
    }

    throw error;
  }
}

/**
 * Group papers by publication date (day)
 */
export function groupPapersByDate(papers: ArxivPaper[]): Map<string, ArxivPaper[]> {
  const grouped = new Map<string, ArxivPaper[]>();

  papers.forEach((paper) => {
    const date = new Date(paper.published);
    const dateKey = date.toISOString().split('T')[0]; // YYYY-MM-DD

    if (!grouped.has(dateKey)) {
      grouped.set(dateKey, []);
    }
    grouped.get(dateKey)!.push(paper);
  });

  // Sort by date (most recent first)
  return new Map([...grouped.entries()].sort((a, b) => b[0].localeCompare(a[0])));
}

/**
 * Format date for display
 */
export function formatDateDisplay(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const dateKey = date.toISOString().split('T')[0];
  const todayKey = today.toISOString().split('T')[0];
  const yesterdayKey = yesterday.toISOString().split('T')[0];

  if (dateKey === todayKey) {
    return 'Today';
  } else if (dateKey === yesterdayKey) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}

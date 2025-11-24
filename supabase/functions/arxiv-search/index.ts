import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ArxivEntry {
  id: string;
  title: string;
  summary: string;
  authors: string[];
  published: string;
  updated: string;
  link: string;
  pdfLink: string;
  categories: string[];
}

function parseArxivXML(xmlText: string): ArxivEntry[] {
  const entries: ArxivEntry[] = [];
  
  const entryMatches = xmlText.matchAll(/<entry>(.*?)<\/entry>/gs);
  
  for (const match of entryMatches) {
    const entryXml = match[1];
    
    const idMatch = entryXml.match(/<id>(.*?)<\/id>/);
    const titleMatch = entryXml.match(/<title>(.*?)<\/title>/s);
    const summaryMatch = entryXml.match(/<summary>(.*?)<\/summary>/s);
    const publishedMatch = entryXml.match(/<published>(.*?)<\/published>/);
    const updatedMatch = entryXml.match(/<updated>(.*?)<\/updated>/);
    
    const authorMatches = Array.from(entryXml.matchAll(/<author>.*?<name>(.*?)<\/name>.*?<\/author>/gs));
    const authors = authorMatches.map(m => m[1].trim());
    
    const linkMatches = Array.from(entryXml.matchAll(/<link.*?href=\"(.*?)\".*?\/>/g));
    const pdfLink = linkMatches.find(l => l[1].includes('.pdf'))?.[1] || '';
    const webLink = linkMatches.find(l => !l[1].includes('.pdf'))?.[1] || '';
    
    const categoryMatches = Array.from(entryXml.matchAll(/<category term=\"(.*?)\".*?\/>/g));
    const categories = categoryMatches.map(m => m[1]);
    
    if (idMatch && titleMatch) {
      const arxivId = idMatch[1].split('/').pop()?.split('v')[0] || '';
      
      entries.push({
        id: arxivId,
        title: titleMatch[1].replace(/\s+/g, ' ').trim(),
        summary: summaryMatch ? summaryMatch[1].replace(/\s+/g, ' ').trim() : '',
        authors,
        published: publishedMatch?.[1] || '',
        updated: updatedMatch?.[1] || '',
        link: webLink,
        pdfLink,
        categories,
      });
    }
  }
  
  return entries;
}

function buildArxivQuery(params: URLSearchParams): string {
  const parts: string[] = [];
  
  const keyword = params.get('query');
  if (keyword) {
    parts.push(`all:${keyword}`);
  }
  
  const category = params.get('category');
  if (category && category !== 'all') {
    parts.push(`cat:${category}`);
  }
  
  const author = params.get('author');
  if (author) {
    parts.push(`au:${author}`);
  }
  
  const title = params.get('title');
  if (title) {
    parts.push(`ti:${title}`);
  }
  
  const abstract = params.get('abstract');
  if (abstract) {
    parts.push(`abs:${abstract}`);
  }
  
  const startDate = params.get('start_date');
  const endDate = params.get('end_date');
  
  if (startDate && endDate) {
    const start = startDate.replace(/-/g, '');
    const end = endDate.replace(/-/g, '');
    parts.push(`submittedDate:[${start} TO ${end}]`);
  } else if (startDate) {
    const start = startDate.replace(/-/g, '');
    parts.push(`submittedDate:[${start} TO *]`);
  } else if (endDate) {
    const end = endDate.replace(/-/g, '');
    parts.push(`submittedDate:[* TO ${end}]`);
  }
  
  return parts.length > 0 ? parts.join(' AND ') : 'all:machine+learning';
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const url = new URL(req.url);
    const maxResults = url.searchParams.get('max_results') || '30';
    const sortBy = url.searchParams.get('sort_by') || 'relevance';
    const sortOrder = url.searchParams.get('sort_order') || 'descending';
    const start = url.searchParams.get('start') || '0';
    
    const searchQuery = buildArxivQuery(url.searchParams);
    
    const arxivApiUrl = `http://export.arxiv.org/api/query?search_query=${encodeURIComponent(searchQuery)}&start=${start}&max_results=${maxResults}&sortBy=${sortBy}&sortOrder=${sortOrder}`;
    
    const response = await fetch(arxivApiUrl);
    const xmlText = await response.text();
    
    const papers = parseArxivXML(xmlText);
    
    return new Response(
      JSON.stringify({ papers, count: papers.length, query: searchQuery }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
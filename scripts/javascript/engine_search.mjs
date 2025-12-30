import { PlaywrightCrawler, Dataset, log, logSysInfo } from 'crawlee';

// ---- Configuration you can tweak ----
const ALLOWED_DOMAINS = [
  'arxiv.org',
  'openreview.net',
  'doi.org',                    // redirects to publishers
  'proceedings.neurips.cc',
  'aclanthology.org',
  'ieeexplore.ieee.org',
  'dl.acm.org',
  'nature.com',
  'science.org',
  'springer.com',
  'link.springer.com',
  'biorxiv.org'
];

// Limit scope by globs so enqueueLinks won’t explode
const LINK_GLOBS = [
  'https://arxiv.org/abs/**',
  'https://arxiv.org/pdf/**',
  'https://openreview.net/forum?id=*',
  'https://doi.org/**',
  'https://proceedings.neurips.cc/paper/**',
  'https://aclanthology.org/**',
  'https://ieeexplore.ieee.org/**',
  'https://dl.acm.org/doi/**',
  'https://www.nature.com/**',
  'https://www.science.org/**',
  'https://link.springer.com/**',
  'https://www.biorxiv.org/**'
];

// Seed with a topic query (change to your domain)
const SEEDS = [
  // arXiv search for LLM agents:
  'https://arxiv.org/search/?query=LLM+agent&searchtype=all',
  // OpenReview sample (will follow to paper pages):
  'https://openreview.net/'
];

// ---- Helpers ----

// Extract via common "citation_*" meta tags used by publishers
async function extractCitationMeta(page) {
  const getAll = (name) => page.$$eval(`meta[name="${name}"]`, els => els.map(e => e.content).filter(Boolean));
  const getOne = async (name) => {
    const v = await getAll(name);
    return v?.[0] ?? null;
  };

  const title = await getOne('citation_title');
  const authors = await getAll('citation_author');
  const year = await getOne('citation_publication_date') || await getOne('citation_online_date');
  const pdf = await getOne('citation_pdf_url');
  const venue = await getOne('citation_journal_title') || await getOne('citation_conference_title');
  // Some pages put abstract in og:description or name="description"
  const abstract =
    await page.$eval('meta[name="description"]', el => el.content).catch(() => null) ||
    await page.$eval('meta[property="og:description"]', el => el.content).catch(() => null);

  return { title, authors, year, pdf, venue, abstract };
}

// Fallback for arXiv abs pages (very stable selectors)
async function extractArxiv(page, url) {
  if (!/https?:\/\/arxiv\.org\/abs\//i.test(url)) return null;

  const title = await page.$eval('h1.title', el => el.textContent.replace('Title:','').trim()).catch(() => null);
  const authors = await page.$$eval('div.authors a', els => els.map(e => e.textContent.trim())).catch(() => []);
  const abstract = await page.$eval('blockquote.abstract', el => el.textContent.replace('Abstract:','').trim()).catch(() => null);
  // pdf link is usually in the "Download:" section or rel="alternate"
  const pdf =
    await page.$eval('a[title="Download PDF"]', a => new URL(a.getAttribute('href'), location.href).href).catch(async () =>
      page.$eval('link[rel="alternate"][type="application/pdf"]', l => l.href).catch(() => null)
    );
  const year = await page.$eval('div.dateline', el => (el.textContent || '').match(/\b(19|20)\d{2}\b/)?.[0] ?? null).catch(() => null);

  return { title, authors, abstract, pdf, venue: 'arXiv', year };
}

// Build a normalized record
function normalizeRecord({ base, meta, arxiv, url }) {
  const title = arxiv?.title || meta.title || base.title || null;
  const authors = arxiv?.authors?.length ? arxiv.authors : (meta.authors || []);
  const abstract = arxiv?.abstract || meta.abstract || null;
  const pdf = arxiv?.pdf || meta.pdf || null;
  const venue = arxiv?.venue || meta.venue || null;
  const year = arxiv?.year || meta.year || null;

  return {
    url,
    title,
    authors,
    abstract,
    pdf_url: pdf,
    venue,
    year,
    fetched_at: new Date().toISOString()
  };
}

// ---- Crawler ----
log.setLevel(log.LEVELS.INFO);
logSysInfo();

const crawler = new PlaywrightCrawler({
  headless: true,                   // set false to watch
  maxRequestsPerCrawl: 200,         // guardrails
  maxConcurrency: 5,
  requestHandlerTimeoutSecs: 60,
  requestHandler: async ({ request, page, enqueueLinks, log }) => {
    const { url } = request;

    // Skip non-allowed domains early
    const host = new URL(url).hostname.replace(/^www\./, '');
    if (!ALLOWED_DOMAINS.some(d => host.endsWith(d))) {
      log.debug(`Skipping off-domain: ${url}`);
      return;
    }

    // Basic info
    const pageTitle = await page.title().catch(() => '');
    log.info(`🧭 ${url} — "${pageTitle}"`);

    // Try meta-based extraction first
    const meta = await extractCitationMeta(page);

    // Try site-specific fallback (arXiv)
    const arxiv = await extractArxiv(page, url);

    // Push a record if we have at least a title
    const record = normalizeRecord({ base: { title: pageTitle }, meta, arxiv, url });
    if (record.title) {
      await Dataset.pushData(record);
      log.info(`✅ Saved: ${record.title}`);
    }

    // Carefully enqueue only scholarly-ish links
    await enqueueLinks({
      globs: LINK_GLOBS,
      strategy: 'same-domain' // within same domain only; change to 'all' to follow cross-domain within globs
    });
  },
  failedRequestHandler: async ({ request }) => {
    log.warning(`❌ Request failed: ${request.url}`);
  },
});

// Entry point
(async () => {
  // Add your own topic pages, conference proceedings, or DOI links to SEEDS
  await crawler.run(SEEDS);
  log.info('🎉 Crawl finished.');

  // Tip: export to files (JSON/CSV) with Crawlee’s dataset tools:
  // npx crawlee datasets export --format json
  // npx crawlee datasets export --format csv
})();
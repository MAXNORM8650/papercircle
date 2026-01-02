-- Community Papers Global Migration
-- Adds tables for global community papers feed from multiple sources

-- =====================================================
-- Table: community_papers_global
-- Tracks papers imported from research_output runs
-- =====================================================
CREATE TABLE IF NOT EXISTS community_papers_global (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  paper_id UUID REFERENCES papers(id) ON DELETE CASCADE NOT NULL,
  run_timestamp TEXT,  -- YYYYMMDD_HHMMSS from folder name (null for conference_db)
  source TEXT NOT NULL CHECK (source IN ('conference_db', 'research_run', 'ai_discovery', 'arxiv')),
  rank INTEGER,
  similarity_score NUMERIC(10, 6),
  novelty_score NUMERIC(10, 6),
  recency_score NUMERIC(10, 6),
  bm25_score NUMERIC(10, 6),
  combined_score NUMERIC(10, 6),
  query TEXT,  -- Original search query (for research runs)
  share_token TEXT UNIQUE,  -- For public sharing URLs
  imported_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(paper_id, COALESCE(run_timestamp, 'static'))  -- Allow paper to appear in multiple runs
);

-- =====================================================
-- Table: sync_runs
-- Tracks background sync job history
-- =====================================================
CREATE TABLE IF NOT EXISTS sync_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  run_timestamp TEXT NOT NULL,
  source_type TEXT NOT NULL CHECK (source_type IN ('research_output', 'conference_db', 'full')),
  query TEXT,
  papers_imported INTEGER DEFAULT 0,
  papers_skipped INTEGER DEFAULT 0,
  papers_updated INTEGER DEFAULT 0,
  status TEXT CHECK (status IN ('pending', 'running', 'completed', 'failed')) DEFAULT 'pending',
  error_message TEXT,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- Add new columns to papers table
-- =====================================================

-- Conference metadata
ALTER TABLE papers ADD COLUMN IF NOT EXISTS conference TEXT;
ALTER TABLE papers ADD COLUMN IF NOT EXISTS primary_area TEXT;
ALTER TABLE papers ADD COLUMN IF NOT EXISTS track TEXT;
ALTER TABLE papers ADD COLUMN IF NOT EXISTS paper_status TEXT;
ALTER TABLE papers ADD COLUMN IF NOT EXISTS keywords TEXT[];
ALTER TABLE papers ADD COLUMN IF NOT EXISTS tldr TEXT;

-- Review scores (from conference database)
ALTER TABLE papers ADD COLUMN IF NOT EXISTS rating_avg NUMERIC(4, 2);
ALTER TABLE papers ADD COLUMN IF NOT EXISTS confidence_avg NUMERIC(4, 2);
ALTER TABLE papers ADD COLUMN IF NOT EXISTS soundness_avg NUMERIC(4, 2);

-- External links
ALTER TABLE papers ADD COLUMN IF NOT EXISTS github_url TEXT;
ALTER TABLE papers ADD COLUMN IF NOT EXISTS project_url TEXT;
ALTER TABLE papers ADD COLUMN IF NOT EXISTS bibtex TEXT;

-- Source tracking
ALTER TABLE papers ADD COLUMN IF NOT EXISTS import_source TEXT;

-- Add save_count and discussion_count cache columns
ALTER TABLE papers ADD COLUMN IF NOT EXISTS save_count INTEGER DEFAULT 0;
ALTER TABLE papers ADD COLUMN IF NOT EXISTS discussion_count INTEGER DEFAULT 0;

-- =====================================================
-- Indexes for performance
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_cpg_paper_id ON community_papers_global(paper_id);
CREATE INDEX IF NOT EXISTS idx_cpg_source ON community_papers_global(source);
CREATE INDEX IF NOT EXISTS idx_cpg_run_timestamp ON community_papers_global(run_timestamp);
CREATE INDEX IF NOT EXISTS idx_cpg_combined_score ON community_papers_global(combined_score DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS idx_cpg_share_token ON community_papers_global(share_token) WHERE share_token IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_cpg_imported_at ON community_papers_global(imported_at DESC);

CREATE INDEX IF NOT EXISTS idx_papers_conference ON papers(conference);
CREATE INDEX IF NOT EXISTS idx_papers_year ON papers(year);
CREATE INDEX IF NOT EXISTS idx_papers_track ON papers(track);
CREATE INDEX IF NOT EXISTS idx_papers_paper_status ON papers(paper_status);
CREATE INDEX IF NOT EXISTS idx_papers_import_source ON papers(import_source);
CREATE INDEX IF NOT EXISTS idx_papers_rating_avg ON papers(rating_avg DESC NULLS LAST);

CREATE INDEX IF NOT EXISTS idx_sync_runs_status ON sync_runs(status);
CREATE INDEX IF NOT EXISTS idx_sync_runs_source_type ON sync_runs(source_type);

-- =====================================================
-- RLS Policies for community_papers_global
-- =====================================================
ALTER TABLE community_papers_global ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view global community papers"
  ON community_papers_global FOR SELECT
  USING (true);

CREATE POLICY "Only service role can insert global papers"
  ON community_papers_global FOR INSERT
  WITH CHECK (true);  -- Will be restricted at API level

CREATE POLICY "Only service role can update global papers"
  ON community_papers_global FOR UPDATE
  USING (true);

CREATE POLICY "Only service role can delete global papers"
  ON community_papers_global FOR DELETE
  USING (true);

-- =====================================================
-- RLS Policies for sync_runs
-- =====================================================
ALTER TABLE sync_runs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view sync runs"
  ON sync_runs FOR SELECT
  USING (true);

CREATE POLICY "Only service role can manage sync runs"
  ON sync_runs FOR ALL
  USING (true);

-- =====================================================
-- Function: Generate share token for a paper
-- =====================================================
CREATE OR REPLACE FUNCTION generate_paper_share_token(p_paper_id UUID)
RETURNS TEXT AS $$
DECLARE
  token TEXT;
  existing_token TEXT;
BEGIN
  -- Check if paper already has a share token
  SELECT share_token INTO existing_token
  FROM community_papers_global
  WHERE paper_id = p_paper_id
  AND share_token IS NOT NULL
  LIMIT 1;

  IF existing_token IS NOT NULL THEN
    RETURN existing_token;
  END IF;

  -- Generate a new token
  token := encode(gen_random_bytes(12), 'base64');
  -- Make it URL-safe
  token := replace(replace(token, '+', '-'), '/', '_');

  -- Update the first community_papers_global entry for this paper
  UPDATE community_papers_global
  SET share_token = token
  WHERE id = (
    SELECT id FROM community_papers_global
    WHERE paper_id = p_paper_id
    ORDER BY imported_at DESC
    LIMIT 1
  );

  RETURN token;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- Function: Get community papers with filters
-- =====================================================
CREATE OR REPLACE FUNCTION get_community_papers(
  p_limit INTEGER DEFAULT 20,
  p_offset INTEGER DEFAULT 0,
  p_year INTEGER DEFAULT NULL,
  p_conference TEXT DEFAULT NULL,
  p_source TEXT DEFAULT NULL,
  p_track TEXT DEFAULT NULL,
  p_status TEXT DEFAULT NULL,
  p_primary_area TEXT DEFAULT NULL,
  p_min_rating NUMERIC DEFAULT NULL,
  p_keywords TEXT DEFAULT NULL,
  p_sort_by TEXT DEFAULT 'imported_at'
)
RETURNS TABLE (
  id UUID,
  paper_id UUID,
  title TEXT,
  authors JSONB,
  abstract TEXT,
  year INTEGER,
  venue TEXT,
  conference TEXT,
  source TEXT,
  track TEXT,
  paper_status TEXT,
  primary_area TEXT,
  keywords TEXT[],
  tldr TEXT,
  pdf_url TEXT,
  arxiv_id TEXT,
  rating_avg NUMERIC,
  github_url TEXT,
  like_count INTEGER,
  view_count INTEGER,
  save_count INTEGER,
  discussion_count INTEGER,
  combined_score NUMERIC,
  similarity_score NUMERIC,
  novelty_score NUMERIC,
  recency_score NUMERIC,
  share_token TEXT,
  imported_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    cpg.id,
    p.id as paper_id,
    p.title,
    p.authors,
    p.abstract,
    p.year,
    p.venue,
    p.conference,
    cpg.source,
    p.track,
    p.paper_status,
    p.primary_area,
    p.keywords,
    p.tldr,
    p.pdf_url,
    p.arxiv_id,
    p.rating_avg,
    p.github_url,
    COALESCE(p.like_count, 0) as like_count,
    COALESCE(p.view_count, 0) as view_count,
    COALESCE(p.save_count, 0) as save_count,
    COALESCE(p.discussion_count, 0) as discussion_count,
    cpg.combined_score,
    cpg.similarity_score,
    cpg.novelty_score,
    cpg.recency_score,
    cpg.share_token,
    cpg.imported_at
  FROM community_papers_global cpg
  JOIN papers p ON cpg.paper_id = p.id
  WHERE
    (p_year IS NULL OR p.year = p_year)
    AND (p_conference IS NULL OR p.conference = p_conference)
    AND (p_source IS NULL OR cpg.source = p_source)
    AND (p_track IS NULL OR p.track = p_track)
    AND (p_status IS NULL OR p.paper_status = p_status)
    AND (p_primary_area IS NULL OR p.primary_area = p_primary_area)
    AND (p_min_rating IS NULL OR p.rating_avg >= p_min_rating)
    AND (p_keywords IS NULL OR p.title ILIKE '%' || p_keywords || '%'
         OR p.abstract ILIKE '%' || p_keywords || '%'
         OR p_keywords = ANY(p.keywords))
  ORDER BY
    CASE WHEN p_sort_by = 'imported_at' THEN cpg.imported_at END DESC NULLS LAST,
    CASE WHEN p_sort_by = 'rating' THEN p.rating_avg END DESC NULLS LAST,
    CASE WHEN p_sort_by = 'likes' THEN p.like_count END DESC NULLS LAST,
    CASE WHEN p_sort_by = 'views' THEN p.view_count END DESC NULLS LAST,
    CASE WHEN p_sort_by = 'combined_score' THEN cpg.combined_score END DESC NULLS LAST,
    CASE WHEN p_sort_by = 'recency' THEN p.year END DESC NULLS LAST,
    cpg.imported_at DESC
  LIMIT p_limit
  OFFSET p_offset;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- Function: Get filter options
-- =====================================================
CREATE OR REPLACE FUNCTION get_community_paper_filter_options()
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'years', (SELECT COALESCE(json_agg(DISTINCT year ORDER BY year DESC), '[]'::json) FROM papers WHERE year IS NOT NULL),
    'conferences', (SELECT COALESCE(json_agg(DISTINCT conference ORDER BY conference), '[]'::json) FROM papers WHERE conference IS NOT NULL),
    'sources', (SELECT COALESCE(json_agg(DISTINCT source ORDER BY source), '[]'::json) FROM community_papers_global),
    'tracks', (SELECT COALESCE(json_agg(DISTINCT track ORDER BY track), '[]'::json) FROM papers WHERE track IS NOT NULL),
    'statuses', (SELECT COALESCE(json_agg(DISTINCT paper_status ORDER BY paper_status), '[]'::json) FROM papers WHERE paper_status IS NOT NULL),
    'primary_areas', (SELECT COALESCE(json_agg(DISTINCT primary_area ORDER BY primary_area), '[]'::json) FROM papers WHERE primary_area IS NOT NULL)
  ) INTO result;

  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- Function: Get paper by share token
-- =====================================================
CREATE OR REPLACE FUNCTION get_paper_by_share_token(p_share_token TEXT)
RETURNS TABLE (
  id UUID,
  paper_id UUID,
  title TEXT,
  authors JSONB,
  abstract TEXT,
  year INTEGER,
  venue TEXT,
  conference TEXT,
  source TEXT,
  track TEXT,
  paper_status TEXT,
  primary_area TEXT,
  keywords TEXT[],
  tldr TEXT,
  pdf_url TEXT,
  arxiv_id TEXT,
  rating_avg NUMERIC,
  github_url TEXT,
  bibtex TEXT,
  like_count INTEGER,
  view_count INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    cpg.id,
    p.id as paper_id,
    p.title,
    p.authors,
    p.abstract,
    p.year,
    p.venue,
    p.conference,
    cpg.source,
    p.track,
    p.paper_status,
    p.primary_area,
    p.keywords,
    p.tldr,
    p.pdf_url,
    p.arxiv_id,
    p.rating_avg,
    p.github_url,
    p.bibtex,
    COALESCE(p.like_count, 0) as like_count,
    COALESCE(p.view_count, 0) as view_count
  FROM community_papers_global cpg
  JOIN papers p ON cpg.paper_id = p.id
  WHERE cpg.share_token = p_share_token
  LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- Function: Get community papers count with filters
-- =====================================================
CREATE OR REPLACE FUNCTION get_community_papers_count(
  p_year INTEGER DEFAULT NULL,
  p_conference TEXT DEFAULT NULL,
  p_source TEXT DEFAULT NULL,
  p_track TEXT DEFAULT NULL,
  p_status TEXT DEFAULT NULL,
  p_primary_area TEXT DEFAULT NULL,
  p_min_rating NUMERIC DEFAULT NULL,
  p_keywords TEXT DEFAULT NULL
)
RETURNS INTEGER AS $$
DECLARE
  count INTEGER;
BEGIN
  SELECT COUNT(DISTINCT cpg.paper_id) INTO count
  FROM community_papers_global cpg
  JOIN papers p ON cpg.paper_id = p.id
  WHERE
    (p_year IS NULL OR p.year = p_year)
    AND (p_conference IS NULL OR p.conference = p_conference)
    AND (p_source IS NULL OR cpg.source = p_source)
    AND (p_track IS NULL OR p.track = p_track)
    AND (p_status IS NULL OR p.paper_status = p_status)
    AND (p_primary_area IS NULL OR p.primary_area = p_primary_area)
    AND (p_min_rating IS NULL OR p.rating_avg >= p_min_rating)
    AND (p_keywords IS NULL OR p.title ILIKE '%' || p_keywords || '%'
         OR p.abstract ILIKE '%' || p_keywords || '%'
         OR p_keywords = ANY(p.keywords));

  RETURN COALESCE(count, 0);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- Comments
-- =====================================================
COMMENT ON TABLE community_papers_global IS 'Global community papers feed aggregated from multiple sources';
COMMENT ON TABLE sync_runs IS 'Tracks background sync job history for importing papers';
COMMENT ON FUNCTION generate_paper_share_token IS 'Generates a shareable token for a paper';
COMMENT ON FUNCTION get_community_papers IS 'Retrieves community papers with filtering and pagination';
COMMENT ON FUNCTION get_community_paper_filter_options IS 'Returns available filter options for community papers';
COMMENT ON FUNCTION get_paper_by_share_token IS 'Retrieves a paper using its share token for public viewing';

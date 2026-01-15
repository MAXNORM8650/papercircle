-- Add public_access column to papers table for controlling community visibility
-- This allows you to sync all conference papers but control what's publicly searchable

-- ============================================================================
-- 1. Add public_access column to papers table
-- ============================================================================

ALTER TABLE papers
ADD COLUMN IF NOT EXISTS public_access BOOLEAN DEFAULT true;

-- Add index for efficient filtering
CREATE INDEX IF NOT EXISTS idx_papers_public_access ON papers(public_access);

-- ============================================================================
-- 2. Add full-text search vector for better search performance
-- ============================================================================

-- Add tsvector column for full-text search
ALTER TABLE papers
ADD COLUMN IF NOT EXISTS search_vector tsvector;

-- Create GIN index for fast full-text search
CREATE INDEX IF NOT EXISTS idx_papers_search_vector ON papers USING GIN(search_vector);

-- Function to update search vector
CREATE OR REPLACE FUNCTION papers_search_vector_update() RETURNS trigger AS $$
BEGIN
    NEW.search_vector :=
        setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'A') ||
        setweight(to_tsvector('english', COALESCE(NEW.abstract, '')), 'B') ||
        setweight(to_tsvector('english', COALESCE(array_to_string(NEW.keywords, ' '), '')), 'C') ||
        setweight(to_tsvector('english', COALESCE(NEW.tldr, '')), 'C');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update search vector on insert/update
DROP TRIGGER IF EXISTS papers_search_vector_trigger ON papers;
CREATE TRIGGER papers_search_vector_trigger
    BEFORE INSERT OR UPDATE OF title, abstract, keywords, tldr
    ON papers
    FOR EACH ROW
    EXECUTE FUNCTION papers_search_vector_update();

-- Update existing papers to populate search_vector
UPDATE papers SET search_vector =
    setweight(to_tsvector('english', COALESCE(title, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(abstract, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(array_to_string(keywords, ' '), '')), 'C') ||
    setweight(to_tsvector('english', COALESCE(tldr, '')), 'C')
WHERE search_vector IS NULL;

-- ============================================================================
-- 3. Create RPC function for full-text search with ranking
-- ============================================================================

CREATE OR REPLACE FUNCTION search_papers_fts(
    search_query TEXT,
    p_conferences TEXT[] DEFAULT NULL,
    p_start_year INT DEFAULT NULL,
    p_end_year INT DEFAULT NULL,
    p_public_only BOOLEAN DEFAULT true,
    p_limit INT DEFAULT 50,
    p_offset INT DEFAULT 0
)
RETURNS TABLE (
    id UUID,
    title TEXT,
    authors TEXT[],
    abstract TEXT,
    year INT,
    venue TEXT,
    conference TEXT,
    arxiv_id TEXT,
    pdf_url TEXT,
    rating_avg FLOAT,
    keywords TEXT[],
    tldr TEXT,
    primary_area TEXT,
    rank FLOAT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        p.id,
        p.title,
        p.authors,
        p.abstract,
        p.year,
        p.venue,
        p.conference,
        p.arxiv_id,
        p.pdf_url,
        p.rating_avg,
        p.keywords,
        p.tldr,
        p.primary_area,
        ts_rank_cd(p.search_vector, websearch_to_tsquery('english', search_query)) AS rank
    FROM papers p
    WHERE
        -- Full-text search
        p.search_vector @@ websearch_to_tsquery('english', search_query)
        -- Public access filter
        AND (NOT p_public_only OR p.public_access = true)
        -- Conference filter
        AND (p_conferences IS NULL OR p.conference = ANY(p_conferences))
        -- Year range filter
        AND (p_start_year IS NULL OR p.year >= p_start_year)
        AND (p_end_year IS NULL OR p.year <= p_end_year)
    ORDER BY rank DESC
    LIMIT p_limit
    OFFSET p_offset;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 4. Create simple text search for fallback (ILIKE-based)
-- ============================================================================

CREATE OR REPLACE FUNCTION search_papers_simple(
    search_query TEXT,
    p_conferences TEXT[] DEFAULT NULL,
    p_start_year INT DEFAULT NULL,
    p_end_year INT DEFAULT NULL,
    p_public_only BOOLEAN DEFAULT true,
    p_limit INT DEFAULT 50,
    p_offset INT DEFAULT 0
)
RETURNS TABLE (
    id UUID,
    title TEXT,
    authors TEXT[],
    abstract TEXT,
    year INT,
    venue TEXT,
    conference TEXT,
    arxiv_id TEXT,
    pdf_url TEXT,
    rating_avg FLOAT,
    keywords TEXT[],
    tldr TEXT,
    primary_area TEXT
) AS $$
DECLARE
    search_pattern TEXT := '%' || search_query || '%';
BEGIN
    RETURN QUERY
    SELECT
        p.id,
        p.title,
        p.authors,
        p.abstract,
        p.year,
        p.venue,
        p.conference,
        p.arxiv_id,
        p.pdf_url,
        p.rating_avg,
        p.keywords,
        p.tldr,
        p.primary_area
    FROM papers p
    WHERE
        -- Text search in title, abstract, keywords
        (
            p.title ILIKE search_pattern
            OR p.abstract ILIKE search_pattern
            OR p.tldr ILIKE search_pattern
            OR EXISTS (SELECT 1 FROM unnest(p.keywords) k WHERE k ILIKE search_pattern)
        )
        -- Public access filter
        AND (NOT p_public_only OR p.public_access = true)
        -- Conference filter
        AND (p_conferences IS NULL OR p.conference = ANY(p_conferences))
        -- Year range filter
        AND (p_start_year IS NULL OR p.year >= p_start_year)
        AND (p_end_year IS NULL OR p.year <= p_end_year)
    ORDER BY
        -- Prioritize title matches
        CASE WHEN p.title ILIKE search_pattern THEN 0 ELSE 1 END,
        p.rating_avg DESC NULLS LAST,
        p.year DESC NULLS LAST
    LIMIT p_limit
    OFFSET p_offset;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 5. Grant access to authenticated users
-- ============================================================================

GRANT EXECUTE ON FUNCTION search_papers_fts TO authenticated;
GRANT EXECUTE ON FUNCTION search_papers_fts TO service_role;
GRANT EXECUTE ON FUNCTION search_papers_simple TO authenticated;
GRANT EXECUTE ON FUNCTION search_papers_simple TO service_role;

-- ============================================================================
-- 6. Comments for documentation
-- ============================================================================

COMMENT ON COLUMN papers.public_access IS 'Whether this paper is publicly searchable by community members';
COMMENT ON COLUMN papers.search_vector IS 'PostgreSQL tsvector for full-text search';
COMMENT ON FUNCTION search_papers_fts IS 'Full-text search with ranking using PostgreSQL FTS';
COMMENT ON FUNCTION search_papers_simple IS 'Simple ILIKE-based search fallback';

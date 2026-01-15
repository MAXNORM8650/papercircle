-- Fix search function return types to match actual table schema
-- authors = JSONB, keywords = TEXT[] (array)

-- ============================================================================
-- 1. Fix search_papers_fts function
-- ============================================================================

DROP FUNCTION IF EXISTS search_papers_fts(TEXT, TEXT[], INT, INT, BOOLEAN, INT, INT);

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
    authors JSONB,
    abstract TEXT,
    year INT,
    venue TEXT,
    conference TEXT,
    arxiv_id TEXT,
    pdf_url TEXT,
    rating_avg NUMERIC(4,2),
    keywords TEXT[],
    tldr TEXT,
    primary_area TEXT,
    rank REAL
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
-- 2. Fix search_papers_simple function
-- ============================================================================

DROP FUNCTION IF EXISTS search_papers_simple(TEXT, TEXT[], INT, INT, BOOLEAN, INT, INT);

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
    authors JSONB,
    abstract TEXT,
    year INT,
    venue TEXT,
    conference TEXT,
    arxiv_id TEXT,
    pdf_url TEXT,
    rating_avg NUMERIC(4,2),
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
        -- Text search in title, abstract, tldr
        (
            p.title ILIKE search_pattern
            OR p.abstract ILIKE search_pattern
            OR p.tldr ILIKE search_pattern
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
-- 3. Re-grant permissions
-- ============================================================================

GRANT EXECUTE ON FUNCTION search_papers_fts TO authenticated;
GRANT EXECUTE ON FUNCTION search_papers_fts TO service_role;
GRANT EXECUTE ON FUNCTION search_papers_simple TO authenticated;
GRANT EXECUTE ON FUNCTION search_papers_simple TO service_role;

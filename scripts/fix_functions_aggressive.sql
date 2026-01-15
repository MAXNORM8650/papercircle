-- Aggressively drop ALL versions of the search functions and recreate them
-- Run this in the Supabase SQL Editor

-- Drop all possible signatures of search_papers_fts
DROP FUNCTION IF EXISTS search_papers_fts(TEXT);
DROP FUNCTION IF EXISTS search_papers_fts(TEXT, TEXT[]);
DROP FUNCTION IF EXISTS search_papers_fts(TEXT, TEXT[], INT);
DROP FUNCTION IF EXISTS search_papers_fts(TEXT, TEXT[], INT, INT);
DROP FUNCTION IF EXISTS search_papers_fts(TEXT, TEXT[], INT, INT, BOOLEAN);
DROP FUNCTION IF EXISTS search_papers_fts(TEXT, TEXT[], INT, INT, BOOLEAN, INT);
DROP FUNCTION IF EXISTS search_papers_fts(TEXT, TEXT[], INT, INT, BOOLEAN, INT, INT);
DROP FUNCTION IF EXISTS public.search_papers_fts(TEXT, TEXT[], INT, INT, BOOLEAN, INT, INT);

-- Drop all possible signatures of search_papers_simple
DROP FUNCTION IF EXISTS search_papers_simple(TEXT);
DROP FUNCTION IF EXISTS search_papers_simple(TEXT, TEXT[]);
DROP FUNCTION IF EXISTS search_papers_simple(TEXT, TEXT[], INT);
DROP FUNCTION IF EXISTS search_papers_simple(TEXT, TEXT[], INT, INT);
DROP FUNCTION IF EXISTS search_papers_simple(TEXT, TEXT[], INT, INT, BOOLEAN);
DROP FUNCTION IF EXISTS search_papers_simple(TEXT, TEXT[], INT, INT, BOOLEAN, INT);
DROP FUNCTION IF EXISTS search_papers_simple(TEXT, TEXT[], INT, INT, BOOLEAN, INT, INT);
DROP FUNCTION IF EXISTS public.search_papers_simple(TEXT, TEXT[], INT, INT, BOOLEAN, INT, INT);

-- Now create the correct functions

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
    keywords JSONB,
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
        p.search_vector @@ websearch_to_tsquery('english', search_query)
        AND (NOT p_public_only OR p.public_access = true)
        AND (p_conferences IS NULL OR p.conference = ANY(p_conferences))
        AND (p_start_year IS NULL OR p.year >= p_start_year)
        AND (p_end_year IS NULL OR p.year <= p_end_year)
    ORDER BY rank DESC
    LIMIT p_limit
    OFFSET p_offset;
END;
$$ LANGUAGE plpgsql;

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
    keywords JSONB,
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
        (
            p.title ILIKE search_pattern
            OR p.abstract ILIKE search_pattern
            OR p.tldr ILIKE search_pattern
        )
        AND (NOT p_public_only OR p.public_access = true)
        AND (p_conferences IS NULL OR p.conference = ANY(p_conferences))
        AND (p_start_year IS NULL OR p.year >= p_start_year)
        AND (p_end_year IS NULL OR p.year <= p_end_year)
    ORDER BY
        CASE WHEN p.title ILIKE search_pattern THEN 0 ELSE 1 END,
        p.rating_avg DESC NULLS LAST,
        p.year DESC NULLS LAST
    LIMIT p_limit
    OFFSET p_offset;
END;
$$ LANGUAGE plpgsql;

-- Grant permissions
GRANT EXECUTE ON FUNCTION search_papers_fts TO authenticated;
GRANT EXECUTE ON FUNCTION search_papers_fts TO service_role;
GRANT EXECUTE ON FUNCTION search_papers_simple TO authenticated;
GRANT EXECUTE ON FUNCTION search_papers_simple TO service_role;

-- Verify the functions exist with correct return types
SELECT
    p.proname as function_name,
    pg_get_function_result(p.oid) as return_type
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public'
AND p.proname IN ('search_papers_fts', 'search_papers_simple');

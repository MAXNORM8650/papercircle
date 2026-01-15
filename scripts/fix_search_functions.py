"""
Execute the SQL fix directly on Supabase using postgrest-py or supabase-py.
Since we can't use direct PostgreSQL connection without the password,
we'll try using the Supabase REST API to execute the function recreations.
"""

from supabase import create_client
import os
from dotenv import load_dotenv

load_dotenv()

url = os.getenv('SUPABASE_URL') or os.getenv('VITE_SUPABASE_URL')
key = os.getenv('SUPABASE_SERVICE_ROLE_KEY')

if not key:
    print("ERROR: SUPABASE_SERVICE_ROLE_KEY not found in environment")
    exit(1)

print(f"Connecting to Supabase: {url}")
client = create_client(url, key)

# The SQL to fix the functions
fix_sql = """
-- Fix search_papers_fts function
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

GRANT EXECUTE ON FUNCTION search_papers_fts TO authenticated;
GRANT EXECUTE ON FUNCTION search_papers_fts TO service_role;
"""

fix_simple_sql = """
-- Fix search_papers_simple function
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

GRANT EXECUTE ON FUNCTION search_papers_simple TO authenticated;
GRANT EXECUTE ON FUNCTION search_papers_simple TO service_role;
"""

print("\n" + "="*60)
print("To fix the functions, please run the following SQL in the")
print("Supabase SQL Editor (Dashboard > SQL Editor):")
print("="*60)
print("\nCopy the SQL from:")
print("supabase/migrations/20260116000000_fix_search_function_types.sql")
print("\nOr copy this SQL:")
print("-"*60)
print(fix_sql)
print("-"*60)
print(fix_simple_sql)
print("-"*60)

# Try to use the supabase CLI's db execute if available
import subprocess
print("\nAttempting to run via supabase db execute...")
try:
    result = subprocess.run(
        ['supabase', 'db', 'execute', '--linked', '-f',
         'supabase/migrations/20260116000000_fix_search_function_types.sql'],
        capture_output=True, text=True, cwd='/Users/komal.kumar/Documents/websites/papercircle'
    )
    if result.returncode == 0:
        print("SUCCESS! SQL executed via supabase CLI")
        print(result.stdout)
    else:
        print(f"CLI method failed: {result.stderr}")
        print("\nPlease use the Supabase Dashboard SQL Editor instead.")
except Exception as e:
    print(f"Could not use supabase CLI: {e}")
    print("\nPlease use the Supabase Dashboard SQL Editor instead.")

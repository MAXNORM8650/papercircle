-- Add hf_paper_id column to papers table for mapping HuggingFace paper IDs to Supabase UUIDs
-- This enables engagement (likes, views, comments) on community papers served from HF Spaces

-- 1. Add column
ALTER TABLE papers ADD COLUMN IF NOT EXISTS hf_paper_id TEXT UNIQUE;

-- 2. Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_papers_hf_paper_id ON papers(hf_paper_id) WHERE hf_paper_id IS NOT NULL;

-- 3. Function to find or create a stub paper by HF paper ID
CREATE OR REPLACE FUNCTION ensure_paper_for_hf_id(
    p_hf_paper_id TEXT,
    p_title TEXT DEFAULT '',
    p_year INT DEFAULT NULL,
    p_conference TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    existing_id UUID;
BEGIN
    -- Check if already exists
    SELECT id INTO existing_id FROM papers WHERE hf_paper_id = p_hf_paper_id;

    IF existing_id IS NOT NULL THEN
        RETURN existing_id;
    END IF;

    -- Create stub row
    INSERT INTO papers (hf_paper_id, title, year, conference, import_source, public_access)
    VALUES (p_hf_paper_id, p_title, p_year, p_conference, 'hf_community', true)
    ON CONFLICT (hf_paper_id) DO UPDATE SET hf_paper_id = EXCLUDED.hf_paper_id
    RETURNING id INTO existing_id;

    RETURN existing_id;
END;
$$ LANGUAGE plpgsql;

-- 4. Batch version - ensure multiple papers at once, returns mapping
CREATE OR REPLACE FUNCTION ensure_papers_for_hf_ids(
    p_hf_paper_ids TEXT[],
    p_titles TEXT[] DEFAULT NULL,
    p_years INT[] DEFAULT NULL,
    p_conferences TEXT[] DEFAULT NULL
)
RETURNS TABLE (hf_paper_id TEXT, paper_uuid UUID) AS $$
DECLARE
    i INT;
    _title TEXT;
    _year INT;
    _conference TEXT;
    _uuid UUID;
BEGIN
    FOR i IN 1..array_length(p_hf_paper_ids, 1) LOOP
        _title = CASE WHEN p_titles IS NOT NULL AND i <= array_length(p_titles, 1) THEN p_titles[i] ELSE '' END;
        _year = CASE WHEN p_years IS NOT NULL AND i <= array_length(p_years, 1) THEN p_years[i] ELSE NULL END;
        _conference = CASE WHEN p_conferences IS NOT NULL AND i <= array_length(p_conferences, 1) THEN p_conferences[i] ELSE NULL END;

        _uuid = ensure_paper_for_hf_id(p_hf_paper_ids[i], _title, _year, _conference);

        hf_paper_id = p_hf_paper_ids[i];
        paper_uuid = _uuid;
        RETURN NEXT;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- 5. Grant permissions
GRANT EXECUTE ON FUNCTION ensure_paper_for_hf_id TO authenticated;
GRANT EXECUTE ON FUNCTION ensure_paper_for_hf_id TO service_role;
GRANT EXECUTE ON FUNCTION ensure_papers_for_hf_ids TO authenticated;
GRANT EXECUTE ON FUNCTION ensure_papers_for_hf_ids TO service_role;

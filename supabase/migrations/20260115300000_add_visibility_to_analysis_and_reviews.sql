-- Add visibility column to paper_analysis and paper_reviews tables
-- Allows users to share their analyses and reviews publicly

-- ============================================================================
-- 1. Add visibility column to paper_analysis
-- ============================================================================

ALTER TABLE paper_analysis
ADD COLUMN IF NOT EXISTS visibility VARCHAR(20) DEFAULT 'private' CHECK (visibility IN ('private', 'public'));

-- Add index for efficient public content queries
CREATE INDEX IF NOT EXISTS idx_paper_analysis_visibility ON paper_analysis(visibility);

-- ============================================================================
-- 2. Add visibility column to paper_reviews
-- ============================================================================

ALTER TABLE paper_reviews
ADD COLUMN IF NOT EXISTS visibility VARCHAR(20) DEFAULT 'private' CHECK (visibility IN ('private', 'public'));

-- Add index for efficient public content queries
CREATE INDEX IF NOT EXISTS idx_paper_reviews_visibility ON paper_reviews(visibility);

-- ============================================================================
-- 3. Update RLS policies for paper_analysis
-- ============================================================================

-- Drop existing view policy and recreate with public visibility support
DROP POLICY IF EXISTS "Users can view analyses they have access to" ON paper_analysis;

CREATE POLICY "Users can view analyses they have access to"
ON paper_analysis FOR SELECT
USING (
    -- Public analyses visible to all authenticated users
    visibility = 'public'
    OR
    -- Creator can always see their own
    created_by = auth.uid()
    OR
    -- Community member access (existing logic)
    (community_id IS NOT NULL AND EXISTS (
        SELECT 1 FROM community_members
        WHERE community_members.community_id = paper_analysis.community_id
        AND community_members.user_id = auth.uid()
    ))
    OR
    -- Session access (existing logic)
    (session_id IS NOT NULL AND EXISTS (
        SELECT 1 FROM sessions s
        WHERE s.id = paper_analysis.session_id
        AND (
            s.visibility = 'public'
            OR s.created_by = auth.uid()
            OR s.presenter_id = auth.uid()
            OR EXISTS (
                SELECT 1 FROM community_members cm
                WHERE cm.community_id = s.community_id
                AND cm.user_id = auth.uid()
            )
        )
    ))
);

-- Policy for updating visibility (owner only)
DROP POLICY IF EXISTS "Users can update their own analyses" ON paper_analysis;

CREATE POLICY "Users can update their own analyses"
ON paper_analysis FOR UPDATE
USING (created_by = auth.uid())
WITH CHECK (created_by = auth.uid());

-- ============================================================================
-- 4. Update RLS policies for paper_reviews
-- ============================================================================

-- Drop existing view policy and recreate with public visibility support
DROP POLICY IF EXISTS "Users can view reviews in their communities" ON paper_reviews;

CREATE POLICY "Users can view reviews they have access to"
ON paper_reviews FOR SELECT
USING (
    -- Public reviews visible to all authenticated users
    visibility = 'public'
    OR
    -- Creator can always see their own
    created_by = auth.uid()
    OR
    -- Community member access (existing logic)
    (community_id IS NOT NULL AND EXISTS (
        SELECT 1 FROM community_members
        WHERE community_members.community_id = paper_reviews.community_id
        AND community_members.user_id = auth.uid()
    ))
    OR
    -- Legacy: NULL community_id (system-created) visible to all
    (community_id IS NULL AND created_by IS NULL)
);

-- Policy for updating visibility (owner only)
DROP POLICY IF EXISTS "Users can update their own reviews" ON paper_reviews;

CREATE POLICY "Users can update their own reviews"
ON paper_reviews FOR UPDATE
USING (created_by = auth.uid() OR created_by IS NULL)
WITH CHECK (created_by = auth.uid() OR created_by IS NULL);

-- ============================================================================
-- 5. Create views for public content discovery
-- ============================================================================

-- View for public analyses with paper info
CREATE OR REPLACE VIEW public_analyses AS
SELECT
    pa.id,
    pa.paper_id,
    pa.analysis_data,
    pa.markdown_summary,
    pa.mindmap_mermaid,
    pa.concepts_count,
    pa.methods_count,
    pa.created_by,
    pa.created_at,
    p.title as paper_title,
    p.authors as paper_authors,
    p.arxiv_id,
    pr.display_name as creator_name,
    pr.avatar_url as creator_avatar
FROM paper_analysis pa
JOIN papers p ON p.id = pa.paper_id
LEFT JOIN profiles pr ON pr.id = pa.created_by
WHERE pa.visibility = 'public';

-- View for public reviews with paper info
CREATE OR REPLACE VIEW public_reviews AS
SELECT
    pr.id,
    pr.paper_id,
    pr.review_data,
    pr.graph_data,
    pr.lineage_data,
    pr.created_by,
    pr.created_at,
    p.title as paper_title,
    p.authors as paper_authors,
    p.arxiv_id,
    pf.display_name as creator_name,
    pf.avatar_url as creator_avatar
FROM paper_reviews pr
JOIN papers p ON p.id = pr.paper_id
LEFT JOIN profiles pf ON pf.id = pr.created_by
WHERE pr.visibility = 'public';

-- Grant access to views
GRANT SELECT ON public_analyses TO authenticated;
GRANT SELECT ON public_reviews TO authenticated;

-- ============================================================================
-- 6. Add comment for documentation
-- ============================================================================

COMMENT ON COLUMN paper_analysis.visibility IS 'Controls who can see this analysis: private (creator only), public (all users)';
COMMENT ON COLUMN paper_reviews.visibility IS 'Controls who can see this review: private (creator only), public (all users)';

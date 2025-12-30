-- Paper Engagement Migration
-- Adds likes, views, saves, and discussion tracking for papers

-- Paper engagement tracking (likes, views, saves)
CREATE TABLE IF NOT EXISTS paper_engagement (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  paper_id UUID REFERENCES papers(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  engagement_type TEXT CHECK (engagement_type IN ('like', 'view', 'save')) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(paper_id, user_id, engagement_type)
);

-- Paper discussions/comments
CREATE TABLE IF NOT EXISTS paper_discussions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  paper_id UUID REFERENCES papers(id) ON DELETE CASCADE,
  community_id UUID REFERENCES communities(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  parent_id UUID REFERENCES paper_discussions(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_edited BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add thumbnail_url to papers if it doesn't exist
ALTER TABLE papers ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;

-- Add view count cache to papers for performance
ALTER TABLE papers ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;
ALTER TABLE papers ADD COLUMN IF NOT EXISTS like_count INTEGER DEFAULT 0;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_paper_engagement_paper ON paper_engagement(paper_id);
CREATE INDEX IF NOT EXISTS idx_paper_engagement_user ON paper_engagement(user_id);
CREATE INDEX IF NOT EXISTS idx_paper_engagement_type ON paper_engagement(engagement_type);
CREATE INDEX IF NOT EXISTS idx_paper_discussions_paper ON paper_discussions(paper_id);
CREATE INDEX IF NOT EXISTS idx_paper_discussions_community ON paper_discussions(community_id);
CREATE INDEX IF NOT EXISTS idx_paper_discussions_user ON paper_discussions(user_id);
CREATE INDEX IF NOT EXISTS idx_paper_discussions_parent ON paper_discussions(parent_id);

-- RLS Policies for paper_engagement

ALTER TABLE paper_engagement ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view engagement"
  ON paper_engagement FOR SELECT
  USING (true);

CREATE POLICY "Users can manage their own engagement"
  ON paper_engagement FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for paper_discussions

ALTER TABLE paper_discussions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view discussions for accessible papers"
  ON paper_discussions FOR SELECT
  USING (
    -- Public papers or community papers user has access to
    EXISTS (
      SELECT 1 FROM papers p
      WHERE p.id = paper_discussions.paper_id
    )
  );

CREATE POLICY "Authenticated users can create discussions"
  ON paper_discussions FOR INSERT
  WITH CHECK (
    auth.uid() = user_id AND
    -- Can only comment on papers in communities they're part of
    (
      community_id IS NULL OR
      EXISTS (
        SELECT 1 FROM community_members cm
        WHERE cm.community_id = paper_discussions.community_id
        AND cm.user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can update their own discussions"
  ON paper_discussions FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own discussions"
  ON paper_discussions FOR DELETE
  USING (auth.uid() = user_id);

-- Function to get paper engagement stats
CREATE OR REPLACE FUNCTION get_paper_engagement_stats(p_paper_id UUID)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'likes', COUNT(*) FILTER (WHERE engagement_type = 'like'),
    'views', COUNT(*) FILTER (WHERE engagement_type = 'view'),
    'saves', COUNT(*) FILTER (WHERE engagement_type = 'save')
  ) INTO result
  FROM paper_engagement
  WHERE paper_id = p_paper_id;

  RETURN COALESCE(result, '{"likes": 0, "views": 0, "saves": 0}'::json);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get discussion count for a paper
CREATE OR REPLACE FUNCTION get_paper_discussion_count(p_paper_id UUID, p_community_id UUID DEFAULT NULL)
RETURNS INTEGER AS $$
DECLARE
  count INTEGER;
BEGIN
  SELECT COUNT(*) INTO count
  FROM paper_discussions
  WHERE paper_id = p_paper_id
  AND (p_community_id IS NULL OR community_id = p_community_id);

  RETURN COALESCE(count, 0);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to toggle engagement (like/save)
CREATE OR REPLACE FUNCTION toggle_paper_engagement(
  p_paper_id UUID,
  p_user_id UUID,
  p_engagement_type TEXT
)
RETURNS BOOLEAN AS $$
DECLARE
  existing_id UUID;
  new_state BOOLEAN;
BEGIN
  -- Check if engagement exists
  SELECT id INTO existing_id
  FROM paper_engagement
  WHERE paper_id = p_paper_id
  AND user_id = p_user_id
  AND engagement_type = p_engagement_type;

  IF existing_id IS NOT NULL THEN
    -- Remove engagement
    DELETE FROM paper_engagement WHERE id = existing_id;
    new_state := FALSE;
  ELSE
    -- Add engagement
    INSERT INTO paper_engagement (paper_id, user_id, engagement_type)
    VALUES (p_paper_id, p_user_id, p_engagement_type);
    new_state := TRUE;
  END IF;

  -- Update cached counts
  IF p_engagement_type = 'like' THEN
    UPDATE papers
    SET like_count = (
      SELECT COUNT(*) FROM paper_engagement
      WHERE paper_id = p_paper_id AND engagement_type = 'like'
    )
    WHERE id = p_paper_id;
  ELSIF p_engagement_type = 'view' THEN
    UPDATE papers
    SET view_count = (
      SELECT COUNT(*) FROM paper_engagement
      WHERE paper_id = p_paper_id AND engagement_type = 'view'
    )
    WHERE id = p_paper_id;
  END IF;

  RETURN new_state;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update discussion count cache
CREATE OR REPLACE FUNCTION update_discussion_count()
RETURNS TRIGGER AS $$
BEGIN
  -- Update would go here if we add a discussion_count cache column
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to set updated_at on discussion edits
CREATE OR REPLACE FUNCTION update_discussion_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  NEW.is_edited = TRUE;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_discussion_timestamp_trigger
  BEFORE UPDATE ON paper_discussions
  FOR EACH ROW
  EXECUTE FUNCTION update_discussion_timestamp();

COMMENT ON TABLE paper_engagement IS 'Tracks user engagement with papers (likes, views, saves)';
COMMENT ON TABLE paper_discussions IS 'Comments and discussions on papers within communities';
COMMENT ON FUNCTION get_paper_engagement_stats IS 'Returns engagement statistics for a paper';
COMMENT ON FUNCTION get_paper_discussion_count IS 'Returns discussion count for a paper';
COMMENT ON FUNCTION toggle_paper_engagement IS 'Toggles like/save engagement for a paper';

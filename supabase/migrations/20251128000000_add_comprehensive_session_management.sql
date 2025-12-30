-- Comprehensive Session Management Migration
-- Adds session lineage, RSVPs, presenters, and papers

-- Add fields to sessions table for lineage tracking
ALTER TABLE sessions
  ADD COLUMN IF NOT EXISTS parent_session_id UUID REFERENCES sessions(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS introduction TEXT,
  ADD COLUMN IF NOT EXISTS related_works JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS recording_url TEXT;

-- Session relationships/edges for lineage tracking
CREATE TABLE IF NOT EXISTS session_edges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  target_session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  relationship_type TEXT CHECK (relationship_type IN ('continues', 'extends', 'relates_to', 'builds_on')) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  UNIQUE(source_session_id, target_session_id, relationship_type)
);

-- Session RSVPs and attendance tracking
CREATE TABLE IF NOT EXISTS session_rsvps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('going', 'maybe', 'not_going')) NOT NULL,
  checked_in BOOLEAN DEFAULT FALSE,
  checked_in_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(session_id, user_id)
);

-- Session presenters (multiple presenters supported)
CREATE TABLE IF NOT EXISTS session_presenters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  is_primary BOOLEAN DEFAULT FALSE,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(session_id, user_id)
);

-- Session papers (link papers to sessions with ordering)
CREATE TABLE IF NOT EXISTS session_papers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  paper_id UUID REFERENCES papers(id) ON DELETE CASCADE,
  order_index INTEGER DEFAULT 0,
  discussion_leader UUID REFERENCES profiles(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(session_id, paper_id)
);

-- Session resources (additional materials)
CREATE TABLE IF NOT EXISTS session_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  resource_type TEXT CHECK (resource_type IN ('slides', 'code', 'dataset', 'video', 'other')),
  description TEXT,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_session_edges_source ON session_edges(source_session_id);
CREATE INDEX IF NOT EXISTS idx_session_edges_target ON session_edges(target_session_id);
CREATE INDEX IF NOT EXISTS idx_session_rsvps_session ON session_rsvps(session_id);
CREATE INDEX IF NOT EXISTS idx_session_rsvps_user ON session_rsvps(user_id);
CREATE INDEX IF NOT EXISTS idx_session_presenters_session ON session_presenters(session_id);
CREATE INDEX IF NOT EXISTS idx_session_presenters_user ON session_presenters(user_id);
CREATE INDEX IF NOT EXISTS idx_session_papers_session ON session_papers(session_id);
CREATE INDEX IF NOT EXISTS idx_session_papers_paper ON session_papers(paper_id);
CREATE INDEX IF NOT EXISTS idx_sessions_parent ON sessions(parent_session_id);

-- RLS Policies

-- Session edges: Anyone in the community can view, only admins/presenters can create
ALTER TABLE session_edges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view session edges"
  ON session_edges FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create session edges"
  ON session_edges FOR INSERT
  WITH CHECK (auth.uid() = created_by);

-- Session RSVPs: Users can manage their own RSVPs, admins can view all
ALTER TABLE session_rsvps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view RSVPs for sessions they have access to"
  ON session_rsvps FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM sessions s
      LEFT JOIN communities c ON s.community_id = c.id
      WHERE s.id = session_rsvps.session_id
      AND (
        s.community_id IS NULL OR
        c.is_public = true OR
        EXISTS (
          SELECT 1 FROM community_members cm
          WHERE cm.community_id = s.community_id
          AND cm.user_id = auth.uid()
        )
      )
    )
  );

CREATE POLICY "Users can manage their own RSVPs"
  ON session_rsvps FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Session presenters: Anyone can view, admins can assign
ALTER TABLE session_presenters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view session presenters"
  ON session_presenters FOR SELECT
  USING (true);

CREATE POLICY "Community admins can manage presenters"
  ON session_presenters FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM sessions s
      JOIN communities c ON s.community_id = c.id
      JOIN community_members cm ON cm.community_id = c.id
      WHERE s.id = session_presenters.session_id
      AND cm.user_id = auth.uid()
      AND cm.role = 'admin'
    )
  );

-- Session papers: Anyone can view, admins/presenters can manage
ALTER TABLE session_papers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view session papers"
  ON session_papers FOR SELECT
  USING (true);

CREATE POLICY "Admins and presenters can manage session papers"
  ON session_papers FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM sessions s
      LEFT JOIN communities c ON s.community_id = c.id
      LEFT JOIN community_members cm ON cm.community_id = c.id AND cm.user_id = auth.uid()
      LEFT JOIN session_presenters sp ON sp.session_id = s.id AND sp.user_id = auth.uid()
      WHERE s.id = session_papers.session_id
      AND (cm.role = 'admin' OR sp.user_id IS NOT NULL)
    )
  );

-- Session resources: Anyone can view, admins/presenters can add
ALTER TABLE session_resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view session resources"
  ON session_resources FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can add resources"
  ON session_resources FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Resource creators can update their resources"
  ON session_resources FOR UPDATE
  USING (auth.uid() = created_by);

CREATE POLICY "Resource creators and admins can delete resources"
  ON session_resources FOR DELETE
  USING (
    auth.uid() = created_by OR
    EXISTS (
      SELECT 1 FROM sessions s
      JOIN communities c ON s.community_id = c.id
      JOIN community_members cm ON cm.community_id = c.id
      WHERE s.id = session_resources.session_id
      AND cm.user_id = auth.uid()
      AND cm.role = 'admin'
    )
  );

-- Functions for attendance statistics
CREATE OR REPLACE FUNCTION get_session_attendance_stats(p_session_id UUID)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'total_rsvps', COUNT(*),
    'going', COUNT(*) FILTER (WHERE status = 'going'),
    'maybe', COUNT(*) FILTER (WHERE status = 'maybe'),
    'not_going', COUNT(*) FILTER (WHERE status = 'not_going'),
    'checked_in', COUNT(*) FILTER (WHERE checked_in = true)
  ) INTO result
  FROM session_rsvps
  WHERE session_id = p_session_id;

  RETURN COALESCE(result, '{}'::json);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get session lineage (ancestors and descendants)
CREATE OR REPLACE FUNCTION get_session_lineage(p_session_id UUID)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  WITH RECURSIVE lineage AS (
    -- Get current session
    SELECT id, title, parent_session_id, 0 as depth, 'current' as relation
    FROM sessions
    WHERE id = p_session_id

    UNION ALL

    -- Get ancestors (parent sessions)
    SELECT s.id, s.title, s.parent_session_id, l.depth - 1, 'ancestor'
    FROM sessions s
    JOIN lineage l ON s.id = l.parent_session_id
    WHERE l.depth > -10  -- Limit depth

    UNION ALL

    -- Get descendants (child sessions)
    SELECT s.id, s.title, s.parent_session_id, l.depth + 1, 'descendant'
    FROM sessions s
    JOIN lineage l ON s.parent_session_id = l.id
    WHERE l.depth < 10  -- Limit depth
  )
  SELECT json_agg(json_build_object(
    'id', id,
    'title', title,
    'parent_session_id', parent_session_id,
    'depth', depth,
    'relation', relation
  )) INTO result
  FROM lineage
  WHERE id != p_session_id;

  RETURN COALESCE(result, '[]'::json);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON TABLE session_edges IS 'Tracks relationships between sessions for lineage visualization';
COMMENT ON TABLE session_rsvps IS 'Tracks member RSVPs and attendance for sessions';
COMMENT ON TABLE session_presenters IS 'Tracks who is presenting at each session';
COMMENT ON TABLE session_papers IS 'Links papers to sessions for discussion';
COMMENT ON TABLE session_resources IS 'Additional resources for sessions (slides, code, etc.)';

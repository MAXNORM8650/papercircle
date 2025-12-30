-- Create community_papers table for tracking which papers belong to which communities
-- This is a junction table between papers and communities

CREATE TABLE IF NOT EXISTS community_papers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  paper_id UUID REFERENCES papers(id) ON DELETE CASCADE NOT NULL,
  community_id UUID REFERENCES communities(id) ON DELETE CASCADE NOT NULL,
  added_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(paper_id, community_id)
);

-- Enable RLS
ALTER TABLE community_papers ENABLE ROW LEVEL SECURITY;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_community_papers_paper_id ON community_papers(paper_id);
CREATE INDEX IF NOT EXISTS idx_community_papers_community_id ON community_papers(community_id);
CREATE INDEX IF NOT EXISTS idx_community_papers_added_by ON community_papers(added_by);

-- RLS Policies

-- Anyone can view community papers if they're in the community
CREATE POLICY "Users can view papers in their communities"
  ON community_papers FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM community_members
      WHERE community_members.community_id = community_papers.community_id
      AND community_members.user_id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM communities
      WHERE communities.id = community_papers.community_id
      AND communities.is_public = true
    )
  );

-- Community members can add papers
CREATE POLICY "Community members can add papers"
  ON community_papers FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM community_members
      WHERE community_members.community_id = community_papers.community_id
      AND community_members.user_id = auth.uid()
    )
    AND
    added_by = auth.uid()
  );

-- Users can remove papers they added, or admins can remove any
CREATE POLICY "Users can remove papers they added or admins can remove any"
  ON community_papers FOR DELETE
  TO authenticated
  USING (
    added_by = auth.uid()
    OR
    EXISTS (
      SELECT 1 FROM community_members
      WHERE community_members.community_id = community_papers.community_id
      AND community_members.user_id = auth.uid()
      AND community_members.role = 'admin'
    )
  );

-- Add helpful comment
COMMENT ON TABLE community_papers IS 'Junction table linking papers to communities';

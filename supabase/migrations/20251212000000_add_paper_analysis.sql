/*
  # Paper Analysis Storage

  ## Overview
  Adds support for storing paper mind graph analysis results.
  This allows storing structured analysis of papers including concepts,
  methods, experiments, visualizations, and Q&A data.

  ## New Tables

  1. `paper_analysis`
    - Stores mind graph analysis for each paper
    - Links to papers, optionally to communities and sessions
    - Contains JSON data, markdown, mermaid diagrams, and HTML viz
    - Tracks analysis metadata and statistics

  ## Changes

  1. Tables
    - Create paper_analysis table
    - Create indexes for performance

  2. Security
    - RLS policies for paper_analysis
*/

-- Create paper_analysis table
CREATE TABLE IF NOT EXISTS paper_analysis (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  paper_id uuid REFERENCES papers(id) ON DELETE CASCADE NOT NULL,
  community_id uuid REFERENCES communities(id) ON DELETE CASCADE,
  session_id uuid REFERENCES sessions(id) ON DELETE CASCADE,

  -- Analysis data (from paper_mind_graph)
  analysis_data jsonb NOT NULL,              -- Full JSON graph data
  markdown_summary text,                      -- Markdown structured notes
  mindmap_mermaid text,                       -- Mermaid mind map
  flowchart_mermaid text,                     -- Mermaid flowchart
  html_visualization text,                    -- Interactive HTML visualization

  -- Statistics
  concepts_count int DEFAULT 0,
  methods_count int DEFAULT 0,
  experiments_count int DEFAULT 0,
  figures_count int DEFAULT 0,
  tables_count int DEFAULT 0,
  nodes_count int DEFAULT 0,
  edges_count int DEFAULT 0,

  -- Metadata
  analysis_version text DEFAULT '1.0',
  processing_time_seconds float,
  created_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),

  -- Ensure one analysis per paper per context (community/session)
  UNIQUE(paper_id, community_id, session_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_paper_analysis_paper_id ON paper_analysis(paper_id);
CREATE INDEX IF NOT EXISTS idx_paper_analysis_community_id ON paper_analysis(community_id);
CREATE INDEX IF NOT EXISTS idx_paper_analysis_session_id ON paper_analysis(session_id);
CREATE INDEX IF NOT EXISTS idx_paper_analysis_created_at ON paper_analysis(created_at);

-- Add GIN index for JSONB queries
CREATE INDEX IF NOT EXISTS idx_paper_analysis_data ON paper_analysis USING GIN (analysis_data);

-- Enable RLS
ALTER TABLE paper_analysis ENABLE ROW LEVEL SECURITY;

-- RLS Policies for paper_analysis

-- Anyone authenticated can view analysis for papers they have access to
CREATE POLICY "View paper analysis"
  ON paper_analysis FOR SELECT
  TO authenticated
  USING (
    -- Paper is in a community the user is a member of
    (community_id IS NOT NULL AND EXISTS (
      SELECT 1 FROM community_members cm
      WHERE cm.community_id = paper_analysis.community_id
      AND cm.user_id = auth.uid()
    ))
    OR
    -- Paper is in a session the user has access to
    (session_id IS NOT NULL AND EXISTS (
      SELECT 1 FROM sessions s
      WHERE s.id = paper_analysis.session_id
      AND (
        s.visibility = 'public' OR
        s.created_by = auth.uid() OR
        s.presenter_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM community_members cm
          WHERE cm.community_id = s.community_id
          AND cm.user_id = auth.uid()
        )
      )
    ))
    OR
    -- No specific context - user created it
    (community_id IS NULL AND session_id IS NULL AND created_by = auth.uid())
  );

-- Community members can create analysis for papers in their community
CREATE POLICY "Create paper analysis"
  ON paper_analysis FOR INSERT
  TO authenticated
  WITH CHECK (
    created_by = auth.uid() AND
    (
      -- For community papers
      (community_id IS NOT NULL AND EXISTS (
        SELECT 1 FROM community_members cm
        WHERE cm.community_id = paper_analysis.community_id
        AND cm.user_id = auth.uid()
      ))
      OR
      -- For session papers
      (session_id IS NOT NULL AND EXISTS (
        SELECT 1 FROM sessions s
        WHERE s.id = paper_analysis.session_id
        AND (
          s.created_by = auth.uid() OR
          s.presenter_id = auth.uid() OR
          EXISTS (
            SELECT 1 FROM community_members cm
            WHERE cm.community_id = s.community_id
            AND cm.user_id = auth.uid()
          )
        )
      ))
      OR
      -- For personal analysis
      (community_id IS NULL AND session_id IS NULL)
    )
  );

-- Only creator can update analysis
CREATE POLICY "Update paper analysis"
  ON paper_analysis FOR UPDATE
  TO authenticated
  USING (created_by = auth.uid());

-- Only creator can delete analysis
CREATE POLICY "Delete paper analysis"
  ON paper_analysis FOR DELETE
  TO authenticated
  USING (created_by = auth.uid());

-- Trigger for updated_at
DROP TRIGGER IF EXISTS update_paper_analysis_updated_at ON paper_analysis;
CREATE TRIGGER update_paper_analysis_updated_at
  BEFORE UPDATE ON paper_analysis
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to get or create analysis
CREATE OR REPLACE FUNCTION get_or_create_analysis_id(
  p_paper_id uuid,
  p_community_id uuid DEFAULT NULL,
  p_session_id uuid DEFAULT NULL,
  p_user_id uuid DEFAULT NULL
)
RETURNS uuid AS $$
DECLARE
  v_analysis_id uuid;
BEGIN
  -- Try to find existing analysis
  SELECT id INTO v_analysis_id
  FROM paper_analysis
  WHERE paper_id = p_paper_id
    AND (community_id IS NOT DISTINCT FROM p_community_id)
    AND (session_id IS NOT DISTINCT FROM p_session_id);

  -- If not found, return NULL (will be created by INSERT)
  RETURN v_analysis_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

/*
  # Session Papers and Resources

  ## Overview
  Adds support for multiple papers per session and session resources/materials.
  This allows presenters to prepare sessions by adding main papers, related papers,
  notes, slides, and other resources before presenting.

  ## New Tables

  1. `session_papers`
    - Links multiple papers to a session
    - Tracks paper type (main, related, background)
    - Stores presenter notes for each paper
    - Tracks reading order/priority

  2. `session_resources`
    - Stores links to slides, recordings, notes, etc.
    - Supports multiple resource types
    - Tracks upload/creation dates

  ## Changes

  1. Tables
    - Create session_papers table
    - Create session_resources table
    - Add preparation_status to sessions

  2. Security
    - RLS policies for session_papers
    - RLS policies for session_resources
*/

-- Add preparation status to sessions
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'sessions' AND column_name = 'preparation_status'
  ) THEN
    ALTER TABLE sessions ADD COLUMN preparation_status text DEFAULT 'draft' CHECK (preparation_status IN ('draft', 'preparing', 'ready', 'completed'));
  END IF;
END $$;

-- Create session_papers table
CREATE TABLE IF NOT EXISTS session_papers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES sessions(id) ON DELETE CASCADE NOT NULL,
  paper_id uuid REFERENCES papers(id) ON DELETE CASCADE NOT NULL,
  paper_type text NOT NULL CHECK (paper_type IN ('main', 'related', 'background', 'followup')),
  display_order int DEFAULT 0,
  presenter_notes text,
  sections_to_cover jsonb DEFAULT '[]',
  estimated_time_minutes int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(session_id, paper_id)
);

-- Create session_resources table
CREATE TABLE IF NOT EXISTS session_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES sessions(id) ON DELETE CASCADE NOT NULL,
  resource_type text NOT NULL CHECK (resource_type IN ('slides', 'notes', 'recording', 'code', 'dataset', 'other')),
  title text NOT NULL,
  description text,
  url text,
  file_path text,
  created_by uuid REFERENCES profiles(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE session_papers ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_resources ENABLE ROW LEVEL SECURITY;

-- RLS Policies for session_papers

-- Anyone can view papers for public sessions or sessions they're involved in
CREATE POLICY "View session papers"
  ON session_papers FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM sessions s
      WHERE s.id = session_papers.session_id
      AND (
        s.visibility = 'public' OR
        s.created_by = auth.uid() OR
        s.presenter_id = auth.uid()
      )
    )
  );

-- Session creators and presenters can add papers
CREATE POLICY "Add papers to session"
  ON session_papers FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM sessions s
      WHERE s.id = session_papers.session_id
      AND (s.created_by = auth.uid() OR s.presenter_id = auth.uid())
    )
  );

-- Session creators and presenters can update papers
CREATE POLICY "Update session papers"
  ON session_papers FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM sessions s
      WHERE s.id = session_papers.session_id
      AND (s.created_by = auth.uid() OR s.presenter_id = auth.uid())
    )
  );

-- Session creators and presenters can remove papers
CREATE POLICY "Delete session papers"
  ON session_papers FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM sessions s
      WHERE s.id = session_papers.session_id
      AND (s.created_by = auth.uid() OR s.presenter_id = auth.uid())
    )
  );

-- RLS Policies for session_resources

-- Anyone can view resources for public sessions or sessions they're involved in
CREATE POLICY "View session resources"
  ON session_resources FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM sessions s
      WHERE s.id = session_resources.session_id
      AND (
        s.visibility = 'public' OR
        s.created_by = auth.uid() OR
        s.presenter_id = auth.uid()
      )
    )
  );

-- Session creators and presenters can add resources
CREATE POLICY "Add resources to session"
  ON session_resources FOR INSERT
  TO authenticated
  WITH CHECK (
    created_by = auth.uid() AND
    EXISTS (
      SELECT 1 FROM sessions s
      WHERE s.id = session_resources.session_id
      AND (s.created_by = auth.uid() OR s.presenter_id = auth.uid())
    )
  );

-- Resource creators can update their resources
CREATE POLICY "Update session resources"
  ON session_resources FOR UPDATE
  TO authenticated
  USING (created_by = auth.uid());

-- Resource creators can delete their resources
CREATE POLICY "Delete session resources"
  ON session_resources FOR DELETE
  TO authenticated
  USING (created_by = auth.uid());

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_session_papers_session_id ON session_papers(session_id);
CREATE INDEX IF NOT EXISTS idx_session_papers_paper_id ON session_papers(paper_id);
CREATE INDEX IF NOT EXISTS idx_session_papers_type ON session_papers(paper_type);
CREATE INDEX IF NOT EXISTS idx_session_resources_session_id ON session_resources(session_id);
CREATE INDEX IF NOT EXISTS idx_session_resources_type ON session_resources(resource_type);

-- Update function for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_session_papers_updated_at ON session_papers;
CREATE TRIGGER update_session_papers_updated_at
  BEFORE UPDATE ON session_papers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_session_resources_updated_at ON session_resources;
CREATE TRIGGER update_session_resources_updated_at
  BEFORE UPDATE ON session_resources
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

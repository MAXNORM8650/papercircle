/*
  # Session Presenters Enhancement

  ## Overview
  Adds presenter details fields to sessions table to track who is presenting
  and automatically creates the community creator as an admin member.

  ## Schema Updates
  
  1. Sessions table enhancements
    - `presenter_name` (text) - Name of the presenter
    - `presenter_email` (text) - Email of the presenter
    - `presenter_bio` (text) - Bio/description of presenter
    - `co_presenters` (jsonb) - Array of co-presenter details
  
  2. Functions
    - Trigger to auto-add community creator as admin
    - Function to update session presenter info
*/

-- Add presenter detail fields to sessions
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'sessions' AND column_name = 'presenter_name'
  ) THEN
    ALTER TABLE sessions ADD COLUMN presenter_name text;
    ALTER TABLE sessions ADD COLUMN presenter_email text;
    ALTER TABLE sessions ADD COLUMN presenter_bio text;
    ALTER TABLE sessions ADD COLUMN co_presenters jsonb DEFAULT '[]';
  END IF;
END $$;

-- Function to automatically add community creator as admin
CREATE OR REPLACE FUNCTION add_creator_as_admin()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert the creator as an admin member
  INSERT INTO community_members (community_id, user_id, role)
  VALUES (NEW.id, NEW.created_by, 'admin')
  ON CONFLICT (community_id, user_id) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to add creator as admin when community is created
DROP TRIGGER IF EXISTS add_community_creator_as_admin ON communities;
CREATE TRIGGER add_community_creator_as_admin
AFTER INSERT ON communities
FOR EACH ROW
WHEN (NEW.created_by IS NOT NULL)
EXECUTE FUNCTION add_creator_as_admin();

-- Update sessions INSERT policy to allow community members
DROP POLICY IF EXISTS "Admins and presenters can create sessions" ON sessions;

CREATE POLICY "Community members can create sessions"
  ON sessions FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = created_by AND
    (
      community_id IS NULL OR
      EXISTS (
        SELECT 1 FROM community_members
        WHERE community_members.community_id = sessions.community_id
        AND community_members.user_id = auth.uid()
      )
    )
  );

-- Update sessions UPDATE policy
DROP POLICY IF EXISTS "Session creators can update sessions" ON sessions;

CREATE POLICY "Session creators and community admins can update sessions"
  ON sessions FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = created_by OR
    auth.uid() = presenter_id OR
    EXISTS (
      SELECT 1 FROM community_members
      WHERE community_members.community_id = sessions.community_id
      AND community_members.user_id = auth.uid()
      AND community_members.role = 'admin'
    )
  );

-- Create indexes for presenter fields
CREATE INDEX IF NOT EXISTS idx_sessions_presenter_email ON sessions(presenter_email);
CREATE INDEX IF NOT EXISTS idx_sessions_presenter_id ON sessions(presenter_id);

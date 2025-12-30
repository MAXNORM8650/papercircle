-- Fix session delete permissions to include presenters
-- The update policy already allows presenters, but delete doesn't
-- This allows presenters to delete their sessions

-- Drop existing delete policy
DROP POLICY IF EXISTS "Session creator and circle admins can delete" ON sessions;

-- Recreate delete policy with presenter permission
CREATE POLICY "Session creator and circle admins can delete"
  ON sessions FOR DELETE
  TO authenticated
  USING (
    -- Session creator can delete
    auth.uid() = created_by OR
    -- Session presenter can delete
    auth.uid() = presenter_id OR
    -- Circle admin can delete
    EXISTS (
      SELECT 1 FROM community_members
      WHERE community_members.community_id = sessions.community_id
      AND community_members.user_id = auth.uid()
      AND community_members.role = 'admin'
    )
  );

-- Add helpful comment
COMMENT ON POLICY "Session creator and circle admins can delete" ON sessions IS
  'Allows session creators, presenters, and community admins to delete sessions';

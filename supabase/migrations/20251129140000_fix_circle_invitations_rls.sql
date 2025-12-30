-- Fix circle_invitations RLS to allow admins (not just creators) to create invitations

DROP POLICY IF EXISTS "Circle admins can create invitations" ON circle_invitations;

CREATE POLICY "Circle admins can create invitations"
  ON circle_invitations FOR INSERT
  TO authenticated
  WITH CHECK (
    created_by = auth.uid() AND
    (
      -- Community creator
      EXISTS (
        SELECT 1 FROM communities c
        WHERE c.id = circle_invitations.community_id
        AND c.created_by = auth.uid()
      )
      OR
      -- Community admin member
      EXISTS (
        SELECT 1 FROM community_members cm
        WHERE cm.community_id = circle_invitations.community_id
        AND cm.user_id = auth.uid()
        AND cm.role = 'admin'
      )
    )
  );

-- Also update the UPDATE and DELETE policies to allow admins
DROP POLICY IF EXISTS "Circle admins can update invitations" ON circle_invitations;

CREATE POLICY "Circle admins can update invitations"
  ON circle_invitations FOR UPDATE
  TO authenticated
  USING (
    -- Community creator
    EXISTS (
      SELECT 1 FROM communities c
      WHERE c.id = circle_invitations.community_id
      AND c.created_by = auth.uid()
    )
    OR
    -- Community admin member
    EXISTS (
      SELECT 1 FROM community_members cm
      WHERE cm.community_id = circle_invitations.community_id
      AND cm.user_id = auth.uid()
      AND cm.role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Circle admins can delete invitations" ON circle_invitations;

CREATE POLICY "Circle admins can delete invitations"
  ON circle_invitations FOR DELETE
  TO authenticated
  USING (
    -- Community creator
    EXISTS (
      SELECT 1 FROM communities c
      WHERE c.id = circle_invitations.community_id
      AND c.created_by = auth.uid()
    )
    OR
    -- Community admin member
    EXISTS (
      SELECT 1 FROM community_members cm
      WHERE cm.community_id = circle_invitations.community_id
      AND cm.user_id = auth.uid()
      AND cm.role = 'admin'
    )
  );

COMMENT ON POLICY "Circle admins can create invitations" ON circle_invitations IS 'Allow community creators and admin members to create invitations';

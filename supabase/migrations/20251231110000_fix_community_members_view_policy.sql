/*
  # Fix Community Members View Policy

  Updates the SELECT policy for community_members to allow members
  to view other members in circles they belong to, not just public
  circles or circles they created.
*/

-- Drop the restrictive view policy
DROP POLICY IF EXISTS "View community members" ON community_members;

-- Create new policy: Users can view members of communities they belong to OR public communities
CREATE POLICY "View community members"
  ON community_members FOR SELECT
  TO authenticated
  USING (
    -- Can view if community is public
    EXISTS (
      SELECT 1 FROM communities c
      WHERE c.id = community_members.community_id
      AND c.is_public = true
    )
    OR
    -- Can view if user is a member of the community
    EXISTS (
      SELECT 1 FROM community_members cm
      WHERE cm.community_id = community_members.community_id
      AND cm.user_id = auth.uid()
    )
  );

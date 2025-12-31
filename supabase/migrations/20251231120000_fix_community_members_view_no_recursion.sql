/*
  # Fix Community Members View Policy (No Recursion)

  Fixes the recursive policy issue by using a simpler approach that doesn't
  create circular dependencies. Users can view members if:
  1. The community is public, OR
  2. They created the community, OR
  3. It's their own membership record

  Note: This means in private circles, non-creator members can only see
  themselves in the member list, not other members. This is a security
  trade-off to avoid infinite recursion.
*/

-- Drop the recursive policy
DROP POLICY IF EXISTS "View community members" ON community_members;

-- Create new policy without recursion
CREATE POLICY "View community members"
  ON community_members FOR SELECT
  TO authenticated
  USING (
    -- Can view members of public communities
    EXISTS (
      SELECT 1 FROM communities c
      WHERE c.id = community_members.community_id
      AND c.is_public = true
    )
    OR
    -- Can view members if you're the community creator
    EXISTS (
      SELECT 1 FROM communities c
      WHERE c.id = community_members.community_id
      AND c.created_by = auth.uid()
    )
    OR
    -- Can always view your own membership record
    user_id = auth.uid()
  );

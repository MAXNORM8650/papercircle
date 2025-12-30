-- Fix RLS policy for community_papers to be less restrictive
-- The issue is that the policy is blocking legitimate inserts

-- Drop the old policy
DROP POLICY IF EXISTS "Community members can add papers" ON community_papers;

-- Create a simpler policy that allows authenticated users to add papers to communities they're members of
CREATE POLICY "Community members can add papers"
  ON community_papers FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = added_by
    AND
    (
      -- User is a member of the community
      EXISTS (
        SELECT 1 FROM community_members
        WHERE community_members.community_id = community_papers.community_id
        AND community_members.user_id = auth.uid()
      )
      OR
      -- OR the community is public (anyone can add papers to public communities)
      EXISTS (
        SELECT 1 FROM communities
        WHERE communities.id = community_papers.community_id
        AND communities.is_public = true
      )
    )
  );

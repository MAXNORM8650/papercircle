/*
  # Add Get Circle Members Function

  Creates a SECURITY DEFINER function to get circle members,
  bypassing RLS to avoid recursion issues.
*/

CREATE OR REPLACE FUNCTION get_circle_members(circle_id uuid)
RETURNS TABLE (
  id uuid,
  user_id uuid,
  role community_role,
  joined_at timestamptz,
  display_name text,
  avatar_url text,
  email text
) AS $$
BEGIN
  -- Check if user has permission to view members
  -- Allow if: circle is public, user is creator, or user is a member
  IF NOT (
    EXISTS (SELECT 1 FROM communities c WHERE c.id = circle_id AND c.is_public = true)
    OR
    EXISTS (SELECT 1 FROM communities c WHERE c.id = circle_id AND c.created_by = auth.uid())
    OR
    EXISTS (SELECT 1 FROM community_members cm WHERE cm.community_id = circle_id AND cm.user_id = auth.uid())
  ) THEN
    RAISE EXCEPTION 'Not authorized to view members of this circle';
  END IF;

  -- Return all members with their profile information
  RETURN QUERY
  SELECT
    cm.id,
    cm.user_id,
    cm.role,
    cm.joined_at,
    p.display_name,
    p.avatar_url,
    p.email
  FROM community_members cm
  LEFT JOIN profiles p ON p.id = cm.user_id
  WHERE cm.community_id = circle_id
  ORDER BY cm.joined_at;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION get_circle_members(uuid) TO authenticated;

COMMENT ON FUNCTION get_circle_members IS 'Get all members of a circle with their profiles (bypasses RLS to avoid recursion)';

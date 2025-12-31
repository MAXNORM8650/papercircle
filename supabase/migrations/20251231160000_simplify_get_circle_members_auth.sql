/*
  # Simplify Get Circle Members Authorization

  Temporarily simplify the authorization check to debug the issue.
  This version is more permissive for testing.
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
)
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  is_public boolean;
  v_user_id uuid;
BEGIN
  -- Get current user ID
  v_user_id := auth.uid();

  -- Check if circle is public
  SELECT c.is_public INTO is_public
  FROM communities c
  WHERE c.id = circle_id;

  -- For public circles, allow anyone authenticated to view
  -- For private circles, check if user is a member or creator
  IF NOT is_public THEN
    -- Check if user has any relationship to this circle
    IF NOT EXISTS (
      SELECT 1 FROM community_members cm
      WHERE cm.community_id = circle_id
      AND cm.user_id = v_user_id
    ) AND NOT EXISTS (
      SELECT 1 FROM communities c
      WHERE c.id = circle_id
      AND c.created_by = v_user_id
    ) THEN
      -- Return empty result instead of raising exception for better debugging
      RETURN;
    END IF;
  END IF;

  -- Return all members with their profile information
  RETURN QUERY
  SELECT
    cm.id,
    cm.user_id,
    cm.role,
    cm.joined_at,
    COALESCE(p.display_name, 'Unknown User') as display_name,
    p.avatar_url,
    p.email
  FROM community_members cm
  LEFT JOIN profiles p ON p.id = cm.user_id
  WHERE cm.community_id = circle_id
  ORDER BY cm.joined_at;
END;
$$ LANGUAGE plpgsql;

-- Ensure proper permissions
GRANT EXECUTE ON FUNCTION get_circle_members(uuid) TO authenticated;

COMMENT ON FUNCTION get_circle_members IS 'Get all members of a circle (simplified auth for debugging)';

/*
  # Fix Get Circle Members - Remove Email Column

  The profiles table doesn't have an email column.
  Remove it from the function's return type and query.
*/

-- Drop the existing function first since we're changing the return type
DROP FUNCTION IF EXISTS get_circle_members(uuid);

CREATE OR REPLACE FUNCTION get_circle_members(circle_id uuid)
RETURNS TABLE (
  id uuid,
  user_id uuid,
  role community_role,
  joined_at timestamptz,
  display_name text,
  avatar_url text
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

  -- Return all members with their profile information (no email)
  RETURN QUERY
  SELECT
    cm.id,
    cm.user_id,
    cm.role,
    cm.joined_at,
    COALESCE(p.display_name, 'Unknown User') as display_name,
    p.avatar_url
  FROM community_members cm
  LEFT JOIN profiles p ON p.id = cm.user_id
  WHERE cm.community_id = circle_id
  ORDER BY cm.joined_at;
END;
$$ LANGUAGE plpgsql;

-- Ensure proper permissions
GRANT EXECUTE ON FUNCTION get_circle_members(uuid) TO authenticated;

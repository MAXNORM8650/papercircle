/*
  # Fix Get Circle Members to Properly Bypass RLS

  The previous version still had RLS checks in the authorization logic.
  This version sets the search_path to bypass RLS entirely.
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
  is_creator boolean;
  is_member boolean;
BEGIN
  -- Check permissions without RLS interference
  -- These queries run as the function owner (SECURITY DEFINER)
  SELECT c.is_public, (c.created_by = auth.uid())
  INTO is_public, is_creator
  FROM communities c
  WHERE c.id = circle_id;

  -- Check if user is a member (this now bypasses RLS due to SECURITY DEFINER)
  SELECT EXISTS (
    SELECT 1 FROM community_members cm
    WHERE cm.community_id = circle_id
    AND cm.user_id = auth.uid()
  ) INTO is_member;

  -- Allow if: circle is public, user is creator, or user is a member
  IF NOT (is_public OR is_creator OR is_member) THEN
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
$$ LANGUAGE plpgsql;

-- Ensure proper permissions
GRANT EXECUTE ON FUNCTION get_circle_members(uuid) TO authenticated;

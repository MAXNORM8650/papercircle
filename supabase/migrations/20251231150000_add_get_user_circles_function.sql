/*
  # Add Get User Circles Function

  Creates a function to get all circles a user is a member of or created,
  bypassing RLS to avoid recursion issues.
*/

CREATE OR REPLACE FUNCTION get_user_circles()
RETURNS TABLE (
  id uuid,
  name text,
  description text,
  slug text,
  is_public boolean,
  avatar_url text,
  created_by uuid,
  created_at timestamptz,
  user_role community_role,
  member_count bigint
)
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Return all communities where the user is a member or creator
  RETURN QUERY
  SELECT
    c.id,
    c.name,
    c.description,
    c.slug,
    c.is_public,
    c.avatar_url,
    c.created_by,
    c.created_at,
    cm.role as user_role,
    (SELECT COUNT(*) FROM community_members cm2 WHERE cm2.community_id = c.id) as member_count
  FROM communities c
  LEFT JOIN community_members cm ON cm.community_id = c.id AND cm.user_id = auth.uid()
  WHERE cm.user_id = auth.uid() OR c.created_by = auth.uid()
  ORDER BY c.created_at DESC;
END;
$$ LANGUAGE plpgsql;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION get_user_circles() TO authenticated;

COMMENT ON FUNCTION get_user_circles IS 'Get all circles the current user is a member of or created (bypasses RLS)';

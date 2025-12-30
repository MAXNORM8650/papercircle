-- Function to get circle invitation details (bypasses RLS for public invitation viewing)
CREATE OR REPLACE FUNCTION get_circle_invitation_details(invitation_code TEXT)
RETURNS JSONB AS $$
DECLARE
  result JSONB;
BEGIN
  SELECT jsonb_build_object(
    'success', true,
    'invitation_id', ci.id,
    'community_id', ci.community_id,
    'role', ci.role,
    'expires_at', ci.expires_at,
    'is_active', ci.is_active,
    'max_uses', ci.max_uses,
    'current_uses', ci.current_uses,
    'is_expired', (ci.expires_at IS NOT NULL AND ci.expires_at < NOW()),
    'is_maxed_out', (ci.max_uses IS NOT NULL AND ci.current_uses >= ci.max_uses),
    'community_name', c.name,
    'community_description', c.description
  ) INTO result
  FROM circle_invitations ci
  LEFT JOIN communities c ON c.id = ci.community_id
  WHERE ci.invite_code = invitation_code;

  IF result IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'Invitation not found');
  END IF;

  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION get_circle_invitation_details IS 'Get circle invitation details for public viewing (bypasses RLS)';

-- Function to get session invitation details (bypasses RLS for public invitation viewing)
CREATE OR REPLACE FUNCTION get_session_invitation_details(invitation_code TEXT)
RETURNS JSONB AS $$
DECLARE
  result JSONB;
BEGIN
  SELECT jsonb_build_object(
    'success', true,
    'invitation_id', si.id,
    'session_id', si.session_id,
    'message', si.message,
    'expires_at', si.expires_at,
    'is_active', si.is_active,
    'max_uses', si.max_uses,
    'current_uses', si.current_uses,
    'is_expired', (si.expires_at IS NOT NULL AND si.expires_at < NOW()),
    'is_maxed_out', (si.max_uses IS NOT NULL AND si.current_uses >= si.max_uses),
    'session_title', s.title,
    'session_date', s.scheduled_for,
    'session_location', s.location,
    'community_id', s.community_id,
    'community_name', c.name,
    'inviter_name', p.display_name
  ) INTO result
  FROM session_invitations si
  LEFT JOIN sessions s ON s.id = si.session_id
  LEFT JOIN communities c ON c.id = s.community_id
  LEFT JOIN profiles p ON p.id = si.created_by
  WHERE si.invite_code = invitation_code;

  IF result IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'Invitation not found');
  END IF;

  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION get_session_invitation_details IS 'Get session invitation details for public viewing (bypasses RLS)';

/*
  # Improve Invitation Error Handling

  Updates accept_circle_invitation to catch and return detailed errors
*/

CREATE OR REPLACE FUNCTION accept_circle_invitation(invitation_code text)
RETURNS jsonb AS $$
DECLARE
  invitation_record circle_invitations%ROWTYPE;
  result jsonb;
  error_message text;
BEGIN
  -- Get the invitation
  SELECT * INTO invitation_record
  FROM circle_invitations
  WHERE invite_code = invitation_code
    AND is_active = true
    AND (expires_at IS NULL OR expires_at > now())
    AND (max_uses IS NULL OR current_uses < max_uses)
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Invalid or expired invitation');
  END IF;

  -- Check if user is already a member
  IF EXISTS (
    SELECT 1 FROM community_members
    WHERE community_id = invitation_record.community_id
    AND user_id = auth.uid()
  ) THEN
    RETURN jsonb_build_object('success', false, 'error', 'You are already a member of this circle');
  END IF;

  -- Add user to community with proper type casting and error handling
  BEGIN
    INSERT INTO community_members (community_id, user_id, role)
    VALUES (invitation_record.community_id, auth.uid(), invitation_record.role::community_role);
  EXCEPTION
    WHEN foreign_key_violation THEN
      RETURN jsonb_build_object('success', false, 'error', 'User profile not found. Please complete your profile first.');
    WHEN unique_violation THEN
      RETURN jsonb_build_object('success', false, 'error', 'You are already a member of this circle');
    WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS error_message = MESSAGE_TEXT;
      RETURN jsonb_build_object('success', false, 'error', 'Failed to join circle: ' || error_message);
  END;

  -- Update invitation usage
  UPDATE circle_invitations
  SET current_uses = current_uses + 1,
      updated_at = now()
  WHERE id = invitation_record.id;

  RETURN jsonb_build_object(
    'success', true,
    'community_id', invitation_record.community_id,
    'role', invitation_record.role
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION accept_circle_invitation(text) TO authenticated;
GRANT EXECUTE ON FUNCTION get_circle_invitation_details(text) TO authenticated;

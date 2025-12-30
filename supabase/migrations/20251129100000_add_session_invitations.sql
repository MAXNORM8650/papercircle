-- Session Invitations Migration
-- Adds invitation system for sessions with email support

-- Session invitations table
CREATE TABLE IF NOT EXISTS session_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE NOT NULL,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,

  -- Invitation details
  invite_code TEXT UNIQUE NOT NULL,
  email TEXT, -- Optional: for email invitations
  max_uses INTEGER DEFAULT 1, -- Single use by default for email invites
  current_uses INTEGER DEFAULT 0,
  expires_at TIMESTAMP WITH TIME ZONE,

  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  accepted_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  accepted_at TIMESTAMP WITH TIME ZONE,

  -- Notes
  message TEXT, -- Personal message from inviter

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Email invitation queue (for sending emails)
CREATE TABLE IF NOT EXISTS email_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_invitation_id UUID REFERENCES session_invitations(id) ON DELETE CASCADE,
  circle_invitation_id UUID REFERENCES circle_invitations(id) ON DELETE CASCADE,

  -- Email details
  to_email TEXT NOT NULL,
  from_name TEXT NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,

  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed', 'bounced')),
  sent_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT,

  -- Tracking
  opened_at TIMESTAMP WITH TIME ZONE,
  clicked_at TIMESTAMP WITH TIME ZONE,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Ensure either session or circle invitation
  CONSTRAINT email_invitation_type CHECK (
    (session_invitation_id IS NOT NULL AND circle_invitation_id IS NULL) OR
    (session_invitation_id IS NULL AND circle_invitation_id IS NOT NULL)
  )
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_session_invitations_code ON session_invitations(invite_code);
CREATE INDEX IF NOT EXISTS idx_session_invitations_session ON session_invitations(session_id);
CREATE INDEX IF NOT EXISTS idx_session_invitations_email ON session_invitations(email);
CREATE INDEX IF NOT EXISTS idx_session_invitations_active ON session_invitations(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_email_invitations_status ON email_invitations(status) WHERE status = 'pending';

-- RLS Policies for session_invitations

ALTER TABLE session_invitations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active session invitations"
  ON session_invitations FOR SELECT
  USING (
    is_active = true AND
    (expires_at IS NULL OR expires_at > NOW()) AND
    (max_uses IS NULL OR current_uses < max_uses)
  );

CREATE POLICY "Session creators and admins can create invitations"
  ON session_invitations FOR INSERT
  WITH CHECK (
    auth.uid() = created_by AND
    (
      -- Session creator
      EXISTS (
        SELECT 1 FROM sessions s
        WHERE s.id = session_invitations.session_id
        AND s.created_by = auth.uid()
      )
      OR
      -- Community admin
      EXISTS (
        SELECT 1 FROM sessions s
        JOIN communities c ON s.community_id = c.id
        WHERE s.id = session_invitations.session_id
        AND c.created_by = auth.uid()
      )
      OR
      -- Session presenter
      EXISTS (
        SELECT 1 FROM session_presenters sp
        WHERE sp.session_id = session_invitations.session_id
        AND sp.user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Creators can update their invitations"
  ON session_invitations FOR UPDATE
  USING (created_by = auth.uid());

CREATE POLICY "Creators can delete their invitations"
  ON session_invitations FOR DELETE
  USING (created_by = auth.uid());

-- RLS for email_invitations (admin only for viewing)

ALTER TABLE email_invitations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own email invitations"
  ON email_invitations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM session_invitations si
      WHERE si.id = email_invitations.session_invitation_id
      AND si.created_by = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM circle_invitations ci
      WHERE ci.id = email_invitations.circle_invitation_id
      AND ci.created_by = auth.uid()
    )
  );

-- Function to accept session invitation
CREATE OR REPLACE FUNCTION accept_session_invitation(invitation_code TEXT)
RETURNS JSONB AS $$
DECLARE
  invitation_record session_invitations%ROWTYPE;
  result JSONB;
BEGIN
  -- Get the invitation
  SELECT * INTO invitation_record
  FROM session_invitations
  WHERE invite_code = invitation_code
    AND is_active = TRUE
    AND (expires_at IS NULL OR expires_at > NOW())
    AND (max_uses IS NULL OR current_uses < max_uses)
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Invalid or expired invitation');
  END IF;

  -- Check if user has already accepted
  IF EXISTS (
    SELECT 1 FROM session_rsvps
    WHERE session_id = invitation_record.session_id
    AND user_id = auth.uid()
  ) THEN
    -- Update to going if already RSVP'd
    UPDATE session_rsvps
    SET status = 'going', updated_at = NOW()
    WHERE session_id = invitation_record.session_id
    AND user_id = auth.uid();
  ELSE
    -- Create RSVP
    INSERT INTO session_rsvps (session_id, user_id, status)
    VALUES (invitation_record.session_id, auth.uid(), 'going');
  END IF;

  -- Update invitation
  UPDATE session_invitations
  SET current_uses = current_uses + 1,
      accepted_by = auth.uid(),
      accepted_at = NOW(),
      updated_at = NOW()
  WHERE id = invitation_record.id;

  RETURN jsonb_build_object(
    'success', true,
    'session_id', invitation_record.session_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to generate session invitation link
CREATE OR REPLACE FUNCTION create_session_invitation(
  p_session_id UUID,
  p_email TEXT DEFAULT NULL,
  p_message TEXT DEFAULT NULL,
  p_expires_in_days INTEGER DEFAULT 7
)
RETURNS JSONB AS $$
DECLARE
  invite_code TEXT;
  invite_id UUID;
  expires_at TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Generate unique code
  invite_code := generate_invite_code();

  -- Calculate expiration
  IF p_expires_in_days IS NOT NULL THEN
    expires_at := NOW() + (p_expires_in_days || ' days')::INTERVAL;
  END IF;

  -- Create invitation
  INSERT INTO session_invitations (
    session_id,
    created_by,
    invite_code,
    email,
    message,
    expires_at,
    max_uses
  ) VALUES (
    p_session_id,
    auth.uid(),
    invite_code,
    p_email,
    p_message,
    expires_at,
    CASE WHEN p_email IS NOT NULL THEN 1 ELSE NULL END
  )
  RETURNING id INTO invite_id;

  RETURN jsonb_build_object(
    'success', true,
    'invite_id', invite_id,
    'invite_code', invite_code,
    'invite_link', '/session/invite/' || invite_code
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to send email invitation (to be called by edge function)
CREATE OR REPLACE FUNCTION queue_session_email_invitation(
  p_invitation_id UUID,
  p_to_email TEXT,
  p_from_name TEXT,
  p_session_title TEXT,
  p_session_date TIMESTAMP WITH TIME ZONE,
  p_message TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  email_id UUID;
  invite_link TEXT;
  email_subject TEXT;
  email_body TEXT;
BEGIN
  -- Get invite code
  SELECT invite_code INTO invite_link
  FROM session_invitations
  WHERE id = p_invitation_id;

  -- Build email
  email_subject := p_from_name || ' invited you to a session: ' || p_session_title;

  email_body := 'You have been invited to attend a session!' || E'\n\n' ||
                'Session: ' || p_session_title || E'\n' ||
                'Date: ' || to_char(p_session_date, 'DD Mon YYYY at HH24:MI') || E'\n\n';

  IF p_message IS NOT NULL THEN
    email_body := email_body || 'Message from ' || p_from_name || ':' || E'\n' ||
                  p_message || E'\n\n';
  END IF;

  email_body := email_body ||
                'Click here to accept: ' || current_setting('app.base_url', true) || '/session/invite/' || invite_link || E'\n\n' ||
                'This invitation expires in 7 days.';

  -- Queue email
  INSERT INTO email_invitations (
    session_invitation_id,
    to_email,
    from_name,
    subject,
    body
  ) VALUES (
    p_invitation_id,
    p_to_email,
    p_from_name,
    email_subject,
    email_body
  )
  RETURNING id INTO email_id;

  RETURN email_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update session invitation timestamp
CREATE OR REPLACE FUNCTION update_session_invitation_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_session_invitation_timestamp_trigger
  BEFORE UPDATE ON session_invitations
  FOR EACH ROW
  EXECUTE FUNCTION update_session_invitation_timestamp();

COMMENT ON TABLE session_invitations IS 'Invitations to attend specific sessions';
COMMENT ON TABLE email_invitations IS 'Queue for sending email invitations';
COMMENT ON FUNCTION accept_session_invitation IS 'Accept a session invitation and RSVP';
COMMENT ON FUNCTION create_session_invitation IS 'Create a new session invitation';
COMMENT ON FUNCTION queue_session_email_invitation IS 'Queue an email invitation to be sent';

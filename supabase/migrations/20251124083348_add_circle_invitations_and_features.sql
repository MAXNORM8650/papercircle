/*
  # Circle Invitations and Enhanced Features

  ## Overview
  Adds invitation system for circles, shareable links, and enhances circle management.

  ## New Tables

  1. `circle_invitations`
    - Shareable invitation links for circles
    - Can be single-use or unlimited
    - Tracks expiration dates
    - Stores invite codes

  2. `circle_sessions`
    - Better tracking of which sessions belong to which circles
    - Allows circles to manage their own sessions

  ## Changes

  1. Tables
    - Create circle_invitations table
    - Add invite tracking fields to communities
    
  2. Security
    - RLS policies for invitations
    - Public access for accepting invitations
*/

-- Create circle_invitations table
CREATE TABLE IF NOT EXISTS circle_invitations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id uuid REFERENCES communities(id) ON DELETE CASCADE NOT NULL,
  invite_code text UNIQUE NOT NULL,
  created_by uuid REFERENCES profiles(id) NOT NULL,
  max_uses int DEFAULT NULL,
  current_uses int DEFAULT 0,
  expires_at timestamptz DEFAULT NULL,
  role text DEFAULT 'member' CHECK (role IN ('member', 'presenter', 'admin')),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add invitation tracking to communities
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'communities' AND column_name = 'invite_enabled'
  ) THEN
    ALTER TABLE communities ADD COLUMN invite_enabled boolean DEFAULT true;
    ALTER TABLE communities ADD COLUMN default_member_role text DEFAULT 'member' CHECK (default_member_role IN ('member', 'presenter'));
  END IF;
END $$;

-- Enable RLS
ALTER TABLE circle_invitations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for circle_invitations

-- Anyone can view active, non-expired invitations (needed to accept them)
CREATE POLICY "View active invitations"
  ON circle_invitations FOR SELECT
  TO authenticated
  USING (
    is_active = true AND
    (expires_at IS NULL OR expires_at > now()) AND
    (max_uses IS NULL OR current_uses < max_uses)
  );

-- Circle admins can create invitations
CREATE POLICY "Circle admins can create invitations"
  ON circle_invitations FOR INSERT
  TO authenticated
  WITH CHECK (
    created_by = auth.uid() AND
    EXISTS (
      SELECT 1 FROM communities c
      WHERE c.id = circle_invitations.community_id
      AND c.created_by = auth.uid()
    )
  );

-- Circle admins can update their invitations
CREATE POLICY "Circle admins can update invitations"
  ON circle_invitations FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM communities c
      WHERE c.id = circle_invitations.community_id
      AND c.created_by = auth.uid()
    )
  );

-- Circle admins can delete their invitations
CREATE POLICY "Circle admins can delete invitations"
  ON circle_invitations FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM communities c
      WHERE c.id = circle_invitations.community_id
      AND c.created_by = auth.uid()
    )
  );

-- Function to generate unique invite code
CREATE OR REPLACE FUNCTION generate_invite_code()
RETURNS text AS $$
DECLARE
  characters text := 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  result text := '';
  i integer;
BEGIN
  FOR i IN 1..8 LOOP
    result := result || substr(characters, floor(random() * length(characters) + 1)::integer, 1);
  END LOOP;
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Function to accept invitation
CREATE OR REPLACE FUNCTION accept_circle_invitation(invitation_code text)
RETURNS jsonb AS $$
DECLARE
  invitation_record circle_invitations%ROWTYPE;
  result jsonb;
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
    RETURN jsonb_build_object('success', false, 'error', 'Already a member');
  END IF;

  -- Add user to community
  INSERT INTO community_members (community_id, user_id, role)
  VALUES (invitation_record.community_id, auth.uid(), invitation_record.role);

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

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_circle_invitations_code ON circle_invitations(invite_code);
CREATE INDEX IF NOT EXISTS idx_circle_invitations_community ON circle_invitations(community_id);
CREATE INDEX IF NOT EXISTS idx_circle_invitations_active ON circle_invitations(is_active) WHERE is_active = true;

-- Update sessions RLS to allow circle members to create sessions
DROP POLICY IF EXISTS "Community members can create sessions" ON sessions;

CREATE POLICY "Circle members can create sessions"
  ON sessions FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = created_by AND
    (
      community_id IS NULL OR
      EXISTS (
        SELECT 1 FROM community_members
        WHERE community_members.community_id = sessions.community_id
        AND community_members.user_id = auth.uid()
      )
    )
  );

-- Allow users to view sessions from their circles
DROP POLICY IF EXISTS "Users can view sessions" ON sessions;

CREATE POLICY "Users can view sessions"
  ON sessions FOR SELECT
  TO authenticated
  USING (
    visibility = 'public' OR
    created_by = auth.uid() OR
    presenter_id = auth.uid() OR
    (
      community_id IS NOT NULL AND
      EXISTS (
        SELECT 1 FROM community_members
        WHERE community_members.community_id = sessions.community_id
        AND community_members.user_id = auth.uid()
      )
    )
  );

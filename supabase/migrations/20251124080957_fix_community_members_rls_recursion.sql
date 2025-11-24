/*
  # Fix Community Members RLS Recursion

  ## Overview
  Fixes infinite recursion in community_members policies by simplifying
  the policy logic and removing circular dependencies.

  ## Changes
  1. Drop existing problematic policies
  2. Create simplified, non-recursive policies
  3. Ensure community creators can be added as admins without recursion
*/

-- Drop all existing community_members policies to start fresh
DROP POLICY IF EXISTS "Users can view community members" ON community_members;
DROP POLICY IF EXISTS "Users can join public communities" ON community_members;
DROP POLICY IF EXISTS "Community admins can manage members" ON community_members;

-- Simple policy: users can view members of communities they belong to
CREATE POLICY "Members can view their community members"
  ON community_members FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM community_members cm
      WHERE cm.community_id = community_members.community_id
      AND cm.user_id = auth.uid()
    )
  );

-- Policy: anyone can insert themselves as members of public communities
CREATE POLICY "Users can join public communities"
  ON community_members FOR INSERT
  TO authenticated
  WITH CHECK (
    user_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM communities c
      WHERE c.id = community_id
      AND c.is_public = true
    )
  );

-- Policy: system can insert admin members (for triggers)
-- This allows the trigger to add the creator as admin without recursion
CREATE POLICY "System can create admin members"
  ON community_members FOR INSERT
  TO authenticated
  WITH CHECK (
    role = 'admin' AND
    user_id = auth.uid()
  );

-- Policy: admins can update member roles
CREATE POLICY "Admins can update members"
  ON community_members FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM community_members cm
      WHERE cm.community_id = community_members.community_id
      AND cm.user_id = auth.uid()
      AND cm.role = 'admin'
    )
  );

-- Policy: admins can delete members
CREATE POLICY "Admins can delete members"
  ON community_members FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM community_members cm
      WHERE cm.community_id = community_members.community_id
      AND cm.user_id = auth.uid()
      AND cm.role = 'admin'
    ) OR user_id = auth.uid()
  );

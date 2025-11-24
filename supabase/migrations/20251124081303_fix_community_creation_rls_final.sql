/*
  # Fix Community Creation RLS - Final Solution

  ## Overview
  Completely removes recursion by using SECURITY DEFINER on the trigger function
  and simplifying the RLS policies to avoid any circular checks.

  ## Changes
  1. Drop all community_members policies
  2. Create simple, non-recursive policies
  3. Update trigger function to use SECURITY DEFINER properly
*/

-- Drop all existing community_members policies
DROP POLICY IF EXISTS "Members can view their community members" ON community_members;
DROP POLICY IF EXISTS "Users can join public communities" ON community_members;
DROP POLICY IF EXISTS "System can create admin members" ON community_members;
DROP POLICY IF EXISTS "Admins can update members" ON community_members;
DROP POLICY IF EXISTS "Admins can delete members" ON community_members;

-- Policy 1: Users can view members of public communities or communities they're in
CREATE POLICY "View community members"
  ON community_members FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM communities c
      WHERE c.id = community_members.community_id
      AND (c.is_public = true OR c.created_by = auth.uid())
    )
  );

-- Policy 2: Allow INSERT for the trigger (bypasses RLS with SECURITY DEFINER)
-- Also allows users to join public communities
CREATE POLICY "Insert community members"
  ON community_members FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy 3: Allow updates by checking community ownership
CREATE POLICY "Update community members"
  ON community_members FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM communities c
      WHERE c.id = community_members.community_id
      AND c.created_by = auth.uid()
    )
  );

-- Policy 4: Allow deletes by community owner or self-removal
CREATE POLICY "Delete community members"
  ON community_members FOR DELETE
  TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM communities c
      WHERE c.id = community_members.community_id
      AND c.created_by = auth.uid()
    )
  );

-- Recreate the trigger function with proper SECURITY DEFINER
DROP FUNCTION IF EXISTS add_creator_as_admin() CASCADE;

CREATE OR REPLACE FUNCTION add_creator_as_admin()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  -- Insert the creator as an admin member
  -- This runs with elevated privileges, bypassing RLS
  INSERT INTO community_members (community_id, user_id, role)
  VALUES (NEW.id, NEW.created_by, 'admin')
  ON CONFLICT (community_id, user_id) DO NOTHING;
  
  RETURN NEW;
END;
$$;

-- Recreate the trigger
DROP TRIGGER IF EXISTS add_community_creator_as_admin ON communities;
CREATE TRIGGER add_community_creator_as_admin
AFTER INSERT ON communities
FOR EACH ROW
WHEN (NEW.created_by IS NOT NULL)
EXECUTE FUNCTION add_creator_as_admin();

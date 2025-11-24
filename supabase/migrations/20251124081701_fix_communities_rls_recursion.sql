/*
  # Fix Communities RLS Recursion

  ## Overview
  Fixes infinite recursion in communities table policies by removing
  circular dependencies with community_members checks.

  ## Changes
  1. Drop existing communities policies
  2. Create simple, non-recursive policies
  3. Avoid checking community_members in policies
*/

-- Drop all existing communities policies
DROP POLICY IF EXISTS "Users can view accessible communities" ON communities;
DROP POLICY IF EXISTS "Authenticated users can create communities" ON communities;
DROP POLICY IF EXISTS "Community admins can update communities" ON communities;

-- Policy 1: Users can view all public communities and communities they created
CREATE POLICY "View communities"
  ON communities FOR SELECT
  TO authenticated
  USING (is_public = true OR created_by = auth.uid());

-- Policy 2: Any authenticated user can create a community
CREATE POLICY "Create communities"
  ON communities FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());

-- Policy 3: Only the creator can update their community
CREATE POLICY "Update communities"
  ON communities FOR UPDATE
  TO authenticated
  USING (created_by = auth.uid())
  WITH CHECK (created_by = auth.uid());

-- Policy 4: Only the creator can delete their community
CREATE POLICY "Delete communities"
  ON communities FOR DELETE
  TO authenticated
  USING (created_by = auth.uid());

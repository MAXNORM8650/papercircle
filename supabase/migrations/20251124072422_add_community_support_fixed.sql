/*
  # Multi-Community Support

  ## Overview
  Adds support for multiple reading group communities with membership management
  and community-specific data isolation.

  ## New Tables

  1. `communities`
    - Reading group communities
  2. `community_members`
    - Community membership
  3. `community_invites`
    - Pending community invitations

  ## Schema Updates
  - Add `community_id` to sessions and edges tables
  - Add lineage tracking fields to sessions
*/

-- Create community role enum
DO $$ BEGIN
  CREATE TYPE community_role AS ENUM ('member', 'presenter', 'admin');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Communities table
CREATE TABLE IF NOT EXISTS communities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  slug text UNIQUE NOT NULL,
  is_public boolean DEFAULT true,
  avatar_url text,
  created_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE communities ENABLE ROW LEVEL SECURITY;

-- Community members table
CREATE TABLE IF NOT EXISTS community_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id uuid REFERENCES communities(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  role community_role DEFAULT 'member',
  joined_at timestamptz DEFAULT now(),
  UNIQUE(community_id, user_id)
);

ALTER TABLE community_members ENABLE ROW LEVEL SECURITY;

-- Community invites table
CREATE TABLE IF NOT EXISTS community_invites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id uuid REFERENCES communities(id) ON DELETE CASCADE,
  email text NOT NULL,
  invited_by uuid REFERENCES profiles(id) ON DELETE CASCADE,
  expires_at timestamptz DEFAULT (now() + interval '7 days'),
  created_at timestamptz DEFAULT now(),
  UNIQUE(community_id, email)
);

ALTER TABLE community_invites ENABLE ROW LEVEL SECURITY;

-- RLS Policies for communities
CREATE POLICY "Users can view accessible communities"
  ON communities FOR SELECT
  TO authenticated
  USING (
    is_public = true OR 
    EXISTS (
      SELECT 1 FROM community_members 
      WHERE community_members.community_id = communities.id 
      AND community_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Authenticated users can create communities"
  ON communities FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Community admins can update communities"
  ON communities FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM community_members 
      WHERE community_members.community_id = communities.id
      AND community_members.user_id = auth.uid() 
      AND community_members.role = 'admin'
    )
  );

-- RLS Policies for community_members
CREATE POLICY "Users can view community members"
  ON community_members FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM communities 
      WHERE communities.id = community_members.community_id 
      AND (
        communities.is_public = true OR
        EXISTS (
          SELECT 1 FROM community_members cm2
          WHERE cm2.community_id = communities.id 
          AND cm2.user_id = auth.uid()
        )
      )
    )
  );

CREATE POLICY "Users can join public communities"
  ON community_members FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (SELECT 1 FROM communities WHERE id = community_id AND is_public = true)
  );

CREATE POLICY "Community admins can manage members"
  ON community_members FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM community_members cm2
      WHERE cm2.community_id = community_members.community_id
      AND cm2.user_id = auth.uid() 
      AND cm2.role = 'admin'
    )
  );

-- RLS Policies for community_invites
CREATE POLICY "Community members can view invites"
  ON community_invites FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM community_members 
      WHERE community_members.community_id = community_invites.community_id
      AND community_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Community admins can create invites"
  ON community_invites FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM community_members 
      WHERE community_members.community_id = community_invites.community_id
      AND community_members.user_id = auth.uid() 
      AND community_members.role IN ('admin', 'presenter')
    )
  );

-- Add community_id to sessions
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'sessions' AND column_name = 'community_id'
  ) THEN
    ALTER TABLE sessions ADD COLUMN community_id uuid REFERENCES communities(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Add lineage tracking fields to sessions
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'sessions' AND column_name = 'parent_session_id'
  ) THEN
    ALTER TABLE sessions ADD COLUMN parent_session_id uuid REFERENCES sessions(id) ON DELETE SET NULL;
    ALTER TABLE sessions ADD COLUMN lineage_direction text;
    ALTER TABLE sessions ADD COLUMN is_new_direction boolean DEFAULT false;
  END IF;
END $$;

-- Add community_id to edges
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'edges' AND column_name = 'community_id'
  ) THEN
    ALTER TABLE edges ADD COLUMN community_id uuid REFERENCES communities(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_communities_slug ON communities(slug);
CREATE INDEX IF NOT EXISTS idx_community_members_user ON community_members(user_id);
CREATE INDEX IF NOT EXISTS idx_community_members_community ON community_members(community_id);
CREATE INDEX IF NOT EXISTS idx_sessions_community ON sessions(community_id);
CREATE INDEX IF NOT EXISTS idx_sessions_parent ON sessions(parent_session_id);
CREATE INDEX IF NOT EXISTS idx_edges_community ON edges(community_id);

-- Update sessions RLS to include community context
DROP POLICY IF EXISTS "Public sessions are viewable by everyone" ON sessions;
DROP POLICY IF EXISTS "Authenticated users can view member sessions" ON sessions;

CREATE POLICY "Users can view community sessions"
  ON sessions FOR SELECT
  TO authenticated
  USING (
    visibility = 'public' OR
    EXISTS (
      SELECT 1 FROM community_members 
      WHERE community_members.community_id = sessions.community_id
      AND community_members.user_id = auth.uid()
    )
  );

-- Update edges RLS for community context
DROP POLICY IF EXISTS "Edges are viewable by everyone" ON edges;

CREATE POLICY "Users can view community edges"
  ON edges FOR SELECT
  TO authenticated
  USING (
    community_id IS NULL OR
    EXISTS (
      SELECT 1 FROM community_members 
      WHERE community_members.community_id = edges.community_id
      AND community_members.user_id = auth.uid()
    )
  );

-- Add updated_at trigger for communities
DROP TRIGGER IF EXISTS update_communities_updated_at ON communities;
CREATE TRIGGER update_communities_updated_at BEFORE UPDATE ON communities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

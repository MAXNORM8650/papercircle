/*
  # Paper Circle - Initial Database Schema

  ## Overview
  Complete schema for a research paper discovery and reading group platform.
  Implements paper management, lineage tracking, sessions, user profiles, and analytics.

  ## New Tables

  ### Core Entities
  
  1. `profiles`
    - Extended user profile data
    - `id` (uuid, FK to auth.users)
    - `display_name` (text)
    - `affiliation` (text)
    - `interests` (text[])
    - `bio` (text)
    - `avatar_url` (text)
    - `role` (enum: member, presenter, admin)
    - `created_at`, `updated_at` (timestamptz)

  2. `topics`
    - Research areas and sub-areas
    - `id` (uuid, PK)
    - `name` (text)
    - `parent_id` (uuid, self-referencing)
    - `level` (text: area, sub-area, tag)
    - `description` (text)
    - `color` (text)
    - `created_at` (timestamptz)

  3. `papers`
    - Core paper metadata and content
    - `id` (uuid, PK)
    - `arxiv_id` (text)
    - `title` (text)
    - `authors` (jsonb)
    - `abstract` (text)
    - `venue` (text)
    - `year` (integer)
    - `pdf_url` (text)
    - `code_url` (text)
    - `embedding` (vector(768))
    - `metadata` (jsonb) - methods, datasets, metrics
    - `citation_count` (integer)
    - `created_at`, `updated_at` (timestamptz)

  4. `sessions`
    - Reading group meetings
    - `id` (uuid, PK)
    - `title` (text)
    - `description` (text)
    - `scheduled_at` (timestamptz)
    - `duration_minutes` (integer)
    - `location` (text)
    - `virtual_link` (text)
    - `presenter_id` (uuid, FK to profiles)
    - `paper_id` (uuid, FK to papers)
    - `status` (enum: scheduled, completed, cancelled)
    - `recording_url` (text)
    - `slides_url` (text)
    - `notes` (text)
    - `visibility` (enum: public, members)
    - `is_recurring` (boolean)
    - `recurrence_rule` (text)
    - `created_by` (uuid, FK to profiles)
    - `created_at`, `updated_at` (timestamptz)

  5. `edges`
    - Paper lineage relationships
    - `id` (uuid, PK)
    - `source_paper_id` (uuid, FK to papers)
    - `target_paper_id` (uuid, FK to papers)
    - `edge_type` (enum: extends, applies, evaluates, contradicts, survey, prerequisite)
    - `similarity_score` (float)
    - `rationale` (text)
    - `is_ai_generated` (boolean)
    - `verified_by` (uuid, FK to profiles)
    - `created_at` (timestamptz)

  6. `rsvps`
    - Session attendance tracking
    - `id` (uuid, PK)
    - `session_id` (uuid, FK to sessions)
    - `user_id` (uuid, FK to profiles)
    - `status` (enum: attending, maybe, not_attending)
    - `checked_in` (boolean)
    - `checked_in_at` (timestamptz)
    - `created_at`, `updated_at` (timestamptz)

  7. `discussions`
    - Comments and threads
    - `id` (uuid, PK)
    - `paper_id` (uuid, FK to papers, nullable)
    - `session_id` (uuid, FK to sessions, nullable)
    - `parent_id` (uuid, self-referencing)
    - `user_id` (uuid, FK to profiles)
    - `content` (text)
    - `is_question` (boolean)
    - `created_at`, `updated_at` (timestamptz)

  8. `reactions`
    - Likes and highlights
    - `id` (uuid, PK)
    - `discussion_id` (uuid, FK to discussions)
    - `user_id` (uuid, FK to profiles)
    - `type` (enum: like, highlight)
    - `created_at` (timestamptz)

  9. `saved_papers`
    - User's saved/bookmarked papers
    - `id` (uuid, PK)
    - `user_id` (uuid, FK to profiles)
    - `paper_id` (uuid, FK to papers)
    - `notes` (text)
    - `created_at` (timestamptz)

  10. `paper_topics`
    - Many-to-many papers ↔ topics
    - `paper_id` (uuid, FK to papers)
    - `topic_id` (uuid, FK to topics)
    - `relevance_score` (float)

  11. `user_badges`
    - Achievement tracking
    - `id` (uuid, PK)
    - `user_id` (uuid, FK to profiles)
    - `badge_type` (text)
    - `earned_at` (timestamptz)
    - `metadata` (jsonb)

  12. `coverage_snapshots`
    - Analytics over time
    - `id` (uuid, PK)
    - `period` (date)
    - `topic_id` (uuid, FK to topics)
    - `session_count` (integer)
    - `novelty_score` (float)
    - `diversity_score` (float)
    - `created_at` (timestamptz)

  ## Security
  - RLS enabled on all tables
  - Policies for authenticated users based on roles
  - Public read access for public sessions/papers
*/

-- Enable pgvector extension for embeddings
CREATE EXTENSION IF NOT EXISTS vector;

-- Create custom types
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('member', 'presenter', 'admin');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE session_status AS ENUM ('scheduled', 'completed', 'cancelled');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE visibility_type AS ENUM ('public', 'members');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE edge_type AS ENUM ('extends', 'applies', 'evaluates', 'contradicts', 'survey', 'prerequisite');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE rsvp_status AS ENUM ('attending', 'maybe', 'not_attending');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE reaction_type AS ENUM ('like', 'highlight');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE topic_level AS ENUM ('area', 'sub_area', 'tag');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text NOT NULL,
  affiliation text,
  interests text[] DEFAULT '{}',
  bio text,
  avatar_url text,
  role user_role DEFAULT 'member',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Topics table
CREATE TABLE IF NOT EXISTS topics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  parent_id uuid REFERENCES topics(id) ON DELETE SET NULL,
  level topic_level DEFAULT 'area',
  description text,
  color text DEFAULT '#6366f1',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE topics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Topics are viewable by everyone"
  ON topics FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage topics"
  ON topics FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Papers table
CREATE TABLE IF NOT EXISTS papers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  arxiv_id text UNIQUE,
  title text NOT NULL,
  authors jsonb DEFAULT '[]',
  abstract text,
  venue text,
  year integer,
  pdf_url text,
  code_url text,
  embedding vector(768),
  metadata jsonb DEFAULT '{}',
  citation_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE papers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Papers are viewable by everyone"
  ON papers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can add papers"
  ON papers FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update papers"
  ON papers FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  scheduled_at timestamptz NOT NULL,
  duration_minutes integer DEFAULT 60,
  location text,
  virtual_link text,
  presenter_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  paper_id uuid REFERENCES papers(id) ON DELETE SET NULL,
  status session_status DEFAULT 'scheduled',
  recording_url text,
  slides_url text,
  notes text,
  visibility visibility_type DEFAULT 'members',
  is_recurring boolean DEFAULT false,
  recurrence_rule text,
  created_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public sessions are viewable by everyone"
  ON sessions FOR SELECT
  TO authenticated
  USING (visibility = 'public' OR true);

CREATE POLICY "Authenticated users can view member sessions"
  ON sessions FOR SELECT
  TO authenticated
  USING (visibility = 'members');

CREATE POLICY "Admins and presenters can create sessions"
  ON sessions FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'presenter')
    )
  );

CREATE POLICY "Admins and presenters can update sessions"
  ON sessions FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'presenter')
    )
  );

-- Edges table (paper lineage)
CREATE TABLE IF NOT EXISTS edges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_paper_id uuid REFERENCES papers(id) ON DELETE CASCADE,
  target_paper_id uuid REFERENCES papers(id) ON DELETE CASCADE,
  edge_type edge_type NOT NULL,
  similarity_score float,
  rationale text,
  is_ai_generated boolean DEFAULT false,
  verified_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(source_paper_id, target_paper_id, edge_type)
);

ALTER TABLE edges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Edges are viewable by everyone"
  ON edges FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage edges"
  ON edges FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- RSVPs table
CREATE TABLE IF NOT EXISTS rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES sessions(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  status rsvp_status DEFAULT 'attending',
  checked_in boolean DEFAULT false,
  checked_in_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(session_id, user_id)
);

ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all RSVPs"
  ON rsvps FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage own RSVPs"
  ON rsvps FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own RSVPs"
  ON rsvps FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own RSVPs"
  ON rsvps FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Discussions table
CREATE TABLE IF NOT EXISTS discussions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  paper_id uuid REFERENCES papers(id) ON DELETE CASCADE,
  session_id uuid REFERENCES sessions(id) ON DELETE CASCADE,
  parent_id uuid REFERENCES discussions(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  content text NOT NULL,
  is_question boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE discussions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Discussions are viewable by everyone"
  ON discussions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create discussions"
  ON discussions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own discussions"
  ON discussions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own discussions"
  ON discussions FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Reactions table
CREATE TABLE IF NOT EXISTS reactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  discussion_id uuid REFERENCES discussions(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  type reaction_type DEFAULT 'like',
  created_at timestamptz DEFAULT now(),
  UNIQUE(discussion_id, user_id, type)
);

ALTER TABLE reactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reactions are viewable by everyone"
  ON reactions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create reactions"
  ON reactions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own reactions"
  ON reactions FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Saved papers table
CREATE TABLE IF NOT EXISTS saved_papers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  paper_id uuid REFERENCES papers(id) ON DELETE CASCADE,
  notes text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, paper_id)
);

ALTER TABLE saved_papers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own saved papers"
  ON saved_papers FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can save papers"
  ON saved_papers FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own saved papers"
  ON saved_papers FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved papers"
  ON saved_papers FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Paper topics junction table
CREATE TABLE IF NOT EXISTS paper_topics (
  paper_id uuid REFERENCES papers(id) ON DELETE CASCADE,
  topic_id uuid REFERENCES topics(id) ON DELETE CASCADE,
  relevance_score float DEFAULT 1.0,
  PRIMARY KEY (paper_id, topic_id)
);

ALTER TABLE paper_topics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Paper topics are viewable by everyone"
  ON paper_topics FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage paper topics"
  ON paper_topics FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- User badges table
CREATE TABLE IF NOT EXISTS user_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  badge_type text NOT NULL,
  earned_at timestamptz DEFAULT now(),
  metadata jsonb DEFAULT '{}'
);

ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all badges"
  ON user_badges FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "System can award badges"
  ON user_badges FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Coverage snapshots table
CREATE TABLE IF NOT EXISTS coverage_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  period date NOT NULL,
  topic_id uuid REFERENCES topics(id) ON DELETE CASCADE,
  session_count integer DEFAULT 0,
  novelty_score float DEFAULT 0,
  diversity_score float DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(period, topic_id)
);

ALTER TABLE coverage_snapshots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Coverage snapshots are viewable by everyone"
  ON coverage_snapshots FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage coverage snapshots"
  ON coverage_snapshots FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_papers_embedding ON papers USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX IF NOT EXISTS idx_papers_arxiv_id ON papers(arxiv_id);
CREATE INDEX IF NOT EXISTS idx_papers_year ON papers(year);
CREATE INDEX IF NOT EXISTS idx_sessions_scheduled_at ON sessions(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_sessions_status ON sessions(status);
CREATE INDEX IF NOT EXISTS idx_edges_source ON edges(source_paper_id);
CREATE INDEX IF NOT EXISTS idx_edges_target ON edges(target_paper_id);
CREATE INDEX IF NOT EXISTS idx_discussions_paper ON discussions(paper_id);
CREATE INDEX IF NOT EXISTS idx_discussions_session ON discussions(session_id);
CREATE INDEX IF NOT EXISTS idx_discussions_parent ON discussions(parent_id);
CREATE INDEX IF NOT EXISTS idx_rsvps_session ON rsvps(session_id);
CREATE INDEX IF NOT EXISTS idx_rsvps_user ON rsvps(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_papers_user ON saved_papers(user_id);
CREATE INDEX IF NOT EXISTS idx_paper_topics_paper ON paper_topics(paper_id);
CREATE INDEX IF NOT EXISTS idx_paper_topics_topic ON paper_topics(topic_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
DO $$
BEGIN
  DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
  CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

  DROP TRIGGER IF EXISTS update_papers_updated_at ON papers;
  CREATE TRIGGER update_papers_updated_at BEFORE UPDATE ON papers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

  DROP TRIGGER IF EXISTS update_sessions_updated_at ON sessions;
  CREATE TRIGGER update_sessions_updated_at BEFORE UPDATE ON sessions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

  DROP TRIGGER IF EXISTS update_rsvps_updated_at ON rsvps;
  CREATE TRIGGER update_rsvps_updated_at BEFORE UPDATE ON rsvps
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

  DROP TRIGGER IF EXISTS update_discussions_updated_at ON discussions;
  CREATE TRIGGER update_discussions_updated_at BEFORE UPDATE ON discussions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
END $$;



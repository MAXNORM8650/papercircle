/*
  # Paper Ratings and Search Metrics

  ## Overview
  Adds support for user ratings (like/dislike) on papers and search metrics tracking.

  ## New Tables

  1. `paper_ratings`
    - User ratings for papers (like/dislike)
    - `id` (uuid, PK)
    - `user_id` (uuid, FK to profiles)
    - `paper_id` (uuid, FK to papers)
    - `arxiv_id` (text) - For papers not yet in system
    - `rating` (smallint) - 1 for like, -1 for dislike
    - `created_at`, `updated_at` (timestamptz)

  2. `search_metrics`
    - Track search queries and results
    - `id` (uuid, PK)
    - `user_id` (uuid, FK to profiles)
    - `search_query` (text)
    - `search_source` (text) - 'local' or 'arxiv'
    - `filters_used` (jsonb)
    - `results_count` (int)
    - `created_at` (timestamptz)

  ## Security
  - RLS policies for user-specific access
*/

-- Paper ratings table
CREATE TABLE IF NOT EXISTS paper_ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  paper_id uuid REFERENCES papers(id) ON DELETE CASCADE,
  arxiv_id text,
  rating smallint NOT NULL CHECK (rating IN (-1, 1)),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, paper_id),
  UNIQUE(user_id, arxiv_id)
);

ALTER TABLE paper_ratings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own ratings"
  ON paper_ratings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own ratings"
  ON paper_ratings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ratings"
  ON paper_ratings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own ratings"
  ON paper_ratings FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Search metrics table
CREATE TABLE IF NOT EXISTS search_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  search_query text NOT NULL,
  search_source text NOT NULL DEFAULT 'local',
  filters_used jsonb DEFAULT '{}',
  results_count int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE search_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own search metrics"
  ON search_metrics FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own search metrics"
  ON search_metrics FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_paper_ratings_user ON paper_ratings(user_id);
CREATE INDEX IF NOT EXISTS idx_paper_ratings_paper ON paper_ratings(paper_id);
CREATE INDEX IF NOT EXISTS idx_paper_ratings_arxiv ON paper_ratings(arxiv_id);
CREATE INDEX IF NOT EXISTS idx_search_metrics_user ON search_metrics(user_id);
CREATE INDEX IF NOT EXISTS idx_search_metrics_created ON search_metrics(created_at);

-- Add updated_at trigger for paper_ratings
DROP TRIGGER IF EXISTS update_paper_ratings_updated_at ON paper_ratings;
CREATE TRIGGER update_paper_ratings_updated_at BEFORE UPDATE ON paper_ratings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

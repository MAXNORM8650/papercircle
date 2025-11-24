/*
  # Paper Influence and Similarity Metrics

  ## Overview
  Adds columns to track paper influence, trending status, and user engagement metrics
  for enhanced sorting capabilities.

  ## Schema Updates
  - Add influence and engagement tracking columns to papers table
  - Create functions to calculate influence and trending scores
  - Add triggers to auto-update metrics
*/

-- Add new columns to papers table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'papers' AND column_name = 'influence_score'
  ) THEN
    ALTER TABLE papers ADD COLUMN influence_score float DEFAULT 0;
    ALTER TABLE papers ADD COLUMN trending_score float DEFAULT 0;
    ALTER TABLE papers ADD COLUMN view_count int DEFAULT 0;
    ALTER TABLE papers ADD COLUMN save_count int DEFAULT 0;
    ALTER TABLE papers ADD COLUMN like_count int DEFAULT 0;
    ALTER TABLE papers ADD COLUMN dislike_count int DEFAULT 0;
    ALTER TABLE papers ADD COLUMN discussion_count int DEFAULT 0;
    ALTER TABLE papers ADD COLUMN last_viewed_at timestamptz;
  END IF;
END $$;

-- Create indexes for sorting performance
CREATE INDEX IF NOT EXISTS idx_papers_influence_score ON papers(influence_score DESC);
CREATE INDEX IF NOT EXISTS idx_papers_trending_score ON papers(trending_score DESC);
CREATE INDEX IF NOT EXISTS idx_papers_view_count ON papers(view_count DESC);
CREATE INDEX IF NOT EXISTS idx_papers_last_viewed ON papers(last_viewed_at DESC);

-- Function to calculate influence score
CREATE OR REPLACE FUNCTION calculate_influence_score(paper_id uuid)
RETURNS float AS $$
DECLARE
  citation_score float := 0;
  recency_score float := 0;
  engagement_score float := 0;
  quality_score float := 0;
  final_score float := 0;
  paper_year int;
  current_year int;
  year_diff int;
  p_citation_count int;
  p_view_count int;
  p_save_count int;
  p_like_count int;
  p_dislike_count int;
  p_created_at timestamptz;
  p_last_viewed timestamptz;
BEGIN
  SELECT 
    COALESCE(citation_count, 0),
    COALESCE(year, EXTRACT(YEAR FROM created_at)::int),
    COALESCE(view_count, 0),
    COALESCE(save_count, 0),
    COALESCE(like_count, 0),
    COALESCE(dislike_count, 0),
    created_at,
    last_viewed_at
  INTO 
    p_citation_count,
    paper_year,
    p_view_count,
    p_save_count,
    p_like_count,
    p_dislike_count,
    p_created_at,
    p_last_viewed
  FROM papers
  WHERE id = paper_id;

  current_year := EXTRACT(YEAR FROM now())::int;
  year_diff := current_year - paper_year;

  -- Citation score (log scale, max 100)
  citation_score := LEAST(100, LOG(p_citation_count + 1) * 10);

  -- Recency score (decay over time)
  recency_score := GREATEST(0, 100 - (year_diff * 5));

  -- Engagement score (views + saves + likes)
  engagement_score := LEAST(100, (p_view_count + p_save_count * 2 + p_like_count * 3) / 10.0);

  -- Quality score (like ratio)
  IF (p_like_count + p_dislike_count) > 0 THEN
    quality_score := (p_like_count::float / (p_like_count + p_dislike_count)) * 100;
  ELSE
    quality_score := 50;
  END IF;

  -- Weighted final score
  final_score := (citation_score * 0.4) + (recency_score * 0.2) + (engagement_score * 0.3) + (quality_score * 0.1);

  RETURN final_score;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate trending score
CREATE OR REPLACE FUNCTION calculate_trending_score(paper_id uuid)
RETURNS float AS $$
DECLARE
  recent_views int := 0;
  recent_saves int := 0;
  days_since_last_view float := 0;
  velocity_score float := 0;
  recency_multiplier float := 1;
  final_score float := 0;
  p_created_at timestamptz;
  p_last_viewed timestamptz;
BEGIN
  SELECT 
    COALESCE(view_count, 0),
    COALESCE(save_count, 0),
    created_at,
    last_viewed_at
  INTO 
    recent_views,
    recent_saves,
    p_created_at,
    p_last_viewed
  FROM papers
  WHERE id = paper_id;

  days_since_last_view := EXTRACT(EPOCH FROM (now() - COALESCE(p_last_viewed, p_created_at))) / 86400;

  -- Velocity: activity per day
  velocity_score := (recent_views + recent_saves * 3) / GREATEST(days_since_last_view, 1);

  -- Recency multiplier (decays exponentially)
  recency_multiplier := EXP(-days_since_last_view / 30);

  final_score := velocity_score * recency_multiplier * 100;

  RETURN final_score;
END;
$$ LANGUAGE plpgsql;

-- Function to update paper metrics
CREATE OR REPLACE FUNCTION update_paper_metrics()
RETURNS void AS $$
BEGIN
  UPDATE papers
  SET 
    save_count = (SELECT COUNT(*) FROM saved_papers WHERE paper_id = papers.id),
    like_count = (SELECT COUNT(*) FROM paper_ratings WHERE paper_id = papers.id AND rating = 1),
    dislike_count = (SELECT COUNT(*) FROM paper_ratings WHERE paper_id = papers.id AND rating = -1);

  UPDATE papers
  SET 
    influence_score = calculate_influence_score(id),
    trending_score = calculate_trending_score(id);
END;
$$ LANGUAGE plpgsql;

-- Trigger to update metrics when ratings change
CREATE OR REPLACE FUNCTION update_paper_metrics_on_rating()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    UPDATE papers
    SET 
      like_count = (SELECT COUNT(*) FROM paper_ratings WHERE paper_id = NEW.paper_id AND rating = 1),
      dislike_count = (SELECT COUNT(*) FROM paper_ratings WHERE paper_id = NEW.paper_id AND rating = -1),
      influence_score = calculate_influence_score(NEW.paper_id),
      trending_score = calculate_trending_score(NEW.paper_id)
    WHERE id = NEW.paper_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE papers
    SET 
      like_count = (SELECT COUNT(*) FROM paper_ratings WHERE paper_id = OLD.paper_id AND rating = 1),
      dislike_count = (SELECT COUNT(*) FROM paper_ratings WHERE paper_id = OLD.paper_id AND rating = -1),
      influence_score = calculate_influence_score(OLD.paper_id),
      trending_score = calculate_trending_score(OLD.paper_id)
    WHERE id = OLD.paper_id;
  END IF;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS paper_rating_metrics_trigger ON paper_ratings;
CREATE TRIGGER paper_rating_metrics_trigger
AFTER INSERT OR UPDATE OR DELETE ON paper_ratings
FOR EACH ROW EXECUTE FUNCTION update_paper_metrics_on_rating();

-- Initialize metrics for existing papers
SELECT update_paper_metrics();

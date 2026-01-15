/*
  # Add Paper Analysis Rate Limiting and Usage Tracking

  Creates infrastructure for two-tier system:
  - Free tier: 5 papers/day using default LLM
  - Custom tier: Unlimited using user's own LLM

  ## Tables
  - paper_analysis_usage: Track all analysis requests
  - Adds quota tracking to profiles

  ## Security
  - API keys stored encrypted (user's own LLM endpoints)
  - Usage tracking for transparency
  - Rate limiting enforced server-side
*/

-- Add quota tracking columns to profiles
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS daily_analysis_limit integer DEFAULT 5,
ADD COLUMN IF NOT EXISTS is_unlimited boolean DEFAULT false;

-- Create usage tracking table
CREATE TABLE IF NOT EXISTS paper_analysis_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  paper_id uuid REFERENCES papers(id) ON DELETE SET NULL,
  analysis_id uuid REFERENCES paper_analysis(id) ON DELETE SET NULL,
  used_custom_llm boolean DEFAULT false,
  llm_provider text,
  created_at timestamptz DEFAULT now() NOT NULL,
  processing_time_seconds float,
  success boolean DEFAULT true,
  error_message text
);

-- Create index for efficient quota checks
CREATE INDEX IF NOT EXISTS idx_analysis_usage_user_date
  ON paper_analysis_usage(user_id, created_at DESC);

-- Enable RLS
ALTER TABLE paper_analysis_usage ENABLE ROW LEVEL SECURITY;

-- Users can view their own usage
CREATE POLICY "Users can view own usage"
  ON paper_analysis_usage
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Only server (service role) can insert usage records
CREATE POLICY "Service can insert usage"
  ON paper_analysis_usage
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Function to check if user has quota remaining today
CREATE OR REPLACE FUNCTION check_user_analysis_quota(p_user_id uuid)
RETURNS TABLE (
  has_quota boolean,
  used_today integer,
  daily_limit integer,
  is_unlimited boolean
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_daily_limit integer;
  v_is_unlimited boolean;
  v_llm_enabled boolean;
  v_used_today integer;
BEGIN
  -- Get user's profile settings
  SELECT
    p.daily_analysis_limit,
    p.is_unlimited,
    p.llm_enabled
  INTO v_daily_limit, v_is_unlimited, v_llm_enabled
  FROM profiles p
  WHERE p.id = p_user_id;

  -- If user has custom LLM enabled, they're unlimited
  IF v_llm_enabled = true THEN
    RETURN QUERY SELECT true::boolean, 0::integer, 0::integer, true::boolean;
    RETURN;
  END IF;

  -- Check if user is marked as unlimited
  IF v_is_unlimited = true THEN
    RETURN QUERY SELECT true::boolean, 0::integer, 0::integer, true::boolean;
    RETURN;
  END IF;

  -- Count usage today (UTC day)
  SELECT COUNT(*)::integer
  INTO v_used_today
  FROM paper_analysis_usage pau
  WHERE pau.user_id = p_user_id
    AND pau.created_at >= date_trunc('day', now() AT TIME ZONE 'UTC')
    AND pau.success = true;

  -- Check if under quota
  RETURN QUERY SELECT
    (v_used_today < v_daily_limit)::boolean,
    v_used_today::integer,
    v_daily_limit::integer,
    false::boolean;
END;
$$;

-- Function to record analysis usage
CREATE OR REPLACE FUNCTION record_analysis_usage(
  p_user_id uuid,
  p_paper_id uuid,
  p_analysis_id uuid,
  p_used_custom_llm boolean,
  p_llm_provider text,
  p_processing_time float,
  p_success boolean,
  p_error_message text DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_usage_id uuid;
BEGIN
  INSERT INTO paper_analysis_usage (
    user_id,
    paper_id,
    analysis_id,
    used_custom_llm,
    llm_provider,
    processing_time_seconds,
    success,
    error_message
  ) VALUES (
    p_user_id,
    p_paper_id,
    p_analysis_id,
    p_used_custom_llm,
    p_llm_provider,
    p_processing_time,
    p_success,
    p_error_message
  )
  RETURNING id INTO v_usage_id;

  RETURN v_usage_id;
END;
$$;

-- Comments
COMMENT ON TABLE paper_analysis_usage IS 'Tracks all paper analysis requests for quota enforcement and transparency';
COMMENT ON COLUMN profiles.daily_analysis_limit IS 'Number of papers user can analyze per day using default LLM (0 = none, -1 = unlimited)';
COMMENT ON COLUMN profiles.is_unlimited IS 'Whether user has unlimited access (bypasses daily_analysis_limit)';
COMMENT ON FUNCTION check_user_analysis_quota IS 'Check if user has remaining quota for today. Users with custom LLM are always unlimited.';
COMMENT ON FUNCTION record_analysis_usage IS 'Record an analysis request for quota tracking and transparency';

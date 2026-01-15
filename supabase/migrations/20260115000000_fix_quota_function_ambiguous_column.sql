/*
  # Fix ambiguous column reference in check_user_analysis_quota function

  The function had an issue where 'is_unlimited' could refer to either
  the return table column or the profiles table column.

  Fix: Use explicit table aliases and separate variables to avoid ambiguity.
*/

-- Drop and recreate the function with fixed column references
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
  -- Get user's profile settings (use table alias to avoid ambiguity)
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

  -- Count usage today (UTC day) - use table alias
  SELECT COUNT(*)::integer
  INTO v_used_today
  FROM paper_analysis_usage pau
  WHERE pau.user_id = p_user_id
    AND pau.created_at >= date_trunc('day', now() AT TIME ZONE 'UTC')
    AND pau.success = true;

  -- Check if under quota (explicit casts to match return types)
  RETURN QUERY SELECT
    (v_used_today < v_daily_limit)::boolean,
    v_used_today::integer,
    v_daily_limit::integer,
    false::boolean;
END;
$$;

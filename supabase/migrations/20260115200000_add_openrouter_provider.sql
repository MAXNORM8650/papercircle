/*
  # Add OpenRouter as LLM Provider Option

  Updates the llm_provider check constraint to include 'openrouter' as a valid option.
  OpenRouter provides access to 100+ models via a single API.
*/

-- Drop the existing check constraint
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_llm_provider_check;

-- Add the new check constraint with openrouter included
ALTER TABLE profiles ADD CONSTRAINT profiles_llm_provider_check
  CHECK (llm_provider IN ('ollama', 'openai', 'anthropic', 'openrouter', 'custom'));

-- Update comment
COMMENT ON COLUMN profiles.llm_provider IS 'LLM provider type (ollama, openai, anthropic, openrouter, custom)';

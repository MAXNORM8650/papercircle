/*
  # Add User LLM Settings

  Allows users to configure their own LLM server (Ollama, LM Studio, OpenAI, etc.)
  for paper analysis instead of using the default server.
*/

-- Add LLM settings columns to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS llm_api_base text,
ADD COLUMN IF NOT EXISTS llm_model_id text,
ADD COLUMN IF NOT EXISTS llm_api_key text,  -- encrypted, for OpenAI/Anthropic
ADD COLUMN IF NOT EXISTS llm_provider text DEFAULT 'ollama' CHECK (llm_provider IN ('ollama', 'openai', 'anthropic', 'custom')),
ADD COLUMN IF NOT EXISTS llm_enabled boolean DEFAULT false;

-- Add comment
COMMENT ON COLUMN profiles.llm_api_base IS 'Base URL for LLM API (e.g., http://localhost:11434 for Ollama)';
COMMENT ON COLUMN profiles.llm_model_id IS 'Model identifier (e.g., qwen3-coder:30b, gpt-4, claude-3-opus)';
COMMENT ON COLUMN profiles.llm_api_key IS 'API key for commercial providers (OpenAI, Anthropic)';
COMMENT ON COLUMN profiles.llm_provider IS 'LLM provider type (ollama, openai, anthropic, custom)';
COMMENT ON COLUMN profiles.llm_enabled IS 'Whether to use custom LLM settings (false = use system default)';

"""
Shared Configuration
====================
Common configuration, clients, and helpers used across all routers.
"""

import os
from pathlib import Path
from dataclasses import dataclass
from typing import Optional, Dict, Any
from dotenv import load_dotenv
from supabase import create_client, Client

# Load environment variables
load_dotenv()

# =============================================================================
# Environment Configuration
# =============================================================================

SUPABASE_URL = os.getenv("VITE_SUPABASE_URL", "")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
if not SUPABASE_SERVICE_KEY:
    SUPABASE_SERVICE_KEY = os.getenv("VITE_SUPABASE_ANON_KEY", "")
    print("Warning: Using anon key instead of service role key")

DEFAULT_API_BASE = os.getenv("OLLAMA_API_BASE", "http://10.127.30.115:11434")
DEFAULT_MODEL_ID = os.getenv("OLLAMA_MODEL", "ollama_chat/qwen3-coder:30b")
DEFAULT_NUM_CTX = 8192
DEFAULT_CACHE_DIR = "./paper_cache"

# =============================================================================
# Supabase Client (Singleton)
# =============================================================================

_supabase_client: Optional[Client] = None

def get_supabase() -> Client:
    """Get or create Supabase client singleton."""
    global _supabase_client
    if _supabase_client is None:
        _supabase_client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)
    return _supabase_client

# =============================================================================
# LLM Configuration
# =============================================================================

@dataclass
class LLMConfig:
    """LLM configuration dataclass."""
    api_base: str = DEFAULT_API_BASE
    model_id: str = DEFAULT_MODEL_ID
    api_key: Optional[str] = None
    num_ctx: int = DEFAULT_NUM_CTX
    cache_dir: str = DEFAULT_CACHE_DIR
    max_chunk_size: int = 1500

def get_default_llm_config() -> LLMConfig:
    """Get default LLM configuration."""
    return LLMConfig()

def get_user_llm_config(user_id: Optional[str]) -> LLMConfig:
    """
    Get LLM configuration for a specific user.
    Returns user's custom config if enabled, otherwise returns default config.
    """
    default = get_default_llm_config()

    if not user_id or user_id == "system":
        return default

    try:
        supabase = get_supabase()
        result = supabase.table('profiles').select(
            'llm_enabled, llm_provider, llm_api_base, llm_model_id, llm_api_key'
        ).eq('id', user_id).single().execute()

        if not result.data or not result.data.get('llm_enabled'):
            return default

        api_base = result.data.get('llm_api_base') or default.api_base

        # Warn about localhost URLs
        if any(host in api_base.lower() for host in ['localhost', '127.0.0.1', '0.0.0.0']):
            print(f"Warning: User {user_id} configured localhost URL: {api_base}")

        return LLMConfig(
            api_base=api_base,
            model_id=result.data.get('llm_model_id') or default.model_id,
            api_key=result.data.get('llm_api_key'),
            num_ctx=default.num_ctx,
            cache_dir=default.cache_dir,
            max_chunk_size=default.max_chunk_size,
        )

    except Exception as e:
        print(f"Error loading user LLM config: {e}. Using default.")
        return default

def has_custom_llm_enabled(user_id: Optional[str]) -> bool:
    """Check if user has custom LLM configuration enabled."""
    if not user_id or user_id == "system":
        return False

    try:
        supabase = get_supabase()
        result = supabase.table('profiles').select('llm_enabled').eq('id', user_id).single().execute()
        return result.data and result.data.get('llm_enabled', False)
    except Exception as e:
        print(f"Error checking LLM config: {e}")
        return False

# =============================================================================
# Quota Management
# =============================================================================

def check_user_quota(user_id: str) -> Dict[str, Any]:
    """
    Check if user has remaining quota for paper analysis.
    Returns dict with has_quota, used_today, daily_limit, is_unlimited.
    """
    try:
        supabase = get_supabase()
        result = supabase.rpc('check_user_analysis_quota', {'p_user_id': user_id}).execute()
        if result.data:
            return result.data[0]
        return {'has_quota': False, 'used_today': 0, 'daily_limit': 5, 'is_unlimited': False}
    except Exception as e:
        print(f"Error checking quota: {e}")
        return {'has_quota': False, 'used_today': 0, 'daily_limit': 5, 'is_unlimited': False}

def record_usage(
    user_id: str,
    paper_id: Optional[str],
    analysis_id: Optional[str],
    used_custom_llm: bool,
    llm_provider: str,
    processing_time: float,
    success: bool,
    error_message: Optional[str] = None
):
    """Record analysis usage for quota tracking."""
    try:
        supabase = get_supabase()
        supabase.rpc('record_analysis_usage', {
            'p_user_id': user_id,
            'p_paper_id': paper_id,
            'p_analysis_id': analysis_id,
            'p_used_custom_llm': used_custom_llm,
            'p_llm_provider': llm_provider,
            'p_processing_time': processing_time,
            'p_success': success,
            'p_error_message': error_message
        }).execute()
    except Exception as e:
        print(f"Error recording usage: {e}")

# =============================================================================
# Text Sanitization
# =============================================================================

def sanitize_text(text: str) -> str:
    """Remove problematic characters that PostgreSQL can't handle."""
    if not text:
        return text
    return text.replace('\x00', '').replace('\u0000', '')

def sanitize_json(obj):
    """Recursively sanitize JSON objects to remove null bytes."""
    if isinstance(obj, str):
        return sanitize_text(obj)
    elif isinstance(obj, dict):
        return {k: sanitize_json(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [sanitize_json(item) for item in obj]
    return obj

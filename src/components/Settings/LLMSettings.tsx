import { useState, useEffect } from 'react';
import { Save, RefreshCw, AlertCircle, CheckCircle, Server, Key } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { API_BASE_URL } from '../../lib/api';

interface LLMConfig {
  llm_enabled: boolean;
  llm_provider: 'ollama' | 'openai' | 'anthropic' | 'openrouter' | 'custom';
  llm_api_base: string;
  llm_model_id: string;
  llm_api_key: string;
}

const DEFAULT_CONFIGS = {
  ollama: {
    api_base: 'http://localhost:11434',
    model_id: 'ollama_chat/qwen3-coder:30b',
  },
  openai: {
    api_base: 'https://api.openai.com/v1',
    model_id: 'gpt-4-turbo-preview',
  },
  anthropic: {
    api_base: 'https://api.anthropic.com',
    model_id: 'claude-3-opus-20240229',
  },
  openrouter: {
    api_base: 'https://openrouter.ai/api/v1',
    model_id: 'anthropic/claude-3.5-sonnet',
  },
  custom: {
    api_base: '',
    model_id: '',
  },
};

interface QuotaInfo {
  used_today: number;
  daily_limit: number;
  is_unlimited: boolean;
  remaining: number;
}

export function LLMSettings() {
  const { user } = useAuth();
  const [config, setConfig] = useState<LLMConfig>({
    llm_enabled: false,
    llm_provider: 'ollama',
    llm_api_base: '',
    llm_model_id: '',
    llm_api_key: '',
  });
  const [quota, setQuota] = useState<QuotaInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);

  useEffect(() => {
    loadSettings();
  }, [user]);

  const loadQuota = async () => {
    if (!user) return;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const response = await fetch(`${API_BASE_URL}/analysis/quota/${user.id}`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        setQuota(data);
      }
    } catch (error) {
      console.warn('Backend quota API unreachable, using local fallback');
      // Set a default quota if backend is down so UI doesn't break
      setQuota({
        used_today: 0,
        daily_limit: 5,
        is_unlimited: false,
        remaining: 5
      });
    }
  };

  const loadSettings = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('llm_enabled, llm_provider, llm_api_base, llm_model_id, llm_api_key')
        .eq('id', user.id)
        .single();

      if (data) {
        setConfig({
          llm_enabled: data.llm_enabled || false,
          llm_provider: data.llm_provider || 'ollama',
          llm_api_base: data.llm_api_base || '',
          llm_model_id: data.llm_model_id || '',
          llm_api_key: data.llm_api_key || '',
        });
      }

      if (error) {
        console.error('Error loading LLM settings:', error);
      }

      // Load quota information
      await loadQuota();
    } finally {
      setLoading(false);
    }
  };

  const handleProviderChange = (provider: LLMConfig['llm_provider']) => {
    const defaults = DEFAULT_CONFIGS[provider];
    setConfig({
      ...config,
      llm_provider: provider,
      llm_api_base: defaults.api_base,
      llm_model_id: defaults.model_id,
    });
  };

  const handleSave = async () => {
    if (!user) return;

    // Warn about localhost URLs for remote users
    if (config.llm_enabled && config.llm_provider === 'ollama') {
      const isLocalhost = config.llm_api_base.includes('localhost') ||
        config.llm_api_base.includes('127.0.0.1') ||
        config.llm_api_base.includes('0.0.0.0');

      if (isLocalhost) {
        const confirmed = window.confirm(
          '⚠️ Localhost URLs only work if your backend server is on the same machine as your Ollama.\n\n' +
          'If you are the deployer/admin running the backend locally, this will work.\n\n' +
          'If you are a remote user, use ngrok or Cloudflare Tunnel instead.\n\n' +
          'Continue anyway?'
        );

        if (!confirmed) {
          return;
        }
      }
    }

    setSaving(true);
    setMessage(null);

    const { error } = await supabase
      .from('profiles')
      .update({
        llm_enabled: config.llm_enabled,
        llm_provider: config.llm_provider,
        llm_api_base: config.llm_api_base,
        llm_model_id: config.llm_model_id,
        llm_api_key: config.llm_api_key,
      })
      .eq('id', user.id);

    if (error) {
      setMessage({ type: 'error', text: `Failed to save settings: ${error.message}` });
    } else {
      setMessage({ type: 'success', text: 'Settings saved successfully!' });
    }

    setSaving(false);
  };

  const handleTest = async () => {
    setTesting(true);
    setMessage(null);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout for LLM tests

      // Call backend API to test connection
      const response = await fetch(`${API_BASE_URL}/analysis/test-llm-connection`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
        body: JSON.stringify({
          api_base: config.llm_api_base,
          provider: config.llm_provider,
        }),
      });
      clearTimeout(timeoutId);

      const result = await response.json();

      if (result.success) {
        let message = result.message;
        if (result.models && result.models.length > 0) {
          message += `\n\nAvailable models: ${result.models.join(', ')}`;
        }
        setMessage({ type: 'success', text: message });
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: `Connection test failed: ${error.message}\n\nMake sure the Paper Circle API is running on port 8000.`
      });
    }

    setTesting(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Server className="h-6 w-6 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-900">LLM Configuration</h2>
        </div>

        <p className="text-gray-600 mb-6">
          Configure your own LLM for unlimited paper analysis, or use the free tier (5 papers/day).
        </p>

        {/* Current Tier and Quota */}
        {quota && (
          <div className={`rounded-lg p-4 mb-6 ${quota.is_unlimited || config.llm_enabled
            ? 'bg-green-50 border border-green-200'
            : 'bg-gray-50 border border-gray-200'
            }`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {quota.is_unlimited || config.llm_enabled ? '✨ Unlimited Tier' : '🆓 Free Tier'}
                </h3>
                {quota.is_unlimited || config.llm_enabled ? (
                  <p className="text-sm text-gray-600 mt-1">
                    Using your own LLM - analyze unlimited papers
                  </p>
                ) : (
                  <p className="text-sm text-gray-600 mt-1">
                    Daily limit: {quota.used_today} / {quota.daily_limit} papers analyzed today
                  </p>
                )}
              </div>
              {!quota.is_unlimited && !config.llm_enabled && (
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-600">
                    {quota.remaining}
                  </div>
                  <div className="text-xs text-gray-500">remaining</div>
                </div>
              )}
            </div>
            {!quota.is_unlimited && !config.llm_enabled && quota.remaining === 0 && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-sm text-amber-700">
                  ⚠️ You've reached your daily limit. Enable custom LLM below for unlimited access.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Enable/Disable Toggle */}
        <div className="mb-6">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={config.llm_enabled}
              onChange={(e) => setConfig({ ...config, llm_enabled: e.target.checked })}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <span className="ml-2 text-sm font-medium text-gray-900">
              Use custom LLM configuration
            </span>
          </label>
        </div>

        {config.llm_enabled && (
          <>
            {/* Provider Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Provider
              </label>
              <select
                value={config.llm_provider}
                onChange={(e) => handleProviderChange(e.target.value as LLMConfig['llm_provider'])}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="ollama">Ollama (Local)</option>
                <option value="openai">OpenAI</option>
                <option value="anthropic">Anthropic (Claude)</option>
                <option value="openrouter">OpenRouter (Multi-provider)</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            {/* API Base URL */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                API Base URL
              </label>
              <input
                type="text"
                value={config.llm_api_base}
                onChange={(e) => setConfig({ ...config, llm_api_base: e.target.value })}
                placeholder={
                  config.llm_provider === 'ollama'
                    ? 'https://your-tunnel-url.ngrok.io'
                    : config.llm_provider === 'openai'
                      ? 'https://api.openai.com/v1'
                      : config.llm_provider === 'openrouter'
                        ? 'https://openrouter.ai/api/v1'
                        : 'https://api.anthropic.com'
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              {config.llm_provider === 'ollama' && (
                <p className="mt-1 text-sm text-amber-600 flex items-start">
                  <AlertCircle className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                  <span>Localhost URLs only work for deployers/admins. Remote users should use ngrok or Cloudflare Tunnel.</span>
                </p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                {config.llm_provider === 'ollama' && 'Example: https://abc123.ngrok.io'}
                {config.llm_provider === 'openai' && 'Default: https://api.openai.com/v1'}
                {config.llm_provider === 'anthropic' && 'Default: https://api.anthropic.com'}
                {config.llm_provider === 'openrouter' && 'Default: https://openrouter.ai/api/v1'}
              </p>
            </div>

            {/* Model ID */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Model ID
              </label>
              <input
                type="text"
                value={config.llm_model_id}
                onChange={(e) => setConfig({ ...config, llm_model_id: e.target.value })}
                placeholder="qwen3-coder:30b"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <p className="mt-1 text-sm text-gray-500">
                {config.llm_provider === 'ollama' && 'Example: ollama_chat/qwen3-coder:30b, llama2, mistral'}
                {config.llm_provider === 'openai' && 'Example: gpt-4, gpt-3.5-turbo'}
                {config.llm_provider === 'anthropic' && 'Example: claude-3-opus-20240229, claude-3-sonnet-20240229'}
                {config.llm_provider === 'openrouter' && 'Example: anthropic/claude-3.5-sonnet, openai/gpt-4-turbo, google/gemini-pro'}
              </p>
            </div>

            {/* API Key (for commercial providers) */}
            {(config.llm_provider === 'openai' || config.llm_provider === 'anthropic' || config.llm_provider === 'openrouter') && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Key className="inline h-4 w-4 mr-1" />
                  API Key
                </label>
                <input
                  type="password"
                  value={config.llm_api_key}
                  onChange={(e) => setConfig({ ...config, llm_api_key: e.target.value })}
                  placeholder={config.llm_provider === 'openrouter' ? 'sk-or-...' : 'sk-...'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Your API key is stored securely and never shared.
                  {config.llm_provider === 'openrouter' && ' Get your key at openrouter.ai/keys'}
                </p>
              </div>
            )}

            {/* Test Connection Button */}
            <div className="mb-6">
              <button
                onClick={handleTest}
                disabled={testing || !config.llm_api_base}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {testing ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Testing...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4" />
                    <span>Test Connection</span>
                  </>
                )}
              </button>
            </div>
          </>
        )}

        {/* Messages */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg flex items-start space-x-3 ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
            {message.type === 'success' ? (
              <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            )}
            <p className="text-sm">{message.text}</p>
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {saving ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Save Settings</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Help Section - Collapsible */}
      <div className="mt-6">
        <button
          onClick={() => setShowHelp(!showHelp)}
          className="w-full flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <h3 className="text-lg font-semibold text-blue-900">How to set up your own LLM</h3>
          <span className="text-blue-600">{showHelp ? '▼' : '▶'}</span>
        </button>

        {showHelp && (
          <div className="mt-2 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="text-sm text-blue-800 space-y-4">
              <div>
                <p className="font-semibold mb-2">Important: Bring Your Own LLM</p>
                <p className="mb-2">
                  Paper analysis runs on your own LLM server to save computational resources.
                  Local LLM servers must be <strong>publicly accessible</strong> (localhost URLs won't work).
                </p>
              </div>

              <div>
                <p className="font-semibold mb-2">Step 1: Install and Run Ollama</p>
                <ol className="list-decimal list-inside ml-4 space-y-1">
                  <li>Install Ollama from <a href="https://ollama.ai" target="_blank" rel="noopener noreferrer" className="underline">ollama.ai</a></li>
                  <li>Pull a model: <code className="bg-blue-100 px-2 py-0.5 rounded">ollama pull qwen2.5:7b</code></li>
                  <li>Start Ollama: <code className="bg-blue-100 px-2 py-0.5 rounded">ollama serve</code></li>
                </ol>
              </div>

              <div>
                <p className="font-semibold mb-2">Step 2: Expose Your Server (Required)</p>
                <p className="mb-2">Choose one option:</p>

                <div className="ml-4 space-y-2">
                  <div>
                    <p className="font-semibold">Option A: ngrok (Easiest)</p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>Install ngrok from <a href="https://ngrok.com" target="_blank" rel="noopener noreferrer" className="underline">ngrok.com</a></li>
                      <li>Run: <code className="bg-blue-100 px-2 py-0.5 rounded">ngrok http 11434</code></li>
                      <li>Copy the public URL (e.g., <code className="bg-blue-100 px-2 py-0.5 rounded">https://abc123.ngrok.io</code>)</li>
                      <li>Use that URL as your API Base</li>
                    </ol>
                  </div>

                  <div>
                    <p className="font-semibold">Option B: Cloudflare Tunnel</p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>Install cloudflared from <a href="https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation" target="_blank" rel="noopener noreferrer" className="underline">Cloudflare</a></li>
                      <li>Run: <code className="bg-blue-100 px-2 py-0.5 rounded">cloudflared tunnel --url http://localhost:11434</code></li>
                      <li>Copy the public URL and use as your API Base</li>
                    </ol>
                  </div>

                  <div>
                    <p className="font-semibold">Option C: Cloud LLM (No setup needed)</p>
                    <p>Use OpenAI, Anthropic, or OpenRouter with your own API key - works from anywhere!</p>
                    <p className="mt-1 text-xs">OpenRouter gives access to 100+ models (Claude, GPT-4, Gemini, Llama, etc.) with a single API key.</p>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded p-3">
                <p className="font-semibold text-red-900 mb-2">🔒 Security Warning</p>
                <p className="text-sm text-red-800 mb-2">
                  When you expose your Ollama server publicly, <strong>anyone with the URL can use it</strong>.
                  This could result in unauthorized usage and high compute costs.
                </p>
                <p className="text-sm text-red-800 font-semibold">
                  Recommended: Add authentication to protect your endpoint
                </p>
                <p className="text-sm text-red-800 mt-2">
                  • Use ngrok's built-in auth: <code className="bg-red-100 px-1 rounded">ngrok http 11434 --basic-auth "user:pass"</code><br />
                  • Or set up a reverse proxy (nginx/caddy) with API key validation<br />
                  • Store your auth credentials securely and never share them
                </p>
              </div>

              <div>
                <p className="font-semibold mb-2">Step 3: Configure Settings</p>
                <ol className="list-decimal list-inside ml-4 space-y-1">
                  <li>Select your provider (Ollama, OpenAI, Anthropic, or OpenRouter)</li>
                  <li>Enter your public URL (e.g., <code className="bg-blue-100 px-2 py-0.5 rounded">https://abc123.ngrok.io</code>)</li>
                  <li>Enter your model ID (e.g., <code className="bg-blue-100 px-2 py-0.5 rounded">ollama_chat/qwen2.5:7b</code> or <code className="bg-blue-100 px-2 py-0.5 rounded">openrouter/anthropic/claude-3.5-sonnet</code>)</li>
                  <li>Test Connection to verify it works</li>
                  <li>Save Settings</li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Save, RefreshCw, AlertCircle, CheckCircle, Server, Key } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface LLMConfig {
  llm_enabled: boolean;
  llm_provider: 'ollama' | 'openai' | 'anthropic' | 'custom';
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
  custom: {
    api_base: '',
    model_id: '',
  },
};

export function LLMSettings() {
  const { user } = useAuth();
  const [config, setConfig] = useState<LLMConfig>({
    llm_enabled: false,
    llm_provider: 'ollama',
    llm_api_base: '',
    llm_model_id: '',
    llm_api_key: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadSettings();
  }, [user]);

  const loadSettings = async () => {
    if (!user) return;

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

    setLoading(false);
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
      // Simple test - try to connect to the API
      const response = await fetch(`${config.llm_api_base}/api/tags`, {
        method: 'GET',
        headers: config.llm_api_key ? { 'Authorization': `Bearer ${config.llm_api_key}` } : {},
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Successfully connected to LLM server!' });
      } else {
        setMessage({ type: 'error', text: `Connection failed: ${response.status} ${response.statusText}` });
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: `Connection failed: ${error.message}` });
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
          Configure your own LLM server for paper analysis. You can use local models (Ollama, LM Studio)
          or commercial APIs (OpenAI, Anthropic). If disabled, the system default will be used.
        </p>

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
                placeholder="http://localhost:11434"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <p className="mt-1 text-sm text-gray-500">
                {config.llm_provider === 'ollama' && 'Example: http://localhost:11434'}
                {config.llm_provider === 'openai' && 'Example: https://api.openai.com/v1'}
                {config.llm_provider === 'anthropic' && 'Example: https://api.anthropic.com'}
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
              </p>
            </div>

            {/* API Key (for commercial providers) */}
            {(config.llm_provider === 'openai' || config.llm_provider === 'anthropic') && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Key className="inline h-4 w-4 mr-1" />
                  API Key
                </label>
                <input
                  type="password"
                  value={config.llm_api_key}
                  onChange={(e) => setConfig({ ...config, llm_api_key: e.target.value })}
                  placeholder="sk-..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Your API key is stored securely and never shared.
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
          <div className={`mb-6 p-4 rounded-lg flex items-start space-x-3 ${
            message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
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

      {/* Help Section */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">How to set up local LLM</h3>
        <div className="text-sm text-blue-800 space-y-2">
          <p><strong>Ollama:</strong></p>
          <ol className="list-decimal list-inside ml-4 space-y-1">
            <li>Install Ollama from <a href="https://ollama.ai" target="_blank" rel="noopener noreferrer" className="underline">ollama.ai</a></li>
            <li>Run: <code className="bg-blue-100 px-2 py-0.5 rounded">ollama pull qwen3-coder:30b</code></li>
            <li>Start Ollama server (it runs on http://localhost:11434 by default)</li>
            <li>Use API Base: <code className="bg-blue-100 px-2 py-0.5 rounded">http://localhost:11434</code></li>
            <li>Use Model ID: <code className="bg-blue-100 px-2 py-0.5 rounded">ollama_chat/qwen3-coder:30b</code></li>
          </ol>
        </div>
      </div>
    </div>
  );
}

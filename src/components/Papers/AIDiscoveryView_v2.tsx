import { useState, useEffect, useCallback } from 'react';
import { Search, Download, Loader2, Settings, X, FileText, Table2, Sparkles, Filter } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { useCommunity } from '../../contexts/CommunityContext';

interface Paper {
  id: string;
  title: string;
  abstract: string;
  year: number;
  authors: string[];
  url: string;
  source: string;
  venue: string;
  relevance_score: number;
  authority_score: number;
  novelty_score: number;
  final_score: number;
  citations?: number;
  pdf_url?: string;
}

interface SearchResults {
  total_papers: number;
  all_papers_sorted: Paper[];
  mode_used: string;
}

type DiscoveryMode = 'balanced' | 'stable' | 'discovery';

export function AIDiscoveryView() {
  const { user } = useAuth();
  const { currentCommunity } = useCommunity();

  // Core state
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState(false);

  // Simple settings
  const [mode, setMode] = useState<DiscoveryMode>('balanced');
  const [showSettings, setShowSettings] = useState(false);
  const [maxResults, setMaxResults] = useState(20);
  const [minYear, setMinYear] = useState(2020);

  // API URL
  const apiUrl = import.meta.env.VITE_PAPERFINDER_API_URL || 'http://localhost:8000';

  // Mode descriptions
  const modeInfo = {
    balanced: { icon: '⚖️', desc: 'Mix of quality & novelty' },
    stable: { icon: '📚', desc: 'Well-cited, authoritative' },
    discovery: { icon: '🔬', desc: 'Novel, cutting-edge' }
  };

  // Search papers
  const searchPapers = async () => {
    if (!query.trim()) {
      alert('Please enter a search query');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/discover`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: query.trim(),
          mode,
          sources: 'arxiv,semantic_scholar',
          max_results_per_source: maxResults,
          min_year: minYear,
          max_year: new Date().getFullYear(),
          apply_diversity: true,
          diversity_lambda: 0.5
        })
      });

      if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`);
      }

      const data = await response.json();
      setResults(data);

    } catch (error) {
      console.error('Search error:', error);
      alert(`Search failed. Make sure the API is running at ${apiUrl}\n\nStart it with: ./start_fast_api.sh`);
    } finally {
      setLoading(false);
    }
  };

  // Export functions
  const exportToBibTeX = (papers: Paper[]) => {
    const bibtex = papers.map((p, i) => {
      const author = p.authors[0]?.replace(/\s+/g, '') || 'Unknown';
      const key = `${author}${p.year}_${i + 1}`;
      return `@article{${key},\n  title = {${p.title}},\n  author = {${p.authors.join(' and ')}},\n  year = {${p.year}},\n  journal = {${p.venue}},\n  url = {${p.url}}\n}`;
    }).join('\n\n');

    const blob = new Blob([bibtex], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'papers.bib';
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportToCSV = (papers: Paper[]) => {
    const headers = ['Title', 'Authors', 'Year', 'Venue', 'URL', 'Score'];
    const rows = papers.map(p => [
      `"${p.title.replace(/"/g, '""')}"`,
      `"${p.authors.join('; ').replace(/"/g, '""')}"`,
      p.year,
      `"${p.venue}"`,
      p.url,
      p.final_score.toFixed(3)
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'papers.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
          <Sparkles className="w-8 h-8 text-purple-600" />
          AI Paper Discovery
        </h1>
        <p className="text-gray-600 mt-2">Find research papers in seconds</p>
      </div>

      {/* Search Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {/* Search Bar */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchPapers()}
              placeholder="Enter research topic (e.g., 'transformer attention mechanisms')"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
            />
          </div>
          <button
            onClick={searchPapers}
            disabled={loading}
            className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Search
              </>
            )}
          </button>
        </div>

        {/* Quick Mode Selector */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-2">
            {(['balanced', 'stable', 'discovery'] as DiscoveryMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  mode === m
                    ? 'bg-purple-100 text-purple-700 border-2 border-purple-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent'
                }`}
              >
                {modeInfo[m].icon} {m.charAt(0).toUpperCase() + m.slice(1)}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowSettings(!showSettings)}
            className="px-4 py-2 text-gray-600 hover:text-gray-900 flex items-center gap-2 text-sm"
          >
            <Settings className="w-4 h-4" />
            {showSettings ? 'Hide' : 'Show'} Settings
          </button>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Results: {maxResults}
                </label>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="5"
                  value={maxResults}
                  onChange={(e) => setMaxResults(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From Year: {minYear}
                </label>
                <input
                  type="range"
                  min="2015"
                  max={new Date().getFullYear()}
                  value={minYear}
                  onChange={(e) => setMinYear(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Section */}
      {results && !loading && (
        <div className="space-y-4">
          {/* Results Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Found {results.total_papers} papers
                </h3>
                <p className="text-sm text-gray-600">
                  Mode: {results.mode_used}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => exportToBibTeX(results.all_papers_sorted)}
                  className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Export BibTeX
                </button>
                <button
                  onClick={() => exportToCSV(results.all_papers_sorted)}
                  className="px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium flex items-center gap-2"
                >
                  <Table2 className="w-4 h-4" />
                  Export CSV
                </button>
              </div>
            </div>
          </div>

          {/* Papers List */}
          <div className="space-y-3">
            {results.all_papers_sorted.map((paper, index) => (
              <div
                key={paper.id || index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow"
              >
                {/* Paper Header */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-purple-700">#{index + 1}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Title */}
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {paper.title}
                    </h4>

                    {/* Authors & Year */}
                    <p className="text-sm text-gray-600 mb-3">
                      {paper.authors.slice(0, 3).join(', ')}
                      {paper.authors.length > 3 && ' et al.'} • {paper.year} • {paper.venue}
                    </p>

                    {/* Abstract Preview */}
                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                      {paper.abstract}
                    </p>

                    {/* Scores */}
                    <div className="flex gap-4 mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-purple-500"
                            style={{ width: `${paper.final_score * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600">
                          Score: {(paper.final_score * 100).toFixed(0)}%
                        </span>
                      </div>
                      {paper.citations !== undefined && (
                        <span className="text-xs text-gray-600">
                          Citations: {paper.citations}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <a
                        href={paper.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                      >
                        View Paper
                      </a>
                      <button
                        onClick={() => exportToBibTeX([paper])}
                        className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                      >
                        .bib
                      </button>
                      <button
                        onClick={() => exportToCSV([paper])}
                        className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                      >
                        .csv
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {results.all_papers_sorted.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <p className="text-gray-600">No papers found. Try a different query or adjust settings.</p>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!results && !loading && (
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-12 text-center">
          <Sparkles className="w-16 h-16 text-purple-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Ready to discover papers
          </h3>
          <p className="text-gray-600 mb-6">
            Enter a research topic and click Search to find relevant papers
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => {
                setQuery('transformer attention mechanisms');
                setMode('balanced');
              }}
              className="px-4 py-2 bg-white rounded-lg text-sm text-gray-700 hover:bg-gray-50 border border-gray-200"
            >
              Try: Transformers
            </button>
            <button
              onClick={() => {
                setQuery('diffusion models for image generation');
                setMode('discovery');
              }}
              className="px-4 py-2 bg-white rounded-lg text-sm text-gray-700 hover:bg-gray-50 border border-gray-200"
            >
              Try: Diffusion Models
            </button>
            <button
              onClick={() => {
                setQuery('reinforcement learning from human feedback');
                setMode('stable');
              }}
              className="px-4 py-2 bg-white rounded-lg text-sm text-gray-700 hover:bg-gray-50 border border-gray-200"
            >
              Try: RLHF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

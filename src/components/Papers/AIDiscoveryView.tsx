import { useState, useEffect, useCallback } from 'react';
import { Search, Download, Loader2, Settings, X, FileText, Table2, Sparkles, Filter, ExternalLink, FileDown, ChevronDown, ChevronUp, Zap, Bot, MessageSquare, BarChart3 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { useCommunity } from '../../contexts/CommunityContext';
import { API_BASE_URL } from '../../lib/api';

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

interface AIDiscoveryViewProps {
  searchQuery: string;
  triggerSearch: boolean;
  onSearchComplete?: (count: number) => void;
  onLoadingChange?: (loading: boolean) => void;
  onStopFunctionChange?: (fn: (() => void) | null) => void;
}

export function AIDiscoveryView({
  searchQuery,
  triggerSearch,
  onSearchComplete,
  onLoadingChange,
  onStopFunctionChange
}: AIDiscoveryViewProps) {
  const { user } = useAuth();
  const { currentCommunity } = useCommunity();

  // Core state
  const [discoveryType, setDiscoveryType] = useState<'fast' | 'multi-agent'>('fast');
  const [results, setResults] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [expandedAbstracts, setExpandedAbstracts] = useState<Set<number>>(new Set());

  // Multi-agent state
  const [agentMessages, setAgentMessages] = useState<Array<{agent: string, action: string, timestamp: string}>>([]);
  const [multiAgentResults, setMultiAgentResults] = useState<any>(null);
  const [intermediateResults, setIntermediateResults] = useState<any>(null);
  const [currentView, setCurrentView] = useState<'discussion' | 'results'>('discussion');
  const [progressStage, setProgressStage] = useState<string>('');

  // Simple settings
  const [mode, setMode] = useState<DiscoveryMode>('balanced');
  const [showSettings, setShowSettings] = useState(false);
  const [maxResults, setMaxResults] = useState(20);
  const [minYear, setMinYear] = useState(2020);

  // API URL - use centralized config
  const apiUrl = API_BASE_URL;

  // Mode descriptions
  const modeInfo = {
    balanced: { icon: '⚖️', desc: 'Mix of quality & novelty' },
    stable: { icon: '📚', desc: 'Well-cited, authoritative' },
    discovery: { icon: '🔬', desc: 'Novel, cutting-edge' }
  };

  // Notify parent of loading state changes
  useEffect(() => {
    if (onLoadingChange) {
      onLoadingChange(loading);
    }
  }, [loading, onLoadingChange]);

  // Search papers
  const searchPapers = async () => {
    if (!searchQuery.trim()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/discover`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: searchQuery.trim(),
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
      setExpandedAbstracts(new Set()); // Reset expanded abstracts on new search

      if (onSearchComplete) {
        onSearchComplete(data.total_papers || 0);
      }

    } catch (error) {
      console.error('Search error:', error);
      alert(`Search failed. Make sure the API is running at ${apiUrl}\n\nStart it with: ./start_paperfinder_api.sh`);
    } finally {
      setLoading(false);
    }
  };

  // Trigger search when parent component requests it
  useEffect(() => {
    if (triggerSearch && searchQuery.trim()) {
      if (discoveryType === 'fast') {
        searchPapers();
      } else {
        searchMultiAgent();
      }
    }
  }, [triggerSearch]);

  // Multi-agent search with streaming
  const searchMultiAgent = async () => {
    if (!searchQuery.trim()) {
      return;
    }

    setLoading(true);
    setAgentMessages([]);
    setMultiAgentResults(null);
    setIntermediateResults(null);
    setProgressStage('');
    setCurrentView('discussion');

    try {
      const response = await fetch(`${apiUrl}/multi-agent/stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: searchQuery.trim(),
          max_results: maxResults,
          min_year: minYear,
          sort_by: mode === 'balanced' ? 'relevance' : mode === 'stable' ? 'citations' : 'novelty',
          export_formats: ['json'],
          generate_visualization: true,
          web_search: true
        })
      });

      if (!response.ok) {
        throw new Error(`Multi-agent search failed: ${response.status}`);
      }

      // Read SSE stream
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));

                if (data.type === 'agent') {
                  setAgentMessages(prev => [...prev, data.content]);
                } else if (data.type === 'intermediate_results') {
                  // Progressive results - show papers immediately!
                  setIntermediateResults(data.content);
                  setProgressStage(data.content.stage);
                  // Auto-switch to results view when we have papers
                  if (data.content.papers && data.content.papers.length > 0) {
                    setCurrentView('results');
                  }
                } else if (data.type === 'results') {
                  // Final complete results
                  setMultiAgentResults(data.content);
                  setIntermediateResults(null); // Clear intermediate results
                  setCurrentView('results');
                } else if (data.type === 'status') {
                  console.log('Status:', data.content);
                } else if (data.type === 'error') {
                  console.error('Error:', data.content);
                  alert(`Multi-agent error: ${data.content}`);
                } else if (data.type === 'done') {
                  setLoading(false);
                }
              } catch (e) {
                console.error('Failed to parse SSE message:', e);
              }
            }
          }
        }
      }

      if (onSearchComplete && multiAgentResults) {
        onSearchComplete(multiAgentResults.total_papers || 0);
      }

    } catch (error) {
      console.error('Multi-agent search error:', error);
      alert(`Multi-agent search failed. Make sure the API is running at ${apiUrl}`);
      setLoading(false);
    }
  };

  // Toggle abstract expansion
  const toggleAbstract = (index: number) => {
    const newExpanded = new Set(expandedAbstracts);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedAbstracts(newExpanded);
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
    <div className="space-y-6">
      {/* Discovery Type Selector */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border-2 border-purple-200 p-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setDiscoveryType('fast')}
            className={`flex-1 px-6 py-4 rounded-lg transition-all text-sm font-medium flex items-center justify-center gap-2 ${
              discoveryType === 'fast'
                ? 'bg-purple-600 text-white shadow-lg transform scale-105'
                : 'bg-white text-gray-700 hover:bg-purple-50 border-2 border-gray-200'
            }`}
          >
            <Zap className="w-5 h-5" />
            <div className="text-left">
              <div className="font-bold">Fast Discovery</div>
              <div className="text-xs opacity-80">2-5 seconds • Direct search</div>
            </div>
          </button>
          <button
            onClick={() => setDiscoveryType('multi-agent')}
            className={`flex-1 px-6 py-4 rounded-lg transition-all text-sm font-medium flex items-center justify-center gap-2 ${
              discoveryType === 'multi-agent'
                ? 'bg-purple-600 text-white shadow-lg transform scale-105'
                : 'bg-white text-gray-700 hover:bg-purple-50 border-2 border-gray-200'
            }`}
          >
            <Bot className="w-5 h-5" />
            <div className="text-left">
              <div className="font-bold">Multi-Agent Pipeline</div>
              <div className="text-xs opacity-80">Comprehensive • Analysis • Web Search</div>
            </div>
          </button>
        </div>
      </div>

      {/* Discovery Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {/* Quick Mode Selector */}
        <div className="flex items-center justify-between">
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
                  {results.analysis && " • Analysis Complete"}
                  {results.visualization && " • Dashboard Created"}
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
                {results.visualization && results.visualization.filename && (
                  <a
                    href={`${apiUrl.replace('/discover', '')}/${results.visualization.filename}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium flex items-center gap-2"
                  >
                    <BarChart3 className="w-4 h-4" />
                    View Dashboard
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Analysis Statistics (for Fast Discovery) */}
          {results.analysis && results.analysis.statistics && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-600" />
                Research Statistics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-700">{results.total_papers}</div>
                  <div className="text-sm text-gray-600">Total Papers</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-700">
                    {results.analysis.statistics.top_authors?.length || 0}
                  </div>
                  <div className="text-sm text-gray-600">Top Authors</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-700">
                    {results.analysis.statistics.research_trends?.length || 0}
                  </div>
                  <div className="text-sm text-gray-600">Keywords</div>
                </div>
              </div>

              {/* Year Distribution */}
              {results.analysis.statistics.year_distribution && Object.keys(results.analysis.statistics.year_distribution).length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Publications by Year</h4>
                  <div className="flex gap-2 items-end h-32">
                    {Object.entries(results.analysis.statistics.year_distribution).map(([year, count]) => (
                      <div key={year} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className="w-full bg-purple-500 rounded-t"
                          style={{ height: `${(count as number / Math.max(...Object.values(results.analysis.statistics.year_distribution) as number[])) * 100}%` }}
                        />
                        <span className="text-xs text-gray-600">{year}</span>
                        <span className="text-xs font-semibold text-gray-900">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Top Authors */}
              {results.analysis.statistics.top_authors && results.analysis.statistics.top_authors.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Top Authors</h4>
                  <div className="flex flex-wrap gap-2">
                    {results.analysis.statistics.top_authors.map((author: any, idx: number) => (
                      <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        {typeof author === 'string' ? author : `${author.name} (${author.count})`}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Research Trends */}
              {results.analysis.statistics.research_trends && results.analysis.statistics.research_trends.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Topics</h4>
                  <div className="flex flex-wrap gap-2">
                    {results.analysis.statistics.research_trends.map((trend: any, idx: number) => (
                      <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {typeof trend === 'string' ? trend : `${trend.keyword} (${trend.count})`}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Top Venues */}
              {results.analysis.statistics.top_venues && results.analysis.statistics.top_venues.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Top Venues</h4>
                  <div className="flex flex-wrap gap-2">
                    {results.analysis.statistics.top_venues.map((venue: any, idx: number) => (
                      <span key={idx} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        {typeof venue === 'string' ? venue : `${venue.name} (${venue.count})`}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

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
                    <div className="mb-3">
                      <p className={`text-sm text-gray-700 ${expandedAbstracts.has(index) ? '' : 'line-clamp-2'}`}>
                        {paper.abstract}
                      </p>
                      {paper.abstract && paper.abstract.length > 200 && (
                        <button
                          onClick={() => toggleAbstract(index)}
                          className="text-sm text-purple-600 hover:text-purple-700 font-medium mt-1 flex items-center gap-1"
                        >
                          {expandedAbstracts.has(index) ? (
                            <>
                              <ChevronUp className="w-4 h-4" />
                              View Less
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4" />
                              View More
                            </>
                          )}
                        </button>
                      )}
                    </div>

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
                    <div className="flex gap-2 flex-wrap">
                      <a
                        href={paper.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium flex items-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Paper
                      </a>
                      {paper.pdf_url && (
                        <a
                          href={paper.pdf_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2"
                        >
                          <FileDown className="w-4 h-4" />
                          PDF
                        </a>
                      )}
                      <button
                        onClick={() => exportToBibTeX([paper])}
                        className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm flex items-center gap-1"
                      >
                        <FileText className="w-4 h-4" />
                        .bib
                      </button>
                      <button
                        onClick={() => exportToCSV([paper])}
                        className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm flex items-center gap-1"
                      >
                        <Table2 className="w-4 h-4" />
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

      {/* Multi-Agent Pipeline View */}
      {discoveryType === 'multi-agent' && (agentMessages.length > 0 || multiAgentResults || intermediateResults) && !loading && (
        <div className="space-y-4">
          {/* Navigation Menu */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setCurrentView('discussion')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  currentView === 'discussion'
                    ? 'bg-purple-100 text-purple-700 border-2 border-purple-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                Agent Discussion ({agentMessages.length})
              </button>
              <button
                onClick={() => setCurrentView('results')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  currentView === 'results'
                    ? 'bg-purple-100 text-purple-700 border-2 border-purple-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                disabled={!multiAgentResults && !intermediateResults}
              >
                <BarChart3 className="w-4 h-4" />
                Results & Analysis
              </button>

              {/* Quick Jump Links (when results available) */}
              {(multiAgentResults || intermediateResults) && currentView === 'results' && (
                <>
                  <div className="border-l border-gray-300 mx-2" />
                  <a href="#papers" className="px-3 py-2 text-sm text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors">
                    📄 Papers
                  </a>
                  {multiAgentResults?.web_resources && multiAgentResults.web_resources.length > 0 && (
                    <a href="#weblinks" className="px-3 py-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                      🔗 Web Links
                    </a>
                  )}
                  {(multiAgentResults?.statistics || intermediateResults?.statistics) && (
                    <a href="#statistics" className="px-3 py-2 text-sm text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors">
                      📊 Statistics
                    </a>
                  )}
                  {(multiAgentResults?.visualization || multiAgentResults?.analysis_text) && (
                    <a href="#analysis" className="px-3 py-2 text-sm text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-lg transition-colors">
                      📈 Analysis
                    </a>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Agent Discussion View */}
          {currentView === 'discussion' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Bot className="w-5 h-5 text-purple-600" />
                Multi-Agent Discussion
              </h3>
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {agentMessages.map((msg, idx) => (
                  <div key={idx} className="flex gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-purple-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-purple-700">{msg.agent}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{msg.action}</p>
                    </div>
                  </div>
                ))}
                {agentMessages.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Waiting for agent discussions...</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Results & Statistics View */}
          {currentView === 'results' && (intermediateResults || multiAgentResults) && (
            <div className="space-y-6">
              {/* Progress Indicator for Intermediate Results */}
              {intermediateResults && !multiAgentResults && (
                <div className="bg-blue-50 rounded-lg border-2 border-blue-200 p-4">
                  <div className="flex items-center gap-3">
                    <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                    <div className="flex-1">
                      <div className="font-semibold text-blue-900">
                        {intermediateResults.message || 'Processing...'}
                      </div>
                      <div className="text-sm text-blue-700 mt-1">
                        Stage: {progressStage.replace('_', ' ')} • Showing preliminary results
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Statistics Summary */}
              <div id="statistics" className="scroll-mt-4 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  Research Statistics
                  {intermediateResults && !multiAgentResults && (
                    <span className="ml-2 text-sm font-normal text-gray-500">(Preliminary)</span>
                  )}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-purple-700">
                      {(multiAgentResults || intermediateResults)?.total_papers || 0}
                    </div>
                    <div className="text-sm text-gray-600">Total Papers Found</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-700">
                      {(multiAgentResults || intermediateResults)?.statistics?.top_authors?.length || 0}
                    </div>
                    <div className="text-sm text-gray-600">Top Authors</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-700">
                      {(multiAgentResults || intermediateResults)?.statistics?.research_trends?.length || 0}
                    </div>
                    <div className="text-sm text-gray-600">Research Trends</div>
                  </div>
                </div>

                {/* Year Distribution */}
                {multiAgentResults.statistics?.year_distribution && (
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Year Distribution</h4>
                    <div className="flex gap-2 items-end h-32">
                      {Object.entries(multiAgentResults.statistics.year_distribution).map(([year, count]) => (
                        <div key={year} className="flex-1 flex flex-col items-center gap-1">
                          <div
                            className="w-full bg-purple-500 rounded-t"
                            style={{ height: `${(count as number / Math.max(...Object.values(multiAgentResults.statistics.year_distribution) as number[])) * 100}%` }}
                          />
                          <span className="text-xs text-gray-600">{year}</span>
                          <span className="text-xs font-semibold text-gray-900">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Top Authors */}
                {multiAgentResults.statistics?.top_authors && multiAgentResults.statistics.top_authors.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Top Authors</h4>
                    <div className="flex flex-wrap gap-2">
                      {multiAgentResults.statistics.top_authors.map((author: any, idx: number) => (
                        <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                          {typeof author === 'string' ? author : `${author.name} (${author.count})`}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Research Trends */}
                {multiAgentResults.statistics?.research_trends && multiAgentResults.statistics.research_trends.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Research Trends / Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {multiAgentResults.statistics.research_trends.map((trend: any, idx: number) => (
                        <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          {typeof trend === 'string' ? trend : `${trend.keyword} (${trend.count})`}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Top Venues */}
                {multiAgentResults.statistics?.top_venues && multiAgentResults.statistics.top_venues.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Top Venues</h4>
                    <div className="flex flex-wrap gap-2">
                      {multiAgentResults.statistics.top_venues.map((venue: any, idx: number) => (
                        <span key={idx} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          {typeof venue === 'string' ? venue : `${venue.name} (${venue.count})`}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Full Analysis Text (if available) */}
              {multiAgentResults?.analysis_text && (
                <div id="analysis" className="scroll-mt-4 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple-600" />
                    Full Analysis
                  </h3>
                  <div className="prose prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans bg-gray-50 p-4 rounded-lg">
                      {multiAgentResults.analysis_text}
                    </pre>
                  </div>
                </div>
              )}

              {/* All Papers (if available) */}
              {((multiAgentResults || intermediateResults)?.all_papers || (multiAgentResults || intermediateResults)?.papers) && (
                <div id="papers" className="scroll-mt-4 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {intermediateResults && !multiAgentResults && (
                        <>Papers Found ({((intermediateResults?.all_papers || intermediateResults?.papers)?.length || 0)}) - Loading more...</>
                      )}
                      {multiAgentResults && (
                        <>All Papers ({(multiAgentResults.all_papers?.length || 0)})</>
                      )}
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => exportToBibTeX(multiAgentResults.all_papers)}
                        className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium flex items-center gap-2"
                      >
                        <FileText className="w-4 h-4" />
                        Export All BibTeX
                      </button>
                      <button
                        onClick={() => exportToCSV(multiAgentResults.all_papers)}
                        className="px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium flex items-center gap-2"
                      >
                        <Table2 className="w-4 h-4" />
                        Export All CSV
                      </button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {((multiAgentResults?.all_papers || multiAgentResults?.papers) || (intermediateResults?.all_papers || intermediateResults?.papers) || []).slice(0, 50).map((paper: any, idx: number) => (
                      <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-purple-700">#{idx + 1}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 mb-1">{paper.title}</h4>
                            <p className="text-sm text-gray-600 mb-2">
                              {Array.isArray(paper.authors) ? paper.authors.slice(0, 3).join(', ') : paper.authors}
                              {Array.isArray(paper.authors) && paper.authors.length > 3 && ' et al.'} • {paper.year}
                              {paper.citations !== undefined && ` • ${paper.citations} citations`}
                            </p>

                            {/* Score Display */}
                            <div className="flex gap-3 mb-2 text-xs">
                              {paper.final_score !== undefined && (
                                <span className="text-purple-600">
                                  Final: {(paper.final_score * 100).toFixed(0)}%
                                </span>
                              )}
                              {paper.relevance_score !== undefined && (
                                <span className="text-blue-600">
                                  Relevance: {(paper.relevance_score * 100).toFixed(0)}%
                                </span>
                              )}
                              {paper.novelty_score !== undefined && (
                                <span className="text-green-600">
                                  Novelty: {(paper.novelty_score * 100).toFixed(0)}%
                                </span>
                              )}
                            </div>

                            <div className="flex gap-2 flex-wrap">
                              <a
                                href={paper.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
                              >
                                <ExternalLink className="w-3 h-3" />
                                View Paper
                              </a>
                              {paper.pdf_url && (
                                <a
                                  href={paper.pdf_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                                >
                                  <FileDown className="w-3 h-3" />
                                  PDF
                                </a>
                              )}
                              <button
                                onClick={() => exportToBibTeX([paper])}
                                className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
                              >
                                <FileText className="w-3 h-3" />
                                .bib
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {multiAgentResults.all_papers.length > 50 && (
                      <div className="text-center py-4 text-gray-600">
                        Showing first 50 papers. Export to see all {multiAgentResults.all_papers.length} papers.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Web Resources */}
              {multiAgentResults?.web_resources && multiAgentResults.web_resources.length > 0 && (
                <div id="weblinks" className="scroll-mt-4 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Web Resources</h3>
                  <div className="space-y-2">
                    {multiAgentResults.web_resources.map((resource: any, idx: number) => (
                      <a
                        key={idx}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <ExternalLink className="w-4 h-4 text-purple-600" />
                          <span className="text-sm font-medium text-gray-900">{resource.title}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!results && !multiAgentResults && !loading && (
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-8 text-center">
          <Sparkles className="w-12 h-12 text-purple-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            AI Paper Discovery
          </h3>
          <p className="text-sm text-gray-600">
            Enter your research topic in the search box above and click Search to discover papers
          </p>
        </div>
      )}
    </div>
  );
}

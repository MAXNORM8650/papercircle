import { useState, useEffect } from 'react';
import { Bot, Sparkles, Download, FileText, Table2, AlertCircle, CheckCircle, Loader2, ExternalLink, ChevronDown, ChevronUp, X, BarChart3, Search, SlidersHorizontal } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCommunity } from '../../contexts/CommunityContext';

interface Paper {
  title: string;
  authors: string[];
  year: number;
  venue: string;
  url: string;
  abstract?: string;
  score?: number;
  citations?: number;
}

interface ResearchStep {
  step: string;
  agent: string;
  action: string;
  timestamp: string;
}

interface AIDiscoveryViewProps {
  searchQuery: string;
  triggerSearch: boolean;
  selectedTags?: string[];
  onSearchComplete?: (count: number) => void;
  onLoadingChange?: (loading: boolean) => void;
  onStopFunctionReady?: (stopFn: () => void) => void;
}

export function AIDiscoveryViewNew({
  searchQuery,
  triggerSearch,
  selectedTags = [],
  onSearchComplete,
  onLoadingChange,
  onStopFunctionReady
}: AIDiscoveryViewProps) {
  const { user } = useAuth();
  const { currentCommunity } = useCommunity();

  // State
  const [loading, setLoading] = useState(false);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [steps, setSteps] = useState<ResearchStep[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [outputDir, setOutputDir] = useState<string | null>(null);
  const [timestamp, setTimestamp] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedAbstracts, setExpandedAbstracts] = useState<Set<number>>(new Set());
  const [showSteps, setShowSteps] = useState(false);
  const [abortController, setAbortController] = useState<AbortController | null>(null);
  const [pollInterval, setPollInterval] = useState<NodeJS.Timeout | null>(null);
  const [papersCount, setPapersCount] = useState(0);
  const [currentAgent, setCurrentAgent] = useState<string | null>(null);
  const [progressPercent, setProgressPercent] = useState(0);
  const [sortBy, setSortBy] = useState<'rank' | 'year' | 'citations' | 'score'>('rank');
  const [filterQuery, setFilterQuery] = useState('');

  // API URL
  // const apiUrl = 'http://localhost:8002';
  const [apiUrl, setApiUrl] = useState(
    import.meta.env.VITE_PAPERFINDER_API_URL || 'http://localhost:8004'
  );
  // Notify parent of loading changes
  useEffect(() => {
    if (onLoadingChange) {
      onLoadingChange(loading);
    }
  }, [loading, onLoadingChange]);

  // Pass stop function to parent
  useEffect(() => {
    if (onStopFunctionReady) {
      onStopFunctionReady(stopResearch);
    }
  }, [onStopFunctionReady]);

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
      if (abortController) {
        abortController.abort();
      }
    };
  }, []);

  // Trigger search when requested
  useEffect(() => {
    if (triggerSearch && searchQuery.trim()) {
      runResearch();
    }
  }, [triggerSearch]);

  // Poll for real-time updates - using functional setState to avoid stale closures
  const startPolling = (ts: string) => {
    console.log(`🔄 Starting polling for timestamp: ${ts}`);
    const interval = setInterval(async () => {
      try {
        // Add cache-busting to ensure fresh data
        const pollUrl = `${apiUrl}/research/poll/${ts}?_t=${Date.now()}`;
        console.log(`📡 Polling backend: ${pollUrl}`);
        const response = await fetch(pollUrl);
        if (response.ok) {
          const data = await response.json();
          console.log(`📦 Poll response: ${data.papers_count} papers, complete: ${data.is_complete}`);

          // Update papers - ALWAYS update from polling to ensure frontend reflects backend
          // Backend reads fresh data from disk each time
          if (Array.isArray(data.papers)) {
            setPapers(prevPapers => {
              // Log updates for debugging
              if (data.papers.length !== prevPapers.length) {
                console.log(`📊 Papers updated: ${prevPapers.length} → ${data.papers.length}`);
              } else {
                console.log(`⏸️  Papers unchanged at ${prevPapers.length}`);
              }
              // Always return new papers to ensure we have the latest from backend
              return data.papers;
            });
            setPapersCount(data.papers_count || data.papers.length);
          } else {
            console.warn('⚠️  Backend did not return papers array:', data);
          }

          // Update steps - use functional setState to avoid stale closure
          setSteps(prevSteps => {
            if (data.steps && data.steps.length > prevSteps.length) {
              return data.steps;
            }
            return prevSteps;
          });

          // Update stats
          if (data.stats) {
            setStats(data.stats);
          }

          // Update summary
          if (data.summary) {
            setSummary(data.summary);
          }

          // Update current agent and progress
          if (data.current_agent) {
            setCurrentAgent(data.current_agent);
          }
          setProgressPercent(data.progress_percentage || 0);

          // Stop polling ONLY if ACTUALLY complete
          if (data.is_complete === true) {
            clearInterval(interval);
            setPollInterval(null);
            setLoading(false);
            setCurrentAgent(null);
            setProgressPercent(100);
            if (onSearchComplete) {
              onSearchComplete(data.papers_count);
            }
          }
        }
      } catch (err) {
        console.error('Polling error:', err);
      }
    }, 10000); // Poll every 10 seconds as requested by user

    setPollInterval(interval);
  };

  const stopResearch = async () => {
    console.log('Stopping research - cancelling backend and frontend');

    // Cancel backend processing if we have a timestamp
    if (timestamp) {
      try {
        await fetch(`${apiUrl}/research/cancel/${timestamp}`, {
          method: 'POST'
        });
        console.log('Backend cancellation requested');
      } catch (err) {
        console.error('Failed to cancel backend:', err);
      }
    }

    // Cancel SSE stream
    if (abortController) {
      abortController.abort();
      setAbortController(null);
    }

    // Stop polling
    if (pollInterval) {
      clearInterval(pollInterval);
      setPollInterval(null);
    }

    // Update UI state
    setLoading(false);
    setCurrentAgent(null);
    setError('Research stopped. Showing results found so far.');

    // Show results if any papers were found
    if (papers.length > 0 && onSearchComplete) {
      onSearchComplete(papers.length);
    }
  };

  const openDashboard = () => {
    if (timestamp) {
      // Open dashboard in new window/tab
      window.open(`/research-dashboard/${timestamp}`, '_blank', 'noopener,noreferrer');
    }
  };

  const runResearch = async () => {
    if (!searchQuery.trim()) {
      setError('Please enter a research query');
      return;
    }

    // Clean up any existing polling or SSE streams
    if (pollInterval) {
      console.log('Cleaning up previous polling interval');
      clearInterval(pollInterval);
      setPollInterval(null);
    }
    if (abortController) {
      console.log('Aborting previous SSE stream');
      abortController.abort();
    }

    // Reset state
    setPapers([]);
    setSteps([]);
    setSummary(null);
    setStats(null);
    setError(null);
    setLoading(true);
    setPapersCount(0);
    setTimestamp(null);

    // Create abort controller for this request
    const controller = new AbortController();
    setAbortController(controller);

    try {
      const response = await fetch(`${apiUrl}/research/stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: searchQuery.trim(),
          user_id: user?.id,
          community_id: currentCommunity?.id,
          max_results: 50,
          tags: selectedTags
        }),
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

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

                if (data.type === 'init') {
                  // Got timestamp, start polling for real-time updates
                  setTimestamp(data.content.timestamp);
                  setOutputDir(data.content.output_dir);
                  startPolling(data.content.timestamp);
                } else if (data.type === 'status') {
                  console.log('Status:', data.content);
                } else if (data.type === 'progress') {
                  // Real-time progress update from SSE - just log it, polling will handle updates
                  console.log('SSE progress:', data.content.papers_count, 'papers');
                } else if (data.type === 'step') {
                  setSteps(prev => [...prev, data.content]);
                } else if (data.type === 'papers') {
                  // SSE sent final papers - but polling is more reliable, so just log
                  console.log('SSE sent papers:', Array.isArray(data.content) ? data.content.length : 'invalid');
                  // Don't update here - let polling handle it to avoid race conditions
                } else if (data.type === 'summary') {
                  setSummary(data.content);
                } else if (data.type === 'stats') {
                  setStats(data.content);
                } else if (data.type === 'done') {
                  // DON'T stop polling here - let the polling endpoint detect completion
                  // The backend might still be processing files even after SSE stream ends
                  console.log('SSE stream ended, but polling will continue until is_complete=true');
                } else if (data.type === 'error') {
                  // Convert error to string if it's an object
                  const errorMessage = typeof data.content === 'string'
                    ? data.content
                    : typeof data.content === 'object' && data.content !== null
                    ? data.content.message || data.content.title || JSON.stringify(data.content)
                    : 'Unknown error occurred';
                  setError(errorMessage);
                  if (pollInterval) {
                    clearInterval(pollInterval);
                    setPollInterval(null);
                  }
                  setLoading(false);
                }
              } catch (e) {
                console.error('Failed to parse SSE:', e);
              }
            }
          }
        }
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        // User stopped the request
        console.log('Research aborted by user');
      } else {
        const errorMsg = err?.message || String(err) || 'Unknown error';
        setError(`Research failed: ${errorMsg}. Make sure the Research Pipeline API is running at ${apiUrl}.`);
      }
      if (pollInterval) {
        clearInterval(pollInterval);
        setPollInterval(null);
      }
      setLoading(false);
    }
  };

  const downloadFile = async (filename: string) => {
    if (!outputDir) return;

    const timestamp = outputDir.split('/').pop();
    try {
      const response = await fetch(`${apiUrl}/research/output/${timestamp}/${filename}`);
      const data = await response.json();

      const blob = new Blob([data.content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err: any) {
      alert(`Failed to download ${filename}: ${err.message}`);
    }
  };

  const toggleAbstract = (index: number) => {
    const newExpanded = new Set(expandedAbstracts);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedAbstracts(newExpanded);
  };

  // Filter and sort papers
  const getFilteredAndSortedPapers = () => {
    let filtered = papers.filter(paper => {
      if (!paper || typeof paper !== 'object' || !paper.title) return false;

      // Search filter
      if (filterQuery.trim()) {
        const query = filterQuery.toLowerCase();
        const titleMatch = paper.title.toLowerCase().includes(query);
        const authorsMatch = Array.isArray(paper.authors) &&
          paper.authors.some(author =>
            typeof author === 'string' && author.toLowerCase().includes(query)
          );
        return titleMatch || authorsMatch;
      }

      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rank':
          return ((a as any).rank || 0) - ((b as any).rank || 0);
        case 'year':
          return (b.year || 0) - (a.year || 0);
        case 'citations':
          return (b.citations || 0) - (a.citations || 0);
        case 'score':
          return ((b as any).combined_score || 0) - ((a as any).combined_score || 0);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredPapers = getFilteredAndSortedPapers();

  return (
    <div className="space-y-6">

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-900">Error</p>
            <p className="text-sm text-red-700">{String(error)}</p>
          </div>
        </div>
      )}

      {/* Loading State - Persistent and Detailed */}
      {loading && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
          {/* Header with Spinner */}
          <div className="flex items-center gap-3 mb-4">
            <Loader2 className="w-7 h-7 animate-spin text-blue-600" />
            <div>
              <p className="text-lg font-bold text-blue-900">Research in Progress</p>
              <p className="text-sm text-blue-700">
                {currentAgent ? `Running: ${currentAgent}` : 'Multi-agent pipeline is analyzing...'}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-medium text-gray-700">
                Progress: {progressPercent}% {steps.length > 0 && `(Step ${steps.length}/6)`}
              </span>
              {papersCount > 0 && (
                <span className="font-semibold text-purple-700">
                  {papersCount} papers found
                </span>
              )}
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Agent Activity - Always Visible */}
          <div className="bg-white rounded-lg p-4 border border-blue-100">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              Agent Activity
            </h4>
            {steps.length > 0 ? (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {steps.map((step, idx) => {
                  // Safely extract agent and action as strings
                  const agentName = typeof step?.agent === 'string' ? step.agent : String(step?.agent || 'Unknown');
                  const actionText = typeof step?.action === 'string' ? step.action : String(step?.action || 'Processing');

                  return (
                    <div
                      key={idx}
                      className={`flex items-start gap-2 p-2 rounded ${
                        idx === steps.length - 1 ? 'bg-purple-50 border border-purple-200' : 'bg-gray-50'
                      }`}
                    >
                      {idx === steps.length - 1 ? (
                        <Loader2 className="w-4 h-4 animate-spin text-purple-600 mt-0.5 flex-shrink-0" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-900">{agentName}</p>
                        <p className="text-xs text-gray-600 truncate">{actionText}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">Initializing agents...</p>
            )}
          </div>
        </div>
      )}

      {/* Results - Show incrementally as papers are discovered */}
      {papers.length > 0 && (
        <>
          {/* Summary and Stats - Only show when complete */}
          {!loading && papers.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-green-900">Found {papers.length} papers</h3>
                </div>
                {timestamp && (
                  <button
                    onClick={openDashboard}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-sm flex items-center gap-2 font-medium"
                  >
                    <BarChart3 className="w-4 h-4" />
                    Open Dashboard
                  </button>
                )}
              </div>

              {/* Download Options */}
              {outputDir && (
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => downloadFile('papers.json')}
                    className="px-3 py-1 bg-white border border-green-300 rounded text-xs hover:bg-green-50 flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" /> JSON
                  </button>
                  <button
                    onClick={() => downloadFile('papers.csv')}
                    className="px-3 py-1 bg-white border border-green-300 rounded text-xs hover:bg-green-50 flex items-center gap-1"
                  >
                    <Table2 className="w-3 h-3" /> CSV
                  </button>
                  <button
                    onClick={() => downloadFile('papers.bib')}
                    className="px-3 py-1 bg-white border border-green-300 rounded text-xs hover:bg-green-50 flex items-center gap-1"
                  >
                    <FileText className="w-3 h-3" /> BibTeX
                  </button>
                  <button
                    onClick={() => downloadFile('papers.md')}
                    className="px-3 py-1 bg-white border border-green-300 rounded text-xs hover:bg-green-50 flex items-center gap-1"
                  >
                    <FileText className="w-3 h-3" /> Markdown
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Papers List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Discovered Papers ({filteredPapers.length}{papers.length !== filteredPapers.length && ` of ${papers.length}`})
                {loading && <span className="ml-2 text-sm text-blue-600 font-normal">(updating...)</span>}
              </h3>
            </div>

            {/* Filter and Sort Controls */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Filters:</span>
                </div>

                {/* Search */}
                <div className="flex-1 min-w-[200px] max-w-md relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by title or author..."
                    value={filterQuery}
                    onChange={(e) => setFilterQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                {/* Sort */}
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                  >
                    <option value="rank">Rank</option>
                    <option value="year">Year (newest first)</option>
                    <option value="citations">Citations (high to low)</option>
                    <option value="score">Score (high to low)</option>
                  </select>
                </div>

                {/* Clear filters */}
                {filterQuery && (
                  <button
                    onClick={() => setFilterQuery('')}
                    className="px-2 py-1 text-xs text-gray-600 hover:text-gray-800 underline"
                  >
                    Clear search
                  </button>
                )}
              </div>
            </div>

            {filteredPapers.length === 0 && papers.length > 0 ? (
              <div className="text-center py-8 bg-white border border-gray-200 rounded-lg">
                <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-gray-600 font-medium">No papers match your filters</p>
                <p className="text-sm text-gray-500 mt-1">Try adjusting your search or sort criteria</p>
              </div>
            ) : (
              filteredPapers.map((paper, idx) => {
                // Handle authors - can be array or object
                const authors = Array.isArray(paper.authors)
                  ? paper.authors
                  : typeof paper.authors === 'string'
                  ? [paper.authors]
                  : [];

                const displayAuthors = authors.length > 0
                  ? authors.slice(0, 3).join(', ') + (authors.length > 3 ? ` +${authors.length - 3} more` : '')
                  : 'Unknown authors';

                return (
                  <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{String(paper.title || 'Untitled')}</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {displayAuthors}
                      </p>
                    <div className="flex items-center gap-2 flex-wrap text-xs text-gray-500">
                      <span className="font-medium">{String(paper.venue || 'Unknown venue')}</span>
                      <span>•</span>
                      <span>{String(paper.year || 'N/A')}</span>
                      {paper.citations !== undefined && paper.citations !== null && (
                        <>
                          <span>•</span>
                          <span>{paper.citations} citations</span>
                        </>
                      )}
                      {(paper as any).rank && (
                        <>
                          <span>•</span>
                          <span className="text-purple-600 font-semibold">Rank #{(paper as any).rank}</span>
                        </>
                      )}
                    </div>

                    {/* Scores */}
                    {((paper as any).combined_score || (paper as any).bm25_score || (paper as any).relevance_score) && (
                      <div className="mt-2 flex gap-2 flex-wrap">
                        {(paper as any).combined_score && (
                          <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
                            Score: {((paper as any).combined_score).toFixed(3)}
                          </span>
                        )}
                        {(paper as any).bm25_score && (
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                            BM25: {((paper as any).bm25_score).toFixed(3)}
                          </span>
                        )}
                        {(paper as any).novelty_score && (
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                            Novel: {((paper as any).novelty_score).toFixed(3)}
                          </span>
                        )}
                        {(paper as any).recency_score && (
                          <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full">
                            Recent: {((paper as any).recency_score).toFixed(3)}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Keywords & Area */}
                    {((paper as any).keywords || (paper as any).primary_area) && (
                      <div className="mt-2">
                        {(paper as any).primary_area && (
                          <span className="inline-block px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs rounded mr-1 mb-1">
                            {String((paper as any).primary_area)}
                          </span>
                        )}
                        {(paper as any).keywords && typeof (paper as any).keywords === 'string' && (
                          (paper as any).keywords.split(';').slice(0, 3).map((kw: string, i: number) => (
                            <span key={i} className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded mr-1 mb-1">
                              {kw.trim()}
                            </span>
                          ))
                        )}
                      </div>
                    )}

                    {/* Abstract - Collapsible */}
                    {paper.abstract && (
                      <div className="mt-2">
                        <button
                          onClick={() => toggleAbstract(idx)}
                          className="text-xs text-purple-600 hover:text-purple-700 font-medium"
                        >
                          {expandedAbstracts.has(idx) ? '▼ Hide abstract' : '▶ Show abstract'}
                        </button>
                        {expandedAbstracts.has(idx) && (
                          <p className="mt-2 text-sm text-gray-700 bg-gray-50 p-3 rounded">
                            {paper.abstract}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <a
                      href={paper.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-purple-600 text-white rounded text-xs hover:bg-purple-700 flex items-center justify-center gap-1 whitespace-nowrap"
                    >
                      <ExternalLink className="w-3 h-3" /> View
                    </a>
                    {(paper as any).pdf_url && (paper as any).pdf_url !== '' && (
                      <a
                        href={(paper as any).pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-red-600 text-white rounded text-xs hover:bg-red-700 flex items-center justify-center gap-1 whitespace-nowrap"
                      >
                        <FileText className="w-3 h-3" /> PDF
                      </a>
                    )}
                  </div>
                </div>
              </div>
              );
            })
            )}
          </div>
        </>
      )}

      {/* Empty State */}
      {!loading && papers.length === 0 && !error && (
        <div className="text-center py-12 text-gray-500">
          <Bot className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium">No research results yet</p>
          <p className="text-sm mt-2">Enter a research query above and click search to start</p>
        </div>
      )}
    </div>
  );
}

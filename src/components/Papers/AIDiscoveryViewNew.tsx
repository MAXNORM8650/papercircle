import { useState, useEffect } from 'react';
import { Bot, Sparkles, Download, FileText, Table2, AlertCircle, CheckCircle, Loader2, ExternalLink, ChevronDown, ChevronUp, X, BarChart3 } from 'lucide-react';
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
}

export function AIDiscoveryViewNew({
  searchQuery,
  triggerSearch,
  selectedTags = [],
  onSearchComplete,
  onLoadingChange
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

  // API URL
  const apiUrl = 'http://localhost:8002';

  // Notify parent of loading changes
  useEffect(() => {
    if (onLoadingChange) {
      onLoadingChange(loading);
    }
  }, [loading, onLoadingChange]);

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

  // Poll for real-time updates
  const startPolling = (ts: string) => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`${apiUrl}/research/poll/${ts}`);
        if (response.ok) {
          const data = await response.json();

          // Debug logging
          console.log('Polling data:', data);
          console.log('Papers received:', data.papers);

          // Update papers - ALWAYS update from polling to ensure we catch all backend changes
          // (papers might be re-ranked, filtered, or added during pipeline execution)
          if (Array.isArray(data.papers) && data.papers.length > 0) {
            console.log(`📝 Polling update: ${data.papers.length} papers from backend`);
            setPapers(data.papers);
            setPapersCount(data.papers_count || data.papers.length);
          } else if (data.papers_count === 0) {
            // Explicitly handle empty results
            console.log('📝 No papers found yet');
          }

          // Update steps if changed
          if (data.steps.length > steps.length) {
            setSteps(data.steps);
          }

          // Update stats
          if (data.stats) {
            setStats(data.stats);
          }

          // Update summary
          if (data.summary) {
            console.log('Setting summary:', data.summary);
            console.log('Summary type:', typeof data.summary);
            console.log('Summary.insights:', data.summary.insights);
            setSummary(data.summary);
          }

          // Update current agent and progress
          if (data.current_agent) {
            setCurrentAgent(data.current_agent);
          }
          setProgressPercent(data.progress_percentage || 0);

          // Stop polling ONLY if ACTUALLY complete
          if (data.is_complete === true) {
            console.log('✅ Pipeline confirmed complete by backend, stopping polling');
            clearInterval(interval);
            setPollInterval(null);
            setLoading(false);
            setCurrentAgent(null);
            setProgressPercent(100);
            if (onSearchComplete) {
              onSearchComplete(data.papers_count);
            }
          } else {
            // Ensure loading stays true while pipeline runs
            console.log('⏳ Pipeline still running... papers:', data.papers_count, 'progress:', data.progress_percentage + '%');
            if (!loading) {
              setLoading(true);
            }
          }
        }
      } catch (err) {
        console.error('Polling error:', err);
      }
    }, 2000); // Poll every 2 seconds

    setPollInterval(interval);
  };

  const stopResearch = () => {
    console.log('Stopping research - cancelling frontend polling');

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
    setError('⚠️ Research stopped by user. Note: Backend processing may continue in the background. Showing results found so far.');

    // Show results if any papers were found
    if (papers.length > 0 && onSearchComplete) {
      onSearchComplete(papers.length);
    }
  };

  const openDashboard = () => {
    if (timestamp) {
      // Navigate to dashboard URL
      window.location.href = `/research-dashboard/${timestamp}`;
    }
  };

  const runResearch = async () => {
    if (!searchQuery.trim()) {
      setError('Please enter a research query');
      return;
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
        setError(`Research failed: ${errorMsg}. Make sure the Research Pipeline API is running on port 8002.`);
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border-2 border-purple-200 p-6">
        <div className="flex items-center gap-3 mb-3">
          <Bot className="w-8 h-8 text-purple-600" />
          <div>
            <h3 className="text-xl font-bold text-gray-900">Multi-Agent Research Pipeline</h3>
            <p className="text-sm text-gray-600">High-quality research discovery powered by your LLM</p>
          </div>
        </div>

        {user && (
          <div className="bg-white rounded-lg p-3 text-sm text-gray-700">
            <Sparkles className="w-4 h-4 inline mr-2 text-purple-600" />
            Using your configured LLM from Settings for unlimited research
          </div>
        )}
      </div>

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
          {/* Header with Spinner and Stop Button */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Loader2 className="w-7 h-7 animate-spin text-blue-600" />
              <div>
                <p className="text-lg font-bold text-blue-900">Research in Progress</p>
                <p className="text-sm text-blue-700">
                  {currentAgent ? `Running: ${currentAgent}` : 'Multi-agent pipeline is analyzing...'}
                </p>
              </div>
            </div>
            <button
              onClick={stopResearch}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 font-medium"
            >
              <X className="w-4 h-4" />
              Stop
            </button>
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
                  <h3 className="font-semibold text-green-900">Research Complete</h3>
                </div>
                {timestamp && (
                  <button
                    onClick={openDashboard}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-sm flex items-center gap-2 font-medium"
                  >
                    <BarChart3 className="w-4 h-4" />
                    Open Research Dashboard
                  </button>
                )}
              </div>

              <div className="text-sm text-gray-700 mb-3">
                <p className="font-medium">Summary:</p>
                <p className="mt-1">Found {papers.length} papers</p>
                {timestamp && (
                  <p className="mt-1 text-xs text-gray-600">
                    View detailed analysis, advanced filters, and export options in the dashboards
                  </p>
                )}
              </div>

              {/* Dashboard Options */}
              {timestamp && (
                <div className="mt-4 pt-3 border-t border-green-200">
                  <p className="text-xs font-medium text-gray-700 mb-2">View Results:</p>
                  <div className="flex gap-2 flex-wrap mb-3">
                    <button
                      onClick={openDashboard}
                      className="px-3 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded hover:from-purple-700 hover:to-blue-700 transition-all shadow-sm flex items-center gap-2 text-sm font-medium"
                    >
                      <BarChart3 className="w-4 h-4" />
                      Interactive Dashboard
                    </button>
                    <button
                      onClick={() => window.open(`http://localhost:8002/research/output/${timestamp}/dashboard.html`, '_blank')}
                      className="px-3 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded hover:from-indigo-700 hover:to-purple-700 transition-all shadow-sm flex items-center gap-2 text-sm font-medium"
                    >
                      <Sparkles className="w-4 h-4" />
                      HTML Dashboard
                    </button>
                  </div>
                </div>
              )}

              {/* Download Options */}
              {outputDir && (
                <div className="mt-2 pt-3 border-t border-green-200 flex gap-2 flex-wrap">
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
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Discovered Papers ({papers.length})
                {loading && <span className="ml-2 text-sm text-blue-600 font-normal">(updating...)</span>}
              </h3>
            </div>

            {papers.filter(paper => paper && typeof paper === 'object' && paper.title).map((paper, idx) => {
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
            })}
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

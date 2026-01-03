import { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, CheckCircle, XCircle, Brain, Calendar, Users, FileText } from 'lucide-react';
import { PaperAnalysisView } from './PaperAnalysisView';

const API_BASE = 'http://localhost:8001';

interface Paper {
  id: string;
  title: string;
  arxiv_id?: string;
  has_analysis: boolean;
  analysis_count: number;
  latest_analysis?: any;
}

interface Session {
  id: string;
  title: string;
  scheduled_for?: string;
  status?: string;
  papers: Paper[];
  papers_count: number;
  analyzed_count: number;
}

interface AnalysisOverview {
  community_id: string;
  sessions: Session[];
  papers_without_session: Paper[];
  total_papers: number;
  total_analyzed: number;
  total_sessions: number;
}

interface AnalysisHubViewProps {
  communityId: string;
  communityName: string;
  onClose?: () => void;
}

export function AnalysisHubView({ communityId, communityName, onClose }: AnalysisHubViewProps) {
  const [overview, setOverview] = useState<AnalysisOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedSessions, setExpandedSessions] = useState<Set<string>>(new Set());
  const [showPapersWithoutSession, setShowPapersWithoutSession] = useState(true);
  const [selectedPaper, setSelectedPaper] = useState<{ paperId: string; arxivId?: string } | null>(null);

  useEffect(() => {
    loadOverview();
  }, [communityId]);

  const loadOverview = async () => {
    setLoading(true);
    setError(null);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(`${API_BASE}/analysis/circle/${communityId}/overview`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        setOverview(data);
        // Expand all sessions by default
        setExpandedSessions(new Set(data.sessions.map((s: Session) => s.id)));
      } else {
        setError(`API returned status ${response.status}`);
      }
    } catch (error) {
      console.warn('Error loading analysis overview:', error);
      setError('Cannot connect to Paper Analysis API. Please make sure it is running on port 8001.');
    } finally {
      setLoading(false);
    }
  };

  const toggleSession = (sessionId: string) => {
    const newExpanded = new Set(expandedSessions);
    if (newExpanded.has(sessionId)) {
      newExpanded.delete(sessionId);
    } else {
      newExpanded.add(sessionId);
    }
    setExpandedSessions(newExpanded);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not scheduled';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'in_progress':
        return 'text-blue-600 bg-blue-50';
      case 'scheduled':
        return 'text-gray-600 bg-gray-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  if (selectedPaper) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PaperAnalysisView
          paperId={selectedPaper.paperId}
          communityId={communityId}
          arxivId={selectedPaper.arxivId}
          onClose={() => setSelectedPaper(null)}
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          <p className="mt-2 text-gray-600">Loading analysis overview...</p>
        </div>
      </div>
    );
  }

  if (!overview || error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start">
            <XCircle className="h-6 w-6 text-yellow-600 mt-1 flex-shrink-0" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                Paper Analysis API Not Available
              </h3>
              <p className="text-yellow-700 mb-4">
                {error || 'Failed to load analysis overview.'}
              </p>
              <div className="bg-white rounded-lg p-4 border border-yellow-300">
                <p className="text-sm font-semibold text-gray-900 mb-2">To use the AI Hub:</p>
                <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
                  <li>Start the Paper Analysis API:</li>
                </ol>
                <pre className="mt-2 bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
                  bash scripts/shell/start_paper_analysis_api.sh
                </pre>
                <p className="mt-3 text-sm text-gray-600">
                  Or run directly: <code className="bg-gray-100 px-2 py-1 rounded text-xs">python backend/apis/paper_analysis_api.py</code>
                </p>
                <button
                  onClick={loadOverview}
                  className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm font-medium"
                >
                  Retry Connection
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Brain className="h-8 w-8 text-purple-600" />
              Analysis Hub
            </h1>
            <p className="mt-2 text-lg text-gray-600">{communityName}</p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              Close
            </button>
          )}
        </div>

        {/* Statistics */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FileText className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Papers</dt>
                    <dd className="text-2xl font-semibold text-gray-900">{overview.total_papers}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Analyzed</dt>
                    <dd className="text-2xl font-semibold text-gray-900">
                      {overview.total_analyzed}
                      <span className="text-sm text-gray-500 ml-2">
                        ({overview.total_papers > 0 ? Math.round((overview.total_analyzed / overview.total_papers) * 100) : 0}%)
                      </span>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Sessions</dt>
                    <dd className="text-2xl font-semibold text-gray-900">{overview.total_sessions}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sessions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Sessions</h2>

        {overview.sessions.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center text-gray-500">
            No sessions found
          </div>
        ) : (
          overview.sessions.map((session) => (
            <div key={session.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* Session Header */}
              <button
                onClick={() => toggleSession(session.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  {expandedSessions.has(session.id) ? (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  )}
                  <div className="text-left flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{session.title}</h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(session.scheduled_for)}
                      </span>
                      {session.status && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                          {session.status}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-right">
                    <div className="text-gray-500">Papers</div>
                    <div className="font-semibold text-gray-900">{session.papers_count}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-500">Analyzed</div>
                    <div className="font-semibold text-green-600">
                      {session.analyzed_count} / {session.papers_count}
                    </div>
                  </div>
                </div>
              </button>

              {/* Session Papers */}
              {expandedSessions.has(session.id) && (
                <div className="border-t border-gray-200 bg-gray-50">
                  {session.papers.length === 0 ? (
                    <div className="px-6 py-4 text-gray-500 text-center">
                      No papers in this session
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-200">
                      {session.papers.map((paper) => (
                        <button
                          key={paper.id}
                          onClick={() => setSelectedPaper({ paperId: paper.id, arxivId: paper.arxiv_id })}
                          className="w-full px-6 py-3 flex items-center justify-between hover:bg-gray-100 transition-colors text-left"
                        >
                          <div className="flex items-center gap-3 flex-1">
                            {paper.has_analysis ? (
                              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                            ) : (
                              <XCircle className="h-5 w-5 text-gray-300 flex-shrink-0" />
                            )}
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">{paper.title}</p>
                              {paper.arxiv_id && (
                                <p className="text-xs text-gray-500 mt-1">arXiv: {paper.arxiv_id}</p>
                              )}
                            </div>
                          </div>
                          {paper.has_analysis && (
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Brain className="h-4 w-4" />
                              {paper.analysis_count} analysis
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}

        {/* Papers Without Session */}
        {overview.papers_without_session.length > 0 && (
          <div className="mt-8">
            <button
              onClick={() => setShowPapersWithoutSession(!showPapersWithoutSession)}
              className="flex items-center gap-2 text-xl font-semibold text-gray-900 mb-4 hover:text-gray-700"
            >
              {showPapersWithoutSession ? (
                <ChevronDown className="h-5 w-5" />
              ) : (
                <ChevronRight className="h-5 w-5" />
              )}
              Papers Not in Sessions
              <span className="text-sm font-normal text-gray-500">
                ({overview.papers_without_session.length})
              </span>
            </button>

            {showPapersWithoutSession && (
              <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
                {overview.papers_without_session.map((paper) => (
                  <button
                    key={paper.id}
                    onClick={() => setSelectedPaper({ paperId: paper.id, arxivId: paper.arxiv_id })}
                    className="w-full px-6 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      {paper.has_analysis ? (
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <XCircle className="h-5 w-5 text-gray-300 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{paper.title}</p>
                        {paper.arxiv_id && (
                          <p className="text-xs text-gray-500 mt-1">arXiv: {paper.arxiv_id}</p>
                        )}
                      </div>
                    </div>
                    {paper.has_analysis && (
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Brain className="h-4 w-4" />
                        {paper.analysis_count} analysis
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

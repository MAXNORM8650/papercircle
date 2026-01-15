import { useState, useEffect } from 'react';
import { X, ChevronDown, ChevronRight, Users, CheckCircle, XCircle, Loader2, GitBranch } from 'lucide-react';
import { useLineageAnalysis } from '../../contexts/LineageAnalysisContext';
import { useCommunity } from '../../contexts/CommunityContext';
import { supabase } from '../../lib/supabase';

interface Paper {
  id: string;
  title: string;
  arxiv_id?: string;
  has_analysis?: boolean;
}

interface Session {
  id: string;
  title: string;
  papers: Paper[];
  expanded: boolean;
}

interface Circle {
  id: string;
  name: string;
}

export function AnalysisHubPanel() {
  const { isAnalysisHubOpen, toggleAnalysisHub, selectedCircleId, setSelectedCircleId, openAnalysisWorkspace, getAnalysisResult } = useLineageAnalysis();
  const { communities, currentCommunity } = useCommunity();

  const [circles, setCircles] = useState<Circle[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCircle, setSelectedCircle] = useState<string | null>(null);

  // ============================================================================
  // Data Loading
  // ============================================================================

  useEffect(() => {
    // Load circles on mount
    if (communities && communities.length > 0) {
      setCircles(communities.map(c => ({ id: c.id, name: c.name })));

      // Set default circle
      if (currentCommunity?.id) {
        setSelectedCircle(currentCommunity.id);
        setSelectedCircleId(currentCommunity.id);
      } else if (selectedCircleId) {
        setSelectedCircle(selectedCircleId);
      }
    }
  }, [communities, currentCommunity]);

  useEffect(() => {
    if (selectedCircle) {
      loadCirclePapers(selectedCircle);
    }
  }, [selectedCircle]);

  const loadCirclePapers = async (circleId: string) => {
    setLoading(true);
    try {
      // Get sessions for this circle
      const { data: sessionsData, error: sessionsError } = await supabase
        .from('sessions')
        .select('id, title')
        .eq('community_id', circleId)
        .order('created_at', { ascending: false });

      if (sessionsError) throw sessionsError;

      // Get papers for each session
      const sessionsWithPapers: Session[] = await Promise.all(
        (sessionsData || []).map(async (session) => {
          const { data: sessionPapers, error: papersError } = await supabase
            .from('session_papers')
            .select(`
              paper_id,
              papers (
                id,
                title,
                arxiv_id
              )
            `)
            .eq('session_id', session.id);

          if (papersError) throw papersError;

          const papers: Paper[] = (sessionPapers || [])
            .map((sp: any) => ({
              id: sp.papers.id,
              title: sp.papers.title,
              arxiv_id: sp.papers.arxiv_id,
              has_analysis: !!getAnalysisResult(sp.papers.id),
            }))
            .filter((p: any) => p.id);

          return {
            id: session.id,
            title: session.title,
            papers,
            expanded: false,
          };
        })
      );

      setSessions(sessionsWithPapers);
    } catch (error) {
      console.error('Error loading circle papers:', error);
    } finally {
      setLoading(false);
    }
  };

  // ============================================================================
  // Handlers
  // ============================================================================

  const handleCircleChange = (circleId: string) => {
    setSelectedCircle(circleId);
    setSelectedCircleId(circleId);
  };

  const toggleSession = (sessionId: string) => {
    setSessions(prev =>
      prev.map(s =>
        s.id === sessionId ? { ...s, expanded: !s.expanded } : s
      )
    );
  };

  const handlePaperClick = (paper: Paper) => {
    openAnalysisWorkspace({
      id: paper.id,
      title: paper.title,
      arxiv_id: paper.arxiv_id,
      source: 'circle',
    });
  };

  // ============================================================================
  // Summary Stats
  // ============================================================================

  const totalPapers = sessions.reduce((sum, s) => sum + s.papers.length, 0);
  const analyzedPapers = sessions.reduce(
    (sum, s) => sum + s.papers.filter(p => p.has_analysis).length,
    0
  );

  // ============================================================================
  // Render
  // ============================================================================

  if (!isAnalysisHubOpen) {
    return null;
  }

  return (
    <div className="fixed right-0 top-0 h-screen w-96 bg-white border-l border-gray-200 shadow-2xl z-40 flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-900 flex items-center">
            <GitBranch className="w-5 h-5 mr-2 text-blue-500" />
            Analysis Hub
          </h3>
          <button
            onClick={toggleAnalysisHub}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Circle Selector */}
        <div className="mb-3">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Circle
          </label>
          <select
            value={selectedCircle || ''}
            onChange={(e) => handleCircleChange(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Circles</option>
            {circles.map((circle) => (
              <option key={circle.id} value={circle.id}>
                {circle.name}
              </option>
            ))}
          </select>
        </div>

        {/* Stats */}
        <div className="flex gap-3 text-sm">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-gray-600">
              {totalPapers} papers
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-600">
              {analyzedPapers} analyzed
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        ) : !selectedCircle ? (
          <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
            <Users className="w-16 h-16 text-gray-300 mb-4" />
            <p className="text-gray-600 text-sm">
              Select a circle to view papers and analysis status
            </p>
          </div>
        ) : sessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
            <Users className="w-16 h-16 text-gray-300 mb-4" />
            <p className="text-gray-600 text-sm">
              No sessions found in this circle
            </p>
          </div>
        ) : (
          <div className="py-2">
            {sessions.map((session) => (
              <div key={session.id} className="border-b border-gray-100 last:border-b-0">
                {/* Session Header */}
                <button
                  onClick={() => toggleSession(session.id)}
                  className="w-full px-6 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-2 flex-1">
                    {session.expanded ? (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    )}
                    <span className="text-sm font-medium text-gray-900 truncate">
                      {session.title}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {session.papers.length}
                  </span>
                </button>

                {/* Papers List */}
                {session.expanded && (
                  <div className="bg-gray-50">
                    {session.papers.map((paper) => (
                      <button
                        key={paper.id}
                        onClick={() => handlePaperClick(paper)}
                        className="w-full px-6 py-3 pl-12 flex items-center justify-between hover:bg-gray-100 transition-colors border-t border-gray-200"
                      >
                        <div className="flex-1 text-left">
                          <p className="text-sm text-gray-900 line-clamp-2 mb-1">
                            {paper.title}
                          </p>
                          {paper.arxiv_id && (
                            <p className="text-xs text-gray-500">
                              arXiv: {paper.arxiv_id}
                            </p>
                          )}
                        </div>
                        <div className="ml-3">
                          {paper.has_analysis ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <XCircle className="w-5 h-5 text-gray-300" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 px-6 py-3 bg-gray-50">
        <p className="text-xs text-gray-600 text-center">
          Click any paper to analyze and extract lineage
        </p>
      </div>
    </div>
  );
}

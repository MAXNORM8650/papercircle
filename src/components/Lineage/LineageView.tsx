import { useState, useEffect } from 'react';
import { GitBranch, TrendingUp, Activity, ChevronDown, ChevronRight, Calendar, Star } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Database } from '../../lib/database.types';

type Edge = Database['public']['Tables']['edges']['Row'] & {
  source_paper?: {
    id: string;
    title: string;
    year: number | null;
    authors: unknown;
    abstract: string | null;
    venue: string | null;
    citation_count: number;
  } | null;
  target_paper?: {
    id: string;
    title: string;
    year: number | null;
    authors: unknown;
    abstract: string | null;
    venue: string | null;
    citation_count: number;
  } | null;
};

type PaperNode = {
  id: string;
  title: string;
  year: number | null;
  authors: string[];
  abstract: string | null;
  venue: string | null;
  citation_count: number;
  presented_in_community: boolean;
  session_count: number;
  children: Edge[];
  parents: Edge[];
};

export function LineageView() {
  const [edges, setEdges] = useState<Edge[]>([]);
  const [papers, setPapers] = useState<Map<string, PaperNode>>(new Map());
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [edgeTypeFilter, setEdgeTypeFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'all' | 'community'>('all');
  const [selectedPaper, setSelectedPaper] = useState<PaperNode | null>(null);

  useEffect(() => {
    loadLineageData();
  }, [edgeTypeFilter, viewMode]);

  const loadLineageData = async () => {
    setLoading(true);

    let edgeQuery = supabase
      .from('edges')
      .select(`
        *,
        source_paper:papers!edges_source_paper_id_fkey(id, title, year, authors, abstract, venue, citation_count),
        target_paper:papers!edges_target_paper_id_fkey(id, title, year, authors, abstract, venue, citation_count)
      `)
      .order('created_at', { ascending: false });

    if (edgeTypeFilter !== 'all') {
      edgeQuery = edgeQuery.eq('edge_type', edgeTypeFilter);
    }

    const { data: edgesData } = await edgeQuery;

    const { data: sessionsData } = await supabase
      .from('sessions')
      .select('paper_id')
      .not('paper_id', 'is', null);

    const communityPaperIds = new Set(
      sessionsData?.map(s => s.paper_id).filter(Boolean) || []
    );

    if (edgesData) {
      const paperMap = new Map<string, PaperNode>();

      edgesData.forEach((edge) => {
        [edge.source_paper, edge.target_paper].forEach((paper) => {
          if (paper && !paperMap.has(paper.id)) {
            paperMap.set(paper.id, {
              id: paper.id,
              title: paper.title,
              year: paper.year,
              authors: Array.isArray(paper.authors) ? paper.authors as string[] : [],
              abstract: paper.abstract,
              venue: paper.venue,
              citation_count: paper.citation_count,
              presented_in_community: communityPaperIds.has(paper.id),
              session_count: 0,
              children: [],
              parents: [],
            });
          }
        });

        if (edge.source_paper_id && paperMap.has(edge.source_paper_id)) {
          paperMap.get(edge.source_paper_id)!.children.push(edge);
        }
        if (edge.target_paper_id && paperMap.has(edge.target_paper_id)) {
          paperMap.get(edge.target_paper_id)!.parents.push(edge);
        }
      });

      for (const paperId of communityPaperIds) {
        if (paperMap.has(paperId as string)) {
          const { count } = await supabase
            .from('sessions')
            .select('*', { count: 'exact', head: true })
            .eq('paper_id', paperId);

          paperMap.get(paperId as string)!.session_count = count || 0;
        }
      }

      let filteredEdges = edgesData;
      if (viewMode === 'community') {
        filteredEdges = edgesData.filter(
          edge =>
            (edge.source_paper_id && communityPaperIds.has(edge.source_paper_id)) ||
            (edge.target_paper_id && communityPaperIds.has(edge.target_paper_id))
        );
      }

      setEdges(filteredEdges);
      setPapers(paperMap);
    }

    setLoading(false);
  };

  const toggleNodeExpansion = (paperId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(paperId)) {
      newExpanded.delete(paperId);
    } else {
      newExpanded.add(paperId);
    }
    setExpandedNodes(newExpanded);
  };

  const getRootPapers = (): PaperNode[] => {
    return Array.from(papers.values())
      .filter(paper => paper.parents.length === 0 && paper.children.length > 0)
      .sort((a, b) => (b.year || 0) - (a.year || 0));
  };

  const edgeTypeLabels: Record<string, string> = {
    extends: 'Extends',
    applies: 'Applies to New Task',
    evaluates: 'Evaluates/Compares',
    contradicts: 'Contradicts',
    survey: 'Survey/Background',
    prerequisite: 'Prerequisite',
  };

  const edgeTypeColors: Record<string, string> = {
    extends: 'bg-blue-100 text-blue-800 border-blue-300',
    applies: 'bg-green-100 text-green-800 border-green-300',
    evaluates: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    contradicts: 'bg-red-100 text-red-800 border-red-300',
    survey: 'bg-purple-100 text-purple-800 border-purple-300',
    prerequisite: 'bg-gray-100 text-gray-800 border-gray-300',
  };

  const renderPaperNode = (paper: PaperNode, depth: number = 0) => {
    const isExpanded = expandedNodes.has(paper.id);
    const hasChildren = paper.children.length > 0;

    return (
      <div key={paper.id} className="mb-4" style={{ marginLeft: `${depth * 32}px` }}>
        <div
          className={`bg-white border-2 rounded-lg p-4 transition-all hover:shadow-lg ${
            paper.presented_in_community
              ? 'border-green-300 bg-green-50'
              : 'border-gray-200'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              {hasChildren && (
                <button
                  onClick={() => toggleNodeExpansion(paper.id)}
                  className="mt-1 p-1 hover:bg-gray-100 rounded transition-colors flex-shrink-0"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-5 w-5 text-gray-600" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-600" />
                  )}
                </button>
              )}
              {!hasChildren && <div className="w-7" />}

              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <button
                      onClick={() => setSelectedPaper(paper)}
                      className="text-left hover:text-blue-600 transition-colors"
                    >
                      <h3 className="font-semibold text-gray-900 text-lg mb-1">
                        {paper.title}
                      </h3>
                    </button>
                    <div className="flex items-center space-x-3 text-sm text-gray-600 mb-2">
                      {paper.authors.length > 0 && (
                        <span>{paper.authors.slice(0, 3).join(', ')}{paper.authors.length > 3 ? ', et al.' : ''}</span>
                      )}
                      {paper.year && <span className="font-medium">{paper.year}</span>}
                      {paper.venue && <span>{paper.venue}</span>}
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-1 ml-4">
                    {paper.presented_in_community && (
                      <div className="flex items-center space-x-1 px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                        <Star className="h-3 w-3" />
                        <span>Community</span>
                      </div>
                    )}
                    {paper.citation_count > 0 && (
                      <span className="text-xs text-gray-500">
                        {paper.citation_count} citations
                      </span>
                    )}
                  </div>
                </div>

                {paper.presented_in_community && paper.session_count > 0 && (
                  <div className="mb-2 px-3 py-1.5 bg-green-100 border border-green-200 rounded flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4 text-green-700" />
                    <span className="text-green-900">
                      Presented in {paper.session_count} session{paper.session_count > 1 ? 's' : ''}
                    </span>
                  </div>
                )}

                {hasChildren && (
                  <div className="mt-2 flex items-center space-x-2 text-sm text-gray-600">
                    <GitBranch className="h-4 w-4" />
                    <span>{paper.children.length} connection{paper.children.length > 1 ? 's' : ''}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {isExpanded && hasChildren && (
            <div className="mt-4 space-y-3 pl-10 border-l-2 border-gray-200">
              {paper.children.map((edge) => {
                const childPaper = edge.target_paper_id ? papers.get(edge.target_paper_id) : null;
                if (!childPaper) return null;

                return (
                  <div key={edge.id} className="space-y-3">
                    <div className="flex items-start space-x-3 -ml-10">
                      <div className="w-10 h-10 flex items-center justify-center">
                        <div className="w-2 h-2 bg-gray-300 rounded-full" />
                      </div>
                      <div className="flex-1 bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium border ${edgeTypeColors[edge.edge_type]}`}>
                            {edgeTypeLabels[edge.edge_type]}
                          </span>
                          {edge.similarity_score && (
                            <span className="text-xs text-gray-500">
                              {(edge.similarity_score * 100).toFixed(0)}% similarity
                            </span>
                          )}
                          {edge.is_ai_generated && (
                            <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                              AI
                            </span>
                          )}
                          {edge.verified_by && (
                            <span className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-medium">
                              Verified
                            </span>
                          )}
                        </div>
                        {edge.rationale && (
                          <p className="text-sm text-gray-700 italic">{edge.rationale}</p>
                        )}
                      </div>
                    </div>
                    {renderPaperNode(childPaper, depth + 1)}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  };

  const communityPaperCount = Array.from(papers.values()).filter(p => p.presented_in_community).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Paper Lineage</h1>
        <p className="text-gray-600">
          Explore research evolution and track community contributions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-2">
            <GitBranch className="h-8 w-8 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Total Links</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{edges.length}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-2">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Papers</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{papers.size}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border-2 border-green-300 bg-green-50 p-6">
          <div className="flex items-center space-x-3 mb-2">
            <Star className="h-8 w-8 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Community</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{communityPaperCount}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-2">
            <Activity className="h-8 w-8 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Verified</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {edges.filter((e) => e.verified_by).length}
          </p>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex rounded-lg border border-gray-300 overflow-hidden">
          <button
            onClick={() => setViewMode('all')}
            className={`px-4 py-2 font-medium transition-colors ${
              viewMode === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            All Papers
          </button>
          <button
            onClick={() => setViewMode('community')}
            className={`px-4 py-2 flex items-center space-x-2 font-medium transition-colors ${
              viewMode === 'community'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Star className="h-4 w-4" />
            <span>Community Papers</span>
          </button>
        </div>

        <div className="flex-1">
          <select
            value={edgeTypeFilter}
            onChange={(e) => setEdgeTypeFilter(e.target.value)}
            className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Relationship Types</option>
            {Object.entries(edgeTypeLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <GitBranch className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-900">
            <p className="font-medium mb-1">Interactive Lineage View</p>
            <ul className="list-disc list-inside space-y-1 text-blue-800">
              <li>Click arrows to expand/collapse paper connections</li>
              <li>Papers with <Star className="inline h-3 w-3" /> were presented in community sessions</li>
              <li>Relationship types show how papers build on each other</li>
              <li>AI-generated links include similarity scores and rationale</li>
            </ul>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading lineage data...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {getRootPapers().length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <GitBranch className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 mb-2">
                No paper lineage found.
              </p>
              <p className="text-sm text-gray-500">
                {viewMode === 'community'
                  ? 'Present papers in sessions to build your community knowledge graph.'
                  : 'Start connecting papers to track research evolution.'}
              </p>
            </div>
          ) : (
            <>
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Research Threads</h3>
                <p className="text-sm text-gray-600">
                  Showing {getRootPapers().length} root paper{getRootPapers().length > 1 ? 's' : ''} with lineage connections.
                  Expand nodes to explore how research builds upon foundational work.
                </p>
              </div>
              {getRootPapers().map((paper) => renderPaperNode(paper, 0))}
            </>
          )}
        </div>
      )}

      {selectedPaper && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedPaper.title}
                </h2>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  {selectedPaper.year && <span>{selectedPaper.year}</span>}
                  {selectedPaper.venue && <span>{selectedPaper.venue}</span>}
                </div>
              </div>
              <button
                onClick={() => setSelectedPaper(null)}
                className="text-gray-400 hover:text-gray-600 ml-4"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>

            <div className="p-6 space-y-4">
              {selectedPaper.presented_in_community && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-green-800 font-medium mb-2">
                    <Star className="h-5 w-5" />
                    <span>Community Paper</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Presented in {selectedPaper.session_count} reading group session{selectedPaper.session_count > 1 ? 's' : ''}
                  </p>
                </div>
              )}

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Authors</h3>
                <p className="text-gray-700">
                  {selectedPaper.authors.join(', ')}
                </p>
              </div>

              {selectedPaper.abstract && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Abstract</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedPaper.abstract}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Influences</h3>
                  <p className="text-2xl font-bold text-blue-600">
                    {selectedPaper.parents.length}
                  </p>
                  <p className="text-sm text-gray-600">papers this builds on</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Influenced</h3>
                  <p className="text-2xl font-bold text-green-600">
                    {selectedPaper.children.length}
                  </p>
                  <p className="text-sm text-gray-600">papers building on this</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

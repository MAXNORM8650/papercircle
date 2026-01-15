import { useState, useEffect } from 'react';
import {
  Brain,
  Network,
  Lightbulb,
  Wrench,
  FlaskConical,
  FileText,
  Loader,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { PaperAnalysisView } from '../Papers/PaperAnalysisView';
import { API_BASE_URL } from '../../lib/api';

interface SessionAnalysisViewProps {
  sessionId: string;
  communityId?: string;
}

interface SessionPaper {
  id: string;
  paper_id: string;
  paper_type: string;
  display_order: number;
  paper: {
    id: string;
    title: string;
    authors: string[];
    arxiv_id?: string;
  };
  analysis?: any;
}

interface AnalysisStats {
  total_concepts: number;
  total_methods: number;
  total_experiments: number;
  total_papers: number;
  analyzed_papers: number;
  processing_papers: number;
}

const API_BASE = API_BASE_URL;

export function SessionAnalysisView({ sessionId, communityId }: SessionAnalysisViewProps) {
  const [papers, setPapers] = useState<SessionPaper[]>([]);
  const [analyses, setAnalyses] = useState<Map<string, any>>(new Map());
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [expandedPaper, setExpandedPaper] = useState<string | null>(null);
  const [stats, setStats] = useState<AnalysisStats>({
    total_concepts: 0,
    total_methods: 0,
    total_experiments: 0,
    total_papers: 0,
    analyzed_papers: 0,
    processing_papers: 0,
  });

  useEffect(() => {
    loadSessionPapers();
  }, [sessionId]);

  useEffect(() => {
    if (papers.length > 0) {
      loadAnalyses();
    }
  }, [papers]);

  const loadSessionPapers = async () => {
    setLoading(true);
    try {
      // Fetch papers from Supabase
      const { data: papersData, error } = await supabase
        .from('session_papers')
        .select(`
          id,
          paper_id,
          paper_type,
          display_order,
          paper:papers(
            id,
            title,
            authors,
            arxiv_id
          )
        `)
        .eq('session_id', sessionId)
        .order('display_order');

      if (error) throw error;

      if (papersData) {
        setPapers(papersData as any);
      }
    } catch (error) {
      console.error('Error loading session papers:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAnalyses = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      const response = await fetch(`${API_BASE}/analysis/session/${sessionId}`, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        const analysisMap = new Map();

        data.analyses.forEach((analysis: any) => {
          analysisMap.set(analysis.paper_id, analysis);
        });

        setAnalyses(analysisMap);
        calculateStats(data.analyses);
      }
    } catch (error) {
      console.warn('Error loading analyses:', error);
    }
  };

  const calculateStats = (analysesArray: any[]) => {
    const newStats: AnalysisStats = {
      total_concepts: 0,
      total_methods: 0,
      total_experiments: 0,
      total_papers: papers.length,
      analyzed_papers: analysesArray.length,
      processing_papers: 0,
    };

    analysesArray.forEach((analysis) => {
      newStats.total_concepts += analysis.concepts_count || 0;
      newStats.total_methods += analysis.methods_count || 0;
      newStats.total_experiments += analysis.experiments_count || 0;
    });

    setStats(newStats);
  };

  const analyzeAllPapers = async () => {
    setAnalyzing(true);

    try {
      const response = await fetch(`${API_BASE}/analysis/session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          community_id: communityId,
          force_reanalyze: false,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Analysis started for', result.paper_count, 'papers');

        // Start polling for updates
        pollForUpdates();
      }
    } catch (error) {
      console.error('Error starting analysis:', error);
      setAnalyzing(false);
    }
  };

  const pollForUpdates = () => {
    const interval = setInterval(async () => {
      await loadAnalyses();

      // Stop polling when all papers are analyzed
      if (stats.analyzed_papers >= stats.total_papers) {
        clearInterval(interval);
        setAnalyzing(false);
      }
    }, 5000);

    // Stop after 10 minutes
    setTimeout(() => {
      clearInterval(interval);
      setAnalyzing(false);
    }, 600000);
  };

  const getPaperStatus = (paperId: string) => {
    if (analyses.has(paperId)) {
      return 'analyzed';
    } else if (analyzing) {
      return 'processing';
    }
    return 'pending';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'analyzed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'processing':
        return <Loader className="w-5 h-5 text-blue-500 animate-spin" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const renderCombinedInsights = () => {
    const allConcepts: any[] = [];
    const allMethods: any[] = [];
    const allExperiments: any[] = [];

    analyses.forEach((analysis) => {
      if (analysis.analysis_data?.nodes) {
        const concepts = analysis.analysis_data.nodes.filter(
          (n: any) => n.type === 'concept'
        );
        const methods = analysis.analysis_data.nodes.filter(
          (n: any) => n.type === 'method'
        );
        const experiments = analysis.analysis_data.nodes.filter(
          (n: any) => n.type === 'experiment'
        );

        allConcepts.push(...concepts.map((c: any) => ({ ...c, paper_id: analysis.paper_id })));
        allMethods.push(...methods.map((m: any) => ({ ...m, paper_id: analysis.paper_id })));
        allExperiments.push(...experiments.map((e: any) => ({ ...e, paper_id: analysis.paper_id })));
      }
    });

    return (
      <div className="grid gap-6 mt-6">
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
            <Lightbulb className="w-5 h-5 mr-2" />
            Common Concepts ({allConcepts.length})
          </h3>
          <div className="grid gap-3 max-h-96 overflow-y-auto">
            {allConcepts.slice(0, 10).map((concept) => (
              <div key={concept.id} className="bg-white rounded p-3">
                <h4 className="font-medium text-gray-900">{concept.title}</h4>
                <p className="text-sm text-gray-600 line-clamp-2">{concept.description}</p>
              </div>
            ))}
            {allConcepts.length > 10 && (
              <p className="text-sm text-blue-600">
                +{allConcepts.length - 10} more concepts
              </p>
            )}
          </div>
        </div>

        <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
          <h3 className="text-lg font-semibold text-orange-900 mb-4 flex items-center">
            <Wrench className="w-5 h-5 mr-2" />
            Methods & Techniques ({allMethods.length})
          </h3>
          <div className="grid gap-3 max-h-96 overflow-y-auto">
            {allMethods.slice(0, 10).map((method) => (
              <div key={method.id} className="bg-white rounded p-3">
                <h4 className="font-medium text-gray-900">{method.title}</h4>
                <p className="text-sm text-gray-600 line-clamp-2">{method.description}</p>
              </div>
            ))}
            {allMethods.length > 10 && (
              <p className="text-sm text-orange-600">
                +{allMethods.length - 10} more methods
              </p>
            )}
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
          <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
            <FlaskConical className="w-5 h-5 mr-2" />
            Experiments & Results ({allExperiments.length})
          </h3>
          <div className="grid gap-3 max-h-96 overflow-y-auto">
            {allExperiments.slice(0, 10).map((experiment) => (
              <div key={experiment.id} className="bg-white rounded p-3">
                <h4 className="font-medium text-gray-900">{experiment.title}</h4>
                <p className="text-sm text-gray-600 line-clamp-2">{experiment.description}</p>
              </div>
            ))}
            {allExperiments.length > 10 && (
              <p className="text-sm text-green-600">
                +{allExperiments.length - 10} more experiments
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Brain className="w-8 h-8 text-blue-500 mr-3" />
            Session Analysis
          </h2>
          <button
            onClick={analyzeAllPapers}
            disabled={analyzing}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center"
          >
            {analyzing ? (
              <>
                <Loader className="w-5 h-5 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <RefreshCw className="w-5 h-5 mr-2" />
                Analyze All Papers
              </>
            )}
          </button>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-5 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">Total Papers</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total_papers}</p>
              </div>
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">Concepts</p>
                <p className="text-2xl font-bold text-blue-900">{stats.total_concepts}</p>
              </div>
              <Lightbulb className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">Methods</p>
                <p className="text-2xl font-bold text-orange-900">{stats.total_methods}</p>
              </div>
              <Wrench className="w-8 h-8 text-orange-500" />
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">Experiments</p>
                <p className="text-2xl font-bold text-green-900">{stats.total_experiments}</p>
              </div>
              <FlaskConical className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">Analyzed</p>
                <p className="text-2xl font-bold text-purple-900">
                  {stats.analyzed_papers}/{stats.total_papers}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Combined Insights */}
      {stats.analyzed_papers > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Combined Insights Across All Papers
          </h3>
          {renderCombinedInsights()}
        </div>
      )}

      {/* Individual Paper Analyses */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">
            Individual Paper Analyses
          </h3>
        </div>

        <div className="divide-y divide-gray-200">
          {papers.map((sessionPaper) => {
            const status = getPaperStatus(sessionPaper.paper_id);
            const isExpanded = expandedPaper === sessionPaper.paper_id;

            return (
              <div key={sessionPaper.id} className="p-6">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() =>
                    setExpandedPaper(isExpanded ? null : sessionPaper.paper_id)
                  }
                >
                  <div className="flex items-center flex-1">
                    {getStatusIcon(status)}
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {sessionPaper.paper.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {sessionPaper.paper.authors.slice(0, 3).join(', ')}
                        {sessionPaper.paper.authors.length > 3 && ' et al.'}
                      </p>
                      <span className="inline-block mt-1 px-2 py-1 text-xs bg-gray-100 rounded">
                        {sessionPaper.paper_type}
                      </span>
                    </div>
                  </div>

                  {status === 'analyzed' && (
                    <div className="flex items-center gap-4 mr-4">
                      <div className="text-center">
                        <p className="text-xs text-gray-600">Concepts</p>
                        <p className="text-lg font-semibold text-blue-600">
                          {analyses.get(sessionPaper.paper_id)?.concepts_count || 0}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-600">Methods</p>
                        <p className="text-lg font-semibold text-orange-600">
                          {analyses.get(sessionPaper.paper_id)?.methods_count || 0}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-600">Experiments</p>
                        <p className="text-lg font-semibold text-green-600">
                          {analyses.get(sessionPaper.paper_id)?.experiments_count || 0}
                        </p>
                      </div>
                    </div>
                  )}

                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>

                {isExpanded && (
                  <div className="mt-6">
                    <PaperAnalysisView
                      paperId={sessionPaper.paper_id}
                      communityId={communityId}
                      sessionId={sessionId}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {papers.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Papers in Session
          </h3>
          <p className="text-gray-600">
            Add papers to this session to analyze them.
          </p>
        </div>
      )}
    </div>
  );
}

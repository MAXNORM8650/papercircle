import { useState, useEffect } from 'react';
import { Brain, Calendar, FileText, ArrowLeft, Loader, AlertCircle, Lightbulb, Wrench, FlaskConical } from 'lucide-react';
import { PaperAnalysisView } from '../Papers/PaperAnalysisView';
import { PaperSelectionModal } from './PaperSelectionModal';
import { useLineageAnalysis, PaperInfo } from '../../contexts/LineageAnalysisContext';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

interface AnalyzedPaper {
  paper_id: string;
  analysis_id: string;
  title: string;
  authors: string[];
  arxiv_id?: string;
  created_at: string;
  concepts_count: number;
  methods_count: number;
  experiments_count: number;
}

interface PaperAnalysisListManagerProps {
  circleId?: string | null;
}

const API_BASE = 'http://127.0.0.1:8000';

export function PaperAnalysisListManager({ circleId }: PaperAnalysisListManagerProps) {
  const { addAnalyzedPaper } = useLineageAnalysis();
  const { user } = useAuth();
  const [papers, setPapers] = useState<AnalyzedPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPaperId, setSelectedPaperId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  // Load analyzed papers from backend
  useEffect(() => {
    loadAnalyzedPapers();
  }, [circleId]);

  const loadAnalyzedPapers = async () => {
    setLoading(true);
    setError(null);

    try {
      // Query paper_analysis table with paper metadata
      let query = supabase
        .from('paper_analysis')
        .select(`
          id,
          paper_id,
          created_at,
          concepts_count,
          methods_count,
          experiments_count,
          papers:paper_id (
            id,
            title,
            authors,
            arxiv_id
          )
        `)
        .order('created_at', { ascending: false });

      if (circleId) {
        query = query.eq('community_id', circleId);
      }

      const { data, error: queryError } = await query;

      if (queryError) throw queryError;

      // Transform data to match our interface
      const analyzedPapers: AnalyzedPaper[] = (data || []).map((item: any) => ({
        paper_id: item.paper_id,
        analysis_id: item.id,
        title: item.papers?.title || 'Unknown Title',
        authors: item.papers?.authors || [],
        arxiv_id: item.papers?.arxiv_id,
        created_at: item.created_at,
        concepts_count: item.concepts_count || 0,
        methods_count: item.methods_count || 0,
        experiments_count: item.experiments_count || 0,
      }));

      setPapers(analyzedPapers);
    } catch (err) {
      console.error('Error loading analyzed papers:', err);
      setError('Failed to load analyzed papers');
    } finally {
      setLoading(false);
    }
  };

  const handleAddPaper = async (paperInfo: PaperInfo) => {
    setShowAddModal(false);
    setAnalyzing(true);
    setError(null);

    try {
      let response;

      // Ensure user_id is provided - this enables custom LLM config from user dashboard
      if (!user?.id) {
        throw new Error('User authentication required for paper analysis');
      }

      if (paperInfo.source === 'url' && paperInfo.pdf_url) {
        // Analyze from URL - use the paper endpoint with manual_url
        // First create a paper record, then analyze it
        response = await fetch(`${API_BASE}/analysis/paper`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paper_id: paperInfo.id || '',
            manual_url: paperInfo.pdf_url,
            community_id: circleId,
            user_id: user.id, // Required for LLM config
          }),
        });
      } else if (paperInfo.source === 'saved' || paperInfo.source === 'circle') {
        // Analyze existing paper by ID
        if (!paperInfo.id) throw new Error('Paper ID is required');

        response = await fetch(`${API_BASE}/analysis/paper`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paper_id: paperInfo.id,
            community_id: circleId,
            user_id: user.id, // Required for LLM config
          }),
        });
      } else if (paperInfo.source === 'upload' && paperInfo.uploadedFile) {
        // Upload PDF file for analysis
        const formData = new FormData();
        formData.append('file', paperInfo.uploadedFile);
        formData.append('user_id', user.id);
        if (circleId) {
          formData.append('community_id', circleId);
        }

        response = await fetch(`${API_BASE}/analysis/upload`, {
          method: 'POST',
          body: formData,
        });
      } else {
        throw new Error('Invalid paper source');
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Analysis failed' }));
        throw new Error(errorData.detail || 'Analysis failed');
      }

      const result = await response.json();

      // Add to context tracking
      if (result.paper_id) {
        addAnalyzedPaper(result.paper_id);
      }

      // Reload the list
      await loadAnalyzedPapers();

      // Show success message
      console.log('Analysis complete:', result);
    } catch (err) {
      console.error('Error analyzing paper:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze paper');
    } finally {
      setAnalyzing(false);
    }
  };

  // Detail view - show full PaperAnalysisView
  if (selectedPaperId) {
    return (
      <div>
        <button
          onClick={() => setSelectedPaperId(null)}
          className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to List
        </button>
        <PaperAnalysisView
          paperId={selectedPaperId}
          communityId={circleId || undefined}
        />
      </div>
    );
  }

  // List view
  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Paper Analysis</h2>
          <p className="text-gray-600 mt-1">
            Analyze papers to extract concepts, methods, and experiments
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          disabled={analyzing}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Brain className="w-4 h-4" />
          Add Paper to Analyze
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-800 font-medium">Error</p>
            <p className="text-red-600 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Analyzing Message */}
      {analyzing && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2">
          <Loader className="w-5 h-5 text-blue-600 animate-spin" />
          <p className="text-blue-800">Analyzing paper... This may take a minute.</p>
        </div>
      )}

      {/* Loading State */}
      {loading && !analyzing ? (
        <div className="flex items-center justify-center py-12">
          <Loader className="w-6 h-6 text-gray-400 animate-spin" />
          <span className="ml-2 text-gray-600">Loading analyzed papers...</span>
        </div>
      ) : papers.length === 0 ? (
        // Empty State
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No papers analyzed yet</h3>
          <p className="text-gray-600 mb-4">
            Get started by analyzing a paper to extract its key concepts, methods, and experiments.
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Analyze Your First Paper
          </button>
        </div>
      ) : (
        // Papers List
        <div className="grid gap-4">
          {papers.map((paper) => (
            <div
              key={paper.analysis_id}
              onClick={() => setSelectedPaperId(paper.paper_id)}
              className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {paper.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    {paper.authors && paper.authors.length > 0 && (
                      <span>
                        {Array.isArray(paper.authors)
                          ? paper.authors.slice(0, 3).join(', ')
                          : typeof paper.authors === 'string'
                          ? paper.authors
                          : 'Unknown authors'}
                        {Array.isArray(paper.authors) && paper.authors.length > 3 && ' et al.'}
                      </span>
                    )}
                    {paper.arxiv_id && (
                      <span className="text-blue-600">arXiv:{paper.arxiv_id}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2 text-purple-600">
                      <Lightbulb className="w-4 h-4" />
                      <span>{paper.concepts_count} concepts</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-600">
                      <Wrench className="w-4 h-4" />
                      <span>{paper.methods_count} methods</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-600">
                      <FlaskConical className="w-4 h-4" />
                      <span>{paper.experiments_count} experiments</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(paper.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Paper Selection Modal */}
      {showAddModal && (
        <PaperSelectionModal
          onSubmit={handleAddPaper}
          onClose={() => setShowAddModal(false)}
          circleId={circleId}
        />
      )}
    </div>
  );
}

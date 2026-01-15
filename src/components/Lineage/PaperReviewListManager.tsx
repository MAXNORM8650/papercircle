import { useState, useEffect } from 'react';
import { FileCheck, Calendar, ArrowLeft, Loader, AlertCircle, Network, CheckCircle, Clock, XCircle } from 'lucide-react';
import { PaperReviewView } from '../Papers/PaperReviewView';
import { PaperSelectionModal } from './PaperSelectionModal';
import { useLineageAnalysis, PaperInfo, Edge } from '../../contexts/LineageAnalysisContext';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

interface ReviewedPaper {
  paper_id: string;
  review_id: string;
  title: string;
  authors: string[];
  arxiv_id?: string;
  created_at: string;
  lineage_count: number;
  status?: 'pending' | 'processing' | 'completed' | 'failed';
  error_message?: string;
}

interface PaperReviewListManagerProps {
  circleId?: string | null;
}

const API_BASE = 'http://127.0.0.1:8000';
const POLL_INTERVAL = 3000; // Poll every 3 seconds

export function PaperReviewListManager({ circleId }: PaperReviewListManagerProps) {
  const { addReviewedPaper, addEdgesToGraph } = useLineageAnalysis();
  const { user } = useAuth();
  const [papers, setPapers] = useState<ReviewedPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPaperId, setSelectedPaperId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [reviewing, setReviewing] = useState(false);
  const [reviewProgress, setReviewProgress] = useState<string>('Starting review...');

  // Load reviewed papers
  useEffect(() => {
    loadReviewedPapers();
  }, [circleId]);

  const loadReviewedPapers = async () => {
    setLoading(true);
    setError(null);

    try {
      // Query the paper_reviews table which tracks review status
      // Use left join (!left) to include reviews even if paper record is missing
      let query = supabase
        .from('paper_reviews')
        .select(`
          id,
          paper_id,
          created_at,
          status,
          error_message,
          lineage_data,
          review_data,
          papers:paper_id!left (
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
      const reviewedPapers: ReviewedPaper[] = (data || []).map((item: any) => {
        // Try to get title from papers join, or fallback to review_data metadata
        let title = item.papers?.title;
        let authors = item.papers?.authors || [];

        // If no paper record, try to extract from review_data
        if (!title && item.review_data) {
          const reviewData = typeof item.review_data === 'string'
            ? JSON.parse(item.review_data)
            : item.review_data;
          // Try to get from summary or metadata
          const summary = reviewData?.summary;
          if (summary?.title) {
            title = summary.title;
          }
          if (summary?.authors) {
            authors = summary.authors;
          }
        }

        return {
          paper_id: item.paper_id,
          review_id: item.id,
          title: title || 'Unknown Title',
          authors: authors,
          arxiv_id: item.papers?.arxiv_id,
          created_at: item.created_at,
          lineage_count: Array.isArray(item.lineage_data) ? item.lineage_data.length : 0,
          status: item.status || 'completed',
          error_message: item.error_message,
        };
      });

      setPapers(reviewedPapers);
    } catch (err) {
      console.error('Error loading reviewed papers:', err);
      setError('Failed to load reviewed papers');
    } finally {
      setLoading(false);
    }
  };

  // Poll for review completion
  const pollForCompletion = async (jobId: string, paperId?: string) => {
    const poll = async () => {
      try {
        const response = await fetch(`${API_BASE}/review/status/${jobId}`);
        if (!response.ok) {
          throw new Error('Failed to get review status');
        }

        const statusData = await response.json();
        console.log('Review status:', statusData);

        // Update progress message
        if (statusData.message) {
          setReviewProgress(statusData.message);
        }
        if (statusData.progress) {
          setReviewProgress(`${statusData.message || 'Processing'} (${statusData.progress}%)`);
        }

        if (statusData.status === 'completed') {
          // Review is complete
          const reviewResult = statusData.result;

          if (reviewResult?.paper_id) {
            addReviewedPaper(reviewResult.paper_id);
          }

          // Extract and add lineage edges to context
          if (reviewResult?.lineage_relationships && reviewResult.lineage_relationships.length > 0) {
            const edges: Edge[] = reviewResult.lineage_relationships.map((rel: any) => ({
              source_paper_id: reviewResult.paper_id || paperId || '',
              target_paper_id: rel.matched_paper_id || '',
              edge_type: rel.edge_type,
              similarity_score: rel.similarity_score,
              rationale: rel.rationale,
              is_ai_generated: true,
              source_type: 'ai_review',
              confidence_score: rel.similarity_score,
              target_title: rel.target_paper_title,
            }));

            addEdgesToGraph(edges);
            console.log(`Extracted ${edges.length} lineage relationships from review`);
          }

          // Reload the list and stop reviewing
          await loadReviewedPapers();
          setReviewing(false);
          setReviewProgress('Starting review...');
          return;
        } else if (statusData.status === 'failed') {
          setError(statusData.message || 'Review processing failed');
          setReviewing(false);
          setReviewProgress('Starting review...');
          await loadReviewedPapers();
          return;
        }

        // Still processing - continue polling
        setTimeout(poll, POLL_INTERVAL);
      } catch (err) {
        console.error('Error polling review status:', err);
        setError(err instanceof Error ? err.message : 'Failed to get review status');
        setReviewing(false);
        setReviewProgress('Starting review...');
      }
    };

    // Start polling
    poll();
  };

  const handleAddPaper = async (paperInfo: PaperInfo) => {
    setShowAddModal(false);
    setReviewing(true);
    setReviewProgress('Starting review...');
    setError(null);

    try {
      let response;

      // Ensure user_id is provided - this enables custom LLM config from user dashboard
      if (!user?.id) {
        throw new Error('User authentication required for paper review');
      }

      if (paperInfo.source === 'url' && paperInfo.pdf_url) {
        // Review from URL - use /review/full endpoint
        response = await fetch(`${API_BASE}/review/full`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paper_url: paperInfo.pdf_url,
            paper_id: paperInfo.id,
            user_id: user.id, // Required for LLM config
            community_id: circleId,
            include_lineage: true,
            include_graph: true,
          }),
        });
      } else if (paperInfo.source === 'saved' || paperInfo.source === 'circle') {
        // Review existing paper by ID - need paper URL
        if (!paperInfo.id) throw new Error('Paper ID is required');

        // For saved papers, we need the paper URL from arxiv_id or pdf_url
        const paperUrl = paperInfo.arxiv_id
          ? `https://arxiv.org/abs/${paperInfo.arxiv_id}`
          : paperInfo.pdf_url;

        if (!paperUrl) {
          throw new Error('Paper has no URL available for analysis');
        }

        response = await fetch(`${API_BASE}/review/full`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paper_url: paperUrl,
            paper_id: paperInfo.id,
            user_id: user.id, // Required for LLM config
            community_id: circleId,
            include_lineage: true,
            include_graph: true,
          }),
        });
      } else if (paperInfo.source === 'upload' && paperInfo.uploadedFile) {
        // Review from file upload
        const formData = new FormData();
        formData.append('file', paperInfo.uploadedFile);
        if (paperInfo.id) formData.append('paper_id', paperInfo.id);
        formData.append('user_id', user.id); // Required for LLM config
        if (circleId) formData.append('community_id', circleId);
        formData.append('include_lineage', 'true');
        formData.append('include_graph', 'true');

        response = await fetch(`${API_BASE}/review/upload`, {
          method: 'POST',
          body: formData,
        });
      } else {
        throw new Error('Invalid paper source');
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Review failed' }));
        throw new Error(errorData.detail || 'Review failed');
      }

      const result = await response.json();

      // Check if this is an async job that needs polling
      if (result.status === 'started' && result.job_id) {
        setReviewProgress(result.message || 'Review started...');
        pollForCompletion(result.job_id, paperInfo.id);
        return; // Don't set reviewing to false - polling will handle it
      }

      // Synchronous response - process immediately
      // Add to context tracking
      if (result.paper_id) {
        addReviewedPaper(result.paper_id);
      }

      // Extract and add lineage edges to context
      if (result.lineage_relationships && result.lineage_relationships.length > 0) {
        const edges: Edge[] = result.lineage_relationships.map((rel: any) => ({
          source_paper_id: result.paper_id || paperInfo.id || '',
          target_paper_id: rel.matched_paper_id || '',
          edge_type: rel.edge_type,
          similarity_score: rel.similarity_score,
          rationale: rel.rationale,
          is_ai_generated: true,
          source_type: 'ai_review',
          confidence_score: rel.similarity_score,
          target_title: rel.target_paper_title,
        }));

        addEdgesToGraph(edges);
        console.log(`Extracted ${edges.length} lineage relationships from review`);
      }

      // Reload the list
      await loadReviewedPapers();

      // Show success message
      console.log('Review complete:', result);
      setReviewing(false);
    } catch (err) {
      console.error('Error reviewing paper:', err);
      setError(err instanceof Error ? err.message : 'Failed to review paper');
      setReviewing(false);
    }
  };

  const handleLineageExtracted = (relationships: Edge[]) => {
    // This callback is called when viewing an existing review
    addEdgesToGraph(relationships);
    console.log(`Loaded ${relationships.length} lineage relationships from review`);
  };

  // Detail view - show full PaperReviewView
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
        <PaperReviewView
          paperId={selectedPaperId}
          communityId={circleId || undefined}
          onLineageExtracted={handleLineageExtracted}
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
          <h2 className="text-2xl font-bold text-gray-900">Paper Review</h2>
          <p className="text-gray-600 mt-1">
            Generate comprehensive reviews with conference-style critiques and lineage extraction
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          disabled={reviewing}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <FileCheck className="w-4 h-4" />
          Add Paper to Review
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

      {/* Reviewing Message */}
      {reviewing && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
          <Loader className="w-5 h-5 text-green-600 animate-spin" />
          <div>
            <p className="text-green-800 font-medium">Reviewing paper...</p>
            <p className="text-green-600 text-sm">
              {reviewProgress}
            </p>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && !reviewing ? (
        <div className="flex items-center justify-center py-12">
          <Loader className="w-6 h-6 text-gray-400 animate-spin" />
          <span className="ml-2 text-gray-600">Loading reviewed papers...</span>
        </div>
      ) : papers.length === 0 ? (
        // Empty State
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <FileCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No papers reviewed yet</h3>
          <p className="text-gray-600 mb-4">
            Get started by reviewing a paper to generate a comprehensive conference-style critique and extract lineage relationships.
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Review Your First Paper
          </button>
        </div>
      ) : (
        // Papers List
        <div className="grid gap-4">
          {papers.map((paper) => (
            <div
              key={paper.review_id}
              onClick={() => setSelectedPaperId(paper.paper_id)}
              className={`p-4 bg-white border rounded-lg hover:shadow-md transition-shadow cursor-pointer ${
                paper.status === 'failed' ? 'border-red-200' :
                paper.status === 'processing' || paper.status === 'pending' ? 'border-yellow-200' :
                'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {paper.title}
                    </h3>
                    {/* Status Badge */}
                    {paper.status === 'pending' || paper.status === 'processing' ? (
                      <span className="flex items-center gap-1 px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                        <Loader className="w-3 h-3 animate-spin" />
                        {paper.status === 'pending' ? 'Pending' : 'Processing'}
                      </span>
                    ) : paper.status === 'failed' ? (
                      <span className="flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">
                        <XCircle className="w-3 h-3" />
                        Failed
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                        <CheckCircle className="w-3 h-3" />
                        Completed
                      </span>
                    )}
                  </div>
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
                      <span className="text-green-600">arXiv:{paper.arxiv_id}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    {paper.status === 'completed' ? (
                      <div className="flex items-center gap-2 text-purple-600">
                        <Network className="w-4 h-4" />
                        <span>{paper.lineage_count} lineage relationships</span>
                      </div>
                    ) : paper.status === 'failed' && paper.error_message ? (
                      <div className="flex items-center gap-2 text-red-600">
                        <AlertCircle className="w-4 h-4" />
                        <span className="truncate max-w-md">{paper.error_message}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-yellow-600">
                        <Clock className="w-4 h-4" />
                        <span>Review in progress...</span>
                      </div>
                    )}
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

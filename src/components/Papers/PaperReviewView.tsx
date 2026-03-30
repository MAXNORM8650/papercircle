import { useState, useEffect } from 'react';
import {
  FileCheck,
  Award,
  Search,
  FlaskConical,
  BookOpen,
  Network,
  Download,
  RefreshCw,
  Loader,
  AlertCircle,
  ExternalLink,
  CheckCircle,
  XCircle,
  Code,
  Database,
  BarChart3
} from 'lucide-react';
import { InteractiveGraph } from './InteractiveGraph';
import { Edge } from '../../contexts/LineageAnalysisContext';
import { useAuth } from '../../contexts/AuthContext';
import { API_BASE_URL } from '../../lib/api';

interface PaperReviewViewProps {
  paperId: string;
  communityId?: string;
  sessionId?: string;
  arxivId?: string;
  onClose?: () => void;
  onLineageExtracted?: (relationships: Edge[]) => void;
  onAnalysisComplete?: (analysisData: any) => void;
}

interface Review {
  review_id: string;
  paper_id: string;
  paper_url: string;
  status: string;
  review_data: {
    conference_review?: any;
    deep_analysis?: string;
    contributions?: any;
    reproducibility?: any;
    summary?: any;
    literature?: any;
  };
  graph_data?: {
    nodes: Record<string, any>;
    edges: Record<string, any>;
    stats: any;
  };
  lineage_relationships?: Array<{
    target_paper_title: string;
    target_paper_arxiv_id?: string;
    edge_type: string;
    similarity_score: number;
    rationale: string;
    matched_paper_id?: string;
  }>;
  lineage_stats?: any;
  processing_time?: number;
  created_at?: string;
}

type Tab = 'summary' | 'review' | 'analysis' | 'contributions' | 'reproducibility' | 'lineage' | 'graph';

const API_BASE = `${API_BASE_URL}/review`;
const POLL_INTERVAL = 3000; // Poll every 3 seconds

export function PaperReviewView({
  paperId,
  communityId,
  sessionId,
  arxivId,
  onClose,
  onLineageExtracted,
  onAnalysisComplete
}: PaperReviewViewProps) {
  const { user } = useAuth();
  const [review, setReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('summary');
  const [manualUrl, setManualUrl] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadMode, setUploadMode] = useState<'url' | 'file'>('url');
  const [activeJobId, setActiveJobId] = useState<string | null>(null);
  const [reviewProgress, setReviewProgress] = useState<number>(0);
  const [reviewMessage, setReviewMessage] = useState<string>('');

  useEffect(() => {
    // On mount: check localStorage for an active review job and resume polling
    const storageKey = `papercircle_review_job_${paperId}`;
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        const job = JSON.parse(stored);
        if (job.jobId) {
          setActiveJobId(job.jobId);
          setProcessing(true);
          setLoading(false);
          // Check if still running via backend
          fetch(`${API_BASE}/status/${job.jobId}`)
            .then(res => res.ok ? res.json() : null)
            .then(status => {
              if (status && (status.status === 'running' || status.status === 'pending')) {
                setReviewProgress(status.progress || 0);
                setReviewMessage(status.message || 'Processing...');
                pollForCompletion(job.jobId);
              } else if (status && status.status === 'completed' && status.result) {
                setReview(status.result);
                handleReviewComplete(status.result);
                setProcessing(false);
                localStorage.removeItem(storageKey);
              } else {
                // Job failed or not found
                setProcessing(false);
                localStorage.removeItem(storageKey);
                loadReview();
              }
            })
            .catch(() => {
              localStorage.removeItem(storageKey);
              setProcessing(false);
              loadReview();
            });
          return; // Skip normal loadReview
        }
      } catch {
        localStorage.removeItem(storageKey);
      }
    }
    loadReview();
  }, [paperId, communityId, sessionId]);

  const loadReview = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch existing review from database
      const response = await fetch(`${API_BASE}/paper/${paperId}${communityId ? `?community_id=${communityId}` : ''}`);

      if (!response.ok) {
        throw new Error('Failed to fetch review');
      }

      const data = await response.json();

      if (data.status === 'not_found' || !data.paper_id) {
        // No existing review found
        setReview(null);
        setError('No review found for this paper. Click "Review Paper" to generate one.');
      } else if (data.status === 'pending' || data.status === 'processing') {
        // Review is in progress - resume polling
        setProcessing(true);
        setError(null);
        if (data.job_id) {
          pollForCompletion(data.job_id);
        } else {
          // No job_id but still pending - might be stale, show message
          setError('A review was started but is not currently active. Click "Review Paper" to start a new one.');
          setProcessing(false);
        }
      } else if (data.status === 'failed') {
        // Review failed - show error and allow retry
        setReview(null);
        setError(data.error_message || 'Previous review failed. Click "Review Paper" to try again.');
      } else {
        // Review is completed - Transform database format to component format
        const reviewData: Review = {
          review_id: data.id,
          paper_id: data.paper_id,
          paper_url: data.paper_url || '',
          status: 'completed',
          review_data: data.review_data || {},
          graph_data: data.graph_data,
          lineage_relationships: data.lineage_data || [],
          processing_time: data.processing_time_seconds,
          created_at: data.created_at,
        };
        setReview(reviewData);
        setError(null);

        // Notify parent components if callbacks provided
        if (reviewData.lineage_relationships && reviewData.lineage_relationships.length > 0) {
          handleReviewComplete(reviewData);
        }
      }
    } catch (err) {
      console.error('Error loading review:', err);
      setReview(null);
      setError('No review found for this paper. Click "Review Paper" to generate one.');
    } finally {
      setLoading(false);
    }
  };

  const pollForCompletion = async (jobId: string) => {
    const storageKey = `papercircle_review_job_${paperId}`;

    const poll = async () => {
      try {
        const response = await fetch(`${API_BASE}/status/${jobId}`);
        if (!response.ok) {
          throw new Error('Failed to get review status');
        }

        const statusData = await response.json();
        console.log('Review status:', statusData);

        // Update progress
        if (statusData.progress !== undefined) setReviewProgress(statusData.progress);
        if (statusData.message) setReviewMessage(statusData.message);

        if (statusData.status === 'completed') {
          const reviewResult = statusData.result;
          if (reviewResult) {
            setReview(reviewResult);
            handleReviewComplete(reviewResult);
          }
          setProcessing(false);
          setActiveJobId(null);
          localStorage.removeItem(storageKey);
          return;
        } else if (statusData.status === 'failed') {
          setError(statusData.message || 'Review processing failed');
          setProcessing(false);
          setActiveJobId(null);
          localStorage.removeItem(storageKey);
          return;
        } else if (statusData.status === 'cancelled') {
          setError('Review was cancelled.');
          setProcessing(false);
          setActiveJobId(null);
          localStorage.removeItem(storageKey);
          return;
        }

        // Still processing - continue polling
        setTimeout(poll, POLL_INTERVAL);
      } catch (err) {
        console.error('Error polling review status:', err);
        setError(err instanceof Error ? err.message : 'Failed to get review status');
        setProcessing(false);
        setActiveJobId(null);
      }
    };

    poll();
  };

  const handleReviewComplete = (result: Review) => {
    // Call callbacks if provided
    if (result.lineage_relationships && result.lineage_relationships.length > 0 && onLineageExtracted) {
      // Transform to Edge[] format
      const edges: Edge[] = result.lineage_relationships.map((rel: any) => ({
        source_paper_id: paperId,
        target_paper_id: rel.matched_paper_id || '',
        edge_type: rel.edge_type,
        similarity_score: rel.similarity_score,
        rationale: rel.rationale,
        target_title: rel.target_paper_title,
        target_authors: '',
        target_year: '',
      }));
      onLineageExtracted(edges);
    }

    if (onAnalysisComplete) {
      onAnalysisComplete({
        review: result.review_data,
        graph: result.graph_data,
      });
    }
  };

  const startReview = async (providedUrl?: string) => {
    setProcessing(true);
    setError(null);

    const urlToUse = providedUrl || manualUrl || arxivId;

    if (!urlToUse) {
      setError('Please provide a paper URL or arXiv ID');
      setShowUrlInput(true);
      setProcessing(false);
      return;
    }

    try {
      // Use the /full endpoint which starts an async review job
      const response = await fetch(`${API_BASE}/full`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paper_url: urlToUse,
          paper_id: paperId,
          user_id: user?.id,
          community_id: communityId,
          include_graph: true,
          include_lineage: true,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to start review');
      }

      const result = await response.json();
      console.log('Review job started:', result);

      if (result.job_id) {
        setActiveJobId(result.job_id);
        // Persist to localStorage so we can resume after page refresh
        localStorage.setItem(`papercircle_review_job_${paperId}`, JSON.stringify({
          jobId: result.job_id,
          paperId,
          startedAt: new Date().toISOString(),
        }));
        pollForCompletion(result.job_id);
      } else if (result.status === 'completed' && result.result) {
        setReview(result.result);
        handleReviewComplete(result.result);
        setProcessing(false);
      }
    } catch (err) {
      console.error('Error starting review:', err);
      const msg = err instanceof Error ? err.message : 'Failed to start review';
      setError(msg);
      if (msg.toLowerCase().includes('no url') || msg.toLowerCase().includes('not found') || msg.toLowerCase().includes('paper_url')) {
        setShowUrlInput(true);
      }
      setProcessing(false);
    }
  };

  const startReviewWithFile = async () => {
    if (!selectedFile) {
      setError('Please select a PDF file to upload');
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      if (paperId) formData.append('paper_id', paperId);
      if (user?.id) formData.append('user_id', user.id);
      if (communityId) formData.append('community_id', communityId);
      formData.append('extract_graph', 'true');
      formData.append('save_lineage', 'true');

      const response = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to upload and review PDF');
      }

      const result = await response.json();
      console.log('Upload review job started:', result);
      setSelectedFile(null); // Clear file after successful upload

      // Handle async job response (same as /full endpoint)
      if (result.job_id) {
        setActiveJobId(result.job_id);
        localStorage.setItem(`papercircle_review_job_${paperId}`, JSON.stringify({
          jobId: result.job_id,
          paperId,
          startedAt: new Date().toISOString(),
        }));
        pollForCompletion(result.job_id);
      } else if (result.status === 'completed' && result.result) {
        setReview(result.result);
        handleReviewComplete(result.result);
        setProcessing(false);
      } else if (result.status === 'quota_exceeded') {
        setError(result.message || 'Daily quota exceeded');
        setProcessing(false);
      }
    } catch (err) {
      console.error('Error uploading PDF:', err);
      const msg = err instanceof Error ? err.message : 'Failed to upload PDF';
      setError(msg);
      setProcessing(false);
    }
  };

  const downloadReview = (format: 'json' | 'markdown') => {
    if (!review) return;

    let content = '';
    let filename = '';
    let mimeType = '';

    switch (format) {
      case 'json':
        content = JSON.stringify(review, null, 2);
        filename = `paper_${paperId}_review.json`;
        mimeType = 'application/json';
        break;
      case 'markdown':
        // Generate markdown from review data
        content = generateMarkdownReport(review);
        filename = `paper_${paperId}_review.md`;
        mimeType = 'text/markdown';
        break;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateMarkdownReport = (review: Review): string => {
    let markdown = `# Paper Review Report\n\n`;
    markdown += `**Paper ID:** ${review.paper_id}\n`;
    markdown += `**Paper URL:** ${review.paper_url}\n`;
    markdown += `**Review Date:** ${review.created_at || new Date().toISOString()}\n`;
    markdown += `**Processing Time:** ${review.processing_time?.toFixed(2)}s\n\n`;

    if (review.review_data?.summary) {
      markdown += `## Summary\n\n${typeof review.review_data.summary === 'string' ? review.review_data.summary : JSON.stringify(review.review_data.summary, null, 2)}\n\n`;
    }

    if (review.review_data?.conference_review) {
      markdown += `## Conference-Style Review\n\n${JSON.stringify(review.review_data.conference_review, null, 2)}\n\n`;
    }

    if (review.review_data?.contributions) {
      markdown += `## Contributions\n\n${JSON.stringify(review.review_data.contributions, null, 2)}\n\n`;
    }

    if (review.review_data?.reproducibility) {
      markdown += `## Reproducibility Assessment\n\n${JSON.stringify(review.review_data.reproducibility, null, 2)}\n\n`;
    }

    if (review.lineage_relationships && review.lineage_relationships.length > 0) {
      markdown += `## Lineage Relationships (${review.lineage_relationships.length})\n\n`;
      review.lineage_relationships.forEach((edge, idx) => {
        markdown += `${idx + 1}. **${edge.edge_type}**: ${edge.target_paper_title}\n`;
        markdown += `   - Score: ${edge.similarity_score.toFixed(2)}\n`;
        markdown += `   - Rationale: ${edge.rationale}\n\n`;
      });
    }

    return markdown;
  };

  const renderSummary = () => {
    if (!review?.review_data?.summary) return null;

    const summary = review.review_data.summary;

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Multi-Level Summary</h3>
        <div className="prose max-w-none">
          <div className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 rounded-lg">
            {typeof summary === 'string' ? summary : JSON.stringify(summary, null, 2)}
          </div>
        </div>
      </div>
    );
  };

  const renderConferenceReview = () => {
    if (!review?.review_data?.conference_review) return null;

    const conferenceReview = review.review_data.conference_review;

    try {
      const reviewData = typeof conferenceReview === 'string'
        ? JSON.parse(conferenceReview)
        : conferenceReview;

      return (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Conference-Style Review</h3>

          {/* Scores */}
          {reviewData.scores && (
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(reviewData.scores).map(([key, value]: [string, any]) => (
                <div key={key} className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-xs text-gray-600 capitalize">{key.replace(/_/g, ' ')}</p>
                  <p className="text-2xl font-bold text-blue-900">{value}/10</p>
                </div>
              ))}
            </div>
          )}

          {/* Strengths */}
          {reviewData.strengths && reviewData.strengths.length > 0 && (
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Strengths
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                {reviewData.strengths.map((strength: string, idx: number) => (
                  <li key={idx}>{strength}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Weaknesses */}
          {reviewData.weaknesses && reviewData.weaknesses.length > 0 && (
            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <h4 className="font-semibold text-red-900 mb-2 flex items-center">
                <XCircle className="w-5 h-5 mr-2" />
                Weaknesses
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                {reviewData.weaknesses.map((weakness: string, idx: number) => (
                  <li key={idx}>{weakness}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Overall Recommendation */}
          {reviewData.recommendation && (
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-2">Overall Recommendation</h4>
              <p className="text-gray-700">{reviewData.recommendation}</p>
            </div>
          )}
        </div>
      );
    } catch (err) {
      return (
        <div className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 rounded-lg">
          {typeof conferenceReview === 'string' ? conferenceReview : JSON.stringify(conferenceReview, null, 2)}
        </div>
      );
    }
  };

  const renderDeepAnalysis = () => {
    if (!review?.review_data?.deep_analysis) return null;

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Deep Analysis</h3>
        <div className="prose max-w-none">
          <div className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded-lg">
            {review.review_data.deep_analysis}
          </div>
        </div>
      </div>
    );
  };

  const renderContributions = () => {
    if (!review?.review_data?.contributions) return null;

    const contributions = review.review_data.contributions;

    try {
      const contribData = typeof contributions === 'string'
        ? JSON.parse(contributions)
        : contributions;

      const contribList = contribData.contributions || [];

      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Claimed Contributions ({contribList.length})
          </h3>
          <div className="grid gap-4">
            {contribList.map((contrib: any, idx: number) => (
              <div key={idx} className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">
                  Contribution {idx + 1}
                </h4>
                <p className="text-gray-700 text-sm">
                  {typeof contrib === 'string' ? contrib : contrib.description || contrib.claim || JSON.stringify(contrib)}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    } catch (err) {
      return (
        <div className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 rounded-lg">
          {typeof contributions === 'string' ? contributions : JSON.stringify(contributions, null, 2)}
        </div>
      );
    }
  };

  const renderReproducibility = () => {
    if (!review?.review_data?.reproducibility) return null;

    const repro = review.review_data.reproducibility;

    try {
      const reproData = typeof repro === 'string' ? JSON.parse(repro) : repro;

      return (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Reproducibility Assessment</h3>

          {/* Score */}
          {reproData.reproducibility_score !== undefined && (
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Reproducibility Score</p>
                  <p className="text-4xl font-bold text-blue-900">{reproData.reproducibility_score}/10</p>
                </div>
                <FlaskConical className="w-16 h-16 text-blue-400" />
              </div>
            </div>
          )}

          {/* Code Availability */}
          <div className="grid grid-cols-3 gap-4">
            <div className={`rounded-lg p-4 border ${reproData.code_available ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <div className="flex items-center">
                <Code className={`w-5 h-5 mr-2 ${reproData.code_available ? 'text-green-600' : 'text-red-600'}`} />
                <div>
                  <p className="text-xs text-gray-600">Code Available</p>
                  <p className="text-lg font-semibold">{reproData.code_available ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>

            <div className={`rounded-lg p-4 border ${reproData.dataset_accessible ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <div className="flex items-center">
                <Database className={`w-5 h-5 mr-2 ${reproData.dataset_accessible ? 'text-green-600' : 'text-red-600'}`} />
                <div>
                  <p className="text-xs text-gray-600">Dataset</p>
                  <p className="text-lg font-semibold">{reproData.dataset_accessible ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>

            <div className={`rounded-lg p-4 border ${reproData.sufficient_details ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <div className="flex items-center">
                <FileCheck className={`w-5 h-5 mr-2 ${reproData.sufficient_details ? 'text-green-600' : 'text-red-600'}`} />
                <div>
                  <p className="text-xs text-gray-600">Details</p>
                  <p className="text-lg font-semibold">{reproData.sufficient_details ? 'Sufficient' : 'Insufficient'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Missing Components */}
          {reproData.missing_components && reproData.missing_components.length > 0 && (
            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <h4 className="font-semibold text-yellow-900 mb-2">Missing Components</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                {reproData.missing_components.map((comp: string, idx: number) => (
                  <li key={idx}>{comp}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
    } catch (err) {
      return (
        <div className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 rounded-lg">
          {typeof repro === 'string' ? repro : JSON.stringify(repro, null, 2)}
        </div>
      );
    }
  };

  const renderLineage = () => {
    if (!review?.lineage_relationships || review.lineage_relationships.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          No lineage relationships discovered.
        </div>
      );
    }

    // Group by edge type
    const grouped = review.lineage_relationships.reduce((acc, edge) => {
      if (!acc[edge.edge_type]) {
        acc[edge.edge_type] = [];
      }
      acc[edge.edge_type].push(edge);
      return acc;
    }, {} as Record<string, typeof review.lineage_relationships>);

    const edgeTypeColors: Record<string, string> = {
      extends: 'blue',
      applies: 'orange',
      evaluates: 'green',
      contradicts: 'red',
      survey: 'purple',
      prerequisite: 'gray',
    };

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Discovered Relationships ({review.lineage_relationships.length})
          </h3>
          {review.lineage_stats && (
            <div className="text-sm text-gray-600">
              {review.lineage_stats.saved || 0} saved to database
            </div>
          )}
        </div>

        {Object.entries(grouped).map(([edgeType, edges]) => {
          const color = edgeTypeColors[edgeType] || 'gray';

          return (
            <div key={edgeType} className="space-y-3">
              <h4 className={`font-semibold text-${color}-900 capitalize`}>
                {edgeType} ({edges.length})
              </h4>
              <div className="grid gap-3">
                {edges.map((edge, idx) => (
                  <div
                    key={idx}
                    className={`bg-${color}-50 rounded-lg p-4 border border-${color}-200`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h5 className={`font-semibold text-${color}-900 mb-1`}>
                          {edge.target_paper_title}
                        </h5>
                        <p className="text-sm text-gray-700 mb-2">{edge.rationale}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-600">
                          <span>Score: {edge.similarity_score.toFixed(2)}</span>
                          {edge.target_paper_arxiv_id && (
                            <span>arXiv: {edge.target_paper_arxiv_id}</span>
                          )}
                          {edge.matched_paper_id && (
                            <span className="text-green-600 flex items-center">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Matched in DB
                            </span>
                          )}
                        </div>
                      </div>
                      <div className={`flex-shrink-0 ml-4 px-3 py-1 bg-${color}-100 rounded-full text-xs font-medium text-${color}-700`}>
                        {(edge.similarity_score * 100).toFixed(0)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderGraph = () => {
    if (!review?.graph_data) {
      return (
        <div className="text-center py-8 text-gray-500">
          No graph data available.
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Internal Concept Graph</h3>
          {review.graph_data.stats && (
            <div className="flex gap-4 text-sm text-gray-600">
              <span>{review.graph_data.stats.total_nodes} nodes</span>
              <span>{review.graph_data.stats.total_edges} edges</span>
            </div>
          )}
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <InteractiveGraph
            nodes={review.graph_data.nodes || {}}
            edges={review.graph_data.edges || {}}
          />
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

  if (!review && !processing) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center">
          <FileCheck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Review Available
          </h3>
          <p className="text-gray-600 mb-6">
            {error || 'This paper has not been reviewed yet. Generate a comprehensive review to unlock insights.'}
          </p>

          {/* Upload Mode Toggle */}
          <div className="flex justify-center gap-2 mb-6">
            <button
              onClick={() => setUploadMode('url')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                uploadMode === 'url'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <ExternalLink className="w-4 h-4 inline mr-2" />
              From URL
            </button>
            <button
              onClick={() => setUploadMode('file')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                uploadMode === 'file'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FileCheck className="w-4 h-4 inline mr-2" />
              Upload PDF
            </button>
          </div>

          {/* URL Mode */}
          {uploadMode === 'url' && (
            <button
              onClick={() => startReview()}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <FileCheck className="w-5 h-5 inline mr-2" />
              Review Paper
            </button>
          )}

          {/* File Upload Mode */}
          {uploadMode === 'file' && (
            <div className="max-w-md mx-auto">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select PDF File
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-lg file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100
                    cursor-pointer"
                />
                {selectedFile && (
                  <p className="mt-2 text-sm text-green-600 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Selected: {selectedFile.name}
                  </p>
                )}
              </div>
              <button
                onClick={startReviewWithFile}
                disabled={!selectedFile}
                className="w-full bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FileCheck className="w-5 h-5 inline mr-2" />
                Upload and Review
              </button>
            </div>
          )}

          {showUrlInput && uploadMode === 'url' && (
            <div className="mt-8 max-w-md mx-auto p-4 bg-blue-50 rounded-xl border border-blue-100">
              <h4 className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Provide Paper URL
              </h4>
              <p className="text-xs text-blue-700 mb-4">
                This paper is missing a URL. Please provide an arXiv URL or a direct PDF link.
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="https://arxiv.org/abs/..."
                  value={manualUrl}
                  onChange={(e) => setManualUrl(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <button
                  onClick={() => startReview()}
                  disabled={!manualUrl.trim()}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Start
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  const cancelReview = async () => {
    if (!activeJobId) return;
    try {
      await fetch(`${API_BASE}/cancel/${activeJobId}`, { method: 'POST' });
    } catch (err) {
      console.error('Failed to cancel review:', err);
    }
    setProcessing(false);
    setActiveJobId(null);
    setError('Review cancelled.');
    localStorage.removeItem(`papercircle_review_job_${paperId}`);
  };

  if (processing) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center">
          <Loader className="w-16 h-16 text-blue-500 mx-auto mb-4 animate-spin" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Reviewing Paper...
          </h3>
          <p className="text-gray-600 mb-4">
            {reviewMessage || 'Generating comprehensive review with lineage extraction.'}
          </p>

          {/* Progress bar */}
          {reviewProgress > 0 && (
            <div className="max-w-md mx-auto mb-4">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium text-blue-600">{reviewProgress}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${reviewProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Cancel button */}
          {activeJobId && (
            <button
              onClick={cancelReview}
              className="mt-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
            >
              Cancel Review
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <FileCheck className="w-8 h-8 text-blue-500 mr-3" />
            Paper Review Analysis
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => downloadReview('json')}
              className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center"
            >
              <Download className="w-4 h-4 mr-1" />
              JSON
            </button>
            <button
              onClick={() => downloadReview('markdown')}
              className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center"
            >
              <Download className="w-4 h-4 mr-1" />
              Markdown
            </button>
            <button
              onClick={() => startReview()}
              className="px-3 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Re-review
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="flex items-center">
              <Award className="w-5 h-5 text-blue-500 mr-2" />
              <div>
                <p className="text-xs text-gray-600">Lineage</p>
                <p className="text-lg font-semibold text-gray-900">
                  {review.lineage_relationships?.length || 0}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <div className="flex items-center">
              <BarChart3 className="w-5 h-5 text-green-500 mr-2" />
              <div>
                <p className="text-xs text-gray-600">Graph Nodes</p>
                <p className="text-lg font-semibold text-gray-900">
                  {review.graph_data?.stats?.total_nodes || 0}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-orange-50 rounded-lg p-3">
            <div className="flex items-center">
              <Network className="w-5 h-5 text-orange-500 mr-2" />
              <div>
                <p className="text-xs text-gray-600">Graph Edges</p>
                <p className="text-lg font-semibold text-gray-900">
                  {review.graph_data?.stats?.total_edges || 0}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-3">
            <div className="flex items-center">
              <FlaskConical className="w-5 h-5 text-purple-500 mr-2" />
              <div>
                <p className="text-xs text-gray-600">Time</p>
                <p className="text-lg font-semibold text-gray-900">
                  {review.processing_time?.toFixed(1) || 0}s
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex overflow-x-auto">
          <button
            onClick={() => setActiveTab('summary')}
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === 'summary'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <BookOpen className="w-4 h-4 inline mr-2" />
            Summary
          </button>
          <button
            onClick={() => setActiveTab('review')}
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === 'review'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Award className="w-4 h-4 inline mr-2" />
            Conference Review
          </button>
          <button
            onClick={() => setActiveTab('analysis')}
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === 'analysis'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Search className="w-4 h-4 inline mr-2" />
            Deep Analysis
          </button>
          <button
            onClick={() => setActiveTab('contributions')}
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === 'contributions'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Award className="w-4 h-4 inline mr-2" />
            Contributions
          </button>
          <button
            onClick={() => setActiveTab('reproducibility')}
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === 'reproducibility'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <FlaskConical className="w-4 h-4 inline mr-2" />
            Reproducibility
          </button>
          <button
            onClick={() => setActiveTab('lineage')}
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === 'lineage'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Network className="w-4 h-4 inline mr-2" />
            Lineage Graph
          </button>
          <button
            onClick={() => setActiveTab('graph')}
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === 'graph'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Network className="w-4 h-4 inline mr-2" />
            Interactive Graph
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'summary' && review && renderSummary()}
        {activeTab === 'review' && review && renderConferenceReview()}
        {activeTab === 'analysis' && review && renderDeepAnalysis()}
        {activeTab === 'contributions' && review && renderContributions()}
        {activeTab === 'reproducibility' && review && renderReproducibility()}
        {activeTab === 'lineage' && review && renderLineage()}
        {activeTab === 'graph' && review && renderGraph()}
      </div>
    </div>
  );
}

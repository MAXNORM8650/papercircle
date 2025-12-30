import { useState, useEffect, useRef } from 'react';
import {
  Brain,
  Network,
  FileText,
  Lightbulb,
  Wrench,
  FlaskConical,
  Image,
  Table,
  MessageSquare,
  Download,
  RefreshCw,
  Loader,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import mermaid from 'mermaid';
import { InteractiveGraph } from './InteractiveGraph';

// Initialize mermaid with latest version
mermaid.initialize({
  startOnLoad: true,
  theme: 'default',
  securityLevel: 'loose',
});

// Simple Mermaid component using latest version
function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (ref.current && chart) {
      setError(null);
      const renderChart = async () => {
        try {
          const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
          const { svg } = await mermaid.render(id, chart);
          if (ref.current) {
            ref.current.innerHTML = svg;
          }
        } catch (err) {
          console.error('Mermaid render error:', err);
          setError(err instanceof Error ? err.message : 'Failed to render diagram');
        }
      };
      renderChart();
    }
  }, [chart]);

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded">
        <p className="text-red-600 text-sm">Failed to render diagram: {error}</p>
        <details className="mt-2">
          <summary className="text-xs text-red-500 cursor-pointer">Show diagram code</summary>
          <pre className="mt-2 p-2 bg-white rounded text-xs overflow-auto">{chart}</pre>
        </details>
      </div>
    );
  }

  return <div ref={ref} className="mermaid-diagram" />;
}

interface PaperAnalysisViewProps {
  paperId: string;
  communityId?: string;
  sessionId?: string;
  arxivId?: string;  // Optional: for direct URL analysis
  onClose?: () => void;
}

interface Analysis {
  id: string;
  paper_id: string;
  analysis_data: any;
  markdown_summary: string;
  mindmap_mermaid: string;
  flowchart_mermaid: string;
  html_visualization: string;
  concepts_count: number;
  methods_count: number;
  experiments_count: number;
  figures_count: number;
  tables_count: number;
  nodes_count: number;
  edges_count: number;
  processing_time_seconds: number;
  created_at: string;
}

type Tab = 'summary' | 'mindmap' | 'flowchart' | 'concepts' | 'methods' | 'experiments' | 'graph' | 'qa';

const API_BASE = 'http://localhost:8001';

export function PaperAnalysisView({
  paperId,
  communityId,
  sessionId,
  arxivId,
  onClose
}: PaperAnalysisViewProps) {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('summary');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<any>(null);
  const [askingQuestion, setAskingQuestion] = useState(false);

  useEffect(() => {
    loadAnalysis();
  }, [paperId, communityId, sessionId]);

  const loadAnalysis = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (communityId) params.append('community_id', communityId);
      if (sessionId) params.append('session_id', sessionId);

      const response = await fetch(
        `${API_BASE}/analysis/paper/${paperId}?${params.toString()}`
      );

      if (response.status === 404) {
        // No analysis exists yet
        setAnalysis(null);
        setError('No analysis found for this paper. Click "Analyze Paper" to generate one.');
      } else if (!response.ok) {
        throw new Error('Failed to load analysis');
      } else {
        const data = await response.json();
        setAnalysis(data);
      }
    } catch (err) {
      console.error('Error loading analysis:', err);
      setError(err instanceof Error ? err.message : 'Failed to load analysis');
    } finally {
      setLoading(false);
    }
  };

  const startAnalysis = async () => {
    setProcessing(true);
    setError(null);

    try {
      // Try normal analysis first
      let response = await fetch(`${API_BASE}/analyze/paper`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paper_id: paperId,
          community_id: communityId,
          session_id: sessionId,
          force_reanalyze: false,
        }),
      });

      // If paper not found (404) and we have arxivId, try URL-based analysis
      if (response.status === 404 && arxivId) {
        console.log('Paper not in DB, trying direct URL analysis with arxiv:', arxivId);
        response = await fetch(`${API_BASE}/analyze/url`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url: arxivId,
            save_to_database: true,
            community_id: communityId,
            session_id: sessionId,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          // URL analysis now returns "processing" status
          if (result.status === 'processing') {
            // Poll for completion using arxiv_id
            pollForArxivCompletion(arxivId);
            return;
          }
        }
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to start analysis');
      }

      const result = await response.json();

      if (result.status === 'processing') {
        // Poll for completion
        pollForCompletion();
      } else if (result.status === 'exists') {
        // Load existing analysis
        loadAnalysis();
      } else if (result.status === 'completed') {
        // Direct analysis complete
        setProcessing(false);
        loadAnalysis();
      }
    } catch (err) {
      console.error('Error starting analysis:', err);
      setError(err instanceof Error ? err.message : 'Failed to start analysis');
      setProcessing(false);
    }
  };

  const pollForCompletion = () => {
    const interval = setInterval(async () => {
      try {
        const params = new URLSearchParams();
        if (communityId) params.append('community_id', communityId);
        if (sessionId) params.append('session_id', sessionId);

        const response = await fetch(
          `${API_BASE}/analysis/paper/${paperId}?${params.toString()}`
        );

        if (response.ok) {
          const data = await response.json();
          setAnalysis(data);
          setProcessing(false);
          clearInterval(interval);
        }
      } catch (err) {
        console.error('Error polling for analysis:', err);
      }
    }, 5000); // Poll every 5 seconds

    // Stop polling after 5 minutes
    setTimeout(() => {
      clearInterval(interval);
      setProcessing(false);
    }, 300000);
  };

  const pollForArxivCompletion = (arxivIdToCheck: string) => {
    const interval = setInterval(async () => {
      try {
        const params = new URLSearchParams();
        if (communityId) params.append('community_id', communityId);
        if (sessionId) params.append('session_id', sessionId);

        const response = await fetch(
          `${API_BASE}/analysis/arxiv/${arxivIdToCheck}?${params.toString()}`
        );

        if (response.ok) {
          const data = await response.json();
          setAnalysis(data);
          setProcessing(false);
          clearInterval(interval);
        }
      } catch (err) {
        console.error('Error polling for arxiv analysis:', err);
      }
    }, 5000); // Poll every 5 seconds

    // Stop polling after 5 minutes
    setTimeout(() => {
      clearInterval(interval);
      setProcessing(false);
      setError('Analysis is taking longer than expected. Please check back later.');
    }, 300000);
  };

  const askQuestion = async () => {
    if (!question.trim() || !analysis) return;

    setAskingQuestion(true);
    try {
      const response = await fetch(`${API_BASE}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          analysis_id: analysis.id,
          question: question,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get answer');
      }

      const data = await response.json();
      setAnswer(data);
    } catch (err) {
      console.error('Error asking question:', err);
      setError(err instanceof Error ? err.message : 'Failed to get answer');
    } finally {
      setAskingQuestion(false);
    }
  };

  const downloadAnalysis = (format: 'json' | 'markdown' | 'mindmap' | 'flowchart') => {
    if (!analysis) return;

    let content = '';
    let filename = '';
    let mimeType = '';

    switch (format) {
      case 'json':
        content = JSON.stringify(analysis.analysis_data, null, 2);
        filename = `paper_${paperId}_analysis.json`;
        mimeType = 'application/json';
        break;
      case 'markdown':
        content = analysis.markdown_summary;
        filename = `paper_${paperId}_summary.md`;
        mimeType = 'text/markdown';
        break;
      case 'mindmap':
        content = analysis.mindmap_mermaid;
        filename = `paper_${paperId}_mindmap.mermaid`;
        mimeType = 'text/plain';
        break;
      case 'flowchart':
        content = analysis.flowchart_mermaid;
        filename = `paper_${paperId}_flowchart.mermaid`;
        mimeType = 'text/plain';
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

  const renderConcepts = () => {
    if (!analysis?.analysis_data?.nodes) return null;

    // Convert nodes dict to array if needed
    const nodesArray = Array.isArray(analysis.analysis_data.nodes)
      ? analysis.analysis_data.nodes
      : Object.values(analysis.analysis_data.nodes);

    const concepts = nodesArray.filter(
      (node: any) => node.type === 'concept'
    );

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Concepts ({concepts.length})
        </h3>
        <div className="grid gap-4">
          {concepts.map((concept: any) => (
            <div key={concept.id} className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">{concept.title}</h4>
              <p className="text-gray-700 text-sm mb-2">{concept.description}</p>
              {concept.origin_pages && concept.origin_pages.length > 0 && (
                <span className="text-xs text-blue-600">
                  Pages: {concept.origin_pages.join(', ')}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMethods = () => {
    if (!analysis?.analysis_data?.nodes) return null;

    // Convert nodes dict to array if needed
    const nodesArray = Array.isArray(analysis.analysis_data.nodes)
      ? analysis.analysis_data.nodes
      : Object.values(analysis.analysis_data.nodes);

    const methods = nodesArray.filter(
      (node: any) => node.type === 'method'
    );

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Methods ({methods.length})
        </h3>
        <div className="grid gap-4">
          {methods.map((method: any) => (
            <div key={method.id} className="bg-orange-50 rounded-lg p-4 border border-orange-200">
              <h4 className="font-semibold text-orange-900 mb-2">{method.title}</h4>
              <p className="text-gray-700 text-sm mb-2">{method.description}</p>
              {method.origin_pages && method.origin_pages.length > 0 && (
                <span className="text-xs text-orange-600">
                  Pages: {method.origin_pages.join(', ')}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderExperiments = () => {
    if (!analysis?.analysis_data?.nodes) return null;

    // Convert nodes dict to array if needed
    const nodesArray = Array.isArray(analysis.analysis_data.nodes)
      ? analysis.analysis_data.nodes
      : Object.values(analysis.analysis_data.nodes);

    const experiments = nodesArray.filter(
      (node: any) => node.type === 'experiment'
    );

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Experiments ({experiments.length})
        </h3>
        <div className="grid gap-4">
          {experiments.map((experiment: any) => (
            <div key={experiment.id} className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">{experiment.title}</h4>
              <p className="text-gray-700 text-sm mb-2">{experiment.description}</p>
              {experiment.properties?.key_results && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-green-800">Key Results:</p>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {experiment.properties.key_results.map((result: string, idx: number) => (
                      <li key={idx}>{result}</li>
                    ))}
                  </ul>
                </div>
              )}
              {experiment.origin_pages && experiment.origin_pages.length > 0 && (
                <span className="text-xs text-green-600">
                  Pages: {experiment.origin_pages.join(', ')}
                </span>
              )}
            </div>
          ))}
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

  if (!analysis && !processing) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center">
          <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Analysis Available
          </h3>
          <p className="text-gray-600 mb-6">
            {error || 'This paper has not been analyzed yet. Generate a mind graph to unlock insights.'}
          </p>
          <button
            onClick={startAnalysis}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Brain className="w-5 h-5 inline mr-2" />
            Analyze Paper
          </button>
        </div>
      </div>
    );
  }

  if (processing) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center">
          <Loader className="w-16 h-16 text-blue-500 mx-auto mb-4 animate-spin" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Analyzing Paper...
          </h3>
          <p className="text-gray-600">
            This may take a few minutes. The page will update automatically when complete.
          </p>
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
            <Brain className="w-8 h-8 text-blue-500 mr-3" />
            Paper Mind Graph
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => downloadAnalysis('json')}
              className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center"
            >
              <Download className="w-4 h-4 mr-1" />
              JSON
            </button>
            <button
              onClick={() => downloadAnalysis('markdown')}
              className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center"
            >
              <Download className="w-4 h-4 mr-1" />
              Markdown
            </button>
            <button
              onClick={() => startAnalysis()}
              className="px-3 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Re-analyze
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="flex items-center">
              <Lightbulb className="w-5 h-5 text-blue-500 mr-2" />
              <div>
                <p className="text-xs text-gray-600">Concepts</p>
                <p className="text-lg font-semibold text-gray-900">{analysis.concepts_count}</p>
              </div>
            </div>
          </div>
          <div className="bg-orange-50 rounded-lg p-3">
            <div className="flex items-center">
              <Wrench className="w-5 h-5 text-orange-500 mr-2" />
              <div>
                <p className="text-xs text-gray-600">Methods</p>
                <p className="text-lg font-semibold text-gray-900">{analysis.methods_count}</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <div className="flex items-center">
              <FlaskConical className="w-5 h-5 text-green-500 mr-2" />
              <div>
                <p className="text-xs text-gray-600">Experiments</p>
                <p className="text-lg font-semibold text-gray-900">{analysis.experiments_count}</p>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-3">
            <div className="flex items-center">
              <Network className="w-5 h-5 text-purple-500 mr-2" />
              <div>
                <p className="text-xs text-gray-600">Nodes</p>
                <p className="text-lg font-semibold text-gray-900">{analysis.nodes_count}</p>
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
            <FileText className="w-4 h-4 inline mr-2" />
            Summary
          </button>
          <button
            onClick={() => setActiveTab('mindmap')}
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === 'mindmap'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Brain className="w-4 h-4 inline mr-2" />
            Mind Map
          </button>
          <button
            onClick={() => setActiveTab('flowchart')}
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === 'flowchart'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Network className="w-4 h-4 inline mr-2" />
            Flowchart
          </button>
          <button
            onClick={() => setActiveTab('concepts')}
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === 'concepts'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Lightbulb className="w-4 h-4 inline mr-2" />
            Concepts
          </button>
          <button
            onClick={() => setActiveTab('methods')}
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === 'methods'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Wrench className="w-4 h-4 inline mr-2" />
            Methods
          </button>
          <button
            onClick={() => setActiveTab('experiments')}
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === 'experiments'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <FlaskConical className="w-4 h-4 inline mr-2" />
            Experiments
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
          <button
            onClick={() => setActiveTab('qa')}
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === 'qa'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <MessageSquare className="w-4 h-4 inline mr-2" />
            Q&A
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'summary' && (
          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 rounded-lg">
              {analysis.markdown_summary}
            </div>
          </div>
        )}

        {activeTab === 'mindmap' && (
          <div className="bg-gray-50 p-6 rounded-lg overflow-auto">
            <Mermaid chart={analysis.mindmap_mermaid} />
          </div>
        )}

        {activeTab === 'flowchart' && (
          <div className="bg-gray-50 p-6 rounded-lg overflow-auto">
            <Mermaid chart={analysis.flowchart_mermaid} />
          </div>
        )}

        {activeTab === 'concepts' && renderConcepts()}
        {activeTab === 'methods' && renderMethods()}
        {activeTab === 'experiments' && renderExperiments()}

        {activeTab === 'graph' && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <InteractiveGraph
              nodes={analysis.analysis_data?.nodes || {}}
              edges={analysis.analysis_data?.edges || {}}
            />
          </div>
        )}

        {activeTab === 'qa' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ask a question about this paper:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && askQuestion()}
                  placeholder="What are the main contributions?"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={askQuestion}
                  disabled={askingQuestion || !question.trim()}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {askingQuestion ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    'Ask'
                  )}
                </button>
              </div>
            </div>

            {answer && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Answer:</h4>
                <p className="text-gray-800 mb-4">{answer.answer}</p>

                {answer.relevant_sections && answer.relevant_sections.length > 0 && (
                  <div className="mb-2">
                    <p className="text-sm font-medium text-blue-800">Sections:</p>
                    <p className="text-sm text-gray-700">{answer.relevant_sections.join(', ')}</p>
                  </div>
                )}

                {answer.relevant_figures && answer.relevant_figures.length > 0 && (
                  <div className="mb-2">
                    <p className="text-sm font-medium text-blue-800">Figures:</p>
                    <p className="text-sm text-gray-700">{answer.relevant_figures.join(', ')}</p>
                  </div>
                )}

                {answer.relevant_tables && answer.relevant_tables.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-blue-800">Tables:</p>
                    <p className="text-sm text-gray-700">{answer.relevant_tables.join(', ')}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

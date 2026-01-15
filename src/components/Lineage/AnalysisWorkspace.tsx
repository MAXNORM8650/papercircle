import { useState, useEffect } from 'react';
import { X, Loader2, CheckCircle, AlertCircle, GitBranch } from 'lucide-react';
import { useLineageAnalysis, Edge } from '../../contexts/LineageAnalysisContext';
import { DualAnalysisView } from '../Papers/DualAnalysisView';

export function AnalysisWorkspace() {
  const {
    selectedPaper,
    closeAnalysisWorkspace,
    addEdgesToGraph,
    addAnalysisResult,
  } = useLineageAnalysis();

  const [discoveredRelationships, setDiscoveredRelationships] = useState<Edge[]>([]);
  const [isAnalysisComplete, setIsAnalysisComplete] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  // ============================================================================
  // Handlers
  // ============================================================================

  const handleLineageExtracted = (relationships: Edge[]) => {
    console.log('Lineage relationships extracted:', relationships);
    setDiscoveredRelationships(relationships);
    setIsAnalysisComplete(true);
  };

  const handleAnalysisComplete = (analysisData: any) => {
    console.log('Analysis complete:', analysisData);
    // Cache the analysis result
    if (selectedPaper?.id) {
      addAnalysisResult(selectedPaper.id, {
        paperId: selectedPaper.id,
        mindGraphData: analysisData.mindGraph,
        reviewData: analysisData.review,
        lineageRelationships: discoveredRelationships,
        timestamp: Date.now(),
      });
    }
  };

  const handleAddToGraph = () => {
    if (discoveredRelationships.length === 0) {
      alert('No relationships to add');
      return;
    }

    // Add AI-generated source type to all edges
    const processedEdges = discoveredRelationships.map(edge => ({
      ...edge,
      source_type: 'ai_review' as const,
      is_ai_generated: true,
      confidence_score: edge.similarity_score || 0.5,
    }));

    addEdgesToGraph(processedEdges);

    // Show success notification
    setShowSuccessNotification(true);
    setTimeout(() => {
      setShowSuccessNotification(false);
      closeAnalysisWorkspace();
    }, 2000);
  };

  const handleClose = () => {
    if (discoveredRelationships.length > 0 && !showSuccessNotification) {
      const confirmed = confirm(
        `You have ${discoveredRelationships.length} discovered relationship(s). Close without adding to graph?`
      );
      if (!confirmed) return;
    }
    closeAnalysisWorkspace();
  };

  // ============================================================================
  // Effects
  // ============================================================================

  // Reset state when paper changes
  useEffect(() => {
    setDiscoveredRelationships([]);
    setIsAnalysisComplete(false);
    setShowSuccessNotification(false);
  }, [selectedPaper?.id]);

  // ============================================================================
  // Render
  // ============================================================================

  if (!selectedPaper) {
    return null;
  }

  const paperDisplayName =
    selectedPaper.title ||
    selectedPaper.arxiv_id ||
    selectedPaper.uploadedFile?.name ||
    'Selected Paper';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-[95vw] w-full max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 mr-4">
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                Analysis Workspace
              </h2>
              <p className="text-sm text-gray-600 truncate">
                {paperDisplayName}
              </p>
            </div>

            {/* Status Indicator */}
            <div className="flex items-center gap-3">
              {isAnalysisComplete ? (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1.5 rounded-lg">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {discoveredRelationships.length} relationship{discoveredRelationships.length !== 1 ? 's' : ''} found
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm font-medium">Analyzing...</span>
                </div>
              )}

              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content - DualAnalysisView */}
        <div className="flex-1 overflow-hidden">
          <DualAnalysisView
            paperId={selectedPaper.id || ''}
            arxivId={selectedPaper.arxiv_id}
            onLineageExtracted={handleLineageExtracted}
            onAnalysisComplete={handleAnalysisComplete}
          />
        </div>

        {/* Footer with Actions */}
        {isAnalysisComplete && discoveredRelationships.length > 0 && (
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <GitBranch className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {discoveredRelationships.length} relationship{discoveredRelationships.length !== 1 ? 's' : ''} discovered
                  </p>
                  <p className="text-xs text-gray-600">
                    These will be added as AI-generated edges to the lineage graph
                  </p>
                </div>
              </div>

              <button
                onClick={handleAddToGraph}
                disabled={showSuccessNotification}
                className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-green-600 flex items-center gap-2"
              >
                {showSuccessNotification ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Added to Graph!
                  </>
                ) : (
                  <>
                    <GitBranch className="w-4 h-4" />
                    Add to Lineage Graph
                  </>
                )}
              </button>
            </div>

            {/* Relationship Preview */}
            <div className="mt-4 p-3 bg-white border border-gray-200 rounded-lg max-h-32 overflow-y-auto">
              <p className="text-xs font-medium text-gray-700 mb-2">Discovered Relationships:</p>
              <div className="space-y-1">
                {discoveredRelationships.slice(0, 5).map((edge, idx) => (
                  <div key={idx} className="text-xs text-gray-600 flex items-center gap-2">
                    <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">
                      {edge.edge_type}
                    </span>
                    <span className="flex-1 truncate">
                      {edge.target_title || 'Unknown paper'}
                    </span>
                    {edge.similarity_score && (
                      <span className="text-gray-500">
                        {(edge.similarity_score * 100).toFixed(0)}%
                      </span>
                    )}
                  </div>
                ))}
                {discoveredRelationships.length > 5 && (
                  <p className="text-xs text-gray-500 italic">
                    +{discoveredRelationships.length - 5} more...
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* No Relationships Found State */}
        {isAnalysisComplete && discoveredRelationships.length === 0 && (
          <div className="border-t border-gray-200 px-6 py-4 bg-yellow-50">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  No relationships discovered
                </p>
                <p className="text-xs text-gray-600">
                  The review analysis did not find any paper-to-paper relationships
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

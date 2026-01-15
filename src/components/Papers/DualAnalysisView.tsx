import { useState } from 'react';
import { X, GitBranch, FileCheck, LayoutGrid } from 'lucide-react';
import { PaperAnalysisView } from './PaperAnalysisView';
import { PaperReviewView } from './PaperReviewView';
import { Edge } from '../../contexts/LineageAnalysisContext';

interface DualAnalysisViewProps {
  paperId: string;
  communityId?: string;
  sessionId?: string;
  arxivId?: string;
  onClose?: () => void;
  onLineageExtracted?: (relationships: Edge[]) => void;
  onAnalysisComplete?: (analysisData: any) => void;
}

type ViewMode = 'mind-graph' | 'review' | 'both';

export function DualAnalysisView({
  paperId,
  communityId,
  sessionId,
  arxivId,
  onClose,
  onLineageExtracted,
  onAnalysisComplete
}: DualAnalysisViewProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('both');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-[95vw] w-full max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutGrid className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-bold text-gray-900">Paper Analysis Hub</h2>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Selector */}
            <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('mind-graph')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'mind-graph'
                    ? 'bg-white text-blue-600 shadow'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <GitBranch className="w-4 h-4 inline mr-1" />
                Mind Graph
              </button>
              <button
                onClick={() => setViewMode('review')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'review'
                    ? 'bg-white text-blue-600 shadow'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <FileCheck className="w-4 h-4 inline mr-1" />
                Review Analysis
              </button>
              <button
                onClick={() => setViewMode('both')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'both'
                    ? 'bg-white text-blue-600 shadow'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <LayoutGrid className="w-4 h-4 inline mr-1" />
                Both
              </button>
            </div>

            {onClose && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          {viewMode === 'both' ? (
            <div className="h-full grid grid-cols-2 gap-0 divide-x divide-gray-200">
              {/* Left Panel: Mind Graph */}
              <div className="h-full overflow-auto">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                    <GitBranch className="w-5 h-5 text-blue-500" />
                    <h3 className="text-lg font-semibold text-gray-900">Mind Graph Analysis</h3>
                    <span className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      Port 8006
                    </span>
                  </div>
                  <PaperAnalysisView
                    paperId={paperId}
                    communityId={communityId}
                    sessionId={sessionId}
                    arxivId={arxivId}
                  />
                </div>
              </div>

              {/* Right Panel: Review Analysis */}
              <div className="h-full overflow-auto">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                    <FileCheck className="w-5 h-5 text-green-500" />
                    <h3 className="text-lg font-semibold text-gray-900">Review Analysis</h3>
                    <span className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      Port 8005
                    </span>
                  </div>
                  <PaperReviewView
                    paperId={paperId}
                    communityId={communityId}
                    sessionId={sessionId}
                    arxivId={arxivId}
                    onLineageExtracted={onLineageExtracted}
                    onAnalysisComplete={onAnalysisComplete}
                  />
                </div>
              </div>
            </div>
          ) : viewMode === 'mind-graph' ? (
            <div className="h-full overflow-auto">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                  <GitBranch className="w-5 h-5 text-blue-500" />
                  <h3 className="text-lg font-semibold text-gray-900">Mind Graph Analysis</h3>
                  <span className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    Port 8006
                  </span>
                </div>
                <PaperAnalysisView
                  paperId={paperId}
                  communityId={communityId}
                  sessionId={sessionId}
                  arxivId={arxivId}
                />
              </div>
            </div>
          ) : (
            <div className="h-full overflow-auto">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                  <FileCheck className="w-5 h-5 text-green-500" />
                  <h3 className="text-lg font-semibold text-gray-900">Review Analysis</h3>
                  <span className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    Port 8005
                  </span>
                </div>
                <PaperReviewView
                  paperId={paperId}
                  communityId={communityId}
                  sessionId={sessionId}
                  arxivId={arxivId}
                  onLineageExtracted={onLineageExtracted}
                  onAnalysisComplete={onAnalysisComplete}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer with comparison info */}
        {viewMode === 'both' && (
          <div className="border-t border-gray-200 px-6 py-3 bg-gray-50">
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-gray-700">
                  <strong>Mind Graph:</strong> Concepts, methods, experiments
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-gray-700">
                  <strong>Review Analysis:</strong> Conference-style review, lineage, reproducibility
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

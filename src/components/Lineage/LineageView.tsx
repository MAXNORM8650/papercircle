import { useState } from 'react';
import { Brain, FileCheck, Network } from 'lucide-react';
import { LineageAnalysisProvider, useLineageAnalysis } from '../../contexts/LineageAnalysisContext';
import { PaperSelectionModal } from './PaperSelectionModal';
import { AnalysisWorkspace } from './AnalysisWorkspace';
import { AnalysisHubPanel } from './AnalysisHubPanel';
import { PaperAnalysisListManager } from './PaperAnalysisListManager';
import { PaperReviewListManager } from './PaperReviewListManager';
import { LineageGraphTab } from './LineageGraphTab';

type Tab = 'analysis' | 'review' | 'lineage';

interface LineageViewProps {
  circleId?: string | null;
}

// Outer wrapper component with provider
export function LineageView({ circleId }: LineageViewProps) {
  return (
    <LineageAnalysisProvider>
      <LineageViewInner circleId={circleId} />
    </LineageAnalysisProvider>
  );
}

// Inner component with tab navigation
function LineageViewInner({ circleId }: LineageViewProps) {
  const {
    isPaperSelectionOpen,
    isAnalysisWorkspaceOpen,
    toggleAnalysisHub,
  } = useLineageAnalysis();

  const [activeTab, setActiveTab] = useState<Tab>('lineage');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'analysis':
        return <PaperAnalysisListManager circleId={circleId} />;
      case 'review':
        return <PaperReviewListManager circleId={circleId} />;
      case 'lineage':
        return <LineageGraphTab circleId={circleId} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Paper Lineage Hub</h1>
        <p className="text-gray-600">
          Analyze papers, review research, and explore lineage connections
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('analysis')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'analysis'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Brain className="h-5 w-5" />
              <span>Paper Analysis</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('review')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'review'
                ? 'border-green-600 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-2">
              <FileCheck className="h-5 w-5" />
              <span>Paper Review</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('lineage')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'lineage'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Network className="h-5 w-5" />
              <span>Lineage Graph</span>
            </div>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {renderTabContent()}

      {/* Modals and Panels */}
      {isPaperSelectionOpen && <PaperSelectionModal />}
      {isAnalysisWorkspaceOpen && <AnalysisWorkspace />}
      <AnalysisHubPanel />
    </div>
  );
}

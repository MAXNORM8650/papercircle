import { createContext, useContext, useState, ReactNode } from 'react';

// ============================================================================
// Types
// ============================================================================

export interface PaperInfo {
  id?: string;
  title?: string;
  arxiv_id?: string;
  pdf_url?: string;
  uploadedFile?: File;
  source: 'upload' | 'url' | 'circle' | 'saved';
}

export interface Edge {
  id?: string;
  source_paper_id: string;
  target_paper_id: string;
  edge_type: string;
  similarity_score?: number;
  rationale?: string;
  is_ai_generated?: boolean;
  source_type?: 'manual' | 'ai_review' | 'ai_analysis';
  confidence_score?: number;
  target_title?: string;
  target_authors?: string;
  target_year?: string;
  verified_by?: string | null;
  community_id?: string | null;
}

export interface AnalysisResult {
  paperId: string;
  mindGraphData?: any;
  reviewData?: any;
  lineageRelationships?: Edge[];
  timestamp: number;
}

interface LineageAnalysisContextType {
  // Paper selection state
  selectedPaper: PaperInfo | null;
  setSelectedPaper: (paper: PaperInfo | null) => void;

  // Analysis results cache
  analysisResults: Map<string, AnalysisResult>;
  addAnalysisResult: (paperId: string, result: AnalysisResult) => void;
  getAnalysisResult: (paperId: string) => AnalysisResult | undefined;

  // Dynamic edges from AI
  dynamicEdges: Edge[];
  addEdgesToGraph: (edges: Edge[]) => void;
  clearDynamicEdges: () => void;

  // Paper tracking for tabs
  analyzedPapers: string[];
  reviewedPapers: string[];
  addAnalyzedPaper: (paperId: string) => void;
  addReviewedPaper: (paperId: string) => void;

  // Modal/workspace states
  isPaperSelectionOpen: boolean;
  isAnalysisWorkspaceOpen: boolean;
  openPaperSelection: () => void;
  closePaperSelection: () => void;
  openAnalysisWorkspace: (paper: PaperInfo) => void;
  closeAnalysisWorkspace: () => void;

  // Analysis Hub Panel state
  isAnalysisHubOpen: boolean;
  toggleAnalysisHub: () => void;
  selectedCircleId: string | null;
  setSelectedCircleId: (circleId: string | null) => void;
}

// ============================================================================
// Context
// ============================================================================

const LineageAnalysisContext = createContext<LineageAnalysisContextType | undefined>(undefined);

// ============================================================================
// Provider
// ============================================================================

interface LineageAnalysisProviderProps {
  children: ReactNode;
}

export function LineageAnalysisProvider({ children }: LineageAnalysisProviderProps) {
  // Paper selection
  const [selectedPaper, setSelectedPaper] = useState<PaperInfo | null>(null);

  // Analysis results cache (using Map for O(1) lookup)
  const [analysisResults, setAnalysisResults] = useState<Map<string, AnalysisResult>>(new Map());

  // Dynamic edges from AI
  const [dynamicEdges, setDynamicEdges] = useState<Edge[]>([]);

  // Paper tracking
  const [analyzedPapers, setAnalyzedPapers] = useState<string[]>([]);
  const [reviewedPapers, setReviewedPapers] = useState<string[]>([]);

  // Modal states
  const [isPaperSelectionOpen, setIsPaperSelectionOpen] = useState(false);
  const [isAnalysisWorkspaceOpen, setIsAnalysisWorkspaceOpen] = useState(false);

  // Analysis Hub Panel state
  const [isAnalysisHubOpen, setIsAnalysisHubOpen] = useState(false);
  const [selectedCircleId, setSelectedCircleId] = useState<string | null>(null);

  // ============================================================================
  // Methods
  // ============================================================================

  const addAnalysisResult = (paperId: string, result: AnalysisResult) => {
    setAnalysisResults(prev => {
      const newMap = new Map(prev);
      newMap.set(paperId, result);
      return newMap;
    });
  };

  const getAnalysisResult = (paperId: string): AnalysisResult | undefined => {
    return analysisResults.get(paperId);
  };

  const addEdgesToGraph = (edges: Edge[]) => {
    setDynamicEdges(prev => {
      // Deduplicate edges by source + target + type
      const existingKeys = new Set(
        prev.map(e => `${e.source_paper_id}-${e.target_paper_id}-${e.edge_type}`)
      );

      const newEdges = edges.filter(e => {
        const key = `${e.source_paper_id}-${e.target_paper_id}-${e.edge_type}`;
        return !existingKeys.has(key);
      });

      return [...prev, ...newEdges];
    });
  };

  const clearDynamicEdges = () => {
    setDynamicEdges([]);
  };

  const openPaperSelection = () => {
    setIsPaperSelectionOpen(true);
  };

  const closePaperSelection = () => {
    setIsPaperSelectionOpen(false);
  };

  const openAnalysisWorkspace = (paper: PaperInfo) => {
    setSelectedPaper(paper);
    setIsAnalysisWorkspaceOpen(true);
    setIsPaperSelectionOpen(false); // Close selection modal
  };

  const closeAnalysisWorkspace = () => {
    setIsAnalysisWorkspaceOpen(false);
    // Don't clear selectedPaper immediately in case we want to reference it
  };

  const toggleAnalysisHub = () => {
    setIsAnalysisHubOpen(prev => !prev);
  };

  const addAnalyzedPaper = (paperId: string) => {
    setAnalyzedPapers(prev => {
      if (prev.includes(paperId)) return prev;
      return [...prev, paperId];
    });
  };

  const addReviewedPaper = (paperId: string) => {
    setReviewedPapers(prev => {
      if (prev.includes(paperId)) return prev;
      return [...prev, paperId];
    });
  };

  // ============================================================================
  // Context Value
  // ============================================================================

  const value: LineageAnalysisContextType = {
    selectedPaper,
    setSelectedPaper,
    analysisResults,
    addAnalysisResult,
    getAnalysisResult,
    dynamicEdges,
    addEdgesToGraph,
    clearDynamicEdges,
    analyzedPapers,
    reviewedPapers,
    addAnalyzedPaper,
    addReviewedPaper,
    isPaperSelectionOpen,
    isAnalysisWorkspaceOpen,
    openPaperSelection,
    closePaperSelection,
    openAnalysisWorkspace,
    closeAnalysisWorkspace,
    isAnalysisHubOpen,
    toggleAnalysisHub,
    selectedCircleId,
    setSelectedCircleId,
  };

  return (
    <LineageAnalysisContext.Provider value={value}>
      {children}
    </LineageAnalysisContext.Provider>
  );
}

// ============================================================================
// Hook
// ============================================================================

export function useLineageAnalysis() {
  const context = useContext(LineageAnalysisContext);
  if (context === undefined) {
    throw new Error('useLineageAnalysis must be used within a LineageAnalysisProvider');
  }
  return context;
}

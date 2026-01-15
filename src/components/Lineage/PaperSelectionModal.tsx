import { useState, useRef, ChangeEvent } from 'react';
import { X, Upload, Link as LinkIcon, Users, BookMarked, Search, Loader2 } from 'lucide-react';
import { useLineageAnalysis, PaperInfo } from '../../contexts/LineageAnalysisContext';
import { useCommunity } from '../../contexts/CommunityContext';
import { supabase } from '../../lib/supabase';

type InputTab = 'upload' | 'url' | 'circle' | 'saved';

interface CirclePaper {
  id: string;
  title: string;
  arxiv_id?: string;
  session_title?: string;
}

interface SavedPaper {
  id: string;
  title: string;
  arxiv_id?: string;
  authors?: string[];
}

interface PaperSelectionModalProps {
  onSubmit?: (paperInfo: PaperInfo) => void;
  onClose?: () => void;
  circleId?: string | null;
}

export function PaperSelectionModal({ onSubmit, onClose, circleId }: PaperSelectionModalProps = {}) {
  const { closePaperSelection, openAnalysisWorkspace } = useLineageAnalysis();
  const { currentCommunity } = useCommunity();

  const [activeTab, setActiveTab] = useState<InputTab>('upload');
  const [isLoading, setIsLoading] = useState(false);

  // Upload tab state
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // URL tab state
  const [urlInput, setUrlInput] = useState('');
  const [urlError, setUrlError] = useState('');

  // Circle tab state
  const [circlePapers, setCirclePapers] = useState<CirclePaper[]>([]);
  const [circleSearchQuery, setCircleSearchQuery] = useState('');
  const [loadingCirclePapers, setLoadingCirclePapers] = useState(false);

  // Saved papers tab state
  const [savedPapers, setSavedPapers] = useState<SavedPaper[]>([]);
  const [savedSearchQuery, setSavedSearchQuery] = useState('');
  const [loadingSavedPapers, setLoadingSavedPapers] = useState(false);

  // ============================================================================
  // Tab Switching
  // ============================================================================

  const handleTabChange = async (tab: InputTab) => {
    setActiveTab(tab);

    // Load data when switching to circle/saved tabs
    if (tab === 'circle' && circlePapers.length === 0) {
      await loadCirclePapers();
    } else if (tab === 'saved' && savedPapers.length === 0) {
      await loadSavedPapers();
    }
  };

  // ============================================================================
  // Upload Tab Logic
  // ============================================================================

  const handleFileSelect = (file: File) => {
    if (file.type !== 'application/pdf') {
      alert('Please select a PDF file');
      return;
    }
    setUploadedFile(file);
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleUploadSubmit = () => {
    if (!uploadedFile) return;

    const paperInfo: PaperInfo = {
      uploadedFile,
      source: 'upload',
    };

    if (onSubmit) {
      onSubmit(paperInfo);
    } else {
      openAnalysisWorkspace(paperInfo);
    }
  };

  // ============================================================================
  // URL Tab Logic
  // ============================================================================

  const validateUrl = (url: string): boolean => {
    setUrlError('');

    if (!url.trim()) {
      setUrlError('Please enter a URL');
      return false;
    }

    // Check if it's an arXiv URL or direct PDF link
    const isArxiv = url.includes('arxiv.org');
    const isPdf = url.endsWith('.pdf') || url.includes('.pdf');

    if (!isArxiv && !isPdf) {
      setUrlError('Please provide an arXiv URL or direct PDF link');
      return false;
    }

    try {
      new URL(url);
    } catch {
      setUrlError('Invalid URL format');
      return false;
    }

    return true;
  };

  const handleUrlSubmit = () => {
    if (!validateUrl(urlInput)) return;

    // Extract arXiv ID if it's an arXiv URL
    let arxivId: string | undefined;
    if (urlInput.includes('arxiv.org')) {
      const match = urlInput.match(/arxiv\.org\/(abs|pdf)\/(\d+\.\d+)/);
      if (match) {
        arxivId = match[2];
      }
    }

    const paperInfo: PaperInfo = {
      pdf_url: urlInput,
      arxiv_id: arxivId,
      source: 'url',
    };

    if (onSubmit) {
      onSubmit(paperInfo);
    } else {
      openAnalysisWorkspace(paperInfo);
    }
  };

  // ============================================================================
  // Circle Tab Logic
  // ============================================================================

  const loadCirclePapers = async () => {
    const communityIdToUse = circleId || currentCommunity?.id;
    if (!communityIdToUse) {
      setCirclePapers([]);
      return;
    }

    setLoadingCirclePapers(true);
    try {
      // Get papers from current circle with their session info
      const { data, error } = await supabase
        .from('community_papers')
        .select('paper_id, papers!inner(id, title, arxiv_id)')
        .eq('community_id', communityIdToUse);

      if (error) throw error;

      const papers: CirclePaper[] = data
        ?.map((item: any) => ({
          id: item.papers?.id || item.paper_id,
          title: item.papers?.title || 'Unknown Title',
          arxiv_id: item.papers?.arxiv_id,
          session_title: undefined,
        }))
        .filter((p: any) => p.id) || [];

      setCirclePapers(papers);
    } catch (error) {
      console.error('Error loading circle papers:', error);
      setCirclePapers([]);
    } finally {
      setLoadingCirclePapers(false);
    }
  };

  const handleCirclePaperSelect = (paper: CirclePaper) => {
    const paperInfo: PaperInfo = {
      id: paper.id,
      title: paper.title,
      arxiv_id: paper.arxiv_id,
      source: 'circle',
    };

    if (onSubmit) {
      onSubmit(paperInfo);
    } else {
      openAnalysisWorkspace(paperInfo);
    }
  };

  // ============================================================================
  // Saved Papers Tab Logic
  // ============================================================================

  const loadSavedPapers = async () => {
    setLoadingSavedPapers(true);
    try {
      // Get all papers from database
      const { data, error } = await supabase
        .from('papers')
        .select('id, title, arxiv_id, authors')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;

      setSavedPapers(data || []);
    } catch (error) {
      console.error('Error loading saved papers:', error);
    } finally {
      setLoadingSavedPapers(false);
    }
  };

  const handleSavedPaperSelect = (paper: SavedPaper) => {
    const paperInfo: PaperInfo = {
      id: paper.id,
      title: paper.title,
      arxiv_id: paper.arxiv_id,
      source: 'saved',
    };

    if (onSubmit) {
      onSubmit(paperInfo);
    } else {
      openAnalysisWorkspace(paperInfo);
    }
  };

  // ============================================================================
  // Filtering
  // ============================================================================

  const filteredCirclePapers = circlePapers.filter(paper =>
    paper.title.toLowerCase().includes(circleSearchQuery.toLowerCase()) ||
    paper.arxiv_id?.toLowerCase().includes(circleSearchQuery.toLowerCase())
  );

  const filteredSavedPapers = savedPapers.filter(paper =>
    paper.title.toLowerCase().includes(savedSearchQuery.toLowerCase()) ||
    paper.arxiv_id?.toLowerCase().includes(savedSearchQuery.toLowerCase())
  );

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Select Paper to Analyze</h2>
          <button
            onClick={() => { onClose ? onClose() : closePaperSelection(); }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 px-6">
          <div className="flex gap-1">
            <button
              onClick={() => handleTabChange('upload')}
              className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 ${
                activeTab === 'upload'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Upload className="w-4 h-4 inline mr-2" />
              Upload PDF
            </button>
            <button
              onClick={() => handleTabChange('url')}
              className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 ${
                activeTab === 'url'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <LinkIcon className="w-4 h-4 inline mr-2" />
              URL
            </button>
            <button
              onClick={() => handleTabChange('circle')}
              className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 ${
                activeTab === 'circle'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              From Circle
            </button>
            <button
              onClick={() => handleTabChange('saved')}
              className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 ${
                activeTab === 'saved'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <BookMarked className="w-4 h-4 inline mr-2" />
              Saved Papers
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* Upload Tab */}
          {activeTab === 'upload' && (
            <div className="space-y-4">
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
                  isDragging
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-700 font-medium mb-2">
                  {uploadedFile ? uploadedFile.name : 'Drop PDF here or click to browse'}
                </p>
                <p className="text-gray-500 text-sm">
                  {uploadedFile ? `${(uploadedFile.size / 1024 / 1024).toFixed(2)} MB` : 'Maximum file size: 50MB'}
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </div>

              {uploadedFile && (
                <button
                  onClick={handleUploadSubmit}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Analyze "{uploadedFile.name}"
                </button>
              )}
            </div>
          )}

          {/* URL Tab */}
          {activeTab === 'url' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Paper URL
                </label>
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://arxiv.org/abs/2312.00752 or https://example.com/paper.pdf"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {urlError && (
                  <p className="text-red-600 text-sm mt-2">{urlError}</p>
                )}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Supported formats:</strong>
                  <br />
                  • arXiv URLs: https://arxiv.org/abs/XXXX.XXXXX
                  <br />
                  • Direct PDF links: https://example.com/paper.pdf
                </p>
              </div>

              <button
                onClick={handleUrlSubmit}
                disabled={!urlInput.trim()}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Analyze Paper from URL
              </button>
            </div>
          )}

          {/* Circle Tab */}
          {activeTab === 'circle' && (
            <div className="space-y-4">
              {!circleId && !currentCommunity ? (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">
                    Please select a circle to view its papers
                  </p>
                </div>
              ) : loadingCirclePapers ? (
                <div className="text-center py-12">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
                  <p className="text-gray-600">Loading papers...</p>
                </div>
              ) : (
                <>
                  <div className="relative">
                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={circleSearchQuery}
                      onChange={(e) => setCircleSearchQuery(e.target.value)}
                      placeholder="Search papers..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="max-h-96 overflow-y-auto space-y-2">
                    {filteredCirclePapers.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">
                        No papers found in this circle
                      </p>
                    ) : (
                      filteredCirclePapers.map((paper) => (
                        <div
                          key={paper.id}
                          onClick={() => handleCirclePaperSelect(paper)}
                          className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-colors"
                        >
                          <h4 className="font-medium text-gray-900 mb-1">{paper.title}</h4>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            {paper.arxiv_id && (
                              <span className="bg-gray-100 px-2 py-1 rounded">
                                arXiv: {paper.arxiv_id}
                              </span>
                            )}
                            {paper.session_title && (
                              <span className="text-gray-500">
                                Session: {paper.session_title}
                              </span>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Saved Papers Tab */}
          {activeTab === 'saved' && (
            <div className="space-y-4">
              {loadingSavedPapers ? (
                <div className="text-center py-12">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
                  <p className="text-gray-600">Loading saved papers...</p>
                </div>
              ) : (
                <>
                  <div className="relative">
                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={savedSearchQuery}
                      onChange={(e) => setSavedSearchQuery(e.target.value)}
                      placeholder="Search saved papers..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="max-h-96 overflow-y-auto space-y-2">
                    {filteredSavedPapers.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">
                        No saved papers found
                      </p>
                    ) : (
                      filteredSavedPapers.map((paper) => (
                        <div
                          key={paper.id}
                          onClick={() => handleSavedPaperSelect(paper)}
                          className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-colors"
                        >
                          <h4 className="font-medium text-gray-900 mb-1">{paper.title}</h4>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            {paper.arxiv_id && (
                              <span className="bg-gray-100 px-2 py-1 rounded">
                                arXiv: {paper.arxiv_id}
                              </span>
                            )}
                            {paper.authors && paper.authors.length > 0 && (
                              <span className="text-gray-500">
                                {paper.authors[0]} {paper.authors.length > 1 && `et al.`}
                              </span>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { X, Search, Plus, Check, Loader, ExternalLink, Upload } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { searchArxivDirect, type ArxivPaper } from '../../lib/arxivClient';
import { logError, getUserFriendlyErrorMessage } from '../../lib/errorHandling';

interface AddPaperModalProps {
  isOpen: boolean;
  onClose: () => void;
  communityId: string;
  onSuccess?: () => void;
}

type ImportMode = 'arxiv-id' | 'arxiv-search' | 'bulk';

export function AddPaperModal({ isOpen, onClose, communityId, onSuccess }: AddPaperModalProps) {
  const { user } = useAuth();
  const [mode, setMode] = useState<ImportMode>('arxiv-id');

  // Single arXiv ID import
  const [arxivInput, setArxivInput] = useState('');
  const [importing, setImporting] = useState(false);

  // arXiv search
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<ArxivPaper[]>([]);
  const [selectedPapers, setSelectedPapers] = useState<Set<string>>(new Set());

  // Bulk import
  const [bulkInput, setBulkInput] = useState('');

  // Success state
  const [importedCount, setImportedCount] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal closes
      setArxivInput('');
      setSearchQuery('');
      setSearchResults([]);
      setSelectedPapers(new Set());
      setBulkInput('');
      setImportedCount(0);
      setShowSuccess(false);
    }
  }, [isOpen]);

  const extractArxivId = (input: string): string | null => {
    // Handle various arXiv URL formats and plain IDs
    const patterns = [
      /arxiv\.org\/abs\/([0-9.]+)/i,
      /arxiv\.org\/pdf\/([0-9.]+)/i,
      /^([0-9]{4}\.[0-9]{4,5})(v[0-9]+)?$/,
    ];

    for (const pattern of patterns) {
      const match = input.match(pattern);
      if (match) {
        return match[1];
      }
    }

    return null;
  };

  const importPaperFromArxiv = async (arxivId: string): Promise<boolean> => {
    try {
      // Search arXiv for this specific paper
      const results = await searchArxivDirect({
        query: arxivId,
        maxResults: 1
      });

      if (results.length === 0) {
        throw new Error(`Paper with ID ${arxivId} not found on arXiv`);
      }

      const arxivPaper = results[0];

      // Check if paper already exists in database
      const { data: existingPaper } = await supabase
        .from('papers')
        .select('id')
        .eq('arxiv_id', arxivId)
        .maybeSingle();

      let paperId: string;

      if (existingPaper) {
        paperId = existingPaper.id;
      } else {
        // Extract year from published date
        const publishedYear = new Date(arxivPaper.published).getFullYear();

        // Prepare paper data
        const paperData = {
          title: arxivPaper.title,
          authors: arxivPaper.authors,
          abstract: arxivPaper.summary,
          arxiv_id: arxivId,
          pdf_url: arxivPaper.pdfLink,
          year: publishedYear,
        };

        console.log('Inserting paper:', paperData);

        // Insert new paper
        const { data: newPaper, error: insertError } = await supabase
          .from('papers')
          .insert(paperData)
          .select()
          .single();

        if (insertError) {
          console.error('Insert error details:', insertError);
          throw insertError;
        }
        paperId = newPaper.id;
      }

      // Check if already in community
      const { data: existingCommunityPaper } = await supabase
        .from('community_papers')
        .select('id')
        .eq('paper_id', paperId)
        .eq('community_id', communityId)
        .maybeSingle();

      if (existingCommunityPaper) {
        throw new Error('This paper is already in your community');
      }

      // Add to community
      const { error: communityError } = await supabase
        .from('community_papers')
        .insert({
          paper_id: paperId,
          community_id: communityId,
          added_by: user?.id,
        });

      if (communityError) throw communityError;

      return true;
    } catch (error) {
      logError('AddPaperModal.importPaperFromArxiv', error);
      throw error;
    }
  };

  const handleImportSingle = async () => {
    if (!arxivInput.trim()) return;

    const arxivId = extractArxivId(arxivInput.trim());
    if (!arxivId) {
      alert('Invalid arXiv ID or URL. Please enter a valid arXiv identifier like "2301.12345" or a URL like "https://arxiv.org/abs/2301.12345"');
      return;
    }

    setImporting(true);
    try {
      await importPaperFromArxiv(arxivId);
      setImportedCount(1);
      setShowSuccess(true);
      setArxivInput('');
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 1500);
    } catch (error) {
      alert(getUserFriendlyErrorMessage(error));
    } finally {
      setImporting(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setSearching(true);
    try {
      const results = await searchArxivDirect({
        query: searchQuery,
        maxResults: 20,
      });
      setSearchResults(results);
    } catch (error) {
      logError('AddPaperModal.handleSearch', error);
      alert(getUserFriendlyErrorMessage(error));
    } finally {
      setSearching(false);
    }
  };

  const togglePaperSelection = (arxivId: string) => {
    const newSelected = new Set(selectedPapers);
    if (newSelected.has(arxivId)) {
      newSelected.delete(arxivId);
    } else {
      newSelected.add(arxivId);
    }
    setSelectedPapers(newSelected);
  };

  const handleImportSelected = async () => {
    if (selectedPapers.size === 0) return;

    setImporting(true);
    let successCount = 0;
    const errors: string[] = [];

    for (const arxivId of selectedPapers) {
      try {
        await importPaperFromArxiv(arxivId);
        successCount++;
      } catch (error: any) {
        errors.push(`${arxivId}: ${error.message}`);
      }
    }

    setImporting(false);
    setImportedCount(successCount);
    setShowSuccess(true);

    if (errors.length > 0) {
      alert(`Imported ${successCount} papers. Errors:\n${errors.join('\n')}`);
    }

    setTimeout(() => {
      onSuccess?.();
      onClose();
    }, 1500);
  };

  const handleBulkImport = async () => {
    const ids = bulkInput
      .split(/[\n,;]/)
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => extractArxivId(line))
      .filter((id): id is string => id !== null);

    if (ids.length === 0) {
      alert('No valid arXiv IDs found. Please enter one ID per line or separated by commas.');
      return;
    }

    setImporting(true);
    let successCount = 0;
    const errors: string[] = [];

    for (const arxivId of ids) {
      try {
        await importPaperFromArxiv(arxivId);
        successCount++;
      } catch (error: any) {
        errors.push(`${arxivId}: ${error.message}`);
      }
    }

    setImporting(false);
    setImportedCount(successCount);
    setShowSuccess(true);

    if (errors.length > 0) {
      alert(`Imported ${successCount} papers. Errors:\n${errors.join('\n')}`);
    }

    setTimeout(() => {
      onSuccess?.();
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
          <div className="mb-4">
            <Check className="w-16 h-16 text-green-600 mx-auto" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Success!</h3>
          <p className="text-gray-600">
            Successfully added {importedCount} paper{importedCount !== 1 ? 's' : ''} to your community
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Add Papers from arXiv</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Mode Selection */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setMode('arxiv-id')}
              className={`flex-1 px-4 py-2 rounded-lg border-2 transition-all ${
                mode === 'arxiv-id'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="font-medium">Single Paper</div>
              <div className="text-xs">By arXiv ID or URL</div>
            </button>

            <button
              onClick={() => setMode('arxiv-search')}
              className={`flex-1 px-4 py-2 rounded-lg border-2 transition-all ${
                mode === 'arxiv-search'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="font-medium">Search arXiv</div>
              <div className="text-xs">Find and select papers</div>
            </button>

            <button
              onClick={() => setMode('bulk')}
              className={`flex-1 px-4 py-2 rounded-lg border-2 transition-all ${
                mode === 'bulk'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="font-medium">Bulk Import</div>
              <div className="text-xs">Multiple IDs at once</div>
            </button>
          </div>

          {/* Single arXiv ID Import */}
          {mode === 'arxiv-id' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  arXiv ID or URL
                </label>
                <input
                  type="text"
                  value={arxivInput}
                  onChange={(e) => setArxivInput(e.target.value)}
                  placeholder="e.g., 2301.12345 or https://arxiv.org/abs/2301.12345"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleImportSingle()}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter an arXiv identifier (e.g., 2301.12345) or full URL
                </p>
              </div>

              <button
                onClick={handleImportSingle}
                disabled={importing || !arxivInput.trim()}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
              >
                {importing ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Importing...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    Add Paper
                  </>
                )}
              </button>
            </div>
          )}

          {/* arXiv Search */}
          {mode === 'arxiv-search' && (
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search arXiv (e.g., 'transformer neural networks')"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button
                  onClick={handleSearch}
                  disabled={searching || !searchQuery.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                >
                  {searching ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    <Search className="w-5 h-5" />
                  )}
                  Search
                </button>
              </div>

              {searchResults.length > 0 && (
                <>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {searchResults.map((paper) => (
                      <div
                        key={paper.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedPapers.has(paper.id)
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                        onClick={() => togglePaperSelection(paper.id)}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={selectedPapers.has(paper.id)}
                            onChange={() => togglePaperSelection(paper.id)}
                            className="mt-1"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 mb-1">{paper.title}</h4>
                            <p className="text-sm text-gray-600 mb-2">
                              {paper.authors.slice(0, 3).join(', ')}
                              {paper.authors.length > 3 && ` et al.`}
                            </p>
                            <p className="text-xs text-gray-500 line-clamp-2">{paper.summary}</p>
                            <a
                              href={paper.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 mt-1"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink className="w-3 h-3" />
                              {paper.id}
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleImportSelected}
                    disabled={importing || selectedPapers.size === 0}
                    className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium flex items-center justify-center gap-2"
                  >
                    {importing ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        Importing {selectedPapers.size} paper{selectedPapers.size !== 1 ? 's' : ''}...
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5" />
                        Add {selectedPapers.size} Selected Paper{selectedPapers.size !== 1 ? 's' : ''}
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          )}

          {/* Bulk Import */}
          {mode === 'bulk' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  arXiv IDs (one per line)
                </label>
                <textarea
                  value={bulkInput}
                  onChange={(e) => setBulkInput(e.target.value)}
                  placeholder="2301.12345&#10;2302.23456&#10;https://arxiv.org/abs/2303.34567"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                  rows={10}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter arXiv IDs or URLs, one per line. You can also separate them with commas or semicolons.
                </p>
              </div>

              <button
                onClick={handleBulkImport}
                disabled={importing || !bulkInput.trim()}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium flex items-center justify-center gap-2"
              >
                {importing ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Importing...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Import All Papers
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

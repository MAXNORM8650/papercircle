import { useState, useEffect, useCallback } from 'react';
import { TrendingUp, Award, Sparkles, X, ExternalLink, Plus, Loader2, ChevronDown, ChevronUp, Filter, Save, Brain, Download, FileText, Table, Zap, Settings2, Play } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { useCommunity } from '../../contexts/CommunityContext';

interface Paper {
  id: string;
  title: string;
  abstract: string;
  year: number;
  authors: string[];
  url: string;
  source: string;
  venue: string;
  relevance_score: number;
  authority_score: number;
  novelty_score: number;
  final_score: number;
}

interface ModeWeights {
  relevance: number;
  authority: number;
  novelty: number;
}

type DiscoveryMode = 'stable' | 'discovery' | 'balanced' | 'custom';
type SortingStrategy = 'relevance' | 'recency' | 'citations' | 'similarity' | 'novelty' | 'combined';
type DataSource = 'arxiv' | 'semantic_scholar' | 'openalex' | 'dblp';

interface DiscoveryResults {
  query: string;
  search_spec: {
    core_keywords: string[];
    must_include: string[];
    nice_to_have: string[];
    negative_keywords: string[];
    suggested_mode: string;
    plausible_paper_titles: string[];
  };
  mode_used: string;
  mode_weights: ModeWeights;
  predicted_titles: string[];
  all_papers_sorted: Paper[];
  total_papers: number;
}

interface AIDiscoveryViewProps {
  searchQuery: string;
  triggerSearch?: boolean;
  onSearchComplete?: (paperCount: number) => void;
  onLoadingChange?: (isLoading: boolean) => void;
  onStopFunctionChange?: (stopFn: () => void) => void;
}

export function AIDiscoveryView({ searchQuery, triggerSearch, onSearchComplete, onLoadingChange, onStopFunctionChange }: AIDiscoveryViewProps) {
  const { user } = useAuth();
  const { userCommunities, currentCommunity } = useCommunity();
  const [results, setResults] = useState<DiscoveryResults | null>(null);
  const [filteredPapers, setFilteredPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(false);
  const [apiUrl, setApiUrl] = useState(
    import.meta.env.VITE_PAPERFINDER_API_URL || 'http://localhost:8000'
  );

  // Filters
  const [showFilters, setShowFilters] = useState(false);
  const [minFinalScore, setMinFinalScore] = useState(0);
  const [minRelevance, setMinRelevance] = useState(0);
  const [minAuthority, setMinAuthority] = useState(0);
  const [minNovelty, setMinNovelty] = useState(0);

  // Date filters
  const [minYear, setMinYear] = useState(2020);
  const [maxYear, setMaxYear] = useState(new Date().getFullYear());

  // Discovery Mode & Advanced Controls
  const [discoveryMode, setDiscoveryMode] = useState<DiscoveryMode>('balanced');
  const [sortingStrategy, setSortingStrategy] = useState<SortingStrategy>('relevance');
  const [selectedSources, setSelectedSources] = useState<DataSource[]>(['arxiv', 'semantic_scholar']);
  const [maxResultsPerSource, setMaxResultsPerSource] = useState(25);
  const [diversityLambda, setDiversityLambda] = useState(0.5);
  const [applyDiversity, setApplyDiversity] = useState(true);

  // MODE_WEIGHTS customization
  const [customMode, setCustomMode] = useState(false);
  const [relevanceWeight, setRelevanceWeight] = useState(0.4);
  const [authorityWeight, setAuthorityWeight] = useState(0.3);
  const [noveltyWeight, setNoveltyWeight] = useState(0.3);

  const [showAddToCommunity, setShowAddToCommunity] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
  const [selectedCommunityId, setSelectedCommunityId] = useState('');
  const [importing, setImporting] = useState(false);
  const [savingToCommunity, setSavingToCommunity] = useState(false);

  // Processing steps display
  const [showThinking, setShowThinking] = useState(false);
  const [processingSteps, setProcessingSteps] = useState<{step: string, status: 'pending' | 'running' | 'complete', time?: string}[]>([]);

  // AbortController for cancelling requests
  const [abortController, setAbortController] = useState<AbortController | null>(null);
  const [currentRequestId, setCurrentRequestId] = useState<string | null>(null);

  // Workflow phases
  const [searchPhase, setSearchPhase] = useState<'idle' | 'fast-search' | 'agent-processing' | 'complete'>('idle');
  const [agentWorkflow, setAgentWorkflow] = useState<'none' | 'quick' | 'full' | 'custom'>('none');
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);

  // Stop the discovery process
  const stopDiscovery = useCallback(async () => {
    if (currentRequestId) {
      // Call the cancel endpoint
      try {
        await fetch(`${apiUrl}/cancel/${currentRequestId}`, {
          method: 'POST',
        });
        console.log('Cancel request sent for:', currentRequestId);
      } catch (error) {
        console.error('Error sending cancel request:', error);
      }
    }

    if (abortController) {
      abortController.abort();
    }

    setLoading(false);
    setAbortController(null);
    setCurrentRequestId(null);
    // Mark all running steps as complete
    setProcessingSteps(prev => prev.map(s => s.status === 'running' ? {...s, status: 'complete'} : s));
  }, [currentRequestId, apiUrl, abortController]);

  // Update processing step
  const updateStep = (step: string, status: 'pending' | 'running' | 'complete') => {
    setProcessingSteps(prev => {
      const existing = prev.find(s => s.step === step);
      if (existing) {
        return prev.map(s => s.step === step ? {...s, status, time: status === 'complete' ? new Date().toLocaleTimeString() : s.time} : s);
      }
      return [...prev, {step, status, time: status === 'complete' ? new Date().toLocaleTimeString() : undefined}];
    });
  };

  // Notify parent of loading state changes
  useEffect(() => {
    if (onLoadingChange) {
      onLoadingChange(loading);
    }
  }, [loading, onLoadingChange]);

  // Notify parent of stop function (only once)
  useEffect(() => {
    if (onStopFunctionChange) {
      onStopFunctionChange(stopDiscovery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onStopFunctionChange]);

  // Trigger search when triggerSearch prop becomes true
  useEffect(() => {
    if (triggerSearch && searchQuery && searchQuery.trim()) {
      searchPapers();
    }
  }, [triggerSearch]);

  // Apply filters when results or filter values change
  useEffect(() => {
    if (results) {
      const filtered = results.all_papers_sorted.filter(
        paper =>
          paper.final_score >= minFinalScore &&
          paper.relevance_score >= minRelevance &&
          paper.authority_score >= minAuthority &&
          paper.novelty_score >= minNovelty &&
          (paper.year ? paper.year >= minYear && paper.year <= maxYear : true)
      );
      setFilteredPapers(filtered);
    }
  }, [results, minFinalScore, minRelevance, minAuthority, minNovelty, minYear, maxYear]);

  // Update weights when discovery mode changes
  useEffect(() => {
    if (discoveryMode !== 'custom') {
      const modeWeights = {
        stable: { relevance: 0.5, authority: 0.4, novelty: 0.1 },
        discovery: { relevance: 0.3, authority: 0.1, novelty: 0.6 },
        balanced: { relevance: 0.4, authority: 0.3, novelty: 0.3 },
      }[discoveryMode];

      if (modeWeights) {
        setRelevanceWeight(modeWeights.relevance);
        setAuthorityWeight(modeWeights.authority);
        setNoveltyWeight(modeWeights.novelty);
        setCustomMode(false);
      }
    }
  }, [discoveryMode]);

  // Normalize weights to sum to 1
  useEffect(() => {
    if (customMode) {
      const total = relevanceWeight + authorityWeight + noveltyWeight;
      if (total > 0 && Math.abs(total - 1.0) > 0.01) {
        const normalized = 1.0 / total;
        setRelevanceWeight(prev => prev * normalized);
        setAuthorityWeight(prev => prev * normalized);
        setNoveltyWeight(prev => prev * normalized);
      }
    }
  }, [relevanceWeight, authorityWeight, noveltyWeight, customMode]);

  const searchPapers = async () => {
    if (!searchQuery.trim()) {
      alert('Please enter a search query');
      return;
    }

    // Reset steps
    setProcessingSteps([]);
    setShowThinking(true); // Auto-show thinking section

    // Generate unique request ID
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setCurrentRequestId(requestId);

    // Create new AbortController for this search
    const controller = new AbortController();
    setAbortController(controller);

    setLoading(true);
    setSearchPhase('fast-search');
    setAgentWorkflow('none');

    try {
      // Initialize processing steps for fast search
      updateStep('🚀 Fast Search: Querying academic databases', 'running');

      const requestBody: any = {
        query: searchQuery,
        mode: discoveryMode === 'custom' ? null : discoveryMode,
        sorting_strategy: sortingStrategy,
        sources: selectedSources.join(','),
        max_results_per_source: maxResultsPerSource,
        apply_diversity: applyDiversity,
        diversity_lambda: diversityLambda,
        min_year: minYear,
        max_year: maxYear,
        request_id: requestId,
      };

      // If custom mode is enabled, send custom weights
      if (customMode || discoveryMode === 'custom') {
        requestBody.custom_weights = {
          relevance: relevanceWeight,
          authority: authorityWeight,
          novelty: noveltyWeight,
        };
      }

      const response = await fetch(`${apiUrl}/discover`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      updateStep('🚀 Fast Search: Querying academic databases', 'complete');
      updateStep('📊 Processing and scoring results', 'running');

      const data: DiscoveryResults = await response.json();

      updateStep('📊 Processing and scoring results', 'complete');
      updateStep('✅ Fast results ready!', 'running');

      updateStep('✅ Fast results ready!', 'complete');

      setResults(data);
      setSearchPhase('complete');

      const filteredCount = data.all_papers_sorted.filter(
        paper =>
          paper.final_score >= minFinalScore &&
          paper.relevance_score >= minRelevance &&
          paper.authority_score >= minAuthority &&
          paper.novelty_score >= minNovelty &&
          (paper.year ? paper.year >= minYear && paper.year <= maxYear : true)
      ).length;

      updateStep('Applying client-side filters', 'complete');

      // Auto-save papers to database for future reference
      if (data.all_papers_sorted && data.all_papers_sorted.length > 0) {
        updateStep('Saving to database', 'running');
        await savePapersToDatabase(data.all_papers_sorted);
        updateStep('Saving to database', 'complete');

        // Auto-save to current community if one is selected
        if (currentCommunity) {
          updateStep('Adding to community', 'running');
          await saveAllPapersToCommunity(data.all_papers_sorted, currentCommunity.id);
          updateStep('Adding to community', 'complete');
        }
      }

      if (onSearchComplete) {
        onSearchComplete(data.all_papers_sorted?.length || 0);
      }
    } catch (error) {
      // Handle abort error separately
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Discovery aborted by user');
        return;
      }

      console.error('Error searching papers:', error);

      // Check if it was cancelled (HTTP 499)
      if (error instanceof Response && error.status === 499) {
        console.log('Discovery was cancelled on server');
        return;
      }

      alert(
        'Failed to search papers. Make sure paperfinder API is running at ' + apiUrl + '\n\n' +
        'Start it with: python paperfinder_api.py'
      );
    } finally {
      setLoading(false);
      setAbortController(null);
      setCurrentRequestId(null);
    }
  };

  const savePapersToDatabase = async (papers: Paper[]) => {
    if (!user) return;

    try {
      // Save each unique paper to the papers table
      for (const paper of papers) {
        // Check if paper already exists
        const { data: existing } = await supabase
          .from('papers')
          .select('id')
          .eq('title', paper.title)
          .maybeSingle();

        if (!existing) {
          // Insert new paper
          await supabase.from('papers').insert({
            title: paper.title,
            authors: paper.authors,
            abstract: paper.abstract,
            year: paper.year,
            pdf_url: paper.url,
            venue: paper.venue,
            metadata: {
              source: paper.source,
              ai_scores: {
                relevance: paper.relevance_score,
                authority: paper.authority_score,
                novelty: paper.novelty_score,
                final: paper.final_score,
              },
              discovered_by: user.id,
              discovered_at: new Date().toISOString(),
            },
          });
        }
      }
    } catch (error) {
      console.error('Error saving papers to database:', error);
    }
  };

  const saveAllPapersToCommunity = async (papers: Paper[], communityId: string) => {
    if (!user) return;

    setSavingToCommunity(true);
    try {
      let savedCount = 0;
      for (const paper of papers) {
        // First ensure the paper exists in papers table
        let paperId: string;

        const { data: existing } = await supabase
          .from('papers')
          .select('id')
          .eq('title', paper.title)
          .maybeSingle();

        if (existing) {
          paperId = existing.id;
        } else {
          const { data: newPaper, error: insertError } = await supabase
            .from('papers')
            .insert({
              title: paper.title,
              authors: paper.authors,
              abstract: paper.abstract,
              year: paper.year,
              pdf_url: paper.url,
              venue: paper.venue,
              metadata: {
                source: paper.source,
                ai_scores: {
                  relevance: paper.relevance_score,
                  authority: paper.authority_score,
                  novelty: paper.novelty_score,
                  final: paper.final_score,
                },
              },
            })
            .select('id')
            .single();

          if (insertError || !newPaper) continue;
          paperId = newPaper.id;
        }

        // Check if already in community
        const { data: existingCommunityPaper } = await supabase
          .from('community_papers')
          .select('id')
          .eq('paper_id', paperId)
          .eq('community_id', communityId)
          .maybeSingle();

        if (!existingCommunityPaper) {
          // Add to community
          const { error } = await supabase.from('community_papers').insert({
            paper_id: paperId,
            community_id: communityId,
            added_by: user.id,
          });

          if (!error) savedCount++;
        }
      }

      if (savedCount > 0) {
        console.log(`Saved ${savedCount} new papers to community`);
      }
    } catch (error) {
      console.error('Error saving papers to community:', error);
    } finally {
      setSavingToCommunity(false);
    }
  };

  const handleAddToCommunity = (paper: Paper) => {
    setSelectedPaper(paper);
    setShowAddToCommunity(true);
  };

  const addPaperToCommunity = async () => {
    if (!selectedPaper || !selectedCommunityId || !user) return;

    setImporting(true);
    try {
      // First, ensure the paper exists in papers table
      let paperId: string;

      const { data: existing } = await supabase
        .from('papers')
        .select('id')
        .eq('title', selectedPaper.title)
        .maybeSingle();

      if (existing) {
        paperId = existing.id;
      } else {
        // Insert the paper
        const { data: newPaper, error: insertError } = await supabase
          .from('papers')
          .insert({
            title: selectedPaper.title,
            authors: selectedPaper.authors,
            abstract: selectedPaper.abstract,
            year: selectedPaper.year,
            pdf_url: selectedPaper.url,
            venue: selectedPaper.venue,
            metadata: {
              source: selectedPaper.source,
              ai_scores: {
                relevance: selectedPaper.relevance_score,
                authority: selectedPaper.authority_score,
                novelty: selectedPaper.novelty_score,
                final: selectedPaper.final_score,
              },
            },
          })
          .select('id')
          .single();

        if (insertError || !newPaper) {
          throw new Error('Failed to create paper');
        }
        paperId = newPaper.id;
      }

      // Check if already in community
      const { data: existingCommunityPaper } = await supabase
        .from('community_papers')
        .select('id')
        .eq('paper_id', paperId)
        .eq('community_id', selectedCommunityId)
        .maybeSingle();

      if (existingCommunityPaper) {
        alert('This paper is already in the selected community');
        setShowAddToCommunity(false);
        setSelectedPaper(null);
        return;
      }

      // Add to community
      const { error } = await supabase
        .from('community_papers')
        .insert({
          paper_id: paperId,
          community_id: selectedCommunityId,
          added_by: user.id,
        });

      if (error) throw error;

      alert('Paper added to community successfully!');
      setShowAddToCommunity(false);
      setSelectedPaper(null);
      setSelectedCommunityId('');
    } catch (error) {
      console.error('Error adding paper to community:', error);
      alert('Failed to add paper to community');
    } finally {
      setImporting(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.75) return 'text-green-600';
    if (score >= 0.5) return 'text-blue-600';
    if (score >= 0.25) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const getBarWidth = (score: number) => `${Math.round(score * 100)}%`;

  // Export to BibTeX
  const exportToBibTeX = (papers: Paper[], filename = 'papers.bib') => {
    const bibtexEntries = papers.map((paper, index) => {
      const firstAuthor = paper.authors[0]?.replace(/\s+/g, '') || 'Unknown';
      const year = paper.year || 'XXXX';
      const citeKey = `${firstAuthor}${year}_${index + 1}`;

      return `@article{${citeKey},
  title = {${paper.title}},
  author = {${paper.authors.join(' and ')}},
  year = {${year}},
  journal = {${paper.venue || 'arXiv'}},
  url = {${paper.url}},
  abstract = {${paper.abstract?.substring(0, 500) || ''}}
}`;
    }).join('\n\n');

    const blob = new Blob([bibtexEntries], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export to CSV
  const exportToCSV = (papers: Paper[], filename = 'papers.csv') => {
    const headers = ['Title', 'Authors', 'Year', 'Venue', 'URL', 'Relevance', 'Authority', 'Novelty', 'Final Score', 'Abstract'];
    const rows = papers.map(p => [
      `"${p.title.replace(/"/g, '""')}"`,
      `"${p.authors.join('; ').replace(/"/g, '""')}"`,
      p.year || '',
      `"${(p.venue || '').replace(/"/g, '""')}"`,
      p.url,
      p.relevance_score.toFixed(3),
      p.authority_score.toFixed(3),
      p.novelty_score.toFixed(3),
      p.final_score.toFixed(3),
      `"${(p.abstract?.substring(0, 200) || '').replace(/"/g, '""')}"`
    ].join(','));

    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export single paper
  const exportSinglePaper = (paper: Paper, format: 'bib' | 'csv') => {
    if (format === 'bib') {
      exportToBibTeX([paper], `${paper.title.substring(0, 30).replace(/[^a-z0-9]/gi, '_')}.bib`);
    } else {
      exportToCSV([paper], `${paper.title.substring(0, 30).replace(/[^a-z0-9]/gi, '_')}.csv`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Processing Steps */}
      {processingSteps.length > 0 && (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setShowThinking(!showThinking)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-indigo-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Brain className={`w-5 h-5 text-indigo-600 ${loading ? 'animate-pulse' : ''}`} />
              <h3 className="text-lg font-semibold text-gray-900">Processing Steps</h3>
              <span className="text-sm text-indigo-600">
                {processingSteps.filter(s => s.status === 'complete').length}/{processingSteps.length} complete
              </span>
            </div>
            {showThinking ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {showThinking && (
            <div className="px-6 pb-6">
              <div className="bg-white rounded-lg p-4">
                <div className="space-y-2">
                  {processingSteps.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        {step.status === 'complete' && (
                          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-green-600"></div>
                          </div>
                        )}
                        {step.status === 'running' && (
                          <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
                          </div>
                        )}
                        {step.status === 'pending' && (
                          <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${step.status === 'complete' ? 'text-gray-700' : 'text-gray-900 font-medium'}`}>
                          {step.step}
                        </p>
                      </div>
                      {step.time && (
                        <span className="text-xs text-gray-500">{step.time}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Results Summary */}
      {results && (
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-purple-600" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Found {results.total_papers} papers
                </h3>
                <p className="text-sm text-gray-600">
                  Mode: <span className="font-medium capitalize">{results.mode_used}</span> •
                  Showing {filteredPapers.length} after filters
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Export Options */}
              <div className="flex items-center gap-1 bg-white rounded-lg border border-purple-200 p-1">
                <button
                  onClick={() => exportToBibTeX(filteredPapers)}
                  className="px-3 py-1.5 text-xs font-medium text-purple-700 hover:bg-purple-100 rounded transition-colors flex items-center gap-1"
                  title="Export all papers as BibTeX"
                >
                  <FileText className="w-3 h-3" />
                  BibTeX
                </button>
                <button
                  onClick={() => exportToCSV(filteredPapers)}
                  className="px-3 py-1.5 text-xs font-medium text-purple-700 hover:bg-purple-100 rounded transition-colors flex items-center gap-1"
                  title="Export all papers as CSV"
                >
                  <Table className="w-3 h-3" />
                  CSV
                </button>
              </div>

              {/* Agent Workflows */}
              {searchPhase === 'complete' && agentWorkflow === 'none' && (
                <div className="relative group">
                  <button
                    className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all text-sm flex items-center gap-2 shadow-md"
                  >
                    <Brain className="w-4 h-4" />
                    Enhance with AI Agents
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                    <div className="p-2">
                      <button
                        onClick={() => setAgentWorkflow('quick')}
                        className="w-full text-left px-3 py-2 rounded hover:bg-purple-50 text-sm"
                      >
                        <div className="font-medium text-gray-900 flex items-center gap-2">
                          <Zap className="w-4 h-4 text-yellow-600" />
                          Quick Research
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          Fast analysis & sorting
                        </div>
                      </button>
                      <button
                        onClick={() => setAgentWorkflow('full')}
                        className="w-full text-left px-3 py-2 rounded hover:bg-purple-50 text-sm"
                      >
                        <div className="font-medium text-gray-900 flex items-center gap-2">
                          <Brain className="w-4 h-4 text-purple-600" />
                          Full Pipeline
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          Deep analysis, trends, visualization
                        </div>
                      </button>
                      <button
                        onClick={() => setAgentWorkflow('custom')}
                        className="w-full text-left px-3 py-2 rounded hover:bg-purple-50 text-sm"
                      >
                        <div className="font-medium text-gray-900 flex items-center gap-2">
                          <Settings2 className="w-4 h-4 text-blue-600" />
                          Custom Workflow
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          Choose specific agent tasks
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {currentCommunity && (
                <button
                  onClick={() => saveAllPapersToCommunity(filteredPapers, currentCommunity.id)}
                  disabled={savingToCommunity}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm flex items-center gap-2 disabled:opacity-50"
                  title="Save all filtered papers to current community"
                >
                  {savingToCommunity ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save All
                    </>
                  )}
                </button>
              )}

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 border border-purple-300 rounded-lg hover:bg-purple-100 transition-colors text-sm flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                {showFilters ? 'Hide' : 'Show'} Settings
                {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Query Details */}
          <div className="bg-white rounded-lg p-4 mb-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-600 mb-1">Core Keywords</p>
                <div className="flex flex-wrap gap-1">
                  {results.search_spec.core_keywords.map((kw, i) => (
                    <span key={i} className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
              {results.search_spec.must_include.length > 0 && (
                <div>
                  <p className="text-gray-600 mb-1">Must Include</p>
                  <div className="flex flex-wrap gap-1">
                    {results.search_spec.must_include.map((kw, i) => (
                      <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <p className="text-gray-600 mb-1">Mode Weights</p>
                <div className="text-xs space-y-1">
                  <div>Relevance: {(results.mode_weights.relevance * 100).toFixed(0)}%</div>
                  <div>Authority: {(results.mode_weights.authority * 100).toFixed(0)}%</div>
                  <div>Novelty: {(results.mode_weights.novelty * 100).toFixed(0)}%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="bg-white rounded-lg p-6 space-y-6">
              {/* Current Settings Summary */}
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Current Settings</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600">Mode:</span>{' '}
                    <span className="font-medium text-purple-700 capitalize">{discoveryMode}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Sorting:</span>{' '}
                    <span className="font-medium text-purple-700 capitalize">{sortingStrategy}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Sources:</span>{' '}
                    <span className="font-medium text-purple-700">{selectedSources.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Max/Source:</span>{' '}
                    <span className="font-medium text-purple-700">{maxResultsPerSource}</span>
                  </div>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="pb-6 border-b border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Quick Presets</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <button
                    onClick={() => {
                      setDiscoveryMode('stable');
                      setSortingStrategy('citations');
                      setSelectedSources(['arxiv', 'semantic_scholar', 'openalex']);
                      setMaxResultsPerSource(30);
                      setApplyDiversity(false);
                      setMinYear(2020);
                    }}
                    className="p-3 text-left rounded-lg border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all"
                  >
                    <div className="font-semibold text-gray-900 text-sm mb-1">📚 Literature Review</div>
                    <div className="text-xs text-gray-600">
                      Comprehensive, well-cited papers
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setDiscoveryMode('discovery');
                      setSortingStrategy('novelty');
                      setSelectedSources(['arxiv']);
                      setMaxResultsPerSource(50);
                      setApplyDiversity(true);
                      setDiversityLambda(0.3);
                      setMinYear(2023);
                    }}
                    className="p-3 text-left rounded-lg border-2 border-gray-200 hover:border-green-400 hover:bg-green-50 transition-all"
                  >
                    <div className="font-semibold text-gray-900 text-sm mb-1">🔬 Cutting Edge</div>
                    <div className="text-xs text-gray-600">
                      Latest novel research
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setDiscoveryMode('balanced');
                      setSortingStrategy('combined');
                      setSelectedSources(['arxiv', 'semantic_scholar']);
                      setMaxResultsPerSource(25);
                      setApplyDiversity(true);
                      setDiversityLambda(0.5);
                      setMinYear(2022);
                    }}
                    className="p-3 text-left rounded-lg border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-all"
                  >
                    <div className="font-semibold text-gray-900 text-sm mb-1">⚖️ Balanced Search</div>
                    <div className="text-xs text-gray-600">
                      Mix of quality and novelty
                    </div>
                  </button>
                </div>
              </div>

              {/* Discovery Mode Selection */}
              <div className="pb-6 border-b border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">Discovery Mode</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
                  <button
                    onClick={() => setDiscoveryMode('stable')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      discoveryMode === 'stable'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="font-semibold text-gray-900 mb-1">Stable</div>
                    <div className="text-xs text-gray-600">
                      Authoritative, well-cited papers
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      R:50% A:40% N:10%
                    </div>
                  </button>
                  <button
                    onClick={() => setDiscoveryMode('balanced')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      discoveryMode === 'balanced'
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="font-semibold text-gray-900 mb-1">Balanced</div>
                    <div className="text-xs text-gray-600">
                      Mix of quality and novelty
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      R:40% A:30% N:30%
                    </div>
                  </button>
                  <button
                    onClick={() => setDiscoveryMode('discovery')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      discoveryMode === 'discovery'
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <div className="font-semibold text-gray-900 mb-1">Discovery</div>
                    <div className="text-xs text-gray-600">
                      Novel, cutting-edge research
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      R:30% A:10% N:60%
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setDiscoveryMode('custom');
                      setCustomMode(true);
                    }}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      discoveryMode === 'custom'
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-300'
                    }`}
                  >
                    <div className="font-semibold text-gray-900 mb-1">Custom</div>
                    <div className="text-xs text-gray-600">
                      Define your own weights
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      Fully customizable
                    </div>
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  R = Relevance, A = Authority (citations/recency), N = Novelty (uniqueness)
                </p>
              </div>

              {/* Data Sources */}
              <div className="pb-6 border-b border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">Data Sources</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {(['arxiv', 'semantic_scholar', 'openalex', 'dblp'] as DataSource[]).map((source) => (
                    <label
                      key={source}
                      className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedSources.includes(source)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedSources([...selectedSources, source]);
                          } else {
                            setSelectedSources(selectedSources.filter((s) => s !== source));
                          }
                        }}
                        className="rounded text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {source.replace('_', ' ')}
                      </span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Select at least one source. More sources = broader coverage but slower search.
                </p>
              </div>

              {/* Sorting Strategy */}
              <div className="pb-6 border-b border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">Sorting Strategy</h4>
                <select
                  value={sortingStrategy}
                  onChange={(e) => setSortingStrategy(e.target.value as SortingStrategy)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="relevance">Relevance - Best match to query</option>
                  <option value="recency">Recency - Newest papers first</option>
                  <option value="citations">Citations - Most cited first</option>
                  <option value="similarity">Similarity - Closest to query (TF-IDF)</option>
                  <option value="novelty">Novelty - Most unique/novel papers</option>
                  <option value="combined">Combined - Weighted combination of all factors</option>
                </select>
              </div>

              {/* Search Parameters */}
              <div className="pb-6 border-b border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">Search Parameters</h4>

                {/* Max Results Per Source */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      Max Results Per Source
                    </label>
                    <span className="text-sm font-bold text-purple-700">{maxResultsPerSource}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={maxResultsPerSource}
                    onChange={(e) => setMaxResultsPerSource(parseInt(e.target.value))}
                    className="w-full h-2 bg-gradient-to-r from-purple-200 to-purple-600 rounded-lg appearance-none cursor-pointer"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Higher values = more comprehensive results but slower search
                  </p>
                </div>

                {/* Diversity Controls */}
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-gray-700">
                      Apply MMR Diversity
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={applyDiversity}
                        onChange={(e) => setApplyDiversity(e.target.checked)}
                        className="rounded text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {applyDiversity ? 'Enabled' : 'Disabled'}
                      </span>
                    </label>
                  </div>

                  {applyDiversity && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700">
                          Diversity vs Relevance (λ)
                        </label>
                        <span className="text-sm font-bold text-purple-700">
                          {diversityLambda.toFixed(2)}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={diversityLambda}
                        onChange={(e) => setDiversityLambda(parseFloat(e.target.value))}
                        className="w-full h-2 bg-gradient-to-r from-green-200 to-blue-600 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-600 mt-1">
                        <span>More Diversity</span>
                        <span>More Relevance</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        MMR (Maximal Marginal Relevance) balances result diversity with relevance
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* MODE_WEIGHTS Customization */}
              <div className="pb-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">Custom Weight Configuration</h4>
                  <span className={`text-sm ${customMode ? 'text-purple-600 font-medium' : 'text-gray-500'}`}>
                    {customMode ? 'Active' : 'Use mode presets above'}
                  </span>
                </div>

                {customMode && (
                  <div className="space-y-4 bg-purple-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-600 mb-3">
                      Adjust the importance of each factor. Weights will auto-normalize to sum to 100%.
                    </p>

                    {/* Relevance Weight */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                          <TrendingUp className="w-4 h-4 text-blue-600" />
                          Relevance Weight
                        </label>
                        <span className="text-sm font-bold text-blue-700">
                          {(relevanceWeight * 100).toFixed(0)}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={relevanceWeight}
                        onChange={(e) => setRelevanceWeight(parseFloat(e.target.value))}
                        className="w-full h-2 bg-gradient-to-r from-blue-200 to-blue-600 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    {/* Authority Weight */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                          <Award className="w-4 h-4 text-yellow-600" />
                          Authority Weight
                        </label>
                        <span className="text-sm font-bold text-yellow-700">
                          {(authorityWeight * 100).toFixed(0)}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={authorityWeight}
                        onChange={(e) => setAuthorityWeight(parseFloat(e.target.value))}
                        className="w-full h-2 bg-gradient-to-r from-yellow-200 to-yellow-600 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    {/* Novelty Weight */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                          <Sparkles className="w-4 h-4 text-green-600" />
                          Novelty Weight
                        </label>
                        <span className="text-sm font-bold text-green-700">
                          {(noveltyWeight * 100).toFixed(0)}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={noveltyWeight}
                        onChange={(e) => setNoveltyWeight(parseFloat(e.target.value))}
                        className="w-full h-2 bg-gradient-to-r from-green-200 to-green-600 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    <div className="text-xs text-gray-600 bg-white rounded p-2 mt-2">
                      Total: {((relevanceWeight + authorityWeight + noveltyWeight) * 100).toFixed(0)}%
                    </div>
                  </div>
                )}
              </div>

              {/* Help & Information */}
              <div className="pb-6 border-b border-gray-200">
                <details className="group">
                  <summary className="cursor-pointer font-semibold text-gray-900 hover:text-purple-700 flex items-center justify-between">
                    <span>ℹ️ Understanding AI Discovery Settings</span>
                    <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="mt-3 space-y-3 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                    <div>
                      <strong className="text-gray-900">Discovery Modes:</strong>
                      <ul className="ml-4 mt-1 space-y-1">
                        <li>• <strong>Stable:</strong> Prioritizes authoritative, well-cited papers (great for literature reviews)</li>
                        <li>• <strong>Discovery:</strong> Hunts for novel, cutting-edge research (great for innovation)</li>
                        <li>• <strong>Balanced:</strong> Mix of established and novel papers (great for comprehensive research)</li>
                        <li>• <strong>Custom:</strong> Define your own weight preferences</li>
                      </ul>
                    </div>
                    <div>
                      <strong className="text-gray-900">Sorting Strategies:</strong>
                      <ul className="ml-4 mt-1 space-y-1">
                        <li>• <strong>Relevance:</strong> Best overall match to your query</li>
                        <li>• <strong>Citations:</strong> Most influential papers by citation count</li>
                        <li>• <strong>Recency:</strong> Latest publications first</li>
                        <li>• <strong>Novelty:</strong> Unique papers less similar to others</li>
                        <li>• <strong>Combined:</strong> Weighted mix of all factors</li>
                      </ul>
                    </div>
                    <div>
                      <strong className="text-gray-900">MMR Diversity:</strong>
                      <p className="ml-4 mt-1">
                        Maximal Marginal Relevance ensures your results are diverse, not just variations of the same topic.
                        Lower λ = more diversity, Higher λ = more relevance.
                      </p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Score Filters */}
              <div className="pb-6 border-b border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">Score Thresholds</h4>

                {/* Final Score Filter */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      Min Final Score
                    </label>
                    <span className="text-sm font-bold text-purple-700">
                      {(minFinalScore * 100).toFixed(0)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={minFinalScore}
                    onChange={(e) => setMinFinalScore(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gradient-to-r from-purple-200 to-purple-600 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Relevance Filter */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      Min Relevance Score
                    </label>
                    <span className="text-sm font-bold text-blue-700">
                      {(minRelevance * 100).toFixed(0)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={minRelevance}
                    onChange={(e) => setMinRelevance(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gradient-to-r from-blue-200 to-blue-600 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Authority Filter */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      <Award className="w-4 h-4 text-yellow-600" />
                      Min Authority Score
                    </label>
                    <span className="text-sm font-bold text-yellow-700">
                      {(minAuthority * 100).toFixed(0)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={minAuthority}
                    onChange={(e) => setMinAuthority(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gradient-to-r from-yellow-200 to-yellow-600 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Novelty Filter */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      <Sparkles className="w-4 h-4 text-green-600" />
                      Min Novelty Score
                    </label>
                    <span className="text-sm font-bold text-green-700">
                      {(minNovelty * 100).toFixed(0)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={minNovelty}
                    onChange={(e) => setMinNovelty(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gradient-to-r from-green-200 to-green-600 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Date Range Filter */}
              <div className="pb-6 border-b border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">Publication Year Range</h4>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      From Year
                    </label>
                    <input
                      type="number"
                      min="2000"
                      max={maxYear}
                      value={minYear}
                      onChange={(e) => setMinYear(parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      To Year
                    </label>
                    <input
                      type="number"
                      min={minYear}
                      max={new Date().getFullYear()}
                      value={maxYear}
                      onChange={(e) => setMaxYear(parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  // Reset filters
                  setMinFinalScore(0);
                  setMinRelevance(0);
                  setMinAuthority(0);
                  setMinNovelty(0);
                  setMinYear(2020);
                  setMaxYear(new Date().getFullYear());

                  // Reset advanced settings
                  setDiscoveryMode('balanced');
                  setSortingStrategy('relevance');
                  setSelectedSources(['arxiv', 'semantic_scholar']);
                  setMaxResultsPerSource(25);
                  setDiversityLambda(0.5);
                  setApplyDiversity(true);

                  // Reset weights
                  setCustomMode(false);
                  setRelevanceWeight(0.4);
                  setAuthorityWeight(0.3);
                  setNoveltyWeight(0.3);
                }}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Reset All Settings to Defaults
              </button>
            </div>
          )}
        </div>
      )}

      {/* Results */}
      {loading && (
        <div className="text-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600 mx-auto mb-3" />
          <p className="text-gray-600">AI is discovering papers...</p>
        </div>
      )}

      {!loading && results && (
        <>
          {/* Results Summary */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  Query: <span className="font-medium text-gray-900">{results.search_spec.core_keywords.join(', ')}</span>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Found {filteredPapers.length} papers using <span className="font-medium capitalize">{results.mode_used}</span> mode
                </p>
              </div>
            </div>
          </div>

          {/* Papers List */}
          <div className="space-y-4">
            {filteredPapers.map((paper, index) => (
              <div
                key={`${paper.id}-${index}`}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  {/* Rank Badge */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center">
                      #{index + 1}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Title */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {paper.title}
                    </h3>

                    {/* Authors and Year */}
                    <p className="text-sm text-gray-600 mb-2">
                      {paper.authors.slice(0, 3).join(', ')}
                      {paper.authors.length > 3 && ' et al.'} • {paper.year}
                    </p>

                    {/* Metadata Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {paper.venue && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          📚 {paper.venue}
                        </span>
                      )}
                      {paper.source && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                          🔗 {paper.source}
                        </span>
                      )}
                      {(paper as any).raw_source_metadata?.primary_category && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                          🏷️ {(paper as any).raw_source_metadata.primary_category}
                        </span>
                      )}
                      {(paper as any).doi && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                          DOI
                        </span>
                      )}
                    </div>

                    {/* Abstract */}
                    <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                      {paper.abstract}
                    </p>

                    {/* Scores */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                      {/* Final Score */}
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-gray-600 font-medium">Final</span>
                          <span className={`font-bold ${getScoreColor(paper.final_score)}`}>
                            {(paper.final_score * 100).toFixed(0)}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-indigo-500"
                            style={{ width: getBarWidth(paper.final_score) }}
                          />
                        </div>
                      </div>

                      {/* Relevance */}
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-gray-600 font-medium flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            Relevance
                          </span>
                          <span className={`font-bold ${getScoreColor(paper.relevance_score)}`}>
                            {(paper.relevance_score * 100).toFixed(0)}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500"
                            style={{ width: getBarWidth(paper.relevance_score) }}
                          />
                        </div>
                      </div>

                      {/* Authority */}
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-gray-600 font-medium flex items-center gap-1">
                            <Award className="w-3 h-3" />
                            Authority
                          </span>
                          <span className={`font-bold ${getScoreColor(paper.authority_score)}`}>
                            {(paper.authority_score * 100).toFixed(0)}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-purple-500"
                            style={{ width: getBarWidth(paper.authority_score) }}
                          />
                        </div>
                      </div>

                      {/* Novelty */}
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-gray-600 font-medium flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            Novelty
                          </span>
                          <span className={`font-bold ${getScoreColor(paper.novelty_score)}`}>
                            {(paper.novelty_score * 100).toFixed(0)}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500"
                            style={{ width: getBarWidth(paper.novelty_score) }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <a
                        href={paper.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors font-medium"
                      >
                        <ExternalLink className="w-3 h-3" />
                        View Paper
                      </a>

                      {/* Export buttons */}
                      <div className="flex items-center gap-1 border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => exportSinglePaper(paper, 'bib')}
                          className="px-2 py-1.5 text-xs bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-1"
                          title="Export as BibTeX"
                        >
                          <FileText className="w-3 h-3" />
                          .bib
                        </button>
                        <button
                          onClick={() => exportSinglePaper(paper, 'csv')}
                          className="px-2 py-1.5 text-xs bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-1 border-l border-gray-200"
                          title="Export as CSV"
                        >
                          <Table className="w-3 h-3" />
                          .csv
                        </button>
                      </div>

                      {user && userCommunities.length > 0 && (
                        <button
                          onClick={() => handleAddToCommunity(paper)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                        >
                          <Plus className="w-3 h-3" />
                          Add to Community
                        </button>
                      )}

                      <span className="text-xs text-gray-500 ml-auto">
                        {paper.venue} • {paper.source}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPapers.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No papers found matching your criteria</p>
              <p className="text-sm text-gray-500 mt-1">Try adjusting the minimum score filter</p>
            </div>
          )}
        </>
      )}

      {!loading && !results && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">Enter a research query to discover papers</p>
          <p className="text-sm text-gray-500 mt-1">AI will analyze and rank papers based on relevance, authority, and novelty</p>
        </div>
      )}

      {/* Add to Community Modal */}
      {showAddToCommunity && selectedPaper && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add to Community</h3>
              <button
                onClick={() => {
                  setShowAddToCommunity(false);
                  setSelectedPaper(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-900 mb-2">{selectedPaper.title}</p>
              <p className="text-xs text-gray-600">
                {selectedPaper.authors.slice(0, 3).join(', ')}
                {selectedPaper.authors.length > 3 ? ', et al.' : ''}
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Community
              </label>
              <select
                value={selectedCommunityId}
                onChange={(e) => setSelectedCommunityId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Choose a community...</option>
                {userCommunities.map((community) => (
                  <option key={community.id} value={community.id}>
                    {community.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowAddToCommunity(false);
                  setSelectedPaper(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                disabled={importing}
              >
                Cancel
              </button>
              <button
                onClick={addPaperToCommunity}
                disabled={importing || !selectedCommunityId}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {importing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Add to Community
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import {
  Filter,
  Download,
  SortAsc,
  SortDesc,
  Calendar,
  BookOpen,
  BarChart3,
  ExternalLink,
  FileText,
  X,
  Loader2,
  ArrowLeft,
  Tag,
  TrendingUp,
  Search,
  Sparkles,
  Award,
  Users,
  Copy,
  Check,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { API_BASE_URL } from '../../lib/api';

interface Paper {
  title: string;
  authors?: string | string[];
  year?: number;
  venue?: string;
  source?: string;
  url?: string;
  pdf_url?: string;
  doi?: string;
  citations?: number;
  abstract?: string;
  keywords?: string;
  primary_area?: string;
  rank?: number;
  bm25_score?: number;
  combined_score?: number;
  novelty_score?: number;
  recency_score?: number;
  relevance_score?: number;
}

interface Summary {
  summary: {
    query: string;
    total_papers: number;
    unique_sources: number;
    year_range: {
      min: number;
      max: number;
    };
    citation_summary: {
      total: number;
      average: number;
    };
    top_source: string;
    papers_with_pdf: number;
    papers_with_doi: number;
  };
  insights: Array<{
    type: string;
    title: string;
    message: string;
    data: any;
  }>;
  key_findings: string[];
}

interface Stats {
  total_papers: number;
  sources: Record<string, number>;
  year_distribution: Record<string, number>;
  [key: string]: any;
}

interface Filters {
  yearRange: [number, number];
  sources: string[];
  minRelevance: number;
  minNovelty: number;
  minCitations: number;
  keywords: string[];
}

type SortOption = 'rank' | 'year-desc' | 'year-asc' | 'citations-desc' | 'citations-asc' | 'score-desc' | 'score-asc';

interface ResearchDashboardProps {
  timestamp: string;
  onBack: () => void;
}

const ResearchDashboard: React.FC<ResearchDashboardProps> = ({ timestamp, onBack }) => {

  // Data state
  const [papers, setPapers] = useState<Paper[]>([]);
  const [filteredPapers, setFilteredPapers] = useState<Paper[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter state
  const [filters, setFilters] = useState<Filters>({
    yearRange: [2015, 2026],
    sources: [],
    minRelevance: 0,
    minNovelty: 0,
    minCitations: 0,
    keywords: []
  });

  // UI state
  const [sortBy, setSortBy] = useState<SortOption>('rank');
  const [showFilters, setShowFilters] = useState(true);
  const [expandedPaper, setExpandedPaper] = useState<number | null>(null);
  const [searchText, setSearchText] = useState('');
  const [copiedPaper, setCopiedPaper] = useState<number | null>(null);
  const [headerExpanded, setHeaderExpanded] = useState(false);

  // Available options for filters
  const [availableSources, setAvailableSources] = useState<string[]>([]);
  const [availableKeywords, setAvailableKeywords] = useState<string[]>([]);
  const [yearBounds, setYearBounds] = useState<[number, number]>([2015, 2026]);
  const [baseUrl, setApiUrl] = useState(API_BASE_URL);
  // Load data on mount
  useEffect(() => {
    loadDashboardData();
  }, [timestamp]);

  // Apply filters and sorting when data or settings change
  useEffect(() => {
    applyFiltersAndSort();
  }, [papers, filters, sortBy, searchText]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      // const [baseUrl, setApiUrl] = useState(
      //   import.meta.env.VITE_PAPERFINDER_API_URL || 'http://localhost:8004'
      // );
      // Load all files in parallel
      const [papersRes, statsRes, summaryRes] = await Promise.all([
        fetch(`${baseUrl}/research/output/${timestamp}/papers.json`),
        fetch(`${baseUrl}/research/output/${timestamp}/stats.json`),
        fetch(`${baseUrl}/research/output/${timestamp}/summary.json`)
      ]);

      // Parse papers
      let papersData: Paper[] = [];
      if (papersRes.ok) {
        const data = await papersRes.json();
        papersData = Array.isArray(data) ? data : (data.papers || []);
        setPapers(papersData);
      }

      // Parse stats
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

      // Parse summary
      if (summaryRes.ok) {
        const summaryData = await summaryRes.json();
        setSummary(summaryData);
      }

      // Extract filter options from papers
      if (papersData.length > 0) {
        // Sources
        const sources = [...new Set(papersData.map(p => p.source).filter(Boolean))];
        setAvailableSources(sources as string[]);

        // Keywords
        const keywords = new Set<string>();
        papersData.forEach(p => {
          if (p.primary_area) keywords.add(p.primary_area);
          if (p.keywords && typeof p.keywords === 'string') {
            p.keywords.split(';').forEach(kw => keywords.add(kw.trim()));
          }
        });
        setAvailableKeywords([...keywords].slice(0, 50)); // Limit to 50 most common

        // Year bounds
        const years = papersData.map(p => p.year).filter(Boolean) as number[];
        if (years.length > 0) {
          const minYear = Math.min(...years);
          const maxYear = Math.max(...years);
          setYearBounds([minYear, maxYear]);
          setFilters(prev => ({ ...prev, yearRange: [minYear, maxYear] }));
        }
      }

      setLoading(false);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      setError(String(err));
      setLoading(false);
    }
  };

  const applyFiltersAndSort = () => {
    let filtered = [...papers];

    // Apply search text filter
    if (searchText.trim()) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(p => {
        const titleMatch = p.title?.toLowerCase().includes(searchLower);

        let authorMatch = false;
        if (typeof p.authors === 'string') {
          authorMatch = p.authors.toLowerCase().includes(searchLower);
        } else if (Array.isArray(p.authors)) {
          authorMatch = p.authors.some(a => String(a).toLowerCase().includes(searchLower));
        }

        const venueMatch = p.venue?.toLowerCase().includes(searchLower);
        return titleMatch || authorMatch || venueMatch;
      });
    }

    // Apply year filter
    filtered = filtered.filter(p => {
      if (!p.year) return true;
      return p.year >= filters.yearRange[0] && p.year <= filters.yearRange[1];
    });

    // Apply source filter
    if (filters.sources.length > 0) {
      filtered = filtered.filter(p => p.source && filters.sources.includes(p.source));
    }

    // Apply score filters
    filtered = filtered.filter(p => {
      const relevance = p.relevance_score || p.combined_score || 0;
      const novelty = p.novelty_score || 0;
      const citations = p.citations || 0;
      return relevance >= filters.minRelevance &&
        novelty >= filters.minNovelty &&
        citations >= filters.minCitations;
    });

    // Apply keyword filter
    if (filters.keywords.length > 0) {
      filtered = filtered.filter(p => {
        const paperKeywords = p.keywords ? p.keywords.split(';').map(k => k.trim()) : [];
        const paperAreas = p.primary_area ? [p.primary_area] : [];
        const allTags = [...paperKeywords, ...paperAreas];
        return filters.keywords.some(kw => allTags.includes(kw));
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rank':
          return (a.rank || 999) - (b.rank || 999);
        case 'year-desc':
          return (b.year || 0) - (a.year || 0);
        case 'year-asc':
          return (a.year || 0) - (b.year || 0);
        case 'citations-desc':
          return (b.citations || 0) - (a.citations || 0);
        case 'citations-asc':
          return (a.citations || 0) - (b.citations || 0);
        case 'score-desc':
          return (b.combined_score || 0) - (a.combined_score || 0);
        case 'score-asc':
          return (a.combined_score || 0) - (b.combined_score || 0);
        default:
          return 0;
      }
    });

    setFilteredPapers(filtered);
  };

  const downloadFile = async (filename: string) => {
    if (!timestamp) return;

    try {
      const url = `${baseUrl}/research/output/${timestamp}/${filename}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to download ${filename}`);

      const data = await res.json();
      const blob = new Blob([data.content], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    } catch (err) {
      console.error('Download error:', err);
      alert(`Failed to download ${filename}`);
    }
  };

  const toggleKeyword = (keyword: string) => {
    setFilters(prev => ({
      ...prev,
      keywords: prev.keywords.includes(keyword)
        ? prev.keywords.filter(k => k !== keyword)
        : [...prev.keywords, keyword]
    }));
  };

  const toggleSource = (source: string) => {
    setFilters(prev => ({
      ...prev,
      sources: prev.sources.includes(source)
        ? prev.sources.filter(s => s !== source)
        : [...prev.sources, source]
    }));
  };

  const resetFilters = () => {
    setFilters({
      yearRange: yearBounds,
      sources: [],
      minRelevance: 0,
      minNovelty: 0,
      minCitations: 0,
      keywords: []
    });
    setSearchText('');
  };

  // Calculate active filter count
  const getActiveFilterCount = () => {
    let count = 0;
    if (searchText.trim()) count++;
    if (filters.yearRange[0] !== yearBounds[0] || filters.yearRange[1] !== yearBounds[1]) count++;
    if (filters.sources.length > 0) count++;
    if (filters.minRelevance > 0) count++;
    if (filters.minNovelty > 0) count++;
    if (filters.minCitations > 0) count++;
    if (filters.keywords.length > 0) count++;
    return count;
  };

  // Copy citation to clipboard
  const copyCitation = async (paper: Paper, idx: number) => {
    const authors = paper.authors || 'Unknown';
    const year = paper.year || 'n.d.';
    const title = paper.title || 'Untitled';
    const venue = paper.venue || '';

    const citation = `${authors}. (${year}). ${title}${venue ? '. ' + venue : ''}.${paper.url ? ' ' + paper.url : ''}`;

    try {
      await navigator.clipboard.writeText(citation);
      setCopiedPaper(idx);
      setTimeout(() => setCopiedPaper(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading research dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center max-w-md">
          <div className="text-red-500 mb-4">Error loading dashboard</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to Papers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-gray-900">Research Dashboard</h1>
                  <button
                    onClick={() => setHeaderExpanded(!headerExpanded)}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                    title={headerExpanded ? "Collapse details" : "Expand details"}
                  >
                    {headerExpanded ? (
                      <ChevronUp className="w-4 h-4 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-600" />
                    )}
                  </button>
                </div>
                {summary && summary.summary && (
                  <p className="text-xs text-gray-600 mt-0.5">
                    "{summary.summary.query}" • {filteredPapers.length} of {papers.length} papers
                  </p>
                )}
              </div>
            </div>

            {/* Download Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => window.open(`${baseUrl}/research/output/${timestamp}/dashboard.html`, '_blank')}
                className="px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md flex items-center gap-2 text-sm font-medium"
              >
                <BarChart3 className="w-4 h-4" />
                HTML
              </button>
              <button
                onClick={() => downloadFile('papers.json')}
                className="px-2 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-xs font-medium flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                JSON
              </button>
              <button
                onClick={() => downloadFile('papers.csv')}
                className="px-2 py-1.5 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-xs font-medium flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                CSV
              </button>
              <button
                onClick={() => downloadFile('papers.bib')}
                className="px-2 py-1.5 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-xs font-medium flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                BibTeX
              </button>
              <button
                onClick={() => downloadFile('papers.md')}
                className="px-2 py-1.5 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors text-xs font-medium flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                MD
              </button>
            </div>
          </div>

          {/* Summary Stats */}
          {headerExpanded && summary && summary.summary && (
            <>
              <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-blue-700 mb-1">
                    <BookOpen className="w-4 h-4" />
                    <span className="text-xs font-medium">Total Papers</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-900">{summary.summary.total_papers}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-purple-700 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs font-medium">Year Range</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-900">
                    {summary.summary.year_range.min}-{summary.summary.year_range.max}
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-green-700 mb-1">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-xs font-medium">Avg Citations</span>
                  </div>
                  <p className="text-2xl font-bold text-green-900">
                    {summary.summary.citation_summary.average.toFixed(1)}
                  </p>
                </div>
                <div className="bg-orange-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-orange-700 mb-1">
                    <FileText className="w-4 h-4" />
                    <span className="text-xs font-medium">With PDF</span>
                  </div>
                  <p className="text-2xl font-bold text-orange-900">
                    {summary.summary.papers_with_pdf}
                  </p>
                </div>
              </div>

              {summary.insights && summary.insights.length > 0 && (
                <div className="mt-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200 p-3">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    <h3 className="font-semibold text-gray-900">Key Insights</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {summary.insights.slice(0, 6).map((insight, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-3 border border-purple-100">
                        <div className="flex items-start gap-2">
                          {insight.type === 'citation' && <Award className="w-4 h-4 text-yellow-600 mt-0.5" />}
                          {insight.type === 'author' && <Users className="w-4 h-4 text-blue-600 mt-0.5" />}
                          {insight.type === 'trend' && <TrendingUp className="w-4 h-4 text-green-600 mt-0.5" />}
                          {insight.type === 'source' && <BookOpen className="w-4 h-4 text-purple-600 mt-0.5" />}
                          {insight.type === 'keywords' && <Tag className="w-4 h-4 text-indigo-600 mt-0.5" />}
                          {insight.type === 'availability' && <FileText className="w-4 h-4 text-orange-600 mt-0.5" />}
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-gray-700 mb-1">{String(insight.title || '')}</p>
                            <p className="text-xs text-gray-600">{String(insight.message || '')}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Filter Sidebar */}
          {showFilters && (
            <div className="w-80 flex-shrink-0">
              <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filters
                  </h3>
                  <button
                    onClick={resetFilters}
                    className="text-xs text-blue-600 hover:text-blue-700"
                  >
                    Reset
                  </button>
                </div>

                {/* Year Range */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year Range
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={yearBounds[0]}
                      max={yearBounds[1]}
                      value={filters.yearRange[0]}
                      onChange={e => setFilters(prev => ({
                        ...prev,
                        yearRange: [parseInt(e.target.value) || yearBounds[0], prev.yearRange[1]]
                      }))}
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                      type="number"
                      min={yearBounds[0]}
                      max={yearBounds[1]}
                      value={filters.yearRange[1]}
                      onChange={e => setFilters(prev => ({
                        ...prev,
                        yearRange: [prev.yearRange[0], parseInt(e.target.value) || yearBounds[1]]
                      }))}
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>

                {/* Sources */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sources
                  </label>
                  <div className="space-y-1 max-h-40 overflow-y-auto">
                    {availableSources.map(source => (
                      <label key={source} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-50 p-1 rounded">
                        <input
                          type="checkbox"
                          checked={filters.sources.includes(source)}
                          onChange={() => toggleSource(source)}
                          className="rounded text-blue-600"
                        />
                        <span className="text-gray-700">{source}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Score Thresholds */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Min Relevance Score
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={filters.minRelevance}
                    onChange={e => setFilters(prev => ({ ...prev, minRelevance: parseFloat(e.target.value) }))}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-600 mt-1">{filters.minRelevance.toFixed(1)}</div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Min Novelty Score
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={filters.minNovelty}
                    onChange={e => setFilters(prev => ({ ...prev, minNovelty: parseFloat(e.target.value) }))}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-600 mt-1">{filters.minNovelty.toFixed(1)}</div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Min Citations
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={filters.minCitations}
                    onChange={e => setFilters(prev => ({ ...prev, minCitations: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                </div>

                {/* Keywords */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Keywords & Topics ({filters.keywords.length} selected)
                  </label>
                  <div className="max-h-60 overflow-y-auto space-y-1">
                    {availableKeywords.slice(0, 30).map(keyword => (
                      <label key={keyword} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-50 p-1 rounded">
                        <input
                          type="checkbox"
                          checked={filters.keywords.includes(keyword)}
                          onChange={() => toggleKeyword(keyword)}
                          className="rounded text-blue-600"
                        />
                        <span className="text-gray-700 truncate">{keyword}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
              <div className="flex items-center justify-between gap-4 mb-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  {showFilters ? 'Hide' : 'Show'} Filters
                  {getActiveFilterCount() > 0 && (
                    <span className="px-2 py-0.5 bg-blue-500 text-white rounded-full text-xs">
                      {getActiveFilterCount()}
                    </span>
                  )}
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value as SortOption)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="rank">Rank (Best First)</option>
                    <option value="year-desc">Year (Newest)</option>
                    <option value="year-asc">Year (Oldest)</option>
                    <option value="citations-desc">Citations (High to Low)</option>
                    <option value="citations-asc">Citations (Low to High)</option>
                    <option value="score-desc">Score (High to Low)</option>
                    <option value="score-asc">Score (Low to High)</option>
                  </select>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by title, author, or venue..."
                  value={searchText}
                  onChange={e => setSearchText(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {searchText && (
                  <button
                    onClick={() => setSearchText('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Papers Grid */}
            {filteredPapers.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-900 font-medium mb-2">No papers match your current filters</p>
                <p className="text-sm text-gray-600 mb-4">
                  {getActiveFilterCount() > 0
                    ? `You have ${getActiveFilterCount()} active filter${getActiveFilterCount() > 1 ? 's' : ''}. Try adjusting your criteria.`
                    : 'No papers found in this research session.'}
                </p>
                {getActiveFilterCount() > 0 && (
                  <button
                    onClick={resetFilters}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Reset All Filters
                  </button>
                )}
              </div>
            ) : (
              <>
                {/* Results count */}
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Showing <span className="font-semibold text-gray-900">{filteredPapers.length}</span> of <span className="font-semibold text-gray-900">{papers.length}</span> papers
                    {getActiveFilterCount() > 0 && (
                      <span className="ml-2 text-blue-600">
                        ({getActiveFilterCount()} filter{getActiveFilterCount() > 1 ? 's' : ''} active)
                      </span>
                    )}
                  </p>
                  {getActiveFilterCount() > 0 && (
                    <button
                      onClick={resetFilters}
                      className="text-sm text-blue-600 hover:text-blue-700 underline"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>

                {/* Papers List */}
                <div className="space-y-4">
                  {filteredPapers.map((paper, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow"
                    >
                      {/* Paper Header */}
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1">
                          {paper.rank && (
                            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded mb-2">
                              #{paper.rank}
                            </span>
                          )}
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {paper.url ? (
                              <a
                                href={paper.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-600 flex items-center gap-2"
                              >
                                {String(paper.title || 'Untitled')}
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            ) : (
                              String(paper.title || 'Untitled')
                            )}
                          </h3>
                          {paper.authors && (
                            <p className="text-sm text-gray-600 mb-1">
                              {String(paper.authors)}
                            </p>
                          )}
                          <div className="flex items-center gap-3 text-sm text-gray-500">
                            {paper.year && <span>{paper.year}</span>}
                            {paper.venue && <span>• {String(paper.venue)}</span>}
                            {paper.source && (
                              <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                                {String(paper.source)}
                              </span>
                            )}
                            {paper.citations !== undefined && paper.citations > 0 && (
                              <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">
                                {paper.citations} citations
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => copyCitation(paper, idx)}
                            className="p-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
                            title="Copy citation"
                          >
                            {copiedPaper === idx ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                          {paper.pdf_url && (
                            <a
                              href={paper.pdf_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                              title="Open PDF"
                            >
                              <FileText className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Scores */}
                      {(paper.combined_score || paper.bm25_score || paper.novelty_score || paper.recency_score) && (
                        <div className="flex gap-2 flex-wrap mb-3">
                          {paper.combined_score && (
                            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
                              Combined: {paper.combined_score.toFixed(3)}
                            </span>
                          )}
                          {paper.bm25_score && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                              BM25: {paper.bm25_score.toFixed(3)}
                            </span>
                          )}
                          {paper.novelty_score && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                              Novelty: {paper.novelty_score.toFixed(3)}
                            </span>
                          )}
                          {paper.recency_score && (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full font-medium">
                              Recency: {paper.recency_score.toFixed(3)}
                            </span>
                          )}
                          {paper.relevance_score && (
                            <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full font-medium">
                              Relevance: {paper.relevance_score.toFixed(3)}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Keywords & Area */}
                      {(paper.keywords || paper.primary_area) && (
                        <div className="flex gap-2 flex-wrap mb-3">
                          {paper.primary_area && (
                            <span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded font-medium flex items-center gap-1">
                              <Tag className="w-3 h-3" />
                              {String(paper.primary_area)}
                            </span>
                          )}
                          {paper.keywords && typeof paper.keywords === 'string' && (
                            paper.keywords.split(';').slice(0, 5).map((kw, i) => (
                              <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                {kw.trim()}
                              </span>
                            ))
                          )}
                        </div>
                      )}

                      {/* Abstract (Collapsible) */}
                      {paper.abstract && (
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <button
                            onClick={() => setExpandedPaper(expandedPaper === idx ? null : idx)}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                          >
                            {expandedPaper === idx ? 'Hide' : 'Show'} Abstract
                          </button>
                          {expandedPaper === idx && (
                            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                              {String(paper.abstract)}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchDashboard;

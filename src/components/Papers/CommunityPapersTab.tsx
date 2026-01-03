import { useState, useEffect } from 'react';
import {
  Search, Filter, Globe, Users, Heart, MessageCircle, Eye,
  Bookmark, ExternalLink, Share2, Plus, ChevronLeft, ChevronRight,
  RefreshCw, X, Star, Calendar, Building2, Tag, Code
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCommunity } from '../../contexts/CommunityContext';
import { usePaperEngagement } from '../../hooks/usePaperEngagement';
import type {
  CommunityPaper,
  CommunityFilters,
  CommunityFilterOptions,
  CommunityPapersPaginatedResponse
} from '../../lib/database.types';

interface CommunityPapersTabProps {
  onSelectPaper: (paperId: string) => void;
}

const COMMUNITY_API_URL = import.meta.env.VITE_COMMUNITY_API_URL || 'http://localhost:8002';

// Individual paper card component
function CommunityPaperCard({
  paper,
  onSelect,
  onAddToCircle,
  onShare
}: {
  paper: CommunityPaper;
  onSelect: (id: string) => void;
  onAddToCircle: (paper: CommunityPaper) => void;
  onShare: (paper: CommunityPaper) => void;
}) {
  const { stats, userEngagement, toggleLike, toggleSave, recordView } = usePaperEngagement(paper.paper_id);

  useEffect(() => {
    recordView();
  }, []);

  const formatAuthors = (authors: string[]) => {
    if (!authors || authors.length === 0) return 'Unknown authors';
    if (authors.length === 1) return authors[0];
    if (authors.length === 2) return `${authors[0]} and ${authors[1]}`;
    return `${authors[0]} et al.`;
  };

  const getSourceBadgeColor = (source: string) => {
    switch (source) {
      case 'conference_db': return 'bg-purple-100 text-purple-800';
      case 'research_run': return 'bg-blue-100 text-blue-800';
      case 'ai_discovery': return 'bg-green-100 text-green-800';
      case 'arxiv': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadgeColor = (status: string | null) => {
    if (!status) return '';
    const lower = status.toLowerCase();
    if (lower.includes('accept') || lower === 'poster' || lower === 'spotlight' || lower === 'oral') {
      return 'bg-green-100 text-green-800';
    }
    if (lower.includes('withdraw')) return 'bg-yellow-100 text-yellow-800';
    if (lower.includes('reject')) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-shadow">
      {/* Header: Source, Conference, Year */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className={`px-2 py-0.5 text-xs font-medium rounded ${getSourceBadgeColor(paper.source)}`}>
          {paper.source === 'conference_db' ? 'Conference' :
           paper.source === 'research_run' ? 'Research Run' :
           paper.source === 'ai_discovery' ? 'AI Discovery' : 'arXiv'}
        </span>
        {paper.conference && (
          <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 text-xs font-medium rounded">
            {paper.conference} {paper.year}
          </span>
        )}
        {!paper.conference && paper.year && (
          <span className="text-sm text-gray-500 flex items-center gap-1">
            <Calendar className="h-3 w-3" /> {paper.year}
          </span>
        )}
        {paper.track && (
          <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
            {paper.track}
          </span>
        )}
        {paper.paper_status && (
          <span className={`px-2 py-0.5 text-xs font-medium rounded ${getStatusBadgeColor(paper.paper_status)}`}>
            {paper.paper_status}
          </span>
        )}
      </div>

      {/* Title */}
      <h3
        className="text-lg font-semibold text-gray-900 mb-2 cursor-pointer hover:text-blue-600 line-clamp-2"
        onClick={() => onSelect(paper.paper_id)}
      >
        {paper.title}
      </h3>

      {/* Authors */}
      <p className="text-sm text-gray-600 mb-2">
        {formatAuthors(paper.authors)}
      </p>

      {/* Rating and Scores */}
      {(paper.rating_avg || paper.combined_score) && (
        <div className="flex items-center gap-3 mb-2">
          {paper.rating_avg && (
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="font-medium">{paper.rating_avg.toFixed(1)}</span>
              <span className="text-gray-500">/10</span>
            </div>
          )}
          {paper.combined_score && (
            <span className="text-sm text-gray-500">
              Score: {paper.combined_score.toFixed(2)}
            </span>
          )}
        </div>
      )}

      {/* TLDR or Abstract */}
      {paper.tldr ? (
        <p className="text-sm text-gray-700 mb-3 line-clamp-2 italic">
          TL;DR: {paper.tldr}
        </p>
      ) : paper.abstract && (
        <p className="text-sm text-gray-700 mb-3 line-clamp-2">
          {paper.abstract}
        </p>
      )}

      {/* Keywords */}
      {paper.keywords && paper.keywords.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {paper.keywords.slice(0, 5).map((kw, idx) => (
            <span key={idx} className="px-2 py-0.5 bg-gray-50 text-gray-600 text-xs rounded">
              {kw}
            </span>
          ))}
          {paper.keywords.length > 5 && (
            <span className="text-xs text-gray-500">+{paper.keywords.length - 5} more</span>
          )}
        </div>
      )}

      {/* Engagement Stats */}
      <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
        <button
          onClick={toggleLike}
          className={`flex items-center gap-1 hover:text-red-600 transition-colors ${
            userEngagement.hasLiked ? 'text-red-600' : ''
          }`}
        >
          <Heart className={`h-4 w-4 ${userEngagement.hasLiked ? 'fill-current' : ''}`} />
          <span>{stats.likes}</span>
        </button>

        <div className="flex items-center gap-1">
          <MessageCircle className="h-4 w-4" />
          <span>{stats.discussions}</span>
        </div>

        <div className="flex items-center gap-1">
          <Eye className="h-4 w-4" />
          <span>{stats.views}</span>
        </div>

        <button
          onClick={toggleSave}
          className={`flex items-center gap-1 hover:text-blue-600 transition-colors ${
            userEngagement.hasSaved ? 'text-blue-600' : ''
          }`}
        >
          <Bookmark className={`h-4 w-4 ${userEngagement.hasSaved ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-wrap">
        {paper.pdf_url && (
          <a
            href={paper.pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <ExternalLink className="h-3 w-3" />
            View Paper
          </a>
        )}

        {paper.github_url && (
          <a
            href={paper.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Code className="h-3 w-3" />
            Code
          </a>
        )}

        <button
          onClick={() => onAddToCircle(paper)}
          className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
        >
          <Plus className="h-3 w-3" />
          Add to Circle
        </button>

        <button
          onClick={() => onShare(paper)}
          className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
        >
          <Share2 className="h-3 w-3" />
          Share
        </button>
      </div>
    </div>
  );
}

export function CommunityPapersTab({ onSelectPaper }: CommunityPapersTabProps) {
  const { user } = useAuth();
  const { userCommunities } = useCommunity();

  const [papers, setPapers] = useState<CommunityPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState<CommunityFilters>({
    year: null,
    venue: null,
    source: null,
    track: null,
    status: null,
    primaryArea: null,
    minRating: null,
    keywords: '',
    sortBy: 'imported_at'
  });

  const [filterOptions, setFilterOptions] = useState<CommunityFilterOptions>({
    years: [],
    conferences: [],
    sources: [],
    tracks: [],
    statuses: [],
    primaryAreas: []
  });

  // Add to circle modal state
  const [showAddToCircle, setShowAddToCircle] = useState(false);
  const [selectedPaperForCircle, setSelectedPaperForCircle] = useState<CommunityPaper | null>(null);
  const [selectedCircle, setSelectedCircle] = useState('');
  const [addingToCircle, setAddingToCircle] = useState(false);

  // Share modal state
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedPaperForShare, setSelectedPaperForShare] = useState<CommunityPaper | null>(null);
  const [shareUrl, setShareUrl] = useState('');
  const [copying, setCopying] = useState(false);

  // Sync state
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');

  // Load filter options on mount
  useEffect(() => {
    loadFilterOptions();
  }, []);

  // Load papers when filters or page change
  useEffect(() => {
    loadPapers();
  }, [page, filters]);

  const loadFilterOptions = async () => {
    try {
      const response = await fetch(`${COMMUNITY_API_URL}/community/filters`);
      if (response.ok) {
        const data = await response.json();
        setFilterOptions(data);
      }
    } catch (err) {
      console.error('Error loading filter options:', err);
    }
  };

  const handleSync = async () => {
    setSyncing(true);
    setSyncMessage('');

    try {
      const apiUrl = import.meta.env.VITE_COMMUNITY_PAPERS_API_URL || 'http://localhost:8003';
      const response = await fetch(`${apiUrl}/sync/trigger`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source_type: 'full' })
      });

      const data = await response.json();

      if (response.ok) {
        setSyncMessage(`✅ Sync started! Run ID: ${data.run_id}`);
        // Reload papers after 5 seconds
        setTimeout(() => {
          loadPapers();
          setSyncMessage('');
        }, 5000);
      } else {
        setSyncMessage('❌ Sync failed. Check console.');
      }
    } catch (error) {
      console.error('Sync error:', error);
      setSyncMessage('❌ Sync failed. Is the API running on port 8003?');
    } finally {
      setSyncing(false);
    }
  };

  const loadPapers = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        sort_by: filters.sortBy
      });

      if (filters.year) params.append('year', filters.year.toString());
      if (filters.venue) params.append('conference', filters.venue);
      if (filters.source) params.append('source', filters.source);
      if (filters.track) params.append('track', filters.track);
      if (filters.status) params.append('status', filters.status);
      if (filters.primaryArea) params.append('primary_area', filters.primaryArea);
      if (filters.minRating) params.append('min_rating', filters.minRating.toString());
      if (filters.keywords) params.append('keywords', filters.keywords);

      const response = await fetch(`${COMMUNITY_API_URL}/community/papers?${params}`);

      if (!response.ok) {
        throw new Error('Failed to load community papers');
      }

      const data: CommunityPapersPaginatedResponse = await response.json();
      setPapers(data.papers);
      setTotal(data.total);
      setTotalPages(data.total_pages);
    } catch (err) {
      console.error('Error loading papers:', err);
      setError('Failed to load community papers. Make sure the API is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCircle = (paper: CommunityPaper) => {
    setSelectedPaperForCircle(paper);
    setShowAddToCircle(true);
  };

  const confirmAddToCircle = async () => {
    if (!selectedPaperForCircle || !selectedCircle) return;

    setAddingToCircle(true);
    try {
      const response = await fetch(
        `${COMMUNITY_API_URL}/community/papers/${selectedPaperForCircle.paper_id}/add-to-circle?circle_id=${selectedCircle}&user_id=${user?.id}`,
        { method: 'POST' }
      );

      if (response.ok) {
        alert('Paper added to circle!');
        setShowAddToCircle(false);
        setSelectedPaperForCircle(null);
        setSelectedCircle('');
      }
    } catch (err) {
      console.error('Error adding to circle:', err);
      alert('Failed to add paper to circle');
    } finally {
      setAddingToCircle(false);
    }
  };

  const handleShare = async (paper: CommunityPaper) => {
    setSelectedPaperForShare(paper);
    setShowShareModal(true);

    try {
      const response = await fetch(
        `${COMMUNITY_API_URL}/community/papers/${paper.paper_id}/share`,
        { method: 'POST' }
      );

      if (response.ok) {
        const data = await response.json();
        const fullUrl = `${window.location.origin}${data.share_url}`;
        setShareUrl(fullUrl);
      }
    } catch (err) {
      console.error('Error generating share link:', err);
      // Fallback to paper ID based URL
      setShareUrl(`${window.location.origin}/paper/${paper.paper_id}`);
    }
  };

  const copyShareUrl = async () => {
    setCopying(true);
    try {
      await navigator.clipboard.writeText(shareUrl);
      setTimeout(() => setCopying(false), 2000);
    } catch {
      setCopying(false);
    }
  };

  const clearFilters = () => {
    setFilters({
      year: null,
      venue: null,
      source: null,
      track: null,
      status: null,
      primaryArea: null,
      minRating: null,
      keywords: '',
      sortBy: 'imported_at'
    });
    setPage(1);
  };

  const activeFilterCount = [
    filters.year,
    filters.venue,
    filters.source,
    filters.track,
    filters.status,
    filters.primaryArea,
    filters.minRating,
    filters.keywords
  ].filter(Boolean).length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-green-600" />
            <div>
              <h3 className="font-medium text-green-900">Community Papers</h3>
              <p className="text-sm text-green-700">
                {total.toLocaleString()} papers from conferences, research runs, and discoveries
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSync}
              disabled={syncing}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 flex items-center gap-2 transition-colors"
            >
              {syncing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Syncing...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" />
                  Sync Papers
                </>
              )}
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                showFilters ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              <Filter className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="px-1.5 py-0.5 bg-green-700 text-white text-xs rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Sync Message */}
        {syncMessage && (
          <div className={`mt-3 text-sm ${syncMessage.includes('✅') ? 'text-green-700' : 'text-red-700'}`}>
            {syncMessage}
          </div>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900">Filter Papers</h4>
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Clear all
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Year */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <select
                value={filters.year || ''}
                onChange={(e) => setFilters({ ...filters, year: e.target.value ? parseInt(e.target.value) : null })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">All Years</option>
                {filterOptions.years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {/* Conference */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Conference</label>
              <select
                value={filters.venue || ''}
                onChange={(e) => setFilters({ ...filters, venue: e.target.value || null })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">All Conferences</option>
                {filterOptions.conferences.map(conf => (
                  <option key={conf} value={conf}>{conf}</option>
                ))}
              </select>
            </div>

            {/* Source */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
              <select
                value={filters.source || ''}
                onChange={(e) => setFilters({ ...filters, source: e.target.value as any || null })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">All Sources</option>
                <option value="conference_db">Conference Database</option>
                <option value="research_run">Research Runs</option>
                <option value="ai_discovery">AI Discovery</option>
                <option value="arxiv">arXiv</option>
              </select>
            </div>

            {/* Track */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Track</label>
              <select
                value={filters.track || ''}
                onChange={(e) => setFilters({ ...filters, track: e.target.value || null })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">All Tracks</option>
                {filterOptions.tracks.map(track => (
                  <option key={track} value={track}>{track}</option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={filters.status || ''}
                onChange={(e) => setFilters({ ...filters, status: e.target.value || null })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">All Statuses</option>
                {filterOptions.statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="imported_at">Recently Added</option>
                <option value="recency">Most Recent (Year)</option>
                <option value="rating">Highest Rated</option>
                <option value="likes">Most Liked</option>
                <option value="views">Most Viewed</option>
                <option value="combined_score">Best Match Score</option>
              </select>
            </div>

            {/* Keywords Search */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Keywords</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={filters.keywords}
                  onChange={(e) => setFilters({ ...filters, keywords: e.target.value })}
                  placeholder="Search in title, abstract, keywords..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <p className="mt-2 text-gray-600">Loading community papers...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-red-700">{error}</p>
          <button
            onClick={loadPapers}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && papers.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 mb-2">No community papers found.</p>
          <p className="text-sm text-gray-500">
            {activeFilterCount > 0
              ? 'Try adjusting your filters or clear them to see all papers.'
              : 'Papers will appear here once the sync job imports them.'}
          </p>
        </div>
      )}

      {/* Papers Grid */}
      {!loading && !error && papers.length > 0 && (
        <>
          <div className="grid gap-4">
            {papers.map(paper => (
              <CommunityPaperCard
                key={paper.id}
                paper={paper}
                onSelect={onSelectPaper}
                onAddToCircle={handleAddToCircle}
                onShare={handleShare}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 pt-4">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </>
      )}

      {/* Add to Circle Modal */}
      {showAddToCircle && selectedPaperForCircle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add to Circle</h3>
              <button
                onClick={() => setShowAddToCircle(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {selectedPaperForCircle.title}
            </p>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Circle
              </label>
              <select
                value={selectedCircle}
                onChange={(e) => setSelectedCircle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Choose a circle...</option>
                {userCommunities.map(community => (
                  <option key={community.id} value={community.id}>
                    {community.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowAddToCircle(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmAddToCircle}
                disabled={!selectedCircle || addingToCircle}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
              >
                {addingToCircle ? 'Adding...' : 'Add to Circle'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && selectedPaperForShare && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Share Paper</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {selectedPaperForShare.title}
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Share Link
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                />
                <button
                  onClick={copyShareUrl}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    copying
                      ? 'bg-green-600 text-white'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {copying ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowShareModal(false)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

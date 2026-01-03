import { useState, useEffect } from 'react';
import {
  Search, Filter, Globe, Users, Heart, MessageCircle, Eye,
  Bookmark, ExternalLink, Share2, Plus, ChevronLeft, ChevronRight,
  RefreshCw, X, Star, Calendar, Building2, Tag, Code, BookOpen
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
  const { user } = useAuth();
  const { stats, userEngagement, toggleLike, toggleSave, recordView } = usePaperEngagement(paper.paper_id);

  // Comment state
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [postingComment, setPostingComment] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);

  // Expanded abstract state
  const [showFullAbstract, setShowFullAbstract] = useState(false);

  useEffect(() => {
    recordView();
  }, []);

  // Load comments when expanded
  useEffect(() => {
    if (showComments && comments.length === 0) {
      loadComments();
    }
  }, [showComments]);

  const loadComments = async () => {
    setLoadingComments(true);
    try {
      const { supabase } = await import('../../lib/supabase');
      const { data, error } = await supabase
        .from('paper_discussions')
        .select(`
          id,
          content,
          created_at,
          user_id,
          profiles:user_id (
            full_name,
            avatar_url
          )
        `)
        .eq('paper_id', paper.paper_id)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setComments(data);
      }
    } catch (error) {
      console.error('Error loading comments:', error);
    } finally {
      setLoadingComments(false);
    }
  };

  const postComment = async () => {
    if (!user) {
      alert('Please sign in to comment');
      return;
    }

    if (!newComment.trim()) return;

    setPostingComment(true);
    try {
      const { supabase } = await import('../../lib/supabase');
      const { data, error } = await supabase
        .from('paper_discussions')
        .insert({
          paper_id: paper.paper_id,
          user_id: user.id,
          content: newComment.trim(),
        })
        .select(`
          id,
          content,
          created_at,
          user_id,
          profiles:user_id (
            full_name,
            avatar_url
          )
        `)
        .single();

      if (!error && data) {
        setComments([data, ...comments]);
        setNewComment('');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
      alert('Failed to post comment');
    } finally {
      setPostingComment(false);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  // State for showing all authors
  const [showAllAuthors, setShowAllAuthors] = useState(false);

  const formatAuthors = (authors: string[], showAll: boolean = false) => {
    if (!authors || authors.length === 0) return 'Unknown authors';

    if (showAll || authors.length <= 3) {
      return authors.join(', ');
    }

    return `${authors.slice(0, 3).join(', ')}`;
  };

  const getPublicationType = () => {
    if (paper.conference) return 'Conference';
    if (paper.venue?.toLowerCase().includes('arxiv')) return 'Preprint';
    if (paper.venue?.toLowerCase().includes('journal')) return 'Journal';
    if (paper.source === 'arxiv') return 'Preprint';
    if (paper.source === 'conference_db') return 'Conference';
    return 'Paper';
  };

  const getVenueName = () => {
    if (paper.conference && paper.year) {
      return `${paper.conference} ${paper.year}`;
    }
    if (paper.venue) {
      return paper.venue;
    }
    if (paper.source === 'arxiv') {
      return `arXiv ${paper.year || ''}`.trim();
    }
    return 'Unknown Venue';
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
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all mb-4">
      <div className="p-6">
        {/* Title */}
        <h2
          className="text-xl font-bold text-gray-900 mb-3 cursor-pointer hover:text-blue-600 transition-colors leading-tight"
          onClick={() => onSelect(paper.paper_id)}
        >
          {paper.title}
        </h2>

        {/* Unified Metadata Bar */}
        <div className="flex items-center flex-wrap gap-3 mb-4 pb-4 border-b border-gray-100">
          {/* Authors */}
          <div className="flex items-start gap-2 flex-1 min-w-0">
            <Users className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-700">
                {formatAuthors(paper.authors, showAllAuthors)}
                {!showAllAuthors && paper.authors && paper.authors.length > 3 && (
                  <>
                    {' '}
                    <button
                      onClick={() => setShowAllAuthors(true)}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      +{paper.authors.length - 3} more
                    </button>
                  </>
                )}
                {showAllAuthors && paper.authors && paper.authors.length > 3 && (
                  <>
                    {' '}
                    <button
                      onClick={() => setShowAllAuthors(false)}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Show less
                    </button>
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Year */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-lg border border-blue-200">
            <Calendar className="h-3.5 w-3.5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-900">
              {paper.year || 'N/A'}
            </span>
          </div>

          {/* Publication Type */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 rounded-lg border border-purple-200">
            <Building2 className="h-3.5 w-3.5 text-purple-600" />
            <span className="text-sm font-semibold text-purple-900">
              {getPublicationType()}
            </span>
          </div>
        </div>

        {/* Venue Information */}
        <div className="mb-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium text-gray-700">Published in:</span>
            <span className="text-gray-900 font-semibold">{getVenueName()}</span>
            {paper.track && (
              <>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">{paper.track}</span>
              </>
            )}
            {paper.paper_status && (
              <>
                <span className="text-gray-400">•</span>
                <span className={`px-2 py-0.5 text-xs font-semibold rounded ${getStatusBadgeColor(paper.paper_status)}`}>
                  {paper.paper_status}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Rating and Scores */}
        {(paper.rating_avg || paper.combined_score) && (
          <div className="flex items-center gap-4 mb-4">
            {paper.rating_avg && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-50 rounded-lg border border-yellow-200">
                <Star className="h-4 w-4 text-yellow-600 fill-yellow-500" />
                <span className="font-bold text-yellow-900">{paper.rating_avg.toFixed(1)}</span>
                <span className="text-xs text-yellow-700">/10</span>
              </div>
            )}
            {paper.combined_score && (
              <div className="px-3 py-1.5 bg-green-50 text-green-700 text-sm font-semibold rounded-lg border border-green-200">
                Match Score: {paper.combined_score.toFixed(2)}
              </div>
            )}
          </div>
        )}

        {/* TLDR or Abstract */}
        <div className="mb-4">
          {paper.tldr ? (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-sm font-medium text-gray-700 mb-1">💡 TL;DR</p>
              <p className="text-sm text-gray-800 leading-relaxed">{paper.tldr}</p>
            </div>
          ) : paper.abstract && (
            <div className="text-sm text-gray-700 leading-relaxed">
              <p className={showFullAbstract ? '' : 'line-clamp-3'}>
                {paper.abstract}
              </p>
              {paper.abstract.length > 200 && (
                <button
                  onClick={() => setShowFullAbstract(!showFullAbstract)}
                  className="text-blue-600 hover:text-blue-700 font-medium mt-2 text-xs"
                >
                  {showFullAbstract ? 'Show less' : 'Read more'}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Keywords */}
        {paper.keywords && paper.keywords.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {paper.keywords.slice(0, 6).map((kw, idx) => (
              <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full hover:bg-gray-200 transition-colors">
                #{kw}
              </span>
            ))}
            {paper.keywords.length > 6 && (
              <span className="px-3 py-1 text-xs text-gray-500 font-medium">
                +{paper.keywords.length - 6} more
              </span>
            )}
          </div>
        )}

        {/* Engagement Actions Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-6">
            <button
              onClick={toggleLike}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 transition-all ${
                userEngagement.hasLiked ? 'text-red-600 bg-red-50' : 'text-gray-600'
              }`}
            >
              <Heart className={`h-5 w-5 ${userEngagement.hasLiked ? 'fill-current' : ''}`} />
              <span className="font-semibold">{stats.likes}</span>
            </button>

            <button
              onClick={() => setShowComments(!showComments)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-50 transition-all ${
                showComments ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
              }`}
            >
              <MessageCircle className={`h-5 w-5 ${showComments ? 'fill-current' : ''}`} />
              <span className="font-semibold">{stats.discussions}</span>
            </button>

            <div className="flex items-center gap-2 px-3 py-2 text-gray-500">
              <Eye className="h-5 w-5" />
              <span className="font-semibold">{stats.views}</span>
            </div>

            <button
              onClick={toggleSave}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-50 transition-all ${
                userEngagement.hasSaved ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
              }`}
            >
              <Bookmark className={`h-5 w-5 ${userEngagement.hasSaved ? 'fill-current' : ''}`} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onShare(paper)}
              className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
              title="Share"
            >
              <Share2 className="h-5 w-5" />
            </button>
            <button
              onClick={() => onAddToCircle(paper)}
              className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
              title="Add to Circle"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Quick Action Links */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
          {paper.pdf_url && (
            <a
              href={paper.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Read Paper
            </a>
          )}
          {paper.github_url && (
            <a
              href={paper.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
            >
              <Code className="h-4 w-4" />
              Code
            </a>
          )}
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-gray-200 bg-gray-50 p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Comments ({comments.length})</h4>

          {/* Comment Input */}
          <div className="mb-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={user ? "Share your thoughts..." : "Sign in to comment"}
              disabled={!user}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={postComment}
                disabled={!newComment.trim() || postingComment || !user}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
              >
                {postingComment ? 'Posting...' : 'Post Comment'}
              </button>
            </div>
          </div>

          {/* Comments List */}
          {loadingComments ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-sm text-gray-600">Loading comments...</p>
            </div>
          ) : comments.length > 0 ? (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                      {comment.profiles?.full_name?.[0] || 'U'}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-gray-900">
                          {comment.profiles?.full_name || 'Anonymous'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatTimeAgo(comment.created_at)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <MessageCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No comments yet. Be the first to comment!</p>
            </div>
          )}
        </div>
      )}
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
    <div>
      {/* Search Bar with Total Count */}
      <div className="mb-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={filters.keywords}
              onChange={(e) => setFilters({ ...filters, keywords: e.target.value })}
              placeholder="Search papers by title, abstract, keywords..."
              className="w-full pl-11 pr-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              {total.toLocaleString()} papers
            </div>
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-6 py-3 rounded-lg flex items-center gap-2 font-medium transition-all whitespace-nowrap ${
              showFilters
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-300'
            }`}
          >
            <Filter className="h-5 w-5" />
            Filters
            {activeFilterCount > 0 && (
              <span className="px-2 py-0.5 bg-blue-700 text-white text-xs font-bold rounded-full">
                {activeFilterCount}
              </span>
            )}
          </button>

          <button
            onClick={handleSync}
            disabled={syncing}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 flex items-center gap-2 font-medium transition-all whitespace-nowrap"
          >
            {syncing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Syncing...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4" />
                Sync
              </>
            )}
          </button>
        </div>
      </div>

      {/* Sync Message */}
      {syncMessage && (
        <div className={`mb-4 px-4 py-3 rounded-lg ${
          syncMessage.includes('✅')
            ? 'bg-green-100 text-green-800 border border-green-300'
            : 'bg-red-100 text-red-800 border border-red-300'
        }`}>
          {syncMessage}
        </div>
      )}

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-900">Filter Papers</h4>
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear all
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Year */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Conference</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Source</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Track</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="imported_at">Recently Added</option>
                <option value="recency">Most Recent (Year)</option>
                <option value="rating">Highest Rated</option>
                <option value="likes">Most Liked</option>
                <option value="views">Most Viewed</option>
                <option value="combined_score">Best Match Score</option>
              </select>
            </div>

            {/* Min Rating */}
            {filterOptions.statuses.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Min Rating</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={filters.minRating || ''}
                  onChange={(e) => setFilters({ ...filters, minRating: e.target.value ? parseFloat(e.target.value) : null })}
                  placeholder="e.g., 7.0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}
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

      {/* Papers Feed */}
      {!loading && !error && papers.length > 0 && (
        <>
          <div className="space-y-0">
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
            <div className="flex items-center justify-center gap-4 py-8">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-6 py-3 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium transition-all shadow-sm"
              >
                <ChevronLeft className="h-5 w-5" />
                Previous
              </button>
              <div className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold shadow-md">
                Page {page} of {totalPages}
              </div>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-6 py-3 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium transition-all shadow-sm"
              >
                Next
                <ChevronRight className="h-5 w-5" />
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

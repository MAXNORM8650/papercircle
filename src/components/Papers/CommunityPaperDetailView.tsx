import { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink, Code, BookmarkPlus, Calendar, Users, Share2, Brain } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { PaperDiscussionThread } from './PaperDiscussionThread';
import { PaperAnalysisView } from './PaperAnalysisView';
import { logError, getUserFriendlyErrorMessage } from '../../lib/errorHandling';
import { usePaperEngagement } from '../../hooks/usePaperEngagement';
import type { Database } from '../../lib/database.types';

type Paper = Database['public']['Tables']['papers']['Row'];

interface CommunityPaperDetailViewProps {
  paperId: string;
  communityId: string;
  onBack: () => void;
}

export function CommunityPaperDetailView({ paperId, communityId, onBack }: CommunityPaperDetailViewProps) {
  const { user } = useAuth();
  const [paper, setPaper] = useState<Paper | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'details' | 'analysis' | 'discussion'>('details');
  const { stats, userEngagement, toggleLike, toggleSave } = usePaperEngagement(paperId, communityId);

  useEffect(() => {
    loadPaper();
  }, [paperId]);

  const loadPaper = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('papers')
        .select('*')
        .eq('id', paperId)
        .single();

      if (error) throw error;

      setPaper(data);
    } catch (error) {
      logError('CommunityPaperDetailView.loadPaper', error);
    } finally {
      setLoading(false);
    }
  };

  const formatAuthors = (authors: any) => {
    if (!Array.isArray(authors) || authors.length === 0) return 'Unknown authors';
    if (authors.length === 1) return authors[0];
    if (authors.length === 2) return `${authors[0]} and ${authors[1]}`;
    return `${authors[0]} et al.`;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading paper...</p>
        </div>
      </div>
    );
  }

  if (!paper) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>
        <p className="text-gray-600">Paper not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Papers</span>
      </button>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Paper Header */}
        <div className="p-8 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{paper.title}</h1>

          <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 mb-4">
            {Array.isArray(paper.authors) && paper.authors.length > 0 && (
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span className="font-medium">{formatAuthors(paper.authors)}</span>
              </span>
            )}
            {paper.published_date && (
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(paper.published_date)}</span>
              </span>
            )}
          </div>

          <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 mb-6">
            {paper.venue && <span className="font-medium">{paper.venue}</span>}
            {paper.year && <span>{paper.year}</span>}
            {paper.citation_count > 0 && <span>{paper.citation_count} citations</span>}
          </div>

          {/* Engagement Stats */}
          <div className="flex items-center gap-6 mb-6 text-sm">
            <button
              onClick={toggleLike}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                userEngagement.hasLiked
                  ? 'bg-red-50 text-red-600 hover:bg-red-100'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="text-lg">{userEngagement.hasLiked ? '❤️' : '🤍'}</span>
              <span className="font-medium">{stats.likes} likes</span>
            </button>

            <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
              <span className="text-lg">💬</span>
              <span className="font-medium text-gray-700">{stats.discussions} discussions</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
              <span className="text-lg">👁️</span>
              <span className="font-medium text-gray-700">{stats.views} views</span>
            </div>

            <button
              onClick={toggleSave}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                userEngagement.hasSaved
                  ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="text-lg">{userEngagement.hasSaved ? '🔖' : '📑'}</span>
              <span className="font-medium">{userEngagement.hasSaved ? 'Saved' : 'Save'}</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {paper.pdf_url && (
              <a
                href={paper.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <ExternalLink className="h-4 w-4" />
                <span>View PDF</span>
              </a>
            )}
            {paper.code_url && (
              <a
                href={paper.code_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                <Code className="h-4 w-4" />
                <span>View Code</span>
              </a>
            )}
            {paper.arxiv_id && (
              <a
                href={`https://arxiv.org/abs/${paper.arxiv_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                <ExternalLink className="h-4 w-4" />
                <span>arXiv</span>
              </a>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'details'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Details
            </button>
            <button
              onClick={() => setActiveTab('analysis')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === 'analysis'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Brain className="h-4 w-4" />
              AI Analysis
            </button>
            <button
              onClick={() => setActiveTab('discussion')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'discussion'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Discussion
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'details' && (
          <>
            {/* Abstract */}
            {paper.abstract && (
              <div className="p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Abstract</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{paper.abstract}</p>
              </div>
            )}
          </>
        )}

        {activeTab === 'analysis' && (
          <div className="p-8">
            <PaperAnalysisView
              paperId={paperId}
              communityId={communityId}
              arxivId={paper.arxiv_id}
            />
          </div>
        )}

        {activeTab === 'discussion' && (
          <div className="p-8 bg-gray-50">
            <PaperDiscussionThread paperId={paperId} communityId={communityId} />
          </div>
        )}
      </div>
    </div>
  );
}

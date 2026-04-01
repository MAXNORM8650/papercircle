import { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink, Code, BookmarkPlus, MessageSquare, ThumbsUp, Brain, FileCheck } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { useCommunity } from '../../contexts/CommunityContext';
import { PaperAnalysisView } from './PaperAnalysisView';
import { PaperReviewView } from './PaperReviewView';
import type { Database } from '../../lib/database.types';

type Paper = Database['public']['Tables']['papers']['Row'];
type Discussion = Database['public']['Tables']['discussions']['Row'] & {
  profiles?: { display_name: string } | null;
  reaction_count?: number;
};

type DetailTab = 'details' | 'analysis' | 'review';

interface PaperDetailViewProps {
  paperId: string;
  onBack: () => void;
}

export function PaperDetailView({ paperId, onBack }: PaperDetailViewProps) {
  const { user, profile } = useAuth();
  const { currentCommunity } = useCommunity();
  const [paper, setPaper] = useState<Paper | null>(null);
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<DetailTab>('details');

  useEffect(() => {
    loadPaper();
    loadDiscussions();
  }, [paperId]);

  const loadPaper = async () => {
    const { data } = await supabase
      .from('papers')
      .select('*')
      .eq('id', paperId)
      .single();

    if (data) setPaper(data);
    setLoading(false);
  };

  const loadDiscussions = async () => {
    const { data } = await supabase
      .from('discussions')
      .select(`
        *,
        profiles(display_name)
      `)
      .eq('paper_id', paperId)
      .is('parent_id', null)
      .order('created_at', { ascending: false });

    if (data) {
      const discussionsWithReactions = await Promise.all(
        data.map(async (discussion) => {
          const { count } = await supabase
            .from('reactions')
            .select('*', { count: 'exact', head: true })
            .eq('discussion_id', discussion.id);

          return {
            ...discussion,
            reaction_count: count || 0,
          };
        })
      );
      setDiscussions(discussionsWithReactions);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim()) return;

    await supabase.from('discussions').insert({
      paper_id: paperId,
      user_id: user.id,
      content: newComment,
    });

    setNewComment('');
    loadDiscussions();
  };

  const handleReaction = async (discussionId: string) => {
    if (!user) return;

    const { data: existing } = await supabase
      .from('reactions')
      .select('id')
      .eq('discussion_id', discussionId)
      .eq('user_id', user.id)
      .eq('type', 'like')
      .maybeSingle();

    if (existing) {
      await supabase.from('reactions').delete().eq('id', existing.id);
    } else {
      await supabase.from('reactions').insert({
        discussion_id: discussionId,
        user_id: user.id,
        type: 'like',
      });
    }

    loadDiscussions();
  };

  const savePaper = async () => {
    if (!user) return;

    await supabase.from('saved_papers').insert({
      user_id: user.id,
      paper_id: paperId,
    });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
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
        <span>Back to Discover</span>
      </button>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{paper.title}</h1>

          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
            {Array.isArray(paper.authors) && paper.authors.length > 0 && (
              <span className="font-medium">
                {(paper.authors as any[]).join(', ')}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-6">
            {paper.venue && <span className="font-medium">{paper.venue}</span>}
            {paper.year && <span>{paper.year}</span>}
            {paper.citation_count > 0 && (
              <span>{paper.citation_count} citations</span>
            )}
          </div>

          <div className="flex items-center space-x-3 mb-6">
            {paper.pdf_url && (
              <a
                href={paper.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Code className="h-4 w-4" />
                <span>View Code</span>
              </a>
            )}
            {user && (
              <button
                onClick={savePaper}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <BookmarkPlus className="h-4 w-4" />
                <span>Save</span>
              </button>
            )}
          </div>
        </div>

        {/* Tabs: Details | Analysis | Review */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex space-x-0">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'details'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Details
            </button>
            <button
              onClick={() => setActiveTab('analysis')}
              className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'analysis'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Brain className="w-4 h-4" />
              Mind Graph
            </button>
            <button
              onClick={() => setActiveTab('review')}
              className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'review'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              Review
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'analysis' && (
          <PaperAnalysisView
            paperId={paperId}
            communityId={currentCommunity?.id}
            arxivId={paper.arxiv_id || undefined}
          />
        )}

        {activeTab === 'review' && (
          <PaperReviewView
            paperId={paperId}
            communityId={currentCommunity?.id}
            arxivId={paper.arxiv_id || undefined}
          />
        )}

        {activeTab === 'details' && (
          <>
            {paper.abstract && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Abstract</h2>
                <p className="text-gray-700 leading-relaxed">{paper.abstract}</p>
              </div>
            )}
          </>
        )}

        {activeTab === 'details' && (
        <div className="border-t pt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <MessageSquare className="h-5 w-5" />
            <span>Discussion ({discussions.length})</span>
          </h2>

          {user && (
            <form onSubmit={handleSubmitComment} className="mb-6">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts about this paper..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
              />
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                Post Comment
              </button>
            </form>
          )}

          <div className="space-y-4">
            {discussions.length === 0 ? (
              <p className="text-gray-600 text-center py-8">
                No discussions yet. Be the first to share your thoughts!
              </p>
            ) : (
              discussions.map((discussion) => (
                <div
                  key={discussion.id}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-gray-900">
                      {discussion.profiles?.display_name || 'Anonymous'}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(discussion.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3">{discussion.content}</p>
                  <button
                    onClick={() => handleReaction(discussion.id)}
                    className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>{discussion.reaction_count || 0}</span>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
        )}
      </div>
    </div>
  );
}

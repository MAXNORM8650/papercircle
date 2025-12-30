import { useState, useEffect } from 'react';
import { MessageCircle, Send, Reply, Edit2, Trash2, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { logError, getUserFriendlyErrorMessage } from '../../lib/errorHandling';

interface PaperDiscussionThreadProps {
  paperId: string;
  communityId: string;
}

interface Discussion {
  id: string;
  paper_id: string;
  community_id: string;
  user_id: string | null;
  parent_id: string | null;
  content: string;
  is_edited: boolean;
  created_at: string;
  updated_at: string;
  profiles: {
    display_name: string;
    avatar_url?: string;
  } | null;
  replies?: Discussion[];
}

export function PaperDiscussionThread({ paperId, communityId }: PaperDiscussionThreadProps) {
  const { user } = useAuth();
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadDiscussions();
    subscribeToDiscussions();
  }, [paperId, communityId]);

  const loadDiscussions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('paper_discussions')
        .select(`
          *,
          profiles:user_id (
            display_name,
            avatar_url
          )
        `)
        .eq('paper_id', paperId)
        .eq('community_id', communityId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Organize into threaded structure
      const threaded = organizeThreads(data || []);
      setDiscussions(threaded);
    } catch (error) {
      logError('PaperDiscussionThread.loadDiscussions', error);
    } finally {
      setLoading(false);
    }
  };

  const organizeThreads = (discussions: Discussion[]): Discussion[] => {
    const topLevel = discussions.filter(d => !d.parent_id);
    const replies = discussions.filter(d => d.parent_id);

    return topLevel.map(discussion => ({
      ...discussion,
      replies: replies.filter(r => r.parent_id === discussion.id),
    }));
  };

  const subscribeToDiscussions = () => {
    const channel = supabase
      .channel(`paper_discussions:${paperId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'paper_discussions',
          filter: `paper_id=eq.${paperId}`,
        },
        () => {
          loadDiscussions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim()) return;

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('paper_discussions')
        .insert({
          paper_id: paperId,
          community_id: communityId,
          user_id: user.id,
          content: newComment.trim(),
        });

      if (error) throw error;

      setNewComment('');
      loadDiscussions();
    } catch (error) {
      logError('PaperDiscussionThread.handleSubmitComment', error);
      alert(getUserFriendlyErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitReply = async (parentId: string) => {
    if (!user || !replyContent.trim()) return;

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('paper_discussions')
        .insert({
          paper_id: paperId,
          community_id: communityId,
          user_id: user.id,
          parent_id: parentId,
          content: replyContent.trim(),
        });

      if (error) throw error;

      setReplyTo(null);
      setReplyContent('');
      loadDiscussions();
    } catch (error) {
      logError('PaperDiscussionThread.handleSubmitReply', error);
      alert(getUserFriendlyErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = async (discussionId: string) => {
    if (!editContent.trim()) return;

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('paper_discussions')
        .update({
          content: editContent.trim(),
          is_edited: true,
          updated_at: new Date().toISOString(),
        })
        .eq('id', discussionId);

      if (error) throw error;

      setEditingId(null);
      setEditContent('');
      loadDiscussions();
    } catch (error) {
      logError('PaperDiscussionThread.handleEdit', error);
      alert(getUserFriendlyErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (discussionId: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
      const { error } = await supabase
        .from('paper_discussions')
        .delete()
        .eq('id', discussionId);

      if (error) throw error;

      loadDiscussions();
    } catch (error) {
      logError('PaperDiscussionThread.handleDelete', error);
      alert(getUserFriendlyErrorMessage(error));
    }
  };

  const startEditing = (discussion: Discussion) => {
    setEditingId(discussion.id);
    setEditContent(discussion.content);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const renderDiscussion = (discussion: Discussion, isReply = false) => {
    const isOwner = user && discussion.user_id === user.id;
    const isEditing = editingId === discussion.id;

    return (
      <div
        key={discussion.id}
        className={`${isReply ? 'ml-8 mt-3' : 'mb-4'} ${isReply ? 'border-l-2 border-gray-200 pl-4' : ''}`}
      >
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium">
                {discussion.profiles?.display_name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {discussion.profiles?.display_name || 'Unknown User'}
                </p>
                <p className="text-xs text-gray-500">
                  {formatDate(discussion.created_at)}
                  {discussion.is_edited && ' (edited)'}
                </p>
              </div>
            </div>
            {isOwner && !isEditing && (
              <div className="flex gap-1">
                <button
                  onClick={() => startEditing(discussion)}
                  className="p-1 text-gray-400 hover:text-blue-600"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(discussion.id)}
                  className="p-1 text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-2">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
              />
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(discussion.id)}
                  disabled={submitting}
                  className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditingId(null);
                    setEditContent('');
                  }}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-gray-700 mb-2 whitespace-pre-wrap">{discussion.content}</p>
              {!isReply && user && (
                <button
                  onClick={() => {
                    setReplyTo(discussion.id);
                    setReplyContent('');
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <Reply className="w-4 h-4" />
                  Reply
                </button>
              )}
            </>
          )}

          {replyTo === discussion.id && (
            <div className="mt-3 bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Reply</span>
                <button
                  onClick={() => {
                    setReplyTo(null);
                    setReplyContent('');
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write your reply..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
                rows={2}
              />
              <button
                onClick={() => handleSubmitReply(discussion.id)}
                disabled={submitting || !replyContent.trim()}
                className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm disabled:opacity-50"
              >
                Post Reply
              </button>
            </div>
          )}
        </div>

        {discussion.replies && discussion.replies.length > 0 && (
          <div className="mt-2">
            {discussion.replies.map(reply => renderDiscussion(reply, true))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Discussion</h3>
        <span className="text-sm text-gray-500">({discussions.length})</span>
      </div>

      {user && (
        <form onSubmit={handleSubmitComment} className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts about this paper..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
            rows={3}
          />
          <button
            type="submit"
            disabled={submitting || !newComment.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Post Comment
          </button>
        </form>
      )}

      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Loading discussions...</p>
        </div>
      ) : discussions.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600">No discussions yet</p>
          <p className="text-sm text-gray-500">Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div>
          {discussions.map(discussion => renderDiscussion(discussion))}
        </div>
      )}
    </div>
  );
}

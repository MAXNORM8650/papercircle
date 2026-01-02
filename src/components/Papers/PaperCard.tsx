import { Heart, MessageCircle, Bookmark, Eye, ExternalLink, Users, Share2 } from 'lucide-react';
import { usePaperEngagement } from '../../hooks/usePaperEngagement';
import { useEffect } from 'react';

interface PaperCardProps {
  paper: {
    id: string;
    title: string;
    authors: string[];
    abstract: string;
    arxiv_id?: string;
    pdf_url?: string;
    thumbnail_url?: string;
    published_date?: string;
    view_count?: number;
    like_count?: number;
  };
  communityId?: string;
  onSelectPaper?: (paperId: string) => void;
  onAddToCircle?: (paperId: string) => void;
  onShare?: (paperId: string) => void;
  showAddToCircle?: boolean;
  showShare?: boolean;
}

export function PaperCard({ paper, communityId, onSelectPaper, onAddToCircle, onShare, showAddToCircle = false, showShare = false }: PaperCardProps) {
  const { stats, userEngagement, toggleLike, toggleSave, recordView } = usePaperEngagement(paper.id, communityId);

  // Record view when card is displayed
  useEffect(() => {
    recordView();
  }, []);

  const formatAuthors = (authors: string[]) => {
    if (authors.length === 0) return 'Unknown authors';
    if (authors.length === 1) return authors[0];
    if (authors.length === 2) return `${authors[0]} and ${authors[1]}`;
    return `${authors[0]} et al.`;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex gap-4 p-4">
        {/* Thumbnail */}
        {paper.thumbnail_url ? (
          <div className="flex-shrink-0">
            <img
              src={paper.thumbnail_url}
              alt={`${paper.title} thumbnail`}
              className="w-32 h-40 object-cover rounded border border-gray-200"
            />
          </div>
        ) : (
          <div className="flex-shrink-0 w-32 h-40 bg-gradient-to-br from-blue-50 to-purple-50 rounded border border-gray-200 flex items-center justify-center">
            <div className="text-center p-2">
              <div className="text-4xl mb-2">📄</div>
              <div className="text-xs text-gray-500">No preview</div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3
            className="text-lg font-semibold text-gray-900 mb-2 cursor-pointer hover:text-blue-600 line-clamp-2"
            onClick={() => onSelectPaper?.(paper.id)}
          >
            {paper.title}
          </h3>

          {/* Authors and Date */}
          <div className="text-sm text-gray-600 mb-2">
            <span>{formatAuthors(paper.authors)}</span>
            {paper.published_date && (
              <span className="ml-2 text-gray-400">• {formatDate(paper.published_date)}</span>
            )}
          </div>

          {/* Abstract */}
          <p className="text-sm text-gray-700 line-clamp-3 mb-3">
            {paper.abstract}
          </p>

          {/* Engagement Stats */}
          <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
            <button
              onClick={toggleLike}
              className={`flex items-center gap-1 hover:text-red-600 transition-colors ${
                userEngagement.hasLiked ? 'text-red-600' : ''
              }`}
            >
              <Heart className={`w-4 h-4 ${userEngagement.hasLiked ? 'fill-current' : ''}`} />
              <span>{stats.likes}</span>
            </button>

            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              <span>{stats.discussions}</span>
            </div>

            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{stats.views}</span>
            </div>

            <button
              onClick={toggleSave}
              className={`flex items-center gap-1 hover:text-blue-600 transition-colors ${
                userEngagement.hasSaved ? 'text-blue-600' : ''
              }`}
            >
              <Bookmark className={`w-4 h-4 ${userEngagement.hasSaved ? 'fill-current' : ''}`} />
              <span className="sr-only">Save</span>
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {paper.pdf_url && (
              <a
                href={paper.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                Read PDF
              </a>
            )}

            {paper.arxiv_id && (
              <a
                href={`https://arxiv.org/abs/${paper.arxiv_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                arXiv
              </a>
            )}

            {showAddToCircle && onAddToCircle && (
              <button
                onClick={() => onAddToCircle(paper.id)}
                className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <Users className="w-3 h-3" />
                Add to Circle
              </button>
            )}

            {showShare && onShare && (
              <button
                onClick={() => onShare(paper.id)}
                className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
              >
                <Share2 className="w-3 h-3" />
                Share
              </button>
            )}

            <button
              onClick={() => onSelectPaper?.(paper.id)}
              className="inline-flex items-center gap-1 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

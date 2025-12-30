import { useState, useEffect } from 'react';
import { Search, Filter, SortAsc, SortDesc, Users, X, Plus } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { PaperCard } from './PaperCard';
import { CommunityPaperDetailView } from './CommunityPaperDetailView';
import { AddPaperModal } from './AddPaperModal';

interface CommunityPapersViewProps {
  communityId: string;
  onSelectPaper?: (paperId: string) => void;
}

type SortOption = 'date' | 'likes' | 'views' | 'discussions' | 'title';
type SortOrder = 'asc' | 'desc';

export function CommunityPapersView({ communityId, onSelectPaper }: CommunityPapersViewProps) {
  const { user } = useAuth();
  const [papers, setPapers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCircle, setSelectedCircle] = useState<string>('all');
  const [circles, setCircles] = useState<any[]>([]);
  const [showAddToCircle, setShowAddToCircle] = useState(false);
  const [selectedPaperForCircle, setSelectedPaperForCircle] = useState<string | null>(null);
  const [selectedPaperId, setSelectedPaperId] = useState<string | null>(null);
  const [showAddPaperModal, setShowAddPaperModal] = useState(false);

  useEffect(() => {
    loadPapers();
    loadCircles();
  }, [communityId, sortBy, sortOrder]);

  const loadPapers = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('community_papers')
        .select(`
          paper_id,
          added_by,
          created_at,
          papers:paper_id (
            id,
            title,
            authors,
            abstract,
            arxiv_id,
            pdf_url,
            thumbnail_url,
            year,
            view_count,
            like_count
          )
        `)
        .eq('community_id', communityId);

      const { data, error } = await query;

      if (error) throw error;

      if (data) {
        let papersData = data.map(cp => ({
          ...cp.papers,
          added_at: cp.created_at,
        }));

        // Sort papers
        papersData = sortPapers(papersData);

        setPapers(papersData);
      }
    } catch (error) {
      console.error('Error loading community papers:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCircles = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('community_members')
        .select(`
          community_id,
          communities:community_id (
            id,
            name
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;

      if (data) {
        const circlesData = data
          .filter(cm => cm.communities && cm.communities.id !== communityId)
          .map(cm => cm.communities);
        setCircles(circlesData);
      }
    } catch (error) {
      console.error('Error loading circles:', error);
    }
  };

  const sortPapers = (papersToSort: any[]) => {
    return [...papersToSort].sort((a, b) => {
      let compareValue = 0;

      switch (sortBy) {
        case 'date':
          // Sort by when added to community, fall back to year
          const bDate = b.added_at ? new Date(b.added_at).getTime() : (b.year || 0) * 365 * 24 * 60 * 60 * 1000;
          const aDate = a.added_at ? new Date(a.added_at).getTime() : (a.year || 0) * 365 * 24 * 60 * 60 * 1000;
          compareValue = bDate - aDate;
          break;
        case 'likes':
          compareValue = (b.like_count || 0) - (a.like_count || 0);
          break;
        case 'views':
          compareValue = (b.view_count || 0) - (a.view_count || 0);
          break;
        case 'title':
          compareValue = a.title.localeCompare(b.title);
          break;
        default:
          compareValue = 0;
      }

      return sortOrder === 'asc' ? -compareValue : compareValue;
    });
  };

  const filteredPapers = papers.filter(paper => {
    const matchesSearch = searchQuery === '' ||
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.authors.some((author: string) => author.toLowerCase().includes(searchQuery.toLowerCase())) ||
      paper.abstract.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  const handleAddToCircle = async (paperId: string) => {
    setSelectedPaperForCircle(paperId);
    setShowAddToCircle(true);
  };

  const addPaperToCircle = async (circleId: string) => {
    if (!selectedPaperForCircle || !user) return;

    try {
      // Check if paper already in circle
      const { data: existing } = await supabase
        .from('community_papers')
        .select('id')
        .eq('paper_id', selectedPaperForCircle)
        .eq('community_id', circleId)
        .single();

      if (existing) {
        alert('This paper is already in that circle');
        return;
      }

      // Add paper to circle
      const { error } = await supabase
        .from('community_papers')
        .insert({
          paper_id: selectedPaperForCircle,
          community_id: circleId,
          added_by: user.id,
        });

      if (error) throw error;

      alert('Paper added to circle successfully!');
      setShowAddToCircle(false);
      setSelectedPaperForCircle(null);
    } catch (error) {
      console.error('Error adding paper to circle:', error);
      alert('Failed to add paper to circle');
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const handleSelectPaper = (paperId: string) => {
    setSelectedPaperId(paperId);
    onSelectPaper?.(paperId);
  };

  const handleBackFromDetail = () => {
    setSelectedPaperId(null);
    loadPapers(); // Reload to refresh discussion counts
  };

  // Show detail view if a paper is selected
  if (selectedPaperId) {
    return (
      <CommunityPaperDetailView
        paperId={selectedPaperId}
        communityId={communityId}
        onBack={handleBackFromDetail}
      />
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Loading papers...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Community Papers</h2>
          <p className="text-sm text-gray-500 mt-1">{filteredPapers.length} papers</p>
        </div>
        <button
          onClick={() => setShowAddPaperModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          Add Papers from arXiv
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center gap-4 mb-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search papers by title, author, or keywords..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
              showFilters
                ? 'bg-blue-50 border-blue-500 text-blue-700'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Filter className="w-5 h-5" />
            Filters
          </button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <div className="flex gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="date">Date Added</option>
                    <option value="likes">Most Liked</option>
                    <option value="views">Most Viewed</option>
                    <option value="title">Title (A-Z)</option>
                  </select>
                  <button
                    onClick={toggleSortOrder}
                    className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                  >
                    {sortOrder === 'asc' ? (
                      <SortAsc className="w-5 h-5" />
                    ) : (
                      <SortDesc className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Papers List */}
      {filteredPapers.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="text-4xl mb-3">📚</div>
          <p className="text-gray-600 mb-2">No papers found</p>
          {searchQuery && (
            <p className="text-sm text-gray-500">Try adjusting your search query</p>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPapers.map((paper) => (
            <PaperCard
              key={paper.id}
              paper={paper}
              communityId={communityId}
              onSelectPaper={handleSelectPaper}
              onAddToCircle={handleAddToCircle}
              showAddToCircle={circles.length > 0}
            />
          ))}
        </div>
      )}

      {/* Add to Circle Modal */}
      {showAddToCircle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add to Circle</h3>
              <button
                onClick={() => {
                  setShowAddToCircle(false);
                  setSelectedPaperForCircle(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Select a circle to add this paper to:
            </p>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {circles.map((circle) => (
                <button
                  key={circle.id}
                  onClick={() => addPaperToCircle(circle.id)}
                  className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-500 transition-colors text-left"
                >
                  <Users className="w-5 h-5 text-gray-400" />
                  <span className="font-medium text-gray-900">{circle.name}</span>
                </button>
              ))}

              {circles.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">
                  You don't have any other circles to add this paper to.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Paper Modal */}
      <AddPaperModal
        isOpen={showAddPaperModal}
        communityId={communityId}
        onClose={() => setShowAddPaperModal(false)}
        onSuccess={() => {
          loadPapers();
          setShowAddPaperModal(false);
        }}
      />
    </div>
  );
}

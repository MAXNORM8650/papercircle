import { useState, useEffect, useRef } from 'react';
import { Search, Filter, BookmarkPlus, Calendar, ExternalLink, Code, Database as DatabaseIcon, Globe, Plus, ThumbsUp, ThumbsDown, ChevronRight, TrendingUp, BarChart3, Sparkles, Target, Lightbulb, Award, Star, CalendarDays, X, Users } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { useCommunity } from '../../contexts/CommunityContext';
import type { Database } from '../../lib/database.types';
import { searchArxivDirect, groupPapersByDate, formatDateDisplay, type ArxivPaper as ArxivPaperType } from '../../lib/arxivClient';
import { AIDiscoveryViewNew as AIDiscoveryView } from './AIDiscoveryViewNew';
import { SearchTagsSelector } from './SearchTagsSelector';
import { CommunityPapersTab } from './CommunityPapersTab';

type Paper = Database['public']['Tables']['papers']['Row'];
type Topic = Database['public']['Tables']['topics']['Row'];

type ArxivPaper = ArxivPaperType;

interface PaperScore {
  topic_relevance: number;
  novelty: number;
  authority_proxy: number;
  final_score: number;
}

interface DiscoveredPaper {
  id: string;
  title: string;
  summary: string;
  year: number;
  authors: string[];
  url: string;
  published: string;
  age_score: number;
  scores: PaperScore;
  category: 'overall' | 'hidden_gem' | 'canonical';
}

interface DiscoveryResponse {
  query: string;
  mode: string;
  total_papers: number;
  top_overall: DiscoveredPaper[];
  hidden_gems: DiscoveredPaper[];
  canonical_papers: DiscoveredPaper[];
  all_papers: DiscoveredPaper[];
  mode_weights: {
    relevance: number;
    authority: number;
    novelty: number;
  };
}

interface DiscoverViewProps {
  onSelectPaper: (paperId: string) => void;
}

export function DiscoverView({ onSelectPaper }: DiscoverViewProps) {
  const { user } = useAuth();
  const { communities, userCommunities, currentCommunity } = useCommunity();
  const [papers, setPapers] = useState<Paper[]>([]);
  const [arxivPapers, setArxivPapers] = useState<ArxivPaper[]>([]);
  const [groupedArxivPapers, setGroupedArxivPapers] = useState<Map<string, ArxivPaper[]>>(new Map());
  const [discoveryResults, setDiscoveryResults] = useState<DiscoveryResponse | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [yearFilter, setYearFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<'relevance' | 'recent' | 'citations' | 'influence' | 'trending' | 'popularity' | 'engagement'>('recent');
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchSource, setSearchSource] = useState<'local' | 'arxiv' | 'ai-discovery'>('local');
  const [discoveryMode, setDiscoveryMode] = useState<'stable' | 'discovery' | 'balanced'>('balanced');
  const [applyDiversity, setApplyDiversity] = useState(true);
  const [discoveryApiUrl, setDiscoveryApiUrl] = useState('http://localhost:8000');
  const [activeCategory, setActiveCategory] = useState<'all' | 'overall' | 'hidden_gems' | 'canonical'>('all');
  const [groupByDate, setGroupByDate] = useState(true);
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month' | 'custom'>('week');

  const [arxivFilters, setArxivFilters] = useState({
    category: 'all',
    author: '',
    title: '',
    abstract: '',
    startDate: '',
    endDate: '',
  });
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [searchMetrics, setSearchMetrics] = useState<{
    totalSearches: number;
    avgResults: number;
    topCategories: string[];
  } | null>(null);
  const resultsPerPage = 30;

  useEffect(() => {
    loadTopics();
    loadUserRatings();
    loadSearchMetrics();

    // Hide filters when switching tabs
    setShowFilters(false);

    if (searchSource === 'local') {
      loadPapers();
    } else if (searchSource === 'arxiv' && arxivPapers.length === 0) {
      // Auto-search for past week papers when switching to arXiv tab
      searchArxiv(0);
    }
  }, [selectedTopic, yearFilter, sortBy, searchSource]);

  const loadUserRatings = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('paper_ratings')
      .select('arxiv_id, paper_id, rating')
      .eq('user_id', user.id);

    if (data) {
      const ratingsMap: Record<string, number> = {};
      data.forEach(r => {
        const key = r.arxiv_id || r.paper_id;
        if (key) ratingsMap[key] = r.rating;
      });
      setRatings(ratingsMap);
    }
  };

  const loadSearchMetrics = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('search_metrics')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(100);

    if (data && data.length > 0) {
      const totalSearches = data.length;
      const avgResults = Math.round(
        data.reduce((sum, m) => sum + m.results_count, 0) / totalSearches
      );

      const categories: Record<string, number> = {};
      data.forEach(m => {
        if (m.filters_used && typeof m.filters_used === 'object') {
          const filters: any = m.filters_used;
          if (filters.category && filters.category !== 'all') {
            categories[filters.category] = (categories[filters.category] || 0) + 1;
          }
        }
      });

      const topCategories = Object.entries(categories)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([cat]) => cat);

      setSearchMetrics({ totalSearches, avgResults, topCategories });
    }
  };

  const loadTopics = async () => {
    const { data } = await supabase
      .from('topics')
      .select('*')
      .order('name');

    if (data) setTopics(data);
  };

  const loadPapers = async () => {
    setLoading(true);
    let query = supabase.from('papers').select('*');

    if (selectedTopic) {
      query = supabase
        .from('papers')
        .select('*, paper_topics!inner(topic_id)')
        .eq('paper_topics.topic_id', selectedTopic);
    }

    if (yearFilter) {
      query = query.eq('year', parseInt(yearFilter));
    }

    switch (sortBy) {
      case 'recent':
        query = query.order('year', { ascending: false }).order('created_at', { ascending: false });
        break;
      case 'citations':
        query = query.order('citation_count', { ascending: false });
        break;
      case 'influence':
        query = query.order('influence_score', { ascending: false });
        break;
      case 'trending':
        query = query.order('trending_score', { ascending: false });
        break;
      case 'popularity':
        query = query.order('view_count', { ascending: false }).order('save_count', { ascending: false });
        break;
      case 'engagement':
        query = query.order('like_count', { ascending: false }).order('save_count', { ascending: false });
        break;
      default:
        query = query.order('created_at', { ascending: false });
    }

    query = query.limit(50);

    const { data } = await query;
    if (data) setPapers(data);
    setLoading(false);
  };

  const searchArxiv = async (page = 0) => {
    setSearching(true);

    try {
      // Calculate date range if needed
      let startDate = arxivFilters.startDate;
      let endDate = arxivFilters.endDate;

      // Only apply date range filtering if:
      // 1. User hasn't set custom dates AND
      // 2. Either no search query OR dateRange is explicitly 'today'
      const hasSearchQuery = searchQuery.trim().length > 0 || arxivFilters.author || arxivFilters.title || arxivFilters.abstract;
      const shouldApplyDateRange = !startDate && !endDate && dateRange !== 'custom' && (!hasSearchQuery || dateRange === 'today');

      if (shouldApplyDateRange) {
        const today = new Date();
        endDate = today.toISOString().split('T')[0];

        const start = new Date(today);
        switch (dateRange) {
          case 'today':
            start.setDate(start.getDate() - 1);
            startDate = start.toISOString().split('T')[0];
            break;
          case 'week':
            start.setDate(start.getDate() - 7);
            startDate = start.toISOString().split('T')[0];
            break;
          case 'month':
            start.setMonth(start.getMonth() - 1);
            startDate = start.toISOString().split('T')[0];
            break;
        }
      }

      // Build search parameters
      const searchParams: any = {
        maxResults: resultsPerPage,
        start: page * resultsPerPage,
        // Use lastUpdatedDate for sorting to get papers that appeared in recent arXiv announcements
        sortBy: sortBy === 'recent' ? 'lastUpdatedDate' : 'relevance',
        sortOrder: 'descending',
      };

      if (searchQuery.trim()) {
        const keywords = searchQuery.split(',').map(k => k.trim()).filter(Boolean);
        searchParams.query = keywords.join(' OR ');
      }

      if (arxivFilters.category !== 'all') {
        searchParams.category = arxivFilters.category;
      }
      if (arxivFilters.author) {
        searchParams.author = arxivFilters.author;
      }
      if (arxivFilters.title) {
        searchParams.title = arxivFilters.title;
      }
      if (arxivFilters.abstract) {
        searchParams.abstract = arxivFilters.abstract;
      }
      if (startDate) {
        searchParams.startDate = startDate;
      }
      if (endDate) {
        searchParams.endDate = endDate;
      }

      // Use direct arXiv API client
      const papers = await searchArxivDirect(searchParams);

      if (page === 0) {
        setArxivPapers(papers);
        if (groupByDate) {
          setGroupedArxivPapers(groupPapersByDate(papers));
        }
      } else {
        setArxivPapers(prev => {
          const newPapers = [...prev, ...papers];
          if (groupByDate) {
            setGroupedArxivPapers(groupPapersByDate(newPapers));
          }
          return newPapers;
        });
      }

      setTotalResults(papers.length);
      setCurrentPage(page);

      if (user) {
        await supabase.from('search_metrics').insert({
          user_id: user.id,
          search_query: searchQuery,
          search_source: 'arxiv',
          filters_used: { ...arxivFilters, dateRange, startDate, endDate },
          results_count: papers.length,
        });

        // Auto-save arXiv papers to current community
        if (currentCommunity && papers.length > 0) {
          await saveArxivPapersToCommunity(papers, currentCommunity.id);
        }
      }
    } catch (error) {
      console.error('Error searching arXiv:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

      if (errorMessage.includes('proxy server')) {
        alert(`arXiv Proxy Server Not Running\n\nTo use arXiv search, you need to start the proxy server:\n\n1. Open a new terminal\n2. Run: npm install express cors node-fetch\n3. Run: node arxiv-proxy.js\n4. Try searching again\n\nSee the console for more details.`);
      } else {
        alert(`Error searching arXiv:\n\n${errorMessage}\n\nPlease check the browser console for more details.`);
      }
    } finally {
      setSearching(false);
    }
  };

  const searchAiDiscovery = async () => {
    if (!searchQuery.trim()) return;

    setSearching(true);
    try {
      const response = await fetch(`${discoveryApiUrl}/discover`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: searchQuery,
          mode: discoveryMode,
          apply_diversity: applyDiversity,
        }),
      });

      if (response.ok) {
        const data: DiscoveryResponse = await response.json();
        setDiscoveryResults(data);

        if (user) {
          await supabase.from('search_metrics').insert({
            user_id: user.id,
            search_query: searchQuery,
            search_source: 'ai-discovery',
            filters_used: { mode: discoveryMode, diversity: applyDiversity },
            results_count: data.total_papers,
          });
        }
      } else {
        console.error('AI Discovery API error:', await response.text());
      }
    } catch (error) {
      console.error('Error calling AI Discovery:', error);
    } finally {
      setSearching(false);
    }
  };

  const [triggerAiSearch, setTriggerAiSearch] = useState(false);
  const [aiSearchQuery, setAiSearchQuery] = useState('');
  const [aiDiscoveryLoading, setAiDiscoveryLoading] = useState(false);
  const aiDiscoveryStopFnRef = useRef<(() => void) | null>(null);

  const handleSearch = () => {
    // If AI Discovery is loading, stop it
    if (searchSource === 'ai-discovery' && aiDiscoveryLoading && aiDiscoveryStopFnRef.current) {
      aiDiscoveryStopFnRef.current();
      return;
    }

    setCurrentPage(0);
    if (searchSource === 'arxiv') {
      searchArxiv(0);
    } else if (searchSource === 'ai-discovery') {
      // Trigger AI Discovery search
      setAiSearchQuery(searchQuery);
      setTriggerAiSearch(true);
      setTimeout(() => setTriggerAiSearch(false), 100);
    } else {
      loadPapers();
    }
  };

  const loadMore = () => {
    searchArxiv(currentPage + 1);
  };

  const ratePaper = async (arxivId: string | null, paperId: string | null, rating: number) => {
    if (!user) return;

    const key = arxivId || paperId;
    if (!key) return;

    const currentRating = ratings[key];
    const newRating = currentRating === rating ? 0 : rating;

    if (newRating === 0) {
      if (arxivId) {
        await supabase.from('paper_ratings').delete().match({ user_id: user.id, arxiv_id: arxivId });
      } else if (paperId) {
        await supabase.from('paper_ratings').delete().match({ user_id: user.id, paper_id: paperId });
      }
      const newRatings = { ...ratings };
      delete newRatings[key];
      setRatings(newRatings);
    } else {
      const { data } = await supabase
        .from('paper_ratings')
        .upsert({
          user_id: user.id,
          arxiv_id: arxivId,
          paper_id: paperId,
          rating: newRating,
        })
        .select()
        .single();

      if (data) {
        setRatings({ ...ratings, [key]: newRating });
      }
    }
  };

  const savePaper = async (paperId: string) => {
    if (!user) return;

    await supabase.from('saved_papers').insert({
      user_id: user.id,
      paper_id: paperId,
    });
  };

  const [showImportModal, setShowImportModal] = useState(false);
  const [paperToImport, setPaperToImport] = useState<ArxivPaper | null>(null);
  const [selectedCommunityForImport, setSelectedCommunityForImport] = useState<string>('');
  const [importing, setImporting] = useState(false);

  const importArxivPaper = async (arxivPaper: ArxivPaper, communityId?: string) => {
    const year = new Date(arxivPaper.published).getFullYear();

    // Check if paper already exists
    const { data: existing } = await supabase
      .from('papers')
      .select('id')
      .eq('arxiv_id', arxivPaper.id)
      .maybeSingle();

    if (existing) {
      // Paper exists, just add to community if specified
      if (communityId) {
        await addPaperToCommunity(existing.id, communityId);
      }
      onSelectPaper(existing.id);
      return;
    }

    // Create new paper with import_source
    const { data, error } = await supabase
      .from('papers')
      .insert({
        arxiv_id: arxivPaper.id,
        title: arxivPaper.title,
        authors: arxivPaper.authors,
        abstract: arxivPaper.summary,
        year,
        pdf_url: arxivPaper.pdfLink,
        import_source: 'arxiv',
        metadata: { categories: arxivPaper.categories },
      })
      .select()
      .single();

    if (data && !error) {
      // Add to community_papers_global for global feed visibility
      await supabase
        .from('community_papers_global')
        .upsert({
          paper_id: data.id,
          source: 'arxiv',
          run_timestamp: 'manual_import',
        }, { onConflict: 'paper_id,run_timestamp' });

      // Add to community if specified
      if (communityId) {
        await addPaperToCommunity(data.id, communityId);
      }
      onSelectPaper(data.id);
    }
  };

  const addPaperToCommunity = async (paperId: string, communityId: string) => {
    // Check if already added
    const { data: existing } = await supabase
      .from('community_papers')
      .select('id')
      .eq('paper_id', paperId)
      .eq('community_id', communityId)
      .maybeSingle();

    if (!existing) {
      await supabase.from('community_papers').insert({
        paper_id: paperId,
        community_id: communityId,
        added_by: user?.id,
      });
    }
  };

  const saveArxivPapersToCommunity = async (papers: ArxivPaper[], communityId: string) => {
    if (!user) return;

    try {
      let savedCount = 0;
      for (const paper of papers) {
        const year = new Date(paper.published).getFullYear();

        // Check if paper already exists in database
        const { data: existing } = await supabase
          .from('papers')
          .select('id')
          .eq('arxiv_id', paper.id)
          .maybeSingle();

        let paperId: string;
        let isNewPaper = false;

        if (existing) {
          paperId = existing.id;
        } else {
          // Create new paper with import_source
          const { data: newPaper, error: insertError } = await supabase
            .from('papers')
            .insert({
              arxiv_id: paper.id,
              title: paper.title,
              authors: paper.authors,
              abstract: paper.summary,
              year,
              pdf_url: paper.pdfLink,
              import_source: 'arxiv',
              metadata: {
                categories: paper.categories,
                discovered_from: 'arxiv_search',
                discovered_at: new Date().toISOString()
              },
            })
            .select('id')
            .single();

          if (insertError || !newPaper) continue;
          paperId = newPaper.id;
          isNewPaper = true;
        }

        // Add to community_papers_global for global feed visibility
        if (isNewPaper) {
          const { error: globalError } = await supabase
            .from('community_papers_global')
            .upsert({
              paper_id: paperId,
              source: 'arxiv',
              run_timestamp: 'live_search',
              query: searchQuery || null,
            }, { onConflict: 'paper_id,run_timestamp' });

          if (globalError) {
            console.warn('Could not add to community_papers_global:', globalError);
          }
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
        console.log(`✅ Saved ${savedCount} arXiv papers to community ${communityId}`);
      }
    } catch (error) {
      console.error('Error saving arXiv papers to community:', error);
    }
  };

  const openImportModal = (paper: ArxivPaper) => {
    setPaperToImport(paper);
    setShowImportModal(true);
  };

  const handleImportWithCommunity = async () => {
    if (!paperToImport) return;

    setImporting(true);
    try {
      await importArxivPaper(paperToImport, selectedCommunityForImport || undefined);
      setShowImportModal(false);
      setPaperToImport(null);
      setSelectedCommunityForImport('');
    } catch (error) {
      console.error('Error importing paper:', error);
      alert('Error importing paper. Please try again.');
    } finally {
      setImporting(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <div className="mb-6 space-y-4">
        {/* Tabs Row */}
        <div className="flex rounded-lg border border-gray-300 overflow-hidden w-fit">
          <button
            onClick={() => {
              setSearchSource('local');
              if (sortBy === 'relevance') setSortBy('recent');
            }}
            className={`px-4 py-2 flex items-center space-x-2 transition-colors ${
              searchSource === 'local'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <DatabaseIcon className="h-4 w-4" />
            <span className="font-medium">Community</span>
          </button>
          <button
            onClick={() => {
              setSearchSource('arxiv');
              if (!['relevance', 'recent'].includes(sortBy)) setSortBy('relevance');
            }}
            className={`px-4 py-2 flex items-center space-x-2 transition-colors ${
              searchSource === 'arxiv'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Globe className="h-4 w-4" />
            <span className="font-medium">arXiv Live</span>
          </button>
          <button
            onClick={() => {
              setSearchSource('ai-discovery');
            }}
            className={`px-4 py-2 flex items-center space-x-2 transition-colors ${
              searchSource === 'ai-discovery'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Sparkles className="h-4 w-4" />
            <span className="font-medium">AI Discovery</span>
          </button>
        </div>

        {/* Search Row (for arXiv and AI Discovery) */}
        {searchSource !== 'local' && (
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder={
                  searchSource === 'arxiv'
                    ? 'Search arXiv (use commas for multiple keywords: "transformer, attention, vision")'
                    : 'Describe your research interest (e.g., "efficient finetuning methods for large language models")'
                }
                className="w-full pl-11 pr-40 py-3 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              {searchSource === 'arxiv' && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                  {totalResults.toLocaleString()} results
                </div>
              )}
            </div>
            <button
              onClick={handleSearch}
              disabled={(searching || loading) && !(searchSource === 'ai-discovery' && aiDiscoveryLoading)}
              className={`px-6 py-3 text-white rounded-lg transition-all font-medium whitespace-nowrap ${
                searchSource === 'ai-discovery' && aiDiscoveryLoading
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-blue-600 hover:bg-blue-700 disabled:opacity-50'
              }`}
            >
              {searchSource === 'ai-discovery' && aiDiscoveryLoading
                ? 'Stop'
                : searching || loading
                ? 'Searching...'
                : 'Search'}
            </button>
            {searchSource === 'arxiv' && (
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
              </button>
            )}
          </div>
        )}

        {searchSource === 'ai-discovery' && (
          <SearchTagsSelector
            selectedTags={selectedTags}
            onTagsChange={setSelectedTags}
          />
        )}

        {showFilters && searchSource === 'arxiv' && (
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={groupByDate}
                  onChange={(e) => setGroupByDate(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                  <CalendarDays className="h-4 w-4" />
                  <span>Group by Date</span>
                </span>
              </label>
            </div>

            <div className="bg-white p-4 rounded-lg border border-blue-200 mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Date Range
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[
                  { value: 'today', label: 'Today', icon: '📅' },
                  { value: 'week', label: 'Past Week', icon: '📆' },
                  { value: 'month', label: 'Past Month', icon: '🗓️' },
                  { value: 'custom', label: 'Custom Range', icon: '⚙️' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setDateRange(option.value as any)}
                    className={`px-3 py-2 rounded-lg border-2 transition-all text-sm font-medium ${
                      dateRange === option.value
                        ? 'border-blue-500 bg-blue-100 text-blue-900'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300'
                    }`}
                  >
                    <span className="mr-1">{option.icon}</span>
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={arxivFilters.category}
                  onChange={(e) => setArxivFilters({ ...arxivFilters, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  <optgroup label="Computer Science">
                    <option value="cs.AI">Artificial Intelligence</option>
                    <option value="cs.CL">Computation and Language</option>
                    <option value="cs.CV">Computer Vision</option>
                    <option value="cs.LG">Machine Learning</option>
                    <option value="cs.NE">Neural and Evolutionary Computing</option>
                    <option value="cs.RO">Robotics</option>
                    <option value="cs.CR">Cryptography and Security</option>
                  </optgroup>
                  <optgroup label="Mathematics">
                    <option value="math.OC">Optimization and Control</option>
                    <option value="math.ST">Statistics Theory</option>
                  </optgroup>
                  <optgroup label="Statistics">
                    <option value="stat.ML">Machine Learning (Stats)</option>
                    <option value="stat.ME">Methodology</option>
                  </optgroup>
                  <optgroup label="Physics">
                    <option value="physics.data-an">Data Analysis</option>
                    <option value="physics.comp-ph">Computational Physics</option>
                  </optgroup>
                  <optgroup label="Quantitative">
                    <option value="q-bio">Quantitative Biology</option>
                    <option value="q-fin">Quantitative Finance</option>
                  </optgroup>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author
                </label>
                <input
                  type="text"
                  value={arxivFilters.author}
                  onChange={(e) => setArxivFilters({ ...arxivFilters, author: e.target.value })}
                  placeholder="e.g., Hinton"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title Keywords
                </label>
                <input
                  type="text"
                  value={arxivFilters.title}
                  onChange={(e) => setArxivFilters({ ...arxivFilters, title: e.target.value })}
                  placeholder="Search in title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Abstract Keywords
                </label>
                <input
                  type="text"
                  value={arxivFilters.abstract}
                  onChange={(e) => setArxivFilters({ ...arxivFilters, abstract: e.target.value })}
                  placeholder="Search in abstract"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {dateRange === 'custom' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={arxivFilters.startDate}
                      onChange={(e) => setArxivFilters({ ...arxivFilters, startDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={arxivFilters.endDate}
                      onChange={(e) => setArxivFilters({ ...arxivFilters, endDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-blue-200">
              <button
                onClick={() => setArxivFilters({
                  category: 'all',
                  author: '',
                  title: '',
                  abstract: '',
                  startDate: '',
                  endDate: '',
                })}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear All Filters
              </button>
              <div className="text-sm text-gray-600">
                {Object.values(arxivFilters).filter(v => v && v !== 'all').length} active filters
              </div>
            </div>
          </div>
        )}

      </div>

      {searching || loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">
            {searchSource === 'arxiv' ? 'Searching arXiv...' : searchSource === 'ai-discovery' ? 'AI is discovering papers...' : 'Loading papers...'}
          </p>
        </div>
      ) : searchSource === 'ai-discovery' ? (
        <AIDiscoveryView
          searchQuery={aiSearchQuery}
          triggerSearch={triggerAiSearch}
          selectedTags={selectedTags}
          onSearchComplete={(count) => {
            console.log(`AI Discovery found ${count} papers`);
          }}
          onLoadingChange={setAiDiscoveryLoading}
          onStopFunctionReady={(fn) => {
            aiDiscoveryStopFnRef.current = fn;
          }}
        />
      ) : searchSource === 'arxiv' ? (
        <div className="space-y-4">
          {arxivPapers.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Globe className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 mb-2">No papers found on arXiv.</p>
              <p className="text-sm text-gray-500">Try a different search query or browse community papers.</p>
            </div>
          ) : (
            <>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5 text-blue-600" />
                    <p className="text-sm text-blue-900">
                      <span className="font-medium">Live arXiv Results:</span> {arxivPapers.length} papers found
                      {groupByDate && groupedArxivPapers.size > 0 && (
                        <span className="ml-2 text-blue-700">({groupedArxivPapers.size} days)</span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-blue-900">Sort:</label>
                    <select
                      value={sortBy}
                      onChange={(e) => {
                        setSortBy(e.target.value as any);
                        setCurrentPage(0);
                        searchArxiv(0);
                      }}
                      className="px-3 py-1.5 border border-blue-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                      <option value="relevance">🎯 Most Relevant</option>
                      <option value="recent">📅 Most Recent</option>
                    </select>
                  </div>
                </div>
                <p className="text-xs text-blue-700">
                  Click <Plus className="inline h-3 w-3" /> to import papers into your community library
                </p>
              </div>

              {groupByDate && groupedArxivPapers.size > 0 ? (
                // Grouped by date view
                Array.from(groupedArxivPapers.entries()).map(([dateKey, papers]) => (
                  <div key={dateKey} className="space-y-4">
                    <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-100 to-indigo-100 border-2 border-blue-300 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <CalendarDays className="h-5 w-5 text-blue-700" />
                          <h3 className="text-lg font-semibold text-blue-900">
                            {formatDateDisplay(dateKey)}
                          </h3>
                        </div>
                        <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium">
                          {papers.length} {papers.length === 1 ? 'paper' : 'papers'}
                        </span>
                      </div>
                      <p className="text-xs text-blue-700 mt-1">{dateKey}</p>
                    </div>

                    {papers.map((paper) => (
                      <div
                        key={paper.id}
                        className="bg-white border-2 border-blue-100 rounded-lg p-6 hover:shadow-md transition-shadow ml-4"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2 flex-wrap gap-2">
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                                arXiv:{paper.id}
                              </span>
                              <span className="text-sm text-gray-500">
                                📅 {new Date(paper.published).toLocaleDateString()} {new Date(paper.published).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                              {paper.updated && new Date(paper.updated).getTime() !== new Date(paper.published).getTime() && (
                                <span className="text-xs text-gray-500">
                                  🔄 Updated: {new Date(paper.updated).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                              {paper.title}
                            </h3>
                          </div>
                          <button
                            onClick={() => openImportModal(paper)}
                            className="ml-4 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            title="Import to community library"
                          >
                            <Plus className="h-5 w-5" />
                          </button>
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <span>{paper.authors.slice(0, 3).join(', ')}{paper.authors.length > 3 ? ', et al.' : ''}</span>
                        </div>

                        {paper.categories.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {paper.categories.slice(0, 5).map((cat) => (
                              <span key={cat} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                {cat}
                              </span>
                            ))}
                          </div>
                        )}

                        <p className="text-gray-700 mb-4 line-clamp-3">{paper.summary}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {paper.pdfLink && (
                              <a
                                href={paper.pdfLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700"
                              >
                                <ExternalLink className="h-4 w-4" />
                                <span>PDF</span>
                              </a>
                            )}
                            {paper.link && (
                              <a
                                href={paper.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700"
                              >
                                <ExternalLink className="h-4 w-4" />
                                <span>arXiv</span>
                              </a>
                            )}
                          </div>

                          {user && (
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => ratePaper(paper.id, null, 1)}
                                className={`p-2 rounded-lg transition-colors ${
                                  ratings[paper.id] === 1
                                    ? 'bg-green-100 text-green-600'
                                    : 'bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-600'
                                }`}
                                title="Like this paper"
                              >
                                <ThumbsUp className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => ratePaper(paper.id, null, -1)}
                                className={`p-2 rounded-lg transition-colors ${
                                  ratings[paper.id] === -1
                                    ? 'bg-red-100 text-red-600'
                                    : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
                                }`}
                                title="Dislike this paper"
                              >
                                <ThumbsDown className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ))
              ) : (
                // Regular list view
                arxivPapers.map((paper) => (
                <div
                  key={paper.id}
                  className="bg-white border-2 border-blue-100 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2 flex-wrap gap-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                          arXiv:{paper.id}
                        </span>
                        <span className="text-sm text-gray-500">
                          📅 {new Date(paper.published).toLocaleDateString()} {new Date(paper.published).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {paper.updated && new Date(paper.updated).getTime() !== new Date(paper.published).getTime() && (
                          <span className="text-xs text-gray-500">
                            🔄 Updated: {new Date(paper.updated).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {paper.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => openImportModal(paper)}
                      className="ml-4 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      title="Import to community library"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <span>{paper.authors.slice(0, 3).join(', ')}{paper.authors.length > 3 ? ', et al.' : ''}</span>
                  </div>

                  {paper.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {paper.categories.slice(0, 5).map((cat) => (
                        <span key={cat} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="text-gray-700 mb-4 line-clamp-3">{paper.summary}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {paper.pdfLink && (
                        <a
                          href={paper.pdfLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span>PDF</span>
                        </a>
                      )}
                      {paper.link && (
                        <a
                          href={paper.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span>arXiv</span>
                        </a>
                      )}
                    </div>

                    {user && (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => ratePaper(paper.id, null, 1)}
                          className={`p-2 rounded-lg transition-colors ${
                            ratings[paper.id] === 1
                              ? 'bg-green-100 text-green-600'
                              : 'bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-600'
                          }`}
                          title="Like this paper"
                        >
                          <ThumbsUp className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => ratePaper(paper.id, null, -1)}
                          className={`p-2 rounded-lg transition-colors ${
                            ratings[paper.id] === -1
                              ? 'bg-red-100 text-red-600'
                              : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
                          }`}
                          title="Dislike this paper"
                        >
                          <ThumbsDown className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
              )}

              {arxivPapers.length > 0 && totalResults === resultsPerPage && (
                <div className="flex justify-center pt-6">
                  <button
                    onClick={loadMore}
                    disabled={searching}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 flex items-center space-x-2"
                  >
                    <span>{searching ? 'Loading...' : 'Load More Results'}</span>
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      ) : searchSource === 'local' ? (
        <CommunityPapersTab onSelectPaper={onSelectPaper} />
      ) : null}

      {/* Import Paper Modal */}
      {showImportModal && paperToImport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Import Paper</h3>
              <button
                onClick={() => setShowImportModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-900 mb-2">{paperToImport.title}</p>
              <p className="text-xs text-gray-600">
                {paperToImport.authors.slice(0, 3).join(', ')}
                {paperToImport.authors.length > 3 ? ', et al.' : ''}
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add to Community (Optional)
              </label>
              <select
                value={selectedCommunityForImport}
                onChange={(e) => setSelectedCommunityForImport(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Just import (no community)</option>
                {userCommunities.map((community) => (
                  <option key={community.id} value={community.id}>
                    {community.name}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-xs text-gray-500">
                You can add this paper to a community now, or do it later from the paper details page.
              </p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowImportModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                disabled={importing}
              >
                Cancel
              </button>
              <button
                onClick={handleImportWithCommunity}
                disabled={importing}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {importing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Importing...</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    <span>Import</span>
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

import { useState, useEffect } from 'react';
import { Search, Filter, BookmarkPlus, Calendar, ExternalLink, Code, Database as DatabaseIcon, Globe, Plus, ThumbsUp, ThumbsDown, ChevronRight, TrendingUp, BarChart3, Sparkles, Target, Lightbulb, Award, Star, CalendarDays } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import type { Database } from '../../lib/database.types';
import { searchArxivDirect, groupPapersByDate, formatDateDisplay, type ArxivPaper as ArxivPaperType } from '../../lib/arxivClient';

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
    if (searchSource === 'local') {
      loadPapers();
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

      if (!startDate && !endDate && dateRange !== 'custom') {
        const today = new Date();
        endDate = today.toISOString().split('T')[0];

        const start = new Date(today);
        switch (dateRange) {
          case 'today':
            start.setDate(start.getDate() - 1);
            break;
          case 'week':
            start.setDate(start.getDate() - 7);
            break;
          case 'month':
            start.setMonth(start.getMonth() - 1);
            break;
        }
        startDate = start.toISOString().split('T')[0];
      }

      // Build search parameters
      const searchParams: any = {
        maxResults: resultsPerPage,
        start: page * resultsPerPage,
        sortBy: sortBy === 'recent' ? 'submittedDate' : 'relevance',
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

  const handleSearch = () => {
    setCurrentPage(0);
    if (searchSource === 'arxiv') {
      searchArxiv(0);
    } else if (searchSource === 'ai-discovery') {
      searchAiDiscovery();
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

  const importArxivPaper = async (arxivPaper: ArxivPaper) => {
    const year = new Date(arxivPaper.published).getFullYear();

    const { data: existing } = await supabase
      .from('papers')
      .select('id')
      .eq('arxiv_id', arxivPaper.id)
      .maybeSingle();

    if (existing) {
      onSelectPaper(existing.id);
      return;
    }

    const { data, error } = await supabase
      .from('papers')
      .insert({
        arxiv_id: arxivPaper.id,
        title: arxivPaper.title,
        authors: arxivPaper.authors,
        abstract: arxivPaper.summary,
        year,
        pdf_url: arxivPaper.pdfLink,
        metadata: { categories: arxivPaper.categories },
      })
      .select()
      .single();

    if (data && !error) {
      onSelectPaper(data.id);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Papers</h1>
        <p className="text-gray-600">Explore papers from your community library or search arXiv in realtime</p>
      </div>

      {searchMetrics && searchSource === 'arxiv' && (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center space-x-2 mb-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Total Searches</span>
            </div>
            <p className="text-2xl font-bold text-blue-900">{searchMetrics.totalSearches}</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-900">Avg Results</span>
            </div>
            <p className="text-2xl font-bold text-green-900">{searchMetrics.avgResults}</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
            <div className="flex items-center space-x-2 mb-2">
              <Globe className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-purple-900">Top Categories</span>
            </div>
            <p className="text-sm font-medium text-purple-900">
              {searchMetrics.topCategories.slice(0, 2).join(', ') || 'None yet'}
            </p>
          </div>
        </div>
      )}

      <div className="mb-6 space-y-4">
        <div className="flex gap-2">
          <div className="flex rounded-lg border border-gray-300 overflow-hidden">
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
                  : searchSource === 'ai-discovery'
                  ? 'Describe your research interest (e.g., "efficient finetuning methods for large language models")'
                  : 'Search community papers by title, author, or keywords...'
              }
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={searching || loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
          >
            {searching || loading ? 'Searching...' : 'Search'}
          </button>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {showFilters && searchSource === 'arxiv' && (
          <div className="bg-blue-50 p-6 rounded-lg space-y-4 border border-blue-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Advanced arXiv Filters</h3>
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

        {showFilters && searchSource === 'local' && (
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Topic
                </label>
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Topics</option>
                  {topics.map((topic) => (
                    <option key={topic.id} value={topic.id}>
                      {topic.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year
                </label>
                <select
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Years</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {searchSource === 'local' ? (
                    <>
                      <option value="recent">📅 Most Recent</option>
                      <option value="citations">📚 Most Cited</option>
                      <option value="influence">⭐ Highest Influence</option>
                      <option value="trending">🔥 Trending Now</option>
                      <option value="popularity">👀 Most Popular (Views)</option>
                      <option value="engagement">❤️ Most Engagement (Likes)</option>
                    </>
                  ) : (
                    <>
                      <option value="relevance">🎯 Most Relevant</option>
                      <option value="recent">📅 Most Recent</option>
                    </>
                  )}
                </select>
              </div>
            </div>
          </div>
        )}

        {showFilters && searchSource === 'ai-discovery' && (
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-lg space-y-4 border border-purple-200">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              <span>AI Discovery Settings</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Discovery Mode
                </label>
                <div className="space-y-2">
                  <button
                    onClick={() => setDiscoveryMode('stable')}
                    className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                      discoveryMode === 'stable'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <Award className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-gray-900">Stable</span>
                    </div>
                    <p className="text-xs text-gray-600">Established, authoritative works</p>
                    <div className="mt-2 text-xs text-gray-500">
                      Relevance: 50% • Authority: 40% • Novelty: 10%
                    </div>
                  </button>

                  <button
                    onClick={() => setDiscoveryMode('balanced')}
                    className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                      discoveryMode === 'balanced'
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 bg-white hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <Target className="h-4 w-4 text-purple-600" />
                      <span className="font-medium text-gray-900">Balanced</span>
                    </div>
                    <p className="text-xs text-gray-600">Mix of both approaches</p>
                    <div className="mt-2 text-xs text-gray-500">
                      Relevance: 40% • Authority: 30% • Novelty: 30%
                    </div>
                  </button>

                  <button
                    onClick={() => setDiscoveryMode('discovery')}
                    className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                      discoveryMode === 'discovery'
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 bg-white hover:border-orange-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <Lightbulb className="h-4 w-4 text-orange-600" />
                      <span className="font-medium text-gray-900">Discovery</span>
                    </div>
                    <p className="text-xs text-gray-600">Novel, cutting-edge research</p>
                    <div className="mt-2 text-xs text-gray-500">
                      Relevance: 30% • Authority: 10% • Novelty: 60%
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Advanced Options
                </label>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={applyDiversity}
                        onChange={(e) => setApplyDiversity(e.target.checked)}
                        className="rounded text-purple-600 focus:ring-purple-500"
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-900">Apply Diversity (MMR)</span>
                        <p className="text-xs text-gray-600">Re-rank results for diverse perspectives</p>
                      </div>
                    </label>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      API Endpoint
                    </label>
                    <input
                      type="text"
                      value={discoveryApiUrl}
                      onChange={(e) => setDiscoveryApiUrl(e.target.value)}
                      placeholder="http://localhost:8000"
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
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
        <div className="space-y-6">
          {!discoveryResults ? (
            <div className="text-center py-12 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
              <Sparkles className="h-12 w-12 text-purple-400 mx-auto mb-3" />
              <p className="text-gray-600 mb-2">AI-powered paper discovery ready</p>
              <p className="text-sm text-gray-500">Enter a research query and click Search to discover papers</p>
            </div>
          ) : (
            <>
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Sparkles className="h-6 w-6 text-purple-600" />
                    <div>
                      <p className="text-lg font-semibold text-gray-900">AI Discovery Results</p>
                      <p className="text-sm text-gray-600">Found {discoveryResults.total_papers} papers using {discoveryResults.mode} mode</p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 bg-white px-3 py-2 rounded-lg border border-purple-200">
                    <span className="font-medium">Weights:</span> Relevance {(discoveryResults.mode_weights.relevance * 100).toFixed(0)}% •
                    Authority {(discoveryResults.mode_weights.authority * 100).toFixed(0)}% •
                    Novelty {(discoveryResults.mode_weights.novelty * 100).toFixed(0)}%
                  </div>
                </div>

                <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                  <button
                    onClick={() => setActiveCategory('all')}
                    className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                      activeCategory === 'all'
                        ? 'bg-purple-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-purple-100 border border-purple-200'
                    }`}
                  >
                    All Papers ({discoveryResults.all_papers.length})
                  </button>
                  <button
                    onClick={() => setActiveCategory('overall')}
                    className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                      activeCategory === 'overall'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-blue-100 border border-blue-200'
                    }`}
                  >
                    <Star className="inline h-4 w-4 mr-1" />
                    Top Overall ({discoveryResults.top_overall.length})
                  </button>
                  <button
                    onClick={() => setActiveCategory('hidden_gems')}
                    className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                      activeCategory === 'hidden_gems'
                        ? 'bg-orange-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-orange-100 border border-orange-200'
                    }`}
                  >
                    <Lightbulb className="inline h-4 w-4 mr-1" />
                    Hidden Gems ({discoveryResults.hidden_gems.length})
                  </button>
                  <button
                    onClick={() => setActiveCategory('canonical')}
                    className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                      activeCategory === 'canonical'
                        ? 'bg-green-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-green-100 border border-green-200'
                    }`}
                  >
                    <Award className="inline h-4 w-4 mr-1" />
                    Canonical ({discoveryResults.canonical_papers.length})
                  </button>
                </div>
              </div>

              {(() => {
                let papersToShow: DiscoveredPaper[] = [];
                if (activeCategory === 'all') papersToShow = discoveryResults.all_papers;
                else if (activeCategory === 'overall') papersToShow = discoveryResults.top_overall;
                else if (activeCategory === 'hidden_gems') papersToShow = discoveryResults.hidden_gems;
                else if (activeCategory === 'canonical') papersToShow = discoveryResults.canonical_papers;

                return papersToShow.map((paper) => (
                  <div
                    key={paper.id}
                    className="bg-white border-2 border-purple-100 rounded-lg p-6 hover:shadow-lg transition-all"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2 flex-wrap gap-2">
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded">
                            arXiv:{paper.id}
                          </span>
                          <span className="text-sm text-gray-500">
                            📅 {new Date(paper.published).toLocaleDateString()}
                          </span>
                          <span className="px-2 py-1 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 text-xs font-semibold rounded">
                            Score: {(paper.scores.final_score * 100).toFixed(1)}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {paper.title}
                        </h3>
                      </div>
                      <button
                        onClick={async () => {
                          const arxivPaper: ArxivPaper = {
                            id: paper.id,
                            title: paper.title,
                            summary: paper.summary,
                            authors: paper.authors,
                            published: paper.published,
                            link: `https://arxiv.org/abs/${paper.id}`,
                            pdfLink: paper.url,
                            categories: [],
                          };
                          await importArxivPaper(arxivPaper);
                        }}
                        className="ml-4 p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        title="Import to community library"
                      >
                        <Plus className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <span>{paper.authors.slice(0, 3).join(', ')}{paper.authors.length > 3 ? ', et al.' : ''}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="bg-blue-50 rounded-lg p-2 border border-blue-200">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-blue-900">Relevance</span>
                          <Target className="h-3 w-3 text-blue-600" />
                        </div>
                        <div className="mt-1">
                          <div className="text-lg font-bold text-blue-900">{(paper.scores.topic_relevance * 100).toFixed(0)}%</div>
                          <div className="w-full bg-blue-200 rounded-full h-1.5 mt-1">
                            <div
                              className="bg-blue-600 h-1.5 rounded-full"
                              style={{ width: `${paper.scores.topic_relevance * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-orange-50 rounded-lg p-2 border border-orange-200">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-orange-900">Novelty</span>
                          <Lightbulb className="h-3 w-3 text-orange-600" />
                        </div>
                        <div className="mt-1">
                          <div className="text-lg font-bold text-orange-900">{(paper.scores.novelty * 100).toFixed(0)}%</div>
                          <div className="w-full bg-orange-200 rounded-full h-1.5 mt-1">
                            <div
                              className="bg-orange-600 h-1.5 rounded-full"
                              style={{ width: `${paper.scores.novelty * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-50 rounded-lg p-2 border border-green-200">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-green-900">Authority</span>
                          <Award className="h-3 w-3 text-green-600" />
                        </div>
                        <div className="mt-1">
                          <div className="text-lg font-bold text-green-900">{(paper.scores.authority_proxy * 100).toFixed(0)}%</div>
                          <div className="w-full bg-green-200 rounded-full h-1.5 mt-1">
                            <div
                              className="bg-green-600 h-1.5 rounded-full"
                              style={{ width: `${paper.scores.authority_proxy * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-3">{paper.summary}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <a
                          href={paper.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-sm text-purple-600 hover:text-purple-700 font-medium"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span>PDF</span>
                        </a>
                        <a
                          href={`https://arxiv.org/abs/${paper.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-sm text-purple-600 hover:text-purple-700 font-medium"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span>arXiv</span>
                        </a>
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
                ));
              })()}
            </>
          )}
        </div>
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
                            onClick={() => importArxivPaper(paper)}
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
                      onClick={() => importArxivPaper(paper)}
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
      ) : (
        <div className="space-y-4">
          {papers.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <DatabaseIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No papers found in community library.</p>
            </div>
          ) : (
            papers.map((paper) => (
              <div
                key={paper.id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onSelectPaper(paper.id)}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-gray-900 flex-1 hover:text-blue-600 transition-colors">
                    {paper.title}
                  </h3>
                  {user && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        savePaper(paper.id);
                      }}
                      className="ml-4 p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Save paper"
                    >
                      <BookmarkPlus className="h-5 w-5" />
                    </button>
                  )}
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                  {Array.isArray(paper.authors) && paper.authors.length > 0 && (
                    <span>{(paper.authors as any[]).slice(0, 3).join(', ')}{paper.authors.length > 3 ? ', et al.' : ''}</span>
                  )}
                  {paper.year && <span>{paper.year}</span>}
                  {paper.venue && <span>{paper.venue}</span>}
                  {paper.citation_count > 0 && (
                    <span className="font-medium">{paper.citation_count} citations</span>
                  )}
                </div>

                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  {paper.influence_score > 0 && (
                    <div className="flex items-center space-x-1 px-2 py-1 bg-yellow-50 text-yellow-700 rounded text-xs font-medium">
                      <TrendingUp className="h-3 w-3" />
                      <span>Influence: {paper.influence_score.toFixed(1)}</span>
                    </div>
                  )}
                  {paper.trending_score > 0 && (
                    <div className="flex items-center space-x-1 px-2 py-1 bg-orange-50 text-orange-700 rounded text-xs font-medium">
                      <BarChart3 className="h-3 w-3" />
                      <span>Trending: {paper.trending_score.toFixed(1)}</span>
                    </div>
                  )}
                  {paper.view_count > 0 && (
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                      👀 {paper.view_count} views
                    </span>
                  )}
                  {paper.save_count > 0 && (
                    <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs font-medium">
                      💾 {paper.save_count} saves
                    </span>
                  )}
                  {paper.like_count > 0 && (
                    <span className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-medium">
                      ❤️ {paper.like_count} likes
                    </span>
                  )}
                </div>

                {paper.abstract && (
                  <p className="text-gray-700 mb-4 line-clamp-3">{paper.abstract}</p>
                )}

                <div className="flex items-center space-x-3">
                  {paper.pdf_url && (
                    <a
                      href={paper.pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>PDF</span>
                    </a>
                  )}
                  {paper.code_url && (
                    <a
                      href={paper.code_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700"
                    >
                      <Code className="h-4 w-4" />
                      <span>Code</span>
                    </a>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Add to Session</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

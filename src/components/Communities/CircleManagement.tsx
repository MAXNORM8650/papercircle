import { useState, useEffect } from 'react';
import { Users, Plus, Settings, UserPlus, X, Loader } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { API_BASE_URL } from '../../lib/api';
import { CircleDetailView } from './CircleDetailView';

interface Community {
  id: string;
  name: string;
  description: string | null;
  slug: string;
  is_public: boolean;
  avatar_url: string | null;
  created_by: string | null;
  created_at: string;
}

interface CommunityMember {
  id: string;
  role: 'member' | 'presenter' | 'admin';
  user_id: string;
  profiles: {
    display_name: string;
    avatar_url: string | null;
  };
}

interface CircleManagementProps {
  onNavigate?: (view: string, context?: { circleId?: string }) => void;
}

export function CircleManagement({ onNavigate }: CircleManagementProps) {
  const { user } = useAuth();
  const [communities, setCommunities] = useState<Community[]>([]);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  const [members, setMembers] = useState<CommunityMember[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'list' | 'detail'>('list');

  const [newCommunity, setNewCommunity] = useState({
    name: '',
    description: '',
    slug: '',
    is_public: true,
    keywords: [] as string[],
    discovery_conferences: [] as string[],
    auto_discover: true,
  });
  const [keywordInput, setKeywordInput] = useState('');

  const AVAILABLE_CONFERENCES = [
    'ICLR', 'NeurIPS', 'ICML', 'CVPR', 'ACL', 'EMNLP', 'AAAI',
    'ICCV', 'ECCV', 'NAACL', 'COLING', 'KDD', 'IJCAI', 'AISTATS',
    'CoRL', 'ICRA', 'IROS', 'WACV', 'SIGGRAPH', 'UAI',
  ];

  useEffect(() => {
    if (user) {
      loadCommunities();
    }
  }, [user]);

  useEffect(() => {
    if (selectedCommunity) {
      loadMembers();
    }
  }, [selectedCommunity]);

  const loadCommunities = async () => {
    setLoading(true);
    // Use RPC function to get only circles the user is a member of
    const { data, error } = await supabase.rpc('get_user_circles');

    if (error) {
      console.error('Error loading circles:', error);
    } else if (data) {
      setCommunities(data);
    }
    setLoading(false);
  };

  const loadMembers = async () => {
    if (!selectedCommunity) return;

    // Use RPC function to avoid RLS issues
    const { data, error } = await supabase
      .rpc('get_circle_members', { circle_id: selectedCommunity.id });

    if (error) {
      console.error('Error loading members:', error);
    } else if (data) {
      // Transform RPC response to match CommunityMember interface
      setMembers(data.map((m: any) => ({
        id: m.id,
        role: m.role,
        user_id: m.user_id,
        profiles: {
          display_name: m.display_name,
          avatar_url: m.avatar_url
        }
      })));
    }
  };

  const createCommunity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const { data, error } = await supabase
      .from('communities')
      .insert({
        ...newCommunity,
        created_by: user.id,
      })
      .select()
      .single();

    if (error) {
      alert('Error creating community: ' + error.message);
      return;
    }

    if (data) {
      setCommunities([data, ...communities]);
      setShowCreateModal(false);

      // Auto-discover papers if keywords were provided
      if (newCommunity.keywords.length > 0) {
        try {
          fetch(`${API_BASE_URL}/community/${data.id}/discover`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ max_per_keyword: 30, include_arxiv_live: true }),
          }).then(res => res.json()).then(result => {
            console.log(`Auto-discovery for new circle: ${result.papers_added} papers added`);
          }).catch(err => {
            console.error('Auto-discovery failed:', err);
          });
        } catch (err) {
          console.error('Auto-discovery failed:', err);
        }
      }

      setNewCommunity({ name: '', description: '', slug: '', is_public: true, keywords: [], discovery_conferences: [], auto_discover: true });
      setKeywordInput('');
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleViewCircle = (community: Community) => {
    setSelectedCommunity(community);
    setView('detail');
  };

  const handleBackToList = () => {
    setView('list');
    setSelectedCommunity(null);
    loadCommunities();
  };

  if (view === 'detail' && selectedCommunity) {
    return (
      <CircleDetailView
        communityId={selectedCommunity.id}
        onBack={handleBackToList}
        onNavigate={onNavigate}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reading Circles</h1>
          <p className="text-gray-600 mt-1">Manage your research communities</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Create Circle</span>
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading circles...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Your Circles</h2>
            {communities.length === 0 ? (
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No circles yet</p>
                <p className="text-sm text-gray-500 mt-1">Create your first reading circle</p>
              </div>
            ) : (
              communities.map((community) => (
                <div
                  key={community.id}
                  onClick={() => handleViewCircle(community)}
                  className="p-4 rounded-lg border-2 cursor-pointer transition-all border-gray-200 bg-white hover:border-blue-300 hover:shadow-md"
                >
                  <div className="flex items-center space-x-3">
                    {community.avatar_url ? (
                      <img
                        src={community.avatar_url}
                        alt={community.name}
                        className="h-10 w-10 rounded-full"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{community.name}</h3>
                      <p className="text-xs text-gray-500">
                        {community.is_public ? 'Public' : 'Private'}
                      </p>
                    </div>
                  </div>
                  {community.description && (
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">{community.description}</p>
                  )}
                </div>
              ))
            )}
          </div>

          <div className="lg:col-span-2">
            {selectedCommunity ? (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedCommunity.name}</h2>
                    {selectedCommunity.description && (
                      <p className="text-gray-600 mt-2">{selectedCommunity.description}</p>
                    )}
                    <p className="text-sm text-gray-500 mt-2">
                      Slug: <span className="font-mono">{selectedCommunity.slug}</span>
                    </p>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Settings className="h-5 w-5" />
                  </button>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Members ({members.length})
                    </h3>
                    <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-1">
                      <UserPlus className="h-4 w-4" />
                      <span>Invite</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {members.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          {member.profiles.avatar_url ? (
                            <img
                              src={member.profiles.avatar_url}
                              alt={member.profiles.display_name}
                              className="h-10 w-10 rounded-full"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                              <Users className="h-5 w-5 text-gray-600" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-gray-900">
                              {member.profiles.display_name}
                            </p>
                            <p className="text-xs text-gray-500 capitalize">{member.role}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-12 text-center">
                <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Select a circle to view details</p>
              </div>
            )}
          </div>
        </div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Create New Circle</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={createCommunity} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Circle Name
                </label>
                <input
                  type="text"
                  value={newCommunity.name}
                  onChange={(e) => {
                    setNewCommunity({
                      ...newCommunity,
                      name: e.target.value,
                      slug: generateSlug(e.target.value),
                    });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="AI Reading Group"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={newCommunity.slug}
                  onChange={(e) =>
                    setNewCommunity({ ...newCommunity, slug: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                  placeholder="ai-reading-group"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Used in URLs: /circles/{newCommunity.slug}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newCommunity.description}
                  onChange={(e) =>
                    setNewCommunity({ ...newCommunity, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="A community for discussing AI research papers..."
                />
              </div>

              {/* Research Keywords */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Research Keywords
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  Papers matching these keywords will be auto-discovered for the circle.
                </p>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && keywordInput.trim()) {
                        e.preventDefault();
                        if (!newCommunity.keywords.includes(keywordInput.trim())) {
                          setNewCommunity({
                            ...newCommunity,
                            keywords: [...newCommunity.keywords, keywordInput.trim()],
                          });
                        }
                        setKeywordInput('');
                      }
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="e.g., LLM scaling laws (press Enter)"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (keywordInput.trim() && !newCommunity.keywords.includes(keywordInput.trim())) {
                        setNewCommunity({
                          ...newCommunity,
                          keywords: [...newCommunity.keywords, keywordInput.trim()],
                        });
                        setKeywordInput('');
                      }
                    }}
                    className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm font-medium"
                  >
                    Add
                  </button>
                </div>
                {newCommunity.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {newCommunity.keywords.map((kw, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                      >
                        {kw}
                        <button
                          type="button"
                          onClick={() => setNewCommunity({
                            ...newCommunity,
                            keywords: newCommunity.keywords.filter((_, i) => i !== idx),
                          })}
                          className="text-blue-400 hover:text-blue-600"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Conferences */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Conferences to Search
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                  {AVAILABLE_CONFERENCES.map((conf) => (
                    <button
                      key={conf}
                      type="button"
                      onClick={() => {
                        const selected = newCommunity.discovery_conferences;
                        setNewCommunity({
                          ...newCommunity,
                          discovery_conferences: selected.includes(conf)
                            ? selected.filter(c => c !== conf)
                            : [...selected, conf],
                        });
                      }}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                        newCommunity.discovery_conferences.includes(conf)
                          ? 'bg-purple-100 text-purple-700 border-purple-300'
                          : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {conf}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="auto_discover"
                  checked={newCommunity.auto_discover}
                  onChange={(e) =>
                    setNewCommunity({ ...newCommunity, auto_discover: e.target.checked })
                  }
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="auto_discover" className="text-sm text-gray-700">
                  Auto-discover papers daily based on keywords
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_public"
                  checked={newCommunity.is_public}
                  onChange={(e) =>
                    setNewCommunity({ ...newCommunity, is_public: e.target.checked })
                  }
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="is_public" className="text-sm text-gray-700">
                  Public circle (anyone can join)
                </label>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Circle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

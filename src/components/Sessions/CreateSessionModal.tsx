import { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, Video, Users, User, Mail, FileText } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface CreateSessionModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

interface Community {
  id: string;
  name: string;
}

interface Paper {
  id: string;
  title: string;
}

interface CoPresenter {
  name: string;
  email: string;
  bio: string;
}

export function CreateSessionModal({ onClose, onSuccess }: CreateSessionModalProps) {
  const { user, profile } = useAuth();
  const [communities, setCommunities] = useState<Community[]>([]);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchPaper, setSearchPaper] = useState('');

  const [session, setSession] = useState({
    title: '',
    description: '',
    scheduled_at: '',
    duration_minutes: 60,
    location: '',
    virtual_link: '',
    presenter_name: profile?.display_name || '',
    presenter_email: user?.email || '',
    presenter_bio: profile?.bio || '',
    paper_id: '',
    community_id: '',
    visibility: 'members' as 'public' | 'members',
  });

  const [coPresenters, setCoPresenters] = useState<CoPresenter[]>([]);
  const [newCoPresenter, setNewCoPresenter] = useState<CoPresenter>({
    name: '',
    email: '',
    bio: '',
  });

  useEffect(() => {
    loadCommunities();
    loadPapers();
  }, []);

  const loadCommunities = async () => {
    const { data } = await supabase
      .from('communities')
      .select('id, name')
      .order('name');

    if (data) setCommunities(data);
  };

  const loadPapers = async () => {
    let query = supabase
      .from('papers')
      .select('id, title')
      .order('created_at', { ascending: false })
      .limit(50);

    if (searchPaper) {
      query = query.ilike('title', `%${searchPaper}%`);
    }

    const { data } = await query;
    if (data) setPapers(data);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadPapers();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchPaper]);

  const addCoPresenter = () => {
    if (newCoPresenter.name && newCoPresenter.email) {
      setCoPresenters([...coPresenters, newCoPresenter]);
      setNewCoPresenter({ name: '', email: '', bio: '' });
    }
  };

  const removeCoPresenter = (index: number) => {
    setCoPresenters(coPresenters.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    const { error } = await supabase.from('sessions').insert({
      ...session,
      created_by: user.id,
      presenter_id: user.id,
      co_presenters: coPresenters,
      scheduled_at: new Date(session.scheduled_at).toISOString(),
    });

    if (error) {
      alert('Error creating session: ' + error.message);
      setLoading(false);
      return;
    }

    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-3xl w-full my-8">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Create New Session</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session Title
              </label>
              <input
                type="text"
                value={session.title}
                onChange={(e) => setSession({ ...session, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Paper Discussion: Attention Is All You Need"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={session.description}
                onChange={(e) => setSession({ ...session, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="What will be discussed in this session..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline h-4 w-4 mr-1" />
                Date & Time
              </label>
              <input
                type="datetime-local"
                value={session.scheduled_at}
                onChange={(e) => setSession({ ...session, scheduled_at: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="inline h-4 w-4 mr-1" />
                Duration (minutes)
              </label>
              <input
                type="number"
                value={session.duration_minutes}
                onChange={(e) =>
                  setSession({ ...session, duration_minutes: parseInt(e.target.value) })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="15"
                step="15"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="inline h-4 w-4 mr-1" />
                Location (optional)
              </label>
              <input
                type="text"
                value={session.location}
                onChange={(e) => setSession({ ...session, location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Room 301, CS Building"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Video className="inline h-4 w-4 mr-1" />
                Virtual Link (optional)
              </label>
              <input
                type="url"
                value={session.virtual_link}
                onChange={(e) => setSession({ ...session, virtual_link: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://zoom.us/j/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="inline h-4 w-4 mr-1" />
                Circle
              </label>
              <select
                value={session.community_id}
                onChange={(e) => setSession({ ...session, community_id: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a circle</option>
                {communities.map((community) => (
                  <option key={community.id} value={community.id}>
                    {community.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Visibility
              </label>
              <select
                value={session.visibility}
                onChange={(e) =>
                  setSession({ ...session, visibility: e.target.value as any })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="members">Members Only</option>
                <option value="public">Public</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Paper (optional)
              </label>
              <input
                type="text"
                value={searchPaper}
                onChange={(e) => setSearchPaper(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
                placeholder="Search for a paper..."
              />
              <select
                value={session.paper_id}
                onChange={(e) => setSession({ ...session, paper_id: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">No paper selected</option>
                {papers.map((paper) => (
                  <option key={paper.id} value={paper.id}>
                    {paper.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Presenter Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline h-4 w-4 mr-1" />
                  Your Name
                </label>
                <input
                  type="text"
                  value={session.presenter_name}
                  onChange={(e) => setSession({ ...session, presenter_name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="inline h-4 w-4 mr-1" />
                  Your Email
                </label>
                <input
                  type="email"
                  value={session.presenter_email}
                  onChange={(e) => setSession({ ...session, presenter_email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FileText className="inline h-4 w-4 mr-1" />
                  Bio (optional)
                </label>
                <textarea
                  value={session.presenter_bio}
                  onChange={(e) => setSession({ ...session, presenter_bio: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={2}
                  placeholder="Brief background or affiliation..."
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Co-Presenters (optional)</h3>

            {coPresenters.length > 0 && (
              <div className="space-y-2 mb-4">
                {coPresenters.map((coPresenter, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{coPresenter.name}</p>
                      <p className="text-sm text-gray-600">{coPresenter.email}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeCoPresenter(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                value={newCoPresenter.name}
                onChange={(e) =>
                  setNewCoPresenter({ ...newCoPresenter, name: e.target.value })
                }
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Name"
              />
              <input
                type="email"
                value={newCoPresenter.email}
                onChange={(e) =>
                  setNewCoPresenter({ ...newCoPresenter, email: e.target.value })
                }
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Email"
              />
              <button
                type="button"
                onClick={addCoPresenter}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Add Co-Presenter
              </button>
            </div>
          </div>

          <div className="flex space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Session'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

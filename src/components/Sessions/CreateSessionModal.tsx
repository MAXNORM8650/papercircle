import { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, Users, FileText, Link as LinkIcon } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useCommunity } from '../../contexts/CommunityContext';
import { useAuth } from '../../contexts/AuthContext';
import { logError, getUserFriendlyErrorMessage } from '../../lib/errorHandling';

interface CreateSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  communityId: string;
  sessionToEdit?: any;
}

interface SessionFormData {
  title: string;
  description: string;
  introduction: string;
  scheduled_for: string;
  duration_minutes: number;
  location: string;
  virtual_link: string;
  parent_session_id: string;
  related_session_ids: string[];
  presenter_ids: string[];
  paper_ids: string[];
}

export function CreateSessionModal({ isOpen, onClose, onSuccess, communityId, sessionToEdit }: CreateSessionModalProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [papers, setPapers] = useState<any[]>([]);

  const [formData, setFormData] = useState<SessionFormData>({
    title: '',
    description: '',
    introduction: '',
    scheduled_for: '',
    duration_minutes: 60,
    location: '',
    virtual_link: '',
    parent_session_id: '',
    related_session_ids: [],
    presenter_ids: [],
    paper_ids: [],
  });

  useEffect(() => {
    if (isOpen) {
      loadData();
      if (sessionToEdit) {
        populateEditData();
      }
    }
  }, [isOpen, sessionToEdit]);

  const loadData = async () => {
    try {
      // Load existing sessions for lineage selection
      const { data: sessionsData } = await supabase
        .from('sessions')
        .select('id, title, scheduled_for')
        .eq('community_id', communityId)
        .order('scheduled_for', { ascending: false });
      setSessions(sessionsData || []);

      // Load community members for presenter assignment
      const { data: membersData } = await supabase
        .from('community_members')
        .select(`
          user_id,
          profiles:user_id (
            id,
            display_name,
            avatar_url
          )
        `)
        .eq('community_id', communityId);
      setMembers(membersData || []);

      // Load community papers
      const { data: papersData } = await supabase
        .from('community_papers')
        .select(`
          paper_id,
          papers:paper_id (
            id,
            title,
            authors
          )
        `)
        .eq('community_id', communityId);
      setPapers(papersData || []);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const populateEditData = () => {
    if (!sessionToEdit) return;

    setFormData({
      title: sessionToEdit.title || '',
      description: sessionToEdit.description || '',
      introduction: sessionToEdit.introduction || '',
      scheduled_for: sessionToEdit.scheduled_for ? new Date(sessionToEdit.scheduled_for).toISOString().slice(0, 16) : '',
      duration_minutes: sessionToEdit.duration_minutes || 60,
      location: sessionToEdit.location || '',
      virtual_link: sessionToEdit.virtual_link || '',
      parent_session_id: sessionToEdit.parent_session_id || '',
      related_session_ids: sessionToEdit.related_sessions || [],
      presenter_ids: sessionToEdit.presenters?.map((p: any) => p.user_id) || [],
      paper_ids: sessionToEdit.papers?.map((p: any) => p.paper_id) || [],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      // Create or update session
      const sessionData = {
        community_id: communityId,
        title: formData.title,
        description: formData.description,
        introduction: formData.introduction,
        scheduled_for: new Date(formData.scheduled_for).toISOString(),
        duration_minutes: formData.duration_minutes,
        location: formData.location,
        virtual_link: formData.virtual_link,
        parent_session_id: formData.parent_session_id || null,
        created_by: sessionToEdit ? undefined : user.id,
      };

      let sessionId: string;

      if (sessionToEdit) {
        // Update existing session
        const { data, error } = await supabase
          .from('sessions')
          .update(sessionData)
          .eq('id', sessionToEdit.id)
          .select()
          .single();

        if (error) throw error;
        sessionId = data.id;

        // Clear existing relationships
        await supabase.from('session_edges').delete().eq('source_session_id', sessionId);
        await supabase.from('session_presenters').delete().eq('session_id', sessionId);
        await supabase.from('session_papers').delete().eq('session_id', sessionId);
      } else {
        // Create new session
        const { data, error } = await supabase
          .from('sessions')
          .insert([sessionData])
          .select()
          .single();

        if (error) throw error;
        sessionId = data.id;
      }

      // Create session edges for lineage
      if (formData.related_session_ids.length > 0) {
        const edges = formData.related_session_ids.map(targetId => ({
          source_session_id: sessionId,
          target_session_id: targetId,
          relationship_type: 'relates_to',
          created_by: user.id,
        }));

        await supabase.from('session_edges').insert(edges);
      }

      // Add presenters (first one is primary)
      if (formData.presenter_ids.length > 0) {
        const presenters = formData.presenter_ids.map((userId, index) => ({
          session_id: sessionId,
          user_id: userId,
          is_primary: index === 0,
        }));

        await supabase.from('session_presenters').insert(presenters);
      }

      // Add papers
      if (formData.paper_ids.length > 0) {
        const sessionPapers = formData.paper_ids.map((paperId, index) => ({
          session_id: sessionId,
          paper_id: paperId,
          order_index: index,
        }));

        await supabase.from('session_papers').insert(sessionPapers);
      }

      onSuccess();
      onClose();
      resetForm();
    } catch (error) {
      logError('CreateSessionModal.handleSubmit', error);
      alert(getUserFriendlyErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      introduction: '',
      scheduled_for: '',
      duration_minutes: 60,
      location: '',
      virtual_link: '',
      parent_session_id: '',
      related_session_ids: [],
      presenter_ids: [],
      paper_ids: [],
    });
  };

  const toggleRelatedSession = (sessionId: string) => {
    setFormData(prev => ({
      ...prev,
      related_session_ids: prev.related_session_ids.includes(sessionId)
        ? prev.related_session_ids.filter(id => id !== sessionId)
        : [...prev.related_session_ids, sessionId],
    }));
  };

  const togglePresenter = (userId: string) => {
    setFormData(prev => ({
      ...prev,
      presenter_ids: prev.presenter_ids.includes(userId)
        ? prev.presenter_ids.filter(id => id !== userId)
        : [...prev.presenter_ids, userId],
    }));
  };

  const togglePaper = (paperId: string) => {
    setFormData(prev => ({
      ...prev,
      paper_ids: prev.paper_ids.includes(paperId)
        ? prev.paper_ids.filter(id => id !== paperId)
        : [...prev.paper_ids, paperId],
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {sessionToEdit ? 'Edit Session' : 'Create New Session'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Basic Information</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Introduction to Neural Networks"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="What will be discussed in this session..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Introduction
              </label>
              <textarea
                value={formData.introduction}
                onChange={e => setFormData(prev => ({ ...prev, introduction: e.target.value }))}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Context for this session..."
              />
            </div>
          </div>

          {/* Scheduling */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Scheduling
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date & Time *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={formData.scheduled_for}
                  onChange={e => setFormData(prev => ({ ...prev, scheduled_for: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (minutes) *
                </label>
                <input
                  type="number"
                  required
                  min="15"
                  step="15"
                  value={formData.duration_minutes}
                  onChange={e => setFormData(prev => ({ ...prev, duration_minutes: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Location
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Physical Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Room 301, Building A"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Virtual Link
                </label>
                <input
                  type="url"
                  value={formData.virtual_link}
                  onChange={e => setFormData(prev => ({ ...prev, virtual_link: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://zoom.us/j/..."
                />
              </div>
            </div>
          </div>

          {/* Lineage */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900 flex items-center gap-2">
              <LinkIcon className="w-5 h-5" />
              Session Lineage
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Parent Session (Continues From)
              </label>
              <select
                value={formData.parent_session_id}
                onChange={e => setFormData(prev => ({ ...prev, parent_session_id: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">None</option>
                {sessions.filter(s => s.id !== sessionToEdit?.id).map(session => (
                  <option key={session.id} value={session.id}>
                    {session.title} ({new Date(session.scheduled_for).toLocaleDateString()})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Related Sessions
              </label>
              <div className="border border-gray-300 rounded-lg p-3 max-h-40 overflow-y-auto space-y-2">
                {sessions.filter(s => s.id !== sessionToEdit?.id).map(session => (
                  <label key={session.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.related_session_ids.includes(session.id)}
                      onChange={() => toggleRelatedSession(session.id)}
                      className="rounded text-blue-600"
                    />
                    <span className="text-sm">
                      {session.title} ({new Date(session.scheduled_for).toLocaleDateString()})
                    </span>
                  </label>
                ))}
                {sessions.filter(s => s.id !== sessionToEdit?.id).length === 0 && (
                  <p className="text-sm text-gray-500">No other sessions available</p>
                )}
              </div>
            </div>
          </div>

          {/* Presenters */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Presenters
            </h3>

            <div className="border border-gray-300 rounded-lg p-3 max-h-40 overflow-y-auto space-y-2">
              {members.map(member => (
                <label key={member.user_id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.presenter_ids.includes(member.user_id)}
                    onChange={() => togglePresenter(member.user_id)}
                    className="rounded text-blue-600"
                  />
                  <span className="text-sm">
                    {member.profiles?.display_name || 'Unknown'}
                    {formData.presenter_ids[0] === member.user_id && (
                      <span className="ml-2 text-xs text-blue-600">(Primary)</span>
                    )}
                  </span>
                </label>
              ))}
              {members.length === 0 && (
                <p className="text-sm text-gray-500">No members available</p>
              )}
            </div>
            <p className="text-xs text-gray-500">First selected presenter will be marked as primary</p>
          </div>

          {/* Papers */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Papers to Discuss
            </h3>

            <div className="border border-gray-300 rounded-lg p-3 max-h-40 overflow-y-auto space-y-2">
              {papers.map(paper => (
                <label key={paper.paper_id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.paper_ids.includes(paper.paper_id)}
                    onChange={() => togglePaper(paper.paper_id)}
                    className="rounded text-blue-600"
                  />
                  <span className="text-sm">
                    {paper.papers?.title || 'Unknown Paper'}
                  </span>
                </label>
              ))}
              {papers.length === 0 && (
                <p className="text-sm text-gray-500">No papers available in this community</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : sessionToEdit ? 'Update Session' : 'Create Session'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

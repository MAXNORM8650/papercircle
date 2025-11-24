import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Search, Trash2, Save, BookOpen, FileText, Link as LinkIcon, Clock } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface SessionPrepViewProps {
  sessionId: string;
  onBack: () => void;
}

interface Paper {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
}

interface SessionPaper {
  id: string;
  paper_id: string;
  paper_type: string;
  display_order: number;
  presenter_notes: string;
  estimated_time_minutes: number;
  paper?: Paper;
}

interface Resource {
  id?: string;
  resource_type: string;
  title: string;
  description: string;
  url: string;
}

export function SessionPrepView({ sessionId, onBack }: SessionPrepViewProps) {
  const { user } = useAuth();
  const [sessionPapers, setSessionPapers] = useState<SessionPaper[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [availablePapers, setAvailablePapers] = useState<Paper[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [sessionTitle, setSessionTitle] = useState('');

  const [showAddPaper, setShowAddPaper] = useState(false);
  const [showAddResource, setShowAddResource] = useState(false);

  const [newPaper, setNewPaper] = useState({
    paper_id: '',
    paper_type: 'main' as 'main' | 'related' | 'background' | 'followup',
    presenter_notes: '',
    estimated_time_minutes: 15,
  });

  const [newResource, setNewResource] = useState<Resource>({
    resource_type: 'slides',
    title: '',
    description: '',
    url: '',
  });

  useEffect(() => {
    loadSessionData();
    searchPapers();
  }, [sessionId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      searchPapers();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const loadSessionData = async () => {
    setLoading(true);

    const { data: session } = await supabase
      .from('sessions')
      .select('title')
      .eq('id', sessionId)
      .maybeSingle();

    if (session) {
      setSessionTitle(session.title);
    }

    const { data: papers } = await supabase
      .from('session_papers')
      .select(`
        id,
        paper_id,
        paper_type,
        display_order,
        presenter_notes,
        estimated_time_minutes,
        paper:papers(id, title, authors, abstract)
      `)
      .eq('session_id', sessionId)
      .order('display_order');

    if (papers) {
      setSessionPapers(papers as any);
    }

    const { data: resourcesData } = await supabase
      .from('session_resources')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: false });

    if (resourcesData) {
      setResources(resourcesData);
    }

    setLoading(false);
  };

  const searchPapers = async () => {
    let query = supabase
      .from('papers')
      .select('id, title, authors, abstract')
      .order('created_at', { ascending: false })
      .limit(20);

    if (searchQuery) {
      query = query.or(`title.ilike.%${searchQuery}%,abstract.ilike.%${searchQuery}%`);
    }

    const { data } = await query;
    if (data) {
      setAvailablePapers(data);
    }
  };

  const addPaperToSession = async () => {
    if (!newPaper.paper_id) return;

    setSaving(true);
    const { error } = await supabase.from('session_papers').insert({
      session_id: sessionId,
      paper_id: newPaper.paper_id,
      paper_type: newPaper.paper_type,
      display_order: sessionPapers.length,
      presenter_notes: newPaper.presenter_notes,
      estimated_time_minutes: newPaper.estimated_time_minutes,
    });

    if (error) {
      alert('Error adding paper: ' + error.message);
    } else {
      setNewPaper({
        paper_id: '',
        paper_type: 'main',
        presenter_notes: '',
        estimated_time_minutes: 15,
      });
      setShowAddPaper(false);
      loadSessionData();
    }
    setSaving(false);
  };

  const removePaper = async (paperId: string) => {
    const { error } = await supabase
      .from('session_papers')
      .delete()
      .eq('id', paperId);

    if (error) {
      alert('Error removing paper: ' + error.message);
    } else {
      loadSessionData();
    }
  };

  const updatePaperNotes = async (paperId: string, notes: string) => {
    const { error } = await supabase
      .from('session_papers')
      .update({ presenter_notes: notes })
      .eq('id', paperId);

    if (!error) {
      setSessionPapers(sessionPapers.map(p =>
        p.id === paperId ? { ...p, presenter_notes: notes } : p
      ));
    }
  };

  const updatePaperTime = async (paperId: string, minutes: number) => {
    const { error } = await supabase
      .from('session_papers')
      .update({ estimated_time_minutes: minutes })
      .eq('id', paperId);

    if (!error) {
      setSessionPapers(sessionPapers.map(p =>
        p.id === paperId ? { ...p, estimated_time_minutes: minutes } : p
      ));
    }
  };

  const addResource = async () => {
    if (!newResource.title || !user) return;

    setSaving(true);
    const { error } = await supabase.from('session_resources').insert({
      session_id: sessionId,
      resource_type: newResource.resource_type,
      title: newResource.title,
      description: newResource.description,
      url: newResource.url,
      created_by: user.id,
    });

    if (error) {
      alert('Error adding resource: ' + error.message);
    } else {
      setNewResource({
        resource_type: 'slides',
        title: '',
        description: '',
        url: '',
      });
      setShowAddResource(false);
      loadSessionData();
    }
    setSaving(false);
  };

  const removeResource = async (resourceId: string) => {
    const { error } = await supabase
      .from('session_resources')
      .delete()
      .eq('id', resourceId);

    if (error) {
      alert('Error removing resource: ' + error.message);
    } else {
      loadSessionData();
    }
  };

  const getPaperTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      main: 'Main Paper',
      related: 'Related Work',
      background: 'Background Reading',
      followup: 'Follow-up Paper',
    };
    return labels[type] || type;
  };

  const getPaperTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      main: 'bg-blue-100 text-blue-800',
      related: 'bg-green-100 text-green-800',
      background: 'bg-gray-100 text-gray-800',
      followup: 'bg-orange-100 text-orange-800',
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getTotalTime = () => {
    return sessionPapers.reduce((sum, p) => sum + (p.estimated_time_minutes || 0), 0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button onClick={onBack} className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6">
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Session</span>
      </button>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Prepare Session</h1>
        <p className="text-gray-600 mb-4">{sessionTitle}</p>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          <span>Total estimated time: {getTotalTime()} minutes</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <span>Papers</span>
            </h2>
            <button
              onClick={() => setShowAddPaper(!showAddPaper)}
              className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <Plus className="h-4 w-4" />
              <span>Add Paper</span>
            </button>
          </div>

          {showAddPaper && (
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Papers
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Search by title or keywords..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Paper
                </label>
                <select
                  value={newPaper.paper_id}
                  onChange={(e) => setNewPaper({ ...newPaper, paper_id: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Choose a paper...</option>
                  {availablePapers.map((paper) => (
                    <option key={paper.id} value={paper.id}>
                      {paper.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Paper Type
                  </label>
                  <select
                    value={newPaper.paper_type}
                    onChange={(e) => setNewPaper({ ...newPaper, paper_type: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="main">Main Paper</option>
                    <option value="related">Related Work</option>
                    <option value="background">Background Reading</option>
                    <option value="followup">Follow-up Paper</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time (minutes)
                  </label>
                  <input
                    type="number"
                    value={newPaper.estimated_time_minutes}
                    onChange={(e) => setNewPaper({ ...newPaper, estimated_time_minutes: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="5"
                    step="5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Presenter Notes
                </label>
                <textarea
                  value={newPaper.presenter_notes}
                  onChange={(e) => setNewPaper({ ...newPaper, presenter_notes: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={2}
                  placeholder="Key points to cover, questions to discuss..."
                />
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={addPaperToSession}
                  disabled={!newPaper.paper_id || saving}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
                >
                  {saving ? 'Adding...' : 'Add Paper'}
                </button>
                <button
                  onClick={() => setShowAddPaper(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : sessionPapers.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No papers added yet</p>
              <p className="text-sm text-gray-500 mt-1">Click Add Paper to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sessionPapers.map((sessionPaper) => (
                <div key={sessionPaper.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getPaperTypeBadge(sessionPaper.paper_type)}`}>
                          {getPaperTypeLabel(sessionPaper.paper_type)}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {sessionPaper.paper?.title || 'Paper'}
                      </h3>
                    </div>
                    <button
                      onClick={() => removePaper(sessionPaper.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mb-3">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Estimated Time (minutes)
                    </label>
                    <input
                      type="number"
                      value={sessionPaper.estimated_time_minutes}
                      onChange={(e) => updatePaperTime(sessionPaper.id, parseInt(e.target.value))}
                      className="w-full px-3 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="5"
                      step="5"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Presenter Notes
                    </label>
                    <textarea
                      value={sessionPaper.presenter_notes || ''}
                      onChange={(e) => updatePaperNotes(sessionPaper.id, e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      placeholder="Key points, questions, discussion topics..."
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Resources & Materials</span>
            </h2>
            <button
              onClick={() => setShowAddResource(!showAddResource)}
              className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <Plus className="h-4 w-4" />
              <span>Add Resource</span>
            </button>
          </div>

          {showAddResource && (
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resource Type
                </label>
                <select
                  value={newResource.resource_type}
                  onChange={(e) => setNewResource({ ...newResource, resource_type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="slides">Slides</option>
                  <option value="notes">Notes</option>
                  <option value="recording">Recording</option>
                  <option value="code">Code</option>
                  <option value="dataset">Dataset</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={newResource.title}
                  onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Presentation Slides"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL / Link
                </label>
                <input
                  type="url"
                  value={newResource.url}
                  onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newResource.description}
                  onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={2}
                  placeholder="Brief description of the resource..."
                />
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={addResource}
                  disabled={!newResource.title || saving}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
                >
                  {saving ? 'Adding...' : 'Add Resource'}
                </button>
                <button
                  onClick={() => setShowAddResource(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {resources.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No resources added yet</p>
              <p className="text-sm text-gray-500 mt-1">Add slides, notes, or other materials</p>
            </div>
          ) : (
            <div className="space-y-3">
              {resources.map((resource) => (
                <div key={resource.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                          {resource.resource_type}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{resource.title}</h3>
                      {resource.description && (
                        <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                      )}
                      {resource.url && (
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                        >
                          <LinkIcon className="h-3 w-3" />
                          <span>Open Link</span>
                        </a>
                      )}
                    </div>
                    <button
                      onClick={() => resource.id && removeResource(resource.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

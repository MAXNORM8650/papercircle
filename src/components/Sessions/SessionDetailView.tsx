import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, Users, Video, Edit, FileText, BookOpen, Link as LinkIcon, Plus, Trash2, Save, Brain } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { SessionAnalysisView } from './SessionAnalysisView';
import type { Database } from '../../lib/database.types';

type Session = Database['public']['Tables']['sessions']['Row'] & {
  presenter?: { display_name: string } | null;
  community?: { name: string } | null;
};

type SessionPaper = {
  id: string;
  paper_id: string;
  paper_type: string;
  display_order: number;
  presenter_notes: string | null;
  estimated_time_minutes: number;
  paper?: {
    title: string;
    authors: string[];
    abstract: string;
  } | null;
};

type SessionResource = {
  id: string;
  resource_type: string;
  title: string;
  description: string | null;
  url: string | null;
  created_at: string;
};

interface SessionDetailViewProps {
  sessionId: string;
  onBack: () => void;
}

export function SessionDetailView({ sessionId, onBack }: SessionDetailViewProps) {
  const { user } = useAuth();
  const [session, setSession] = useState<Session | null>(null);
  const [papers, setPapers] = useState<SessionPaper[]>([]);
  const [resources, setResources] = useState<SessionResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPresenter, setIsPresenter] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);

  useEffect(() => {
    loadSessionDetails();
  }, [sessionId]);

  const loadSessionDetails = async () => {
    setLoading(true);

    const { data: sessionData } = await supabase
      .from('sessions')
      .select(`
        *,
        presenter:profiles!sessions_presenter_id_fkey(display_name),
        community:communities(name)
      `)
      .eq('id', sessionId)
      .maybeSingle();

    if (sessionData) {
      setSession(sessionData);
      setIsPresenter(
        user?.id === sessionData.created_by ||
        user?.id === sessionData.presenter_id
      );
    }

    const { data: papersData } = await supabase
      .from('session_papers')
      .select(`
        id,
        paper_id,
        paper_type,
        display_order,
        presenter_notes,
        estimated_time_minutes,
        paper:papers(title, authors, abstract)
      `)
      .eq('session_id', sessionId)
      .order('display_order');

    if (papersData) {
      setPapers(papersData as any);
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
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

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'slides': return FileText;
      case 'notes': return Edit;
      case 'recording': return Video;
      case 'code': return FileText;
      case 'dataset': return FileText;
      default: return LinkIcon;
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading session...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button onClick={onBack} className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4">
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Sessions</span>
        </button>
        <div className="text-center py-12">
          <p className="text-gray-600">Session not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button onClick={onBack} className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6">
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Sessions</span>
      </button>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{session.title}</h1>
              {session.community && (
                <p className="text-gray-600 mb-2">
                  Circle: <span className="font-medium">{session.community.name}</span>
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAnalysis(!showAnalysis)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  showAnalysis
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                }`}
              >
                <Brain className="h-5 w-5" />
                {showAnalysis ? 'Hide Analysis' : 'Paper Analysis'}
              </button>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  session.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : session.status === 'cancelled'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {session.status}
              </span>
            </div>
          </div>

          {session.description && (
            <p className="text-gray-700 mb-4">{session.description}</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(session.scheduled_at)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>
                {formatTime(session.scheduled_at)} ({session.duration_minutes} min)
              </span>
            </div>
            {session.location && (
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>{session.location}</span>
              </div>
            )}
            {session.presenter && (
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Presenter: {session.presenter.display_name}</span>
              </div>
            )}
          </div>

          {session.virtual_link && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <a
                href={session.virtual_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Video className="h-4 w-4" />
                <span>Join Virtual Meeting</span>
              </a>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <span>Papers</span>
            </h2>
          </div>

          {papers.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No papers added yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {papers.map((sessionPaper) => (
                <div key={sessionPaper.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getPaperTypeBadge(sessionPaper.paper_type)}`}>
                          {getPaperTypeLabel(sessionPaper.paper_type)}
                        </span>
                        {sessionPaper.estimated_time_minutes > 0 && (
                          <span className="text-xs text-gray-500">
                            <Clock className="inline h-3 w-3" /> {sessionPaper.estimated_time_minutes} min
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {sessionPaper.paper?.title || 'Paper'}
                      </h3>
                      {sessionPaper.paper?.authors && (
                        <p className="text-sm text-gray-600 mb-2">
                          {sessionPaper.paper.authors.join(', ')}
                        </p>
                      )}
                      {sessionPaper.presenter_notes && (
                        <div className="mt-2 p-3 bg-yellow-50 rounded border border-yellow-200">
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Notes: </span>
                            {sessionPaper.presenter_notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Resources & Materials</span>
            </h2>
          </div>

          {resources.length === 0 ? (
            <div className="text-center py-8 bg-white rounded-lg border border-gray-200">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No resources added yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resources.map((resource) => {
                const Icon = getResourceIcon(resource.resource_type);
                return (
                  <div key={resource.id} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Icon className="h-5 w-5 text-gray-600 mt-1" />
                      <div className="flex-1">
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
                            <span>Open Resource</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {session.co_presenters && Array.isArray(session.co_presenters) && session.co_presenters.length > 0 && (
          <div className="p-6 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Co-Presenters</span>
            </h2>
            <div className="space-y-3">
              {session.co_presenters.map((coPresenter: any, index: number) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{coPresenter.name}</p>
                    <p className="text-sm text-gray-600">{coPresenter.email}</p>
                    {coPresenter.bio && (
                      <p className="text-sm text-gray-500 mt-1">{coPresenter.bio}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Paper Analysis Section */}
      {showAnalysis && papers.length > 0 && (
        <div className="mt-6">
          <SessionAnalysisView
            sessionId={sessionId}
            communityId={session.community_id || undefined}
          />
        </div>
      )}
    </div>
  );
}

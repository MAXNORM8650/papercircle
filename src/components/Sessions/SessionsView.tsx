import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, CheckCircle, Plus, Video, Edit } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { CreateSessionModal } from './CreateSessionModal';
import { SessionDetailView } from './SessionDetailView';
import { SessionPrepView } from './SessionPrepView';
import type { Database } from '../../lib/database.types';

type Session = Database['public']['Tables']['sessions']['Row'] & {
  presenter?: { display_name: string } | null;
  paper?: { title: string } | null;
  rsvp_count?: number;
  user_rsvp?: string | null;
};

type View = 'list' | 'detail' | 'prep';

interface SessionsViewProps {
  onSelectSession?: (sessionId: string) => void;
}

export function SessionsView({ onSelectSession }: SessionsViewProps) {
  const { user, profile } = useAuth();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [filter, setFilter] = useState<'upcoming' | 'past' | 'all'>('upcoming');
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentView, setCurrentView] = useState<View>('list');
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  useEffect(() => {
    loadSessions();
  }, [filter]);

  const loadSessions = async () => {
    setLoading(true);
    let query = supabase
      .from('sessions')
      .select(`
        *,
        presenter:profiles!sessions_presenter_id_fkey(display_name),
        paper:papers(title)
      `);

    const now = new Date().toISOString();
    if (filter === 'upcoming') {
      query = query.gte('scheduled_at', now).order('scheduled_at', { ascending: true });
    } else if (filter === 'past') {
      query = query.lt('scheduled_at', now).order('scheduled_at', { ascending: false });
    } else {
      query = query.order('scheduled_at', { ascending: false });
    }

    const { data } = await query;

    if (data) {
      const sessionsWithRsvps = await Promise.all(
        data.map(async (session) => {
          const { count } = await supabase
            .from('rsvps')
            .select('*', { count: 'exact', head: true })
            .eq('session_id', session.id)
            .eq('status', 'attending');

          let userRsvp = null;
          if (user) {
            const { data: rsvpData } = await supabase
              .from('rsvps')
              .select('status')
              .eq('session_id', session.id)
              .eq('user_id', user.id)
              .maybeSingle();
            userRsvp = rsvpData?.status || null;
          }

          return {
            ...session,
            rsvp_count: count || 0,
            user_rsvp: userRsvp,
          };
        })
      );

      setSessions(sessionsWithRsvps);
    }
    setLoading(false);
  };

  const handleRSVP = async (sessionId: string, status: 'attending' | 'maybe' | 'not_attending') => {
    if (!user) return;

    const { data: existing } = await supabase
      .from('rsvps')
      .select('id')
      .eq('session_id', sessionId)
      .eq('user_id', user.id)
      .maybeSingle();

    if (existing) {
      await supabase
        .from('rsvps')
        .update({ status })
        .eq('id', existing.id);
    } else {
      await supabase.from('rsvps').insert({
        session_id: sessionId,
        user_id: user.id,
        status,
      });
    }

    loadSessions();
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

  const isUpcoming = (dateString: string) => {
    return new Date(dateString) > new Date();
  };

  const canCreateSession = profile?.role === 'admin' || profile?.role === 'presenter';

  const handleSessionClick = (sessionId: string) => {
    setSelectedSessionId(sessionId);
    setCurrentView('detail');
    if (onSelectSession) {
      onSelectSession(sessionId);
    }
  };

  const handlePrepareSession = (sessionId: string) => {
    setSelectedSessionId(sessionId);
    setCurrentView('prep');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedSessionId(null);
    loadSessions();
  };

  const isSessionOwner = (session: Session) => {
    return user && (user.id === session.created_by || user.id === session.presenter_id);
  };

  if (currentView === 'detail' && selectedSessionId) {
    return <SessionDetailView sessionId={selectedSessionId} onBack={handleBackToList} />;
  }

  if (currentView === 'prep' && selectedSessionId) {
    return <SessionPrepView sessionId={selectedSessionId} onBack={handleBackToList} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reading Group Sessions</h1>
          <p className="text-gray-600">Join discussions and learn from the community</p>
        </div>
        {canCreateSession && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Plus className="h-5 w-5" />
            <span>Create Session</span>
          </button>
        )}
      </div>

      <div className="mb-6 flex space-x-2">
        {(['upcoming', 'past', 'all'] as const).map((filterOption) => (
          <button
            key={filterOption}
            onClick={() => setFilter(filterOption)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === filterOption
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading sessions...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sessions.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No {filter === 'all' ? '' : filter} sessions found.</p>
            </div>
          ) : (
            sessions.map((session) => (
              <div
                key={session.id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3
                      className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors cursor-pointer"
                      onClick={() => handleSessionClick(session.id)}
                    >
                      {session.title}
                    </h3>
                    {session.paper && (
                      <p className="text-gray-600 mb-2">
                        Paper: <span className="font-medium">{session.paper.title}</span>
                      </p>
                    )}
                    {session.description && (
                      <p className="text-gray-700 mb-3">{session.description}</p>
                    )}
                  </div>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 text-sm text-gray-600">
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

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{session.rsvp_count} attending</span>
                    </span>
                    {session.virtual_link && (
                      <a
                        href={session.virtual_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                      >
                        <Video className="h-4 w-4" />
                        <span>Join Meeting</span>
                      </a>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    {isSessionOwner(session) && (
                      <button
                        onClick={() => handlePrepareSession(session.id)}
                        className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium flex items-center space-x-1"
                      >
                        <Edit className="h-4 w-4" />
                        <span>Prepare</span>
                      </button>
                    )}
                    {user && isUpcoming(session.scheduled_at) && (
                      <button
                        onClick={() => handleRSVP(session.id, 'attending')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          session.user_rsvp === 'attending'
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {session.user_rsvp === 'attending' ? (
                          <span className="flex items-center space-x-1">
                            <CheckCircle className="h-4 w-4" />
                            <span>Attending</span>
                          </span>
                        ) : (
                          'RSVP'
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {showCreateModal && (
        <CreateSessionModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            loadSessions();
            setShowCreateModal(false);
          }}
        />
      )}
    </div>
  );
}

import { useState, useEffect } from 'react';
import { BookMarked, Calendar, MessageSquare, Award } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import type { Database } from '../../lib/database.types';

type SavedPaper = {
  paper: Database['public']['Tables']['papers']['Row'];
  notes: string | null;
  created_at: string;
};

type UserSession = Database['public']['Tables']['sessions']['Row'] & {
  paper?: { title: string } | null;
};

export function DashboardView() {
  const { user, profile } = useAuth();
  const [savedPapers, setSavedPapers] = useState<SavedPaper[]>([]);
  const [upcomingSessions, setUpcomingSessions] = useState<UserSession[]>([]);
  const [stats, setStats] = useState({
    savedCount: 0,
    sessionsAttended: 0,
    commentsPosted: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    if (!user) return;

    const [savedResult, sessionsResult, statsResult] = await Promise.all([
      supabase
        .from('saved_papers')
        .select('notes, created_at, paper:papers(*)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5),

      supabase
        .from('rsvps')
        .select(`
          session:sessions(*, paper:papers(title))
        `)
        .eq('user_id', user.id)
        .eq('status', 'attending'),

      Promise.all([
        supabase
          .from('saved_papers')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id),
        supabase
          .from('rsvps')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .eq('checked_in', true),
        supabase
          .from('discussions')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id),
      ]),
    ]);

    if (savedResult.data) {
      setSavedPapers(
        savedResult.data.map((item) => ({
          paper: item.paper,
          notes: item.notes,
          created_at: item.created_at,
        }))
      );
    }

    if (sessionsResult.data) {
      const now = new Date().toISOString();
      setUpcomingSessions(
        sessionsResult.data
          .map((item) => item.session)
          .filter((s): s is UserSession => s !== null && s.scheduled_for >= now)
          .sort((a, b) => a.scheduled_for.localeCompare(b.scheduled_for))
          .slice(0, 5)
      );
    }

    setStats({
      savedCount: statsResult[0].count || 0,
      sessionsAttended: statsResult[1].count || 0,
      commentsPosted: statsResult[2].count || 0,
    });

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {profile?.display_name}
        </h1>
        <p className="text-gray-600">Your reading group activity and saved papers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-2">
            <BookMarked className="h-8 w-8 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Saved Papers</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.savedCount}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-2">
            <Calendar className="h-8 w-8 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Sessions Attended</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.sessionsAttended}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-2">
            <MessageSquare className="h-8 w-8 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Comments</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.commentsPosted}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Upcoming Sessions</span>
          </h2>

          {upcomingSessions.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No upcoming sessions</p>
          ) : (
            <div className="space-y-3">
              {upcomingSessions.map((session) => (
                <div
                  key={session.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 mb-1">{session.title}</h3>
                  {session.paper && (
                    <p className="text-sm text-gray-600 mb-2">{session.paper.title}</p>
                  )}
                  <p className="text-sm text-gray-500">
                    {new Date(session.scheduled_at).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <BookMarked className="h-5 w-5" />
            <span>Recently Saved Papers</span>
          </h2>

          {savedPapers.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No saved papers yet</p>
          ) : (
            <div className="space-y-3">
              {savedPapers.map((item) => (
                <div
                  key={item.paper.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                    {item.paper.title}
                  </h3>
                  {Array.isArray(item.paper.authors) && item.paper.authors.length > 0 && (
                    <p className="text-sm text-gray-600 mb-1">
                      {(item.paper.authors as any[]).slice(0, 2).join(', ')}
                      {item.paper.authors.length > 2 ? ', et al.' : ''}
                    </p>
                  )}
                  {item.notes && (
                    <p className="text-sm text-gray-500 italic mt-2 line-clamp-2">
                      {item.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

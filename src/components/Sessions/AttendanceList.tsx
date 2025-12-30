import { useState, useEffect } from 'react';
import { CheckCircle, Circle, HelpCircle, User } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface AttendanceListProps {
  sessionId: string;
}

type RSVPStatus = 'going' | 'maybe' | 'not_going';

interface RSVP {
  id: string;
  user_id: string;
  status: RSVPStatus;
  checked_in: boolean;
  checked_in_at: string | null;
  profiles: {
    display_name: string;
    avatar_url: string | null;
  };
}

export function AttendanceList({ sessionId }: AttendanceListProps) {
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [filter, setFilter] = useState<RSVPStatus | 'all' | 'checked_in'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRSVPs();

    // Subscribe to RSVP changes
    const channel = supabase
      .channel(`session_rsvps_${sessionId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'session_rsvps',
          filter: `session_id=eq.${sessionId}`,
        },
        () => {
          loadRSVPs();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId]);

  const loadRSVPs = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('session_rsvps')
        .select(`
          id,
          user_id,
          status,
          checked_in,
          checked_in_at,
          profiles:user_id (
            display_name,
            avatar_url
          )
        `)
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setRsvps(data || []);
    } catch (error) {
      console.error('Error loading RSVPs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRsvps = rsvps.filter(rsvp => {
    if (filter === 'all') return true;
    if (filter === 'checked_in') return rsvp.checked_in;
    return rsvp.status === filter;
  });

  const getStatusIcon = (status: RSVPStatus) => {
    switch (status) {
      case 'going':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'maybe':
        return <HelpCircle className="w-5 h-5 text-yellow-600" />;
      case 'not_going':
        return <Circle className="w-5 h-5 text-red-600" />;
    }
  };

  const getStatusLabel = (status: RSVPStatus) => {
    switch (status) {
      case 'going':
        return 'Going';
      case 'maybe':
        return 'Maybe';
      case 'not_going':
        return "Can't Go";
    }
  };

  const stats = {
    total: rsvps.length,
    going: rsvps.filter(r => r.status === 'going').length,
    maybe: rsvps.filter(r => r.status === 'maybe').length,
    not_going: rsvps.filter(r => r.status === 'not_going').length,
    checked_in: rsvps.filter(r => r.checked_in).length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-gray-500">Loading attendance...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-600">Total RSVPs</div>
        </div>
        <div className="bg-green-50 rounded-lg p-3">
          <div className="text-2xl font-bold text-green-900">{stats.going}</div>
          <div className="text-sm text-green-700">Going</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-3">
          <div className="text-2xl font-bold text-yellow-900">{stats.maybe}</div>
          <div className="text-sm text-yellow-700">Maybe</div>
        </div>
        <div className="bg-red-50 rounded-lg p-3">
          <div className="text-2xl font-bold text-red-900">{stats.not_going}</div>
          <div className="text-sm text-red-700">Can't Go</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="text-2xl font-bold text-blue-900">{stats.checked_in}</div>
          <div className="text-sm text-blue-700">Checked In</div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'all'
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All ({stats.total})
        </button>
        <button
          onClick={() => setFilter('going')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'going'
              ? 'bg-green-600 text-white'
              : 'bg-green-50 text-green-700 hover:bg-green-100'
          }`}
        >
          Going ({stats.going})
        </button>
        <button
          onClick={() => setFilter('maybe')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'maybe'
              ? 'bg-yellow-600 text-white'
              : 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
          }`}
        >
          Maybe ({stats.maybe})
        </button>
        <button
          onClick={() => setFilter('not_going')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'not_going'
              ? 'bg-red-600 text-white'
              : 'bg-red-50 text-red-700 hover:bg-red-100'
          }`}
        >
          Can't Go ({stats.not_going})
        </button>
        <button
          onClick={() => setFilter('checked_in')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'checked_in'
              ? 'bg-blue-600 text-white'
              : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
          }`}
        >
          Checked In ({stats.checked_in})
        </button>
      </div>

      {/* Attendees List */}
      <div className="bg-white border border-gray-200 rounded-lg divide-y">
        {filteredRsvps.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No RSVPs {filter !== 'all' && `with status "${filter}"`}
          </div>
        ) : (
          filteredRsvps.map(rsvp => (
            <div key={rsvp.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-3">
                {rsvp.profiles?.avatar_url ? (
                  <img
                    src={rsvp.profiles.avatar_url}
                    alt={rsvp.profiles.display_name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-500" />
                  </div>
                )}
                <div>
                  <div className="font-medium text-gray-900">
                    {rsvp.profiles?.display_name || 'Unknown User'}
                  </div>
                  {rsvp.checked_in && rsvp.checked_in_at && (
                    <div className="text-xs text-gray-500">
                      Checked in {new Date(rsvp.checked_in_at).toLocaleString()}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {getStatusIcon(rsvp.status)}
                  <span className="text-sm text-gray-600">{getStatusLabel(rsvp.status)}</span>
                </div>
                {rsvp.checked_in && (
                  <div className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                    Attended
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

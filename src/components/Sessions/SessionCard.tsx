import { Calendar, Clock, MapPin, Users, CheckCircle, Circle, HelpCircle, UserPlus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { SessionInviteModal } from './SessionInviteModal';

interface SessionCardProps {
  session: any;
  onSelectSession?: (sessionId: string) => void;
  onRSVPChange?: () => void;
  showRSVPButtons?: boolean;
}

export function SessionCard({ session, onSelectSession, onRSVPChange, showRSVPButtons = true }: SessionCardProps) {
  const { user } = useAuth();
  const [rsvpStatus, setRsvpStatus] = useState<'going' | 'maybe' | 'not_going' | null>(null);
  const [attendanceStats, setAttendanceStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [presenters, setPresenters] = useState<any[]>([]);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [canInvite, setCanInvite] = useState(false);

  useEffect(() => {
    if (user && showRSVPButtons) {
      loadRSVPStatus();
    }
    loadAttendanceStats();
    loadPresenters();
    checkCanInvite();
  }, [session.id, user]);

  const checkCanInvite = async () => {
    if (!user) {
      setCanInvite(false);
      return;
    }

    // Check if user is creator
    if (session.created_by === user.id) {
      setCanInvite(true);
      return;
    }

    // Check if user is presenter
    try {
      const { data } = await supabase
        .from('session_presenters')
        .select('id')
        .eq('session_id', session.id)
        .eq('user_id', user.id)
        .single();

      setCanInvite(!!data);
    } catch (error) {
      setCanInvite(false);
    }
  };

  const loadRSVPStatus = async () => {
    if (!user) return;

    try {
      const { data } = await supabase
        .from('session_rsvps')
        .select('status')
        .eq('session_id', session.id)
        .eq('user_id', user.id)
        .single();

      setRsvpStatus(data?.status || null);
    } catch (error) {
      console.error('Error loading RSVP status:', error);
    }
  };

  const loadAttendanceStats = async () => {
    try {
      const { data, error } = await supabase.rpc('get_session_attendance_stats', {
        p_session_id: session.id,
      });

      if (!error && data) {
        setAttendanceStats(data);
      }
    } catch (error) {
      console.error('Error loading attendance stats:', error);
    }
  };

  const loadPresenters = async () => {
    try {
      const { data } = await supabase
        .from('session_presenters')
        .select(`
          is_primary,
          profiles:user_id (
            display_name,
            avatar_url
          )
        `)
        .eq('session_id', session.id)
        .order('is_primary', { ascending: false });

      setPresenters(data || []);
    } catch (error) {
      console.error('Error loading presenters:', error);
    }
  };

  const handleRSVP = async (status: 'going' | 'maybe' | 'not_going') => {
    if (!user) {
      alert('Please sign in to RSVP');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('session_rsvps')
        .upsert({
          session_id: session.id,
          user_id: user.id,
          status: status,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'session_id,user_id',
        });

      if (error) throw error;

      setRsvpStatus(status);
      loadAttendanceStats();
      onRSVPChange?.();
    } catch (error) {
      console.error('Error updating RSVP:', error);
      alert('Failed to update RSVP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('session_rsvps')
        .update({
          checked_in: true,
          checked_in_at: new Date().toISOString(),
        })
        .eq('session_id', session.id)
        .eq('user_id', user.id);

      if (error) throw error;

      loadAttendanceStats();
      onRSVPChange?.();
      alert('Checked in successfully!');
    } catch (error) {
      console.error('Error checking in:', error);
      alert('Failed to check in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isUpcoming = new Date(session.scheduled_for) > new Date();
  const isToday = new Date(session.scheduled_for).toDateString() === new Date().toDateString();
  const canCheckIn = isToday && rsvpStatus === 'going';

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3
            className="text-lg font-semibold text-gray-900 cursor-pointer hover:text-blue-600"
            onClick={() => onSelectSession?.(session.id)}
          >
            {session.title}
          </h3>
          {session.introduction && (
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{session.introduction}</p>
          )}
        </div>
        {isUpcoming && (
          <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
            Upcoming
          </span>
        )}
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{new Date(session.scheduled_for).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</span>
        </div>

        {session.duration_minutes && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{session.duration_minutes} minutes</span>
          </div>
        )}

        {(session.location || session.virtual_link) && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>
              {session.location || 'Virtual'}
              {session.virtual_link && (
                <a
                  href={session.virtual_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-blue-600 hover:underline"
                >
                  Join Link
                </a>
              )}
            </span>
          </div>
        )}

        {presenters.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="w-4 h-4" />
            <span>
              {presenters.map((p, i) => (
                <span key={i}>
                  {p.profiles?.display_name || 'Unknown'}
                  {p.is_primary && <span className="text-xs ml-1">(Lead)</span>}
                  {i < presenters.length - 1 && ', '}
                </span>
              ))}
            </span>
          </div>
        )}
      </div>

      {attendanceStats && (
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3 pb-3 border-b">
          <span className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-green-600" />
            {attendanceStats.going || 0} Going
          </span>
          <span className="flex items-center gap-1">
            <HelpCircle className="w-4 h-4 text-yellow-600" />
            {attendanceStats.maybe || 0} Maybe
          </span>
          {!isUpcoming && (
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4 text-blue-600" />
              {attendanceStats.checked_in || 0} Attended
            </span>
          )}
        </div>
      )}

      {showRSVPButtons && user && isUpcoming && (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleRSVP('going')}
            disabled={loading}
            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              rsvpStatus === 'going'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-700'
            }`}
          >
            <CheckCircle className="w-4 h-4 inline mr-1" />
            Going
          </button>
          <button
            onClick={() => handleRSVP('maybe')}
            disabled={loading}
            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              rsvpStatus === 'maybe'
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-yellow-50 hover:text-yellow-700'
            }`}
          >
            <HelpCircle className="w-4 h-4 inline mr-1" />
            Maybe
          </button>
          <button
            onClick={() => handleRSVP('not_going')}
            disabled={loading}
            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              rsvpStatus === 'not_going'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-700'
            }`}
          >
            <Circle className="w-4 h-4 inline mr-1" />
            Can't Go
          </button>
        </div>
      )}

      {canCheckIn && (
        <button
          onClick={handleCheckIn}
          disabled={loading}
          className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          Check In
        </button>
      )}

      {canInvite && isUpcoming && (
        <button
          onClick={() => setShowInviteModal(true)}
          className="w-full mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          Invite to Session
        </button>
      )}

      {showInviteModal && (
        <SessionInviteModal
          isOpen={showInviteModal}
          onClose={() => setShowInviteModal(false)}
          sessionId={session.id}
          sessionTitle={session.title}
          sessionDate={session.scheduled_for}
        />
      )}
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Calendar, Clock, Users, CheckCircle, XCircle, Loader } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { logError, getUserFriendlyErrorMessage } from '../../lib/errorHandling';

interface InviteAcceptSessionProps {
  inviteCode: string;
  onSuccess?: (sessionId: string) => void;
  onCancel?: () => void;
}

interface InvitationDetails {
  sessionId: string;
  sessionTitle: string;
  sessionDate: string;
  sessionLocation?: string;
  inviterName: string;
  message?: string;
  communityName: string;
  isExpired: boolean;
  isValid: boolean;
}

export function InviteAcceptSession({ inviteCode, onSuccess, onCancel }: InviteAcceptSessionProps) {
  const { user } = useAuth();
  const [invitation, setInvitation] = useState<InvitationDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    loadInvitationDetails();
  }, [inviteCode]);

  const loadInvitationDetails = async () => {
    setLoading(true);
    setError(null);

    try {
      // Use RPC function to get invitation details (bypasses RLS)
      const { data: inviteData, error: inviteError } = await supabase
        .rpc('get_session_invitation_details', {
          invitation_code: inviteCode,
        });

      if (inviteError) {
        logError('InviteAcceptSession.loadInvitationDetails', inviteError);
        setError(getUserFriendlyErrorMessage(inviteError));
        return;
      }

      if (!inviteData || !inviteData.success) {
        setError(inviteData?.error || 'Invalid invitation code');
        return;
      }

      // Check if invitation is valid
      const isExpired = inviteData.is_expired;
      const isMaxedOut = inviteData.is_maxed_out;
      const isValid = inviteData.is_active && !isExpired && !isMaxedOut;

      setInvitation({
        sessionId: inviteData.session_id,
        sessionTitle: inviteData.session_title || 'Unknown Session',
        sessionDate: inviteData.session_date,
        sessionLocation: inviteData.session_location,
        inviterName: inviteData.inviter_name || 'Someone',
        message: inviteData.message,
        communityName: inviteData.community_name || 'Unknown Community',
        isExpired,
        isValid,
      });

      // Check if user has already RSVP'd
      if (user) {
        const { data: existingRsvp } = await supabase
          .from('session_rsvps')
          .select('id, status')
          .eq('session_id', inviteData.session_id)
          .eq('user_id', user.id)
          .single();

        if (existingRsvp && existingRsvp.status === 'going') {
          setAccepted(true);
        }
      }
    } catch (error) {
      logError('InviteAcceptSession.loadInvitationDetails', error);
      setError(getUserFriendlyErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const acceptInvitation = async () => {
    if (!user) {
      setError('You must be signed in to accept invitations');
      return;
    }

    if (!invitation?.isValid) {
      setError('This invitation is no longer valid');
      return;
    }

    setAccepting(true);
    setError(null);

    try {
      const { data, error: acceptError } = await supabase.rpc('accept_session_invitation', {
        invitation_code: inviteCode,
      });

      if (acceptError) throw acceptError;

      if (data && data.success) {
        setAccepted(true);
        if (onSuccess) {
          setTimeout(() => onSuccess(data.session_id), 2000);
        }
      } else {
        setError(data?.error || 'Failed to accept invitation');
      }
    } catch (error) {
      logError('InviteAcceptSession.acceptInvitation', error);
      setError(getUserFriendlyErrorMessage(error));
    } finally {
      setAccepting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
          <p className="text-gray-600">Loading invitation...</p>
        </div>
      </div>
    );
  }

  if (error && !invitation) {
    return (
      <div className="max-w-md mx-auto mt-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <XCircle className="w-12 h-12 text-red-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-red-900 mb-2">Invalid Invitation</h3>
          <p className="text-sm text-red-700 mb-4">{error}</p>
          {onCancel && (
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Go Back
            </button>
          )}
        </div>
      </div>
    );
  }

  if (accepted) {
    return (
      <div className="max-w-md mx-auto mt-8">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-green-900 mb-2">Invitation Accepted!</h3>
          <p className="text-sm text-green-700 mb-4">
            You're all set! You've been added to the session.
          </p>
          {invitation && (
            <div className="text-left bg-white rounded-lg p-4 mb-4">
              <h4 className="font-medium text-gray-900 mb-2">{invitation.sessionTitle}</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(invitation.sessionDate).toLocaleString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                {invitation.sessionLocation && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{invitation.sessionLocation}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{invitation.communityName}</span>
                </div>
              </div>
            </div>
          )}
          <p className="text-xs text-green-600">Redirecting to session details...</p>
        </div>
      </div>
    );
  }

  if (!invitation) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-50 border-b border-blue-200 px-6 py-4">
          <h2 className="text-xl font-semibold text-blue-900">You're Invited!</h2>
          <p className="text-sm text-blue-700 mt-1">
            {invitation.inviterName} invited you to attend a session
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Session Details */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{invitation.sessionTitle}</h3>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Date & Time</p>
                  <p className="text-sm text-gray-600">
                    {new Date(invitation.sessionDate).toLocaleString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>

              {invitation.sessionLocation && (
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Location</p>
                    <p className="text-sm text-gray-600">{invitation.sessionLocation}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Community</p>
                  <p className="text-sm text-gray-600">{invitation.communityName}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Message */}
          {invitation.message && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">Message from {invitation.inviterName}:</p>
              <p className="text-sm text-gray-600 italic">{invitation.message}</p>
            </div>
          )}

          {/* Status Messages */}
          {!invitation.isValid && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-yellow-800">
                {invitation.isExpired
                  ? 'This invitation has expired.'
                  : 'This invitation is no longer valid.'}
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Actions */}
          {!user ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800 mb-3">
                You need to sign in to accept this invitation.
              </p>
              <button
                onClick={() => {
                  // This would trigger sign in modal - you can customize this
                  alert('Please sign in to continue');
                }}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Sign In to Accept
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              {onCancel && (
                <button
                  onClick={onCancel}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={acceptInvitation}
                disabled={!invitation.isValid || accepting}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
              >
                {accepting ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Accepting...
                  </>
                ) : (
                  'Accept Invitation'
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Users, Check, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface InviteAcceptProps {
  inviteCode: string;
  onSuccess: () => void;
}

export function InviteAccept({ inviteCode, onSuccess }: InviteAcceptProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [invitation, setInvitation] = useState<any>(null);
  const [community, setCommunity] = useState<any>(null);

  useEffect(() => {
    loadInvitation();
  }, [inviteCode]);

  const loadInvitation = async () => {
    setLoading(true);
    setError(null);

    const { data: inviteData, error: inviteError } = await supabase
      .from('circle_invitations')
      .select('*, communities(name, description)')
      .eq('invite_code', inviteCode)
      .eq('is_active', true)
      .maybeSingle();

    if (inviteError || !inviteData) {
      setError('Invalid or expired invitation link');
      setLoading(false);
      return;
    }

    if (inviteData.expires_at && new Date(inviteData.expires_at) < new Date()) {
      setError('This invitation has expired');
      setLoading(false);
      return;
    }

    if (inviteData.max_uses && inviteData.current_uses >= inviteData.max_uses) {
      setError('This invitation has reached its maximum number of uses');
      setLoading(false);
      return;
    }

    setInvitation(inviteData);
    setCommunity(inviteData.communities);
    setLoading(false);
  };

  const acceptInvitation = async () => {
    if (!user) {
      setError('You must be logged in to accept an invitation');
      return;
    }

    setAccepting(true);
    setError(null);

    const { data, error } = await supabase.rpc('accept_circle_invitation', {
      invitation_code: inviteCode,
    });

    if (error) {
      setError(error.message);
      setAccepting(false);
      return;
    }

    if (data && !data.success) {
      setError(data.error || 'Failed to accept invitation');
      setAccepting(false);
      return;
    }

    onSuccess();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading invitation...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Invalid Invitation</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Go to Home
          </a>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <Users className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Circle Invitation</h2>
          <p className="text-gray-600 mb-6">
            You've been invited to join <span className="font-semibold">{community?.name}</span>
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Please sign in or create an account to accept this invitation.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Sign In to Accept
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-6">
          <Users className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Join Circle</h2>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{community?.name}</h3>
          {community?.description && (
            <p className="text-gray-600 mb-4">{community.description}</p>
          )}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              You will join as a <span className="font-semibold">{invitation.role}</span>
            </p>
          </div>
        </div>

        <button
          onClick={acceptInvitation}
          disabled={accepting}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          {accepting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Joining...</span>
            </>
          ) : (
            <>
              <Check className="h-5 w-5" />
              <span>Accept Invitation</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

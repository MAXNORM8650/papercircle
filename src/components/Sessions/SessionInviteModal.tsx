import { useState } from 'react';
import { X, Mail, Link as LinkIcon, Copy, Check, UserPlus } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { logError, getUserFriendlyErrorMessage } from '../../lib/errorHandling';

interface SessionInviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessionId: string;
  sessionTitle: string;
  sessionDate: string;
}

type InviteType = 'link' | 'email';

export function SessionInviteModal({ isOpen, onClose, sessionId, sessionTitle, sessionDate }: SessionInviteModalProps) {
  const { user, profile } = useAuth();
  const [inviteType, setInviteType] = useState<InviteType>('link');
  const [loading, setLoading] = useState(false);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Email invitation state
  const [emailList, setEmailList] = useState<string>('');
  const [personalMessage, setPersonalMessage] = useState('');
  const [expiresInDays, setExpiresInDays] = useState(7);
  const [emailsSent, setEmailsSent] = useState(false);

  const generateInviteLink = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('create_session_invitation', {
        p_session_id: sessionId,
        p_email: null,
        p_message: personalMessage || null,
        p_expires_in_days: expiresInDays,
      });

      if (error) throw error;

      if (data && data.success) {
        const fullLink = `${window.location.origin}/session/invite/${data.invite_code}`;
        setGeneratedLink(fullLink);
      }
    } catch (error) {
      logError('SessionInviteModal.generateInviteLink', error);
      alert(getUserFriendlyErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const sendEmailInvitations = async () => {
    if (!user || !profile) return;

    const emails = emailList
      .split(/[,;\n]/)
      .map(email => email.trim())
      .filter(email => email && email.includes('@'));

    if (emails.length === 0) {
      alert('Please enter at least one valid email address');
      return;
    }

    setLoading(true);
    try {
      const results = await Promise.all(
        emails.map(async (email) => {
          // Create invitation for this email
          const { data: inviteData, error: inviteError } = await supabase.rpc('create_session_invitation', {
            p_session_id: sessionId,
            p_email: email,
            p_message: personalMessage || null,
            p_expires_in_days: expiresInDays,
          });

          if (inviteError) throw inviteError;

          if (inviteData && inviteData.success) {
            // Queue email
            const { error: emailError } = await supabase.rpc('queue_session_email_invitation', {
              p_invitation_id: inviteData.invite_id,
              p_to_email: email,
              p_from_name: profile.display_name || user.email,
              p_session_title: sessionTitle,
              p_session_date: sessionDate,
              p_message: personalMessage || null,
            });

            if (emailError) throw emailError;
            return { email, success: true };
          }

          return { email, success: false };
        })
      );

      const successCount = results.filter(r => r.success).length;
      alert(`Successfully sent ${successCount} invitation(s)!`);
      setEmailsSent(true);
      setEmailList('');
    } catch (error) {
      logError('SessionInviteModal.sendEmailInvitations', error);
      alert(getUserFriendlyErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleClose = () => {
    setGeneratedLink(null);
    setEmailList('');
    setPersonalMessage('');
    setEmailsSent(false);
    setCopied(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Invite to Session</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Session Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-blue-900 mb-1">{sessionTitle}</h3>
            <p className="text-sm text-blue-700">
              {new Date(sessionDate).toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>

          {/* Invite Type Selector */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setInviteType('link')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                inviteType === 'link'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              <LinkIcon className="w-5 h-5" />
              <span className="font-medium">Share Link</span>
            </button>

            <button
              onClick={() => setInviteType('email')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                inviteType === 'email'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              <Mail className="w-5 h-5" />
              <span className="font-medium">Email Invite</span>
            </button>
          </div>

          {/* Link Invitation */}
          {inviteType === 'link' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Personal Message (optional)
                </label>
                <textarea
                  value={personalMessage}
                  onChange={(e) => setPersonalMessage(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Add a personal message for invitees..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Link Expires In
                </label>
                <select
                  value={expiresInDays}
                  onChange={(e) => setExpiresInDays(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={1}>1 day</option>
                  <option value={3}>3 days</option>
                  <option value={7}>7 days</option>
                  <option value={14}>14 days</option>
                  <option value={30}>30 days</option>
                </select>
              </div>

              {!generatedLink ? (
                <button
                  onClick={generateInviteLink}
                  disabled={loading}
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
                >
                  {loading ? 'Generating...' : 'Generate Invite Link'}
                </button>
              ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2">Share this link:</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={generatedLink}
                      readOnly
                      className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                    />
                    <button
                      onClick={copyToClipboard}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      {copied ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    This link expires in {expiresInDays} day{expiresInDays !== 1 ? 's' : ''}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Email Invitation */}
          {inviteType === 'email' && (
            <div className="space-y-4">
              {!emailsSent ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Addresses
                    </label>
                    <textarea
                      value={emailList}
                      onChange={(e) => setEmailList(e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter email addresses separated by commas, semicolons, or new lines&#10;example@email.com, another@email.com"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Separate multiple emails with commas, semicolons, or new lines
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Personal Message (optional)
                    </label>
                    <textarea
                      value={personalMessage}
                      onChange={(e) => setPersonalMessage(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Add a personal message..."
                    />
                  </div>

                  <button
                    onClick={sendEmailInvitations}
                    disabled={loading || !emailList.trim()}
                    className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium flex items-center justify-center gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    {loading ? 'Sending...' : 'Send Email Invitations'}
                  </button>
                </>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <Check className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-green-900 mb-2">
                    Invitations Sent!
                  </h3>
                  <p className="text-sm text-green-700">
                    Email invitations have been queued and will be sent shortly.
                  </p>
                  <button
                    onClick={() => setEmailsSent(false)}
                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Send More
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Copy to Clipboard Toast Notification */}
      {copied && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-[60]">
          <Check className="w-5 h-5" />
          <span className="font-medium">Invitation link copied to clipboard!</span>
        </div>
      )}
    </div>
  );
}

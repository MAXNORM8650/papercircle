import { useState, useEffect } from 'react';
import { ArrowLeft, Users, Calendar, Settings, Link as LinkIcon, Share2, Copy, Check, Plus, Mail, UserMinus, Crown, User, Video, Clock, MapPin } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
// import { Edit } from 'lucide-react';
// import { EditCircleModal } from './EditCircleModal';

interface CircleDetailViewProps {
  communityId: string;
  onBack: () => void;
  onCreateSession: (communityId: string) => void;
}

interface Community {
  id: string;
  name: string;
  description: string | null;
  slug: string;
  is_public: boolean;
  invite_enabled: boolean;
  created_by: string;
  created_at: string;
}

interface Member {
  id: string;
  user_id: string;
  role: string;
  joined_at: string;
  profiles: {
    display_name: string;
    avatar_url: string | null;
    email: string;
  };
}

interface Invitation {
  id: string;
  invite_code: string;
  max_uses: number | null;
  current_uses: number;
  expires_at: string | null;
  role: string;
  is_active: boolean;
  created_at: string;
}

interface Session {
  id: string;
  title: string;
  description: string | null;
  scheduled_at: string;
  duration_minutes: number;
  status: string;
  location: string | null;
  virtual_link: string | null;
  presenter?: {
    display_name: string;
  };
}

export function CircleDetailView({ communityId, onBack, onCreateSession }: CircleDetailViewProps) {
  const { user } = useAuth();
  const [community, setCommunity] = useState<Community | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'sessions' | 'settings'>('overview');
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [newInvite, setNewInvite] = useState({
    role: 'member' as 'member' | 'presenter',
    max_uses: null as number | null,
    expires_in_days: null as number | null,
  });

  useEffect(() => {
    loadCommunityData();
  }, [communityId]);

  const loadCommunityData = async () => {
    setLoading(true);

    const { data: communityData } = await supabase
      .from('communities')
      .select('*')
      .eq('id', communityId)
      .maybeSingle();

    if (communityData) {
      setCommunity(communityData);
      setIsAdmin(user?.id === communityData.created_by);
    }

    const { data: membersData } = await supabase
      .from('community_members')
      .select('id, user_id, role, joined_at, profiles(display_name, avatar_url, email)')
      .eq('community_id', communityId)
      .order('joined_at');

    if (membersData) {
      setMembers(membersData as any);
    }

    if (user?.id === communityData?.created_by) {
      const { data: invitesData } = await supabase
        .from('circle_invitations')
        .select('*')
        .eq('community_id', communityId)
        .order('created_at', { ascending: false });

      if (invitesData) {
        setInvitations(invitesData);
      }
    }

    const { data: sessionsData } = await supabase
      .from('sessions')
      .select(`
        id,
        title,
        description,
        scheduled_at,
        duration_minutes,
        status,
        location,
        virtual_link,
        presenter:profiles!sessions_presenter_id_fkey(display_name)
      `)
      .eq('community_id', communityId)
      .order('scheduled_at', { ascending: false })
      .limit(10);

    if (sessionsData) {
      setSessions(sessionsData as any);
    }

    setLoading(false);
  };

  const createInvitation = async () => {
    if (!user) return;

    const expiresAt = newInvite.expires_in_days
      ? new Date(Date.now() + newInvite.expires_in_days * 24 * 60 * 60 * 1000).toISOString()
      : null;

    const inviteCode = await generateInviteCode();

    const { error } = await supabase.from('circle_invitations').insert({
      community_id: communityId,
      invite_code: inviteCode,
      created_by: user.id,
      max_uses: newInvite.max_uses,
      expires_at: expiresAt,
      role: newInvite.role,
    });

    if (error) {
      alert('Error creating invitation: ' + error.message);
    } else {
      setShowInviteModal(false);
      setNewInvite({ role: 'member', max_uses: null, expires_in_days: null });
      loadCommunityData();
    }
  };

  const generateInviteCode = async (): Promise<string> => {
    const { data } = await supabase.rpc('generate_invite_code');
    return data || Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  const copyInviteLink = (code: string) => {
    const link = `${window.location.origin}/invite/${code}`;
    navigator.clipboard.writeText(link);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const toggleInviteStatus = async (inviteId: string, isActive: boolean) => {
    const { error } = await supabase
      .from('circle_invitations')
      .update({ is_active: !isActive })
      .eq('id', inviteId);

    if (!error) {
      loadCommunityData();
    }
  };

  const removeMember = async (memberId: string) => {
    if (!confirm('Are you sure you want to remove this member?')) return;

    const { error } = await supabase
      .from('community_members')
      .delete()
      .eq('id', memberId);

    if (error) {
      alert('Error removing member: ' + error.message);
    } else {
      loadCommunityData();
    }
  };

  const updateMemberRole = async (memberId: string, newRole: string) => {
    const { error } = await supabase
      .from('community_members')
      .update({ role: newRole })
      .eq('id', memberId);

    if (!error) {
      loadCommunityData();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  if (loading || !community) {
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
      <button onClick={onBack} className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6">
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Circles</span>
      </button>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{community.name}</h1>
              {community.description && (
                <p className="text-gray-600 mb-3">{community.description}</p>
              )}
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{members.length} members</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Created {formatDate(community.created_at)}</span>
                </span>
                {community.is_public ? (
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                    Public
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs font-medium">
                    Private
                  </span>
                )}
              </div>
            </div>
            {isAdmin && (
              <button
                onClick={() => setShowInviteModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Share2 className="h-4 w-4" />
                <span>Invite Members</span>
              </button>
            )}
          </div>
        </div>

        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {(['overview', 'members', 'sessions', 'settings'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Upcoming Sessions</h2>
                  <button
                    onClick={() => onCreateSession(communityId)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Create Session</span>
                  </button>
                </div>
                {sessions.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">No sessions yet</p>
                    <p className="text-sm text-gray-500 mt-1">Create your first session to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sessions.map((session) => (
                      <div key={session.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{session.title}</h3>
                        {session.description && (
                          <p className="text-sm text-gray-600 mb-3">{session.description}</p>
                        )}
                        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                          <span className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDateTime(session.scheduled_at)}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{session.duration_minutes} min</span>
                          </span>
                          {session.location && (
                            <span className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{session.location}</span>
                            </span>
                          )}
                          {session.virtual_link && (
                            <a
                              href={session.virtual_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                            >
                              <Video className="h-4 w-4" />
                              <span>Join</span>
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Members</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {members.slice(0, 6).map((member) => (
                    <div key={member.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{member.profiles.display_name}</p>
                        <p className="text-sm text-gray-500">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'members' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Members ({members.length})
              </h2>
              <div className="space-y-3">
                {members.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{member.profiles.display_name}</p>
                        <p className="text-sm text-gray-500">{member.profiles.email}</p>
                        <p className="text-xs text-gray-400">Joined {formatDate(member.joined_at)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {isAdmin && member.user_id !== user?.id ? (
                        <>
                          <select
                            value={member.role}
                            onChange={(e) => updateMemberRole(member.id, e.target.value)}
                            className="px-3 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="member">Member</option>
                            <option value="presenter">Presenter</option>
                            <option value="admin">Admin</option>
                          </select>
                          <button
                            onClick={() => removeMember(member.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                          >
                            <UserMinus className="h-4 w-4" />
                          </button>
                        </>
                      ) : (
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          member.role === 'admin' ? 'bg-red-100 text-red-800' :
                          member.role === 'presenter' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {member.role === 'admin' && <Crown className="inline h-3 w-3 mr-1" />}
                          {member.role}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'sessions' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">All Sessions</h2>
                <button
                  onClick={() => onCreateSession(communityId)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create Session</span>
                </button>
              </div>
              {sessions.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No sessions yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {sessions.map((session) => (
                    <div key={session.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{session.title}</h3>
                          {session.description && (
                            <p className="text-sm text-gray-600 mb-2">{session.description}</p>
                          )}
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          session.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                          session.status === 'completed' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {session.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                        <span className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDateTime(session.scheduled_at)}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{session.duration_minutes} min</span>
                        </span>
                        {session.presenter && (
                          <span className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>{session.presenter.display_name}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && isAdmin && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Invitation Links</h2>
                {invitations.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <LinkIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">No invitation links yet</p>
                    <button
                      onClick={() => setShowInviteModal(true)}
                      className="mt-3 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Create your first invitation
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {invitations.map((invite) => (
                      <div key={invite.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <code className="px-3 py-1 bg-gray-100 rounded font-mono text-sm">
                                {invite.invite_code}
                              </code>
                              <button
                                onClick={() => copyInviteLink(invite.invite_code)}
                                className="p-1 text-gray-600 hover:text-gray-900 transition-colors"
                              >
                                {copiedCode === invite.invite_code ? (
                                  <Check className="h-4 w-4 text-green-600" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                            <div className="flex items-center space-x-3 text-sm text-gray-600">
                              <span>Role: {invite.role}</span>
                              <span>
                                Uses: {invite.current_uses}
                                {invite.max_uses ? `/${invite.max_uses}` : ' (unlimited)'}
                              </span>
                              {invite.expires_at && (
                                <span>Expires: {formatDate(invite.expires_at)}</span>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => toggleInviteStatus(invite.id, invite.is_active)}
                            className={`px-3 py-1 rounded text-sm font-medium ${
                              invite.is_active
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {invite.is_active ? 'Active' : 'Disabled'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Create Invitation Link</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Member Role
                </label>
                <select
                  value={newInvite.role}
                  onChange={(e) => setNewInvite({ ...newInvite, role: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="member">Member</option>
                  <option value="presenter">Presenter</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Uses (optional)
                </label>
                <input
                  type="number"
                  value={newInvite.max_uses || ''}
                  onChange={(e) => setNewInvite({ ...newInvite, max_uses: e.target.value ? parseInt(e.target.value) : null })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Unlimited"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expires In (days, optional)
                </label>
                <input
                  type="number"
                  value={newInvite.expires_in_days || ''}
                  onChange={(e) => setNewInvite({ ...newInvite, expires_in_days: e.target.value ? parseInt(e.target.value) : null })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Never expires"
                  min="1"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={createInvitation}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Create Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

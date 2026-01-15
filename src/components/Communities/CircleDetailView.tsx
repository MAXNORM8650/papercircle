import { useState, useEffect } from 'react';
import { ArrowLeft, Users, Calendar, Settings, Link as LinkIcon, Share2, Copy, Check, Plus, Mail, UserMinus, Crown, User, Video, Clock, MapPin, Edit, GitBranch, UserPlus, FileText } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { EditCircleModal } from './EditCircleModal';
import { CreateSessionModal } from '../Sessions/CreateSessionModal';
import { SessionCard } from '../Sessions/SessionCard';
import { AttendanceList } from '../Sessions/AttendanceList';
import { AssignPresenterModal } from '../Sessions/AssignPresenterModal';
import { SessionLineageView } from '../Sessions/SessionLineageView';
import { CommunityPapersView } from '../Papers/CommunityPapersView';

interface CircleDetailViewProps {
  communityId: string;
  onBack: () => void;
  onNavigate?: (view: string, context?: { circleId?: string }) => void;
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
  profile: {
    display_name: string;
    avatar_url: string | null;
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
  introduction: string | null;
  scheduled_for: string;
  duration_minutes: number;
  location: string | null;
  virtual_link: string | null;
  parent_session_id: string | null;
  recording_url: string | null;
}

export function CircleDetailView({ communityId, onBack, onNavigate }: CircleDetailViewProps) {
  const { user } = useAuth();
  const [community, setCommunity] = useState<Community | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'papers' | 'sessions' | 'analysis' | 'settings'>('overview');
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [showCopyToast, setShowCopyToast] = useState(false);

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [createdInviteLink, setCreatedInviteLink] = useState<string | null>(null);
  const [showEditCircle, setShowEditCircle] = useState(false);
  const [showCreateSession, setShowCreateSession] = useState(false);
  const [showAssignPresenter, setShowAssignPresenter] = useState(false);
  const [showAttendanceList, setShowAttendanceList] = useState(false);
  const [showLineageView, setShowLineageView] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [sessionFilter, setSessionFilter] = useState<'all' | 'upcoming' | 'past'>('upcoming');

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

    // Use RPC function to avoid RLS recursion issues
    const { data: membersData, error: membersError } = await supabase
      .rpc('get_circle_members', { circle_id: communityId });

    if (membersError) {
      console.error('Error loading members:', membersError);
    } else if (membersData) {
      // Transform RPC response to match Member interface
      setMembers(membersData.map((m: any) => ({
        id: m.id,
        user_id: m.user_id,
        role: m.role,
        joined_at: m.joined_at,
        profile: {
          display_name: m.display_name,
          avatar_url: m.avatar_url
        }
      })));
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
        introduction,
        scheduled_for,
        duration_minutes,
        location,
        virtual_link,
        parent_session_id,
        recording_url
      `)
      .eq('community_id', communityId)
      .order('scheduled_for', { ascending: false });

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
      // Show the created invitation link
      const link = `${window.location.origin}/invite/${inviteCode}`;
      setCreatedInviteLink(link);
      loadCommunityData();
    }
  };

  const closeInviteModal = () => {
    setShowInviteModal(false);
    setCreatedInviteLink(null);
    setNewInvite({ role: 'member', max_uses: null, expires_in_days: null });
  };

  const copyCreatedLink = () => {
    if (createdInviteLink) {
      navigator.clipboard.writeText(createdInviteLink);
      setShowCopyToast(true);
      setTimeout(() => setShowCopyToast(false), 3000);
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
    setShowCopyToast(true);
    setTimeout(() => {
      setCopiedCode(null);
      setShowCopyToast(false);
    }, 3000);
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

  const handleSessionSelect = (session: Session) => {
    setSelectedSession(session);
  };

  const getFilteredSessions = () => {
    const now = new Date();
    switch (sessionFilter) {
      case 'upcoming':
        return sessions.filter(s => new Date(s.scheduled_for) > now);
      case 'past':
        return sessions.filter(s => new Date(s.scheduled_for) <= now);
      default:
        return sessions;
    }
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
            {(['overview', 'members', 'papers', 'sessions', 'analysis', 'settings'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  if (tab === 'analysis' && onNavigate) {
                    onNavigate('lineage', { circleId: communityId });
                  } else {
                    setActiveTab(tab);
                  }
                }}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab === 'analysis' ? 'Analysis Hub' : tab.charAt(0).toUpperCase() + tab.slice(1)}
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
                  {isAdmin && (
                    <button
                      onClick={() => setShowCreateSession(true)}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Create Session</span>
                    </button>
                  )}
                </div>
                {sessions.filter(s => new Date(s.scheduled_for) > new Date()).length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">No upcoming sessions</p>
                    {isAdmin && (
                      <p className="text-sm text-gray-500 mt-1">Create your first session to get started</p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sessions.filter(s => new Date(s.scheduled_for) > new Date()).slice(0, 5).map((session) => (
                      <SessionCard
                        key={session.id}
                        session={session}
                        onRSVPChange={loadCommunityData}
                        showRSVPButtons={true}
                      />
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
                        <p className="font-medium text-gray-900">{member.profile.display_name}</p>
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
                        <p className="font-medium text-gray-900">{member.profile.display_name}</p>
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

          {activeTab === 'papers' && (
            <CommunityPapersView communityId={communityId} />
          )}

          {activeTab === 'sessions' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Sessions</h2>
                <div className="flex items-center gap-3">
                  {/* Filter buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSessionFilter('upcoming')}
                      className={`px-3 py-1 rounded-lg text-sm font-medium ${
                        sessionFilter === 'upcoming'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Upcoming
                    </button>
                    <button
                      onClick={() => setSessionFilter('past')}
                      className={`px-3 py-1 rounded-lg text-sm font-medium ${
                        sessionFilter === 'past'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Past
                    </button>
                    <button
                      onClick={() => setSessionFilter('all')}
                      className={`px-3 py-1 rounded-lg text-sm font-medium ${
                        sessionFilter === 'all'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      All
                    </button>
                  </div>
                  {isAdmin && (
                    <button
                      onClick={() => setShowCreateSession(true)}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Create Session</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Session Detail View */}
              {selectedSession ? (
                <div className="space-y-6">
                  <button
                    onClick={() => setSelectedSession(null)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Sessions
                  </button>

                  <SessionCard
                    session={selectedSession}
                    onRSVPChange={loadCommunityData}
                    showRSVPButtons={true}
                  />

                  {/* Admin Actions */}
                  {isAdmin && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowAssignPresenter(true)}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                      >
                        <UserPlus className="w-4 h-4 inline mr-2" />
                        Assign Presenters
                      </button>
                      <button
                        onClick={() => setShowAttendanceList(true)}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                      >
                        <Users className="w-4 h-4 inline mr-2" />
                        View Attendance
                      </button>
                      <button
                        onClick={() => setShowLineageView(true)}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                      >
                        <GitBranch className="w-4 h-4 inline mr-2" />
                        View Lineage
                      </button>
                    </div>
                  )}

                  {/* Attendance List */}
                  {showAttendanceList && (
                    <div className="border-t pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Attendance</h3>
                        <button
                          onClick={() => setShowAttendanceList(false)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          Hide
                        </button>
                      </div>
                      <AttendanceList sessionId={selectedSession.id} />
                    </div>
                  )}

                  {/* Lineage View */}
                  {showLineageView && (
                    <div className="border-t pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Session Lineage</h3>
                        <button
                          onClick={() => setShowLineageView(false)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          Hide
                        </button>
                      </div>
                      <SessionLineageView
                        sessionId={selectedSession.id}
                        onSelectSession={(id) => {
                          const session = sessions.find(s => s.id === id);
                          if (session) setSelectedSession(session);
                        }}
                      />
                    </div>
                  )}
                </div>
              ) : (
                /* Sessions List */
                <div>
                  {getFilteredSessions().length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600">No sessions found</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {getFilteredSessions().map((session) => (
                        <div
                          key={session.id}
                          onClick={() => handleSessionSelect(session)}
                          className="cursor-pointer"
                        >
                          <SessionCard
                            session={session}
                            onRSVPChange={loadCommunityData}
                            showRSVPButtons={true}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && isAdmin && (
            <div className="space-y-6">
              {/* Circle Settings Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Circle Settings</h2>
                  <button
                    onClick={() => setShowEditCircle(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit Circle</span>
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Name</label>
                    <p className="text-gray-900 mt-1">{community.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Description</label>
                    <p className="text-gray-900 mt-1">{community.description || 'No description'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Visibility</label>
                    <p className="text-gray-900 mt-1">
                      {community.is_public ? (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-medium">
                          Public
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm font-medium">
                          Private
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Invitation Links Section */}
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {createdInviteLink ? 'Invitation Link Created!' : 'Create Invitation Link'}
            </h2>

            {!createdInviteLink ? (
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
                    onClick={closeInviteModal}
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
            ) : (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-900">Invitation link created successfully!</span>
                  </div>
                  <p className="text-sm text-green-700">Share this link with people you want to invite to your circle.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Invitation Link
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={createdInviteLink}
                      readOnly
                      className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm font-mono"
                    />
                    <button
                      onClick={copyCreatedLink}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </button>
                  </div>
                </div>

                <button
                  onClick={closeInviteModal}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {showEditCircle && (
        <EditCircleModal
          communityId={communityId}
          onClose={() => setShowEditCircle(false)}
          onSuccess={() => {
            setShowEditCircle(false);
            loadCommunityData();
          }}
        />
      )}

      {showCreateSession && (
        <CreateSessionModal
          isOpen={showCreateSession}
          onClose={() => setShowCreateSession(false)}
          onSuccess={() => {
            setShowCreateSession(false);
            loadCommunityData();
          }}
          communityId={communityId}
        />
      )}

      {showAssignPresenter && selectedSession && (
        <AssignPresenterModal
          isOpen={showAssignPresenter}
          onClose={() => setShowAssignPresenter(false)}
          onSuccess={() => {
            setShowAssignPresenter(false);
            loadCommunityData();
          }}
          sessionId={selectedSession.id}
          communityId={communityId}
        />
      )}

      {/* Copy to Clipboard Toast Notification */}
      {showCopyToast && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in z-50">
          <Check className="w-5 h-5" />
          <span className="font-medium">Invitation link copied to clipboard!</span>
        </div>
      )}
    </div>
  );
}

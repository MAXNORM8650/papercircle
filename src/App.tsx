// src/App.tsx - Updated to show profile completion modal
import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CommunityProvider } from './contexts/CommunityContext';
import { Header } from './components/Layout/Header';
import { DiscoverView } from './components/Papers/DiscoverView';
import { PaperDetailView } from './components/Papers/PaperDetailView';
import { SessionsView } from './components/Sessions/SessionsView';
import { LineageView } from './components/Lineage/LineageView';
import { DashboardView } from './components/Dashboard/DashboardView';
import { AdminView } from './components/Admin/AdminView';
import { CircleManagement } from './components/Communities/CircleManagement';
import { InviteAccept } from './components/Communities/InviteAccept';
import { InviteAcceptSession } from './components/Sessions/InviteAcceptSession';
import { CompleteProfileModal } from './components/Auth/CompleteProfileModal';
import { LLMSettings } from './components/Settings/LLMSettings';
import ResearchDashboard from './components/Papers/ResearchDashboard';

type View = 'discover' | 'sessions' | 'circles' | 'lineage' | 'dashboard' | 'admin' | 'settings' | 'paper-detail' | 'session-detail' | 'invite' | 'session-invite' | 'research-dashboard';

function AppContent() {
  const { needsProfile } = useAuth();
  const [currentView, setCurrentView] = useState<View>('discover');
  const [selectedPaperId, setSelectedPaperId] = useState<string | null>(null);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const [sessionInviteCode, setSessionInviteCode] = useState<string | null>(null);
  const [researchTimestamp, setResearchTimestamp] = useState<string | null>(null);
  const [selectedCircleId, setSelectedCircleId] = useState<string | null>(null);

  useEffect(() => {
    const path = window.location.pathname;

    // Check for research dashboard
    const researchMatch = path.match(/^\/research-dashboard\/([a-zA-Z0-9_]+)$/);
    if (researchMatch) {
      setResearchTimestamp(researchMatch[1]);
      setCurrentView('research-dashboard');
      return;
    }

    // Check for community invite
    const inviteMatch = path.match(/^\/invite\/([a-zA-Z0-9]+)$/);
    if (inviteMatch) {
      setInviteCode(inviteMatch[1]);
      setCurrentView('invite');
      return;
    }

    // Check for session invite
    const sessionInviteMatch = path.match(/^\/session\/invite\/([a-zA-Z0-9]+)$/);
    if (sessionInviteMatch) {
      setSessionInviteCode(sessionInviteMatch[1]);
      setCurrentView('session-invite');
      return;
    }
  }, []);

  const handleNavigate = (view: string, context?: { circleId?: string }) => {
    setCurrentView(view as View);
    setSelectedPaperId(null);
    setSelectedSessionId(null);

    // Handle circle context for lineage view
    if (view === 'lineage' && context?.circleId) {
      setSelectedCircleId(context.circleId);
    } else if (view !== 'lineage') {
      setSelectedCircleId(null);
    }
  };

  const handleSelectPaper = (paperId: string) => {
    setSelectedPaperId(paperId);
    setCurrentView('paper-detail');
  };

  const handleSelectSession = (sessionId: string) => {
    setSelectedSessionId(sessionId);
    setCurrentView('session-detail');
  };

  const renderView = () => {
    switch (currentView) {
      case 'discover':
        return <DiscoverView onSelectPaper={handleSelectPaper} />;
      case 'paper-detail':
        return selectedPaperId ? (
          <PaperDetailView paperId={selectedPaperId} onBack={() => setCurrentView('discover')} />
        ) : (
          <DiscoverView onSelectPaper={handleSelectPaper} />
        );
      case 'sessions':
        return <SessionsView onSelectSession={handleSelectSession} />;
      case 'circles':
        return <CircleManagement onNavigate={handleNavigate} />;
      case 'lineage':
        return <LineageView circleId={selectedCircleId} />;
      case 'dashboard':
        return <DashboardView onNavigate={handleNavigate} />;
      case 'admin':
        return <AdminView />;
      case 'settings':
        return <LLMSettings />;
      case 'invite':
        return inviteCode ? (
          <InviteAccept
            inviteCode={inviteCode}
            onSuccess={() => {
              setCurrentView('circles');
              setInviteCode(null);
            }}
          />
        ) : null;
      case 'session-invite':
        return sessionInviteCode ? (
          <InviteAcceptSession
            inviteCode={sessionInviteCode}
            onSuccess={(sessionId) => {
              setSelectedSessionId(sessionId);
              setCurrentView('sessions');
              setSessionInviteCode(null);
            }}
            onCancel={() => {
              setCurrentView('discover');
              setSessionInviteCode(null);
            }}
          />
        ) : null;
      case 'research-dashboard':
        return researchTimestamp ? (
          <ResearchDashboard
            timestamp={researchTimestamp}
            onBack={() => setCurrentView('discover')}
          />
        ) : null;
      default:
        return <DiscoverView onSelectPaper={handleSelectPaper} />;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {currentView !== 'session-invite' && <Header onNavigate={handleNavigate} currentView={currentView} />}
        <main>{renderView()}</main>
      </div>

      {/* Show profile completion modal when needed */}
      {needsProfile && <CompleteProfileModal />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <CommunityProvider>
        <AppContent />
      </CommunityProvider>
    </AuthProvider>
  );
}

export default App;
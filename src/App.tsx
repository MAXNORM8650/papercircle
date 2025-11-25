// src/App.tsx - Updated to show profile completion modal
import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Header } from './components/Layout/Header';
import { DiscoverView } from './components/Papers/DiscoverView';
import { PaperDetailView } from './components/Papers/PaperDetailView';
import { SessionsView } from './components/Sessions/SessionsView';
import { LineageView } from './components/Lineage/LineageView';
import { DashboardView } from './components/Dashboard/DashboardView';
import { AdminView } from './components/Admin/AdminView';
import { CircleManagement } from './components/Communities/CircleManagement';
import { InviteAccept } from './components/Communities/InviteAccept';
import { CompleteProfileModal } from './components/Auth/CompleteProfileModal';

type View = 'discover' | 'sessions' | 'circles' | 'lineage' | 'dashboard' | 'admin' | 'paper-detail' | 'session-detail' | 'invite';

function AppContent() {
  const { needsProfile } = useAuth();
  const [currentView, setCurrentView] = useState<View>('discover');
  const [selectedPaperId, setSelectedPaperId] = useState<string | null>(null);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [inviteCode, setInviteCode] = useState<string | null>(null);

  useEffect(() => {
    const path = window.location.pathname;
    const inviteMatch = path.match(/^\/invite\/([a-zA-Z0-9]+)$/);
    if (inviteMatch) {
      setInviteCode(inviteMatch[1]);
      setCurrentView('invite');
    }
  }, []);

  const handleNavigate = (view: string) => {
    setCurrentView(view as View);
    setSelectedPaperId(null);
    setSelectedSessionId(null);
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
        return <CircleManagement />;
      case 'lineage':
        return <LineageView />;
      case 'dashboard':
        return <DashboardView />;
      case 'admin':
        return <AdminView />;
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
      default:
        return <DiscoverView onSelectPaper={handleSelectPaper} />;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {currentView !== 'invite' && <Header onNavigate={handleNavigate} currentView={currentView} />}
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
      <AppContent />
    </AuthProvider>
  );
}

export default App;
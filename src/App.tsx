import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { Header } from './components/Layout/Header';
import { DiscoverView } from './components/Papers/DiscoverView';
import { PaperDetailView } from './components/Papers/PaperDetailView';
import { SessionsView } from './components/Sessions/SessionsView';
import { LineageView } from './components/Lineage/LineageView';
import { DashboardView } from './components/Dashboard/DashboardView';
import { AdminView } from './components/Admin/AdminView';
import { CircleManagement } from './components/Communities/CircleManagement';

type View = 'discover' | 'sessions' | 'circles' | 'lineage' | 'dashboard' | 'admin' | 'paper-detail' | 'session-detail';

function App() {
  const [currentView, setCurrentView] = useState<View>('discover');
  const [selectedPaperId, setSelectedPaperId] = useState<string | null>(null);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

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
      default:
        return <DiscoverView onSelectPaper={handleSelectPaper} />;
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Header onNavigate={handleNavigate} currentView={currentView} />
        <main>{renderView()}</main>
      </div>
    </AuthProvider>
  );
}

export default App;

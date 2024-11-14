import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import AuthWrapper from './components/AuthWrapper';
import { useStore } from './store'; // Ensure store provides activePanel and setActivePanel
import Navbar from './components/Navbar';
import Map from './components/Map';
import ManagementPanel from './components/ManagementPanel';
import Dashboard from './components/Dashboard';

export default function App() {
  // Ensuring activePanel is strictly typed
  const { activePanel, setActivePanel } = useStore(); // Access activePanel and setActivePanel

  const renderContent = () => {
    switch (activePanel) {
      case 'dashboard':
        return <Dashboard />;
      case 'management':
        return (
          <div className="container mx-auto px-4 py-8">
            <ManagementPanel /> {/* Render management panel */}
          </div>
        );
      default:
        return <Map />; // Default to the map view
    }
  };

  return (
    <ErrorBoundary>
      <AuthWrapper>
        <div className="min-h-screen bg-gray-50">
          <Navbar
            onNavigate={(panel: 'map' | 'dashboard' | 'management') => setActivePanel(panel)} // Pass dynamic navigation handler to Navbar
          />
          <main className="h-[calc(100vh-4rem)]">{renderContent()}</main>
        </div>
      </AuthWrapper>
    </ErrorBoundary>
  );
}

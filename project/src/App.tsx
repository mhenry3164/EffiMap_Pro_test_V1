// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import AuthWrapper from './components/AuthWrapper';
import { useStore } from './store';
import Navbar from './components/Navbar';
import Map from './components/Map';
import ManagementPanel from './components/ManagementPanel';
import Dashboard from './components/Dashboard';

// Import public pages
import HomePage from './pages/HomePage';
import FeaturesPage from './pages/FeaturesPage';
import PricingPage from './pages/PricingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PublicLayout from './layouts/PublicLayout';

const AuthenticatedApp = () => {
  const { activePanel, setActivePanel } = useStore();

  const renderContent = () => {
    switch (activePanel) {
      case 'dashboard':
        return <Dashboard />;
      case 'management':
        return (
          <div className="container mx-auto px-4 py-8">
            <ManagementPanel />
          </div>
        );
      default:
        return <Map />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        onNavigate={(panel: 'map' | 'dashboard' | 'management') => setActivePanel(panel)}
      />
      <main className="h-[calc(100vh-4rem)]">{renderContent()}</main>
    </div>
  );
};

export default function App() {
  const isAuthenticated = useStore(state => state.isAuthenticated);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>

          {/* Protected Routes */}
          <Route
            path="/app/*"
            element={
              <AuthWrapper>
                <AuthenticatedApp />
              </AuthWrapper>
            }
          />

          {/* Redirect all other routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
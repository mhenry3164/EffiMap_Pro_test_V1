import React from 'react';
import { useStore } from '../store';
import { LogOut, Map as MapIcon, Users, Building2, LayoutDashboard } from 'lucide-react';
import { auth } from '../firebase';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

export default function Navbar() {
  const { user, activePanel, setActivePanel } = useStore();

  // Handle logout logic
  const handleLogout = async () => {
    await signOut(auth);
  };

  // Handle login logic using Google Auth
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  // Navigation handler to set active panel
  const handleNavigation = (panel: 'map' | 'dashboard' | 'management') => {
    setActivePanel(panel);
  };

  return (
    <nav className="bg-indigo-600 text-white h-16">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo and Navigation */}
        <div className="flex items-center space-x-8">
          <h1 className="text-xl font-bold">Territory Manager</h1>
          <div className="flex items-center space-x-4">
            {/* Map Navigation */}
            <button
              onClick={() => handleNavigation('map')}
              className={`flex items-center space-x-2 hover:text-indigo-200 ${
                activePanel === 'map' ? 'text-indigo-200 border-b-2 border-indigo-200' : ''
              }`}
            >
              <MapIcon size={20} />
              <span>Map</span>
            </button>
            {/* Dashboard Navigation */}
            <button
              onClick={() => handleNavigation('dashboard')}
              className={`flex items-center space-x-2 hover:text-indigo-200 ${
                activePanel === 'dashboard' ? 'text-indigo-200 border-b-2 border-indigo-200' : ''
              }`}
            >
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </button>
            {/* Management Navigation */}
            <button
              onClick={() => handleNavigation('management')}
              className={`flex items-center space-x-2 hover:text-indigo-200 ${
                activePanel === 'management' ? 'text-indigo-200 border-b-2 border-indigo-200' : ''
              }`}
            >
              <Building2 size={20} />
              <span>Management</span>
            </button>
          </div>
        </div>

        {/* User Info and Authentication */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              {/* Display user's email and logout option */}
              <span className="text-sm">{user.email}</span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 hover:text-indigo-200"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            // Display Google Login button when not authenticated
            <button
              onClick={handleLogin}
              className="flex items-center space-x-2 hover:text-indigo-200"
            >
              <span>Login with Google</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

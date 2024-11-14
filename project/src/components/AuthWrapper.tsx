import React, { useEffect } from 'react';
import { useStore } from '../store';
import AuthForm from './AuthForm';
import LoadingScreen from './LoadingScreen';

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { user, loading, initAuth } = useStore();

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  if (loading.auth) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <AuthForm />;
  }

  return <>{children}</>;
}
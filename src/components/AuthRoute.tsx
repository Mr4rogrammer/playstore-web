
import React from 'react';
import { useAuth } from '../contexts/AuthContext';

interface AuthRouteProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children, fallback }) => {
  const { user, loading } = useAuth();

  // Show loading spinner while authentication state is being determined
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // Only show fallback after loading is complete and user is not authenticated
  return user ? <>{children}</> : <>{fallback}</>;
};

export default AuthRoute;


import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

const Navigation: React.FC = () => {
  const { userData, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/documentation', label: 'Docs' },
    { path: '/support', label: 'Support' },
    { path: '/profile', label: 'Profile' }
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PushNotify
            </h1>
          </div>
          
          <div className="flex items-center space-x-2">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={location.pathname === item.path ? "default" : "ghost"}
                onClick={() => navigate(item.path)}
                className={location.pathname === item.path ? "bg-gradient-to-r from-blue-600 to-purple-600" : ""}
                size="sm"
              >
                {item.label}
              </Button>
            ))}
            
            <div className="flex items-center space-x-2 text-sm text-gray-600 ml-4">
              <span>💎 {userData?.points || 0} points</span>
            </div>
            
            <Button variant="outline" onClick={handleLogout} size="sm">
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

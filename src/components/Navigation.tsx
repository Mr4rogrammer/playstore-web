
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

const Navigation: React.FC = () => {
  const { userData, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/documentation', label: 'Docs' },
    { path: '/support', label: 'Support' }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PushNotify
            </h1>
          </div>
          
          {/* Desktop Navigation */}
          {!isMobile && (
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
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <div className="flex items-center space-x-2">
              <div className="text-xs text-gray-600">
                💎 {userData?.points || 0}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobile && isMenuOpen && (
          <div className="border-t border-gray-200 py-2">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  variant={location.pathname === item.path ? "default" : "ghost"}
                  onClick={() => handleNavigation(item.path)}
                  className={`justify-start ${location.pathname === item.path ? "bg-gradient-to-r from-blue-600 to-purple-600" : ""}`}
                  size="sm"
                >
                  {item.label}
                </Button>
              ))}
              <Button variant="outline" onClick={handleLogout} size="sm" className="justify-start mt-2">
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

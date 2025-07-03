
import React, { useState } from 'react';
import { Search, Bell, Menu, X, MessageCircle, Users } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useProfile } from '../../contexts/ProfileContext';
import { WalletConnect } from '../WalletConnect';

const MobileTopNavbar: React.FC = () => {
  const { profileName } = useProfile();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navigationItems = [
    { path: '/', icon: Users, label: 'Home', isActive: location.pathname === '/' },
    { path: '/messages', icon: MessageCircle, label: 'Messages', isActive: location.pathname === '/messages' },
    { path: '/study-groups', icon: Users, label: 'Groups', isActive: location.pathname === '/study-groups' },
  ];

  const quickActions = [
    { path: '/profile', label: 'My Profile' },
    { path: '/notifications', label: 'Notifications' },
    { path: '/bookmarks', label: 'Saved Posts' },
    { path: '/settings', label: 'Settings' },
  ];

  return (
    <>
      {/* Main Mobile Navigation */}
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left: Logo & Menu */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>
            <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
              Academe
            </Link>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
              <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
            </button>
            <WalletConnect className="scale-90" />
          </div>
        </div>

        {/* Bottom Tab Navigation */}
        <div className="flex border-t border-gray-200 dark:border-gray-700">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex-1 py-3 px-2 text-center transition-colors ${
                item.isActive
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                  : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              <item.icon className="w-5 h-5 mx-auto mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsMenuOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-xl">
            {/* Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                  {profileName.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{profileName}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">View your profile</p>
                </div>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="p-4 space-y-2">
              {quickActions.map((action) => (
                <Link
                  key={action.path}
                  to={action.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="text-gray-900 dark:text-white font-medium">{action.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 md:hidden">
          <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-2 mr-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="w-5 h-5" />
            </button>
            <input
              type="text"
              placeholder="Search students, groups..."
              className="flex-1 p-3 bg-gray-100 dark:bg-gray-800 rounded-full outline-none"
              autoFocus
            />
          </div>
          <div className="p-4">
            <p className="text-gray-500 dark:text-gray-400 text-center">Start typing to search...</p>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileTopNavbar;

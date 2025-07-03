
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, X, User, Settings, LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ThemeToggle } from '../ThemeToggle';
import NotificationDropdown from './NotificationDropdown';

const MobileTopNavbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <>
      <nav className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-40 shadow-sm">
        <div className="px-4 sm:px-6">
          <div className="flex justify-between items-center h-14">
            {/* Left side - Menu button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="rounded-full"
            >
              <Menu className="w-5 h-5" />
            </Button>

            {/* Center - Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">A</span>
              </div>
              <span className="font-bold text-lg text-gray-900 dark:text-white">AcademeNFT</span>
            </Link>

            {/* Right side - Actions */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSearch}
                className="rounded-full"
              >
                <Search className="w-5 h-5" />
              </Button>
              
              {/* Notification Dropdown */}
              <NotificationDropdown />
              
              <ThemeToggle />
            </div>
          </div>

          {/* Search Bar */}
          {isSearchOpen && (
            <div className="py-3 border-t border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6"
                  onClick={toggleSearch}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={toggleMenu}
          />
          <div className="fixed top-0 left-0 w-80 h-full bg-white dark:bg-gray-900 z-50 transform transition-transform duration-300 shadow-2xl">
            {/* Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  JD
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">John Doe</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Student</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                className="rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Menu Items */}
            <div className="p-4 space-y-1">
              <Link
                to="/profile"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={toggleMenu}
              >
                <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="font-medium text-gray-900 dark:text-white">Profile</span>
              </Link>
              
              <Link
                to="/settings"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={toggleMenu}
              >
                <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="font-medium text-gray-900 dark:text-white">Settings</span>
              </Link>
              
              <button
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full text-left"
                onClick={() => {
                  toggleMenu();
                  // Handle logout
                }}
              >
                <LogOut className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="font-medium text-gray-900 dark:text-white">Sign out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MobileTopNavbar;


import React, { useState, useRef, useEffect } from 'react';
import { Bell, MessageCircle, Users, Award, X, Settings } from 'lucide-react';

interface Notification {
  id: string;
  type: 'algebrain' | 'studybuddy' | 'academenft';
  title: string;
  message: string;
  time: string;
  unread: boolean;
  icon: React.ReactNode;
}

const NotificationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'algebrain',
      title: 'New AI Solution Available',
      message: 'AlgebrAI has generated a new solution for your calculus problem set.',
      time: '2 minutes ago',
      unread: true,
      icon: <MessageCircle className="w-4 h-4 text-blue-500" />
    },
    {
      id: '2',
      type: 'studybuddy',
      title: 'Study Group Invitation',
      message: 'Sarah invited you to join the "Advanced Physics" study group.',
      time: '15 minutes ago',
      unread: true,
      icon: <Users className="w-4 h-4 text-green-500" />
    },
    {
      id: '3',
      type: 'academenft',
      title: 'Achievement Unlocked',
      message: 'You earned the "Knowledge Seeker" NFT badge for completing 10 courses.',
      time: '1 hour ago',
      unread: false,
      icon: <Award className="w-4 h-4 text-purple-500" />
    },
    {
      id: '4',
      type: 'algebrain',
      title: 'Weekly Progress Report',
      message: 'Your learning progress summary is ready to view.',
      time: '3 hours ago',
      unread: false,
      icon: <MessageCircle className="w-4 h-4 text-blue-500" />
    }
  ]);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, unread: false } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, unread: false }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'algebrain': return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      case 'studybuddy': return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'academenft': return 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800';
      default: return 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 group"
      >
        <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden backdrop-blur-md">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                  >
                    Mark all read
                  </button>
                )}
                <button className="p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <Settings className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-6 py-8 text-center">
                <Bell className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400 font-medium">No notifications yet</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">We'll notify you when something happens</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`px-4 py-4 border-l-4 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer group ${
                    notification.unread 
                      ? `${getTypeColor(notification.type)} border-l-blue-500` 
                      : 'bg-white dark:bg-gray-900 border-l-transparent hover:border-l-gray-300 dark:hover:border-l-gray-600'
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {notification.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${
                            notification.unread 
                              ? 'text-gray-900 dark:text-white' 
                              : 'text-gray-700 dark:text-gray-300'
                          }`}>
                            {notification.title}
                          </p>
                          <p className={`text-sm mt-1 ${
                            notification.unread 
                              ? 'text-gray-600 dark:text-gray-300' 
                              : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 flex items-center space-x-2">
                            <span>{notification.time}</span>
                            <span className="capitalize px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full font-medium">
                              {notification.type}
                            </span>
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeNotification(notification.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
                        >
                          <X className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <button className="w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;

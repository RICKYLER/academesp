
import React, { useState } from 'react';
import { Bell, X, MessageSquare, User, BookOpen } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface Notification {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'algebrain' | 'studybuddy' | 'academenft';
}

const NotificationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      sender: 'algebrain',
      message: 'New algebra problem available for practice',
      timestamp: '2 min ago',
      isRead: false,
      type: 'algebrain'
    },
    {
      id: '2',
      sender: 'studybuddy',
      message: 'Your study partner is ready for the session',
      timestamp: '5 min ago',
      isRead: false,
      type: 'studybuddy'
    },
    {
      id: '3',
      sender: 'academenft',
      message: 'New achievement unlocked: Study Streak Master!',
      timestamp: '10 min ago',
      isRead: true,
      type: 'academenft'
    },
    {
      id: '4',
      sender: 'algebrain',
      message: 'Weekly progress report is now available',
      timestamp: '1 hour ago',
      isRead: false,
      type: 'algebrain'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'algebrain':
        return <BookOpen className="w-4 h-4 text-blue-500" />;
      case 'studybuddy':
        return <User className="w-4 h-4 text-green-500" />;
      case 'academenft':
        return <MessageSquare className="w-4 h-4 text-purple-500" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  return (
    <div className="relative">
      {/* Notification Bell Button */}
      <Button
        variant="ghost"
        size="icon"
        className="relative rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white min-w-[20px] h-5 text-xs rounded-full flex items-center justify-center animate-pulse">
            {unreadCount}
          </Badge>
        )}
      </Button>

      {/* Notification Dropdown */}
      {isOpen && (
        <>
          {/* Background overlay */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown content */}
          <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 animate-fade-in backdrop-blur-lg">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-500" />
                Notifications
              </h3>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-blue-600 hover:text-blue-700"
                    onClick={markAllAsRead}
                  >
                    Mark all read
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-6 h-6 rounded-full"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                  <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No notifications yet</p>
                </div>
              ) : (
                <div className="py-2">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-all border-l-4 ${
                        !notification.isRead 
                          ? 'border-l-blue-500 bg-blue-50/50 dark:bg-blue-900/20' 
                          : 'border-l-transparent'
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                              {notification.sender}
                            </p>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {notification.timestamp}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                >
                  View all notifications
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationDropdown;

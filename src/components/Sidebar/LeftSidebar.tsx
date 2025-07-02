
import React from 'react';
import { User, Users, MessageCircle, Bell, Bookmark, UserCheck } from 'lucide-react';
import { useProfile } from '../../contexts/ProfileContext';

const menuItems = [
  { icon: User, label: 'Profile', active: false },
  { icon: Users, label: 'My Network', active: true },
  { icon: MessageCircle, label: 'Messages', active: false },
  { icon: Bell, label: 'Notifications', active: false },
  { icon: Bookmark, label: 'Bookmarks', active: false },
  { icon: UserCheck, label: 'Study Groups', active: false },
];

const suggestedConnections = [
  { name: 'Sarah Chen', school: 'MIT', mutual: 12 },
  { name: 'Alex Rodriguez', school: 'Stanford', mutual: 8 },
  { name: 'Emma Thompson', school: 'Harvard', mutual: 15 },
  { name: 'David Kim', school: 'Berkeley', mutual: 6 },
];

const LeftSidebar: React.FC = () => {
  const { profileName } = useProfile();

  return (
    <aside className="w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-screen sticky top-16 p-4">
      {/* Profile Card */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-4 mb-6 text-white">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold">{profileName}</h3>
            <p className="text-sm opacity-90">Computer Science, MIT</p>
          </div>
        </div>
        <div className="mt-3 flex justify-between text-sm">
          <div>
            <div className="font-medium">128</div>
            <div className="opacity-80">Connections</div>
          </div>
          <div>
            <div className="font-medium">2.4k</div>
            <div className="opacity-80">Study Points</div>
          </div>
        </div>
      </div>

      {/* Quick Menu */}
      <div className="mb-6">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                item.active 
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Suggested Connections */}
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
          Suggested Connections
        </h4>
        <div className="space-y-3">
          {suggestedConnections.map((connection) => (
            <div key={connection.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
                  {connection.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white text-sm">
                    {connection.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {connection.school} • {connection.mutual} mutual
                  </div>
                </div>
              </div>
              <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
                Connect
              </button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;

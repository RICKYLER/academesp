
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Clock, Users, BookOpen, MessageCircle, Heart } from 'lucide-react';

const ActivityFeed: React.FC = () => {
  const activities = [
    {
      type: 'study_group',
      title: 'Joined "Advanced Algorithms Study Group"',
      time: '2 hours ago',
      icon: Users,
      color: 'text-blue-500'
    },
    {
      type: 'achievement',
      title: 'Completed Machine Learning Course',
      time: '1 day ago',
      icon: BookOpen,
      color: 'text-green-500'
    },
    {
      type: 'post',
      title: 'Shared notes on Database Systems',
      time: '2 days ago',
      icon: MessageCircle,
      color: 'text-purple-500'
    },
    {
      type: 'like',
      title: 'Liked Sarah\'s post about React hooks',
      time: '3 days ago',
      icon: Heart,
      color: 'text-red-500'
    },
    {
      type: 'study_group',
      title: 'Created "JavaScript Fundamentals" study group',
      time: '1 week ago',
      icon: Users,
      color: 'text-blue-500'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="w-5 h-5" />
          <span>Recent Activity</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3 pb-4 border-b border-gray-100 dark:border-gray-800 last:border-b-0 last:pb-0">
              <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <activity.icon className={`w-4 h-4 ${activity.color}`} />
              </div>
              <div className="flex-1">
                <p className="text-gray-900 dark:text-white font-medium">
                  {activity.title}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Trophy, Star, Medal, Award } from 'lucide-react';

const AchievementsSection: React.FC = () => {
  const achievements = [
    {
      title: 'Dean\'s List',
      description: 'Achieved for 3 consecutive semesters',
      icon: Trophy,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20'
    },
    {
      title: 'Hackathon Winner',
      description: 'MIT Innovation Challenge 2024',
      icon: Star,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'Research Assistant',
      description: 'AI Lab Research Program',
      icon: Medal,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      title: 'Study Group Leader',
      description: 'Led 5+ successful study groups',
      icon: Award,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Trophy className="w-5 h-5" />
          <span>Achievements</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${achievement.bgColor}`}>
                <achievement.icon className={`w-5 h-5 ${achievement.color}`} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {achievement.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {achievement.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementsSection;

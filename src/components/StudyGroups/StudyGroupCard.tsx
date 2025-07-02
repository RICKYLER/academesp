
import React from 'react';
import { Users, Clock, BookOpen, Star, Calendar } from 'lucide-react';

interface StudyGroup {
  id: number;
  name: string;
  subject: string;
  members: number;
  maxMembers: number;
  description: string;
  schedule: string;
  difficulty: string;
  isJoined: boolean;
}

interface StudyGroupCardProps {
  group: StudyGroup;
}

const StudyGroupCard: React.FC<StudyGroupCardProps> = ({ group }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'Intermediate':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Advanced':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {group.name}
          </h3>
          <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
            {group.subject}
          </span>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(group.difficulty)}`}>
          {group.difficulty}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
        {group.description}
      </p>

      {/* Info */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Users className="w-4 h-4 mr-2" />
          <span>{group.members}/{group.maxMembers} members</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{group.schedule}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${(group.members / group.maxMembers) * 100}%` }}
          />
        </div>
      </div>

      {/* Action Button */}
      <button
        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
          group.isJoined
            ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {group.isJoined ? 'View Group' : 'Join Group'}
      </button>
    </div>
  );
};

export default StudyGroupCard;

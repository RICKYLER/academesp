
import React, { useState } from 'react';
import { X, Users, Calendar, BookOpen, Star, Clock, MapPin, Trophy, MessageCircle } from 'lucide-react';

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
  location?: string;
  meetingType?: 'online' | 'in-person' | 'hybrid';
  tags?: string[];
  instructor?: string;
  rating?: number;
  totalRatings?: number;
  recentActivity?: string[];
  nextMeeting?: string;
}

interface StudyGroupDetailModalProps {
  group: StudyGroup;
  isOpen: boolean;
  onClose: () => void;
  onJoinGroup: (groupId: number) => void;
  onLeaveGroup: (groupId: number) => void;
}

const StudyGroupDetailModal: React.FC<StudyGroupDetailModalProps> = ({
  group,
  isOpen,
  onClose,
  onJoinGroup,
  onLeaveGroup
}) => {
  const [isJoining, setIsJoining] = useState(false);

  if (!isOpen) return null;

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

  const handleJoinLeave = async () => {
    setIsJoining(true);
    try {
      if (group.isJoined) {
        await onLeaveGroup(group.id);
      } else {
        await onJoinGroup(group.id);
      }
    } finally {
      setIsJoining(false);
    }
  };

  const isGroupFull = group.members >= group.maxMembers;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-6 flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white truncate">
                {group.name}
              </h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(group.difficulty)}`}>
                {group.difficulty}
              </span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
              <span className="text-blue-600 dark:text-blue-400 font-medium">{group.subject}</span>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span>{group.rating || 4.8} ({group.totalRatings || 12} reviews)</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
              <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {group.members}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Members</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
              <Calendar className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                2x
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Per Week</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
              <Trophy className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {group.rating || 4.8}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Rating</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
              <Clock className="w-6 h-6 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                6mo
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active</div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">About This Group</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {group.description}
            </p>
          </div>

          {/* Schedule & Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Schedule</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Calendar className="w-5 h-5 mr-3" />
                  <span>{group.schedule}</span>
                </div>
                {group.nextMeeting && (
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Clock className="w-5 h-5 mr-3" />
                    <span>Next meeting: {group.nextMeeting}</span>
                  </div>
                )}
                {group.location && (
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <MapPin className="w-5 h-5 mr-3" />
                    <span>{group.location}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Group Info</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Capacity:</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {group.members}/{group.maxMembers} members
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Meeting Type:</span>
                  <span className="text-gray-900 dark:text-white font-medium capitalize">
                    {group.meetingType || 'Online'}
                  </span>
                </div>
                {group.instructor && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Instructor:</span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {group.instructor}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Group Capacity</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {Math.round((group.members / group.maxMembers) * 100)}% full
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(group.members / group.maxMembers) * 100}%` }}
              />
            </div>
          </div>

          {/* Tags */}
          {group.tags && group.tags.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Topics</h3>
              <div className="flex flex-wrap gap-2">
                {group.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Recent Activity */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Recent Activity</h3>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <MessageCircle className="w-4 h-4 mr-2" />
                <span>Sarah shared new study materials • 2 hours ago</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Users className="w-4 h-4 mr-2" />
                <span>Mike joined the group • 1 day ago</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <BookOpen className="w-4 h-4 mr-2" />
                <span>Completed Chapter 5 discussion • 3 days ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-col sm:flex-row gap-3">
            {group.isJoined ? (
              <>
                <button
                  onClick={handleJoinLeave}
                  disabled={isJoining}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  {isJoining ? 'Leaving...' : 'Leave Group'}
                </button>
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors">
                  View Group Chat
                </button>
              </>
            ) : (
              <button
                onClick={handleJoinLeave}
                disabled={isJoining || isGroupFull}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                  isGroupFull
                    ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isJoining ? 'Joining...' : isGroupFull ? 'Group Full' : 'Join Group'}
              </button>
            )}
          </div>
          {!group.isJoined && !isGroupFull && (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
              You'll be able to participate in discussions and access study materials
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyGroupDetailModal;

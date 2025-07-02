
import React from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from 'lucide-react';

const posts = [
  {
    id: 1,
    author: 'Study Tips Central',
    avatar: '📚',
    time: '2h',
    content: 'Master the Pomodoro Technique: 25 minutes focused study + 5 minute break. After 4 cycles, take a 30-minute break. This method can improve your concentration by up to 40%!',
    likes: 234,
    comments: 45,
    shares: 12,
    type: 'tip'
  },
  {
    id: 2,
    author: 'MIT Hackathon 2024',
    avatar: '🏆',
    time: '4h',
    content: 'Registration is now OPEN for MIT\'s biggest hackathon! 💻 Win $50,000 in prizes, network with tech leaders, and build the next big thing. Limited spots available!',
    likes: 892,
    comments: 156,
    shares: 203,
    type: 'event'
  },
  {
    id: 3,
    author: 'Sarah Chen',
    avatar: '👩‍💻',
    time: '6h',
    content: 'Just discovered this amazing study spot at the university library - Level 3 has the perfect ambient noise and natural lighting. Perfect for deep focus sessions! 📖✨',
    likes: 127,
    comments: 23,
    shares: 8,
    type: 'location'
  }
];

const NewsFeed: React.FC = () => {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div key={post.id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          {/* Post Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-lg">
                {post.avatar}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {post.author}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {post.time} ago
                </p>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <MoreHorizontal className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Post Content */}
          <div className="mb-4">
            <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
              {post.content}
            </p>
          </div>

          {/* Post Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-6">
              <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors">
                <Heart className="w-5 h-5" />
                <span className="text-sm">{post.likes}</span>
              </button>
              
              <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm">{post.comments}</span>
              </button>
              
              <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-400 transition-colors">
                <Share2 className="w-5 h-5" />
                <span className="text-sm">{post.shares}</span>
              </button>
            </div>
            
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <Bookmark className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsFeed;

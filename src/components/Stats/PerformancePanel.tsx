
import React from 'react';
import { Brain, Heart, Target, BookOpen, TrendingUp } from 'lucide-react';

const stats = [
  {
    label: 'IQ Score',
    value: 127,
    percentage: 85,
    icon: Brain,
    color: 'bg-blue-500',
    trend: '+3 this month'
  },
  {
    label: 'EQ Level',
    value: 89,
    percentage: 78,
    icon: Heart,
    color: 'bg-red-500',
    trend: '+5 this month'
  },
  {
    label: 'Mental Health',
    value: 92,
    percentage: 92,
    icon: Target,
    color: 'bg-green-500',
    trend: 'Excellent'
  },
  {
    label: 'Math Skills',
    value: 94,
    percentage: 94,
    icon: BookOpen,
    color: 'bg-purple-500',
    trend: '+8 this month'
  },
  {
    label: 'Comprehension',
    value: 88,
    percentage: 88,
    icon: TrendingUp,
    color: 'bg-orange-500',
    trend: '+2 this month'
  }
];

const PerformancePanel: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Performance Summary
        </h3>
        <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
          View Details
        </button>
      </div>

      <div className="space-y-4">
        {stats.map((stat) => (
          <div key={stat.label} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white text-sm">
                    {stat.label}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {stat.trend}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {stat.percentage}%
                </div>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${stat.color} transition-all duration-500 ease-out`}
                style={{ width: `${stat.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="font-medium text-gray-900 dark:text-white">Overall Progress</span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          You're performing exceptionally well! Keep up the great work to maintain your academic excellence.
        </p>
      </div>
    </div>
  );
};

export default PerformancePanel;

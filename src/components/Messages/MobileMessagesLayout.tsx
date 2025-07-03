
import React from 'react';
import ResponsiveNavbar from '../Navigation/ResponsiveNavbar';
import MessagesContent from './MessagesContent';

const MobileMessagesLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <ResponsiveNavbar />
      
      <div className="p-3 md:p-6 pb-20 md:pb-6 max-w-4xl mx-auto">
        <MessagesContent />
      </div>
    </div>
  );
};

export default MobileMessagesLayout;

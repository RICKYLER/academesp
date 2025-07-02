
import React from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import MessagesLayout from '../components/Messages/MessagesLayout';

const Messages: React.FC = () => {
  return (
    <ThemeProvider>
      <MessagesLayout />
    </ThemeProvider>
  );
};

export default Messages;

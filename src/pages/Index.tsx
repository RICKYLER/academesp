
import React from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import MainLayout from '../components/Layout/MainLayout';

const Index: React.FC = () => {
  return (
    <ThemeProvider>
      <MainLayout />
    </ThemeProvider>
  );
};

export default Index;

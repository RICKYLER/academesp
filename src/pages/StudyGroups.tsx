
import React from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import StudyGroupsLayout from '../components/StudyGroups/StudyGroupsLayout';

const StudyGroups: React.FC = () => {
  return (
    <ThemeProvider>
      <StudyGroupsLayout />
    </ThemeProvider>
  );
};

export default StudyGroups;

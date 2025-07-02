
import React from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import ProfileLayout from '../components/Profile/ProfileLayout';

const Profile: React.FC = () => {
  return (
    <ThemeProvider>
      <ProfileLayout />
    </ThemeProvider>
  );
};

export default Profile;

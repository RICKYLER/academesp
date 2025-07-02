
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ProfileContextType {
  profileName: string;
  profileImage: string;
  updateProfile: (name: string, image: string) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
  const [profileName, setProfileName] = useState('Alex Thompson');
  const [profileImage, setProfileImage] = useState('/placeholder.svg');

  const updateProfile = (name: string, image: string) => {
    setProfileName(name);
    setProfileImage(image);
  };

  return (
    <ProfileContext.Provider value={{ profileName, profileImage, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

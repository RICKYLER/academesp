
import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { MapPin, Calendar, BookOpen } from 'lucide-react';
import ProfileEditDialog from './ProfileEditDialog';

const ProfileHeader: React.FC = () => {
  const [profileName, setProfileName] = useState('Alex Thompson');
  const [profileImage, setProfileImage] = useState('/placeholder.svg');

  const handleProfileSave = (name: string, image: string) => {
    setProfileName(name);
    setProfileImage(image);
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-0">
        {/* Cover Photo */}
        <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg relative">
          <div className="absolute top-4 right-4">
            <ProfileEditDialog
              currentName={profileName}
              currentImage={profileImage}
              onSave={handleProfileSave}
            />
          </div>
        </div>
        
        {/* Profile Info */}
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6 -mt-16">
            {/* Avatar */}
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-white dark:border-gray-800">
                <AvatarImage src={profileImage} alt="Profile" />
                <AvatarFallback className="text-2xl bg-gradient-to-r from-blue-400 to-purple-500 text-white">
                  {profileName.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            
            {/* Name and Basic Info */}
            <div className="flex-1 mt-4 sm:mt-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {profileName}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    Computer Science Student
                  </p>
                </div>
              </div>
              
              {/* Stats */}
              <div className="flex space-x-6 mt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">247</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Connections</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">3.2k</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Study Points</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">18</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Achievements</div>
                </div>
              </div>
              
              {/* Quick Info */}
              <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Joined January 2023</span>
                </div>
                <div className="flex items-center space-x-1">
                  <BookOpen className="w-4 h-4" />
                  <span>Stanford Class of 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;

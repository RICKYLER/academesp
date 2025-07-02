
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Settings, Camera, Save, X } from 'lucide-react';

interface ProfileEditDialogProps {
  currentName: string;
  currentImage: string;
  onSave: (name: string, image: string) => void;
}

const ProfileEditDialog: React.FC<ProfileEditDialogProps> = ({
  currentName,
  currentImage,
  onSave
}) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(currentName);
  const [imageUrl, setImageUrl] = useState(currentImage);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave(name, imageUrl);
    setOpen(false);
  };

  const handleCancel = () => {
    setName(currentName);
    setImageUrl(currentImage);
    setImageFile(null);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center space-x-2">
          <Settings className="w-4 h-4" />
          <span>Edit Profile</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Profile Settings</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={imageUrl} alt="Profile preview" />
                <AvatarFallback className="text-lg bg-gradient-to-r from-blue-400 to-purple-500 text-white">
                  {name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <label 
                htmlFor="avatar-upload" 
                className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer transition-colors"
              >
                <Camera className="w-3 h-3" />
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Click the camera icon to upload a new profile picture
            </p>
          </div>

          {/* Name Section */}
          <div className="space-y-2">
            <Label htmlFor="profile-name">Full Name</Label>
            <Input
              id="profile-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-4">
            <Button onClick={handleSave} className="flex-1 flex items-center space-x-2">
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </Button>
            <Button 
              variant="outline" 
              onClick={handleCancel}
              className="flex-1 flex items-center space-x-2"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditDialog;

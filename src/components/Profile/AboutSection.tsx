
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Edit } from 'lucide-react';

const AboutSection: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [about, setAbout] = useState(
    "Passionate computer science student at MIT with a focus on artificial intelligence and machine learning. I love collaborating on innovative projects and helping fellow students succeed in their academic journey. Always excited to learn new technologies and contribute to open-source projects."
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>About</CardTitle>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <Edit className="w-4 h-4" />
        </button>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-4">
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
              rows={4}
            />
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {about}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default AboutSection;

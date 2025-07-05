import React, { useState } from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import ResponsiveLayout from '../components/Layout/ResponsiveLayout';
import { ThreeDotIcon } from '../components/Icons/ThreeDotIcon';

const Index: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleReport = () => {
    // Open a modal, or send a report request
    alert("Report option clicked!");
    setMenuOpen(false);
  };

  return (
    <ThemeProvider>
      <ResponsiveLayout>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <ThreeDotIcon />
        </button>
        {menuOpen && (
          <div className="dropdown-menu">
            <button onClick={handleReport}>Report</button>
            {/* Other options */}
          </div>
        )}
      </ResponsiveLayout>
    </ThemeProvider>
  );
};

export default Index;

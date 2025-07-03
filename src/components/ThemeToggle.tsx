
import React from 'react';
import './ThemeToggle.css';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle }) => {
  return (
    <div 
      className={`tdnn ${isDark ? '' : 'day'}`}
      onClick={onToggle}
      style={{ cursor: 'pointer' }}
    >
      <div className={`moon ${isDark ? '' : 'sun'}`}></div>
    </div>
  );
};

export default ThemeToggle;

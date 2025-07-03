
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div 
      className={`tdnn ${isDark ? '' : 'day'}`}
      onClick={toggleTheme}
      style={{ cursor: 'pointer' }}
    >
      <div className={`moon ${isDark ? '' : 'sun'}`}></div>
    </div>
  );
};

export default ThemeToggle;

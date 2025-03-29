import React from "react";
import { useTheme } from "./ThemeContext";
import './ThemeSwitcher.css';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme(); 

  return (
    <div className={`container ${theme}`}>
      <h2>Theme Changer</h2>
      <p>Current Theme: <strong>{theme.toUpperCase()}</strong></p>
      <button onClick={toggleTheme} className="toggle-btn">
        Toggle Theme
      </button>
    </div>
  );
};

export default ThemeSwitcher;

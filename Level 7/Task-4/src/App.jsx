import React from "react";
import User from "./User.jsx"; 
import './App.css';

const App = () => {
  const [theme, setTheme] = User("theme", "light");

  return (
    <div className={`app ${theme}`}>
      <h1>Theme</h1>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle Theme
      </button>
      <p>Current theme: {theme}</p>
    </div>
  );
};

export default App;

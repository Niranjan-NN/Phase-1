import React from "react";
import Toogle from "./Toogle.jsx"; 
import './App.css';

const App = () => {
  const [isVisible, toggleVisibility] = Toogle(false);

  return (
    <div className="app-container">
      <h1>Toggle</h1>
      
      <button onClick={toggleVisibility} className="toggle-btn">
        SHOW
      </button>

      {isVisible && (
        <div className="content">
          <p className="p">Hii!! I am Pradeep from the department of Information Technology</p>
        </div>
      )}
    </div>
  );
};

export default App;

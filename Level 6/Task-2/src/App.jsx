import React, { useState } from "react";
import './App.css'

const Toggle = () => {
  const [isVisible, setIsVisible] = useState(false); 

  return (
    <div className="toggle-container">
      <h2> Toggle </h2>
      <button onClick={() => setIsVisible(!isVisible)} className="toggle-btn">
        {isVisible ? "Hide Content" : "Show Content"}
      </button>

      {isVisible && <p className="content">Hello! I am pradeep from the department of the Information Technology.</p>}
    </div>
  );
};

export default Toggle;

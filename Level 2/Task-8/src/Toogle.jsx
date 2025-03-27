import React, { useState } from "react";
import './App.css';

const ToggleContent = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div >
      <button className="button"
        onClick={() => setIsVisible(prev => !prev)}
      >
        {isVisible ? "Hide Content" : "Show Content"}
      </button>
      {isVisible && (
        <div>
          <p className="p">Hii!! This is Pradeep!!</p>
        </div>
      )}
    </div>
  );
};

export default ToggleContent;

import React, { useState, useEffect } from "react";
import './App.css';

const TimerComponent = () => {
  useEffect(() => {
    console.log(" Timer started!");

   
    const intervalId = setInterval(() => {
      console.log("Logging message ");
    }, 1000);

  
    return () => {
      clearInterval(intervalId); 
      console.log("Timer stopped!");
    };
  }, []); 

  return (
    <div className="timer-container">
      <h2>useEffect Cleanup Example</h2>
      <p>Check the console to see messages logging every second.</p>
    </div>
  );
};

const App = () => {
  const [showTimer, setShowTimer] = useState(true);

  return (
    <div className="app-container">
      <button onClick={() => setShowTimer(!showTimer)} className="toggle-btn">
        {showTimer ? "Unmount Timer" : "Mount Timer"}
      </button>

      {showTimer && <TimerComponent />}
    </div>
  );
};

export default App;

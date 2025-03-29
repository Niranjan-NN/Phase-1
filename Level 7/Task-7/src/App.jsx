import React from "react";
import Window from "./Window";
import './App.css';

const App = () => {
  const { width, height } = Window();

  return (
    <div className="app">
      <h1>Window Size </h1>
      <p>
        Current window dimensions: {width}px (width) x {height}px (height)
      </p>
    </div>
  );
};

export default App;

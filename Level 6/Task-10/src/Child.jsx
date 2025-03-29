import React, { memo } from "react";
import './App.css';

const Child = ({ onIncrement }) => {
  console.log("Child component re-rendered");

  return (
    <div className="child-container">
      <h2>Child </h2>
      <button onClick={onIncrement}>Parent's Increment</button>
    </div>
  );
};

export default memo(Child);

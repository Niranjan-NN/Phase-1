import React, { useState, useCallback } from "react";
import Child from "./Child"; 
import './App.css';

const Parent = () => {
  const [count, setCount] = useState(0);

  
  const handleIncrement = useCallback(() => {
    setCount(count + 1); 
  }, [count]); 

  return (
    <div className="parent-container">
      <h1>Parent</h1>
      <p className="p">Count: {count}</p>
      <Child onIncrement={handleIncrement} />
    </div>
  );
};

export default Parent;

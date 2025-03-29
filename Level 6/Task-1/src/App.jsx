import React, { useState } from "react";
import './App.css';

const Counter = () => {
  const [count, setCount] = useState(0); 

  return (
    <div className="counter-container">
      <h2>Simple Counter</h2>
      <p className="count">{count}</p>
      <div>
        <button onClick={() => setCount(count + 1)} className="btn increment">
           Increment
        </button>
        <button onClick={() => setCount(count - 1)} className="btn decrement">
           Decrement
        </button>
      </div>
    </div>
  );
};

export default Counter;

import React, { useState } from "react";
import './App.css';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1 className="h1">Counter: {count}</h1>
      <div>
        <button
          className="button"
          onClick={() => setCount(count + 1)}>
          Increment
        </button>
        <button
          className="button"
          onClick={() => setCount(count - 1)}>
          Decrement
        </button>
      </div>
    </div>
  );
};

export default Counter;

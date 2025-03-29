import React from "react";
import Counter from "./Counter"; 
import './App.css'

const App = () => {
  const { counter, increment, decrement, reset } = Counter(0);

  return (
    <div className="counter-container">
      <h1>Counter: {counter}</h1>
      <button onClick={increment} className="counter-btn">Increment</button>
      <button onClick={decrement} className="counter-btn">Decrement</button>
      <button onClick={reset} className="counter-btn">Reset</button>
    </div>
  );
};

export default App;

import React, { useReducer } from "react";
import { Reducer, INCREMENT, DECREMENT } from "./Reducer"; 
import './Counter.css'

const Counter = () => {

  const initialState = { count: 0 };

  
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <div className="counter-container">
      <h1>COUNTER</h1>
      <p>Count: {state.count}</p>

      <div className="buttons">
        <button onClick={() => dispatch({ type: INCREMENT })}>Increment</button>
        <button onClick={() => dispatch({ type: DECREMENT })}>Decrement</button>
      </div>
    </div>
  );
};

export default Counter;

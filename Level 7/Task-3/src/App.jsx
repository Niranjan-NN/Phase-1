import React from "react";
import Input from "./Input";
import './App.css';

const App = () => {
  const { value, onChange, inputRef } = Input("");

  return (
    <div className="input-container">
      <h1>Input Field</h1>
      <input
        ref={inputRef}    
        type="text"
        value={value}     
        onChange={onChange} 
        className="input-field"
        placeholder="Enter some text..."
      />
      <p>You typed: {value}</p>
    </div>
  );
};

export default App;

import React, { useState } from "react";
import Document from "./Document"; 
import './App.css';

const App = () => {
  const [inputText, setInputText] = useState(""); 
  const [userName, setUserName] = useState("Pardeep");

  
  Document(`${userName}'s Dashboard - ${inputText || "React App"}`);
  const handleInputChange = (e) => {
    setInputText(e.target.value); 
  };
  const changeUserName = () => {
    setUserName("Rooban");
  };

  return (
    <div className="app">
      <h1> Document </h1>
      <button onClick={changeUserName}>Change User Name</button>
      <p>Welcome, {userName}</p>
      
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Type something to change the title"
      />
      <p>Current Input: {inputText}</p>
    </div>
  );
};

export default App;

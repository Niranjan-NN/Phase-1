import React from "react";
import VirtualList from "./VirtualList";
import "./App.css";

const App = () => {
  return (
    <div className="app-container">
      <h1> Scrolling window</h1>
      <VirtualList itemCount={10000} />
    </div>
  );
};

export default App;

import React from 'react';
import './App.css'

const App = () => {
  const items = ['Apple', 'Banana', 'Cherry', 'Dates', 'Berry'];

  return (
    <div>
      <h1 className="h1">List of Fruits</h1>
      <ul className="list">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;

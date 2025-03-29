import React from "react";
import Fetch from "./Fetch";
import './App.css'; 

const App = () => {
  const { data, loading, error } = Fetch("https://jsonplaceholder.typicode.com/posts");

  return (
    <div className="app">
      <h1>Data Fetching </h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {data &&
          data.slice(0, 5).map((item) => ( 
            <li key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default App;

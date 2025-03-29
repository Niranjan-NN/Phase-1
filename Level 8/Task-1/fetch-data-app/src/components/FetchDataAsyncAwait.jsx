import React, { useState } from "react";
import axios from "axios";
import "../styles/App.css";

const fetchData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return [
    { id: 1, name: "Charlie" },
    { id: 2, name: "David" },
  ];
};

const FetchDataAsyncAwait = () => {
  const [data, setData] = useState([]);

  const handleFetch = async () => {
    const result = await fetchData();
    console.log("Async/Await Data:", result);
    setData(result);
  };

  return (
    <div className="card">
      <h2>Async/Await Example</h2>
      <button className="btn" onClick={handleFetch}>Fetch Data (Async/Await)</button>
      <ul>
        {data.map((item) => (
          <li key={item.id} className="list-item">{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FetchDataAsyncAwait;

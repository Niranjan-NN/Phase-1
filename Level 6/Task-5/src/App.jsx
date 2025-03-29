import React, { useState, useEffect } from "react";
import './App.css';

const FetchData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/2")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="fetch-container">
      <h2 className="title"> Fetch</h2>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      {data && (
        <div className="data-card">
          <h3>Fetched Data:</h3>
          <p><strong>ID:</strong> {data.id}</p>
          <p><strong>Title:</strong> {data.title}</p>
          <p><strong>Completed:</strong> {data.completed ? " Yes" : " No"}</p>
        </div>
      )}
    </div>
  );
};

export default FetchData;

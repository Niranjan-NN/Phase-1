import React, { useState } from "react";
import Debounce from "./Debounce";
import './App.css'; 



const App = () => {
  const [query, setQuery] = useState(""); 
  const debouncedQuery = Debounce(query, 1000);
  React.useEffect(() => {
    if (debouncedQuery) {
      console.log("API call with query:", debouncedQuery);
    }
  }, [debouncedQuery]);

  return (
    <div className="app">
      <h1>Debounced Search</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for something..."
        className="search-input"
      />
      <p>Searching for: {debouncedQuery}</p>
    </div>
  );
};

export default App;

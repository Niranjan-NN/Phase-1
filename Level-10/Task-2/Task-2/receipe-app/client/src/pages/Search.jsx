import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css"; // Updated CSS import

const Search = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedQuery = query.trim().toLowerCase();

    if (trimmedQuery) {
      navigate(`/category/${trimmedQuery}`);
    } else {
      alert("Please enter a valid search term!");
    }
  };

  return (
    <div className="search-container">
      <h1>Search Recipes</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter keyword..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Search;

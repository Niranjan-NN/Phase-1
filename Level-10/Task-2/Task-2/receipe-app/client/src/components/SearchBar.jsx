import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/category/${query}`);
  };

  return (
    <div className="container mt-3">
      <form onSubmit={handleSearch} className="d-flex">
        <input
          type="text"
          className="form-control"
          placeholder="Search for recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-primary ms-2" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;

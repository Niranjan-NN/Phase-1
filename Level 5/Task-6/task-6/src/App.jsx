import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const API_KEY = "be432db4"; // Replace with a valid API key
const API_URL = "https://www.omdbapi.com/";

const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMovies = async () => {
    if (searchTerm.length < 3) {
      setError("Enter at least 3 characters");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`${API_URL}?s=${searchTerm}&apikey=${API_KEY}`);
      console.log("API Response:", response.data); // Debugging
      if (response.data.Response === "True") {
        setMovies(response.data.Search);
      } else {
        setMovies([]);
        setError(response.data.Error || "No results found.");
      }
    } catch (err) {
      setError("Failed to fetch movies. Check your API key or internet connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="movie-app">
      <h1>🎬 Movie Search</h1>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={fetchMovies}>Search</button>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="movie-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <img src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"} alt={movie.Title} />
              <h3>{movie.Title}</h3>
              <p>({movie.Year})</p>
            </div>
          ))
        ) : (
          !loading && <p className="no-results">No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default MovieSearch;

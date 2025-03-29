import React, { useState } from "react";

const API_KEY = import.meta.env.VITE_API_KEY; // Load API Key from .env

const SearchBar = ({ setWeather }) => {
  const [city, setCity] = useState("");

  const fetchWeather = async () => {
    if (!city) return alert("Please enter a city name.");

    try {
      console.log("Fetching weather for:", city);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      console.log("API Response:", data); // Debugging log

      if (data.cod === 200) {
        setWeather(data);
        setCity(""); // Clear input field after search
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Search</button>
    </div>
  );
};

export default SearchBar;

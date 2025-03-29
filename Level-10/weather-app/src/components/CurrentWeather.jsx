import React from "react";

const CurrentWeather = ({ weather }) => {
  if (!weather) return <p>No weather data available</p>;

  return (
    <div className="weather-container">
      <h2>Weather in {weather.name}, {weather.sys.country}</h2>
      <p>🌡 Temperature: {weather.main.temp}°C</p>
      <p>💧 Humidity: {weather.main.humidity}%</p>
      <p>🌬 Wind Speed: {weather.wind.speed} m/s</p>
      <p>⛅ Condition: {weather.weather[0].description}</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
        alt="Weather icon"
      />
    </div>
  );
};

export default CurrentWeather;

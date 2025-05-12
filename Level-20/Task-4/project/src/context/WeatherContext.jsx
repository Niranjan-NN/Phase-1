import { createContext, useContext, useState, useEffect } from 'react';
import { fetchWeatherByCity, fetchForecastByCity, fetchHistoricalData, isValidCity } from '../services/weatherService';

const WeatherContext = createContext();

export const useWeather = () => useContext(WeatherContext);

export const WeatherProvider = ({ children }) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check for last searched location in localStorage
    const lastLocation = localStorage.getItem('lastLocation');
    if (lastLocation && isValidCity(lastLocation)) {
      fetchWeatherData(lastLocation);
    }
  }, []);

  const fetchWeatherData = async (location) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch current weather
      const weatherData = await fetchWeatherByCity(location);
      setCurrentWeather(weatherData);
      
      // Only save to localStorage if it's a city name (string)
      if (typeof location === 'string') {
        // Save to last location
        localStorage.setItem('lastLocation', location);
        
        // Update recent searches
        const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
        if (!recentSearches.includes(location)) {
          recentSearches.unshift(location);
          if (recentSearches.length > 5) {
            recentSearches.pop();
          }
          localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
        }
      }
      
      // Fetch forecast data
      const forecastData = await fetchForecastByCity(location);
      setForecast(forecastData);
      
      // Fetch historical data using coordinates
      const historical = await fetchHistoricalData(weatherData.coord.lat, weatherData.coord.lon);
      setHistoricalData(historical);
      
      return weatherData;
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error('Error fetching weather data:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    currentWeather,
    forecast,
    historicalData,
    isLoading,
    error,
    fetchWeatherData
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useWeather } from '../../context/WeatherContext';
import { FaSearch, FaMapMarkerAlt, FaHistory } from 'react-icons/fa';
import { searchCities, getRecentSearches } from '../../services/weatherService';
import './SearchBar.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const { fetchWeatherData } = useWeather();

  // Load recent searches on component mount
  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Handle search term changes with debounce
  useEffect(() => {
    if (!searchTerm) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setIsLoading(true);
      try {
        const results = await searchCities(searchTerm);
        setSuggestions(results);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchSuggestions();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSearch = async (cityOrCoords) => {
    if (!cityOrCoords) return;
    
    try {
      await fetchWeatherData(cityOrCoords);
      navigate('/');
      setSearchTerm('');
      setShowSuggestions(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      handleSearch(searchTerm);
    }
  };

  const handleSuggestionClick = (city) => {
    handleSearch(city.name);
  };

  const handleInputFocus = () => {
    setShowSuggestions(true);
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        handleSearch({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      }, (error) => {
        console.error('Geolocation error:', error);
        // Handle error - show message to user
      });
    } else {
      console.error('Geolocation not supported');
    }
  };

  return (
    <div className="search-bar-container" ref={searchRef}>
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={handleInputFocus}
            placeholder="Search city..."
            className="search-input"
          />
          <button type="submit" className="search-button" aria-label="Search">
            <FaSearch />
          </button>
        </div>

        <AnimatePresence>
          {showSuggestions && (searchTerm || recentSearches.length > 0) && (
            <motion.div
              className="search-suggestions"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {isLoading ? (
                <div className="suggestions-loading">Loading suggestions...</div>
              ) : (
                <>
                  <div className="suggestion-group">
                    <button 
                      className="location-button" 
                      type="button"
                      onClick={handleUseCurrentLocation}
                    >
                      <FaMapMarkerAlt /> Use current location
                    </button>
                  </div>

                  {suggestions.length > 0 && (
                    <div className="suggestion-group">
                      <div className="suggestion-group-title">Suggestions</div>
                      {suggestions.map((city, index) => (
                        <div 
                          key={`suggestion-${index}`}
                          className="suggestion-item"
                          onClick={() => handleSuggestionClick(city)}
                        >
                          {city.name}, {city.country}
                        </div>
                      ))}
                    </div>
                  )}

                  {recentSearches.length > 0 && !searchTerm && (
                    <div className="suggestion-group">
                      <div className="suggestion-group-title">
                        <FaHistory /> Recent Searches
                      </div>
                      {recentSearches.map((city, index) => (
                        <div 
                          key={`recent-${index}`}
                          className="suggestion-item"
                          onClick={() => handleSearch(city)}
                        >
                          {city}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
};

export default SearchBar;
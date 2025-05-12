import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useWeather } from '../../context/WeatherContext';
import { FaHeart, FaTrash, FaMapMarkerAlt } from 'react-icons/fa';
import { getFavorites, removeFavorite } from '../../services/favoriteService';
import './FavoritesList.css';

const FavoritesList = () => {
  const [favorites, setFavorites] = useState([]);
  const { fetchWeatherData } = useWeather();
  const navigate = useNavigate();

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    const favoritesData = getFavorites();
    setFavorites(favoritesData);
  };

  const handleFavoriteClick = async (city) => {
    try {
      await fetchWeatherData(city.name);
      navigate('/');
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleRemoveFavorite = (e, id) => {
    e.stopPropagation();
    removeFavorite(id);
    loadFavorites();
  };

  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <div className="favorites-empty-icon">
          <FaHeart />
        </div>
        <h3>No Favorite Locations</h3>
        <p>Add locations to your favorites to quickly access their weather information</p>
      </div>
    );
  }

  return (
    <div className="favorites-list">
      <AnimatePresence>
        {favorites.map((favorite, index) => (
          <motion.div 
            key={favorite.id}
            className="favorite-item"
            onClick={() => handleFavoriteClick(favorite)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="favorite-info">
              <div className="favorite-icon">
                <FaMapMarkerAlt />
              </div>
              <div className="favorite-name">
                {favorite.name}, {favorite.country}
              </div>
            </div>
            <button 
              className="favorite-remove-btn"
              onClick={(e) => handleRemoveFavorite(e, favorite.id)}
              aria-label={`Remove ${favorite.name} from favorites`}
            >
              <FaTrash />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FavoritesList;
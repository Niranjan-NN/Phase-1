import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWeather } from '../../context/WeatherContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { addFavorite, removeFavorite, getFavorites } from '../../services/favoriteService';
import './FavoriteButton.css';

const FavoriteButton = () => {
  const { currentWeather } = useWeather();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!currentWeather) return;
    
    const favorites = getFavorites();
    const cityIsFavorite = favorites.some(favorite => 
      favorite.id === currentWeather.id
    );
    
    setIsFavorite(cityIsFavorite);
  }, [currentWeather]);

  const handleToggleFavorite = () => {
    if (!currentWeather) return;
    
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
    
    if (isFavorite) {
      removeFavorite(currentWeather.id);
      setIsFavorite(false);
    } else {
      const { id, name, sys: { country } } = currentWeather;
      addFavorite({ id, name, country });
      setIsFavorite(true);
    }
  };

  if (!currentWeather) return null;

  return (
    <motion.button 
      className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`}
      onClick={handleToggleFavorite}
      whileTap={{ scale: 0.9 }}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? (
        <>
          <FaHeart className="heart-icon" />
          {isAnimating && (
            <motion.div 
              className="heart-animation"
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 1.8, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FaHeart />
            </motion.div>
          )}
          <span className="favorite-text">Remove from Favorites</span>
        </>
      ) : (
        <>
          <FaRegHeart className="heart-icon" />
          <span className="favorite-text">Add to Favorites</span>
        </>
      )}
    </motion.button>
  );
};

export default FavoriteButton;
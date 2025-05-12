// Local storage key for favorites
const FAVORITES_KEY = 'weatherFavorites';

/**
 * Get all favorite locations from local storage
 * @returns {Array} Array of favorite locations
 */
export const getFavorites = () => {
  const favorites = localStorage.getItem(FAVORITES_KEY);
  return favorites ? JSON.parse(favorites) : [];
};

/**
 * Add a location to favorites
 * @param {Object} location - The location to add
 * @param {string} location.id - Location ID
 * @param {string} location.name - Location name
 * @param {string} location.country - Location country code
 * @returns {Array} Updated favorites list
 */
export const addFavorite = (location) => {
  const favorites = getFavorites();
  
  // Check if location already exists in favorites
  const exists = favorites.some(fav => fav.id === location.id);
  
  if (!exists) {
    const updatedFavorites = [...favorites, location];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    return updatedFavorites;
  }
  
  return favorites;
};

/**
 * Remove a location from favorites by its ID
 * @param {string} id - Location ID to remove
 * @returns {Array} Updated favorites list
 */
export const removeFavorite = (id) => {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter(fav => fav.id !== id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  return updatedFavorites;
};

/**
 * Check if a location is in favorites
 * @param {string} id - Location ID to check
 * @returns {boolean} True if location is a favorite
 */
export const isFavorite = (id) => {
  const favorites = getFavorites();
  return favorites.some(fav => fav.id === id);
};

/**
 * Clear all favorites
 * @returns {Array} Empty array
 */
export const clearFavorites = () => {
  localStorage.removeItem(FAVORITES_KEY);
  return [];
};
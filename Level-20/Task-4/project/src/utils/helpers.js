/**
 * Format a Unix timestamp into a readable date string
 * @param {number} timestamp - Unix timestamp in seconds
 * @param {string} format - 'full' for complete date, 'short' for short format
 * @returns {string} Formatted date string
 */
export const formatDate = (timestamp, format = 'full') => {
  const date = new Date(timestamp * 1000);
  
  if (format === 'short') {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  }
  
  // Full format
  return date.toLocaleDateString('en-US', { 
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Get the corresponding weather icon URL based on the icon code
 * @param {string} iconCode - OpenWeather icon code (e.g., "01d")
 * @returns {string} URL to the weather icon
 */
export const getWeatherIcon = (iconCode) => {
  const iconMap = {
    // Clear
    '01d': 'https://openweathermap.org/img/wn/01d@2x.png', // Clear day
    '01n': 'https://openweathermap.org/img/wn/01n@2x.png', // Clear night
    
    // Few clouds
    '02d': 'https://openweathermap.org/img/wn/02d@2x.png', // Few clouds day
    '02n': 'https://openweathermap.org/img/wn/02n@2x.png', // Few clouds night
    
    // Scattered clouds
    '03d': 'https://openweathermap.org/img/wn/03d@2x.png', // Scattered clouds
    '03n': 'https://openweathermap.org/img/wn/03n@2x.png', // Scattered clouds
    
    // Broken clouds
    '04d': 'https://openweathermap.org/img/wn/04d@2x.png', // Broken clouds
    '04n': 'https://openweathermap.org/img/wn/04n@2x.png', // Broken clouds
    
    // Shower rain
    '09d': 'https://openweathermap.org/img/wn/09d@2x.png', // Shower rain
    '09n': 'https://openweathermap.org/img/wn/09n@2x.png', // Shower rain
    
    // Rain
    '10d': 'https://openweathermap.org/img/wn/10d@2x.png', // Rain day
    '10n': 'https://openweathermap.org/img/wn/10n@2x.png', // Rain night
    
    // Thunderstorm
    '11d': 'https://openweathermap.org/img/wn/11d@2x.png', // Thunderstorm
    '11n': 'https://openweathermap.org/img/wn/11n@2x.png', // Thunderstorm
    
    // Snow
    '13d': 'https://openweathermap.org/img/wn/13d@2x.png', // Snow
    '13n': 'https://openweathermap.org/img/wn/13n@2x.png', // Snow
    
    // Mist
    '50d': 'https://openweathermap.org/img/wn/50d@2x.png', // Mist
    '50n': 'https://openweathermap.org/img/wn/50n@2x.png', // Mist
  };
  
  return iconMap[iconCode] || 'https://openweathermap.org/img/wn/01d@2x.png';
};

/**
 * Debounce function to limit the rate at which a function is called
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};
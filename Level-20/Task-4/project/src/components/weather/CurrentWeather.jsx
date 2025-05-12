import { motion } from 'framer-motion';
import { useWeather } from '../../context/WeatherContext';
import { useUnit } from '../../context/UnitContext';
import { formatDate, getWeatherIcon } from '../../utils/helpers';
import { FaMapMarkerAlt, FaWind, FaThermometerHalf, FaTint, FaCompass, FaCloud, FaEye } from 'react-icons/fa';
import './CurrentWeather.css';

const CurrentWeather = () => {
  const { currentWeather, isLoading, error } = useWeather();
  const { unit, convertTemperature } = useUnit();

  if (isLoading) {
    return (
      <div className="current-weather-loading">
        <div className="skeleton skeleton-header"></div>
        <div className="skeleton skeleton-temp"></div>
        <div className="skeleton skeleton-details"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="current-weather-error">
        <h3>Unable to load weather data</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!currentWeather) {
    return (
      <div className="current-weather-placeholder">
        <h3>No weather data available</h3>
        <p>Search for a city to view current weather conditions</p>
      </div>
    );
  }

  const { 
    name, 
    main: { temp, feels_like, humidity, pressure },
    weather,
    wind,
    clouds,
    visibility,
    dt,
    sys: { country }
  } = currentWeather;

  const weatherDescription = weather[0].description;
  const weatherIcon = getWeatherIcon(weather[0].icon);
  const formattedDate = formatDate(dt);
  const temperature = convertTemperature(temp);
  const feelsLike = convertTemperature(feels_like);
  const unitSymbol = unit === 'metric' ? '°C' : '°F';
  
  // Convert visibility from meters to kilometers/miles
  const visibilityValue = unit === 'metric' 
    ? (visibility / 1000).toFixed(1) 
    : (visibility / 1609).toFixed(1);
  const visibilityUnit = unit === 'metric' ? 'km' : 'mi';
  
  // Convert wind speed (metric: m/s, imperial: mph)
  const windSpeed = unit === 'metric' 
    ? wind.speed.toFixed(1) 
    : (wind.speed * 2.237).toFixed(1);
  const windUnit = unit === 'metric' ? 'm/s' : 'mph';

  return (
    <motion.div 
      className="current-weather-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="current-weather-header">
        <div className="current-location">
          <h2>
            <FaMapMarkerAlt /> {name}, {country}
          </h2>
          <p className="current-date">{formattedDate}</p>
        </div>
      </div>
      
      <div className="current-weather-body">
        <div className="current-weather-main">
          <div className="current-weather-icon">
            <img src={weatherIcon} alt={weatherDescription} />
          </div>
          
          <div className="current-weather-temp">
            <h1>{Math.round(temperature)}{unitSymbol}</h1>
            <p className="current-weather-description">
              {weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1)}
            </p>
            <p className="feels-like">
              <FaThermometerHalf /> Feels like {Math.round(feelsLike)}{unitSymbol}
            </p>
          </div>
        </div>
        
        <div className="current-weather-details">
          <div className="weather-detail-item">
            <FaWind />
            <span className="detail-label">Wind</span>
            <span className="detail-value">{windSpeed} {windUnit}</span>
          </div>
          
          <div className="weather-detail-item">
            <FaCompass />
            <span className="detail-label">Direction</span>
            <span className="detail-value">{wind.deg}°</span>
          </div>
          
          <div className="weather-detail-item">
            <FaTint />
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{humidity}%</span>
          </div>
          
          <div className="weather-detail-item">
            <FaCloud />
            <span className="detail-label">Cloudiness</span>
            <span className="detail-value">{clouds.all}%</span>
          </div>
          
          <div className="weather-detail-item">
            <FaThermometerHalf />
            <span className="detail-label">Pressure</span>
            <span className="detail-value">{pressure} hPa</span>
          </div>
          
          <div className="weather-detail-item">
            <FaEye />
            <span className="detail-label">Visibility</span>
            <span className="detail-value">{visibilityValue} {visibilityUnit}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CurrentWeather;
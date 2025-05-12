import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWeather } from '../../context/WeatherContext';
import { useUnit } from '../../context/UnitContext';
import { formatDate, getWeatherIcon } from '../../utils/helpers';
import { FaCloudRain, FaWind, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './Forecast.css';

const Forecast = () => {
  const { forecast, isLoading, error } = useWeather();
  const { unit, convertTemperature } = useUnit();
  const [expandedDay, setExpandedDay] = useState(null);

  if (isLoading) {
    return (
      <div className="forecast-loading">
        <div className="section-title">5-Day Forecast</div>
        <div className="forecast-loading-items">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="forecast-loading-item">
              <div className="skeleton skeleton-date"></div>
              <div className="skeleton skeleton-temp"></div>
              <div className="skeleton skeleton-icon"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="forecast-error">
        <h3>Unable to load forecast data</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!forecast || !forecast.list || forecast.list.length === 0) {
    return (
      <div className="forecast-placeholder">
        <h3>No forecast data available</h3>
        <p>Search for a city to view 5-day forecast</p>
      </div>
    );
  }

  // Group forecast by day
  const dailyForecasts = forecast.list.reduce((days, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    
    if (!days[date]) {
      days[date] = [];
    }
    
    days[date].push(item);
    return days;
  }, {});

  // Get daily summary (using midday forecast or average)
  const dailySummary = Object.keys(dailyForecasts).map(date => {
    const forecastsForDay = dailyForecasts[date];
    const middayForecast = forecastsForDay.find(f => {
      const hour = new Date(f.dt * 1000).getHours();
      return hour >= 12 && hour <= 14;
    }) || forecastsForDay[Math.floor(forecastsForDay.length / 2)];
    
    // Calculate min and max temps for the day
    const temps = forecastsForDay.map(f => f.main.temp);
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);
    
    return {
      date: middayForecast.dt,
      icon: middayForecast.weather[0].icon,
      description: middayForecast.weather[0].description,
      minTemp,
      maxTemp,
      details: forecastsForDay
    };
  }).slice(0, 5); // Limit to 5 days

  const toggleDay = (index) => {
    if (expandedDay === index) {
      setExpandedDay(null);
    } else {
      setExpandedDay(index);
    }
  };

  const unitSymbol = unit === 'metric' ? '°C' : '°F';

  return (
    <div className="forecast-container">
      <h3 className="section-title">5-Day Forecast</h3>
      
      <div className="forecast-cards">
        {dailySummary.map((day, index) => (
          <motion.div 
            key={index}
            className={`forecast-day-card ${expandedDay === index ? 'expanded' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div 
              className="forecast-day-summary"
              onClick={() => toggleDay(index)}
            >
              <div className="forecast-day-date">
                {formatDate(day.date, 'short')}
              </div>
              
              <div className="forecast-day-icon">
                <img src={getWeatherIcon(day.icon)} alt={day.description} />
              </div>
              
              <div className="forecast-temp-range">
                <span className="forecast-max">
                  {Math.round(convertTemperature(day.maxTemp))}{unitSymbol}
                </span>
                <span className="forecast-min">
                  {Math.round(convertTemperature(day.minTemp))}{unitSymbol}
                </span>
              </div>
              
              <div className="forecast-description">
                {day.description.charAt(0).toUpperCase() + day.description.slice(1)}
              </div>
              
              <button className="forecast-expand-btn">
                {expandedDay === index ? <FaChevronUp /> : <FaChevronDown />}
              </button>
            </div>
            
            <AnimatePresence>
              {expandedDay === index && (
                <motion.div 
                  className="forecast-day-details"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="hourly-forecast">
                    {day.details.map((item, i) => {
                      const hour = new Date(item.dt * 1000).getHours();
                      const formattedHour = `${hour}:00`;
                      
                      return (
                        <div key={i} className="hourly-forecast-item">
                          <div className="hourly-time">{formattedHour}</div>
                          <img 
                            src={getWeatherIcon(item.weather[0].icon)} 
                            alt={item.weather[0].description}
                            className="hourly-icon"
                          />
                          <div className="hourly-temp">
                            {Math.round(convertTemperature(item.main.temp))}{unitSymbol}
                          </div>
                          <div className="hourly-details">
                            <div className="hourly-detail">
                              <FaCloudRain /> {item.pop ? `${Math.round(item.pop * 100)}%` : '0%'}
                            </div>
                            <div className="hourly-detail">
                              <FaWind /> {item.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
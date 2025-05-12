import { motion } from 'framer-motion';
import CurrentWeather from '../components/weather/CurrentWeather';
import Forecast from '../components/weather/Forecast';
import FavoriteButton from '../components/favorites/FavoriteButton';
import { useWeather } from '../context/WeatherContext';
import './Dashboard.css';

const Dashboard = () => {
  const { currentWeather, isLoading } = useWeather();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Weather Dashboard</h1>
        {currentWeather && !isLoading && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <FavoriteButton />
          </motion.div>
        )}
      </div>
      
      <div className="weather-content">
        <CurrentWeather />
        <Forecast />
      </div>
      
      {!currentWeather && !isLoading && (
        <div className="dashboard-empty-state">
          <div className="empty-state-icon">
            <div className="empty-cloud"></div>
            <div className="empty-sun"></div>
          </div>
          <h2>Welcome to WeatherDash</h2>
          <p>Search for a city or use your current location to get started</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
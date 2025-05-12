import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import HistoricalChart from '../components/weather/HistoricalChart';
import { useWeather } from '../context/WeatherContext';
import { useUnit } from '../context/UnitContext';
import { FaHistory, FaChartLine, FaArrowRight } from 'react-icons/fa';
import './HistoricalData.css';

const HistoricalData = () => {
  const { currentWeather, historicalData, isLoading, error } = useWeather();
  const { unit } = useUnit();
  const navigate = useNavigate();
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    setHasData(historicalData && historicalData.length > 0);
  }, [historicalData]);

  // If no weather data is selected, prompt user to search
  if (!currentWeather && !isLoading) {
    return (
      <div className="historical-empty-container">
        <div className="historical-empty">
          <div className="historical-empty-icon">
            <FaHistory />
          </div>
          <h2>No Location Selected</h2>
          <p>Search for a city first to view historical weather data</p>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/')}
          >
            Go to Dashboard <FaArrowRight />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="historical-data-container">
      <div className="historical-header">
        <h1 className="historical-title">
          <FaChartLine /> Historical Weather Data
        </h1>
        {currentWeather && (
          <div className="historical-location">
            {currentWeather.name}, {currentWeather.sys.country}
          </div>
        )}
      </div>
      
      {isLoading ? (
        <div className="historical-loading">
          <div className="loading-spinner"></div>
          <p>Loading historical data...</p>
        </div>
      ) : error ? (
        <div className="historical-error">
          <h3>Error Loading Data</h3>
          <p>{error}</p>
        </div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HistoricalChart historicalData={historicalData} />
          </motion.div>
          
          {hasData && (
            <motion.div
              className="additional-metrics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="metric-card">
                <h3>Temperature Statistics</h3>
                <div className="metric-content">
                  <div className="metric-item">
                    <div className="metric-label">Average</div>
                    <div className="metric-value">
                      {Math.round(calculateAverage(historicalData.map(item => item.temp), unit))}
                      {unit === 'metric' ? '°C' : '°F'}
                    </div>
                  </div>
                  <div className="metric-item">
                    <div className="metric-label">Highest</div>
                    <div className="metric-value">
                      {Math.round(findMax(historicalData.map(item => item.temp_max), unit))}
                      {unit === 'metric' ? '°C' : '°F'}
                    </div>
                  </div>
                  <div className="metric-item">
                    <div className="metric-label">Lowest</div>
                    <div className="metric-value">
                      {Math.round(findMin(historicalData.map(item => item.temp_min), unit))}
                      {unit === 'metric' ? '°C' : '°F'}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="metric-card">
                <h3>Humidity Statistics</h3>
                <div className="metric-content">
                  <div className="metric-item">
                    <div className="metric-label">Average</div>
                    <div className="metric-value">
                      {Math.round(calculateAverage(historicalData.map(item => item.humidity)))}%
                    </div>
                  </div>
                  <div className="metric-item">
                    <div className="metric-label">Highest</div>
                    <div className="metric-value">
                      {Math.round(Math.max(...historicalData.map(item => item.humidity)))}%
                    </div>
                  </div>
                  <div className="metric-item">
                    <div className="metric-label">Lowest</div>
                    <div className="metric-value">
                      {Math.round(Math.min(...historicalData.map(item => item.humidity)))}%
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

// Helper functions
const calculateAverage = (values, unit) => {
  if (!values.length) return 0;
  const sum = values.reduce((a, b) => a + b, 0);
  const average = sum / values.length;
  
  // Convert from Kelvin if needed
  if (unit === 'metric') {
    return average - 273.15;
  } else {
    return (average - 273.15) * 9/5 + 32;
  }
};

const findMax = (values, unit) => {
  if (!values.length) return 0;
  const max = Math.max(...values);
  
  if (unit === 'metric') {
    return max - 273.15;
  } else {
    return (max - 273.15) * 9/5 + 32;
  }
};

const findMin = (values, unit) => {
  if (!values.length) return 0;
  const min = Math.min(...values);
  
  if (unit === 'metric') {
    return min - 273.15;
  } else {
    return (min - 273.15) * 9/5 + 32;
  }
};

export default HistoricalData;
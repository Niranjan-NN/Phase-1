import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { useUnit } from '../../context/UnitContext';
import { FaCalendarAlt } from 'react-icons/fa';
import './HistoricalChart.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const HistoricalChart = ({ historicalData }) => {
  const { unit, convertTemperature } = useUnit();
  const [timeRange, setTimeRange] = useState('week'); // 'week', 'month', 'year'
  
  if (!historicalData || historicalData.length === 0) {
    return (
      <div className="historical-chart-placeholder">
        <h3>No historical data available</h3>
        <p>Historical weather data will appear here</p>
      </div>
    );
  }

  // Filter data based on selected time range
  let filteredData = historicalData;
  const currentDate = new Date();
  
  if (timeRange === 'week') {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(currentDate.getDate() - 7);
    filteredData = historicalData.filter(item => new Date(item.date) >= oneWeekAgo);
  } else if (timeRange === 'month') {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);
    filteredData = historicalData.filter(item => new Date(item.date) >= oneMonthAgo);
  }
  
  // Prepare data for the chart
  const dates = filteredData.map(item => {
    const date = new Date(item.date);
    return timeRange === 'week' 
      ? date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })
      : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });
  
  const temperatures = filteredData.map(item => convertTemperature(item.temp));
  const minTemps = filteredData.map(item => convertTemperature(item.temp_min));
  const maxTemps = filteredData.map(item => convertTemperature(item.temp_max));
  
  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Temperature',
        data: temperatures,
        borderColor: 'rgb(52, 152, 219)',
        backgroundColor: 'rgba(52, 152, 219, 0.5)',
        tension: 0.3,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
      {
        label: 'Min Temperature',
        data: minTemps,
        borderColor: 'rgb(41, 128, 185)',
        backgroundColor: 'rgba(41, 128, 185, 0.5)',
        tension: 0.3,
        borderDash: [5, 5],
        pointRadius: 2,
        pointHoverRadius: 4,
      },
      {
        label: 'Max Temperature',
        data: maxTemps,
        borderColor: 'rgb(231, 76, 60)',
        backgroundColor: 'rgba(231, 76, 60, 0.5)',
        tension: 0.3,
        borderDash: [5, 5],
        pointRadius: 2,
        pointHoverRadius: 4,
      }
    ]
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 10,
          usePointStyle: true,
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y + (unit === 'metric' ? '°C' : '°F');
            }
            return label;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          callback: function(value) {
            return value + (unit === 'metric' ? '°C' : '°F');
          }
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };

  return (
    <div className="historical-chart-container">
      <div className="historical-chart-header">
        <h3 className="chart-title">
          <FaCalendarAlt /> Historical Temperature Data
        </h3>
        
        <div className="time-range-selector">
          <button 
            className={`time-range-btn ${timeRange === 'week' ? 'active' : ''}`}
            onClick={() => setTimeRange('week')}
          >
            Week
          </button>
          <button 
            className={`time-range-btn ${timeRange === 'month' ? 'active' : ''}`}
            onClick={() => setTimeRange('month')}
          >
            Month
          </button>
          <button 
            className={`time-range-btn ${timeRange === 'year' ? 'active' : ''}`}
            onClick={() => setTimeRange('year')}
          >
            Year
          </button>
        </div>
      </div>
      
      <div className="chart-wrapper">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default HistoricalChart;
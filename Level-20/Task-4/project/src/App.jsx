import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Dashboard from './pages/Dashboard';
import HistoricalData from './pages/HistoricalData';
import Favorites from './pages/Favorites';
import { WeatherProvider } from './context/WeatherContext';
import { UnitProvider } from './context/UnitContext';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for smooth transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-animation">
          <div className="cloud"></div>
          <div className="sun"></div>
          <div className="rain"></div>
        </div>
        <h2>WeatherDash</h2>
        <p>Loading your weather data...</p>
      </div>
    );
  }

  return (
    <Router>
      <UnitProvider>
        <WeatherProvider>
          <div className="app-container">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/historical" element={<HistoricalData />} />
                <Route path="/favorites" element={<Favorites />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </WeatherProvider>
      </UnitProvider>
    </Router>
  );
}

export default App;
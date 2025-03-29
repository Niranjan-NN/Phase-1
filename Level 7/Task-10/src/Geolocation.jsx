import { useState, useEffect } from 'react';
import './GeolocationDisplay.css';

const Geolocation = () => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    const handleSuccess = (pos) => {
      const { latitude, longitude } = pos.coords;
      setLocation({ lat: latitude, lng: longitude });
    };

    const handleError = (err) => {
      setError(err.message);
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  return { location, error };
};

export default Geolocation;
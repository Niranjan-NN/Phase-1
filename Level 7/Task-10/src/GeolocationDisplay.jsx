import React from 'react';
import Geolocation from './Geolocation';
import './GeolocationDisplay.css';


const GeolocationDisplay = () => {
  const { location, error } = Geolocation();

  return (
    <div className="geo-container">
      <h2>Your Location</h2>
      {error ? (
        <p className="error">Error: {error}</p>
      ) : location.lat && location.lng ? (
        <p>
          Latitude: <span>{location.lat}</span>, <br/>
          Longitude: <span>{location.lng}</span>
        </p>
      ) : (
        <p>Fetching your location...</p>
      )}
    </div>
  );
};

export default GeolocationDisplay;
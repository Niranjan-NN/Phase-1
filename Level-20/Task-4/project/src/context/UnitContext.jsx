import { createContext, useState, useContext, useEffect } from 'react';

const UnitContext = createContext();

export const useUnit = () => useContext(UnitContext);

export const UnitProvider = ({ children }) => {
  // Get unit preference from localStorage or default to metric
  const [unit, setUnit] = useState(() => {
    const savedUnit = localStorage.getItem('weatherUnit');
    return savedUnit || 'metric';
  });

  // Save unit preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('weatherUnit', unit);
  }, [unit]);

  // Toggle between metric and imperial
  const toggleUnit = (newUnit) => {
    if (newUnit === unit) return;
    setUnit(newUnit);
  };

  // Convert temperature based on current unit
  const convertTemperature = (kelvin) => {
    if (unit === 'metric') {
      // Kelvin to Celsius
      return kelvin - 273.15;
    } else {
      // Kelvin to Fahrenheit
      return (kelvin - 273.15) * 9/5 + 32;
    }
  };

  const value = {
    unit,
    toggleUnit,
    convertTemperature
  };

  return (
    <UnitContext.Provider value={value}>
      {children}
    </UnitContext.Provider>
  );
};
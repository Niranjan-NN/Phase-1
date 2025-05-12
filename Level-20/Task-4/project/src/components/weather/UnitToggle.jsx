import { motion } from 'framer-motion';
import { useUnit } from '../../context/UnitContext';
import './UnitToggle.css';

const UnitToggle = () => {
  const { unit, toggleUnit } = useUnit();
  
  return (
    <div className="unit-toggle">
      <button 
        className={`unit-toggle-btn ${unit === 'metric' ? 'active' : ''}`}
        onClick={() => toggleUnit('metric')}
        aria-label="Switch to Celsius"
      >
        °C
        {unit === 'metric' && (
          <motion.div 
            className="toggle-indicator"
            layoutId="unitToggleIndicator"
            transition={{ type: "spring", duration: 0.3 }}
          />
        )}
      </button>
      <button 
        className={`unit-toggle-btn ${unit === 'imperial' ? 'active' : ''}`}
        onClick={() => toggleUnit('imperial')}
        aria-label="Switch to Fahrenheit"
      >
        °F
        {unit === 'imperial' && (
          <motion.div 
            className="toggle-indicator"
            layoutId="unitToggleIndicator"
            transition={{ type: "spring", duration: 0.3 }}
          />
        )}
      </button>
    </div>
  );
};

export default UnitToggle;
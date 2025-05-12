const ServingAdjuster = ({ servings, onServingsChange }) => {
  const decreaseServings = () => {
    if (servings > 1) {
      onServingsChange(servings - 1);
    }
  };
  
  const increaseServings = () => {
    onServingsChange(servings + 1);
  };
  
  return (
    <div className="serving-adjuster">
      <span className="serving-adjuster-label">Servings:</span>
      <div className="serving-adjuster-controls">
        <button 
          className="serving-button decrease" 
          onClick={decreaseServings}
          disabled={servings <= 1}
          aria-label="Decrease servings"
        >
          -
        </button>
        <span className="serving-count">{servings}</span>
        <button 
          className="serving-button increase" 
          onClick={increaseServings}
          aria-label="Increase servings"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ServingAdjuster;
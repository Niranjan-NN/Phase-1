const MealPlanSelector = ({ onSelect, onClose }) => {
  const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const mealTypes = ['breakfast', 'lunch', 'dinner'];
  
  return (
    <div className="modal-overlay">
      <div className="modal-content meal-plan-selector">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Add to Meal Plan</h2>
        <p>Select a day and meal to add this recipe to your meal plan:</p>
        
        <div className="meal-plan-grid">
          <div className="meal-plan-header">
            <div className="day-column"></div>
            {mealTypes.map(mealType => (
              <div key={mealType} className="meal-column">
                {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
              </div>
            ))}
          </div>
          
          {weekdays.map(day => (
            <div key={day} className="meal-plan-row">
              <div className="day-column">
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </div>
              
              {mealTypes.map(mealType => (
                <div key={mealType} className="meal-column">
                  <button
                    className="meal-select-button"
                    onClick={() => onSelect(day, mealType)}
                  >
                    Select
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MealPlanSelector;
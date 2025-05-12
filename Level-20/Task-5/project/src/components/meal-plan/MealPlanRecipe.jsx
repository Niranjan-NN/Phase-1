import { Draggable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';
import { useMealPlan } from '../../contexts/MealPlanContext';

const MealPlanRecipe = ({ recipe, day, mealType, index }) => {
  const { removeFromMealPlan } = useMealPlan();
  
  const handleRemove = (e) => {
    e.stopPropagation();
    e.preventDefault();
    removeFromMealPlan(day, mealType);
  };
  
  return (
    <Draggable draggableId={`meal-${day}-${mealType}`} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`meal-plan-recipe ${snapshot.isDragging ? 'dragging' : ''}`}
        >
          <Link to={`/recipes/${recipe._id}`} className="meal-plan-recipe-link">
            <div className="meal-plan-recipe-content">
              <div className="meal-plan-recipe-image">
                {recipe.image ? (
                  <img src={recipe.image} alt={recipe.name} />
                ) : (
                  <div className="placeholder-image"></div>
                )}
              </div>
              <div className="meal-plan-recipe-details">
                <h4 className="meal-plan-recipe-title">{recipe.name}</h4>
                {recipe.cuisineType && (
                  <p className="meal-plan-recipe-cuisine">{recipe.cuisineType}</p>
                )}
              </div>
              <button 
                className="meal-plan-recipe-remove" 
                onClick={handleRemove}
                aria-label="Remove recipe"
              >
                ×
              </button>
            </div>
          </Link>
        </div>
      )}
    </Draggable>
  );
};

export default MealPlanRecipe;
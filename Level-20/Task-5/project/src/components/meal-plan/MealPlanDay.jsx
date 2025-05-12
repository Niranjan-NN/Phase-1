import { Droppable } from 'react-beautiful-dnd';
import MealPlanRecipe from './MealPlanRecipe';

const MealPlanDay = ({ day, mealType, recipe }) => {
  const droppableId = `meal-${day}-${mealType}`;
  
  return (
    <Droppable droppableId={droppableId}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`meal-plan-slot ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
        >
          {recipe ? (
            <MealPlanRecipe 
              recipe={recipe} 
              day={day} 
              mealType={mealType} 
              index={0}
            />
          ) : (
            <div className="empty-slot">
              <p className="empty-slot-text">Drop a recipe here</p>
            </div>
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default MealPlanDay;
import { Droppable, Draggable } from 'react-beautiful-dnd';

const RecipesForMealPlan = ({ recipes }) => {
  return (
    <Droppable droppableId="recipes-list" isDropDisabled={true}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="recipes-for-meal-plan"
        >
          {recipes.length > 0 ? (
            recipes.map((recipe, index) => (
              <Draggable
                key={recipe._id}
                draggableId={`recipe-${recipe._id}`}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`recipe-item ${snapshot.isDragging ? 'dragging' : ''}`}
                  >
                    <div className="recipe-item-content">
                      <div className="recipe-item-image">
                        {recipe.image ? (
                          <img src={recipe.image} alt={recipe.name} />
                        ) : (
                          <div className="placeholder-image"></div>
                        )}
                      </div>
                      <div className="recipe-item-details">
                        <h4 className="recipe-item-title">{recipe.name}</h4>
                        <div className="recipe-item-meta">
                          {recipe.cuisineType && <span>{recipe.cuisineType}</span>}
                          {recipe.mealType && <span>{recipe.mealType}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))
          ) : (
            <p className="no-recipes">No recipes found</p>
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default RecipesForMealPlan;
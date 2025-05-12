import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  const defaultImage = 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800';
  
  return (
    <Link to={`/recipes/${recipe._id}`} className="recipe-card-link">
      <div className="recipe-card">
        <div className="recipe-card-image">
          <img 
            src={recipe.image || defaultImage} 
            alt={recipe.name} 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultImage;
            }}
          />
          {recipe.mealType && (
            <div className="recipe-meal-type">{recipe.mealType}</div>
          )}
        </div>
        <div className="recipe-card-content">
          <h3 className="recipe-card-title">{recipe.name}</h3>
          
          <div className="recipe-card-meta">
            {recipe.cuisineType && (
              <span className="recipe-card-cuisine">{recipe.cuisineType}</span>
            )}
            
            <div className="recipe-card-time">
              {(recipe.prepTime || recipe.cookTime) && (
                <span>
                  {recipe.prepTime && `${recipe.prepTime} min prep`}
                  {recipe.prepTime && recipe.cookTime && ' • '}
                  {recipe.cookTime && `${recipe.cookTime} min cook`}
                </span>
              )}
            </div>
          </div>
          
          {recipe.description && (
            <p className="recipe-card-description">
              {recipe.description.length > 100
                ? recipe.description.substring(0, 100) + '...'
                : recipe.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
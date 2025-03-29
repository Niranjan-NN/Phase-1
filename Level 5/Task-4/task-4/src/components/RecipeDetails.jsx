import React from "react";
import { useParams } from "react-router-dom";
import recipes from "../data";

const RecipeDetails = () => {
  const { id } = useParams();
  const recipe = recipes.find((recipe) => recipe.id === id);

  if (!recipe) {
    return <h2 className="not-found">404 - Recipe Not Found</h2>;
  }

  return (
    <div className="container">
      <h1>{recipe.title}</h1>
      <img src={recipe.imageUrl} alt={recipe.title} className="recipe-img-large" />
      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <p>{recipe.instructions}</p>
    </div>
  );
};

export default RecipeDetails;

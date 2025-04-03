import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/global.css"; // Updated CSS import

const Recipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    console.log("API Key:", import.meta.env.VITE_API_KEY); // Debugging API Key
    console.log("Fetching recipe:", id);

    axios
      .get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${
          import.meta.env.VITE_API_KEY
        }`
      )
      .then((response) => setRecipe(response.data))
      .catch((error) => console.error("Error fetching recipe:", error));
  }, [id]);

  return (
    <div className="recipe-detail">
      {recipe ? (
        <>
          <h1>{recipe.title}</h1>
          <img src={recipe.image} alt={recipe.title} />
          <h2>Ingredients</h2>
          <ul>
            {recipe.extendedIngredients &&
            recipe.extendedIngredients.length > 0 ? (
              recipe.extendedIngredients.map((ing) => (
                <li key={ing.id}>{ing.original}</li>
              ))
            ) : (
              <p>No ingredients found.</p>
            )}
          </ul>
          <h2>Instructions</h2>
          {recipe.instructions ? (
            <p dangerouslySetInnerHTML={{ __html: recipe.instructions }}></p>
          ) : (
            <p>No instructions available.</p>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Recipe;

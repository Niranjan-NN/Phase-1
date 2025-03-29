import React, { useState } from "react";
import { Link } from "react-router-dom";
import recipes from "../data";
import SearchBar from "./SearchBar";

const RecipeList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.ingredients.some((ingredient) =>
      ingredient.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="container">
      <h1 className="title">Recipe Finder</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="recipe-grid">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <img src={recipe.imageUrl} alt={recipe.title} className="recipe-img" />
              <h2>
                <Link to={`/recipe/${recipe.id}`} className="recipe-title">
                  {recipe.title}
                </Link>
              </h2>
            </div>
          ))
        ) : (
          <p className="no-results">No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default RecipeList;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/global.css";

const Category = () => {
  const { type } = useParams(); // Get category type from URL
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?cuisine=${type}&apiKey=${
          import.meta.env.VITE_API_KEY
        }`
      )
      .then((response) => setRecipes(response.data.results))
      .catch((error) => console.error("Error fetching category:", error));
  }, [type]);

  return (
    <div className="container mt-4">
      <h1 className="text-center text-primary">{type} Recipes</h1>
      <div className="row">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="col-md-4">
            <div className="card">
              <img
                src={recipe.image}
                className="card-img-top"
                alt={recipe.title}
              />
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;

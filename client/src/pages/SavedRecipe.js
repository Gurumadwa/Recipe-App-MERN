import React, { useEffect, useState } from "react";
import useGetUserID from "../hooks/useGetUserID";
import axios from "axios";

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  },[]);
  return (
    <div className="recipes-container">
      {
        savedRecipes.map((recipe) => (
          <div key={recipe._id} className="recipe-card">
            <h2 className="recipe-name">{recipe.name}</h2>

            {/* <button onClick={()=>saveRecipe(recipe._id)} disabled={isRecipeSaved(recipe._id)}>Save</button> */}

            <img src={recipe.imageUrl} alt={recipe.name} className="recipe-image" />
            <h4 className="section-title">Instructions</h4>
            <p className="recipe-instructions">{recipe.instructions}</p>
            <h4 className="section-title">Ingredients</h4>
            <p className="recipe-ingredients"> {recipe.ingredients.join(',')}</p>
            <h4 className="section-title">Cooking Time</h4>
            <p className="recipe-cooking-time">  {recipe.cookingTime} min</p>
          </div>
        ))
      }
    </div>
  );
};
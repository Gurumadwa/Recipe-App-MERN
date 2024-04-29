import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useGetUserID from '../hooks/useGetUserID'

const Home = () => {

  const [recipes, setRecipes] = useState([])
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get('http://localhost:3001/recipes')
        setRecipes(response.data)
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };


    fetchRecipe()
    fetchSavedRecipes()
  }, [])


  const saveRecipe = async (recipeID) =>{
    try {

      const response = await axios.put("http://localhost:3001/recipes",{recipeID,userID})

      console.log(response)
      
    } catch (error) {
      console.error(error)
    }
  }

  const isRecipeSaved = (id) => {
    return savedRecipes && savedRecipes.includes(id);
}


  return (
    <div className="recipes-container">
      {
        recipes.map((recipe) => (
          <div key={recipe._id} className="recipe-card">
            <h2 className="recipe-name">{recipe.name}</h2>

            <button onClick={()=>saveRecipe(recipe._id)} disabled={isRecipeSaved(recipe._id)}>Save</button>

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

  )
}

export default Home
import React, { useState } from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import useGetUserID from '../hooks/useGetUserID';

const CreateRecipe = () => {

  const userID = useGetUserID()

  const [recipe,setRecipe] = useState({
    name: "",
    ingredients:[],
    instructions:"",
    imageUrl:"",
    cookingTime:0,
    userOwner:userID
  })

  const navigate = useNavigate()

  const handleChange = (event) => {
    const {name,value} = event.target

    setRecipe({...recipe,[name]:value})
  }

  const handleAddIngredient = () => {
    const newArr = [...recipe.ingredients,""];
    setRecipe({...recipe,ingredients :newArr})

  }

  const handleIngredientChange = (event,index) => {
    const updatedIngredients = [...recipe.ingredients];
    updatedIngredients[index]=event.target.value;
    setRecipe({...recipe,ingredients:updatedIngredients});
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault()
    
    try {
      await axios.post('http://localhost:3001/recipes',{...recipe})
      alert("Recipe Created Successfully")
      navigate('/')

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="create-recipe-card">
      <form className="create-recipe-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" value={recipe.name} onChange={handleChange} />
        
        <label htmlFor="ingredients">Ingredients</label>
        {
          recipe.ingredients.map((ingredient,index)=>(
            <input key={index} type='text' name='ingredients' onChange={(e)=>handleIngredientChange(e,index)}/>
          ))
        }
        <button type='button' onClick={handleAddIngredient}>Add Ingredient</button>

        <label htmlFor="instructions">Instructions</label>
        <textarea name="instructions" id="instructions" cols="30" rows="10" value={recipe.instructions} onChange={handleChange}></textarea>

        <label htmlFor="imageUrl">Image URL</label>
        <input type="text" name="imageUrl" id="imageUrl" value={recipe.imageUrl} onChange={handleChange}/>

        <label htmlFor="cookingTime">Cooking Time in min</label>
        <input type="number" id="cookingTime" name="cookingTime" value={recipe.cookingTime} onChange={handleChange}/>

        <button type='submit'>Create Recipe</button>
      </form>
    </div>
  );
};

export default CreateRecipe;

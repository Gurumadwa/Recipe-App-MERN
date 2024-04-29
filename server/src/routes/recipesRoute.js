const express = require('express')
const mongoose = require('mongoose')
const RecipeModel = require('../models/Recipes')
const UserModel = require('../models/Users')

const router = express.Router()

// GET all recipes
router.get('/', async (req,res) => {
    try {

        const response = await RecipeModel.find();

        res.json(response)
        
    } catch (error) {
        res.json(error)
    }
})

//create recipe to database
router.post('/', async (req,res) => {
    try {

        const recipe = new RecipeModel(req.body)
        await recipe.save()
        res.status(201).json({msg:"Recipe created Successfully"});
        
    } catch (error) {
        res.json(error)
    }
})

//saving recipe
router.put('/', async (req,res) => {
    try {

        const recipe = await RecipeModel.findById(req.body.recipeID)
        const user = await UserModel.findById(req.body.userID)
        user.savedRecipes.push(recipe)
        await user.save();
        res.json({savedRecipes:user.savedRecipes})
        
    } catch (error) {
        res.json(error)
    }
})

//getting id of saved recipes
router.get('/savedRecipes/ids/:userId',async (req,res)=>{
    try {
        
        const user = await UserModel.findById(req.params.userId); 
        
        res.json({savedRecipes: user.savedRecipes})
        
    } catch (error) {
        res.json(error)
    }
})

// get saved recipes
router.get('/savedRecipes/:userId', async (req,res) => {
    try {

        const user = await UserModel.findById(req.params.userId)
        const savedRecipes = await RecipeModel.find({_id: {$in: user.savedRecipes}})
        res.json({savedRecipes})
        
    } catch (error) {
        res.json(error)
    }
})

module.exports = router
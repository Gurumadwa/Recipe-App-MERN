const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    ingredients:[{
        type:String,
        required:true
    }],
    instructions:{
        type: String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    cookingTime:{
        type:Number,
        required:true
    },
    userOwner:{
        type:mongoose.Schema.Types.ObjectId,  //reference to User model
        ref:"users",
        required:true
    }
})

const  RecipeModel=mongoose.model("recipes",RecipeSchema)

module.exports=RecipeModel
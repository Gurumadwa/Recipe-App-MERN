const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const UserModel = require('../models/Users')

const router = express.Router()


router.post('/register', async (req,res)=>{
    try {

        const {username,password} = req.body

        const user = await UserModel.findOne({username:username})

        if(user)
        {
            return res.json({msg:"User already exist"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new UserModel({username,password:hashedPassword})
        await newUser.save()

        res.status(200).json({msg:"User Registered Successfully"})
        
    } catch (error) {
        console.log(error)
        res.status(500).send("Error"+error)
    }
})

router.post('/login', async (req,res)=>{
    try {

        const {username,password} = req.body

        const user = await UserModel.findOne({username:username})
        if(!user)
        {
            res.status(404).json({msg:"User not found or Incorrect Username"})
        }

        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid)
        {
            res.json({msg:"Incorrect Password"})
        }

        //if username and password are correct then loggin in process starts by sending jwt token to frontend
         const token = jwt.sign({id:user._id},"secret");

         res.json({token,userID:user._id})
        
    } catch (error) {
        res.status(500).send("Error"+error)
    }
})


module.exports=router
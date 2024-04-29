const express = require('express')
const cors = require('cors')
const db = require('../src/db')

const usersRoute = require('./routes/usersRoute')
const recipesRoute = require('./routes/recipesRoute')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/auth',usersRoute)
app.use('/recipes',recipesRoute)

app.listen(3001,()=>{
    console.log("Server Running on port 3001")
})
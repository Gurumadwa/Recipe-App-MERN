const mongoose = require('mongoose')

const Mongo_url = "mongodb://127.0.0.1:27017/Recipe_App"
mongoose.connect(Mongo_url,{
    useNewUrlParser : true ,
    useUnifiedTopology :true
})

const db = mongoose.connection

db.on('connected',()=>{
    console.log("MongoDB Connected")
})

db.on('error',()=>{
    console.log("Error Connecting to MongoDB")
})

module.exports = db
const express=require('express');
const morgan =require('morgan')
// const routes=require('./server/routes/recipeRoutes')
require('dotenv').config()
const app=express();
const port=process.env.PORT || 3310;
const mongoose= require('mongoose');
const connectDB=require('./db');

// middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))


// Api
// app.use('/',routes)

if(process.env.NODE_ENV ==='development'){
    app.use(morgan('dev'))
}

// Connect To MongoDB
connectDB();
// Test database connection
mongoose.connection.once('open',()=>{
    console.log("Connected successfully to MongoDB")
    app.listen(port, console.log(`Server is running in ${process.env.NODE_ENV} mode on port:${port}`))

})
const express=require('express')
const expressLayouts=require('express-ejs-layouts')
const app=express();
require('dotenv').config();
const port=process.env.PORT;
const connectDB=require('./db')
const mongoose=require('mongoose')
const routes=require('./routes/index')
const users=require('./routes/users')

// EJS
app.use(expressLayouts)
app.set('view engine','ejs')

connectDB();

// Routes
app.use('/',routes)
app.use('/users',users)




mongoose.connection.once('open',()=>{
    console.log('Connected successfully to MongoDB')
    app.listen(port,console.log(`Server is listening on port:${port}`))
})

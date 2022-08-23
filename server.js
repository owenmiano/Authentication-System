const path=require('path')
const express=require('express')
const app=express();
require('dotenv').config();
const exphbs=require('express-handlebars')
const port=process.env.PORT;
const passport=require('passport')
const connectDB=require('./db')
const mongoose=require('mongoose')
const morgan =require('morgan')
const session=require('express-session')

// Passport Config
require('./config/passport')(passport)

connectDB();

// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Logging
if(process.env.NODE_ENV ==='development'){
    app.use(morgan('dev'))
}

// Handlebars Helpers
const {
    formatDate,
    stripTags,
    truncate,
    editIcon,
    select,
  } = require('./helpers/hbs')


// Handlebars
app.engine(
    '.hbs',
    exphbs.engine({
      helpers: {
        formatDate,
        stripTags,
        truncate,
        editIcon,
        select,
      },
      defaultLayout: 'main',
      extname: '.hbs',
    })
  )
  app.set('view engine', '.hbs')

// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
    //   store: MongoStore.create({mongoUrl: process.env.MONGO_URI,
    // }),
    })
  )

  
// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())



// Static Folder
app.use(express.static(path.join(__dirname,'public')))


// Routes
app.use('/',require('./routes/index'))



mongoose.connection.once('open',()=>{
    console.log(`Successfully connected to database: ${mongoose.connection.name} `)
    app.listen(port,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`))
})

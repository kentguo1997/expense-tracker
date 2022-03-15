// Include Packages
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const port = process.env.PORT


const routes = require('./routes')
const usePassport = require('./config/passport')
require('./config/mongoose')


const app = express()

// setting template engine
app.engine('hbs', exphbs.engine({
  extname: 'hbs', defaultLayout:'main'
}))
app.set('view engine', 'hbs')


// using middleware below
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
usePassport(app)

app.use(flash())

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.successRegister = req.flash('successRegister')
  res.locals.loginError = req.flash('loginError')
  res.locals.addNewRecordErr = req.flash('addNewRecordErr')
  res.locals.blankErr = req.flash('blankErr')
  next() 
})

app.use(routes)


// Start and listen on the app 
app.listen( port, ()  => 
  console.log(`The server is listening on http://localhost:${port}`)  
)
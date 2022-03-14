// Include Packages
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const port = process.env.PORT

const Record = require('./models/record') 


const routes = require('./routes')
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

app.use(routes)


// Start and listen on the app 
app.listen( port, ()  => 
  console.log(`The server is listening on http://localhost:${port}`)  
)
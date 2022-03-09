// Include Packages
const express = require('express')
const exphbs = require('express-handlebars')
const port = 3000

require('./config/mongoose')

const app = express()


// setting template engine
app.engine('hbs', exphbs.engine({
  extname: 'hbs', defaultLayout:'main'
}))
app.set('view engine', 'hbs')


// setting routes
app.get('/', (req, res) => {
  res.render('index')
})


// Start and listen on the app 
app.listen( port, ()  => 
  console.log(`The server is listening on http://localhost:${port}`)  
)
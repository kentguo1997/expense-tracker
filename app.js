// Include Packages
const express = require('express')
const port = 3000

require('./config/mongoose')

const app = express()


// setting routes
app.get('/', (req, res) => {
  res.send('Hello World')
})


// Start and listen on the app 
app.listen( port, ()  => 
  console.log(`The server is listening on http://localhost:${port}`)  
)
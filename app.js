// Include Packages
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const port = 3000

const Record = require('./models/record') 
const Category = require('./models/category')
const category = require('./models/category')
require('./config/mongoose')

const app = express()


// setting template engine
app.engine('hbs', exphbs.engine({
  extname: 'hbs', defaultLayout:'main'
}))
app.set('view engine', 'hbs')


// using middleware below
app.use(bodyParser.urlencoded({ extended: true }))


// setting routes

// HomePage (Show Records)
app.get('/', (req, res) => {
  let totalAmount = 0
  Record.find()
    .lean()
    .then(records => {
      records.forEach(record => {
        totalAmount += record.amount
      })
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.log(error))
})


// Adding new record
app.get('/records/new', (req, res) => {
  res.render('new')
})

app.post('/records', (req, res) => {
  const { name, date, amount, method, categoryName } = req.body
  Category.findOne({ categoryName })
  .then(category => {
    const { categoryIcon, categoryId } = category
    Record.create({
      name,
      date,
      amount,
      method,
      categoryId,
      categoryIcon
    })
  })
  .then(() => res.redirect('/'))
  .catch(err => console.log(err))
})


// Start and listen on the app 
app.listen( port, ()  => 
  console.log(`The server is listening on http://localhost:${port}`)  
)
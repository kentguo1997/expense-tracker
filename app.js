// Include Packages
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
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
app.use(methodOverride('_method'))


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


// Edit record
app.get('/records/:id/edit', (req, res) => {
  const recordId = req.params.id
  
  Record.findById(recordId)
  .lean()
  .then(record => {
    const { name, date, amount, method, categoryId } = record
    Category.findOne({ categoryId })
    .then(category => {
      const categoryName = category.categoryName
      res.render('edit', { name, date, amount, method, categoryName, recordId })
    })
  })
  .catch(err => console.log(err))
})


app.put('/records/:id', (req, res) => {
  const recordId = req.params.id
  const { name, date, amount, method, categoryName } = req.body
  let { categoryId, categoryIcon } = ''
  
  Category.findOne({ categoryName })
  .then(category => {
    categoryId = category.categoryId
    categoryIcon = category.categoryIcon 
  })
  .catch(err => console.log(err))


  Record.findById(recordId)
  .then(record => {
    record.name = name
    record.date = date
    record.amount = amount
    record.method = method
    record.categoryId = categoryId
    record.categoryIcon = categoryIcon
    
    record.save()
  })
  .then(() => res.redirect('/') )
  .catch(err => console.log(err))
})



// Start and listen on the app 
app.listen( port, ()  => 
  console.log(`The server is listening on http://localhost:${port}`)  
)
// Include express & using router
const express = require('express')
const router = express.Router()


// Include Models
const Record = require('../../models/record')
const Category = require('../../models/category')


// setting ('/categories')
router.get('/new', (req, res) => {
  res.render('newCategory')
})

router.post('/', (req, res ) => {
  const { categoryIcon, categoryName } = req.body
  
  Category.create({
    categoryName,
    categoryIcon
  })
  .then(() => res.redirect('/'))
  .catch(err => console.log(err))
  
})

router.get('/:id', (req, res) => {
  let totalAmount = 0
  const categoryId = req.params.id
   
  Record.find({ categoryId })
    .lean()
    .sort({ date: 'asc' })
    .then(records => {
      records.forEach(record => totalAmount += record.amount)
      Category.find()
      .lean()
      .then(categories => res.render('index', { records, totalAmount, categories }))
    })
    .catch(err => console.log(err))
})




// export router for index.js
module.exports = router
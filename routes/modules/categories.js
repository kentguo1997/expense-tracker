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
  const userId = req.user._id

  Category.create({
    categoryName,
    categoryIcon,
    userId
  })
  .then(() => res.redirect('/'))
  .catch(err => console.log(err))
  
})

router.get('/:id', (req, res) => {
  const categoryId = req.params.id
  const userId = req.user._id
  let totalAmount = 0
   
  Record.find({ categoryId, userId })
    .lean()
    .sort({ date: 'asc' })
    .then(records => {
      records.forEach(record => totalAmount += record.amount)
      Category.find({ userId })
      .lean()
      .then(categories => res.render('index', { records, totalAmount, categories }))
    })
    .catch(err => console.log(err))
})




// export router for index.js
module.exports = router
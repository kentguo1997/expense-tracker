// Include express & using router
const express = require('express')
const router = express.Router()

// Include Models
const Record = require('../../models/record')
const Category = require('../../models/category')


// setting ('/records')
// Adding new record
router.get('/new', (req, res) => {
  Category.find()
  .lean()
  .then(categories => res.render('new', { categories }) )
  .catch(err => console.log(err))
})

router.post('/', (req, res) => {
  const { name, date, amount, method, categoryName } = req.body
  Category.findOne({ categoryName })
    .then(category => {
      const categoryIcon = category.categoryIcon
      const categoryId = category._id

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
router.get('/:id/edit', (req, res) => {
  const recordId = req.params.id

  Record.findById(recordId)
    .lean()
    .then(record => {
      const { name, date, amount, method, categoryId } = record
      Category.findOne({ _id: categoryId })
        .then(category => {
          const categoryName = category.categoryName
          res.render('edit', { name, date, amount, method, categoryName, recordId })
        })
    })
    .catch(err => console.log(err))
})


router.put('/:id', (req, res) => {
  const recordId = req.params.id
  const { name, date, amount, method, categoryName } = req.body
  let { categoryId, categoryIcon } = ''

  Category.findOne({ categoryName })
    .then(category => {
      categoryId = category._id
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
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


// Delete Record
router.delete('/:id', (req, res) => {
  const recordId = req.params.id

  Record.findById(recordId)
    .then(record => Record.deleteOne(record))
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


// export router for index.js
module.exports = router
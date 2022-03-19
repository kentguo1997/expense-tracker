// Include express & using router
const express = require('express')
const router = express.Router()

// Include Models
const Record = require('../../models/record')
const Category = require('../../models/category')

// setting ('/records')
// Adding new record
router.get('/new', (req, res) => {
  const userId = req.user._id

  Category.find({ userId })
    .lean()
    .then(categories => res.render('new', { categories }))
    .catch(err => console.log(err))
})

router.post('/', (req, res) => {
  const { name, date, amount, method, categoryName } = req.body
  const userId = req.user._id

  Category.findOne({ categoryName, userId })
    .then(category => {
      if (!name || !date || !amount || !method || !categoryName) {
        req.flash('blankErr', '請完成填寫表格！')
        return res.redirect('/records/new')
      }

      if (!category) {
        req.flash('addNewRecordErr', '您尚未新增此支出類別！請先新增類別！')
        return res.redirect('/records/new')
      }
      const categoryIcon = category.categoryIcon
      const categoryId = category._id

      Record.create({
        name,
        date,
        amount,
        method,
        categoryId,
        categoryIcon,
        userId
      })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
})

// Edit record
router.get('/:id/edit', (req, res) => {
  const recordId = req.params.id
  const userId = req.user._id

  Record.findOne({ _id: recordId, userId })
    .lean()
    .then(record => {
      const { name, date, amount, method, categoryId } = record
      Category.findOne({ _id: categoryId, userId })
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
  const userId = req.user._id
  let { categoryId, categoryIcon } = ''

  Category.findOne({ categoryName, userId })
    .then(category => {
      categoryId = category._id
      categoryIcon = category.categoryIcon

      Record.findOne({ _id: recordId, userId })
        .then(record => {
          record.name = name
          record.date = date
          record.amount = amount
          record.method = method
          record.categoryId = categoryId
          record.categoryIcon = categoryIcon
          record.userId = userId

          record.save()
        })
        .then(() => res.redirect('/'))
    })
    .catch(err => console.log(err))

})

// Delete Record
router.delete('/:id', (req, res) => {
  const recordId = req.params.id
  const userId = req.user._id

  Record.findOne({ _id: recordId, userId })
    .then(record => Record.deleteOne(record))
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// export router for index.js
module.exports = router

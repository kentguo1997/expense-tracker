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

router.post('/', (req, res) => {
  const { categoryIcon, categoryName } = req.body
  const userId = req.user._id

  if (!categoryIcon || !categoryName) {
    req.flash('blankErr', '請完成填寫表格！')
    return res.redirect('/categories/new')
  }

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
  const records = []
  const recordMonths = []
  let totalAmount = 0

  Record.find({ userId })
    .lean()
    .sort({ date: 'asc' })
    .then(allRecords => {
      allRecords.forEach(record => {
        const recordMonth = record.date.slice(0, 7)
        if (!recordMonths.includes(recordMonth)) {
          recordMonths.push(recordMonth)
        }

        if (String(record.categoryId) === categoryId) {
          totalAmount += record.amount
          records.push(record)
        }
      })

      Category.find({ userId })
        .lean()
        .then(categories => res.render('index', { records, totalAmount, categories, recordMonths }))
    })
    .catch(err => console.log(err))
})

// export router for index.js
module.exports = router

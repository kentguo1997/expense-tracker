// Include express & using router
const express = require('express')
const router = express.Router()

// Include Models
const Record = require('../../models/record')
const Category = require('../../models/category')

// setting ('/date')
router.get('/:month', (req, res) => {
  const month = req.params.month
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

        if (recordMonth === month) {
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

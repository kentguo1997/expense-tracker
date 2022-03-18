// Include express & using router
const express = require('express')
const router = express.Router()

// Include Models
const Record = require('../../models/record')
const Category = require('../../models/category')

// setting ('/' HomePage)
router.get('/', (req, res) => {
  const userId = req.user._id
  const recordMonths = []
  let totalAmount = 0


  Record.find({ userId })
    .lean()
    .sort({ date: 'asc' })
    .then(records => {
      records.forEach(record => {
        totalAmount += record.amount
        const recordMonth = record.date.slice(0, 7)
        if (!recordMonths.includes(recordMonth)) {
          recordMonths.push(recordMonth)
        }
      })
      Category.find({ userId })
      .lean()
      .then(categories => res.render('index', { records, totalAmount, categories, recordMonths }))
    })
    .catch(error => console.log(error))
})



// export router for index.js
module.exports = router
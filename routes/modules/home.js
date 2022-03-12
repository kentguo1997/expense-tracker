// Include express & using router
const express = require('express')
const router = express.Router()

// Include Models
const Record = require('../../models/record')
const Category = require('../../models/category')

// setting ('/' HomePage)
router.get('/', (req, res) => {
  let totalAmount = 0
  Record.find()
    .lean()
    .sort({ date: 'asc' })
    .then(records => {
      records.forEach(record => totalAmount += record.amount)
      Category.find()
      .lean()
      .then(categories => res.render('index', { records, totalAmount, categories }))
    })
    .catch(error => console.log(error))
})



// export router for index.js
module.exports = router
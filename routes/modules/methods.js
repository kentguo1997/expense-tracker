// Include express & using router
const express = require('express')
const router = express.Router()


// Include Models
const Record = require('../../models/record')
const Category = require('../../models/category')


// setting ('/methods')
router.get('/cash', (req, res) => {
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

        if (record.method === '現金') {
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


router.get('/card', (req, res) => {
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

        if (record.method === '信用卡') {
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


router.get('/mobile', (req, res) => {
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

        if (record.method === '行動支付') {
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
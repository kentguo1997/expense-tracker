// Include express & using router
const express = require('express')
const router = express.Router()


// Include Models
const Record = require('../../models/record')
const Category = require('../../models/category')


// setting ('/methods')
router.get('/cash', (req, res) => {
  const userId = req.user._id
  let totalAmount = 0
  
  Record.find({ method: '現金', userId })
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


router.get('/card', (req, res) => {
  const userId = req.user._id
  let totalAmount = 0

  Record.find({ method: '信用卡', userId })
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


router.get('/mobile', (req, res) => {
  const userId = req.user._id
  let totalAmount = 0

  Record.find({ method: '行動支付', userId })
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
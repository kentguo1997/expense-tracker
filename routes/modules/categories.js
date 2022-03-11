// Include express & using router
const express = require('express')
const router = express.Router()


// Include Models
const Record = require('../../models/record')


// setting ('/categories')
router.get('/living', (req, res) => {
  let totalAmount = 0
  Record.find({ categoryIcon: 'fa-solid fa-house' })
    .lean()
    .sort({ date: 'asc' })
    .then(records => {
      records.forEach(record => {
        totalAmount += record.amount
      })
      res.render('index', { records, totalAmount })
    })
    .catch(err => console.log(err))
})


router.get('/transportation', (req, res) => {
  let totalAmount = 0
  Record.find({ categoryIcon: 'fa-solid fa-van-shuttle' })
    .lean()
    .sort({ date: 'asc' })
    .then(records => {
      records.forEach(record => {
        totalAmount += record.amount
      })
      res.render('index', { records, totalAmount })
    })
    .catch(err => console.log(err))
})


router.get('/entertainment', (req, res) => {
  let totalAmount = 0
  Record.find({ categoryIcon: 'fa-solid fa-face-grin-beam' })
    .lean()
    .sort({ date: 'asc' })
    .then(records => {
      records.forEach(record => {
        totalAmount += record.amount
      })
      res.render('index', { records, totalAmount })
    })
    .catch(err => console.log(err))
})


router.get('/food', (req, res) => {
  let totalAmount = 0
  Record.find({ categoryIcon: 'fa-solid fa-utensils' })
    .lean()
    .sort({ date: 'asc' })
    .then(records => {
      records.forEach(record => {
        totalAmount += record.amount
      })
      res.render('index', { records, totalAmount })
    })
    .catch(err => console.log(err))
})


router.get('/others', (req, res) => {
  let totalAmount = 0
  Record.find({ categoryIcon: 'fa-solid fa-pen' })
    .lean()
    .sort({ date: 'asc' })
    .then(records => {
      records.forEach(record => {
        totalAmount += record.amount
      })
      res.render('index', { records, totalAmount })
    })
    .catch(err => console.log(err))
})




// export router for index.js
module.exports = router
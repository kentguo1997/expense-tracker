// Include express & using router
const express = require('express')
const router = express.Router()


// setting('/users')
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  res.send('Login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  res.send('Register')
})

// export router for index.js
module.exports = router
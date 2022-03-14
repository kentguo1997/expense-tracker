// Include express & using router
const express = require('express')
const router = express.Router()

// Include passport
const passport = require('passport')

// Include User Model
const User = require('../../models/user')

// setting('/users')
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  
  User.findOne({ email })
  .then(user => {
    if(!user) {
      User.create({
        name,
        email,
        password
      })
      .then(() => res.redirect('/users/login'))
      .catch(err => console.log(err))
    } else {
      console.log('此信箱已經被註冊過了！')
      res.render('register', { name, email, password, confirmPassword })
    }
  })
  .catch(err => console.log(err))
})

// export router for index.js
module.exports = router
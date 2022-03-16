// Include express & using router
const express = require('express')
const router = express.Router()

// Include passport
const passport = require('passport')

// Include User Model
const User = require('../../models/user')

// Include bcryptjs
const bcrypt = require('bcryptjs')


// setting('/users')
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errorMessages = []
  
  if (!name || !email || !password || !confirmPassword) {
    errorMessages.push({ message: '請完成填寫上方表格！'})
  }
  
  if (password !== confirmPassword) {
    errorMessages.push({ message: '密碼與確認密碼的欄位並不一致！'})
  }

  if (errorMessages.length) {
    return res.render('register', {
      name,
      email,
      password,
      confirmPassword,
      errorMessages
    })
  }

  User.findOne({ email })
  .then(user => {
    if(!user) {
      bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => {
        User.create({
          name,
          email,
          password: hash
        })
        .then(() => {
          req.flash('successRegister', '註冊成功! 請登入!')
          res.redirect('/users/login')
        })
        .catch(err => console.log(err))
      })    
    } else {
      errorMessages.push({ message: '此信箱已經註冊過了！' })
      res.render('register', { name, email, password, confirmPassword, errorMessages })
    }
  })
  .catch(err => console.log(err))
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '您已成功登出！')
  res.redirect('/users/login')  
})

// export router for index.js
module.exports = router
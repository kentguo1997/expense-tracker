// Include express & using router
const express = require('express')
const router = express.Router()

// Include passport
const passport = require('passport')

// setting('/auth')
// button for sending request 
router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email', 'public_profile']
}))

//  facebook callback
router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))



// export router for index.js
module.exports = router
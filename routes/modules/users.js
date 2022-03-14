// Include express & using router
const express = require('express')
const router = express.Router()


// setting('/users')
router.get('/login', (req, res) => {
  res.render('login')
})


// export router for index.js
module.exports = router
// Include express & using router
const express = require('express')
const router = express.Router()


// Include Modules
const home = require('./modules/home')
const records = require('./modules/records')
const categories = require('./modules/categories')
const methods = require('./modules/methods')
const users = require('./modules/users')

// using router
router.use('/records', records)
router.use('/categories', categories)
router.use('/methods', methods)
router.use('/users', users)
router.use('/', home)



// export router for controller to use
module.exports = router
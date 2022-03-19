// Include express & using router
const express = require('express')
const router = express.Router()

// Include Modules
const home = require('./modules/home')
const records = require('./modules/records')
const categories = require('./modules/categories')
const date = require('./modules/date')
const methods = require('./modules/methods')
const users = require('./modules/users')
const auth = require('./modules/auth')
const { authenticator } = require('../middleware/auth')

// using router
router.use('/records', authenticator, records)
router.use('/categories', authenticator, categories)
router.use('/date', authenticator, date)
router.use('/methods', authenticator, methods)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)

// export router for controller to use
module.exports = router

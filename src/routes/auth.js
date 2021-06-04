const express = require('express')
const router = express.Router()
const { token } = require('../auth/service')

router.post('/login', token)
router.post('/tokens/refresh', token)
router.post('/logout', token)

module.exports = router

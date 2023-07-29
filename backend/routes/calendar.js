const express = require('express')
const router = express.Router()
const {index, live} = require('../controllers/calendar')

router.get('/', index)
router.get('/live/:matchId', live)

module.exports = router

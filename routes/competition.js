const express = require('express')
const router = express.Router()
const { indexCompetition, findCompetition } = require('../controllers/competition')

router.get('/', indexCompetition)
router.get('/:idCompetition', findCompetition)

module.exports = router

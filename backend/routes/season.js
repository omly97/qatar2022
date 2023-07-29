const express = require('express')
const router = express.Router()
const { findSeason, getSeasonbracket, getWatch } = require('../controllers/season')

router.get('/:idSeason', findSeason)
router.get('/:idSeason/seasonbracket', getSeasonbracket)
router.get('/:idSeason/watch/:countryCode', getWatch)

module.exports = router

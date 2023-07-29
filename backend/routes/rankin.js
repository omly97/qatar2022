const express = require('express')
const router = express.Router()
const {getRankinMetadata, getRankinData} = require('../controllers/rankin')

router.get('/meta', getRankinMetadata)
router.get('/data', getRankinData)

module.exports = router

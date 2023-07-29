const express = require('express')
const router = express.Router()
const {
    getAllSections,
    getVideosInSection,
    getVideoDetails,
    getVideoPlayerData
} = require('../controllers/video')

router.get('/sections', getAllSections)
router.get('/sections/:sectionId', getVideosInSection)
router.get('/:entryId/details', getVideoDetails)
router.get('/:entryId/playerData', getVideoPlayerData)

module.exports = router

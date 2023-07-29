const {
    getSections,
    getVideosSection,
    getDetails,
    getPlayerData
} = require('../repositories/video')

const getAllSections = (req, res) => {
    (async () => {
        const data = await getSections()
        data.success
            ? res.status(200).json(data.data)
            : res.status(500).json(data)
    })()
}

const getVideosInSection = (req, res) => {
    (async () => {
        const locale = req.query.locale ??= "fr"
        const sectionId = req.params.sectionId
        const data = await getVideosSection(sectionId, locale)
        data.success
            ? res.status(200).json(data.data)
            : res.status(500).json(data)
    })()
}

const getVideoDetails = (req, res) => {
    (async () => {
        const entryId = req.params.entryId
        const locale = req.query.locale ??= "fr"
        const data = await getDetails(entryId, locale)
        data.success
            ? res.status(200).json(data.data)
            : res.status(500).json(data)
    })()
}

const getVideoPlayerData = (req, res) => {
    (async () => {
        const entryId = req.params.entryId
        const locale = req.query.locale ??= "fr"
        const data = await getPlayerData(entryId, locale)
        data.success
            ? res.status(200).json(data.data)
            : res.status(500).json(data)
    })()
}

module.exports = {
    getAllSections,
    getVideosInSection,
    getVideoDetails,
    getVideoPlayerData
}

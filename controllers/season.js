const { find, seasonbracket, watch } = require('../repositories/season')

const findSeason = (req, res) => {
    (async () => {
        const language = req.query.language ??= "fr"
        const idSeason = req.params.idSeason ?? "255711" // Qatar 2022 season
        const data = await find(idSeason, language)
        data.success
            ? res.status(200).json(data.data)
            : res.status(500).json(data)
    })()
}

const getSeasonbracket = (req, res) => {
    (async () => {
        const language = req.query.language ??= "fr"
        const idSeason = req.params.idSeason ?? "255711" // Qatar 2022 season
        const data = await seasonbracket(idSeason, language)
        data.success
            ? res.status(200).json(data.data)
            : res.status(500).json(data)
    })()
}

const getWatch = (req, res) => {
    (async () => {
        const language = req.query.language ??= "fr"
        const idSeason = req.params.idSeason ?? "255711" // Qatar 2022 season
        const countryCode = req.params.countryCode ??= "SN"
        const data = await watch(idSeason, language, countryCode)
        data.success
            ? res.status(200).json(data.data)
            : res.status(500).json(data)
    })()
}

module.exports = {
    findSeason,
    getSeasonbracket,
    getWatch,
}

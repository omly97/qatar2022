const {getRankinMeta, getRankin} = require('../repositories/ranking')

const getRankinMetadata = (req, res) => {
    (async () => {
        const locale = req.query.locale ??= "fr"
        const entryId = req.query.entryId ??= "72gPa7J9aIeldlrtOlJZiF" // value of word cup 2022
        const data = await getRankinMeta(locale, entryId)
        data.success
            ? res.status(200).json(data.data)
            : res.status(500).json(data)
    })()
}

const getRankinData = (req, res) => {
    (async () => {
        const language = req.query.language ??= "fr"
        const IdCompetition = req.query.IdCompetition ??= "17"// value of word cup 2022
        const IdSeason = req.query.IdSeason ??= "255711" // value of word cup 2022
        const IdStage = req.query.IdStage ??= "285063" // value of word cup 2022
        const data = await getRankin(language, IdCompetition, IdSeason, IdStage)
        data.success
            ? res.status(200).json(data.data)
            : res.status(500).json(data)
    })()
}

module.exports = {
    getRankinMetadata,
    getRankinData
}

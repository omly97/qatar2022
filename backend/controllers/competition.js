const { index, find } = require('../repositories/competition')

const indexCompetition = (req, res) => {
    (async () => {
        const language = req.query.language ??= "fr"
        const data = await index(language)
        data.success
            ? res.status(200).json(data.data)
            : res.status(500).json(data)
    })()
}

const findCompetition = (req, res) => {
    (async () => {
        const language = req.query.language ??= "fr"
        const idCompetition = req.params.idCompetition
        const data = await find(idCompetition, language)
        data.success
            ? res.status(200).json(data.data)
            : res.status(500).json(data)
    })()
}

module.exports = {
    indexCompetition,
    findCompetition
}

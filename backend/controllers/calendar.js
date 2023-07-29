const {getCalendar, getLiveMatch} = require('../repositories/calendar')

const todayMidnight = () => {
    let from = new Date()
    from.setUTCHours(0, 0 , 0, 0);
    return from.toISOString().slice(0, 19) + "Z"
}

const today11pm = () => {
    let to = new Date()
    to.setUTCHours(23, 59, 59, 10, 200)
    return to.toISOString().slice(0, 19) + "Z"
}

const index = (req, res) => {
    (async () => {
        const fromDate = req.query.from ??= todayMidnight()
        const toDate = req.query.to ??= today11pm()
        const language = req.query.language ??= "fr"
        const count = req.query.count ??= 500
        const idSeason = req.query.idSeason ??= 255711 // word cup 2020 idSeason is 255711
        const data = await getCalendar(fromDate, toDate, language, count, idSeason)
        data.success
            ? res.status(200).json(data.data)
            : res.status(500).json(data)
    })()
}

const live = (req, res) => {
    (async () => {
        const language = req.query.language ??= "fr"
        const matchId = req.params.matchId
        const data = await getLiveMatch(matchId, language)
        data.success
            ? res.status(200).json(data.data)
            : res.status(500).json(data)
    })()
}

module.exports = {
    index,
    live
}

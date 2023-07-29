const axios = require("../plugins/axios")
const { transformMatch } = require("../helper")

const baseURL = "https://api.fifa.com/api/v3"

const getCalendar = async (fromDate, toDate, language, count, idSeason) => {
    const url = `${baseURL}/calendar/matches`
    const params = {
        from: fromDate,
        to: toDate,
        language: language,
        count: count,
        idSeason: idSeason
    }

    var res = []
    await axios.get(url, {params: params}).then(function (response) {
        let results = response.data.Results
        results = results.map((e) => (transformMatch(e)))
        res = { success: true, data: results }
    }).catch(function (error) {
        res = { success: false, error: error }
    });

    return res
}

const getLiveMatch = async (matchId, language) => {
    const url = `${baseURL}/live/football/${matchId}`
    const params = { language: language }

    var res = []
    await axios.get(url, {params: params}).then(function (response) {
        res = { success: true, data: transformMatch(response.data) }
    }).catch(function (error) {
        res = { success: false, error: error }
    });

    return res
}

module.exports = {
    getCalendar,
    getLiveMatch
}

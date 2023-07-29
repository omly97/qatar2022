const axios = require("../plugins/axios")
const { transformSeason, transformSeasonBracket } = require("../helper")

const baseURL = "https://api.fifa.com/api/v3"

const find = async (idSeason, language) => {
    const url = `${baseURL}/seasons/${idSeason}`
    const params = { language: language }

    var res = []
    await axios.get(url, {params: params}).then(function (response) {
        res = { success: true, data: transformSeason(response.data) }
    }).catch(function (error) {
        res = { success: false, error: error }
    });

    return res
}

const seasonbracket = async (idSeason, language) => {
    const url = `${baseURL}/seasonbracket/season/${idSeason}`
    const params = { language: language }

    var res = []
    await axios.get(url, {params: params}).then(function (response) {
        res = { success: true, data: transformSeasonBracket(response.data) }
    }).catch(function (error) {
        res = { success: false, error: error }
    });

    return res
}

const watch = async (idSeason, language, countryCode) => {
    const url = `${baseURL}/watch/season/${idSeason}/${countryCode}`
    const params = { language: language }

    var res = []
    await axios.get(url, {params: params}).then(function (response) {
        res = { success: true, data: response.data }
        // res = { success: true, data: transformResultObject(response.data) }
    }).catch(function (error) {
        res = { success: false, error: error }
    });

    return res
}

module.exports = {
    find,
    seasonbracket,
    watch
}

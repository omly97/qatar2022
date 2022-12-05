const axios = require("../plugins/axios")

const baseURL = "https://api.fifa.com/api/v3"

const index = async (language) => {
    const url = `${baseURL}/competitions`
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

const find = async (idCompetition, language) => {
    const url = `${baseURL}/competitions/${idCompetition}`
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
    index,
    find
}

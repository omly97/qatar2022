const axios = require("../plugins/axios")
const sections = require('../data/sections')


const baseURL = "https://cxm-api.fifa.com/fifaplusweb/api"

const transformVideoObj = (obj) => {
    return {
        title: obj.title,
        entryId: obj.entryId,
        readMorePageUrl: obj.readMorePageUrl,
        image: obj.image,
        backgroundImage: obj.backgroundImage,
        publishDate: obj.publishDate,
        watchDataDto: obj.watchDataDto
    }
}

const getSections = () => {
    return { success: true, data: sections }
}

const getVideosSection = async (sectionId, locale) => {
    // create request metadata
    const url = `${baseURL}/sections/smallLandscapeCarousel/${sectionId}`
    const params = {
        locale: locale,
        limit: 100,
        skip: 0
    }

    // create function transforming response data
    const transform = (obj) => {
        let videos = []
        obj.items.forEach(videoObj => {
            videos.push(transformVideoObj(videoObj))
        })
        return { title: obj.title, items: videos }
    }

    // make request
    var res = []
    await axios.get(url, {params: params}).then(function (response) {
        res = { success: true, data: transform(response.data) }
    }).catch(function (error) {
        res = { success: false, error: error }
    });

    return res
}

const getDetails = async (entryId, locale) => {
    // create request metadata
    const url = `${baseURL}/sections/videoDetails/${entryId}`
    const params = { locale: locale }

    // create function transforming carousel data
    const transformCarousel = (obj) => {
        let videos = []
        obj.items.forEach(videoObj => {
            videos.push(transformVideoObj(videoObj))
        })
        return { title: obj.title, items: videos }
    }

    // create function transforming response data
    const transform = (obj) => {
        return {
            videoEntryId: obj.videoEntryId,
            title: obj.title,
            description: obj.description,
            backgroundImage: obj.backgroundImage,
            duration: obj.duration,
            dateOfLastEdit: obj.dateOfLastEdit,
            tournamentLogo: obj.tournamentLogo,
            moreFromCarousel: transformCarousel(obj.moreFromCarousel),
            otherArchiveCarousel: transformCarousel(obj.otherArchiveCarousel),
        }
    }

    // make request
    var res = []
    await axios.get(url, {params: params}).then(function (response) {
        res = { success: true, data: transform(response.data) }
    }).catch(function (error) {
        res = { success: false, error: error }
    });

    return res
}

const getPlayerData = async (entryId, locale) => {
    // create request metadata
    const url = `${baseURL}/videoPlayerData/${entryId}`
    const params = { locale: locale }

    // create function transforming response data
    const transform = (obj) => {
        return obj
    }

    // make request
    var res = []
    await axios.get(url, {params: params}).then(function (response) {
        res = { success: true, data: transform(response.data) }
    }).catch(function (error) {
        res = { success: false, error: error }
    });

    return res
}

module.exports = {
    getSections,
    getVideosSection,
    getDetails,
    getPlayerData
}

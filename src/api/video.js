import axios from "../plugins/axios";

export default function useVideo() {

    const getSections = () => {
        return new Promise((resolve, reject) => {
            axios.get('videos/sections')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    }

    const getVideosOfSection = (sectionId) => {
        return new Promise((resolve, reject) => {
            axios.get(`videos/sections/${sectionId}`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    }

    const getVideoDetails = (entryId) => {
        return new Promise((resolve, reject) => {
            axios.get(`videos/${entryId}/details`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    }

    const getVideoPlayerData = (entryId) => {
        return new Promise((resolve, reject) => {
            axios.get(`videos/${entryId}/playerData`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    }

    return {
        getSections,
        getVideosOfSection,
        getVideoDetails,
        getVideoPlayerData
    }
}

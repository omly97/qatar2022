import axios from "../plugins/axios";

export default function useSeason() {

    const findSeason = (seasonId) => {
        return new Promise((resolve, reject) => {
            axios.get(`seasons/${seasonId}`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    }

    const getSeasonBracket = (seasonId) => {
        return new Promise((resolve, reject) => {
            axios.get(`seasons/${seasonId}/seasonbracket`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    }

    const getSeasonWatch = (seasonId, countryCode) => {
        return new Promise((resolve, reject) => {
            axios.get(`seasons/${seasonId}/watch/${countryCode}`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    }

    return {
        findSeason,
        getSeasonBracket,
        getSeasonWatch,
    }
}

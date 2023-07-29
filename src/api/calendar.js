import axios from "../plugins/axios";

export default function useCalendar() {

    const getCalendar = () => {
        return new Promise((resolve, reject) => {
            axios.get('calendar')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    }

    const getLiveMatch = (matchId) => {
        return new Promise((resolve, reject) => {
            axios.get(`calendar/live/${matchId}`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    }

    return {
        getCalendar,
        getLiveMatch
    }
}

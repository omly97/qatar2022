import axios from "../plugins/axios";

export default function useRankin() {

    const getRankinMetadata = () => {
        return new Promise((resolve, reject) => {
            axios.get('rankin/meta')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    }

    const getRankinData = () => {
        return new Promise((resolve, reject) => {
            axios.get('rankin/data')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    }

    return {
        getRankinMetadata,
        getRankinData,
    }
}

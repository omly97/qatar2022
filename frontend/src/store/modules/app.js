export default {
    namespaced: true,

    state: () => ({
        idCompetition: 17,
        idSeason: 255711,
    }),

    mutations: {
        setIdCompetition(state, idCompetition) {
            state.idCompetition = idCompetition
        },
        setIdSeason(state, idSeason) {
            state.idSeason = idSeason
        },
    },

    getters: {
        idCompetition(state) {
            return state.idCompetition
        },
        idSeason(state) {
            return state.idSeason
        },
    },

    actions: {
        setIdCompetition(context , idCompetition) {
            context.commit('setIdCompetition', idCompetition);
        },
        setIdSeason(context , idSeason) {
            context.commit('setIdSeason', idSeason);
        },
    }
}

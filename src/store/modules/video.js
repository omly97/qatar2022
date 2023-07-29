export default {
    namespaced: true,

    state: () => ({
        videoObj: {
            title: null,
            entryId: null,
            image: {},
            publishDate: null,
            backgroundImage: {},
            watchDataDto: {}
        },
    }),

    mutations: {
        setVideoObj(state, videoObj) {
            state.videoObj = videoObj
        },
    },

    getters: {
        videoObj(state) {
            return state.videoObj
        },
    },

    actions: {
        setVideoObj(context , videoObj) {
            context.commit('setVideoObj', videoObj);
        },
    }
}

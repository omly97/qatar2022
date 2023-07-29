export default {
    namespaced: true,

    state: () => ({
        data: null,
    }),

    mutations: {
        setData(state, data) {
            state.data = data
        },
    },

    getters: {
        data(state) {
            return state.data
        },
        stages(state) {
            let stages = []
            const collectionStages = [state.data.GroupsStages, state.data.KnockoutStages]
            collectionStages.forEach(collectionItem => {
                stages = stages.concat(
                    collectionItem.map((stageItem) => ({
                        IdStage: stageItem.IdStage,
                        SequenceOrder: stageItem.SequenceOrder,
                        Name: stageItem.Name,
                        Groups: stageItem.Groups,
                        Matches: stageItem.Matches
                    }))
                )
            });
            return stages
        },
        isGroupStage: (state) => (IdStage) => {
            return ! (state.data.GroupsStages.findIndex(stage => stage.IdStage == IdStage) === -1)
        }
    },

    actions: {
        setData(context, data) {
            context.commit('setData', data);
        }
    }
}

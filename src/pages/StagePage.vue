<template>
    <v-container class="px-0">
        <template v-if="loading">
            <div class="d-flex flex-column">
                <v-skeleton-loader
                    v-for="i in 4"
                    :key="i"
                    type="image"
                    height="120"
                    class="mb-1"
                ></v-skeleton-loader>
            </div>
        </template>

        <template v-else>
            <v-tabs
                v-model="tab"
                background-color="transparent"
                color="white"
                show-arrows
                centered
                dark
            >
                <v-tabs-slider></v-tabs-slider>
                <v-tab
                    v-for="item in stages"
                    :key="item.IdStage"
                    :href="`#${item.IdStage}`"
                >
                    <span class="text-caption text-capitalize">{{ item.Name }}</span>
                </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab" class="transparent py-2">
                <v-tab-item
                    v-for="item in stages"
                    :key="item.IdStage"
                    :value="item.IdStage"
                >
                    <MatchsStages :stageData="item"></MatchsStages>
                </v-tab-item>
            </v-tabs-items>
        </template>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import useSeason from '@/api/season'
import MatchsStages from '@/components/MatchsStages.vue'
const { getSeasonBracket } = useSeason()

export default {
    name: 'StagePage',
    data: () => ({
        tab: null,
        loading: false
    }),
    computed: {
        ...mapGetters('app', [
            'idSeason', // -> this.idSeason
        ]),
        ...mapGetters('seasonbracket', [
            'data', // -> this.data,
            'stages', // -> this.stages
        ])
    },
    components: { MatchsStages },
    created() {
        if (this.data == null) {
            this.fetchBracketData()
        }
    },
    methods: {
        ...mapActions('seasonbracket', [
            'setData', // -> this.setData(...args)
        ]),
        fetchBracketData() {
            this.loading = true;
            getSeasonBracket(this.idSeason).then(response => {
                this.setData(response)
            }).catch(error => {
                this.$swal.fire({
                    title: 'Error!',
                    text: error.message,
                    icon: 'error',
                });
            }).finally(() => {
                this.loading = false
            })
        }
    }
}
</script>

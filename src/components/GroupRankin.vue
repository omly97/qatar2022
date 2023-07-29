<template>
    <div>
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
            <v-row dense>
                <v-col
                    v-for="(item, i) in rankinData" :key="i"
                    cols="12" xl="3" lg="4" md="4"
                >
                    <GroupRankinTable :rankin="item"></GroupRankinTable>
                </v-col>
            </v-row>
        </template>
    </div>
</template>

<script>
import GroupRankinTable from '@/components/GroupRankinTable.vue'
import useRankin from '@/api/rankin'
const { getRankinData } = useRankin()

export default {
    name: 'GroupRankin',
    data: () => ({
        rankinData: [],
        loading: false
    }),
    components: { GroupRankinTable },
    created() {
        this.fetchRankinData()
    },
    methods: {
        fetchRankinData() {
            this.loading = true;
            getRankinData().then(response => {
                this.rankinData = response
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

<template>
    <div>
        <MobileLayout v-if="$vuetify.breakpoint.mobile"></MobileLayout>
        <WebLayout v-else></WebLayout>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import useSeason from '@/api/season'
import WebLayout from '@/layouts/WebLayout.vue'
import MobileLayout from '@/layouts/MobileLayout.vue'

const { getSeasonBracket } = useSeason()

export default {
    name: 'App',
    data: () => ({
        // 
    }),
    components: {
        WebLayout,
        MobileLayout
    },
    computed: {
        ...mapGetters('app', [
            'idSeason', // -> this.idSeason
        ])
    },
    created() {
        this.fetchBracketData()
    },
    methods: {
        ...mapActions('seasonbracket', [
            'setData', // -> this.setData(...args)
        ]),
        fetchBracketData() {
            getSeasonBracket(this.idSeason).then(response => {
                this.setData(response)
            }).catch(error => {
                this.$swal.fire({
                    title: 'Error!',
                    text: error.message,
                    icon: 'error',
                });
            })
        }
    }
}
</script>

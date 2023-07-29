<template>
    <v-container>
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
            <div class="d-flex flex-column">
                <MatchCard
                    v-for="(item, i) in calendar"
                    :key="i"
                    :match="item"
                    class="mb-1"
                ></MatchCard>
            </div>
        </template>
    </v-container>
</template>

<script>
import MatchCard from '@/components/MatchCard.vue'
import useCalendar from '@/api/calendar'
const { getCalendar } = useCalendar()

export default {
    name: 'WelcomePage',
    data: () => ({
        calendar: [],
        loading: false
    }),
    components: { MatchCard },
    created() {
        this.fetchCalendar()
    },
    methods: {
        fetchCalendar() {
            this.loading = true;
            getCalendar().then(response => {
                this.calendar = response
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

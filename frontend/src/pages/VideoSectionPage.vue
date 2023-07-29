<template>
    <v-card height="100%" class="d-flex align-center" color="transparent">
        <v-container>
            <v-row justify="center" align="stretch" dense>
                <template v-if="loading">
                    <v-col
                        v-for="i in 4"
                        :key="i"
                        cols="5"
                    >
                        <v-skeleton-loader type="image" height="120"></v-skeleton-loader>
                    </v-col>
                </template>

                <template v-else>
                    <v-col
                        v-for="item in sections"
                        :key="item.idSection"
                        cols="5"
                    >
                        <SectionCard :section="item"></SectionCard>
                    </v-col>
                </template>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
import SectionCard from '@/components/SectionCard.vue'
import useVideo from '@/api/video'
const { getSections } = useVideo()

export default {
    name: 'VideoSectionPage',
    data: () => ({
        sections: [],
        loading: false
    }),
    components: { SectionCard },
    created() {
        this.fetchSections()
    },
    methods: {
        fetchSections() {
            this.loading = true;
            getSections().then(response => {
                this.sections = response
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

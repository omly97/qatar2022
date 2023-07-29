<template>
    <div>
        <template v-if="loading">
            <v-skeleton-loader type="image, text@3"></v-skeleton-loader>
        </template>

        <template v-else>
            <VideoCard :video="video"></VideoCard>
        </template>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import VideoCard from '@/components/VideoCard.vue'
import useVideo from '@/api/video'
const { getVideoDetails } = useVideo()

export default {
    name: 'VideoDetailPage',
    data: () => ({
        video: {},
        loading: false
    }),
    components: { VideoCard },
    computed: {
        entryId() {
            return this.$route.params.entryId
        },
        ...mapGetters('video', [
            'videoObj', // -> this.videoObj
        ])
    },
    created() {
        this.fetchVideo()
    },
    methods: {
        fetchVideo() {
            this.loading = true;
            getVideoDetails(this.entryId).then(response => {
                this.video = response
                this.video['image'] = this.videoObj.image
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

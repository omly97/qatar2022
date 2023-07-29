<template>
    <div>
        <template v-if="loading">
            <div class="d-flex flex-column">
                <v-skeleton-loader
                    v-for="i in 8"
                    :key="i"
                    type="image"
                    height="100"
                    class="mb-1"
                ></v-skeleton-loader>
            </div>
        </template>

        <template v-else>
            <v-list color="transparent">
                <v-list-item v-for="(item, i) in videos.items" :key="i">
                    <VideoListItem :video="item" class="mb-1"></VideoListItem>
                </v-list-item>
            </v-list>
        </template>
    </div>
</template>

<script>
import VideoListItem from '@/components/VideoListItem.vue'
import useVideo from '@/api/video'
const { getVideosOfSection } = useVideo()

export default {
    name: 'VideoListPage',
    data: () => ({
        videos: {
            title: "",
            items: []
        },
        loading: false
    }),
    components: { VideoListItem },
    computed: {
        sectionId() {
            return this.$route.params.sectionId
        }
    },
    created() {
        this.fetchVideos()
    },
    methods: {
        fetchVideos() {
            this.loading = true;
            getVideosOfSection(this.sectionId).then(response => {
                this.videos = response
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

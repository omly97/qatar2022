<template>
    <v-card outlined color="transparent">
        <v-list-item @click="selectVideo">
            <v-list-item-avatar rounded size="90">
                <v-img
                    :lazy-src="require('@/assets/img/qatar2022V.png')"
                    :src="video.image.src"
                >
                    <template v-slot:placeholder>
                        <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                        >
                            <v-progress-circular
                                indeterminate
                                color="grey lighten-4"
                            ></v-progress-circular>
                        </v-row>
                    </template>
                </v-img>
            </v-list-item-avatar>
            <v-list-item-content>
                <div class="white--text text-caption font-weight-medium">{{ video.title }}</div>
            </v-list-item-content>
        </v-list-item>
    </v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'VideoListItem',
    props: {
        video: {
            type: Object,
            required: true
        }
    },
    methods: {
        ...mapActions('video', [
            'setVideoObj', // -> this.setVideoObj()
        ]),
        selectVideo() {
            this.setVideoObj(this.video)
            this.$router.push({name: 'videos-detail', params: {entryId: this.video.entryId} })
        }
    }
}
</script>

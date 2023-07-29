<template>
    <v-card flat color="transparent">
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

        <div class="white--text font-weight-medium">
            <v-card-title class="text-body-1 font-weight-medium mb-2">{{ video.title }}</v-card-title>
            <v-card-subtitle class="text-body-2 font-weight-medium">{{ video.description }}</v-card-subtitle>
        </div>
    </v-card>
</template>

<script>
export default {
    name: 'VideoCard',
    props: {
        video: {
            type: Object,
            required: true
        }
    }
}
</script>

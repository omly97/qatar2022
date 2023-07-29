<template>
    <v-card
        outlined
        color="secondary"
        class="d-flex align-center flex-column py-2"
        height="170"
        :to="{ name: 'videos-list', params: { sectionId: section.idSection } }"
    >
        <v-avatar rounded size="80">
        <v-img
            :src="require('@/assets/img/qatar2022V.png')"
        ></v-img>
        </v-avatar>
        <v-card-text class="text-center white--text">
            <span class="text-caption">{{ section.nameFR }}</span>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'SectionCard',
    props: {
        section: {
            type: Object,
            required: true
        }
    }
}
</script>

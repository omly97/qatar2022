<template>
    <v-app :style="{background: $vuetify.theme.themes.light.indigo}">
        <v-container class="overflow-hidden">
            <v-app-bar
                app
                absolute
                color="primary"
                dark
                shrink-on-scroll
                prominent
                fade-img-on-scroll
                scroll-target="#scrolling-techniques-4"
            >
                <!-- <template v-slot:img="{ props }">
                    <v-img
                        v-bind="props"
                        gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
                    ></v-img>
                </template> -->

                <v-app-bar-nav-icon></v-app-bar-nav-icon>

                <v-toolbar-title>Qatar 2022</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn
                    href="https://github.com/omly97"
                    target="_blank"
                    text
                >
                    <!-- <span class="text-lowercase">omly97</span> -->
                    <v-icon>mdi-github</v-icon>
                </v-btn>

                <template v-slot:extension>
                    <v-tabs align-with-title>
                    <v-tab
                        v-for="(item, i) in menu"
                        :key="i"
                        :to="{ name: item.routeName }"
                    >
                        <v-icon>{{ item.icon }}</v-icon>
                        <span class="mx-1">{{ item.title }}</span>
                    </v-tab>
                    </v-tabs>
                </template>
            </v-app-bar>

            <v-main id="scrolling-techniques-4">
                <v-container>
                    <router-view></router-view>
                </v-container>
            </v-main>

            <v-footer app dark padless>
                <v-card flat tile class="flex">
                    <v-card-text class="py-2 white--text text-center">
                        {{ new Date().getFullYear() }} — <strong>Ly</strong>
                    </v-card-text>
                </v-card>
            </v-footer>
        </v-container>
    </v-app>
</template>

<script>
export default {
    name: 'WebLayout',
    data: () => ({
        sidebar: true,
        menu: [
            {
                title: 'Accueil',
                routeName: 'welcome',
                icon: 'mdi-soccer'
            },
            {
                title: 'Videos',
                routeName: 'videos-sections',
                icon: 'mdi-youtube'
            },
            {
                title: 'Classement',
                routeName: 'stage',
                icon: 'mdi-table'
            }
        ]
    }),
}
</script>

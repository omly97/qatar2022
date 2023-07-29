<template>
    <v-app :style="{background: $vuetify.theme.themes.light.primary}">
        <v-navigation-drawer v-model="sidebar" app dark>
            <!--  -->
        </v-navigation-drawer>

        <v-app-bar
            app dark
            :color="$vuetify.theme.themes.light.indigo"
        >
            <span class="hidden-lg-and-up">
                <v-app-bar-nav-icon @click="sidebar = !sidebar"></v-app-bar-nav-icon>
            </span>

            <v-spacer></v-spacer>
            <div class="d-flex align-center ml-10">
                <v-img
                    alt="Qatar Logo"
                    class="shrink mr-2"
                    contain
                    :src="require('@/assets/img/qatar2022H.png')"
                    transition="scale-transition"
                    width="100"
                />
            </div>
            <v-spacer></v-spacer>

            <v-btn
                href="https://github.com/omly97"
                target="_blank"
                text
            >
                <v-icon>mdi-github</v-icon>
                <!-- <span class="text-lowercase text-caption">omly97</span> -->
            </v-btn>
        </v-app-bar>

        <v-main>
            <router-view></router-view>
        </v-main>

        <v-bottom-navigation
            :value="bottom"
            app
            grow
            dark
            color="white"
            :background-color="$vuetify.theme.themes.light.indigo"
        >
            <v-btn
                v-for="(item, i) in menu"
                :key="i"
                :to="{ name: item.routeName }"
            >
                <span>{{ item.title }}</span>
                <v-icon>{{ item.icon }}</v-icon>
            </v-btn>
        </v-bottom-navigation>
    </v-app>
</template>

<script>
export default {
    name: 'MobileLayout',
    data: () => ({
        sidebar: false,
        bottom: 0,
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

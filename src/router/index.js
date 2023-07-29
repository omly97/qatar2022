import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'hash',
    routes: [
        {
            path: '/welcome',
            alias: '/',
            name: 'welcome',
            component: () => import('../pages/WelcomePage.vue'),
        },

        {
            path: '/videos/sections',
            name: 'videos-sections',
            component: () => import('../pages/VideoSectionPage.vue'),
        },
        {
            path: '/videos/:sectionId',
            name: 'videos-list',
            component: () => import('../pages/VideoListPage.vue'),
        },
        {
            path: '/videos/details/:entryId',
            name: 'videos-detail',
            component: () => import('../pages/VideoDetailPage.vue'),
        },

        {
            path: '/stage',
            name: 'stage',
            component: () => import('../pages/StagePage.vue'),
        },

        /**
         * 404 Not Found
         */
        // {
        //     path: '*',
        //     name: 'NotFound',
        //     component: () => import('../pages/About.vue')
        // },
    ]
});

export default router;

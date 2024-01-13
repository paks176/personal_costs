import Vue from 'vue';
//import AboutPage from '../components/AboutPage.vue';
//import RecordsList from '../components/recordsList.vue';
// import StartPage from '../components/StartPage.vue';

const routes = [
    {
        path: "/",
        name: "Start",
        component: () => import('../components/StartPage.vue'),
    },
    {
        path: "/about",
        name: "About",
        component: () => import('../components/AboutPage.vue'),
    },
    {
        path: "/about/:test",
        component: () => import('../components/AboutPage.vue'),
    },
    {
        path: "/records",
        name: "Records",
        component: () => import('../components/recordsList.vue'),
    },
];

import VueRouter from 'vue-router';

const router = new VueRouter({
    routes: routes,
});

Vue.use(VueRouter)

export default router;
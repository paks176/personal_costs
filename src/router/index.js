import Vue from 'vue';
import AboutPage from '../components/AboutPage.vue';
import RecordsList from '../components/recordsList.vue';
import StartPage from '../components/StartPage.vue';

const routes = [
    {
        path: "/",
        name: "Start",
        component: StartPage,
    },
    {
        path: "/about",
        name: "About",
        component: AboutPage,
    },
    {
        path: "/about/:test",
        component: AboutPage,
    },
    {
        path: "/records",
        name: "Records",
        component: RecordsList,
    },
];

import VueRouter from 'vue-router';

const router = new VueRouter({
    routes: routes,
});

Vue.use(VueRouter)

export default router;
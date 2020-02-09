import Vue from 'vue';
import Router from 'vue-router';
import VueMeta from 'vue-meta';

Vue.use(Router);
Vue.use(VueMeta);

export function createRouter(): Router {
    return new Router({
        mode: 'history',
        routes: [
            { path: '/', component: () => import('./components/main.vue') },
            { path: '/about', component: () => import('./components/about.vue') },
        ],
    });
}

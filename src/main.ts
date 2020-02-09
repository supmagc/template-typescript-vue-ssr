import Vue from 'vue';
import { sync } from 'vuex-router-sync';

import { createRouter } from './router';
import { createStore } from './stores';

import App from './components/app.vue';
import Router from 'vue-router';
import { VNode } from 'vue/types/umd';

export function createApp(): { app: Vue; router: Router; store: any } {
    const router = createRouter();
    const store = createStore();

    sync(store, router);

    const app = new Vue({
        router,
        store,
        render: (h): VNode => h(App),
    });

    return { app, router, store };
}

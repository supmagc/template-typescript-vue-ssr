import Vue from 'vue';
import Vuex from 'vuex';

import Items from './stores/items';
import { isProduction } from './constants/environment';

Vue.use(Vuex);

export function createStore(): Vuex.Store {
    return new Vuex.Store({
        strict: !isProduction,

        modules: {
            Items,
        },
    });
}

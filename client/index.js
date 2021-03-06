import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex'
import createRouter from './config/router'
import createStore from './store/store'

import './assets/styles/global.styl';

Vue.use(VueRouter);
Vue.use(Vuex);

const router = createRouter();
const store = createStore();

new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount('#root');
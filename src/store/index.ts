import Vue from 'vue';
import Vuex from 'vuex';
import global from './modules/global';
import kube from './modules/kube';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    global,
    kube,
  },
});

export default store;

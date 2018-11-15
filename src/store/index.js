import Vue from 'vue'
import vuex from 'vuex'
import flatState from './modules/flat'
Vue.use(vuex);

export default new vuex.Store({
    modules: {
        flatState
    },
})
import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

export default new vuex.Store({
    state:{
        serviceFlat: 1,//服务包平台 1: windows;2:linux;3:both
    },
    mutations:{
        change_flat(state, payload){
            state.serviceFlat = payload.status;
        }
    },
    actions:{
        change_flat(context, payload){
            context.commit('change_flat', payload);
        },
    }
})
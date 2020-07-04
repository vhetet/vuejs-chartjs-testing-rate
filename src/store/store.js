import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // count: 0,
        title: 'test'
    },
    mutations: {
        // change(state, count) {
        //     state.count = count
        // }
    },
    getters: {
        // count: state => state.count
    }
})
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.store({
    state: {
        count: 0
    },
    mutations: {
        change(state, count) {
            state.count = count
        }
    },
    getters: {
        count: state => state.count
    }
})
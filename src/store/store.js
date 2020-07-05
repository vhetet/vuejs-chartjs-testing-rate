import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        count: 0,
        title: 'test',
        chartData: []
    },
    mutations: {
        change(state, count) {
            state.count = count
        },
        changeChartData(state, chartData) {
            state.chartData = chartData
        }
    },
    getters: {
        count: state => state.count
    }
})
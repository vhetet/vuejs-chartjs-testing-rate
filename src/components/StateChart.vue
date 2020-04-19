<template>

  <div class="hello">
    <select v-model="stateSelected" @change="getData(stateSelected)">
      <option v-for="state in stateList" :key="state">{{state}}</option>
    </select>
    <line-chart :chart-data="datacollection" :options="options"></line-chart>
  </div>
</template>

<script>
import LineChart from './LineChart.js'

  export default {
    components: {
      LineChart
    },
    data () {
      return {
        datacollection: {},
        options: {},
        stateSelected: 'new-york',
        stateData: [],
        stateList: require('../assets/data/state_list.json')
      }
    },
    mounted () {
      this.getData(this.stateSelected)
    },
    methods: {
      getData(state) {
        console.log(state)
        this.stateData = require(`../assets/data/${state}_covid_test_daily_positive_rate.json`)
        this.fillData()
      },
      fillData () {
        this.datacollection = {
          labels: this.stateData.slice(12).map(x => x.date),
          datasets: [
            {
              label: 'Illinois covid testing daily positive rate',
              yAxisID: 'a',
              borderColor: 'rgba(255, 111, 111)',
              backgroundColor: 'rgba(255, 111, 111, 0.3)',
              data: this.stateData.slice(12).map(x => x.dailyPositiveCasePercentage)
            },
            {
              label: 'Number of test',
              yAxisID: 'b',
              borderColor: 'rgba(100, 111, 255)',
              backgroundColor: 'rgba(100, 111, 255, 0.3)',
              data: this.stateData.slice(12).map(x => x.dailyTest)
            }
          ]
        },
        this.options = {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              id: 'a',
              type: 'linear',
              position: 'left',
            }, {
              id: 'b',
              type: 'linear',
              position: 'right'
            }]
          }
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

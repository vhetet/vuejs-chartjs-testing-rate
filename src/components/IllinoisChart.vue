<template>
  <div class="hello">
    <line-chart :chart-data="datacollection" :options="options"></line-chart>
  </div>
</template>

<script>
import LineChart from './LineChart.js'
import data from '../assets/illinois_covid_test_daily_positive_rate.json'

  export default {
    components: {
      LineChart
    },
    data () {
      return {
        datacollection: {},
        options: {},
        data: data
      }
    },
    mounted () {
      this.fillData()
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: data.slice(12).map(x => x.date),
          datasets: [
            {
              label: 'Illinois covid testing daily positive rate',
              yAxisID: 'a',
              borderColor: 'rgba(255, 111, 111)',
              backgroundColor: 'rgba(255, 111, 111, 0.3)',
              data: data.slice(12).map(x => x.dailyPositiveCasePercentage)
            },
            {
              label: 'Number of test / 100',
              yAxisID: 'b',
              borderColor: 'rgba(100, 111, 255)',
              backgroundColor: 'rgba(100, 111, 255, 0.3)',
              data: data.slice(12).map(x => x.dailyTest)
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

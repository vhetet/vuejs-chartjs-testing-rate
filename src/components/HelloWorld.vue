<template>
  <div class="hello">
    <line-chart :chart-data="datacollection"></line-chart>
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
        data: data
      }
    },
    mounted () {
      this.fillData()
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: data.slice(8).map(x => x.date),
          datasets: [
            {
              label: 'Illinois covid testing daily positive rate',
              backgroundColor: '#f87979',
              data: data.slice(8).map(x => x.dailyPositiveCasePercentage)
            },
            {
              label: 'Number of test / 100',
              backgroundColor: 'green',
              data: data.slice(8).map(x => x.dailyTest / 100)
            }
          ]
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

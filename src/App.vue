<template>
  <div id="app">
    <PositivityRateChart/>
  </div>
</template>

<script>
import PositivityRateChart from './components/PositivityRateChart.vue'

export default {
  name: 'App',
  components: {
    PositivityRateChart
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

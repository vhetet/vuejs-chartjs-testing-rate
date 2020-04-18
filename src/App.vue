<template>
  <div id="app">
    <IllinoisChart msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import IllinoisChart from './components/IllinoisChart.vue'

export default {
  name: 'App',
  components: {
    IllinoisChart
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

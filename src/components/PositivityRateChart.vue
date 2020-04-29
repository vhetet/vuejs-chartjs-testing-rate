<template>
  <div class="hello">
    <p>
      After reading
      <a
        href="https://www.theatlantic.com/technology/archive/2020/04/us-coronavirus-outbreak-out-control-test-positivity-rate/610132/"
      >this article</a> in the Atlantic
      explaining why the positivity rate was a useful data. I looked for graphs that showed it's evolution but could not find any. There might be some, I just did not see it.
      But
      <a
        href="https://covidtracking.com/data/state/illinois#historical"
      >covidtracking.com</a> has this data so I made a graphs out of it
    </p>
    <select v-model="stateSelected" @change="getData(stateSelected)">
      <option v-for="state in stateList" :key="state">{{state}}</option>
    </select>
    <line-chart :chart-data="datacollection" :options="options"></line-chart>
  </div>
</template>

<script>
import LineChart from "./LineChart.js";
import axios from "axios";

export default {
  components: {
    LineChart
  },
  data() {
    return {
      datacollection: {},
      options: {},
      stateSelected: "us/us",
      stateData: [],
      stateList: require("../assets/data/state_list.json")
    };
  },
  mounted() {
    this.getData(this.stateSelected);
    this.stateList = this.stateList.sort();
  },
  methods: {
    getData(state) {
      axios
        .get(
          `https://raw.githubusercontent.com/vhetet/vuejs-testing-rate-data/master/data/${state}_covid_test_daily_positive_rate.json`
        )
        .then(res => {
          console.log(
            res.data.slice(res.data.length - 2, res.data.length - 1)[0]
          );
          this.stateData = res.data;
          this.fillData();
        });
    },
    fillData() {
      (this.datacollection = {
        labels: this.stateData.slice(12).map(x => x.date),
        datasets: [
          {
            label: "daily positive rate (in %)",
            yAxisID: "a",
            borderColor: "rgba(255, 111, 111)",
            backgroundColor: "rgba(255, 111, 111, 0.3)",
            data: this.stateData
              .slice(12)
              .map(x => x.dailyPositiveCasePercentage)
          },
          {
            label: "Number of test",
            yAxisID: "b",
            borderColor: "rgba(100, 111, 255)",
            backgroundColor: "rgba(100, 111, 255, 0)",
            data: this.stateData.slice(12).map(x => x.dailyTest)
          }
        ]
      }),
        (this.options = {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                id: "a",
                type: "linear",
                position: "left",
                ticks: {
                  max: 100,
                  min: 0
                }
              },
              {
                id: "b",
                type: "linear",
                position: "right",
                ticks: {
                  min: 0
                }
              }
            ]
          }
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

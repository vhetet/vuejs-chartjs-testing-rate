<template>
  <div class="hello">
    <p>
      After reading
      <a
        href="https://www.theatlantic.com/technology/archive/2020/04/us-coronavirus-outbreak-out-control-test-positivity-rate/610132/"
      >this article</a> in the Atlantic
      explaining why the positivity rate was a useful data. I looked for graphs that showed it's evolution but could not find any. There might be some, I just did not see it.
    </p>
    <p>Not all countries/states report their cases so some charts are empty or are missing some data points.</p>
    <p>
      I used
      <a href="https://covidtracking.com/data/state/illinois#historical">covidtracking.com</a> for the US states data and
      <a href="https://covid.ourworldindata.org/data">ourworldindata.org</a> for the countries data. To see how the data is stored checkout this
      <a
        href="https://github.com/vhetet/vuejs-testing-rate-data"
      >repo</a>.
      If you want to look at the code for the web app check this
      <a href="https://github.com/vhetet/vuejs-chartjs-testing-rate">repo</a>
    </p>

    <select v-model="worldSelected">
      <option value="us">US states</option>
      <option value="countries">World</option>
    </select>
    <select v-model="stateSelected" @change="getData()">
      <option
        v-for="state in stateList.filter(x => x.includes(`${worldSelected}/`)).map(x => x.slice(x.indexOf('/') + 1))"
        :key="state"
      >{{state}}</option>
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
      stateSelected: "us",
      worldSelected: "us",
      stateData: [],
      stateList: require("../assets/data/state_list.json")
    };
  },
  computed: {
    dataPath() {
      return `${this.worldSelected}/${this.stateSelected}`;
    }
  },
  mounted() {
    this.getData(this.stateSelected);
    this.stateList = this.stateList.sort();
  },
  methods: {
    getData() {
      axios
        .get(
          `https://raw.githubusercontent.com/vhetet/vuejs-testing-rate-data/master/data/${this.dataPath}_covid_test_daily_positive_rate.json`
        )
        .then(res => {
          this.stateData = res.data.slice(
            res.data.findIndex(x => x.dailyTest > 10)
          );
          this.fillData();
        });
    },
    fillData() {
      (this.datacollection = {
        labels: this.stateData.map(x => x.date),
        datasets: [
          {
            label: "daily positive rate (in %)",
            yAxisID: "a",
            borderColor: "rgba(255, 111, 111)",
            backgroundColor: "rgba(255, 111, 111, 0.3)",
            data: this.stateData.map(x => x.dailyPositiveCasePercentage)
          },
          {
            label: "Number of test",
            yAxisID: "b",
            borderColor: "rgba(100, 111, 255)",
            backgroundColor: "rgba(100, 111, 255, 0)",
            data: this.stateData.map(x => x.dailyTest)
          },
          {
            label: "Number of case",
            yAxisID: "b",
            borderColor: "rgba(63, 191, 63)",
            backgroundColor: "rgba(63, 191, 63, 0)",
            data: this.stateData.map(x => x.newDailyCase)
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

<style scoped>
select {
  margin: 1em;
}
</style>

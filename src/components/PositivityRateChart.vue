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
            <a
                href="https://covidtracking.com/data/state/illinois#historical"
            >covidtracking.com</a> for the US states data and
            <a
                href="https://covid.ourworldindata.org/data"
            >ourworldindata.org</a> for the countries data. To see how the data is stored checkout this
            <a
                href="https://github.com/vhetet/vuejs-testing-rate-data"
            >repo</a>.
            If you want to look at the code for the web app check this
            <a
                href="https://github.com/vhetet/vuejs-chartjs-testing-rate"
            >repo</a>
        </p>

        <select v-model="worldSelected">
            <option value="us">US states</option>
            <option value="countries">World</option>
        </select>
        <select v-model="stateSelected" @change="getData()">
            <option
                v-for="state in regionsName.filter(x => x.includes(`${worldSelected}/`))"
                :key="state"
                :value="state"
            >{{state.slice(state.indexOf('/') + 1)}}</option>
        </select>
        <p v-if="dataCollection.datasets[2].data">Number of cases: {{ totalCases | formatNumber }}</p>
        <p
            v-if="regionData[stateSelected]"
        >Population: {{ regionData[stateSelected] | formatNumber }}</p>
        <p
            v-if="dataCollection.datasets[2].data && regionData[stateSelected]"
        >Incidence rate: {{ totalCases/regionData[stateSelected] | formatPercentage }}</p>
        <line-chart :chart-data="dataCollection" :options="options"></line-chart>
        <select v-model="chartOption" @change="fillData()">
            <option value="7">7 days</option>
            <option value="30">30 days</option>
            <option value="120">120 days</option>
        </select>
    </div>
</template>

<script>
import LineChart from "./LineChart.js";
import axios from "axios";
import numeral from "numeral";

export default {
    components: {
        LineChart
    },
    data() {
        return {
            dataCollection: {},
            options: {},
            stateSelected: "us/us",
            worldSelected: "us",
            chartOption: '30',
            regionData: require("../assets/data/state_list.json"),
            cleanedData: []
        };
    },
    computed: {
        dataPath() {
            return `${this.stateSelected}`;
        },
        totalCases() {
            return this.$store.state.chartData.map(x => x.newDailyCase).reduce(
                (a, b) => Number(a) + Number(b)
            );
        },
        regionsName() {
            return Object.keys(this.regionData).sort();
        }
    },
    mounted() {
        this.getData(this.stateSelected);
    },
    methods: {
        getData() {
            axios
                .get(
                    `https://raw.githubusercontent.com/vhetet/vuejs-testing-rate-data/valid-data/data/${this.dataPath}_covid_test_daily_positive_rate.json`
                )
                .then(res => {
                    this.$store.commit("changeChartData", res.data);
                    this.fillData();
                });
        },
        fillData() {
            this.cleanedData = this.$store.state.chartData.slice(this.$store.state.chartData.length - this.chartOption);
            (this.dataCollection = {
                labels: this.cleanedData.map(x => x.date),
                datasets: [
                    {
                        label: "daily positive rate (in %)",
                        yAxisID: "a",
                        borderColor: "rgba(255, 111, 111)",
                        backgroundColor: "rgba(255, 111, 111, 0.3)",
                        data: this.cleanedData.map(
                            x => x.dailyPositiveCasePercentage
                        )
                    },
                    {
                        label: "Number of test",
                        yAxisID: "b",
                        borderColor: "rgba(100, 111, 255)",
                        backgroundColor: "rgba(100, 111, 255, 0)",
                        data: this.cleanedData.map(x => x.dailyTest)
                    },
                    {
                        label: "Number of case",
                        yAxisID: "b",
                        borderColor: "rgba(63, 191, 63)",
                        backgroundColor: "rgba(63, 191, 63, 0)",
                        data: this.cleanedData.map(
                            x => x.newDailyCase
                        )
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
    },
    filters: {
        formatNumber: function(value) {
            if (!value) return "";
            return numeral(value).format("0,0");
        },
        formatPercentage: function(value) {
            if (!value) return "";
            return numeral(value).format("0.000%");
        }
    }
};
</script>

<style scoped>
select {
    margin: 1em;
}
p {
    font-size: 15px;
}
</style>

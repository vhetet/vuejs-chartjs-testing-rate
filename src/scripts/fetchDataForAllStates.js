const stateList = require( '../assets/data/state_list.json')
const fetchData = require('./fetchData.js')


stateList.map(x => fetchData(x))
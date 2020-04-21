const stateList = require( '../assets/data/state_list.json')
const fetchData = require('./fetchData.js')
const fetchUsTotalData = require('./fetchUsTotalData.js')

// stateList.map(x => fetchData(x))
fetchUsTotalData()
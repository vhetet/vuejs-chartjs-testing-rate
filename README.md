# vue-chartjs-testing-rate-graph

## TODO

* add details in the readme
* create a dashboard? 
* clean the data?
* improve the chart?
* clean project and remove any unused dependency
* enable es6 for the scripts so that I can replace the require by imports
* create a batch job to update the data daily
* optimize storage of the json files. Make sure it's not loading all of them imn the first place. And check the bundle size
* Hide the data that isn't usable
* improve the contry/state selection selection
* do more charts?
* add tests!!! (the focus was to build something but if I expand this project I will unit test it)
* investigate the other api available to see if I can find better data

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Run the data fetching script

I order to get the data there is a scraping script. It get the data from covidtacking.com and get the positive testing rate for all american state and territories. This script can be run daily to get new datas but ideally I would use the API to just add the new data instead of refetching the all the historic data. 

To fetch the data run `node src/scripts/fetchDataForAllStates.js` in the home directory. It will fetch the data and store in in json files in `src/assets/data`

The vue.js + chart.js app use this data to render the graphs

Notes: There is an API but it does not provide the data I wanted as far as I know. So Ideally I will find a way to use that instead of scraping the site but for now that's my solution.

## deploy to heroku

follow [those steps](https://cli.vuejs.org/guide/deployment.html#heroku)

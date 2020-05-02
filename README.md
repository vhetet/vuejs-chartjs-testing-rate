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

The data is stored on this [repo](https://github.com/vhetet/vuejs-testing-rate-data) that udpdates it daily. Not all countries/states report their cases so some charts are empty or are missing some data points.

## deploy to heroku

follow [those steps](https://cli.vuejs.org/guide/deployment.html#heroku)

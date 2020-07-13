# vue-chartjs-testing-rate-graph

The app is currently deployed [here](https://vue-chartjs-experimentation.herokuapp.com/)

## TODO

* add details in the readme
* create a dashboard? ==> in the data repo add a step to the daily script to generate a summary/table of the data. This could be use to render a table to rank countries and put link in there so that there is another way than the dropdown to select countries
* improve the chart? ==> allow selection/deselection of the data you want to see, limit the chart to a certain period
* clean project and remove any unused dependency. Check the bundle size/prod build
* enable es6 for the scripts so that I can replace the require by imports
* improve the contry/state selection selection
* do more charts?
* add tests!!! (the focus was to build something but if I expand this project I will unit test it)
* ~~investigate the other api available to see if I can find better data~~ ==> the data from `our world in data` is good
* ~~add the incidence rate (using this [json](https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-population.json))~~
* ~~use vuex to manage data and store the different search.~~ Use the store data to render a table with the data from the contry looked up. The table should be sortable (I could use buefy for that)

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

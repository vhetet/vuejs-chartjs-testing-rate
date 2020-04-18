
const cheerio = require("cheerio");
const request = require('request');
const fs = require('fs');

var myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);

if(myArgs.length === 0) {
    process.exit(1)
}

let state = myArgs[0]
const siteUrl = `https://covidtracking.com/data/state/${state}`;

request({
    method: 'GET',
    url: siteUrl
}, (err, res, body) => {

    if (err) return console.error(err);

    let $ = cheerio.load(body);

    let dailyTest = [];

    $('tbody.state-history-table tr td:nth-child(3)').each(function (i, e) {
        dailyTest[i] = parseFloat($(this).text().replace(/,/g, ''));
    });
    dailyTest = dailyTest.reverse()
    dailyTest = dailyTest.slice(1)

    // console.log(dailyTest);


    let dailyPositiveTest = [];

    $('tbody.state-history-table tr td:nth-child(4)').each(function (i, e) {
        dailyPositiveTest[i] = parseFloat($(this).text().replace(/,/g, ''));
    });
    dailyPositiveTest = dailyPositiveTest.reverse()
    dailyPositiveTest = dailyPositiveTest.slice(1).map((curr, i) => curr - dailyPositiveTest[i])

    // console.log(dailyPositiveTest);

    let dates = [];

    $('tbody.state-history-table tr td:nth-child(1)').each(function (i, e) {
        dates[i] = $(this).text();
    });
    dates = dates.reverse()
    dates = dates.slice(1)

    // console.log(dates);

    final = dailyTest.map((curr, i) => {return {dailyTest: curr, newDailyCase: dailyPositiveTest[i], dailyPositiveCasePercentage: (dailyPositiveTest[i]/curr) * 100}})
    final.map((f, i) => f['date'] = dates[i])

    console.log(final)
    fs.writeFileSync(`${state}_covid_test_daily_positive_rate.json`, JSON.stringify(final))
});
// Create a new router
const express = require("express")
const router = express.Router()
const request = require('request')

// weather forecast router
router.get('/weather', function(req, res, next){
    res.render('weather.ejs', {weatherForecast: null, error: null})
})

// london forecast router
router.get('/londonnow', function(req, res, next){
    let apiKey = 'b6a0b706d8de8df8825661aa5fb18214'
    let city = 'london'
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    
    // request(url, function(err, response, body){
    //     if(err){
    //         next(err)
    //     } else {
    //         //res.send(body)
    //         var weather = JSON.parse(body)
    //         var wmsg = 'It is ' + weather.main.temp + ' degrees in ' + weather.name + '! <br> The humidity now is: ' + weather.main.humidity;
    //         res.send(wmsg)
    //     }
    // })
    request(url, (err, response, body) => {
        if(err || response.statusCode !== 200){
            return res.send("Data not available")
        }
        const weather = JSON.parse(body)
        if(weather !== undefined && weather.main !== undefined){
            const wmsg = 'It is ' + weather.main.temp + ' degrees in ' + weather.name + '! <br> The humidity now is: ' + weather.main.humidity;
            res.send(wmsg);
        } else {
            res.send("Data not found")
        }
    })
})

// forecast router for other cities
router.post('/weather', function(req, res, next){

    let apiKey = 'b6a0b706d8de8df8825661aa5fb18214'
    let city = req.body.city_search
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

    request(url, (err, response, body) => {
        if (err || response.statusCode !== 200) {
            return res.render('weather.ejs', { weatherForecast: null, error: "Unable to retrieve weather data. Please try again." });
        }

        const weather = JSON.parse(body);
        if (weather !== undefined && weather.main !== undefined) {
            const time = new Date(Date.now() + (weather.timezone * 1000)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            const weatherForecast = {
                name: weather.name,
                temp: weather.main.temp,
                humidity: weather.main.humidity,
                wind: weather.wind.speed,
                timezoneDisplay: time
            };
            res.render('weather.ejs', { weatherForecast, error: null });
        } else {
            res.render('weather.ejs', { weatherForecast: null, error: "No data found for the specified city." });
        }
    });
});

        // if(err){ 
        //     next(err)
        // } else {
        //     var weather = JSON.parse(body)
        //     if(weather.cod === 200){
        //         const weatherForecast = { // getting other forecast information for the city
        //             name: weather.name,
        //             temp: weather.main.temp,
        //             humidity: weather.main.humidity,
        //             wind: weather.wind.speed,
        //             timezone: weather.timezone
        //         };

        //         // getting the local time 
        //         const time = new Date(Date.now() + (weatherForecast.timezone * 1000));
        //         const timeDisplay = time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', second: '2-digit'})
        //         weatherForecast.timezoneDisplay = timeDisplay

//                 res.render('weather.ejs', {weatherForecast, error: null})

//             } else {
//                 res.render('weather.ejs', {weatherForecast: null, error: 'Enter a valid city name please'})
//             }
//         }
//     })
// })

// Export the router object so index.js can access it
module.exports = router
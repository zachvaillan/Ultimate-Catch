const axios = require('axios');
const express = require("express");
const router = express.Router();
const Region = require("../../models/Region")

// ObjectID = require('mongodb').ObjectID
router.get("/test", (req, res) => res.json({ msg: "This is the posts route" }));

router.get("/", (req, res) => {
    Region
        .find()
        .then(regions => {
            // change all regions weather and return
            for(let i = 0; i<regions.length;i++){
                //get api call 
                axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${regions[i].lat}&lon=${regions[i].lng}&appid=${process.env.WEATHER_API_KEY}`)
                .then(weather => {console.log(weather.data);regions[i].weather = weather.data.weather[0].description; regions[i].save()})
                .catch(err => console.log(err))
            }

            res.json(regions)
        })
        .catch(err => res.status(400).json(err));
});


module.exports = router;

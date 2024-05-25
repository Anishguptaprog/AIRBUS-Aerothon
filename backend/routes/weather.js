var express = require('express');
var router = express.Router();
var weather_data = require("../utils/weather_data.json");

router.get('/:airport_id', function (req, res, next) {
  let airport_id = req.params.airport_id;
  let weather_data_for_airport = weather_data[airport_id];
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json(weather_data_for_airport);
});

module.exports = router;

var express = require('express');
var router = express.Router();
var sample_airports = require("../utils/sample_airports.json");

router.get('/', function (req, res, next) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json(sample_airports);
});

module.exports = router;

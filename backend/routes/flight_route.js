var express = require('express');
var router = express.Router();
var routes_with_final_weights = require("../utils/routes_with_final_weights.json");
var shortest_path_util = require("../utils/get_shortest_path");

router.get('/', function (req, res, next) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json(routes_with_final_weights);
});

router.get("/get_shortest_route/:source_airport_id/to/:destination_airport_id", function (req, res, next) {
  let source_airport_id = req.params.source_airport_id;
  let destination_airport_id = req.params.destination_airport_id;
  let shortest_path = shortest_path_util.get_shortest_path(source_airport_id, destination_airport_id);
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json(shortest_path);
});

module.exports = router;

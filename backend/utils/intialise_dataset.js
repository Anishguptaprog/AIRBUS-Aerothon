const fs = require('fs');
const csv = require('csv-parser');

function storeJSONFile(jsonData, jsonFilePath) {
  const jsonString = JSON.stringify(jsonData, null, 2);
  fs.writeFile(jsonFilePath, jsonString, (err) => {
    if (err) {
      console.error('Error writing JSON to file:', err);
    } else {
      console.log('JSON data has been written to', jsonFilePath);
    }
  });
}

function csvToJson(csvFilePath, jsonFileName, jsonFormatter) {
  let jsonData = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      jsonData.push(row);
    })
    .on('end', () => {
      jsonData = jsonFormatter(jsonData);
      storeJSONFile(jsonData, jsonFileName);
    })
    .on('error', (error) => {
      console.log("Error....")
    });
}

function airportsJSONFormatter(rawAirportsJSON) {
  let airportsJSON = {};
  for (let airport of rawAirportsJSON) {
    airportsJSON[`${airport["ID"]}`] = {
      Name: airport["Label"],
      Latitude: airport["Latitude"],
      Longitude: airport["Longitude"],
    };
  }
  return airportsJSON;
}
function reoutesJSONFormatter(rawRoutesJSON) {
  let routesJSON = [];
  for (let route of rawRoutesJSON) {
    routesJSON.push({
      "Airline ID": route["Airline ID"],
      "Source": route["Departure"],
      "Destination": route["Destination"],
    });
  }
  return routesJSON;
}

const airportsCSVFilePath = './Full_Merge_of_All_Unique_Airports.csv';
const routesCSVFilePath = './Full_Merge_of_All_Unique_Routes.csv';
const airportsJSONFilePath = "airports.json";
const routesJSONFilePath = "routes.json";

csvToJson(airportsCSVFilePath, airportsJSONFilePath, airportsJSONFormatter);
csvToJson(routesCSVFilePath, routesJSONFilePath, reoutesJSONFormatter);
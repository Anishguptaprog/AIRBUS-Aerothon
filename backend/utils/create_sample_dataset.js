const fs = require("fs");

function openJsonFile(filePath) {
  try {
    // Read the JSON file synchronously
    const jsonData = fs.readFileSync(filePath, 'utf8');
    // Parse the JSON data into a JavaScript object
    const jsonObject = JSON.parse(jsonData);
    return jsonObject;
  } catch (error) {
    // Handle any errors that occur during reading or parsing
    console.error('Error reading JSON file:', error);
    return null;
  }
}

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

const airportsJSONFilePath = "airports.json";
const routesJSONFilePath = "routes.json";
const sampleAirportsJSONFilePath = "sample_airports.json";
const sampleRoutesJSONFilePath = "sample_routes.json";

let airportsJSON = openJsonFile(airportsJSONFilePath)
let routesJSON = openJsonFile(routesJSONFilePath)

const airportEntries = Object.entries(airportsJSON);
const starting600Entries = airportEntries.slice(0, 600);
const sampleAirportsJSON = Object.fromEntries(starting600Entries);

const sampleRoutesJSON = [];
for (route of routesJSON) {
  let source = route["Source"];
  let destination = route["Destination"];
  if (sampleAirportsJSON[source] || sampleAirportsJSON[destination]) {
    sampleRoutesJSON.push(route);
  }
}

storeJSONFile(sampleAirportsJSON, sampleAiroportJSONFilePath);
storeJSONFile(sampleRoutesJSON, sampleRoutesJSONFilePath);
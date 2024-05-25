const fs = require('fs');
const axios = require('axios');

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


function createWeatherApiForAirport(airport_latitude, airport_longitude) {
  const weatherAPI = `https://api.open-meteo.com/v1/forecast?latitude=${airport_latitude}&longitude=${airport_longitude}&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,cloud_cover,visibility,wind_speed_10m,wind_direction_10m,wind_gusts_10m&forecast_days=1`;
  return weatherAPI;
}

async function fetchWeatherDataAndStore(sampleAirportsJSON, weatherDataFilePath, createWeatherApiForAirport) {
  let weatherDataForAirports = {};
  for (let [airportID, airport] of Object.entries(sampleAirportsJSON)) {
    let airport_latitude = airport["Latitude"];
    let airport_longitude = airport["Longitude"];
    let weatherApiForAirport = createWeatherApiForAirport(airport_latitude, airport_longitude);
    let response = await axios.get(weatherApiForAirport);
    weatherDataForAirports[`${airportID}`] = response.data;
    console.log("Fetched Weather Data For Airport: ", airportID);
  }
  storeJSONFile(weatherDataForAirports, weatherDataFilePath);
}

const sampleAirportsJSONFilePath = "sample_airports.json";
const sampleAirportsJSON = openJsonFile(sampleAirportsJSONFilePath)
const weatherDataFilePath = './weather_data.json';

fetchWeatherDataAndStore(sampleAirportsJSON, weatherDataFilePath, createWeatherApiForAirport);

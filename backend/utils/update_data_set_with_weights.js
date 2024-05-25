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
  // Write JSON string to file
  fs.writeFile(jsonFilePath, jsonString, (err) => {
    if (err) {
      console.error('Error writing JSON to file:', err);
    } else {
      console.log('JSON data has been written to', jsonFilePath);
    }
  });
}

function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;  // Convert degrees to radians
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
}
function calculateWeatherWeight(weatherData1, weatherData2) {
  // Define weights for weather parameters (adjust based on importance)
  const precipitationWeight = 0.4;
  const cloudCoverWeight = 0.3;
  const visibilityWeight = 0.2;
  const windSpeedWeight = 0.1;

  // Initialize sums for each parameter
  let sumPrecipitation1 = 0,
    sumCloudCover1 = 0,
    sumVisibility1 = 0,
    sumWindSpeed1 = 0;
  let sumPrecipitation2 = 0,
    sumCloudCover2 = 0,
    sumVisibility2 = 0,
    sumWindSpeed2 = 0;

  // Iterate over hourly data for airport 1
  for (const hourData of Object.values(weatherData1.hourly)) {
    sumPrecipitation1 += hourData.precipitation_probability || 0; // Handle NaN or undefined values
    sumCloudCover1 += hourData.cloud_cover || 0;
    sumVisibility1 += hourData.visibility || 0;
    sumWindSpeed1 += hourData.wind_speed_10m || 0;
  }

  // Iterate over hourly data for airport 2
  for (const hourData of Object.values(weatherData2.hourly)) {
    sumPrecipitation2 += hourData.precipitation_probability || 0; // Handle NaN or undefined values
    sumCloudCover2 += hourData.cloud_cover || 0;
    sumVisibility2 += hourData.visibility || 0;
    sumWindSpeed2 += hourData.wind_speed_10m || 0;
  }

  // Calculate average values for each parameter
  const count = Object.keys(weatherData1.hourly).length;
  const normalizedPrecipitation1 = sumPrecipitation1 / (100 * count);
  const normalizedCloudCover1 = sumCloudCover1 / (100 * count);
  const normalizedVisibility1 = count ? 1 - (sumVisibility1 / (24140 * count)) : 0; // Handle division by zero
  const normalizedWindSpeed1 = sumWindSpeed1 / (36 * count); // Assuming maximum wind speed of 36 km/h

  const normalizedPrecipitation2 = sumPrecipitation2 / (100 * count);
  const normalizedCloudCover2 = sumCloudCover2 / (100 * count);
  const normalizedVisibility2 = count ? 1 - (sumVisibility2 / (24140 * count)) : 0; // Handle division by zero
  const normalizedWindSpeed2 = sumWindSpeed2 / (36 * count); // Assuming maximum wind speed of 36 km/h

  // Calculate weighted sum of weather parameters for each airport
  const weatherWeight1 = (precipitationWeight * normalizedPrecipitation1) +
    (cloudCoverWeight * normalizedCloudCover1) +
    (visibilityWeight * normalizedVisibility1) +
    (windSpeedWeight * normalizedWindSpeed1);

  const weatherWeight2 = (precipitationWeight * normalizedPrecipitation2) +
    (cloudCoverWeight * normalizedCloudCover2) +
    (visibilityWeight * normalizedVisibility2) +
    (windSpeedWeight * normalizedWindSpeed2);

  // Combine weather weights for both airports
  const combinedWeatherWeight = (weatherWeight1 + weatherWeight2) / 2; // Taking the average

  return combinedWeatherWeight;
}

// Function to calculate combined weight considering both Haversian distance and weather conditions
function calculateCombinedWeight(haversianDist, weatherWeight) {
  // Define weightage ratio between Haversian distance and weather conditions
  const haversianWeightRatio = 0.6;
  const weatherWeightRatio = 0.4;

  // Calculate combined weight
  const combinedWeight = (haversianWeightRatio * haversianDist) + (weatherWeightRatio * weatherWeight);
  return combinedWeight;
}

const sampleAirportsJSONFilePath = "sample_airports.json";
const sampleRoutesJSONFilePath = "sample_routes.json";
const weatherDataFilePath = './weather_data.json';
const routesWithFinalWeightsFilePath = './routes_with_final_weights.json';

let airportsJSON = openJsonFile(sampleAirportsJSONFilePath)
let routesJSON = openJsonFile(sampleRoutesJSONFilePath)
let weatherJSON = openJsonFile(weatherDataFilePath)

let routesWithFinalWeights = []
for (let route of routesJSON) {
  try {
    let source = route["Source"];
    let destination = route["Destination"];
    let source_latitude = airportsJSON[source]["Latitude"];
    let source_longitude = airportsJSON[source]["Longitude"];
    let destination_latitude = airportsJSON[destination]["Latitude"];
    let destination_longitude = airportsJSON[destination]["Longitude"];
    let haversineDistance = calculateHaversineDistance(source_latitude, source_longitude, destination_latitude,
      destination_longitude);
    let weatherWeight = calculateWeatherWeight(weatherJSON[source], weatherJSON[destination]);
    let routeWeight = calculateCombinedWeight(haversineDistance, weatherWeight);
    let routeWithFinalWeight = {
      source,
      destination,
      source_latitude,
      source_longitude,
      destination_latitude,
      destination_longitude,
      haversineDistance,
      weatherWeight,
      routeWeight,
    };
    routesWithFinalWeights.push(routeWithFinalWeight);
  }
  catch (e) {
    console.log("Route Skipped As Data For Any One Of The Airport Is Currently Not Under Consideration")
  }
}

storeJSONFile(routesWithFinalWeights, routesWithFinalWeightsFilePath);
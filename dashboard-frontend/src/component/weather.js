// import React, { useState, useEffect } from 'react';

// const Weather = ({ waypoints }) => {
//   const [weatherData, setWeatherData] = useState([]);

//   useEffect(() => {
//     const fetchWeatherData = async () => {
//       const weatherPromises = waypoints.map(async (point) => {
//         const response = await fetch(
//           `https://api.open-meteo.com/v1/forecast?latitude=${point.lat}&longitude=${point.lon}&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,cloud_cover,visibility,wind_speed_10m,wind_direction_10m,wind_gusts_10m&forecast_days=1`
//         );
//         const data = await response.json();
//         return {
//           lat: point.lat,
//           lon: point.lon,
//           weather: data.hourly
//         };
//       });

//       const results = await Promise.all(weatherPromises);
//       setWeatherData(results);
//     };

//     fetchWeatherData();
//   }, [waypoints]);

//   return (
//     <div className="weather">
//       <h3>Current Weather at Waypoints</h3>
//       <ul>
//         {weatherData.map((data, index) => (
//           <li key={index}>
//             <strong>Lat:</strong> {data.lat}, <strong>Lon:</strong> {data.lon}
//             <ul>
//               <li><strong>Temperature:</strong> {data.weather.temperature_2m[0]}°C</li>
//               <li><strong>Humidity:</strong> {data.weather.relative_humidity_2m[0]}%</li>
//               <li><strong>Precipitation Probability:</strong> {data.weather.precipitation_probability[0]}%</li>
//               <li><strong>Cloud Cover:</strong> {data.weather.cloud_cover[0]}%</li>
//               <li><strong>Visibility:</strong> {data.weather.visibility[0]} meters</li>
//               <li><strong>Wind Speed:</strong> {data.weather.wind_speed_10m[0]} m/s</li>
//               <li><strong>Wind Direction:</strong> {data.weather.wind_direction_10m[0]}°</li>
//               <li><strong>Wind Gusts:</strong> {data.weather.wind_gusts_10m[0]} m/s</li>
//             </ul>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Weather;
// src/components/Weather.js
// src/components/Weather.js
// src/components/Weather.js
import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Weather = ({ departureAirport,arrivalAirport,departureAirports,arrivalAirports }) => {
  // console.log(waypoints)
  const [weatherData, setWeatherData] = useState([]);
  const weatherChartRef = useRef(null);
  const [safeForFlight, setSafeForFlight] = useState(true);
  useEffect(() => {
    const fetchWeatherData = async () => {
      // console.log(departureAirports)
            if (departureAirport && arrivalAirport) {
        const waypoints = [
          { lat: departureAirports[departureAirport].Latitude, lon: departureAirports[departureAirport].Longitude },
          { lat: arrivalAirports[arrivalAirport].Latitude, lon: arrivalAirports[arrivalAirport].Longitude }
        ];
      const weatherPromises = waypoints.map(async (point) => {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${point.lat}&longitude=${point.lon}&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,cloud_cover,visibility,wind_speed_10m,wind_direction_10m,wind_gusts_10m&forecast_days=1`
        );
        const data = await response.json();
        return {
          lat: point.lat,
          lon: point.lon,
          weather: data.hourly
        };
      });

      const results = await Promise.all(weatherPromises);
      setWeatherData(results);
    };
  }
    fetchWeatherData();
  }, [departureAirport, arrivalAirport, departureAirports, arrivalAirports]);

  useEffect(() => {
    if (weatherData.length > 0) {
      // Destroy existing chart
      if (weatherChartRef.current) {
        weatherChartRef.current.destroy();
      }

      // Process and display new chart
      const weatherChart = new Chart(document.getElementById('weather-chart'), {
        type: 'line',
        data: {
          labels: weatherData[0].weather.temperature_2m.map((_, index) => index + 1),
          datasets: [
            {
              label: 'Temperature (°C)',
              data: weatherData[0].weather.temperature_2m,
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 2,
              yAxisID: 'temperature-axis',
            },
            {
              label: 'Humidity (%)',
              data: weatherData[0].weather.relative_humidity_2m,
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 2,
              yAxisID: 'humidity-axis',
            },
            {
              label: 'Precipitation Probability (%)',
              data: weatherData[0].weather.precipitation_probability,
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 2,
              yAxisID: 'precipitation-axis',
            },
            {
              label: 'Visibility (meters)',
              data: weatherData[0].weather.visibility,
              borderColor: 'rgba(255, 205, 86, 1)',
              borderWidth: 2,
              yAxisID: 'visibility-axis',
            },
            {
              label: 'Wind Speed (m/s)',
              data: weatherData[0].weather.wind_speed_10m,
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 2,
              yAxisID: 'wind-speed-axis',
            },
            {
              label: 'Wind Gusts (m/s)',
              data: weatherData[0].weather.wind_gusts_10m,
              borderColor: 'rgba(255, 159, 64, 1)',
              borderWidth: 2,
              yAxisID: 'wind-gusts-axis',
            },
          ],
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: 'Time (hours)',
                color: 'black',
              }
            },
            y: {
              title: {
                display: true,
                text: 'Value',
                color: 'black',
              },
              ticks: {
                beginAtZero: true,
              }
            },
            temperatureAxis: {
              type: 'linear',
              position: 'left',
            },
            humidityAxis: {
              type: 'linear',
              position: 'right',
            },
            precipitationAxis: {
              type: 'linear',
              position: 'left',
            },
            visibilityAxis: {
              type: 'linear',
              position: 'right',
            },
            windSpeedAxis: {
              type: 'linear',
              position: 'left',
            },
            windGustsAxis: {
              type: 'linear',
              position: 'right',
            },
          },
        },
      });

      // Store chart instance in ref
      weatherChartRef.current = weatherChart;
      const isSafe = checkWeatherConditions(weatherData[0].weather);
      setSafeForFlight(isSafe);
    }
  }, [weatherData]);
  const checkWeatherConditions = (weather) => {
    // Define thresholds or criteria for safe flight conditions
    const temperatureThreshold = 50; // Example threshold in Celsius
    const windSpeedThreshold = 20; // Example threshold in m/s
    // Add more thresholds for humidity, visibility, etc.

    // Check if conditions meet safety criteria
    const isSafeTemperature = weather.temperature_2m.every((temp) => temp >= temperatureThreshold);
    const isSafeWindSpeed = weather.wind_speed_10m.every((speed) => speed <= windSpeedThreshold);
    // Add more checks for humidity, visibility, etc.

    return isSafeTemperature && isSafeWindSpeed; // Return true if all conditions are met
  };

//   const SafeForFlight = ({ isSafe }) => {
//     return (
//       <div className={`safe-for-flight ${isSafe ? 'safe' : 'unsafe'}`}>
//         {isSafe ? 'Flight is safe' : 'Flight is not safe'}
//       </div>
//     );
//   };
  
  
  return (
    
    <div className="weather">
        <div className="flight-status">
        {safeForFlight ? (
          <p>The weather conditions along the route are safe for flight.</p>
        ) : (
          <p>The weather conditions along the route are not safe for flight.</p>
        )}
      </div>
      <h3>Weather Data</h3>
      <div className="chart-container">
        <canvas id="weather-chart"></canvas>
      </div>
      
    </div>
  );
};
export default Weather;

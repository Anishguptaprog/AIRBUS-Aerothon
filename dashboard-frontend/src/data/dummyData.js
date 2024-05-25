export const alerts = [
  { id: 1, message: 'Severe weather warning: Thunderstorms ahead', type: 'warning' },
  { id: 2, message: 'Navigation system check: All systems operational', type: 'info' },
  { id: 3, message: 'Altitude deviation detected', type: 'critical' },
];

export const flightInfo = [
  { flightNumber: 'AA123', airline: 'American Airlines', departure: 'JFK', arrival: 'LAX', status: 'On Time', altitude: '35,000 ft', speed: '550 mph' },
  { flightNumber: 'BA456', airline: 'British Airways', departure: 'LHR', arrival: 'SFO', status: 'Delayed', altitude: '36,000 ft', speed: '560 mph' },
  { flightNumber: 'DL789', airline: 'Delta Airlines', departure: 'ATL', arrival: 'ORD', status: 'On Time', altitude: '34,000 ft', speed: '540 mph' },
  { flightNumber: 'UA101', airline: 'United Airlines', departure: 'ORD', arrival: 'DEN', status: 'On Time', altitude: '33,000 ft', speed: '530 mph' },
  { flightNumber: 'SW202', airline: 'Southwest Airlines', departure: 'LAX', arrival: 'LAS', status: 'On Time', altitude: '32,000 ft', speed: '520 mph' },
  { flightNumber: 'AA303', airline: 'American Airlines', departure: 'DFW', arrival: 'MIA', status: 'On Time', altitude: '31,000 ft', speed: '510 mph' },
  { flightNumber: 'BA404', airline: 'British Airways', departure: 'LGW', arrival: 'JFK', status: 'Delayed', altitude: '30,000 ft', speed: '500 mph' },
  { flightNumber: 'DL505', airline: 'Delta Airlines', departure: 'SEA', arrival: 'BOS', status: 'On Time', altitude: '29,000 ft', speed: '490 mph' },
  { flightNumber: 'UA606', airline: 'United Airlines', departure: 'MIA', arrival: 'ORD', status: 'On Time', altitude: '28,000 ft', speed: '480 mph' },
  { flightNumber: 'SW707', airline: 'Southwest Airlines', departure: 'BOS', arrival: 'LAX', status: 'On Time', altitude: '27,000 ft', speed: '470 mph' },
];

export const routes = [
  {
    id: 1,
    flightNumber: 'AA123',
    departure: 'JFK',
    arrival: 'LAX',
    waypoints: [
      { lat: 40.6413, lon: -73.7781 },
      { lat: 41.0, lon: -75.0 },
      { lat: 39.0, lon: -100.0 },
      { lat: 34.0522, lon: -118.2437 },
    ],
    risks: ['Thunderstorms'],
  },
  {
    id: 2,
    flightNumber: 'BA456',
    departure: 'LHR',
    arrival: 'SFO',
    waypoints: [
      { lat: 51.4700, lon: -0.4543 },
      { lat: 50.0, lon: -30.0 },
      { lat: 45.0, lon: -60.0 },
      { lat: 37.7749, lon: -122.4194 },
    ],
    risks: ['Turbulence'],
  },
  {
    id: 3,
    flightNumber: 'DL789',
    departure: 'ATL',
    arrival: 'ORD',
    waypoints: [
      { lat: 33.6407, lon: -84.4277 },
      { lat: 36.0, lon: -86.0 },
      { lat: 41.9742, lon: -87.9073 },
    ],
    risks: ['Heavy Rain'],
  },
  {
    id: 4,
    flightNumber: 'UA101',
    departure: 'ORD',
    arrival: 'DEN',
    waypoints: [
      { lat: 41.9742, lon: -87.9073 },
      { lat: 39.0, lon: -95.0 },
      { lat: 39.8561, lon: -104.6737 },
    ],
    risks: ['Snow'],
  },
  {
    id: 5,
    flightNumber: 'SW202',
    departure: 'LAX',
    arrival: 'LAS',
    waypoints: [
      { lat: 33.9416, lon: -118.4085 },
      { lat: 35.0, lon: -115.0 }, 
      { lat: 36.084, lon: -115.1537 },
    ],
    risks: ['Fog'],
  },
  {
    id: 6,
    flightNumber: 'AA303',
    departure: 'DFW',
    arrival: 'MIA',
    waypoints: [
      { lat: 32.8998, lon: -97.0403 },
      { lat: 30.0, lon: -90.0 },
      { lat: 25.7959, lon: -80.2870 },
    ],
    risks: ['High Winds'],
  },
  {
    id: 7,
    flightNumber: 'BA404',
    departure: 'LGW',
    arrival: 'JFK',
    waypoints: [
      { lat: 51.1537, lon: -0.1821 },
      { lat: 50.0, lon: -30.0 },
      { lat: 45.0, lon: -60.0 },
      { lat: 40.6413, lon: -73.7781 },
    ],
    risks: ['Turbulence'],
  },
  {
    id: 8,
    flightNumber: 'DL505',
    departure: 'SEA',
    arrival: 'BOS',
    waypoints: [
      { lat: 47.4502, lon: -122.3088 },
      { lat: 45.0, lon: -100.0 },
      { lat: 42.3656, lon: -71.0096 },
    ],
    risks: ['Ice'],
  },
  {
    id: 9,
    flightNumber: 'UA606',
    departure: 'MIA',
    arrival: 'ORD',
    waypoints: [
      { lat: 25.7959, lon: -80.2870 },
      { lat: 30.0, lon: -85.0 },
      { lat: 41.9742, lon: -87.9073 },
    ],
    risks: ['Heavy Rain'],
  },
  {
    id: 10,
    flightNumber: 'SW707',
    departure: 'BOS',
    arrival: 'LAX',
    waypoints: [
      { lat: 42.3656, lon: -71.0096 },
      { lat: 40.0, lon: -100.0 },
      { lat: 34.0522, lon: -118.2437 },
    ],
    risks: ['Thunderstorms'],
  },
];

export const flightStats = {
  labels: ['AA123', 'BA456', 'DL789', 'UA101', 'SW202', 'AA303', 'BA404', 'DL505', 'UA606', 'SW707'],
  datasets: [
    {
      label: 'Altitude (ft)',
      data: [35000, 36000, 34000, 33000, 32000, 31000, 30000, 29000, 28000, 27000],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
    {
      label: 'Speed (mph)',
      data: [550, 560, 540, 530, 520, 510, 500, 490, 480, 470],
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1,
    },
  ],
};

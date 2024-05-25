// import React from 'react';
// import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import './RoutePlanning.css';

// const RoutePlanning = ({ routes, highlightedRoute }) => {
//   const center = [37.7749, -122.4194]; // Center of the map

//   return (
//     <div className="route-planning">
//       <h3>Route Planning</h3>
//       <MapContainer
//         center={center}
//         zoom={4}
//         style={{ height: '600px', width: '100%' }}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         {routes.map(route => (
//           <Polyline
//             key={route.id}
//             positions={route.waypoints.map(wp => [wp.lat, wp.lon])}
//             color={highlightedRoute && route.id === highlightedRoute.id ? 'red' : 'blue'}
//             weight={highlightedRoute && route.id === highlightedRoute.id ? 5 : 2}
//           >
//             {route.waypoints.map((wp, index) => (
//               <Marker key={index} position={[wp.lat, wp.lon]}>
//                 <Popup>
//                   {index === 0 ? route.departure : index === route.waypoints.length - 1 ? route.arrival : `Waypoint ${index}`}
//                 </Popup>
//               </Marker>
//             ))}
//           </Polyline>
//         ))}
//       </MapContainer>
//     </div>
//   );
// };

// export default RoutePlanning;
import React,{useEffect, useState} from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './RoutePlanning.css';
import axios from 'axios';
const RoutePlanning = ({departureAirport,arrivalAirport,departureAirports,arrivalAirports}) => {
  const center = [37.7749, -122.4194]; // Center of the map
  const [waypoints,setWaypoints] = useState([])

  useEffect(()=>{
    if (departureAirport!=='' && arrivalAirport !== '')
    axios.get(`http://localhost:3001/flight_route/get_shortest_route/${departureAirport}/to/${arrivalAirport}`).then((res)=>{
    const data = res.data
    let routes = data.route
    let _way = []
    routes.forEach((route)=>{
      let dep = {lat: route.sourceLatitude, lon: route.sourceLongitude}
      let arrival = {lat: route.destinationLatitude, lon: route.destinationLongitude}
      _way.push(dep)
      _way.push(arrival)
    })
    setWaypoints(_way)
  }
  )
  },[arrivalAirport, departureAirport])

  return (
    <div className="route-planning">
      
      <h3>Route Planning</h3>
      <MapContainer
        center={center}
        zoom={4}
        style={{ height: '600px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {(waypoints && 
          <Polyline
            positions={waypoints.map(wp => [wp.lat, wp.lon])}
            color="red"
            weight={5}
          >
            {waypoints.map((wp, index) => (
              <Marker key={index} position={[wp.lat, wp.lon]}>
                <Popup>
                  {index === 0 ? departureAirport : index === waypoints.length - 1 ? arrivalAirport : `Waypoint ${index}`}
                </Popup>
              </Marker>
            ))}
          </Polyline>
        )}
      </MapContainer>
    </div>
  );
};

export default RoutePlanning;

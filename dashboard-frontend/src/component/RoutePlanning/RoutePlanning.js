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
import React from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './RoutePlanning.css';

const RoutePlanning = ({ highlightedRoute }) => {
  const center = [37.7749, -122.4194]; // Center of the map

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
        {highlightedRoute && (
          <Polyline
            positions={highlightedRoute.waypoints.map(wp => [wp.lat, wp.lon])}
            color="red"
            weight={5}
          >
            {highlightedRoute.waypoints.map((wp, index) => (
              <Marker key={index} position={[wp.lat, wp.lon]}>
                <Popup>
                  {index === 0 ? highlightedRoute.departure : index === highlightedRoute.waypoints.length - 1 ? highlightedRoute.arrival : `Waypoint ${index}`}
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

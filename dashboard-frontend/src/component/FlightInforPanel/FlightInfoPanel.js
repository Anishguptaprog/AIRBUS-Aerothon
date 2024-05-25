// import React from 'react';
// import './FlightInfoPanel.css';

// const FlightInfoPanel = ({ flightInfo }) => {
//   return (
//     <div className="flight-info-panel">
//       <h3>Flight Information</h3>
//       <p><strong>Flight Number:</strong> {flightInfo.flightNumber}</p>
//       <p><strong>Airline:</strong> {flightInfo.airline}</p>
//       <p><strong>Departure:</strong> {flightInfo.departure}</p>
//       <p><strong>Arrival:</strong> {flightInfo.arrival}</p>
//       <p><strong>Status:</strong> {flightInfo.status}</p>
//       <p><strong>Altitude:</strong> {flightInfo.altitude}</p>
//       <p><strong>Speed:</strong> {flightInfo.speed}</p>
//     </div>
//   );
// };

// export default FlightInfoPanel;
import React from 'react';
import './FlightInfoPanel.css';
// import Weather from '../weather';
const FlightInfoPanel = ({ flightInfo, onNext, onPrev }) => {
  return (
    <div className="flight-info-panel">
      <h3>Flight Information</h3>
      <div className="flight-details">
        <p><strong>Flight Number:</strong> {flightInfo.flightNumber}</p>
        <p><strong>Airline:</strong> {flightInfo.airline}</p>
        <p><strong>Departure:</strong> {flightInfo.departure}</p>
        <p><strong>Arrival:</strong> {flightInfo.arrival}</p>
        <p><strong>Status:</strong> {flightInfo.status}</p>
        <p><strong>Altitude:</strong> {flightInfo.altitude}</p>
        <p><strong>Speed:</strong> {flightInfo.speed}</p>
        
      </div>
      <div className="navigation-buttons">
        <button onClick={onPrev}>&#8592; Previous</button>
        <button onClick={onNext}>Next &#8594;</button>
      </div>
    </div>
  );
};

export default FlightInfoPanel;

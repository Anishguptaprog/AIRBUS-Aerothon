import React from 'react';
// import axios from 'axios';
const AirportDropdown = ({departureAirport,arrivalAirport,handleDepartureChange,handleArrivalChange,departureAirports,arrivalAirports}) => {

  return (
    <div>
      <label htmlFor="departureAirport">Departure Airport:</label>
      <select id="departureAirport" value={departureAirport} onChange={handleDepartureChange}>
        <option value="">Select Departure Airport</option>
        {departureAirports.map((airport) => (
          <option key={airport} value={airport}>{airport}</option>
        ))}
      </select>

      <label htmlFor="arrivalAirport">Arrival Airport:</label>
      <select id="arrivalAirport" value={arrivalAirport} onChange={handleArrivalChange}>
        <option value="">Select Arrival Airport</option>
        {arrivalAirports.map((airport) => (
          <option key={airport} value={airport}>{airport}</option>
        ))}
      </select>

      {/* Display selected airports */}
      {departureAirport && arrivalAirport && (
        <div>
          <p>Departure Airport: {departureAirport}</p>
          <p>Arrival Airport: {arrivalAirport}</p>
        </div>
      )}
    </div>
  );
};

export default AirportDropdown;

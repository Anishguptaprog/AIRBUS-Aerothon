import React, { useState, useEffect } from 'react';
import AlertNotification from './component/AlertNotificatons/AlertNotification';
import FlightInfoPanel from './component/FlightInforPanel/FlightInfoPanel';
import RoutePlanning from './component/RoutePlanning/RoutePlanning';
import FlightStatsChart from './component/FlightStatusChart/FlightStatusChart';
import Weather from './component/weather';
import { alerts, flightInfo, routes, flightStats } from './data/dummyData';
import './App.css';


const App = () => {
  const [currentFlightIndex, setCurrentFlightIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentFlightIndex((prevIndex) => (prevIndex + 1) % flightInfo.length);
    }, 10000); // 10 seconds interval

    return () => clearInterval(intervalId);
  }, []);

  const handleNext = () => {
    setCurrentFlightIndex((prevIndex) => (prevIndex + 1) % flightInfo.length);
  };

  const handlePrev = () => {
    setCurrentFlightIndex((prevIndex) =>
      prevIndex === 0 ? flightInfo.length - 1 : prevIndex - 1
    );
  };

  const currentFlight = flightInfo[currentFlightIndex];
  const highlightedRoute = routes.find(route => route.flightNumber === currentFlight.flightNumber);
  return (
    <div className="app">
      <h1>Flight Dashboard</h1>
      <div className="top-panel">
        <div className="left-panel">
          <AlertNotification alerts={alerts} risks={routes[currentFlightIndex]?.risks}/>
        </div>
        <div className="right-panel">
          <FlightInfoPanel flightInfo={currentFlight} onNext={handleNext} onPrev={handlePrev} />
        </div>
      </div>
      {highlightedRoute && <Weather waypoints={highlightedRoute.waypoints} />}
      <div className="dashboard">
        <RoutePlanning routes={routes} highlightedRoute={highlightedRoute} />
      </div>
      <div className="bottom-panel">
        <FlightStatsChart data={flightStats} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
    </div>
  );
};

export default App;
// import React, { useEffect } from 'react';
// import { Bar } from 'react-chartjs-2';
// import '../../chartSetup'; // Import the setup file to register components

// const FlightStatsChart = ({ data, options }) => {
//   const chartRef = React.createRef();

//   useEffect(() => {
//     return () => {
//       if (chartRef.current) {
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//         chartRef.current.destroy();
//       }
//     };
//   }, []);

//   return <Bar ref={chartRef} data={data} options={options} />;
// };

// export default FlightStatsChart;
import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
// import './FlightStatsChart.css';

const FlightStatsChart = ({ data, options }) => {
  return (
    <div className="flight-stats-chart">
      <h3>Flight Statistics</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default FlightStatsChart;



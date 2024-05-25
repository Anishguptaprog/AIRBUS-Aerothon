// import React from 'react';
// import './AlertNotification.css';

// const AlertNotification = ({ alerts }) => {
//   return (
//     <div className="alert-notification">
//       <h3>Alerts</h3>
//       <ul>
//         {alerts.map(alert => (
//           <li key={alert.id} className={`alert ${alert.type}`}>
//             {alert.message}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AlertNotification;
// src/components/AlertNotification.js
// src/components/AlertNotification.js
// src/components/AlertNotification.js
import React from 'react';
import './AlertNotification.css';

const AlertNotification = ({ alerts, risks, safeForFlight }) => {
  // console.log('Risks:', risks);
  return (
    <div className="alert-notification">
      <h3>Alerts</h3>
      <ul>
        {alerts && alerts.map(alert => (
          <li key={alert.id} className={`alert ${alert.type}`}>
            {alert.message}
          </li>
        ))}
        {risks && risks.map(risk => (
          <li key={risk.id} className="risk">
            {risk}
          </li>
        ))}
        {/* {safeForFlight ? (
          <li className="alert safe-flight">
            The weather conditions along the route are safe for flight.
          </li>
        ) : (
          <li className="alert unsafe-flight">
            The weather conditions along the route are not safe for flight.
          </li>
        )} */}
      </ul>
    </div>
  );
};

export default AlertNotification;

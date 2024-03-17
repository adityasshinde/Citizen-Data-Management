// Citizen.js
import React from 'react';

function Citizen({ citizen }) {
  return (
    <div>
      <p>{`Name: ${citizen.firstName} ${citizen.lastName}`}</p>
      <p>{`Date of Birth: ${citizen.dateOfBirth}`}</p>
      <p>{`Gender: ${citizen.gender}`}</p>
      <p>{`Address: ${citizen.address}, ${citizen.city}, ${citizen.state}, ${citizen.pincode}`}</p>
    </div>
  );
}

export default Citizen;

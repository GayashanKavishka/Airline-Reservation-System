import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const FlightSelection = () => {
  const { state } = useLocation();
  const { flight, travelClass } = state;
  const navigate = useNavigate();

  const handleProceed = () => {
    navigate("/passenger-info", { state: { flight, travelClass } });
  };

  return (
    <div>
      <h2>Confirm Your Flight Selection</h2>
      <p>Flight ID: {flight.Flight_ID}</p>
      <p>Class: {travelClass}</p>
      <button onClick={handleProceed}>
        Proceed to Enter Passenger Information
      </button>
    </div>
  );
};

export default FlightSelection;

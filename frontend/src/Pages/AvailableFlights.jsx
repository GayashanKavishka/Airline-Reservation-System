import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AvailableFlights = () => {
  const { state } = useLocation();
  const { availableFlights } = state;
  const navigate = useNavigate();

  const handleSelectFlight = (flight, travelClass) => {
    navigate("/flight-selection", { state: { flight, travelClass } });
  };

  return (
    <div className="flex flex-col items-center bg-blue-50 min-h-screen py-8">
      <h2 className="text-3xl font-bold text-blue-600 mb-8">
        Available Flights
      </h2>

      {availableFlights.length > 0 ? (
        <div className="grid gap-6 w-full max-w-4xl px-4">
          {availableFlights.map((flight) => (
            <div
              key={flight.Flight_ID}
              className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                Flight ID: {flight.Flight_ID}
              </h3>
              <p className="text-gray-600 mt-2">
                <span className="font-medium">Departure:</span>{" "}
                {flight.Departure_date_time}
              </p>
              <p className="text-gray-600 mt-1">
                <span className="font-medium">Arrival:</span>{" "}
                {flight.Expected_arrival_date_time}
              </p>
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => handleSelectFlight(flight, "Economy")}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                  Economy
                </button>
                <button
                  onClick={() => handleSelectFlight(flight, "Business")}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
                >
                  Business
                </button>
                <button
                  onClick={() => handleSelectFlight(flight, "Platinum")}
                  className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition duration-200"
                >
                  Platinum
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-lg mt-4">
          No flights available for the selected criteria.
        </p>
      )}
    </div>
  );
};

export default AvailableFlights;

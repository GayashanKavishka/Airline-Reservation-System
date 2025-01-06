import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const FlightResults = () => {
  const location = useLocation();
  const { flights } = location.state || {};
  const navigate = useNavigate();

  const handleProceed = (Flight_ID) => {
    console.log("Navigating to /book/"+Flight_ID);
    navigate(`/book/${Flight_ID}`);
  };

  return (
    <div className="flex items-center justify-center p-10 min-h-screen bg-black">
      <div className="w-full max-w-3xl p-10 shadow-2xl rounded-lg bg-white bg-opacity-90 backdrop-blur-md">
        <h2 className="text-center text-4xl font-bold mb-8 text-gray-800">
          Available Flights
        </h2>

        {flights && flights.length > 0 ? (
          <ul className="space-y-4">
            {flights.map((flight, index) => (
              <li
                key={index}
                className="p-6 bg-gray-100 shadow-md rounded-lg hover:bg-gray-200 transition ease-in-out duration-300"
              >
                <div className="grid grid-cols-2 gap-4">
                  <p className="text-black">
                    <strong className="text-blue-600">Flight ID:</strong>{" "}
                    {flight.Flight_ID}
                  </p>
                  <p className="text-black">
                    <strong className="text-blue-600">Aircraft:</strong>{" "}
                    {flight.Aircraft}
                  </p>
                  <p className="text-black">
                    <strong className="text-blue-600">Departure:</strong>{" "}
                    {flight.Departure_date_time}
                  </p>
                  <p className="text-black">
                    <strong className="text-blue-600">Arrival:</strong>{" "}
                    {flight.Expected_arrival_date_time}
                  </p>
                  <p className="text-black">
                    <strong className="text-blue-600">Price:</strong> $
                    {flight.Flight_price}
                  </p>
                  <button
                    class="btn btn-blue"
                    onClick={() => handleProceed(flight.Flight_ID)}
                  >
                    Proceed
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-lg text-gray-700">
            No flights available for the selected criteria.
          </p>
        )}
      </div>
    </div>
  );
};

export default FlightResults;
import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchFlight = () => {
  // State for selected departure and destination
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  // List of airport options
  const airportOptions = [
    "Soekarno-Hatta Intl",
    "Ngurah Rai Intl",
    "Bandaranaike Intl",
    "Mattala Rajapaksa Intl",
    "Indira Gandhi Intl",
    "Chhatrapati Maharaj",
    "Chennai Intl",
    "Suvarnabhumi Airport",
    "Don Mueang Intl",
    "Singapore Changi Airport",
  ];

  // Handle change for departure and destination
  const handleDepartureChange = (event) => {
    setDeparture(event.target.value);
    if (event.target.value === destination) {
      setDestination(""); // Reset destination if it's the same as the selected departure
    }
  };

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
    if (event.target.value === departure) {
      setDeparture(""); // Reset departure if it's the same as the selected destination
    }
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = async () => {
    const flightData = { departure, destination, date };

    try {
      const response = await axios.post(
        "http://localhost:5174/schedule/search",
        flightData
      );
      console.log("Fetched flight data successfully!", response.data);
      navigate("/flight-results", { state: { flights: response.data } });
    } catch (error) {
      console.error("Error Retrieving flight data:", error);
      alert("Fetch error.");
    }
  };

  return (
    <div className="flex items-center justify-center p-10 min-h-screen bg-gradient-to-r from-blue-1100 to-blue-900">
      <Navbar />

      <div className="flex flex-col items-center space-y-10" id="Background">
        {/* Row of Numbers */}
        <div className="flex space-x-10">
          <div className="block bg-gradient-to-r from-blue-500 to-blue-700 rounded-full py-7 px-12">
            <h2 className="text-white text-6xl font-bold">1</h2>
          </div>
          <div className="block bg-white/10 backdrop-blur-md rounded-full py-7 px-12">
            <h2 className="text-white text-6xl font-bold">2</h2>
          </div>
          <div className="block bg-white/10 backdrop-blur-md rounded-full py-7 px-12">
            <h2 className="text-white text-6xl font-bold">3</h2>
          </div>
          <div className="block bg-white/10 backdrop-blur-md rounded-full py-7 px-12">
            <h2 className="text-white text-6xl font-bold">4</h2>
          </div>
        </div>

        {/* Booking Form */}
        <div className="w-full max-w-3xl p-10 shadow-2xl rounded-lg bg-white/10 backdrop-blur-md grid grid-cols-3 gap-6">
          {/* Title */}
          <div className="col-span-3 text-center text-4xl font-extrabold text-gray-100 mb-4 tracking-wide">
            Search Your Flight!
          </div>

          {/* Select Departure */}
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-100 mb-1">
              Select Departure
            </label>
            <select
              className="mt-1 block w-full p-3 bg-gray-200 text-gray-700 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={departure}
              onChange={handleDepartureChange}
            >
              <option value="">Select...</option>
              {airportOptions
                .filter((airport) => airport !== destination)
                .map((airport) => (
                  <option key={airport} value={airport}>
                    {airport}
                  </option>
                ))}
            </select>
          </div>

          {/* Select Destination */}
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-100 mb-1">
              Select Destination
            </label>
            <select
              className="mt-1 block w-full p-3 bg-gray-200 text-gray-700 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={destination}
              onChange={handleDestinationChange}
            >
              <option value="">Select...</option>
              {airportOptions
                .filter((airport) => airport !== departure)
                .map((airport) => (
                  <option key={airport} value={airport}>
                    {airport}
                  </option>
                ))}
            </select>
          </div>

          {/* Select Date */}
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-100 mb-1">
              Select Date
            </label>
            <input
              value={date}
              onChange={handleDateChange}
              type="date"
              className="mt-1 block w-full p-3 bg-gray-200 text-gray-700 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Book Now Button */}
          <div className="col-span-3 mt-4">
            <button
              onClick={handleSubmit}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transform hover:scale-105 transition-transform duration-200"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFlight;

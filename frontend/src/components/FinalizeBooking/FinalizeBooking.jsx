import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function FinalizeBooking() {
  const location = useLocation();
  const { FLight_ID, selectedClass, selectedSeat } = location.state || {};
  const [flightDetails, setFlightDetails] = useState(null);
  const [discountRate, setDiscountRate] = useState(10); // For example, 10% discount
  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {

    console.log("Flight ID:", FLight_ID);
    console.log("Class Selected:", selectedClass);
    console.log("Seat Number:", selectedSeat);
    // console.log("Departure Time:", departureTime);
    // console.log("Discount Rate:", discountRate);
    // console.log("Original Price:", originalPrice);

    // Fetch the flight details based on FLight_ID
    axios.get(`http://localhost:5174/schedule/details/${FLight_ID}`).then((response) => {
      setFlightDetails(response.data);

      // Calculate the discounted price
      const basePrice = response.data.basePrice;
      const discountedPrice = basePrice - (basePrice * discountRate) / 100;
      setFinalPrice(discountedPrice);
    });
  }, [FLight_ID, discountRate]);

  if (!flightDetails) {
    return <div>Loading...</div>;
  }

  const { flightNumber, departureTime, basePrice } = flightDetails;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-10">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Your Ticket</h2>
        <div className="border-t border-gray-300 my-4"></div>

        {/* Flight Details */}
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold text-gray-700">Flight Number:</span>
          <span>{flightNumber}</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold text-gray-700">Departure Time:</span>
          <span>{new Date(departureTime).toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold text-gray-700">Class Booked:</span>
          <span>{selectedClass}</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold text-gray-700">Seat Number:</span>
          <span>{selectedSeat}</span>
        </div>

        {/* Pricing Details */}
        <div className="border-t border-gray-300 my-4"></div>
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold text-gray-700">Base Price:</span>
          <span>{`$${basePrice.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold text-gray-700">Discount Rate:</span>
          <span>{`${discountRate}%`}</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold text-gray-700">Discounted Price:</span>
          <span>{`$${finalPrice.toFixed(2)}`}</span>
        </div>

        <div className="border-t border-gray-300 my-4"></div>
        <button
          className="w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition-colors duration-300"
          onClick={() => alert("Ticket finalized!")}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}

export default FinalizeBooking;

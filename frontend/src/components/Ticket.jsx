import React from "react";

const Ticket = ({
  flightID,
  firstName,
  lastName,
  departureAirport,
  departureTime,
  arrivalAirport,
  arrivalTime,
  seatID,
  price,
  rewardClass,
}) => {
  return (
    <div class="bg-white shadow-xl rounded-lg max-w-lg w-full">
      <div class="p-6">
        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800">Flight Ticket</h2>
          <p class="text-gray-500">Your ticket details are shown below</p>
        </div>

        <div class="bg-blue-500 text-white rounded-t-lg p-4">
          <p class="font-semibold text-lg">
            Flight: <span class="ml-2 font-normal text-white">{flightID}</span>
          </p>
          <p class="font-semibold text-lg">
            Passenger:{" "}
            <span class="ml-2 font-normal text-white">
              {firstName + " " + lastName}
            </span>
          </p>
        </div>

        <div class="grid grid-cols-2 gap-4 p-6 bg-white text-gray-800">
          <div>
            <p>Departure</p>
            <p class="text-gray-600 font-semibold">{departureAirport}</p>
            <p>{new Date(departureTime).toLocaleString('en-GB', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
          </div>

          <div>
            <p>Arrival</p>
            <p class="text-gray-600 font-semibold">{arrivalAirport}</p>
            <p>{new Date(arrivalTime).toLocaleString('en-GB', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
          </div>

          <div class="col-span-2 border-t mt-4 pt-4">
            <p class="text-gray-600 font-semibold">Seat</p>
            <p>{seatID}</p>
          </div>

        </div>
        <div className="grid grid-cols-2 gap-4 p-6 bg-white text-gray-800">
        {/* ... existing flight details ... */}
        
        <div className="col-span-2">
          <p className="text-gray-600 font-semibold">Price</p>
          <div className="flex items-center gap-2">
            <p>{price}</p>
            {rewardClass && (
              <span className="text-sm text-green-600">
                ({rewardClass} member discount applied)
              </span>
            )}
          </div>
        </div>
      </div>
        <div class="bg-blue-500 rounded-b-lg p-4 text-center text-white">
          <p>Thank you for choosing BAirways! Have a pleasant journey.</p>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
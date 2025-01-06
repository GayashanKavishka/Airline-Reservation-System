import React from 'react';
import { useLocation } from 'react-router-dom';
import AircraftSeatLayout from '../../components/Seat/Seat';

const BookingPage = () => {
  const location = useLocation();
  const { state } = location; // Access the state object
  const { economySeats, businessSeats, platinumSeats } = state?.seatConfiguration || {}; // Safely access seatConfiguration

  return (
    <div>
      <h2>Choose Your Seats</h2>
      
      {economySeats && (
        <>
          <h3>Economy</h3>
          <AircraftSeatLayout totalSeats={economySeats} seatType="Economy" />
        </>
      )}
      
      {businessSeats && (
        <>
          <h3>Business</h3>
          <AircraftSeatLayout totalSeats={businessSeats} seatType="Business" />
        </>
      )}

      {platinumSeats && (
        <>
          <h3>Platinum</h3>
          <AircraftSeatLayout totalSeats={platinumSeats} seatType="Platinum" />
        </>
      )}
    </div>
  );
};

export default BookingPage;

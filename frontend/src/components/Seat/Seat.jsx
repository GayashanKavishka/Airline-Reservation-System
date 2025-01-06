import React, { useState } from 'react';
import { MdOutlineChair } from 'react-icons/md';

const Seat = ({ seatNumber, isSelected, onClick, seatType }) => {
  // Color based on seat type (Economy, Business, Platinum)
  const seatColors = {
    Economy: 'text-green-600',
    Business: 'text-blue-600',
    Platinum: 'text-gold-600'
  };

  return (
    <MdOutlineChair
      className={`text-3xl cursor-pointer ${isSelected ? 'text-violet-600' : seatColors[seatType] || 'text-neutral-600'}`}
      onClick={onClick}
    />
  );
};

const AircraftSeatLayout = ({ seatConfig }) => {
  const { economySeats, businessSeats, platinumSeats } = seatConfig; // Destructure seat config
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Total seats and seat distribution for layout
  const seatTypes = [
    { type: 'Economy', total: economySeats },
    { type: 'Business', total: businessSeats },
    { type: 'Platinum', total: platinumSeats }
  ];

  const handleSeatClick = (seatNumber, seatType) => {
    const seatIdentifier = `${seatType}-${seatNumber}`;
    if (selectedSeats.includes(seatIdentifier)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatIdentifier));
    } else {
      if (selectedSeats.length < 10) {
        setSelectedSeats([...selectedSeats, seatIdentifier]);
      } else {
        alert('You can only select a maximum of 10 seats');
      }
    }
  };

  const renderSeats = (totalSeats, seatType) => {
    let seats = [];
    for (let i = 1; i <= totalSeats; i++) {
      seats.push(
        <Seat
          key={`${seatType}-${i}`}
          seatNumber={i}
          seatType={seatType}
          isSelected={selectedSeats.includes(`${seatType}-${i}`)}
          onClick={() => handleSeatClick(i, seatType)}
        />
      );
    }
    return seats;
  };

  const renderSeatLayout = () => {
    return seatTypes.map(({ type, total }, index) => (
      <div key={index} className="w-full my-4">
        <h3 className="text-lg font-semibold">{type} Seats</h3>
        <div className="flex flex-wrap gap-4 justify-center">
          {renderSeats(total, type)}
        </div>
      </div>
    ));
  };

  return (
    <div className="space-y-5">
      <h2 className="text-xl text-neutral-800 dark:text-neutral-100 font-medium">Choose a Seat</h2>

      <div className="w-full flex flex-col items-center gap-6">
        {renderSeatLayout()} {/* Render each seat class layout */}
      </div>

      <div className="mt-5">
        <h3 className="text-lg font-semibold">Selected Seats:</h3>
        <p>{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'No seats selected'}</p>
      </div>
    </div>
  );
};

export default AircraftSeatLayout;

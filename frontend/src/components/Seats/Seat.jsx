import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const SeatBooking = () => {
  const location = useLocation();
  const { seatConfiguration } = location.state || {};
  const [seats, setSeats] = useState({
    economy: [],
    business: [],
    platinum: [],
  });

  useEffect(() => {
    if (seatConfiguration) {
      // Assume seatConfiguration contains the number of seats for each class
      const { economyCount, businessCount, platinumCount } = seatConfiguration;

      setSeats({
        economy: Array(economyCount).fill(false), // Fill with false indicating unselected
        business: Array(businessCount).fill(false),
        platinum: Array(platinumCount).fill(false),
      });
    }
  }, [seatConfiguration]);

  const handleSeatSelection = (section, index) => {
    setSeats((prevSeats) => {
      const newSeats = { ...prevSeats };
      newSeats[section][index] = !newSeats[section][index]; // Toggle selection
      return newSeats;
    });
  };

  return (
    <div className="seat-booking">
      <h2>Seat Booking</h2>
      {["economy", "business", "platinum"].map((section) => (
        <div key={section} className={`${section}-section`}>
          <h3>{section.charAt(0).toUpperCase() + section.slice(1)} Class</h3>
          <div className="seats">
            {seats[section].map((isSelected, index) => (
              <button
                key={index}
                className={`seat ${isSelected ? "selected" : ""}`}
                onClick={() => handleSeatSelection(section, index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      ))}
      <button className="confirm-booking">Confirm Booking</button>
    </div>
  );
};

export default SeatBooking;

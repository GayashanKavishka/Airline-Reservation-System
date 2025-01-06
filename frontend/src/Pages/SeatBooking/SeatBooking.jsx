import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './SeatBooking.css';

const SeatBooking = () => {
    const { aircraftId } = useParams(); // Access the aircraftId from the URL
    const location = useLocation();
    const { seatConfiguration } = location.state; // Access the seatConfiguration from the state

    console.log('Aircraft ID:', aircraftId);
    console.log('Seat Configuration:', seatConfiguration);

    const [selectedSeats, setSelectedSeats] = useState([]);

    // Function to select/deselect seats
    const handleSeatSelect = (seat) => {
        setSelectedSeats((prev) => {
            if (prev.includes(seat)) {
                return prev.filter((s) => s !== seat); // Deselect seat
            } else {
                return [...prev, seat]; // Select seat
            }
        });
    };

    // Function to confirm booking (send selected seats to backend)
    const handleConfirmBooking = async () => {
        try {
            const response = await axios.post('http://localhost:5174/book', {
                flightId: aircraftId, // Use the aircraftId from the route
                seats: selectedSeats,
                userId: 1 // You may get this from the user's session or authentication
            });
            alert('Booking confirmed!');
        } catch (error) {
            console.error('Error during booking', error);
        }
    };

    return (
        <div className="seat-booking-container">
            <h2>Select Your Seats for Aircraft {aircraftId}</h2>

            <div className="seat-section">
                <h3>Economy</h3>
                <div className="seat-grid">
                    {Array.from({ length: seatConfiguration.EconomyClassSeatCount }, (_, i) => (
                        <button
                            key={`E${i}`}
                            className={`seat ${selectedSeats.includes(`E${i}`) ? 'selected' : ''}`}
                            onClick={() => handleSeatSelect(`E${i}`)}
                        >
                            E{i + 1}
                        </button>
                    ))}
                </div>
            </div>

            <div className="seat-section">
                <h3>Business</h3>
                <div className="seat-grid">
                    {Array.from({ length: seatConfiguration.BusinessClassSeatCount }, (_, i) => (
                        <button
                            key={`B${i}`}
                            className={`seat ${selectedSeats.includes(`B${i}`) ? 'selected' : ''}`}
                            onClick={() => handleSeatSelect(`B${i}`)}
                        >
                            B{i + 1}
                        </button>
                    ))}
                </div>
            </div>

            <div className="seat-section">
                <h3>Platinum</h3>
                <div className="seat-grid">
                    {Array.from({ length: seatConfiguration.PlatinumClassSeatCount }, (_, i) => (
                        <button
                            key={`P${i}`}
                            className={`seat ${selectedSeats.includes(`P${i}`) ? 'selected' : ''}`}
                            onClick={() => handleSeatSelect(`P${i}`)}
                        >
                            P{i + 1}
                        </button>
                    ))}
                </div>
            </div>

            <button className="confirm-booking-btn" onClick={handleConfirmBooking}>
                Confirm Booking
            </button>
        </div>
    );
};

export default SeatBooking;

import React from 'react';
import { useLocation } from 'react-router-dom';

const BookSeats = () => {
    const { state } = useLocation();
    const { seatConfiguration } = state;

    // Generate seats based on seatConfiguration data
    const renderSeats = (count, className) => {
        return Array(count).fill(null).map((_, index) => (
            <div key={`${className}-${index}`} className={`seat ${className}`}>
                {className} Seat {index + 1}
            </div>
        ));
    };

    return (
        <div>
            <h2>Book Your Seats</h2>
            <div className="seat-section">
                <h3>Economy Class</h3>
                <div className="seat-grid">
                    {renderSeats(seatConfiguration.economySeats, 'economy')}
                </div>
            </div>
            <div className="seat-section">
                <h3>Business Class</h3>
                <div className="seat-grid">
                    {renderSeats(seatConfiguration.businessSeats, 'business')}
                </div>
            </div>
            <div className="seat-section">
                <h3>Platinum Class</h3>
                <div className="seat-grid">
                    {renderSeats(seatConfiguration.platinumSeats, 'platinum')}
                </div>
            </div>
        </div>
    );
};

export default BookSeats;

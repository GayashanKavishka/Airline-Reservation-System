--Passengers under or over 18
SELECT * FROM Passengers
WHERE passenger_id IN (SELECT passenger_id FROM Bookings WHERE flight_id = :flight_id)
AND age < 18;

--Number of passengers to a destination within a date range
SELECT COUNT(*) FROM Bookings
JOIN Flights ON Bookings.flight_id = Flights.flight_id
WHERE Flights.destination_airport_id = :destination_id
AND Flights.departure_time BETWEEN :start_date AND :end_date;

--Bookings by passenger type in a date range
SELECT user_type, COUNT(*) FROM Bookings
JOIN Passengers ON Bookings.passenger_id = Passengers.passenger_id
WHERE booking_date BETWEEN :start_date AND :end_date
GROUP BY user_type;

-- PastFlights
SELECT Flights.flight_number, COUNT(Bookings.passenger_id) as passenger_count
FROM Flights
LEFT JOIN Bookings ON Flights.flight_id = Bookings.flight_id
WHERE Flights.departure_time < NOW() AND Flights.origin_airport_id = :origin_id AND Flights.destination_airport_id = :destination_id
GROUP BY Flights.flight_number;


-- total_revenue
SELECT Aircrafts.aircraft_type, SUM(Bookings.ticket_price) as total_revenue
FROM Bookings
JOIN Flights ON Bookings.flight_id = Flights.flight_id
JOIN Aircrafts ON Flights.aircraft_id = Aircrafts.aircraft_id
GROUP BY Aircrafts.aircraft_type;

--Create Booking procedure
DELIMITER //

CREATE PROCEDURE CreateBooking(
    IN flight_id INT,
    IN passenger_id INT,
    IN seat_number VARCHAR(10),
    OUT booking_id INT
)
BEGIN
    DECLARE seat_count INT;

    -- Check if the seat is already booked
    SELECT COUNT(*) INTO seat_count
    FROM Bookings
    WHERE flight_id = flight_id AND seat_number = seat_number;

    IF seat_count > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Seat is already booked.';
    ELSE
        -- Insert the new booking
        INSERT INTO Bookings (flight_id, passenger_id, seat_number, booking_date, ticket_price)
        VALUES (flight_id, passenger_id, seat_number, NOW(), 100.00);  -- Assuming a fixed price for simplicity

        -- Get the booking ID of the newly created booking
        SET booking_id = LAST_INSERT_ID();
    END IF;
END //

DELIMITER ;


--Delete Booking
DELIMITER //

CREATE PROCEDURE CancelBooking(
    IN booking_id INT
)
BEGIN
    DECLARE seat_num VARCHAR(10);
    DECLARE flight_id INT;

    -- Get the seat number and flight ID of the booking to be cancelled
    SELECT seat_number, flight_id INTO seat_num, flight_id
    FROM Bookings
    WHERE booking_id = booking_id;

    -- Delete the booking
    DELETE FROM Bookings WHERE booking_id = booking_id;

    -- Optional: Logic to notify the passenger about the cancellation can go here
END //

DELIMITER ;


---checking seat availability trigger
DELIMITER //

CREATE TRIGGER after_booking_insert
AFTER INSERT ON Bookings
FOR EACH ROW
BEGIN
    -- Logic for sending notifications can go here
    -- For example, you could log this action or notify the user
    INSERT INTO Notifications (message, created_at)
    VALUES (CONCAT('Booking confirmed for seat ', NEW.seat_number, ' on flight ', NEW.flight_id), NOW());
END //

DELIMITER ;


--avoid deleting flight
DELIMITER //

CREATE TRIGGER before_flight_delete
BEFORE DELETE ON Flights
FOR EACH ROW
BEGIN
    DECLARE booking_count INT;

    -- Count active bookings for the flight being deleted
    SELECT COUNT(*) INTO booking_count
    FROM Bookings
    WHERE flight_id = OLD.flight_id;

    IF booking_count > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot delete flight with active bookings.';
    END IF;
END //

DELIMITER ;

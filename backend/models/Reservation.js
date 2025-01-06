const connection = require('../database/connection');

// Function to initialize the Bookings table for planes
const reservationQuery = () => {
  return new Promise((resolve, reject) => {
    // const createBookingsTableQuery = `
    //   CREATE TABLE IF NOT EXISTS Bookings (
    //     Ticket_ID INT AUTO_INCREMENT PRIMARY KEY,
    //     User_ID INT NOT NULL,
    //     Flight_ID INT NOT NULL,
    //     Seat_ID INT NOT NULL,
    //     seatNumber VARCHAR(6) NOT NULL,
    //     Price FLOAT NOT NULL,
    //     FOREIGN KEY (User_ID) REFERENCES Users(User_ID),
    //     FOREIGN KEY (Flight_ID) REFERENCES FlightSchedules(Flight_ID)
    //   );
    // `;
     
    
     const createBookingsTableQuery = `
       CREATE TABLE IF NOT EXISTS Ticket (
          Ticket_ID INT AUTO_INCREMENT PRIMARY KEY,
          Passenger_ID INT,
          Flight_ID VARCHAR(7),
          Seat_ID INT,
          Price FLOAT,
          FOREIGN KEY (Passenger_ID) REFERENCES Passenger(Passenger_ID),
          FOREIGN KEY (Flight_ID) REFERENCES FlightSchedule(Flight_ID),
          FOREIGN KEY (Seat_ID) REFERENCES Seat(Seat_ID)
          );
     `;





    connection.query(createBookingsTableQuery, (err, results) => {
      if (err) {
        console.error('Detailed error:', err);
        reject('Error creating Bookings table:', err.stack);
      } else {
        console.log('Bookings table is ready.');
        resolve(results);
      }
    });
  });
};

const insertBooking = (userId, flightId, seatId, seatNumber, price) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO Bookings (User_ID, Flight_ID, Seat_ID, seatNumber, Price)
      VALUES (?, ?, ?, ?,?);
    `;
    connection.query(query, [userId, flightId, seatId, seatNumber, price], (err, results) => {
      if (err) {
        reject('Error inserting booking:', err.stack);
      } else {
        console.log('Booking inserted successfully.');
        resolve(results);
      }
    });
  });
};

// // Function to get a booking by user ID
// const getBookingByUserId = (userId) => {
//   return new Promise((resolve, reject) => {
//     const query = `
//       SELECT * FROM Bookings WHERE userId = ?;
//     `;
//     connection.query(query, [userId], (err, results) => {
//       if (err) {
//         reject('Error fetching booking:', err.stack);
//       } else {
//         resolve(results);
//       }
//     });
//   });
// };

// const updateBookingById = (id, updates) => {
//   const { planeId, userId, date, seatNumber } = updates;
//   return new Promise((resolve, reject) => {
//     const query = `
//       UPDATE Bookings
//       SET planeId = ?, userId = ?, date = ?, seatNumber = ?
//       WHERE id = ?;
//     `;
//     connection.query(query, [planeId, userId, date, seatNumber, id], (err, results) => {
//       if (err) {
//         reject('Error updating booking:', err.stack);
//       } else {
//         console.log('Booking updated successfully.');
//         resolve(results);
//       }
//     });
//   });
// };


// const deleteBookingById = (id) => {
//   return new Promise((resolve, reject) => {
//     const query = `
//       DELETE FROM Bookings WHERE id = ?;
//     `;
//     connection.query(query, [id], (err, results) => {
//       if (err) {
//         reject('Error deleting booking:', err.stack);
//       } else {
//         console.log('Booking deleted successfully.');
//         resolve(results);
//       }
//     });
//   });
// };

module.exports = {
  reservationQuery,
  insertBooking
};

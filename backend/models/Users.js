const connection = require('../database/connection');

// Function to initialize the database (e.g., create tables if they don't exist)
const usersQuery = () => {
  return new Promise((resolve, reject) => {
    const createUsersTableQuery = `
      CREATE TABLE IF NOT EXISTS Passenger (
        Passenger_ID INT AUTO_INCREMENT PRIMARY KEY,
        FirstName VARCHAR(50),
        SecondName VARCHAR(50),
        Country VARCHAR(50),
        DOB DATE,
        Address VARCHAR(100),
        City VARCHAR(50),
        Email VARCHAR(50),
        Gender VARCHAR(10),
        Phone_number VARCHAR(20),
        Num_of_booking INT
      );
    `;
    connection.query(createUsersTableQuery, (err, results) => {
      if (err) {
        reject('Error creating Passenger table:', err.stack);
      } else {
        console.log('Passenger table is ready.');
        resolve();
      }
    });
  });
};

// Function to insert a user
const insertUser = (firstName, secondName, country, dob, address, city, email, gender, phoneNumber, numOfBookings) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO Passenger (FirstName, SecondName, Country, DOB, Address, City, Email, Gender, Phone_number, Num_of_booking)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    connection.query(query, [firstName, secondName, country, dob, address, city, email, gender, phoneNumber, numOfBookings], (err, results) => {
      if (err) {
        reject('Error inserting user:', err.stack);
      } else {
        console.log('User inserted successfully.');
        resolve(results);
      }
    });
  });
};

// Function to get a user by Email (updated to fetch by Email instead of Username)
const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT * FROM Passenger WHERE Email = ?;
    `;
    connection.query(query, [email], (err, results) => {
      if (err) {
        reject('Error fetching user:', err.stack);
      } else {
        resolve(results[0] || null); // Return the first user or null if no user is found
      }
    });
  });
};

// Function to update a user by ID
const updateUserById = (id, updates) => {
  const { firstName, secondName, country, dob, address, city, email, gender, phoneNumber, numOfBookings } = updates;
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE Passenger
      SET FirstName = ?, SecondName = ?, Country = ?, DOB = ?, Address = ?, City = ?, Email = ?, Gender = ?, Phone_number = ?, Num_of_booking = ?
      WHERE Passenger_ID = ?;
    `;
    connection.query(query, [firstName, secondName, country, dob, address, city, email, gender, phoneNumber, numOfBookings, id], (err, results) => {
      if (err) {
        reject('Error updating user:', err.stack);
      } else {
        console.log('User updated successfully.');
        resolve(results);
      }
    });
  });
};

// Function to delete a user by ID
const deleteUserById = (id) => {
  return new Promise((resolve, reject) => {
    const query = `
      DELETE FROM Passenger WHERE Passenger_ID = ?;
    `;
    connection.query(query, [id], (err, results) => {
      if (err) {
        reject('Error deleting user:', err.stack);
      } else {
        console.log('User deleted successfully.');
        resolve(results);
      }
    });
  });
};

// Function to count users
const countUsers = () => {
  return new Promise((resolve, reject) => {
    const query = `
      CALL GetTotalPassengerCount();
    `;
    connection.query(query, (err, results) => {
      if (err) {
        reject('Error counting users:', err.stack);
      } else {
        resolve(results[0][0].total);
      }
    });
  });
};

// Function to get passenger age group by flight
const GetPassengerAgeGroupByFlight = (flightID) => {
  return new Promise((resolve, reject) => {
    const query = `
      CALL GetPassengerAgeGroupByFlight(?);
    `;
    connection.query(query, [flightID], (err, results) => {
      if (err) {
        reject('Error fetching age group by flight:', err.stack);
      } else {
        resolve(results[0]);
      }
    });
  });
};

// Function to get passenger count by destination and date range
const GetPassengerCountByDestinationAndDateRange = (shortCode, startDate, endDate) => {
  return new Promise((resolve, reject) => {
    const query = `
      CALL GetPassengerCountByDestinationAndDateRange(?, ?, ?);
    `;
    connection.query(query, [shortCode, startDate, endDate], (err, results) => {
      if (err) {
        reject('Error fetching passenger count by destination and date range:', err.stack);
      } else {
        resolve(results[0]);
      }
    });
  });
};

module.exports = { usersQuery, insertUser, getUserByEmail, updateUserById, deleteUserById, countUsers, GetPassengerAgeGroupByFlight, GetPassengerCountByDestinationAndDateRange };

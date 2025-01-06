const connection = require('../database/connection');
const { usersQuery } = require('./Users');

// Function to initialize the Airport table
const registeredQuery = () => {
  return new Promise((resolve, reject) => {
    // const createRegisteredTableQuery = `
    //   CREATE TABLE IF NOT EXISTS RegisteredUsers (
    //     Register_ID INTEGER PRIMARY KEY AUTO_INCREMENT,
    //     Username VARCHAR(30) NOT NULL UNIQUE,
    //     Password VARCHAR(255) NOT NULL,
    //     User_ID INT,
    //     FOREIGN KEY (User_ID) REFERENCES Users(User_ID)
    //   );
    // `;

    const createRegisteredTableQuery = `
            CREATE TABLE IF NOT EXISTS Registered (
                Username VARCHAR(30) PRIMARY KEY,
                Password VARCHAR(255),
                Passenger_ID INT ,
                Reward_ID INT,
                FOREIGN KEY (Passenger_ID) REFERENCES Passenger(Passenger_ID),
                FOREIGN KEY (Reward_ID) REFERENCES Reward(Reward_ID)
            );
    `;
    connection.query(createRegisteredTableQuery, (err, results) => {
      if (err) {
        reject('Error creating Registered table: ' + err.stack);
      } else {
        console.log('Registered table is ready.');
        resolve();
      }
    });
  });
};

const insertRegistered = (username, password, Passenger_ID) => {
    return new Promise((resolve, reject) => {
      const insertRegisteredQuery = `
        INSERT INTO Registered (Username, Password, Passenger_ID)
        VALUES (?, ?, ?);
      `;
      connection.query(insertRegisteredQuery, [username, password, Passenger_ID], (err, results) => {
        if (err) {
          reject('Error inserting registered user:', err.stack);
        } else {
          console.log('Registered user inserted successfully.');
          resolve(results);
        }
      });
    });
  };

  const getRegisteredByUsername = (username) => {
    return new Promise((resolve, reject) => {
      const getRegisteredQuery = `
        SELECT * FROM Registered WHERE Username =?;
      `;
      connection.query(getRegisteredQuery, [username], (err, results) => {
        if (err) {
          reject('Error fetching registered user:', err.stack);
        } else {
          resolve(results[0] || null);
        }
      });
    });
  };

module.exports = { registeredQuery, insertRegistered, getRegisteredByUsername };

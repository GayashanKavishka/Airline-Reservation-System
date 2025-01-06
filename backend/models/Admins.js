const connection = require('../database/connection');

// Function to initialize the database
const adminsQuery = () => {
  return new Promise((resolve, reject) => {
    // const createAdminsTableQuery = `
    //   CREATE TABLE IF NOT EXISTS Admins (
    //     Admin_ID INT AUTO_INCREMENT PRIMARY KEY,
    //     FirstName VARCHAR(50) NOT NULL,
    //     SecondName VARCHAR(50) NOT NULL,
    //     Username VARCHAR(255) NOT NULL UNIQUE,
    //     Password VARCHAR(255) NOT NULL,
    //     Country VARCHAR(255) NOT NULL,
    //     DOB DATETIME NOT NULL,
    //     Address VARCHAR(100) NOT NULL,
    //     City VARCHAR(50) NOT NULL,
    //     Email VARCHAR(50) NOT NULL UNIQUE,
    //     Gender VARCHAR(10) NOT NULL,
    //     Phone_number VARCHAR(20) NOT NULL
    //   );
    // `;


    const createAdminsTableQuery = `
          CREATE TABLE IF NOT EXISTS Admin (
              Admin_ID VARCHAR(30) PRIMARY KEY,
              Password VARCHAR(30),
              Name VARCHAR(30),
              Last_logging_time DATETIME
                 );
    `;

    connection.query(createAdminsTableQuery, (err, results) => {
      if (err) {
        console.error('Detailed error:', err);
        reject('Error creating Admins table:', err.stack);
      } else {
        console.log('Admins table is ready.');
        resolve();
      }
    });
  });
};

// Function to insert a admin
const insertAdmin = (firstName, secondName, username, password, country, dob, address, city, email, gender, phoneNumber) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO Admins (FirstName, SecondName, Username, Password, Country, DOB, Address, City, Email, Gender, Phone_number)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    connection.query(query, [firstName, secondName, username, password, country, dob, address, city, email, gender, phoneNumber], (err, results) => {
      if (err) {
        console.error('Detailed error:', err);
        reject('Error inserting admin:', err.stack);
      } else {
        console.log('Admin inserted successfully.');
        resolve(results);
      }
    });
  });
};

// Function to get a user by Email (updated to fetch by Email instead of Username)
const getAdminByUsername = (username) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT * FROM Admins WHERE Email = ?;
    `;
    connection.query(query, [username], (err, results) => {
      if (err) {
        reject('Error fetching admin:', err.stack);
      } else {
        resolve(results[0] || null); // Return the first user or null if no user is found
      }
    });
  });
};


// const loginAdmin = (username, password) => {
//   return new Promise((resolve, reject) => {
//     const query = `
//       SELECT * FROM Admin WHERE Admin_ID = ? AND Password = ?; 
//     `;

//     console.log(username);
//     connection.query(query, [username, password], (err, results) => {
  
//       if (err) {
//         reject({ success: false, message: 'Database error', error: err.stack });
//       } else if (results && results.length > 0 ) {
//         // Username and password matched, allow login
//         console.log(results);
//         resolve({ success: true });
//       } else {
//         // Username or password incorrect
//         resolve({ success: false, message: 'Username or password invalid' });
//       }
//     });
//   });
// };


const loginAdmin = (username, password) => {
  return new Promise((resolve, reject) => {
    // const query = `
    //   SELECT * FROM Admin WHERE Admin_ID = ? AND Password = ?;
    // `;

    const query = `call GetAdminByCredentials(?,?)`;

    console.log("Username provided:", username);
    console.log("Password provided:", password);

    connection.query(query, [username, password], (err, results) => {
      if (err) {
        console.error("Database error:", err);
        reject({ success: false, message: 'Database error', error: err.stack });
      } else {
        console.log("Query results:", results[0]);

        if (results[0] && results[0].length != 0) {
          // Username and password matched, allow login
          console.log("Login successful for:", username);
          resolve({ success: true });
        } else {
          // Username or password incorrect
          console.log("Login failed: Username or password invalid");
          resolve({ success: false, message: 'Username or password invalid' });
        }
      }
    });
  });
};





module.exports = { adminsQuery, insertAdmin, getAdminByUsername,loginAdmin};
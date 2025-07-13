const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    // host: "localhost",
  user: 'root',      // Database user
  password: 'Gaya@123',  // Database password
  // database: 'Bairways'  // Database password
    database: 'bairways'

  // host: "sql12.freesqldatabase.com",
  //   // host: "localhost",
  // user: 'sql12789658',      // Database user
  // password: 'w3BfNKizPn',  // Database password
  // // database: 'Bairways'  // Database password
  //   database: 'sql12789658'
});

// Connect to the database
connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err.stack);
      return;
    }
    console.log('Connected to the database.');
  });

  module.exports = connection;
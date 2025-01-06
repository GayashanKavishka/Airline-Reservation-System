const connection = require('../database/connection');

// Function to initialize the Airport table
const airportsQuery = () => {
  return new Promise((resolve, reject) => {
    const createAirportTableQuery = `
      CREATE TABLE IF NOT EXISTS Airport (
        Airport_ID INT AUTO_INCREMENT PRIMARY KEY,
        Short_code VARCHAR(10) NOT NULL UNIQUE,
        name VARCHAR(30) NOT NULL,
        Country VARCHAR(30) NOT NULL,
        State VARCHAR(30) NOT NULL,
        city VARCHAR(30) NOT NULL
      );
    `;
    connection.query(createAirportTableQuery, (err, results) => {
      if (err) {
        reject('Error creating Airport table: ' + err.stack);
      } else {
        console.log('Airport table is ready.');
        resolve();
      }
    });
  });
};





const countAirports = ()=>{
  return new Promise((resolve, reject) => {
    const query = `
       call GetTotalAirportCount();
    `;
    connection.query(query, (err, results) => {
      if (err) {
        reject('Error counting users:', err.stack);
      } else {
        // resolve(results[0].total);
        resolve(results[0][0].total);
      }
    });
  });
}


const fetchAllAirports = ()=> {
  return new Promise((resolve,reject)=>{
    const query = `call GetAllAirports()`;
    connection.query(query,(err,results)=>{
      if(err){
        reject('Error fetching airports:',err.stack);
      }else{
        resolve(results[0]);
      }
    });
  })
}

const getAllAirportsShortCode = () => {
  return new Promise((resolve, reject) => {
    const query = `
      call GetAirportShortCodes()
    `;
    connection.query(query, (err, results) => {
      if (err) {
        reject('Error fetching airports:', err.stack);
      } else {
        resolve(results[0]);
      }
    });});
  };

  const fetchAllCountries = () => {
    return new Promise((resolve, reject) => {
      const query = `
        select * from country
      `;
      connection.query(query, (err, results) => {
        if (err) {
          reject('Error fetching countries:', err.stack);
        } else {
          resolve(results);
        }
      });
    });
  }

  const insertAirport = (Short_code, name, Country, State, city) => {
    return new Promise((resolve, reject) => {
      const insertAirportQuery = `
        call InsertAirport(?,?,?,?,?);
      `;
      connection.query(insertAirportQuery, [Short_code, name, Country, State, city], (err, results) => {
        if (err) {
          reject('Error inserting airport: ' + err.stack);
        } else {
          resolve();
        }
      });
    });
  };


module.exports = { airportsQuery,countAirports,fetchAllAirports,getAllAirportsShortCode,fetchAllCountries ,insertAirport};

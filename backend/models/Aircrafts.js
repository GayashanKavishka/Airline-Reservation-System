const connection = require('../database/connection');

// Function to initialize the Airport table
const aircraftsQuery = () => {
  return new Promise((resolve, reject) => {
    // const createAircraftTableQuery = `
    //   CREATE TABLE IF NOT EXISTS Aircrafts (
    //     Aircraft_ID INT AUTO_INCREMENT PRIMARY KEY,
    //     Model_ID INT,
    //     FOREIGN KEY (Model_ID) REFERENCES Models(Model_ID)
    //   );
    // `;

    const createAircraftTableQuery = `
              CREATE TABLE IF NOT EXISTS Aircraft (
              Aircraft_ID INT AUTO_INCREMENT PRIMARY KEY,
              Model_ID INT,
              FOREIGN KEY (Model_ID) REFERENCES Aircraft_model(Model_ID)
        );
           `;
    

    connection.query(createAircraftTableQuery, (err, results) => {
      if (err) {
        reject('Error creating Aircrafts table: ' + err.stack);
      } else {
        console.log('Aircrafts table is ready.');
        resolve();
      }
    });
  });
};

// const insertAircraft = () => {
//   return new Promise((resolve, reject) => {
//     const insertAircraftQuery = `
//       INSERT INTO Aircrafts (Model_ID)
//       VALUES (1);
//     `;
//     connection.query(insertAircraftQuery, (err, results) => {
//       if (err) {
//         reject('Error inserting aircraft: ' + err.stack);
//       } else {
//         console.log('Aircraft inserted successfully.');
//         resolve(results.insertId);
//       }
//     });
//   });
// }



const insertAircraft = (aircraft_ID,model_name) => {
  return new Promise((resolve, reject) => {
    const insertAircraftQuery = `
      INSERT INTO Aircraft (Aircraft_ID,Model_ID)
      VALUES (?,?);
    `;
    const selectModelID = `SELECT Model_ID FROM Aircraft WHERE Model_name = ?`;
    connection.query(selectModelID,[model_name], (err, results) => {
      if (err) {
        reject('Error inserting aircraft: ' + err.stack);
      }else if (results.length === 0) {
        // Model_name doesn't exist in the models table
        reject(`Invalid model name: ${model_name}`);
      }
      else {
        console.log('Aircraft inserted successfully.');
        const mode_id = results[0].Model_ID;
        connection.query(insertAircraftQuery, [parseInt(aircraft_ID),mode_id], (err, results) => {
          if (err) {
            reject('Error inserting aircraft: ' + err.stack);
          } else {
            console.log('Aircraft inserted successfully.');
            resolve(results.insertId);
          }
        });
      }
    });
  });
}



const fetchAircraftById = (aircraftId) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT model_id FROM aircrafts WHERE Aircraft_ID = ?';
    connection.query(query, [aircraftId], (err, results) => {
      if (err) {
        reject('Error fetching aircraft: ' + err.stack);
      } else if (results.length === 0) {
        reject('Aircraft not found');
      } else {
        resolve(results[0].model_id); // return the model_id from the result
      }
    });
  });
}

const fetchAllAircrafts = () => {
  return new Promise((resolve, reject) => {
    // const query = 'select  Aircraft_ID , Model_name,EconomyClassSeatCount,BusinessClassSeatCount,PlatinumClassSeatCount from Aircraft join Aircraft_model on Aircraft.Model_ID = Aircraft_model.Model_ID;';
    const query = `call GetAircraftDetails()`;
    connection.query(query, (err, results) => {
      if (err) {
        reject('Error fetching aircrafts: ' + err.stack);
      } else {
        resolve(results[0]);
      }
    });
  });
};

const deleteAircraft = (aircraftId) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM aircraft WHERE Aircraft_ID  = ?';
    connection.query(query, [aircraftId], (err, results) => {
      if (err) {
        reject('Error deleting aircraft: ' + err.stack);
      } else {
        resolve();
      }
    });
  });
};

const updateAircraft = (aircraftId, modelName) => {
  return new Promise((resolve, reject) => {
    const selectModelIDQuery = 'SELECT Model_ID FROM models WHERE Model_name = ?';
    const updateAircraftQuery = 'UPDATE aircrafts SET Model_ID = ? WHERE Aircraft_ID  = ?';

    connection.query(selectModelIDQuery, [modelName], (err, results) => {
      if (err) {
        reject('Error finding model ID: ' + err.stack);
      } else if (results.length === 0) {
        reject(`Invalid model name: ${modelName}`);
      } else {
        const modelId = results[0].Model_ID;
        connection.query(updateAircraftQuery, [modelId, aircraftId], (err, results) => {
          if (err) {
            reject('Error updating aircraft: ' + err.stack);
          } else {
            resolve();
          }
        });
      }
    });
  });
};


const countAircrafts = ()=>
{
  return new Promise((resolve, reject) => {
    const query = `
      call GetTotalAircraftCount()
    `;
    connection.query(query, (err, results) => {
      if (err) {
        reject('Error counting users:', err.stack);
      } else {
        resolve(results[0][0].total);
      }
    });
  });
}


const GetRevanueBYAircraftModel = (Short_code) =>{
  return new Promise((resolve, reject) => {
    const query = `
      call GetRevanueBYAircraftModel(?)
    `;
    connection.query(query,[Short_code] ,(err, results) => {
      if (err) {
        reject('Error counting users:', err.stack);
      } else {
        resolve(results[0]);
      }
    });
  });
};

const TotalRevanueByEachAircraft = () =>{
  return new Promise((resolve, reject) => {
    const query = `
      call TotalRevanueByEachAircraft()
    `;
    connection.query(query,(err, results) => {
      if (err) {
        reject('Error counting users:', err.stack);
      } else {
        resolve(results[0]);
      }
    });
  });
};


module.exports = { aircraftsQuery, insertAircraft, fetchAircraftById,fetchAllAircrafts,deleteAircraft ,updateAircraft,countAircrafts,GetRevanueBYAircraftModel,TotalRevanueByEachAircraft};

const connection = require('../database/connection');

// Function to initialize the Aircraft_model table
const modelsQuery = () => {
  return new Promise((resolve, reject) => {
    const createModelsTableQuery = `
      CREATE TABLE IF NOT EXISTS Aircraft_model (
          Model_ID INT AUTO_INCREMENT PRIMARY KEY,
          Model_name VARCHAR(10),
          EconomyClassSeatCount INT,
          BusinessClassSeatCount INT,
          PlatinumClassSeatCount INT
      );
    `;
    connection.query(createModelsTableQuery, (err, results) => {
      if (err) {
        reject('Error creating Aircraft_model table: ' + err.stack);
      } else {
        console.log('Aircraft_model table is ready.');
        resolve();
      }
    });
  });
};

// Function to insert a model into the Aircraft_model table
const insertModel = (modelname, Economy, Business, Platinum) => {
  return new Promise((resolve, reject) => {
    const insertModelQuery = `
      INSERT INTO Aircraft_model (Model_name, EconomyClassSeatCount, BusinessClassSeatCount, PlatinumClassSeatCount)
      VALUES (?,?,?,?);
    `;
    connection.query(insertModelQuery, [modelname, Economy, Business, Platinum], (err, results) => {
      if (err) {
        reject('Error inserting model: ' + err.stack);
      } else {
        console.log('Model inserted successfully.');
        resolve(results);
      }
    });
  });
};

// Function to fetch seat configuration by Model_ID
const fetchSeatConfiguration = (modelId) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT EconomyClassSeatCount, BusinessClassSeatCount, PlatinumClassSeatCount FROM Aircraft_model WHERE Model_ID = ?';
    connection.query(query, [modelId], (err, results) => {
      if (err) {
        reject('Error fetching seat configuration: ' + err.stack);
      } else if (results.length === 0) {
        reject('Seat configuration not found');
      } else {
        resolve(results[0]); // return the seat configuration object
      }
    });
  });
};

// Function to fetch all models using a stored procedure
const fetchAllModels = () => {
  return new Promise((resolve, reject) => {
    const query = `CALL GetAllAircraftModels()`;
    connection.query(query, (err, results) => {
      if (err) {
        reject('Error fetching all models: ' + err.stack);
      } else {
        resolve(results[0]);
      }
    });
  });
};

// Function to delete a model by Model_ID
const deleteModel = (modelId) => {
  return new Promise((resolve, reject) => {
    const deleteModelQuery = 'DELETE FROM Aircraft_model WHERE Model_ID = ?';
    connection.query(deleteModelQuery, [modelId], (err, results) => {
      if (err) {
        reject('Error deleting model: ' + err.stack);
      } else if (results.affectedRows === 0) {
        reject('Model not found');
      } else {
        console.log('Model deleted successfully.');
        resolve(results);
      }
    });
  });
};

module.exports = { modelsQuery, insertModel, fetchSeatConfiguration, fetchAllModels, deleteModel };

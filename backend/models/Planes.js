const connection = require('../database/connection');

// Function to initialize the Planes table
const planesQuery = () => {
  return new Promise((resolve, reject) => {
    const createPlanesTableQuery = `
      CREATE TABLE IF NOT EXISTS Planes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        model VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        airlines VARCHAR(255) NOT NULL,
        manufactureDate DATE NOT NULL,
        featured BOOLEAN DEFAULT 0,
        adminId INT NOT NULL
      );
    `;
    connection.query(createPlanesTableQuery, (err, results) => {
      if (err) {
        reject('Error creating Planes table:', err.stack);
      } else {
        console.log('Planes table is ready.');
        resolve();
      }
    });
  });
};

// Function to insert a plane
const insertPlane = (model, description, airlines, manufactureDate, posterUrl, adminId, featured = false) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO Planes (model, description, airlines, manufactureDate, posterUrl, featured, adminId)
      VALUES (?, ?, ?, ?, ?, ?, ?);
    `;
    connection.query(query, [model, description, airlines, manufactureDate, posterUrl, featured, adminId], (err, results) => {
      if (err) {
        reject('Error inserting plane:', err.stack);
      } else {
        console.log('Plane inserted successfully.');
        resolve(results);
      }
    });
  });
};

// Function to get a plane by model
const getPlaneByModel = (model) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT * FROM Planes WHERE model = ?;
    `;
    connection.query(query, [model], (err, results) => {
      if (err) {
        reject('Error fetching plane:', err.stack);
      } else {
        resolve(results[0] || null); // Return the first plane or null if not found
      }
    });
  });
};

// Function to update a plane by ID
const updatePlaneById = (id, updates) => {
  const { model, description, airlines, manufactureDate, posterUrl, featured } = updates;
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE Planes
      SET model = ?, description = ?, airlines = ?, manufactureDate = ?, posterUrl = ?, featured = ?
      WHERE id = ?;
    `;
    connection.query(query, [model, description, airlines, manufactureDate, posterUrl, featured, id], (err, results) => {
      if (err) {
        reject('Error updating plane:', err.stack);
      } else {
        console.log('Plane updated successfully.');
        resolve(results);
      }
    });
  });
};

// Function to delete a plane by ID
const deletePlaneById = (id) => {
  return new Promise((resolve, reject) => {
    const query = `
      DELETE FROM Planes WHERE id = ?;
    `;
    connection.query(query, [id], (err, results) => {
      if (err) {
        reject('Error deleting plane:', err.stack);
      } else {
        console.log('Plane deleted successfully.');
        resolve(results);
      }
    });
  });
};

module.exports = { planesQuery, insertPlane, getPlaneByModel, updatePlaneById, deletePlaneById };

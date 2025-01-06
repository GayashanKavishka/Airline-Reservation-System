const connection = require('../database/connection');


const RouteQuery = () =>{
    return new Promise((resolve, reject) => {
        // const createRouteTableQuery = `
        //    CREATE TABLE IF NOT EXISTS routes (
        //     Route_ID INT PRIMARY KEY,
        //     Arrival_Airport_ID INT,
        //     Departure_Airport_ID INT,
        //     Distance FLOAT,
        //     FOREIGN KEY (Arrival_Airport_ID) REFERENCES airport(Airport_ID),
        //     FOREIGN KEY (Departure_Airport_ID) REFERENCES airport(Airport_ID)
        //     );
        // `;

        const createRouteTableQuery = `
             CREATE TABLE IF NOT EXISTS Route (
                Route_ID INT AUTO_INCREMENT PRIMARY KEY,
                Departure_Airport_ID INT,
                Arrival_Airport_ID INT,
                Distance FLOAT,
                FOREIGN KEY (Departure_Airport_ID) REFERENCES Airport(Airport_ID),
                FOREIGN KEY (Arrival_Airport_ID) REFERENCES Airport(Airport_ID)
);`

connection.query(createRouteTableQuery, (err, results) => {
    if (err) {
        reject('Error creating Users table:', err.stack);
    } else {
        console.log('Users table is ready.');
        resolve();
    }
});
});
};


const insertRoute = (Route_ID, Arrival_Airport_ID, Departure_Airport_ID, Distance) => {
    return new Promise((resolve, reject) => {
        const query = `
          INSERT INTO routes (Route_ID, Arrival_Airport_ID, Departure_Airport_ID, Distance)
          VALUES (?, ?, ?, ?);
        `;
        connection.query(query, [Route_ID, Arrival_Airport_ID, Departure_Airport_ID, Distance], (err, results) => {
            if (err) {
                reject('Error inserting user:', err.stack);
            } else {
                console.log('User inserted successfully.');
                resolve(results);
            }
        });
    });
}

const fetchAllRoutes = () => {
    return new Promise((resolve, reject) => {
        const query = `call GetAllRoutes()`;
        connection.query(query, (err, results) => {
            if (err) {
                reject('Error fetching user:', err.stack);
            } else {
                resolve(results);
                console.log(results[0][0]);
                console.log("Success");
            }
        });
    });
};
  
const AddRoute = ( Departure_Airport_ID,Arrival_Airport_ID, Distance) => {
    return new Promise((resolve, reject) => {
        const query = `
          call AddFlightRoute(?,?,?);
        `;
        connection.query(query, [ Departure_Airport_ID,Arrival_Airport_ID, Distance], (err, results) => {
            if (err) {
                reject('Error inserting user:', err.stack);
            } else {
                console.log('User inserted successfully.');
                resolve(results);
            }
        });
    });
}

module.exports = {RouteQuery,insertRoute,fetchAllRoutes,AddRoute};
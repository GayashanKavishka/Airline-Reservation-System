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




const InsertPassangers = (passangerData)=>{
    const{firstName,lastName,country,dob,address,city,email,gender,phone,class_id,flight_id,price,seat_num} = passangerData;
    console.log(firstName,lastName,country,dob,address,city,email,gender,phone,class_id,flight_id,price,seat_num);
    return new Promise((resolve,reject)=>{
       const query = `Call InsertPassengerAndTicket(?,?,?,?,?,?,?,?,?,?,?,?,?)`;
       connection.query(query,[firstName,lastName,country,dob,address,city,email,gender,phone,class_id,flight_id,price,seat_num] ,(err,results)=>{
            if(err){
                reject('Error inserting passanger:',err.stack);
            }
            else {
                console.log('Passanger inserted successfully.');
                resolve(results);
            }
       })
    })

};


const MakeATicket = (Class_ID,Flight_ID,seat_price,seat_num,Passenger_ID)=>{
     return new Promise((resolve,reject)=>{
          const query1 = 'call SelectAllFlightSchedules(?)';
          const query2 = 'call CreateATicket(?,?,?,?,?)';

          console.log(Flight_ID);

          connection.query(query1,[Flight_ID],(err,results)=>{
            if(err){
               reject('Error Finding Flight :',err.stack);
            }
            else{
              //  console.log('Flight Found');
              //  console.log(results[0][0]);
               const Flight_price = results[0][0].Flight_price;
               console.log("Flight_Price:",Flight_price);
               const Finnal_price = Flight_price + seat_price;
               console.log("Final_Price:",Finnal_price);
               connection.query(query2,[Flight_ID,Class_ID,Passenger_ID,seat_num,Finnal_price],(err,results)=>{
                 if(err){
                   reject('Error Making Ticket :',err.stack);
                 }
                 else{
                    console.log('Ticket Created Successfully');
                    resolve(results);
                 }
               })
            }
          })


     })
        
     };


     const GetTicketDetails = (Flight_ID,Seat_num,Class_ID)=>{
      return new Promise((resolve,reject)=>{
        const query = 'call GetTicketDetails(?,?,?)';
        connection.query(query,[Flight_ID,Seat_num,Class_ID],(err,results)=>{
          if(err){
            reject('Error Fetching Ticket Details :',err.stack);
          }
          else{
            console.log('Ticket Details Fetched Successfully');
            resolve(results);
          }

     });
    });
  };

  const MakeTiketPaid = (Ticket_ID)=>{
    return new Promise((resolve,reject)=>{
      query = 'call MakePaidTicket(?)';
      connection.query( query,[Ticket_ID],(err,results)=>{
         if(err)
         {
             reject('Error Making Ticket Paid:',err.stack);
         }
         else{
            console.log('Ticket Paid Successfully');
             resolve(results);
         }
      })
    })
    

  }


  const UndoBooking = (Ticket_ID,Token)=>{
    return new Promise((resolve,reject)=>{
      query1 = 'call UndoBokking(?)';
      query2 = 'call DeleteTicketForReg(?)'
      if(Token !== null){
      connection.query( query2,[Ticket_ID],(err,results)=>{
         if(err)
         {    
             console.log('Error Undoing Booking Register:',err.stack);
             reject('Error Undoing Booking Register:',err.stack);
         }
         else{
            console.log('Booking Register Undone Successfully');
             resolve(results);
         }
    })
  }
  else{
    connection.query( query1,[Ticket_ID],(err,results)=>{
      if(err)
      {
          console.log('Error Undoing Booking:',err.stack);
          reject('Error Undoing Booking:',err.stack);
          
      }
      else{
         console.log('Booking Undone Successfully');
          resolve(results);
      }
 })
  }
  })
};



module.exports = {
  reservationQuery,
  insertBooking,
  InsertPassangers,
  MakeATicket,
  GetTicketDetails,
  MakeTiketPaid,
  UndoBooking
};

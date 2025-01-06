const connection = require('../database/connection');

// Function to initialize the Airport table
const rewardsQuery = () => {
  return new Promise((resolve, reject) => {
    // const createRewardTableQuery = `
    //   CREATE TABLE IF NOT EXISTS Rewards (
    //     Reward_ID INT AUTO_INCREMENT PRIMARY KEY,
    //     Reward_class VARCHAR(30) NOT NULL,
    //     Discount FLOAT
    //   );
    // `;


    const createRewardTableQuery = `
          CREATE TABLE IF NOT EXISTS Reward (
          Reward_ID INT AUTO_INCREMENT PRIMARY KEY ,
          Reward_class VARCHAR(30),
          Discount FLOAT
);`

    connection.query(createRewardTableQuery, (err, results) => {
      if (err) {
        reject('Error creating Rewards table: ' + err.stack);
      } else {
        console.log('Rewards table is ready.');
        resolve();
      }
    });
  });
};



const GetBookingsByRewardClass=(start_date,end_date)=>   // report 1
{
  console.log(start_date,end_date);
  return new Promise((resolve,reject)=>{
    const query = `Call GetBookingsByRewardClass(?,?)`;
    connection.query(query,[start_date,end_date],(err,results)=>{
      if(err){
        reject('Error fetching bookings:',err);
      }else{
        resolve(results[0]);
      }
    });
  })
}

module.exports = { rewardsQuery,GetBookingsByRewardClass };

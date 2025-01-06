const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = require("./models/Users");
const planesDb = require("./models/Planes");
const reservationsDb = require("./models/Reservation");
const registered = require("./models/RegisteredUsers");
const airportModel = require('./models/Airports');
const aircraftModel = require('./models/Aircrafts');
const aircraftModelModel = require('./models/AircraftsModels');
const flightScheduleModel = require('./models/FlightSchedules');
const adminDb = require('./models/Admins');
const routes = require('./models/Route');
const rewards = require('./models/Rewards');

const usersRouter = require("./routes/User");
app.use("/user", usersRouter);

const registerRouter = require("./routes/RegisteredUsers");
app.use("/register", registerRouter);

const adminRouter = require("./routes/Admin");
app.use("/admin", adminRouter);

const modelsRouter = require("./routes/AircraftsModels");
app.use("/models", modelsRouter);

const aircraftRouter = require("./routes/Aircrafts");
app.use("/aircraft", aircraftRouter);

const scheduleRouter = require("./routes/FlightSchedules");
app.use("/schedule", scheduleRouter);

const flightRouter = require("./routes/Route");
app.use("/route", flightRouter);

const airportRouter = require("./routes/Airports");
app.use("/airport", airportRouter);

const rewardsRouter = require("./routes/Rewards");
app.use("/rewards", rewardsRouter);



// app.use(express.json()); // to handle JSON body in requests
// app.use('/auth', signupRoute);

// const reserveRouter = require("./routes/Reservation");
// app.use("/reserve-seats", reserveRouter);

// Initialize the databases and then start the server
Promise.all([
  db.usersQuery(),          // Initialize users
  planesDb.planesQuery(),   // Initialize planes
  aircraftModelModel.modelsQuery(),
  aircraftModel.aircraftsQuery(),
  flightScheduleModel.ScheduleQuery(),
  reservationsDb.reservationQuery(), // Initialize reservations
  registered.registeredQuery(), // Initialize registered users
  airportModel.airportsQuery(),
  adminDb.adminsQuery(),
  routes.RouteQuery(),
  rewards.rewardsQuery()

]).then(() => {
    // Once the database is initialized, start the server
    app.listen(5174, () => {
      console.log('Server is running on port 5174');
    });
  })
  .catch((error) => {
    // If the database initialization fails, log the error and don't start the server
    console.error('Failed to initialize the database:', error);
  });


// app.get('/', (req, res) => {
//     res.send('Hello, World!');
//   });
  
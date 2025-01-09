const express = require("express");
const router = express.Router();
const {
  addSchedule,
  getAllFlightSchedules,
  updateSchedule,
  deleteSchedule,
  countFlightSchedules,
  fetchAircraftById,
  getScheduleById,
  GetFLightDetailsByAirports,
  TakeFlightbyID,
  searchFlights,
  GetSeatsRegToClass,
  GetSeatStatus,
  UpdateSeatStatus
} = require("../models/FlightSchedules");
const connection = require("../database/connection");
const {validateToken} = require('../middleware/AuthMiddleware');

router.post("/", async (req, res) => {
  const {
    Aircraft_ID,
    Route_ID,
    Departure_date_time,
    Expected_arrival_date_time,
    Flight_price,
    Created_By,
    Status,
  } = req.body;
  // console.log(Aircraft_ID, Route_ID,Departure_date_time, Expected_arrival_date_time, Flight_price, Created_By);

  try {
    await addSchedule(
      Aircraft_ID,
      Route_ID,
      Departure_date_time,
      Expected_arrival_date_time,
      Flight_price,
      Created_By,
      Status
    );
    res.json({ message: "Flight schedule created successfully!" });
  } catch (err) {
    console.error("Error creating flight schedule:", err);
    res.json({ error: "Failed to create flight schedule." });
  }
});

// router.get("/:id", async (req, res) => {
//   try {
//     const schedule = await getAllFlightSchedules();
//     res.json(schedule);
//   } catch (err) {
//     console.error(err);
//     res.send("Error fetching schedule");
//   }
// });

router.get("/", async (req, res) => {
  try {
    const schedule = await getAllFlightSchedules();
    res.json(schedule);
  } catch (err) {
    console.error(err);
    res.send("Error fetching schedule");
  }
});

router.put("/update", async (req, res) => {
  try {
    // Get the id from request parameters
    const scheduleData = req.body; // Get the whole body as scheduleData
    await updateSchedule(scheduleData); // Pass id and scheduleData
    res.send("Schedule updated successfully.");
  } catch (error) {
    console.error("Error updating schedule:", error);
    res.status(500).send("Error updating schedule: " + error.message);
  }
});

router.delete("/delete", async (req, res) => {
  //modified
  try {
    const id = req.query.id;
    console.log(id);
    await deleteSchedule(id);
    res.send("Schedule deleted successfully.");
  } catch (error) {
    console.error("Error deleting schedule:", error);
    res.status(500).send("Error deleting schedule: " + error.message);
  }
});

router.get("/count", async (req, res) => {
  try {
    const count = await countFlightSchedules();
    res.json(count);
  } catch (error) {
    console.error("Error counting users:", error);
    res.status(500).json({ error: "Failed to count users." });
  }
});

router.get("/booking/:FLight_ID", async (req, res) => {
  const id = req.params.FLight_ID;

  connection.query(
    `SELECT 
      p.Price AS Price, 
      CAST(am.EconomyClassSeatCount / 10 AS SIGNED) AS EconomyRows, 
      CAST(am.BusinessClassSeatCount / 10 AS SIGNED) AS BusinessRows, 
      CAST(am.PlatinumClassSeatCount / 10 AS SIGNED) AS PlatinumRows 
    FROM FlightSchedule AS fs 
    JOIN Aircraft AS a ON fs.Aircraft_ID = a.Aircraft_ID 
    JOIN Aircraft_model AS am ON a.Model_ID = am.Model_ID 
    JOIN SeatPrices AS p ON fs.FLight_ID = p.FLight_ID 
    WHERE fs.FLight_ID = ?;`,
    [id],
    function (err, result, fields) {
      if (err) {
        console.log(err);
        return res.status(500).send({ error: "Database query error" });
      }
      if (result.length === 0) {
        return res.status(404).send({ message: "Flight not found" });
      }

      console.log(result); // Log the result for debugging
      res.send(result); // Send the response
    }
  );
});

router.post("/booked/:FLight_ID", async (req, res) => {
  const id = req.params.FLight_ID;
  const { i, j, selectedClass } = req.body;

  // Map "Gold" class to "Business" in the database
  const classType = selectedClass === "Gold" ? "Business" : selectedClass;

  // Get class ID based on class type
  const classIdMap = {
    'Economy': 1,
    'Business': 2,
    'Platinum': 3
  };

  const classId = classIdMap[classType];

  // Query to check if the seat is already booked
  connection.query(
    `SELECT s.Seat_ID, s.Status
     FROM seat s
     JOIN Aircraft a ON s.Aircraft_ID = a.Aircraft_ID
     JOIN FlightSchedule fs ON fs.Aircraft_ID = a.Aircraft_ID
     WHERE fs.Flight_ID = ? 
     AND s.Class_ID = ? 
     AND s.Row_num = ? 
     AND s.Col_num = ?`,
    [id, classId, i + 1, j + 1],
    function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).send("Database error");
      } else {
        res.send(result[0]?.Status === 'Booked' || result[0]?.Status === 'in-progress');
      }
    }
  );
});

router.get("/byID", async (req, res) => {
  try {
    const id = req.query.id;
    const schedule = await getScheduleById(id);
    res.json(schedule);
  } catch (err) {
    console.error(err);
    res.send("Error fetching schedule");
  }
});

router.get("/discounted-price", validateToken, async (req, res) => {
  try {
    const flightId = req.query.flightId;
    const username = req.user.username;

    // Get reward class from registered user
    const rewardClassQuery = `
      SELECT r.Reward_class 
      FROM Registered reg
      JOIN Passenger p ON reg.Passenger_ID = p.Passenger_ID
      JOIN Reward r ON reg.Reward_ID = r.Reward_ID
      WHERE reg.Username = ?
    `;

    connection.query(rewardClassQuery, [username], (err, rewardResults) => {
      if (err) {
        console.error("Error getting reward class:", err);
        return res.status(500).json({ error: "Database error" });
      }

      if (rewardResults.length === 0) {
        return res.json({ discountedPrice: null });
      }

      const rewardClass = rewardResults[0].Reward_class;

      console.log(rewardClass);

      // Get discounted price from view
      const discountQuery = `
        SELECT Discounted_Price 
        FROM flightdiscountedprices 
        WHERE Flight_ID = ? AND Reward_class = ?
      `;

      connection.query(discountQuery, [flightId, rewardClass], (err, priceResults) => {
        if (err) {
          console.error("Error getting discounted price:", err);
          return res.status(500).json({ error: "Database error" });
        }

        res.json({ 
          discountedPrice: priceResults[0]?.Discounted_Price || null,
          rewardClass: rewardClass 
        });
      });
    });
  } catch (error) {
    console.error("Error in discounted price route:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/byAirports", async (req, res) => {
  try {
    const { from, to } = req.query;
    const schedule = await GetFLightDetailsByAirports(from, to);
    res.json(schedule);
  } catch (err) {
    console.error(err);
    res.send("Error fetching schedule");
  }
});

router.post("/details/:Flight_ID", async (req, res) => {
  const { Flight_ID } = req.params;
  const seatSelections = req.body; // Array of seat objects

  try {
    const updatePromises = seatSelections.map(seat => {
      return new Promise((resolve, reject) => {
        const query = `CALL UpdateSeatStatus(?, ?, ?, ?)`;

        connection.query(query, 
          [seat.Flight_ID, seat.ClassType, seat.Row_num, seat.Col_num],
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        );
      });
    });

    await Promise.all(updatePromises);
    res.json({ success: true, message: "Seats status updated successfully" });
  } catch (error) {
    console.error("Error updating seat status:", error);
    res.status(500).json({ error: "Failed to update seat status" });
  }
});


router.get("/modify/id", async (req, res) => {
  try {
    const id = req.query.id;
    const schedule = await TakeFlightbyID(id);
    res.json(schedule);
  } catch (err) {
    console.error(err);
    res.send("Error fetching schedule");
  }
});

router.post("/search", async (req, res) => {
  const { departure, destination, date } = req.body;

  try {
    const flights = await searchFlights(departure, destination, date);
    res.json(flights);
  } catch (error) {
    console.error("Error searching flights: ", error);
    res.status(500).json({ error: "Failed to search flights." });
  }
});

router.get("/:FLight_ID", (req, res) => {
  const { FLight_ID } = req.params;

  fetchAircraftById(FLight_ID)
    .then((seatCounts) => {
      res.json(seatCounts);
    })
    .catch((error) => {
      if (error === "Aircraft not found") {
        res.status(404).json({ message: error });
      } else {
        res.status(500).json({ message: error });
      }
    });
});

router.get("/seats/:Flight_ID", (req, res) => {
  const { Flight_ID } = req.params;

  GetSeatsRegToClass(Flight_ID)
    .then((seatCounts) => {
      res.json(seatCounts);
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
});


router.get("/seat-status/:Flight_ID", (req, res) => {
  const { Flight_ID } = req.params;

  GetSeatStatus(Flight_ID)
    .then((seatCounts) => {
      res.json(seatCounts);
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
});

router.put("/set-seat-status", (req, res) => {
  const Flight_ID = req.body.Flight_ID;
  const Aircraft_ID = req.body.Aircraft_ID;
  const SelectedSeats = req.body.SelectedSeat;
  console.log(Flight_ID, Aircraft_ID, SelectedSeats);

  UpdateSeatStatus(Flight_ID, Aircraft_ID, SelectedSeats)
    .then((results) => {
      res.json({ message: "Seat status updated successfully", results });
    })
    .catch((error) => {
      res.status(500).json({ message: "Failed to update seat status", error });
    });
});


module.exports = router;

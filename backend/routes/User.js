const express = require("express");
const router = express.Router();
const {insertUser, getUserByEmail, countUsers, GetPassengerAgeGroupByFlight, GetPassengerCountByDestinationAndDateRange} = require('../models/Users');
const {insertRegistered, getRegisteredByUsername} = require('../models/RegisteredUsers');
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middleware/AuthMiddleware");
const connection = require('../database/connection');


router.post("/signup", async (req, res) => {
    const { firstName, secondName, username, email, password, country, dob, address,
        city, gender, phone } = req.body;


    if (!password) {
        return res.json({ error: "Password is required." });
    }

    try {

        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.json({ error: "Email already in use." });
        }
        const existingRegistered = await getRegisteredByUsername(username);
        if (existingRegistered) {
            return res.json({ error: "Username is required." });
        }

        const userID = await insertUser(firstName, secondName, country, dob, address, city, email, gender, phone, 0);

        const hash = await bcrypt.hash(password, 10);

        const newUser = await getUserByEmail(email); // Or however you fetch the newly created user
        if (!newUser) {
            return res.json({ error: "Failed to retrieve user after registration." });
        }
        const User_ID = newUser.User_ID;

        console.log('Inserted User_ID:', User_ID);

        await insertRegistered(username, hash, User_ID);

        res.json({ message: "User created successfully!" });
    } catch (error) {
        console.error('Error creating user:', error);
        res.json({ error: "Failed to create user." });
    }
});

// router.post("/login", async (req, res) => {
//     const { username, password } = req.body;

//     if (!username || !password) {
//         return res.status(400).json({ error: "Username and password are required." });
//     }

//     try {
//         const user = await getRegisteredByUsername(username);

//         if (!user) {
//             return res.status(400).json({ error: "Invalid username." });
//         }

//         const match = await bcrypt.compare(password, user.Password);

//         if (!match) {
//             return res.status(400).json({ error: "Invalid password." });
//         }

//         const accessToken = sign(
//             { username: user.username, id: user.id },
//             "importantsecret"
//         );

//         res.json({ accessToken });
//     } catch (error) {
//         console.error("Error logging in user:", error);
//         res.status(500).json({ error: "Failed to log in user." });
//     }
// });

// Add this new endpoint
router.get("/details", validateToken, async (req, res) => {
    try {
      const username = req.user.username;
      
      // Using the existing database connection with JOIN query
      const query = `
        SELECT p.FirstName, p.SecondName, p.Country, p.DOB, p.Address, 
               p.City, p.Email, p.Gender, p.Phone_number 
        FROM Passenger p
        JOIN Registered r ON p.Passenger_ID = r.Passenger_ID
        WHERE r.Username = ?
      `;
      
      connection.query(query, [username], (err, results) => {
        if (err) {
          console.error('Error fetching user details:', err);
          return res.json({ error: "Failed to fetch user details" });
        }
        
        if (results.length === 0) {
          return res.json({ error: "User not found" });
        }
        
        res.json(results[0]);
      });
    } catch (error) {
      console.error('Error in /details route:', error);
      res.json({ error: "An error occurred while fetching user details" });
    }
  });

router.get("/count", async (req, res) => {
    try {
        const count = await countUsers();
        res.json(count);
    } catch (error) {
        console.error("Error counting users:", error);
        res.status(500).json({ error: "Failed to count users." });
    }
});


router.get('/admin/report2', async (req, res) => {
    const flightID = req.query.flightID;
    try {
        const ageGroup = await GetPassengerAgeGroupByFlight(flightID);
        res.json(ageGroup);
    } catch (error) {
        console.error("Error fetching age group:", error);
        res.json({ error: error.message });
    }
});


router.get('/admin/report3', async (req, res) => {
    const start_date = req.query.start_date;
    const end_date = req.query.end_date;
    const Short_code = req.query.short_code;
    try {
        const passengerCount = await GetPassengerCountByDestinationAndDateRange(Short_code,start_date, end_date);
        res.json(passengerCount);
    } catch (error) {
        console.error("Error fetching passenger count:", error);
        res.json({ error: error.message });
    }
});




module.exports = router;
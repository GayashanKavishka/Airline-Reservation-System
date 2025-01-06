const express = require('express');
const router = express.Router();
const {insertRegistered, getRegisteredByUsername} = require('../models/RegisteredUsers');
const {insertUser} = require('../models/Users');
const bcrypt = require('bcrypt');
const { sign } = require("jsonwebtoken");
const {validateToken} = require('../middleware/AuthMiddleware');

// router.post("/register", async (req, res) => {
//     const { username, email, password } = req.body;

//     if (!username ||!password) {
//         return res.status(400).json({ error: "All fields are required." });
//     }

//     try {
//         await insertUser(firstName, secondName, country, dob, address, city, email, gender, phoneNumber, numOfUsers);

//         const hash = await bcrypt.hash(password, 10);

//         await insertRegistered(username, hash);

//         res.json({ message: "User created successfully!" });
//     } catch (error) {
//         console.error('Error creating user:', error);
//         res.status(500).json({ error: "Failed to create user." });
//     }
// });

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    // if (!username || !password) {
    //     return res.status(400).json({ error: "Username and password are required." });
    // }

    try {
        const user = await getRegisteredByUsername(username);

        if (!user) {
            return res.json({ error: "Invalid username." });
        }

        console.log("User-provided password:", password);
        console.log("Stored hashed password:", user.Password);

        const hash2 = await bcrypt.hash(password, 10);

        console.log("Stored hashed hash:", hash2);

        // Compare password with hashed password
        const match = await bcrypt.compare(password, user.Password);

        if (!match) {
            console.log("Password mismatch for username:", username);
            return res.json({ error: "Invalid password." });
        }

        // Generate token
        const accessToken = sign(
            { username: user.Username, passengerId: user.Passenger_ID },
            "importantsecret"
          );

        return res.json({ accessToken });

        // const accessToken = sign(
        //     { username: user.username, id: user.id },
        //     "importantsecret"
        // );

        // res.json({ accessToken });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.json({ error: "Failed to log in user." });
    }
});

router.get("/", validateToken, (req, res) => {
    res.json(req.user);
});


module.exports = router;
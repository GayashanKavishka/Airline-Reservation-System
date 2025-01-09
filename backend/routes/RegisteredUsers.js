const express = require('express');
const router = express.Router();
const {insertRegistered, getRegisteredByUsername,InsertPassengerAndRegistered,UserValidate} = require('../models/RegisteredUsers');
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

// router.post("/login", async (req, res) => {
//     const { username, password } = req.body;

//     // if (!username || !password) {
//     //     return res.status(400).json({ error: "Username and password are required." });
//     // }

//     try {
//         const user = await getRegisteredByUsername(username);

//         if (!user) {
//             return res.json({ error: "Invalid username." });
//         }

//         console.log("User-provided password:", password);
//         console.log("Stored hashed password:", user.Password);

//         const hash2 = await bcrypt.hash(password, 10);

//         console.log("Stored hashed hash:", hash2);

//         // Compare password with hashed password
//         const match = await bcrypt.compare(password, user.Password);

//         if (!match) {
//             console.log("Password mismatch for username:", username);
//             return res.json({ error: "Invalid password." });
//         }

//         // Generate token
//         const accessToken = sign(
//             { username: user.Username, passengerId: user.Passenger_ID },
//             "importantsecret"
//           );

//         return res.json({ accessToken });

//         // const accessToken = sign(
//         //     { username: user.username, id: user.id },
//         //     "importantsecret"
//         // );

//         // res.json({ accessToken });
//     } catch (error) {
//         console.error("Error logging in user:", error);
//         res.json({ error: "Failed to log in user." });
//     }
// });

router.get("/", validateToken, (req, res) => {
    res.json(req.user);
});


router.post("/register",(req,res)=>{
    const {FirstName,LastName,Country,DOB,Address,City,Email,Gender,Phone,UserName,Password} = req.body;
    console.log("password",Password);
    InsertPassengerAndRegistered(FirstName,LastName,Country,DOB,Address,City,Email,Gender,Phone,UserName,Password)
    .then((results)=>{
        res.status(200).json({message:"User Registered Successfully",results})
    }
    ).catch((err)=>{
        console.log(err)
        res.status(500).json({message:"User Registration Failed",err})
    })
    })


router.post("/login", (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required." });
    }

    UserValidate(username)
        .then((user) => {
            if (!user) {
                return res.json({ error: "Invalid username." });
            }

            console.log("user",user);
            const hashedPassword = user[0][0].Password;
            console.log("hashedPassword",hashedPassword);

            bcrypt.compare(password, hashedPassword)
                .then((match) => {
                    if (!match) {
                        return res.json({ error: "Invalid password." });
                    }

                    console.log(user[0][0].Username, user[0][0].Passenger_ID);

                    const accessToken = sign(
                        { username: user[0][0].Username, passengerId: user[0][0].Passenger_ID,Name:user[0][0].Firstname },
                        "importantsecret"
                    );

                    return res.json({"token": accessToken });
                })
                .catch((err) => {
                    console.error("Error comparing passwords:", err);
                    res.json({ error: "Failed to log in user." });
                });
        })
        .catch((err) => {
            console.error("Error logging in user:", err);
            res.json({ error: "Failed to log in user." });
        });

    
})

module.exports = router;
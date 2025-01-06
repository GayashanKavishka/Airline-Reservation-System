const express = require("express");
// const { getAdminByUsername } = require("../models/Admins");
const router = express.Router();
const {insertAdmin, getAdminByUsername,loginAdmin} = require("../models/Admins");
const bcrypt = require("bcrypt");
const {sign} = require("jsonwebtoken");

router.post("/adminlog", async (req, res) => {
    const { firstName, secondName, username, email, password, country, dob, address, city, gender, phone } = req.body;

    if (!password) {
        return res.json({ error: "Password is required." });
    }

    try {
        const existingUser = await getAdminByUsername(username);
        if (existingUser) {
            return res.json({ error: "Username already in use." });
        }

        const hash = await bcrypt.hash(password, 10);

        const AdminID = await insertAdmin(firstName, secondName, username, hash, country, dob, address, city, email, gender, phone);

    } catch (error) {
        console.error('Error creating admin:', error);
        res.json({ error: "Failed to create admin." });
    }
});



router.get("/login",async(req,res)=>{
    const {username,password} = req.query;
    try{
        // const admin = await loginAdmin(username);
        // if(!admin){
        //     return res.json({error:"Invalid username or password."});
        // }
        // const passwordMatch = await bcrypt.compare(password,admin.Password);
        // if(!passwordMatch){
        //     return res.json({error:"Invalid username or password."});
        // }
        // const token = sign({username:admin.Username,AdminID:admin.Admin_ID},"secret");
        // res.json({success:true,token:token});
        const admin = await loginAdmin(username, password);
        console.log(admin);
        if (admin.success) {
            const token = sign({ username: admin.Username, AdminID: admin.Admin_ID }, "secret");
            res.json({ success: true, token: token });
        } else {
            res.json({ success: false,error: "Invalid username or password." });
        }
    }catch(error){
        console.error('Error logging in admin:', error);
        res.json({ error: "Failed to login admin." });
    }
});

module.exports = router;
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserSignup = require("../model/usersignup-model");
const Doctor = require("../model/doc1signup-model");

const router = express.Router();

const ADMIN_CREDENTIALS = {
    email: "admin@healsmart.com",
    password: bcrypt.hashSync("123", 10) // Hash the password before use
};

// Login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        //✅ Admin Login Fix
        if (email === ADMIN_CREDENTIALS.email) {
            const isAdmin = await bcrypt.compare(password, ADMIN_CREDENTIALS.password);
            if (isAdmin) {
                const token = jwt.sign({ email, role: "admin" }, "your_secret_key", { expiresIn: "1h" });
                return res.status(200).json({ message: "Admin login successful", role: "admin", token, redirect: "/dummyAH.html" });
            }
            return res.status(400).json({ error: "Invalid credentials" });
        }

    


        // Check if the email exists in Doctor Model
        let doctor = await Doctor.findOne({ email });
        if (doctor) {
            const isMatch = await bcrypt.compare(password, doctor.password);
            if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

            const token = jwt.sign({ email, role: "doctor" }, "your_secret_key", { expiresIn: "1h" });
            return res.status(200).json({ message: "Login successful", role: "doctor", token, redirect: "./DH.html" });
        }

    //    // No matching email found
    //     res.status(404).json({ error: "User not found" });


        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        let user = await UserSignup.findOne({ email });
        console.log("User found:", user);

        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        if (!user.password) {
            return res.status(500).json({ error: "Server error: Password not found for user" });
        }

        console.log("Password from DB:", user.password); // Debugging step

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password Match:", isMatch); // Debugging step

        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ email, role: "user" }, "your_secret_key", { expiresIn: "1h" });

        return res.status(200).json({ 
            message: "Login successful", 
            role: "user", 
            token, 
            redirect: "./USHomePage.html" 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error2" });
    }
});

module.exports = router;

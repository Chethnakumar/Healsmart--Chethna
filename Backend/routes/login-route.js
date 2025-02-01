const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/usersignup-model");  // User model
const Doctor = require("../model/doc1signup-model");  // Doctor model

const router = express.Router();

const ADMIN_CREDENTIALS = {
    email: "admin@healsmart.com",
    password: "Admin@123", // Ideally, hash this password before use
};

// Login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user is Admin
        if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
            return res.status(200).json({ message: "Login successful", role: "admin", redirect: "/dummyAH.html" });
        }

        // Check if the email exists in User Model
        let user = await User.findOne({ email });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });
            return res.status(200).json({ message: "Login successful", role: "user", redirect: "/USHomePage.html" });
        }

        // Check if the email exists in Doctor Model
        let doctor = await Doctor.findOne({ email });
        if (doctor) {
            const isMatch = await bcrypt.compare(password, doctor.password);
            if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });
            return res.status(200).json({ message: "Login successful", role: "doctor", redirect: "/DH.html" });
        }

        // If no matching email is found
        res.status(404).json({ error: "User not found" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;

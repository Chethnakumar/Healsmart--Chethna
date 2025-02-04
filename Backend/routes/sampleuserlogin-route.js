// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const UserSignup = require("../model/usersignup-model");

// const loginUser = async (req, res) => {
//     try {
//         console.log("Login request received:", req.body); // Debugging line

//         const { email, password } = req.body;

//         if (!email || !password) {
//             console.log("Missing email or password");  // Debugging line
//             return res.status(400).json({ error: "Email and password are required" });
//         }

//         let user = await UserSignup.findOne({ email });

//         if (!user) {
//             console.log("User not found:", email);  // Debugging line
//             return res.status(400).json({ error: "User not found" });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             console.log("Invalid credentials for:", email);  // Debugging line
//             return res.status(400).json({ error: "Invalid credentials" });
//         }

//         const token = jwt.sign({ email, role: "user" }, "your_secret_key", { expiresIn: "1h" });

//         console.log("Login successful for:", email);  // Debugging line

//         return res.status(200).json({ 
//             message: "Login successful", 
//             role: "user", 
//             token, 
//             redirect: "./USHomePage.html" 
//         });

//     } catch (error) {
//         console.error("Server Error:", error);  // Print full error details
//         return res.status(500).json({ error: "Internal Server Error" });
//     }
// };

// module.exports = loginUser;

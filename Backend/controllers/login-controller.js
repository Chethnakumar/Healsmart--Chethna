// const User = require('../model/user-model');
// const bcrypt = require('bcryptjs');

// const loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // 1. Handle admin login (specific check for admin)
//         if (email === 'admin@healsmart.com') { // Check if the user is the admin
//             const user = await User.findOne({ email });

//             if (!user || user.role !== 'admin') {
//                 return res.status(401).send("Unauthorized access.");
//             }

//             // Check if the password matches
//             const validPassword = await bcrypt.compare(password, user.password);
//             if (!validPassword) {
//                 return res.status(401).send("Invalid credentials.");
//             }

//             // Redirect to the admin home page if valid
//             return res.redirect('/admin-home');
//         }

//         // 2. Handle login for doctors or users
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(404).send("User not found.");
//         }

//         // Validate password
//         const validPassword = await bcrypt.compare(password, user.password);
//         if (!validPassword) {
//             return res.status(401).send("Invalid credentials.");
//         }

//         // Redirect based on the user's role
//         if (user.role === 'doctor') {
//             return res.redirect('/doctor-home');  // Redirect to doctor home page
//         } else if (user.role === 'user') {
//             return res.redirect('/user-home');  // Redirect to user home page
//         }

//     } catch (err) {
//         console.error(err);
//         res.status(500).send("Server error.");
//     }
// };

// module.exports = { loginUser };

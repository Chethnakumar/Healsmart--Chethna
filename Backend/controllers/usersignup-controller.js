const bcrypt = require("bcryptjs");
const User = require("../model/usersignup-model");

exports.userSignup = async (req, res) => {
    console.log("Received data:", req.body);
    console.log("Uploaded file:", req.file);

    try {
        const { name, email, phonenumber, age, gender, password } = req.body;

        if (!req.body.name || !req.body.email || !req.body.phonenumber || !req.body.age || !req.body.gender || !req.body.password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        const profilePicturePath = req.file.path;

        const newUser = new User({
            name,
            email,
            phonenumber,
            age,
            gender,
            password,
            profilePicture: profilePicturePath,
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully!", user: newUser });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get Single User
exports.getUser = (req, res) => {
    const userId = req.params.id;

    User.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(user);
        })
        .catch(err => res.status(500).json({ message: "Error fetching user: " + err.message }));
};

// Get All Users
exports.getAllUsers = (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(500).json({ message: "Error fetching users: " + err.message }));
};

// Update User
exports.updateUser = (req, res) => {
    const userId = req.params.id;
     console.log("User ID",userId);
    // Prepare the updated fields
    const updatedFields = {
        name: req.body.name,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        age: req.body.age,
        gender: req.body.gender,
        password: req.body.password, // Update password (ensure hashing in real applications)
        profilePicture: req.file ? req.file.path : undefined // Optional field
    };

    console.log("Updated fields:", updatedFields);
    
    // Find and update the user by ID
    User.findByIdAndUpdate(userId, updatedFields, { new: true }) // `new: true` ensures it returns the updated document
        .then(updatedUser => {
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(updatedUser);
        })
        .catch(err => res.status(500).json({ message: "Error updating user: " + err.message }));
};


// Delete User
exports.deleteUser = (req, res) => {
    const userId = req.params.id;

    User.findByIdAndDelete(userId)
        .then(deletedUser => {
            if (!deletedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json({ message: "User deleted successfully!" });
        })
        .catch(err => res.status(500).json({ message: "Error deleting user: " + err.message }));
};
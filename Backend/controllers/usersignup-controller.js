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
            password: hashedPassword,
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
exports.updateUser = async (req, res) => {
    const userId = req.params.id;

    try {
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update fields only if provided
        if (req.body.name) user.name = req.body.name;
        if (req.body.email) user.email = req.body.email;
        if (req.body.phonenumber) user.phonenumber = req.body.phonenumber;
        if (req.body.age) user.age = req.body.age;
        if (req.body.gender) user.gender = req.body.gender;

        // Handle password update with hashing
        if (req.body.password) {
            user.password = await bcrypt.hash(req.body.password, 10);
        }

        // Handle profile picture update
        if (req.file) {
            user.profilePicture = req.file.path;
        }

        await user.save();
        res.json({ message: "User updated successfully!", user });
    } catch (error) {
        res.status(500).json({ message: "Error updating user: " + error.message });
    }
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


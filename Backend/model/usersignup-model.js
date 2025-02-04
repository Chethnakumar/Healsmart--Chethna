const mongoose = require("mongoose");

const UserSignupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phonenumber: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    password: { type: String, required: true },
    profilePicture: { type: String } // Path to uploaded profile picture
});

const UserSignup = mongoose.models.UserSignup || mongoose.model('UserSignup', UserSignupSchema);
module.exports = UserSignup;

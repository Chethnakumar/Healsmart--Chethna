const mongoose = require('mongoose');
const { type } = require('os');

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "please enter your name"]
        },

        email: {
            type: String,
            required: true
        },

        phonenumber: {
            type: Number,
            required: true
        },

        age: {
            type: Number,
            required: true
        },

        gender: {
            type: String,
            required: true
        },

        createpassword: {
            type: String,
            required: true
        },

        role: {
            type: String,
            required: true
        }
    },

    {
        timestamps: true,
    }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
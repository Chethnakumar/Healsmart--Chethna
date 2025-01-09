const mongoose = require('mongoose');
const { type } = require('os');

const UsersignupSchema = mongoose.Schema(
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
        }
    },

    {
        timestamps: true,
    }
);

const usersignup = mongoose.model("Usersignup", UsersignupSchema);

module.exports = usersignup;
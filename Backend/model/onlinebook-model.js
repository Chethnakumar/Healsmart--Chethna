// onlinebook-model.js

const mongoose = require('mongoose');

// Define the schema for online booking
const onlineBookingSchema = new mongoose.Schema({
    doctor: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    timeSlot: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['booked', 'pending', 'completed'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create a model from the schema
const OnlineBooking = mongoose.model('OnlineBooking', onlineBookingSchema);

module.exports = OnlineBooking;

const mongoose = require('mongoose');

// Define schema for availability
const availabilitySchema = new mongoose.Schema({
    fromDate: {
        type: Date,
        required: true
    },
    tillDate: {
        type: Date,
        required: true
    },
    timeFrom: {
        type: String,
        required: true
    },
    timeTill: {
        type: String,
        required: true
    },
    service: {
        type: String,
        enum: ['online', 'offline'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create model
const Availability = mongoose.model('Availability', availabilitySchema);

module.exports = Availability;

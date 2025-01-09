const mongoose = require('mongoose');

// Define the rejection schema
const rejectionSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true,
    },
    rejectedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true,
    },
    reason: {
        type: String,
        required: true,
    }
});

const Rejection = mongoose.model('Rejection', rejectionSchema);

module.exports = Rejection;

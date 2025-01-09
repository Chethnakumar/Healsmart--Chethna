const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    speciality: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    }
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;

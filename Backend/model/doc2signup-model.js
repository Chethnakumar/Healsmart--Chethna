const mongoose = require('mongoose');

const doc2signupSchema = new mongoose.Schema({
    doctorName: {
        type: String,
        required: true
    },
    registrationNumber: {
        type: String,
        required: true
    },
    registrationYear: {
        type: Date,
        required: true
    },
    degreeCertificate: {
        type: String,
        required: true
    },
    idProof: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Doc2Signup = mongoose.model('Doc2Signup', doc2signupSchema);

module.exports = Doc2Signup;

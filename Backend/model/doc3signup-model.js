const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    accountNumber: {
        type: String,
        required: true,
    },
    ifscCode: {
        type: String,
        required: true,
    },
    bankName: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        required: true,
    },
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;

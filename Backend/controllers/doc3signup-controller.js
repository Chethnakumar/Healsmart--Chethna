const Payment = require('../model/doc3signup-model');

// Handle new payment submission
const addPaymentDetails = async (req, res) => {
    const { accountNumber, ifscCode, bankName, branch } = req.body;

    if (!accountNumber || !ifscCode || !bankName || !branch) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newPayment = new Payment({
            accountNumber,
            ifscCode,
            bankName,
            branch,
        });

        await newPayment.save();
        res.status(201).json({ message: 'Payment details added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get payment details
const getPaymentDetails = async (req, res) => {
    try {
        const paymentDetails = await Payment.find();
        if (!paymentDetails || paymentDetails.length === 0) {
            return res.status(404).json({ message: 'No payment details found' });
        }

        res.status(200).json(paymentDetails);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    addPaymentDetails,
    getPaymentDetails
};
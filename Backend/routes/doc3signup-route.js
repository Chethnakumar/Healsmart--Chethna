const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/doc3signup-controller');

// Add payment details
router.post('/add', paymentController.addPaymentDetails);

// Get payment details
router.get('/details', paymentController.getPaymentDetails);

module.exports = router;

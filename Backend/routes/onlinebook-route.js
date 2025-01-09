// onlinebook-route.js

const express = require('express');
const router = express.Router();
const onlineBookController = require('../controllers/onlinebook-controller');

// Route to create a booking
router.post('/create', onlineBookController.createBooking);

// Route to get all bookings for a user
router.get('/:user/bookings', onlineBookController.getUserBookings);

module.exports = router;

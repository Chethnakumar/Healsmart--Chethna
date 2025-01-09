const express = require('express');
const { getAllReviews, getDoctorReviews, addReview } = require('../controllers/review-controller');

const router = express.Router();

// Route to get all reviews
router.get('/', getAllReviews);

// Route to get reviews for a specific doctor
router.get('/:doctorName', getDoctorReviews);

// Route to add a new review
router.post('/', addReview);

module.exports = router;

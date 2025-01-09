const Review = require('../model/review-model');

// Get all reviews
const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews', error });
    }
};

// Get reviews for a specific doctor
const getDoctorReviews = async (req, res) => {
    const { doctorName } = req.params;
    try {
        const reviews = await Review.find({ doctorName });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching doctor reviews', error });
    }
};

// Add a new review
const addReview = async (req, res) => {
    const { doctorName, star, writereview } = req.body;
    try {
        const newReview = await Review({ doctorName, star, writereview });
        await newReview.save();
        res.status(201).json({ message: 'Review added successfully', review: newReview });
    } catch (error) {
        res.status(500).json({ message: 'Error adding review', error });
    }
};

module.exports = {
    getAllReviews,
    getDoctorReviews,
    addReview,
};

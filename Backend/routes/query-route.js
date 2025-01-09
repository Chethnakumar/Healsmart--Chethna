const express = require('express');
const router = express.Router();
const { createQuery, getAllQueries, getQueryById } = require('../controllers/query-controller');

// Route to get all reviews
router.get('/', getAllQueries);

// Route to get reviews for a specific doctor
router.get('/:doctorName', getQueryById);

// Route to add a new review
router.post('/', createQuery);

module.exports = router;
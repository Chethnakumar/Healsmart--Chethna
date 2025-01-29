const express = require('express');
const router = express.Router();
const { addAvailability, getAvailabilityById, getAllAvailability } = require('../controllers/addavail-controller');

// POST route to add availability
router.post('/add', addAvailability);

router.get('/:id', getAvailabilityById);

router.get('/', getAllAvailability);

module.exports = router;

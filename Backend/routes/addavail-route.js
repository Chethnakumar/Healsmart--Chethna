const express = require('express');
const router = express.Router();
const { addAvailability } = require('../controllers/addavail-controller');

// POST route to add availability
router.post('/add', addAvailability);

module.exports = router;

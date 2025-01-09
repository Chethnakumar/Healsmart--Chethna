const express = require('express');
const router = express.Router();
const docController = require('../controllers/docnearby-controller');

// Get doctors by city
router.get('/city/:city', docController.getDoctorsByCity);

// Add new doctor (This can be used via POST request to add doctors manually)
router.post('/', docController.addDoctor);

module.exports = router;

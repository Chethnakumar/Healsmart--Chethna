const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact-controller');

// Route to handle new contact form submissions
router.post('/contact', contactController.createContact);

// Route to fetch all contact submissions (admin use)
router.get('/contacts', contactController.getContacts);

module.exports = router;

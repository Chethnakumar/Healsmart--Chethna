const express = require('express');
const router = express.Router();
const {
  createOrUpdateDocpro,
  getAllDocpros,
  getDocproById,
  deleteDocproById,
  upload,
} = require('../controllers/docpro-controller'); // Import the functions from the controller

// Create or Update Doctor Profile
router.post('/create-update-docpro', upload.single('profileImage'), createOrUpdateDocpro);

// Get all Doctors
router.get('/docpros', getAllDocpros);

// Get Doctor by ID
router.get('/docpros/:id', getDocproById);

// Delete Doctor by ID
router.delete('/docpros/:id', deleteDocproById);

module.exports = router;

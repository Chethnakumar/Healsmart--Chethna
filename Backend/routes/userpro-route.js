const express = require('express');
const router = express.Router();
const {
  createOrUpdateUserpro,
  getAllUserpros,
  getUserproById,
  deleteUserproById,
  upload,
} = require('../controllers/userpro.controller'); // Import the functions from the controller

// Create or Update User Profile
router.post('/create-update-userpro', upload.single('profileImage'), createOrUpdateUserpro);

// Get all User Profiles
router.get('/userpros', getAllUserpros);

// Get User Profile by ID
router.get('/userpros/:id', getUserproById);

// Delete User Profile by ID
router.delete('/userpros/:id', deleteUserproById);

module.exports = router;

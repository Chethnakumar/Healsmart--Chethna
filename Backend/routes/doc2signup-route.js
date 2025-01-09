const express = require('express');
const router = express.Router();
const {
  createDoc2Signup,
  getAllDoc2Signups,
  getDoc2SignupById,
  deleteDoc2SignupById,
  upload,
} = require('../controllers/doc2signup-controller'); // Import the functions from the controller

// Create Doc2Signup (with file upload)
router.post('/create', upload.fields([
  { name: 'degreeCertificate', maxCount: 1 },
  { name: 'idProof', maxCount: 1 },
]), createDoc2Signup);

// Get all Doc2Signups
router.get('/doc2signups', getAllDoc2Signups);

// Get Doc2Signup by ID
router.get('/doc2signups/:id', getDoc2SignupById);

// Delete Doc2Signup by ID
router.delete('/doc2signups/:id', deleteDoc2SignupById);

module.exports = router;

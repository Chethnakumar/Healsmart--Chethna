const express = require('express');
const { registerDoctor, getAllDoctors, getDoctorById, deleteDoctorById } = require('../controllers/doc1signup-controller');

const router = express.Router();

// Doctor Routes
router.post('/register', registerDoctor);
router.get('/', getAllDoctors);
router.get('/:id', getDoctorById);
router.delete('/:id', deleteDoctorById);

module.exports = router;

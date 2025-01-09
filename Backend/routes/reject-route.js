const express = require('express');
const router = express.Router();
const rejectController = require('../controllers/reject-controller');

// POST route to reject a doctor
router.post('/reject', rejectController.rejectDoctor);

// GET route to fetch all rejections
router.get('/rejections', rejectController.getRejections);

// DELETE route to delete a rejection entry
router.delete('/rejection/:id', rejectController.deleteRejection);

module.exports = router;

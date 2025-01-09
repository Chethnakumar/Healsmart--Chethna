const express = require('express');
const {
    getAllInjuries,
    getInjuryById,
    createInjury,
    deleteInjury,
    getAllActivities,
    getActivityById,
    createActivity,
    deleteActivity,
} = require('../controllers/usprevention-controller');

const router = express.Router();

// Injury routes
router.get('/injuries', getAllInjuries);
router.get('/injuries/:id', getInjuryById);
router.post('/injuries', createInjury);
router.delete('/injuries/:id', deleteInjury);

// Activity routes
router.get('/activities', getAllActivities);
router.get('/activities/:id', getActivityById);
router.post('/activities', createActivity);
router.delete('/activities/:id', deleteActivity);

module.exports = router;

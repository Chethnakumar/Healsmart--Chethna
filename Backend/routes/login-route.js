const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/login-controller');

// POST route for login
router.post('/login', loginUser);

module.exports = router;

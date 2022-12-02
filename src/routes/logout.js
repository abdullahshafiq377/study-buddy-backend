// Import Statements
const express = require('express');
const logoutController = require('../controllers/logoutController');
const router = express.Router();

router.route('/').get(logoutController.handleLogout);

module.exports = router;

// Import Statements
const express = require('express');
const refreshTokenController = require('../controllers/refreshTokenController');
const router = express.Router();

router.route('/').get(refreshTokenController.handleRefreshToken);

module.exports = router;

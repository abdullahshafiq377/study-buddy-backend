
const express = require('express');
const resultController = require('../../controllers/resultController');
const router = express.Router();

// Get Route for sub-admins
// Returns all the sub-admins from the database as response
router
	.route('/')
	.post(resultController.generateResult);
router
	.route('/by-student/:studentId')
	.get(resultController.getAllResultsByStudent);

module.exports = router;

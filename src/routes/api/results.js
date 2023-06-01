
const express = require('express');
const resultController = require('../../controllers/resultController');
const router = express.Router();

router
	.route('/')
	.post(resultController.generateResult);
router
	.route('/by-student/:studentId')
	.get(resultController.getAllResultsByStudent);

router
	.route('/deadline')
	.get(resultController.getResultDeadlines)
	.put(resultController.updateResultDeadlines);

module.exports = router;

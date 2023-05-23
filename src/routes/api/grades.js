const express = require('express');
const gradeController = require('../../controllers/gradeController');
const router = express.Router();

router
	.route('/')
	.get(gradeController.getAllGrades);

router
	.route('/by-student/:studentId')
	.get(gradeController.getGradesByStudent);

router
	.route('/by-section/:sectionId')
	.get(gradeController.getGradesBySection);

router
	.route('/:id')
	.put(gradeController.updateGrade);

module.exports = router;

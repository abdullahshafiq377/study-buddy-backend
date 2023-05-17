const express = require('express');
const assignmentController = require('../../controllers/assignmentController');
const router = express.Router();

router
	.route('/')
	.get(assignmentController.getAllAssignments)
	.post(assignmentController.createNewAssignment);

router
	.route('/:id')
	.get(assignmentController.getAssignmentById)
	.put(assignmentController.updateAssignment)
	.delete(assignmentController.deleteAssignment);

router
	.route('/by-section/:sectionId')
	.get(assignmentController.getAssignmentsBySection);

router
	.route('/submissions')
	.post(assignmentController.createAssignmentSubmission);

router
	.route('/submissions/:assignmentId')
	.get(assignmentController.getAssignmentSubmissions);

module.exports = router;

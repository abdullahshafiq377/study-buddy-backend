// Import Statements
const express = require('express');
const studentController = require('../../controllers/studentController');
const router = express.Router();

// Get Route for sub-admins
// Returns all the sub-admins from the database as response
router
	.route('/')
	.get(studentController.getAllStudents)
	.post(studentController.createNewStudent);

router
	.route('/:id')
	.get(studentController.getStudentById)
	.put(studentController.updateStudent)
	.delete(studentController.deleteStudent);

module.exports = router;

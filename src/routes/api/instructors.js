// Import Statements
const express = require('express');
const instructorController = require('../../controllers/instructorController');
const router = express.Router();

// Get Route for sub-admins
// Returns all the sub-admins from the database as response
router
	.route('/')
	.get(instructorController.getAllInstructors)
	.post(instructorController.createNewInstructor)
	.put(instructorController.updateInstructor)
	.delete(instructorController.deleteInstructor);

router.route('/:id').get(instructorController.getInstructorById);

module.exports = router;

// Import Statements
const express = require('express');
const subAdminController = require('../../controllers/subAdminController');
const router = express.Router();

// Get Route for sub-admins
// Returns all the sub-admins from the database as response
router
	.route('/')
	.get(subAdminController.getAllSubAdmins)
	.post(subAdminController.createNewSubAdmin)
	.put(subAdminController.updateSubAdmin)
	.delete(subAdminController.deleteSubAdmin);

router.route('/:id').get(subAdminController.getSubAdminById);

module.exports = router;

// Import Statements
const express = require('express');
const subAdminController = require('../../controllers/subAdminController');
const instructorController = require("../../controllers/instructorController");
const router = express.Router();

router
	.route('/')
	.get(subAdminController.getAllSubAdmins)
	.post(subAdminController.createNewSubAdmin);

router
	.route('/:id')
	.get(subAdminController.getSubAdminById)
	.delete(subAdminController.deleteSubAdmin)
	.put(subAdminController.updateSubAdmin)
	.patch(subAdminController.updateSubAdminPassword);

router
	.route('/reset-password/:email')
	.patch(subAdminController.resetSubAdminPassword);

module.exports = router;

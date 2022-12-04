// Import Statements
const express = require('express');
const subAdminController = require('../../controllers/subAdminController');
const router = express.Router();

router
	.route('/')
	.get(subAdminController.getAllSubAdmins)
	.post(subAdminController.createNewSubAdmin);

router
	.route('/:id')
	.get(subAdminController.getSubAdminById)
	.delete(subAdminController.deleteSubAdmin)
	.put(subAdminController.updateSubAdmin);

module.exports = router;

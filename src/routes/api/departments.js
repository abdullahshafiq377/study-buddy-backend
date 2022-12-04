// Import Statements
const express = require('express');
const departmentController = require('../../controllers/departmentController');
const router = express.Router();

router
	.route('/')
	.get(departmentController.getAllDepartments)
	.post(departmentController.createNewDepartment);

router
	.route('/:id')
	.get(departmentController.getDepartmentById)
	.delete(departmentController.deleteDepartment)
	.put(departmentController.updateDepartment);

module.exports = router;

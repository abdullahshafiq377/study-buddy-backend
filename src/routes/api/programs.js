// Import Statements
const express = require('express');
const programController = require('../../controllers/programController');
const router = express.Router();

router
	.route('/')
	.get(programController.getAllPrograms)
	.post(programController.createNewProgram);

router
	.route('/:id')
	.get(programController.getProgramById)
	.delete(programController.deleteProgram)
	.put(programController.updateProgram);

module.exports = router;

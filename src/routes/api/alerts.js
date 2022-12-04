// Import Statements
const express = require('express');
const alertController = require('../../controllers/alertController');
const router = express.Router();

// Get Route for sub-admins
// Returns all the sub-admins from the database as response
router
	.route('/')
	.get(alertController.getAllAlerts)
	.post(alertController.createNewAlert)
	.put(alertController.updateAlert);

router
	.route('/:id')
	.get(alertController.getAlertById)
	.delete(alertController.deleteAlert);

module.exports = router;

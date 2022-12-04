// Import Statements
const express = require('express');
const eventController = require('../../controllers/eventController');
const router = express.Router();

router
	.route('/')
	.get(eventController.getAllEvents)
	.post(eventController.createNewEvent);

router
	.route('/:id')
	.get(eventController.getEventById)
	.delete(eventController.deleteEvent)
	.put(eventController.updateEvent);

module.exports = router;

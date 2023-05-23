const express = require('express');
const learningResourceController = require('../../controllers/LearningResourceController');
const router = express.Router();

router
	.route('/')
	.get(learningResourceController.getAllLearningResources)
	.post(learningResourceController.createNewLearningResource);

router
	.route('/:id')
	.delete(learningResourceController.deleteLearningResource);

router
	.route('/by-section/:sectionId')
	.get(learningResourceController.getLearningResourcesBySection);

module.exports = router;

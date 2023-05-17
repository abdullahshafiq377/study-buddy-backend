const express = require('express');
const quizController = require('../../controllers/quizController');
const assignmentController = require('../../controllers/assignmentController');
const router = express.Router();

router
	.route('/')
	.get(quizController.getAllQuizzes)
	.post(quizController.createNewQuiz)
router
	.route('/:id')
	.get(quizController.getQuizById)
	.put(quizController.updateQuiz)
	.delete(quizController.deleteQuiz)
router
	.route('/by-section/:sectionId')
	.get(quizController.getQuizzesBySection);


router
	.route('/submissions')
	.post(quizController.createQuizSubmission);

router
	.route('/submissions/:quizId')
	.get(quizController.getQuizSubmissions);

module.exports = router;

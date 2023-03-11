// Import Statements
const express = require('express');
const courseController = require('../../controllers/courseController');
const router = express.Router();

router
    .route('/')
    .post(courseController.registerCourse)
    .delete(courseController.unregisterCourse);

router
    .route('/unregistered/:stdId')
    .get(courseController.getCoursesForRegistration);

router
    .route('/registered/:stdId')
    .get(courseController.getRegisteredCourses);

module.exports = router;


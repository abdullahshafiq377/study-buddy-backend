// Import Statements
const express = require('express');
const courseController = require('../../controllers/courseController');
const router = express.Router();

router
    .route('/')
    .get(courseController.getAllCourses)
    .post(courseController.createNewCourse);

router
    .route('/:id')
    .get(courseController.getCourseById)
    .delete(courseController.deleteCourse)
    .put(courseController.updateCourse);

router
    .route('/by-department/:departmentId')
    .get(courseController.getCourseByDepartment);


module.exports = router;

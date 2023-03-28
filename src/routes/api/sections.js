const express = require('express');
const router = express.Router();
const sectionController = require('../../controllers/sectionController');

router
    .route('/')
    .get(sectionController.getAllSections)
    .post(sectionController.createNewSection);

router
    .route('/:id')
    .get(sectionController.getSectionById)
    .put(sectionController.updateSection)
    .delete(sectionController.deleteSection);

router
    .route('/by-department/:departmentId')
    .get(sectionController.getSectionsByDepartment);

router
    .route('/assign/:registrationId')
    .patch(sectionController.assignSection);
router
    .route('/unassign/:registrationId')
    .patch(sectionController.unassignSection);

router
    .route('/assigned/:sectionId')
    .get(sectionController.getAssignedStudents);

router
    .route('/unassigned/:courseId')
    .get(sectionController.getUnassignedStudents);


module.exports = router;


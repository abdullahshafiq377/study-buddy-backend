const express = require('express');
const router = express.Router();
const sectionController = require('../../controllers/sectionController');

router
    .route('/')
    .get(sectionController.getAllSections)
    .post(sectionController.createNewSection);

router
    .route('/:id')
    .put(sectionController.updateSection)
    .delete(sectionController.deleteSection);

router
    .route('/:departmentId')
    .get(sectionController.getSectionsByDepartment);

module.exports = router;


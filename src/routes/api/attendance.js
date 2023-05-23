const express = require('express');
const attendanceController = require('../../controllers/attendanceController');
const router = express.Router();

router
	.route('/:id')
	.patch(attendanceController.markAttendance);
router
	.route('/QR')
	.post(attendanceController.markAttendanceByQR);

router
	.route('/by-lecture/:lectureId')
	.get(attendanceController.getAttendanceByLectureId);

router
	.route('/by-student/:studentId')
	.get(attendanceController.getAttendanceByStudent);

router
	.route('/lectures')
	.get(attendanceController.getAllLectures)
	.post(attendanceController.createLecture);

router
	.route('/lectures/:lectureId')
	.get(attendanceController.getLectureById)
	.delete(attendanceController.deleteLecture)

router
	.route('/lectures/by-section/:sectionId')
	.get(attendanceController.getLecturesBySection)



module.exports = router;

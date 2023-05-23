const paraQuery = require('../utils/db');
const {getAssignedStudentsObj} = require('./sectionController');
const mysql = require('mysql2/promise');


const getAllLectures = async (req, res) => {
	try {
		let x = await paraQuery('SELECT * FROM lecture', []);
		console.log(x);
		res.json(x);
	} catch (error) {
		console.log(error);
		res.status(400)
		   .json({error: true});
	}
};
const getLectureById = async (req, res) => {
	try {
		const {lectureId} = req.params;
		let x = await paraQuery('SELECT * FROM lecture WHERE id=?', [lectureId]);
		console.log(x);
		res.json(x);
	} catch (error) {
		console.log(error);
		res.status(400)
		   .json({error: true});
	}
};
const getLecturesBySection = async (req, res) => {
	try {
		const {sectionId} = req.params;
		let x = await paraQuery('SELECT * FROM lecture WHERE section_id=?', [sectionId]);
		console.log(x);
		res.json(x);
	} catch (error) {
		console.log(error);
		res.status(400)
		   .json({error: true});
	}
};
const createLecture = async (req, res) => {
	try {
		const {
			id,
			title,
			startTime,
			endTime,
			date,
			sectionId
		} = req.body;
		let x = await paraQuery('INSERT INTO lecture (id, title, start_time, end_time, date, section_id) VALUES (?, ?, ?, ?, ?, ?)', [
			id,
			title,
			startTime,
			endTime,
			date,
			sectionId
		]);
		await insertAttendance(sectionId, id);
		console.log(x);
		res.json(x);
	} catch (error) {
		console.log(error);
		res.status(400)
		   .json({error: true});
	}
};

const deleteLecture = async (req, res) => {
	try {
		let {lectureId} = req.params;
		
		let x = await paraQuery('DELETE FROM lecture WHERE id=?', [lectureId]);
		let y = await paraQuery('DELETE FROM attendance WHERE lecture_id=?', [lectureId]);
		console.log(x);
		res.status(200).json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({error: true});
	}
};

const insertAttendance = async (sectionId, lectureId) => {
	const students = await getAssignedStudentsObj(sectionId);
	const values = [];
	
	students.map(student => {
		const value = [student.id, lectureId];
		values.push(value);
	})
	console.log("values", values);
	
	const connection = await mysql.createConnection({
		                                                host: process.env.DB_HOST,
		                                                user: process.env.DB_USER,
		                                                password: process.env.DB_PASSWORD,
		                                                database: process.env.DB_NAME,
		                                                
		                                                // timezone: 'utc+5'
	                                                });
	
	let x = await connection.query('INSERT INTO attendance (student_id, lecture_id) VALUES ?', [values]);
	connection.end();
	
}

const getAttendanceByLectureId = async (req, res) => {
	try {
		const {lectureId} = req.params;
		let x = await paraQuery('SELECT attendance.id, student_id, lecture_id, is_present, name AS student_name, session, program_title, reg_num FROM attendance join student s on attendance.student_id = s.id WHERE lecture_id = ?', [lectureId]);
		console.log(x);
		res.json(x);
	} catch (error) {
		console.log(error);
		res.status(400)
		   .json({error: true});
	}
};
const getAttendanceByStudent = async (req, res) => {
	try {
		const {studentId} = req.params;
		let x = await paraQuery('SELECT attendance.id, student_id, lecture_id, is_present, name AS student_name, session, program_title, reg_num FROM attendance join student s on attendance.student_id = s.id WHERE student_id = ?', [studentId]);
		console.log(x);
		res.json(x);
	} catch (error) {
		console.log(error);
		res.status(400)
		   .json({error: true});
	}
};

const markAttendance = async (req, res) => {
	try {
		let {id} = req.params;
		const {isPresent} = req.body;
		console.log(id);
		
		let x = await paraQuery(
			'UPDATE attendance SET  is_present=? WHERE id=?',
			[isPresent, id],
		);
		res.status(200).json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({error: true});
	}
};

const markAttendanceByQR = async (req, res) => {
	try {
		const {studentId, lectureId} = req.body;
		
		let x = await paraQuery(
			'UPDATE attendance SET  is_present=? WHERE lecture_id=? AND student_id = ?',
			[true, lectureId, studentId],
		);
		res.status(200).json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({error: true});
	}
};

module.exports = {
	getAllLectures,
	getLecturesBySection,
	getLectureById,
	createLecture,
	deleteLecture,
	getAttendanceByLectureId,
	getAttendanceByStudent,
	markAttendance,
	markAttendanceByQR
}

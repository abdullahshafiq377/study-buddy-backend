const paraQuery = require('../utils/db');
const {saveFile} = require('../utils/saveFiles');
const mysql = require('mysql2/promise');
const {getAssignedStudentsObj} = require('./sectionController');

const getAllGrades = async (req, res) => {
	try {
		let x = await paraQuery('SELECT * FROM grade', []);
		console.log(x);
		res.json(x);
	} catch (error) {
		console.log(error);
		res.status(400)
		   .json({error: true});
	}
};
const getAllGradesObj = async () => {
	try {
		let x = await paraQuery('SELECT * FROM grade', []);
		console.log(x);
		return x;
	} catch (error) {
		console.log(error);
		return null;
	}
};

const getGradesBySection = async (req, res) => {
	try {
		const {sectionId} = req.params;
		let x = await paraQuery(
			'SELECT grade.id, registration_id, section_id, student_id, a1_total, a1_obt, a2_total, a2_obt, a3_total, a3_obt, a4_total, a4_obt, q1_total, q1_obt, q2_total, q2_obt, q3_total, q3_obt, q4_total, q4_obt, mid_total, mid_obt, terminal_total, terminal_obt, name AS student_name, program_title, session, reg_num FROM grade INNER JOIN student s on grade.student_id = s.id WHERE section_id = ?',
			[sectionId]);
		console.log(x);
		res.json(x);
	} catch (error) {
		console.log(error);
		res.status(400)
		   .json({error: true});
	}
};
const getGradesByStudent = async (req, res) => {
	try {
		const {studentId} = req.params;
		let x = await paraQuery(
			'SELECT grade.id, registration_id, section_id, student_id, a1_total, a1_obt, a2_total, a2_obt, a3_total, a3_obt, a4_total, a4_obt, q1_total, q1_obt, q2_total, q2_obt, q3_total, q3_obt, q4_total, q4_obt, mid_total, mid_obt, terminal_total, terminal_obt, name AS student_name, program_title, session, reg_num FROM grade INNER JOIN student s on grade.student_id = s.id WHERE student_id = ?',
			[studentId]);
		console.log(x);
		res.json(x);
	} catch (error) {
		console.log(error);
		res.status(400)
		   .json({error: true});
	}
};

const updateGrade = async (req, res) => {
	try {
		const connection = await mysql.createConnection({
			                                                host: process.env.DB_HOST,
			                                                user: process.env.DB_USER,
			                                                password: process.env.DB_PASSWORD,
			                                                database: process.env.DB_NAME,
		                                                });
		let {values, totalMarks} = req.body;
		
		const dbValues = [];
		let type = '';
		
		Object.keys(values)
		      .forEach(function (key, index) {
			      console.log(values[key]);
			      type = values[key].type;
			      dbValues.push([values[key].id, totalMarks, values[key].marksObt]);
		      });
		
		console.log(dbValues, type);
		
		let x;
		
		switch (type) {
			case 'assignment1':
				x = await connection.query(
					'INSERT INTO grade (id, a1_total, a1_obt) VALUES ? ON DUPLICATE KEY UPDATE a1_total = VALUES(a1_total), a1_obt = VALUES(a1_obt);',
					[dbValues]);
				break;
			case 'assignment2':
				x = await connection.query(
					'INSERT INTO grade (id, a2_total, a2_obt) VALUES ? ON DUPLICATE KEY UPDATE a2_total = VALUES(a2_total), a2_obt = VALUES(a2_obt);',
					[dbValues]);
				break;
				case 'assignment3':
				x = await connection.query(
					'INSERT INTO grade (id, a3_total, a3_obt) VALUES ? ON DUPLICATE KEY UPDATE a3_total = VALUES(a3_total), a3_obt = VALUES(a3_obt);',
					[dbValues]);
				break;
				case 'assignment4':
				x = await connection.query(
					'INSERT INTO grade (id, a4_total, a4_obt) VALUES ? ON DUPLICATE KEY UPDATE a4_total = VALUES(a4_total), a4_obt = VALUES(a4_obt);',
					[dbValues]);
				break;
		}
		res.json(x);
		
		// console.log(req.body);
		// let x = await paraQuery(
		// 	'UPDATE grade SET a1_total = ?, a1_obt = ?, a2_total = ?, a2_obt = ?, a3_total = ?, a3_obt = ?, a4_total
		// = ?, a4_obt = ?, q1_total = ?, q1_obt = ?, q2_total = ?, q2_obt = ?, q3_total = ?, q3_obt = ?, q4_total = ?,
		// q4_obt = ?, mid_total = ?, mid_obt = ?, terminal_total = ?, terminal_obt = ? WHERE id = ?;', [ a1.total,
		// a1.obtained, a2.total, a2.obtained, a3.total, a3.obtained, a4.total, a4.obtained, q1.total, q1.obtained,
		// q2.total, q2.obtained, q3.total, q3.obtained, q4.total, q4.obtained, mid.total, mid.obtained,
		// terminal.total, terminal.obtained, id, ], ); res.status(200) .json(x);
	} catch
		(error) {
		console.log(error);
		res.status(400)
		   .json({error: true});
	}
};


module.exports = {getAllGrades, getAllGradesObj, getGradesBySection, getGradesByStudent, updateGrade,};

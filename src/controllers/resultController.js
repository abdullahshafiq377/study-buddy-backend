const paraQuery = require('../utils/db');
const gradeController = require('./gradeController');
const {getAllRegistrationsObj} = require('./courseController');
const {calculateResult} = require('../utils/formula');
const mysql = require('mysql2/promise');
const {v4: uuidv4} = require('uuid')

const getAllResults = async () => {
	try {
		let x = await paraQuery('SELECT * FROM result', []);
		console.log(x);
		return x;
	} catch (error) {
		console.log(error);
		return null;
	}
};
const getAllResultsByStudent = async (req, res) => {
	try {
		const {studentId} = req.params;
		let x = await paraQuery('SELECT result.id, student_id, course_id, obtained_marks, gp, session, grade, title, credit_hours, course_code FROM result INNER JOIN course c on result.course_id = c.id WHERE student_id = ?', [studentId]);
		console.log(x);
		res.status(200)
		   .json(x);
	} catch (error) {
		console.log(error);
		res.status(400)
		   .json({error: true});
	}
};
const generateResult = async (req, res) => {
	try {
		const results = await getAllResults();
		const grades = await gradeController.getAllGradesObj();
		const registrations = await paraQuery('SELECT * FROM registration', []);
		const courses = await paraQuery('SELECT * FROM course', []);
		
		
		let calculatedResults = [];
		
		results.map(result => {
			let sectionId, selectedCourse, session;
			courses.map(course => {
				if (course.id === result.course_id) {
					selectedCourse = course;
				}
			});
			registrations.map(registration => {
				if (result.student_id === registration.student_id && result.course_id === registration.course_id) {
					sectionId = registration.section_id;
					session = registration.session;
				}
			});
			grades.map(grade => {
				if (grade.section_id === sectionId && grade.student_id === result.student_id) {
					
					if (grade.a1_total && grade.a2_total && grade.a3_total && grade.a4_total && grade.q1_total && grade.q2_total && grade.q3_total && grade.q4_total && grade.mid_total && grade.terminal_total) {
						
						let assignmentTotal = parseInt(grade.a1_total) + parseInt(grade.a2_total) + parseInt(
							grade.a3_total) + parseInt(grade.a4_total);
						let assignmentObtTotal = parseInt(grade.a1_obt) + parseInt(grade.a2_obt) + parseInt(
							grade.a3_obt) + parseInt(grade.a4_obt);
						let assignmentAvg = calculateResult(10, assignmentObtTotal, assignmentTotal);
						
						let quizTotal = parseInt(grade.q1_total) + parseInt(grade.q2_total) + parseInt(
							grade.q3_total) + parseInt(grade.q4_total);
						let quizObtTotal = parseInt(grade.q1_obt) + parseInt(grade.q2_obt) + parseInt(
							grade.q3_obt) + parseInt(grade.q4_obt);
						let quizAvg = calculateResult(15, quizObtTotal, quizTotal);
						
						let midAvg = calculateResult(25, grade.mid_obt, grade.mid_total);
						
						let terminalAvg = calculateResult(50, grade.terminal_obt, grade.terminal_total);
						
						let totalObtained = assignmentAvg + quizAvg + midAvg + terminalAvg;
						
						console.log('assignment Avg', assignmentAvg);
						console.log('quiz Avg', quizAvg);
						console.log('mid Avg', midAvg);
						console.log('terminal Avg', terminalAvg);
						console.log('total', totalObtained);
						let finalResult = {
							id: result.id,
							session,
							obtMarks: totalObtained,
							gp: 0,
							grade: 'F'
						};
						if (totalObtained >= 90 && totalObtained <= 100) {
							finalResult.gp = 4.0;
							finalResult.grade = 'A';
						}
						else if (totalObtained >= 85 && totalObtained <= 89.99) {
							finalResult.gp = 3.7;
							finalResult.grade = 'A-';
						}
						else if (totalObtained >= 80 && totalObtained <= 84.99) {
							finalResult.gp = 3.3;
							finalResult.grade = 'B+';
						}
						else if (totalObtained >= 75 && totalObtained <= 79.99) {
							finalResult.gp = 3.0;
							finalResult.grade = 'B';
						}
						else if (totalObtained >= 70 && totalObtained <= 74.99) {
							finalResult.gp = 2.7;
							finalResult.grade = 'B-';
						}
						else if (totalObtained >= 65 && totalObtained <= 69.99) {
							finalResult.gp = 2.3;
							finalResult.grade = 'C+';
						}
						else if (totalObtained >= 60 && totalObtained <= 64.99) {
							finalResult.gp = 2.0;
							finalResult.grade = 'C';
						}
						else if (totalObtained >= 55 && totalObtained <= 59.99) {
							finalResult.gp = 1.7;
							finalResult.grade = 'C-';
						}
						else if (totalObtained >= 50 && totalObtained <= 54.99) {
							finalResult.gp = 1.3;
							finalResult.grade = 'D';
						}
						else if (totalObtained >= 0 && totalObtained <= 49.99) {
							finalResult.gp = 0.0;
							finalResult.grade = 'F'
						}
						// console.log('final result', finalResult);
						calculatedResults.push(finalResult);
					}
				}
			});
		});
		
		console.log('calculated Results', calculatedResults);
		const values = [];
		calculatedResults.map(r => {
		let value = [r.id, r.obtMarks, r.gp, r.session, r.grade];
		values.push(value);
		})
		const connection = await mysql.createConnection({
			                                                host: process.env.DB_HOST,
			                                                user: process.env.DB_USER,
			                                                password: process.env.DB_PASSWORD,
			                                                database: process.env.DB_NAME,
		                                                });
		
		let x = await connection.query('INSERT INTO result (id, obtained_marks, gp, session, grade) VALUES ? ON DUPLICATE KEY UPDATE obtained_marks = VALUES(obtained_marks), gp = VALUES(gp), session = VALUES(session), grade = VALUES(grade);', [values]);
		connection.end();
		// get all results
		// getAllGrades
		// get all registrations to check course id
		res.json(x);
	} catch (error) {
		console.log(error);
		res.status(400)
		   .json({error: true});
	}
};
const createNewResult = async (studentId, courseId) => {
	try {
		const id = uuidv4();
		let x = await paraQuery('INSERT INTO result (id, student_id, course_id) VALUES (?, ?, ?)', [id,studentId, courseId]);
		console.log(x);
		return x;
	} catch (error) {
		console.log(error);
		return null;
	}
};

const deleteResult = async (studentId, courseId) => {
	try {
		let x = await paraQuery('DELETE FROM result WHERE student_id=? AND course_id=?', [studentId, courseId]);
		console.log(x);
		return x;
	} catch (error) {
		console.log(error);
		return null;
	}
};

module.exports = {createNewResult, deleteResult, generateResult, getAllResultsByStudent};

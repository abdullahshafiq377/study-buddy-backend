const paraQuery = require('../utils/db');
const {saveFile} = require('../utils/saveFiles');

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
		let x = await paraQuery('SELECT grade.id, registration_id, section_id, student_id, a1_total, a1_obt, a2_total, a2_obt, a3_total, a3_obt, a4_total, a4_obt, q1_total, q1_obt, q2_total, q2_obt, q3_total, q3_obt, q4_total, q4_obt, mid_total, mid_obt, terminal_total, terminal_obt, name AS student_name, program_title, session, reg_num FROM grade INNER JOIN student s on grade.student_id = s.id WHERE section_id = ?', [sectionId]);
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
		let x = await paraQuery('SELECT grade.id, registration_id, section_id, student_id, a1_total, a1_obt, a2_total, a2_obt, a3_total, a3_obt, a4_total, a4_obt, q1_total, q1_obt, q2_total, q2_obt, q3_total, q3_obt, q4_total, q4_obt, mid_total, mid_obt, terminal_total, terminal_obt, name AS student_name, program_title, session, reg_num FROM grade INNER JOIN student s on grade.student_id = s.id WHERE student_id = ?', [studentId]);
		console.log(x);
		res.json(x);
	} catch (error) {
		console.log(error);
		res.status(400)
		   .json({error: true});
	}
};


const createNewGrade = async (studentId, sectionId, registrationId) => {
	try {
		let x = await paraQuery(
			'INSERT INTO grade (student_id, section_id, registration_id) VALUES (?, ?, ?)',
			[
				studentId,
				sectionId,
				registrationId
			],
		);
		return x;
	} catch (error) {
		console.log(error);
		return null;
	}
};

const updateGrade = async (req, res) => {
	try {
		let {
			a1,
			a2,
			a3,
			a4,
			q1,
			q2,
			q3,
			q4,
			mid,
			terminal
		} = req.body;
		let {id} = req.params;
		console.log(req.body);
		let x = await paraQuery(
			'UPDATE grade SET a1_total = ?, a1_obt = ?, a2_total = ?, a2_obt = ?, a3_total = ?, a3_obt = ?, a4_total = ?, a4_obt = ?, q1_total = ?, q1_obt = ?, q2_total = ?, q2_obt = ?, q3_total = ?, q3_obt = ?, q4_total = ?, q4_obt = ?, mid_total = ?, mid_obt = ?, terminal_total = ?, terminal_obt = ? WHERE id = ?;',
			[
				a1.total,
				a1.obtained,
				a2.total,
				a2.obtained,
				a3.total,
				a3.obtained,
				a4.total,
				a4.obtained,
				q1.total,
				q1.obtained,
				q2.total,
				q2.obtained,
				q3.total,
				q3.obtained,
				q4.total,
				q4.obtained,
				mid.total,
				mid.obtained,
				terminal.total,
				terminal.obtained,
				id,
			],
		);
		res.status(200)
		   .json(x);
	} catch
		(error) {
		console.log(error);
		res.status(400)
		   .json({error: true});
	}
};

const deleteGrade = async (registrationId, studentId) => {
	try {
		let x = await paraQuery('DELETE FROM grade WHERE student_id=? AND registration_id=?', [studentId, registrationId]);
		console.log(x);
		return x;
	} catch (error) {
		console.log(error);
		return null;
	}
};


module.exports = {getAllGrades,getAllGradesObj, getGradesBySection, getGradesByStudent, createNewGrade, updateGrade, deleteGrade};

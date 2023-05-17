const paraQuery = require('../utils/db');
const {saveFile} = require('../utils/saveFiles');
const getPasswordHash = require('../utils/passwordHash');

const getAllAssignments = async (req, res) => {
	try {
		let x = await paraQuery('SELECT * FROM assignment', []);
		console.log(x);
		res.json(x);
	} catch (error) {
		console.log(error);
		res.status(400)
		   .json({error: true});
	}
};

const getAssignmentById = async (req, res) => {

};

const getAssignmentsBySection = async (req, res) => {
	try {
		const {sectionId} = req.params;
		let x = await paraQuery('SELECT * FROM assignment WHERE section_id = ?', [sectionId]);
		console.log(x);
		res.json(x);
	} catch (error) {
		console.log(error);
		res.status(400)
		   .json({error: true});
	}
};


const createNewAssignment = async (req, res) => {
	try {
		let {
			title,
			sectionId,
			startTime,
			startDate,
			endTime,
			endDate,
			instructions,
			totalMarks,
		} = req.body;
		
		let filePath = null;
		let fileName = null;
		if (req.files) {
			let {file} = req.files;
			console.log(file);
			fileName = file.name;
			filePath = await saveFile(file);
		}
		console.log(filePath, fileName);
		let x = await paraQuery(
			'INSERT INTO assignment (title, section_id, start_time, start_date, end_time, end_date, instructions, total_marks, file_name, file_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
			[
				title,
				sectionId,
				startTime,
				startDate,
				endTime,
				endDate,
				instructions,
				totalMarks,
				fileName,
				filePath
			],
		);
		res.status(200)
		   .json(x);
	} catch (error) {
		console.log(error);
		res.status(400)
		   .json({error: true});
	}
};

const updateAssignment = async (req, res) => {
	try {
		let {
			title,
			sectionId,
			startTime,
			startDate,
			endTime,
			endDate,
			instructions,
			totalMarks,
		} = req.body;
		let {id} = req.params;
		let filePath = null;
		let fileName = null;
		if (req.files) {
			let {file} = req.files;
			console.log(file);
			fileName = file.name;
			filePath = await saveFile(file);
		}
		
		let x = await paraQuery(
			'UPDATE assignment SET title = ?, section_id = ?, start_time = ?, start_date = ?, end_time = ?, end_date = ?, instructions = ?, total_marks = ?, file_name = ?, file_path = ? WHERE id = ?;',
			[
				title,
				sectionId,
				startTime,
				startDate,
				endTime,
				endDate,
				instructions,
				totalMarks,
				fileName,
				filePath,
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
const deleteAssignment = async (req, res) => {
	try {
		let {id} = req.params;
		
		let x = await paraQuery('DELETE FROM assignment WHERE id=?', [id]);
		console.log(x);
		res.status(200)
		   .json(x);
	} catch (error) {
		console.log(error);
		res.status(400)
		   .json({error: true});
	}
};


const getAssignmentSubmissions = async (req, res) => {
	try {
		const {assignmentId} = req.params;
		let x = await paraQuery('SELECT assignment_submission.id, assignment_id, student_id, file_name, file_path, name AS student_name, program_title, session, reg_num FROM assignment_submission INNER JOIN student s on assignment_submission.student_id = s.id WHERE assignment_id = ?', [assignmentId]);
		console.log(x);
		res.json(x);
	} catch (error) {
		console.log(error);
		res.status(400)
		   .json({error: true});
	}
};

const createAssignmentSubmission = async (req, res) => {
	try {
		
		let {studentId, assignmentId} = req.body;
		
		let filePath = null;
		let fileName = null;
		if (req.files) {
			let {file} = req.files;
			console.log(file);
			fileName = file.name;
			filePath = await saveFile(file);
		}
		console.log(filePath, fileName);
		let x = await paraQuery(
			'INSERT INTO assignment_submission (assignment_id, student_id, file_name, file_path) VALUES (?, ?, ?, ?)',
			[
				assignmentId,
				studentId,
				fileName,
				filePath
			],
		);
		res.status(200)
		   .json(x);
	} catch (error) {
		console.log(error);
		res.status(400)
		   .json({error: true});
	}
};

module.exports = {
	getAllAssignments,
	getAssignmentById,
	getAssignmentsBySection,
	createNewAssignment,
	updateAssignment,
	deleteAssignment,
	getAssignmentSubmissions,
	createAssignmentSubmission,
};

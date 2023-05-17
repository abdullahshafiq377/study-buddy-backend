const paraQuery = require('../utils/db');
const {saveFile} = require('../utils/saveFiles');
const getPasswordHash = require('../utils/passwordHash');

const getAllQuizzes = async (req, res) => {
	try {
		let x = await paraQuery('SELECT * FROM quiz', []);
		console.log(x);
		res.json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({error: true});
	}
};

const getQuizById = async (req, res) => {

}

const getQuizzesBySection = async (req, res) => {
	try {
		const {sectionId} = req.params;
		let x = await paraQuery('SELECT * FROM quiz WHERE section_id = ?', [sectionId]);
		console.log(x);
		res.json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({error: true});
	}
};


const createNewQuiz = async (req, res) => {
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
			console.log(file)
			fileName = file.name;
			filePath= await saveFile(file);
		}
		console.log(filePath, fileName);
		let x = await paraQuery(
			'INSERT INTO quiz (title, section_id, start_time, start_date, end_time, end_date, instructions, total_marks, file_name, file_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
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
		res.status(200).json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({error: true});
	}
};

const updateQuiz = async (req, res) => {
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
			console.log(file)
			fileName = file.name;
			filePath= await saveFile(file);
		}
		
		let x = await paraQuery(
			'UPDATE quiz SET title = ?, section_id = ?, start_time = ?, start_date = ?, end_time = ?, end_date = ?, instructions = ?, total_marks = ?, file_name = ?, file_path = ? WHERE id = ?;',
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
}
const deleteQuiz = async (req, res) => {
	try {
		let {id} = req.params;
		
		let x = await paraQuery('DELETE FROM quiz WHERE id=?', [id]);
		console.log(x);
		res.status(200).json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({error: true});
	}
}


const getQuizSubmissions = async (req, res) => {
	try {
		const {quizId} = req.params;
		let x = await paraQuery('SELECT quiz_submission.id, quiz_id, student_id, file_name, file_path, name AS student_name, program_title, session, reg_num FROM quiz_submission INNER JOIN student s on quiz_submission.student_id = s.id WHERE quiz_id = ?', [quizId]);
		console.log(x);
		res.json(x);
	} catch (error) {
		console.log(error);
		res.status(400)
		   .json({error: true});
	}
};

const createQuizSubmission = async (req, res) => {
	try {
		
		let {studentId, quizId} = req.body;
		
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
			'INSERT INTO quiz_submission (quiz_id, student_id, file_name, file_path) VALUES (?, ?, ?, ?)',
			[
				quizId,
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
	getAllQuizzes,
	getQuizById,
	getQuizzesBySection,
	createNewQuiz,
	updateQuiz,
	deleteQuiz,
	getQuizSubmissions,
	createQuizSubmission
}

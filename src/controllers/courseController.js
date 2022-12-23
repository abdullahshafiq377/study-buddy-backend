const paraQuery = require('../utils/db');

const getAllCourses = async (req, res) => {
	try {
		let x = await paraQuery('SELECT * FROM course', []);
		console.log(x);
		res.json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: true });
	}
};

const getCourseById = async (req, res) => {
	try {
		let { id } = req.params;

		let x = await paraQuery('SELECT * FROM course WHERE id=?', [id]);
		console.log(x);
		res.json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: true });
	}
};

const createNewCourse = async (req, res) => {
	try {
		let {
			title,
			credit_hours,
			department_id,
			program_id,
			pre_reqs,
			min_semester,
			offered,
			course_code,
			description,
		} = req.body;

		let x = await paraQuery(
			'INSERT INTO course (title, credit_hours, department_id, program_id, pre_reqs, min_semester, offered, course_code, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
			[
				title,
				credit_hours,
				department_id,
				program_id,
				pre_reqs,
				min_semester,
				offered,
				course_code,
				description,
			],
		);
		res.status(200).json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: true });
	}
};

const deleteCourse = async (req, res) => {
	try {
		let { id } = req.params;

		let x = await paraQuery('DELETE FROM course WHERE id=?', [id]);
		console.log(x);
		res.status(200).json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: true });
	}
};

const updateCourse = async (req, res) => {
	try {
		let {
			title,
			credit_hours,
			department_id,
			program_id,
			pre_reqs,
			min_semester,
			offered,
			course_code,
			description,
		} = req.body;
		let { id } = req.params;

		let x = await paraQuery(
			'UPDATE course SET title=?, credit_hours=?, department_id=?, program_id=?, pre_reqs=?, min_semester=?, offered=?, course_code=?, description=? WHERE id=?',
			[
				title,
				credit_hours,
				department_id,
				program_id,
				pre_reqs,
				min_semester,
				offered,
				course_code,
				description,
				id,
			],
		);
		res.status(200).json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: true });
	}
};

module.exports = {
	getAllCourses,
	getCourseById,
	createNewCourse,
	updateCourse,
	deleteCourse,
};

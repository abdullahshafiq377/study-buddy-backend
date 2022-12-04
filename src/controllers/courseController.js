const paraQuery = require('../utils/db');

const getAllCourses = async (req, res) => {
	let x = await paraQuery('SELECT * FROM course', []);
	console.log(x);
	res.json(x);
};

const getCourseById = async (req, res) => {
	let x = await paraQuery('SELECT * FROM course WHERE id=?', [req.params.id]);
	console.log(x);
	res.json(x);
};

const createNewCourse = async (req, res) => {
	let b = req.body;
	let x = await paraQuery(
		'INSERT INTO course (title, credit_hours, department_id, program_id, pre_reqs, min_semester, offered, course_code, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
		[
			b.title,
			b.credit_hours,
			b.department_id,
			b.program_id,
			b.pre_reqs,
			b.min_semester,
			b.offered,
			b.course_code,
			b.description,
		],
	);
	res.status(200).json(x);
};

const deleteCourse = async (req, res) => {
	let x = await paraQuery('DELETE FROM course WHERE id=?', [req.params.id]);
	console.log(x);
	res.json(x);
};

const updateCourse = async (req, res) => {
	let b = req.body;
	let x = await paraQuery(
		'UPDATE course SET title=?, credit_hours=?, department_id=?, program_id=?, pre_reqs=?, min_semester=?, offered=?, course_code=?, description=? WHERE id=?',
		[
			b.title,
			b.credit_hours,
			b.department_id,
			b.program_id,
			b.pre_reqs,
			b.min_semester,
			b.offered,
			b.course_code,
			b.description,
			rea.params.id,
		],
	);
	res.status(200).json(x);
};

module.exports = {
	getAllCourses,
	getCourseById,
	createNewCourse,
	updateCourse,
	deleteCourse,
};

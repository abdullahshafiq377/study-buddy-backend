const paraQuery = require('../utils/db');
const getPasswordHash = require('./../utils/passwordHash');

const getAllStudents = async (req, res) => {
	let x = await paraQuery('SELECT * FROM student', []);
	console.log(x);
	res.json(x);
};

const getStudentById = async (req, res) => {
	let x = await paraQuery('SELECT * FROM student WHERE id=?', [
		req.params.id,
	]);
	console.log(x);
	res.json(x);
};

const createNewStudent = async (req, res) => {
	let b = req.body;
	let password = getPasswordHash(process.env.DEFAULT_PASSWORD);
	let x = await paraQuery(
		'INSERT INTO student (name, f_name, dob, gender, nationality, contact, email, image,department_id, password, program_id, program_title, session, reg_num) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
		[
			b.name,
			b.f_name,
			b.dob,
			b.gender,
			b.nationality,
			b.contact,
			b.email,
			b.image,
			b.department_id,
			password,
			b.program_id,
			b.program_title,
			b.session,
			b.reg_num,
		],
	);
	res.status(200).json(x);
};

const deleteStudent = async (req, res) => {
	let x = await paraQuery('DELETE FROM student WHERE id=?', [req.params.id]);
	console.log(x);
	res.json(x);
};

const updateStudent = async (req, res) => {
	let b = req.body;
	let x = await paraQuery(
		'UPDATE student SET name=?, f_name=?, dob=?, gender=?, nationality=?, contact=?, email=?, image=?,department_id=?, program_id=?, program_title=?, session=?, reg_num=? WHERE id=?',
		[
			b.name,
			b.f_name,
			b.dob,
			b.gender,
			b.nationality,
			b.contact,
			b.email,
			b.image,
			b.department_id,
			b.program_id,
			b.program_title,
			b.session,
			b.reg_num,
			req.params.id,
		],
	);
	res.status(200).json(x);
};

const getStudentForAuth = async (email) => {
	let x = await paraQuery('SELECT * FROM student WHERE email=?', [email]);
	// if (!x.length) {
	// 	return null;
	// }
	return x;
};

const addRefreshTokenToStudent = async (id, refreshToken) => {
	let x = await paraQuery('UPDATE student SET refresh_token=? WHERE id=?', [
		refreshToken,
		id,
	]);

	return x;
};
const getStudentByToken = async (token) => {
	let x = await paraQuery('SELECT * FROM student WHERE refresh_token=?', [
		token,
	]);
	// if (!x.length) {
	// 	return null;
	// }
	return x;
};

module.exports = {
	getAllStudents,
	getStudentById,
	getStudentForAuth,
	getStudentByToken,
	addRefreshTokenToStudent,
	createNewStudent,
	updateStudent,
	deleteStudent,
};

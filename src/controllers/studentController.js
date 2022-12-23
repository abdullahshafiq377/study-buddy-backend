const paraQuery = require('../utils/db');
require('dotenv').config();
const getPasswordHash = require('./../utils/passwordHash');

const getAllStudents = async (req, res) => {
	try {
		let x = await paraQuery('SELECT * FROM student', []);
		console.log(x);
		res.json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: true });
	}
};

const getStudentById = async (req, res) => {
	try {
		let { id } = req.params;

		let x = await paraQuery('SELECT * FROM student WHERE id=?', [id]);
		console.log(x);
		res.json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: true });
	}
};

const createNewStudent = async (req, res) => {
	try {
		let {
			name,
			f_name,
			dob,
			gender,
			nationality,
			contact,
			email,
			image,
			department_id,
			program_id,
			program_title,
			session,
			reg_num,
		} = req.body;
		let password = await getPasswordHash(process.env.DEFAULT_PASSWORD);

		let x = await paraQuery(
			'INSERT INTO student (name, f_name, dob, gender, nationality, contact, email, image,department_id, password, program_id, program_title, session, reg_num) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
			[
				name,
				f_name,
				dob,
				gender,
				nationality,
				contact,
				email,
				image,
				department_id,
				password,
				program_id,
				program_title,
				session,
				reg_num,
			],
		);
		res.status(200).json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: true });
	}
};

const deleteStudent = async (req, res) => {
	try {
		let { id } = req.params;

		let x = await paraQuery('DELETE FROM student WHERE id=?', [id]);
		console.log(x);
		res.status(200).json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: true });
	}
};

const updateStudent = async (req, res) => {
	try {
		let {
			name,
			f_name,
			dob,
			gender,
			nationality,
			contact,
			email,
			image,
			department_id,
			program_id,
			program_title,
			session,
			reg_num,
		} = req.body;
		let { id } = req.params;

		let x = await paraQuery(
			'UPDATE student SET name=?, f_name=?, dob=?, gender=?, nationality=?, contact=?, email=?, image=?,department_id=?, program_id=?, program_title=?, session=?, reg_num=? WHERE id=?',
			[
				name,
				f_name,
				dob,
				gender,
				nationality,
				contact,
				email,
				image,
				department_id,
				program_id,
				program_title,
				session,
				reg_num,
				id,
			],
		);
		res.status(200).json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: true });
	}
};

const getStudentForAuth = async (email) => {
	try {
		let x = await paraQuery('SELECT * FROM student WHERE email=?', [email]);
		// if (!x.length) {
		// 	return null;
		// }
		return x;
	} catch (error) {
		console.log(error);
		return null;
	}
};

const addRefreshTokenToStudent = async (id, refreshToken) => {
	try {
		let x = await paraQuery(
			'UPDATE student SET refresh_token=? WHERE id=?',
			[refreshToken, id],
		);

		return x;
	} catch (error) {
		console.log(error);
		return null;
	}
};
const getStudentByToken = async (token) => {
	try {
		let x = await paraQuery('SELECT * FROM student WHERE refresh_token=?', [
			token,
		]);
		// if (!x.length) {
		// 	return null;
		// }
		return x;
	} catch (error) {
		console.log(error);
		return null;
	}
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

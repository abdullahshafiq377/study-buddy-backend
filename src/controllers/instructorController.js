const paraQuery = require('../utils/db');
require('dotenv').config();
const getPasswordHash = require('./../utils/passwordHash');

const getAllInstructors = async (req, res) => {
	try {
		let x = await paraQuery('SELECT * FROM instructor', []);
		console.log(x);
		res.json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: true });
	}
};

const getInstructorById = async (req, res) => {
	try {
		let { id } = req.params;

		let x = await paraQuery('SELECT * FROM instructor WHERE id=?', [id]);
		console.log(x);
		res.json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: true });
	}
};
const getInstructorByDepartment = async (req, res) => {
	try {
		let { departmentId } = req.params;

		let x = await paraQuery('SELECT * FROM instructor WHERE department_id=?', [departmentId]);
		console.log(x);
		res.json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: true });
	}
};

const createNewInstructor = async (req, res) => {
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
		} = req.body;
		let password = await getPasswordHash(process.env.DEFAULT_PASSWORD);

		let x = await paraQuery(
			'INSERT INTO instructor (name, f_name, dob, gender, nationality, contact, email, image, department_id, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
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
			],
		);
		res.status(200).json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: true });
	}
};

const deleteInstructor = async (req, res) => {
	try {
		let { id } = req.params;

		let x = await paraQuery('DELETE FROM instructor WHERE id=?', [id]);
		console.log(x);
		res.status(200).json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: true });
	}
};

const updateInstructor = async (req, res) => {
	try {
		let { id } = req.params;

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
		} = req.body;
		let x = await paraQuery(
			'UPDATE instructor SET name=?, f_name=?, dob=?, gender=?, nationality=?, contact=?, email=?, image=?, department_id=? WHERE id=?',
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
				id,
			],
		);
		res.status(200).json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: true });
	}
};

const updateInstructorPassword = async (req, res) => {
	try {
		let {password} = req.body;
		let { id } = req.params;
		let passwordHash = await getPasswordHash(password);

		let x = await paraQuery(
			'UPDATE instructor SET password = ? WHERE id = ?;',
			[
				passwordHash,
				id,
			],
		);
		res.status(200).json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: true });
	}
};

const resetInstructorPassword = async (req, res) => {
	try {
		let {email} = req.params;
		let password = await getPasswordHash(process.env.DEFAULT_PASSWORD);

		let x = await paraQuery(
			'UPDATE instructor SET password = ? WHERE email = ?',
			[
				password,
				email,
			],
		);
		res.status(200).json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: true });
	}
};

const getInstructorForAuth = async (email) => {
	try {
		let x = await paraQuery('SELECT * FROM instructor WHERE email=?', [
			email,
		]);

		return x;
	} catch (error) {
		console.log(error);
		return null;
	}
};

const addRefreshTokenToInstructor = async (id, refreshToken) => {
	try {
		let x = await paraQuery(
			'UPDATE instructor SET refresh_token=? WHERE id=?',
			[refreshToken, id],
		);

		return x;
	} catch (error) {
		console.log(error);
		return null;
	}
};
const getInstructorByToken = async (token) => {
	try {
		let x = await paraQuery(
			'SELECT * FROM instructor WHERE refresh_token=?',
			[token],
		);
		return x;
	} catch (error) {
		console.log(error);
		return null;
	}
};

module.exports = {
	getAllInstructors,
	getInstructorById,
	getInstructorByDepartment,
	getInstructorForAuth,
	getInstructorByToken,
	addRefreshTokenToInstructor,
	createNewInstructor,
	updateInstructor,
	updateInstructorPassword,
	deleteInstructor,
	resetInstructorPassword,
};

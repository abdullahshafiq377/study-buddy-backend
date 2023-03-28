const paraQuery = require('../utils/db');
require('dotenv').config();
const getPasswordHash = require('./../utils/passwordHash');

const getAllSubAdmins = async (req, res) => {
	try {
		let x = await paraQuery('SELECT * FROM sub_admin', []);
		console.log(x);
		res.json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: true });
	}
};

const getSubAdminById = async (req, res) => {
	try {
		let { id } = req.params;

		let x = await paraQuery('SELECT * FROM sub_admin WHERE id=?', [id]);
		console.log(x);
		res.json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: true });
	}
};

const createNewSubAdmin = async (req, res) => {
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
			'INSERT INTO sub_admin (name, f_name, dob, gender, nationality, contact, email, image, department_id, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
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

const deleteSubAdmin = async (req, res) => {
	try {
		let { id } = req.params;

		let x = await paraQuery('DELETE FROM sub_admin WHERE id=?', [id]);
		console.log(x);
		res.json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: true });
	}
};

const updateSubAdmin = async (req, res) => {
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
		let { id } = req.params;

		let x = await paraQuery(
			'UPDATE sub_admin SET name = ?, f_name = ?, dob = ?, gender = ?, nationality = ?, contact = ?, email = ?, image = ?, department_id = ? WHERE id = ?;',
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

const updateSubAdminPassword = async (req, res) => {
	try {
		let {password} = req.body;
		let { id } = req.params;
		let passwordHash = await getPasswordHash(password);

		let x = await paraQuery(
			'UPDATE sub_admin SET password = ? WHERE id = ?;',
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

const resetSubAdminPassword = async (req, res) => {
	try {
		let {email} = req.params;
		let password = await getPasswordHash(process.env.DEFAULT_PASSWORD);

		let x = await paraQuery(
			'UPDATE sub_admin SET password = ? WHERE email = ?;',
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

const getSubAdminForAuth = async (email) => {
	try {
		let x = await paraQuery('SELECT * FROM sub_admin WHERE email=?', [
			email,
		]);
		return x;
	} catch (error) {
		console.log(error);
		return null;
	}
};

const addRefreshTokenToSubAdmin = async (id, refreshToken) => {
	try {
		let x = await paraQuery(
			'UPDATE sub_admin SET refresh_token=? WHERE id=?',
			[refreshToken, id],
		);
		return x;
	} catch (error) {
		console.log(error);
		return null;
	}
};
const getSubAdminByToken = async (token) => {
	try {
		let x = await paraQuery(
			'SELECT * FROM sub_admin WHERE refresh_token=?',
			[token],
		);
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
	getAllSubAdmins,
	getSubAdminById,
	getSubAdminForAuth,
	getSubAdminByToken,
	addRefreshTokenToSubAdmin,
	createNewSubAdmin,
	updateSubAdmin,
	updateSubAdminPassword,
	deleteSubAdmin,
	resetSubAdminPassword,
};

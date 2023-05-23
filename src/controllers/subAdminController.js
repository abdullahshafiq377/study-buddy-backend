const paraQuery = require('../utils/db');
require('dotenv')
	.config();
const getPasswordHash = require('./../utils/passwordHash');
const {saveFile, getFile} = require('../utils/saveFiles');
const bcrypt = require('bcrypt');

const getAllSubAdmins = async (req, res) => {
	try {
		let x = await paraQuery('SELECT * FROM sub_admin', []);
		console.log(x);
		res.json(x);
	} catch (error) {
		console.log(error);
		res.status(400)
		   .json({error: true});
	}
};

const getSubAdminById = async (req, res) => {
	try {
		let {id} = req.params;
		
		let x = await paraQuery('SELECT * FROM sub_admin WHERE id=?', [id]);
		console.log(x);
		res.json(x);
	} catch (error) {
		console.log(error);
		res.status(400)
		   .json({error: true});
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
			department_id,
		} = req.body;
		
		let imageName = process.env.DEFAULT_IMAGE_NAME;
		if (req.files) {
			let {image} = req.files;
			console.log(image);
			imageName = await saveFile(image);
			if (imageName === null) {
				imageName = process.env.DEFAULT_IMAGE_NAME;
			}
		}
		console.log(imageName);
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
				imageName,
				department_id,
				password,
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

const deleteSubAdmin = async (req, res) => {
	try {
		let {id} = req.params;
		
		let x = await paraQuery('DELETE FROM sub_admin WHERE id=?', [id]);
		console.log(x);
		res.json(x);
	} catch (error) {
		console.log(error);
		res.status(400)
		   .json({error: true});
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
			department_id,
		} = req.body;
		let {id} = req.params;
		let imageName = process.env.DEFAULT_IMAGE_NAME;
		if (req.files) {
			let {image} = req.files;
			console.log(image);
			imageName = await saveFile(image);
			if (imageName === null) {
				 imageName = process.env.DEFAULT_IMAGE_NAME;
			}
		}
		
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
				imageName,
				department_id,
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

const updateSubAdminPassword = async (req, res) => {
	try {
		let {oldPass, newPass, email} = req.body;
		let {id} = req.params;
		let subAdmin = await getSubAdminForAuth(email);
		subAdmin = subAdmin[0];
		
		const match = await bcrypt.compare(oldPass, subAdmin.password);
		
		if (match) {
			let passHash = await getPasswordHash(newPass);
			let x = await paraQuery(
				'UPDATE sub_admin SET password = ? WHERE id = ?;',
				[
					passHash,
					id,
				],
			);
			res.status(200)
			   .json({message: 'Password Changed Successfully.'});
		}
		else {
			res.status(400)
			   .json({message: 'Password Changed Failed: Invalid Old Password.'});
		}
	} catch (error) {
		console.log(error);
		res.status(400)
		   .json({message: 'Password Changed Failed: An error occurred. Please try again later.'});
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
		res.status(200)
		   .json(x);
	} catch (error) {
		console.log(error);
		res.status(400)
		   .json({error: true});
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

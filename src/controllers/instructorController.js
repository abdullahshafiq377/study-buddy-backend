const paraQuery = require('../utils/db');
require('dotenv').config();
const getPasswordHash = require('./../utils/passwordHash');
const {saveFile} = require('../utils/saveFiles');
const bcrypt = require('bcrypt');

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
			'INSERT INTO instructor (name, f_name, dob, gender, nationality, contact, email, image, department_id, password, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
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
				imageName
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
			'UPDATE instructor SET name=?, f_name=?, dob=?, gender=?, nationality=?, contact=?, email=?, image=?, department_id=? WHERE id=?',
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
		res.status(200).json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: true });
	}
};

const updateInstructorPassword = async (req, res) => {
	try {
		let {oldPass, newPass, email} = req.body;
		let {id} = req.params;
		let instructor = await getInstructorForAuth(email);
		instructor = instructor[0];
		
		const match = await bcrypt.compare(oldPass, instructor.password);
		
		if (match) {
			let passHash = await getPasswordHash(newPass);
			let x = await paraQuery(
				'UPDATE instructor SET password = ? WHERE id = ?;',
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

const paraQuery = require('../utils/db');
const getPasswordHash = require('./../utils/passwordHash');

const getAllInstructors = async (req, res) => {
	let x = await paraQuery('SELECT * FROM instructor', []);
	console.log(x);
	res.json(x);
};

const getInstructorById = async (req, res) => {
	let x = await paraQuery('SELECT * FROM instructor WHERE id=?', [
		req.params.id,
	]);
	console.log(x);
	res.json(x);
};

const createNewInstructor = async (req, res) => {
	let b = req.body;
	let password = getPasswordHash(process.env.DEFAULT_PASSWORD);

	let x = await paraQuery(
		'INSERT INTO instructor (name, f_name, dob, gender, nationality, contact, email, image, department_id, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
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
		],
	);
	res.status(200).json(x);
};

const deleteInstructor = async (req, res) => {
	let x = await paraQuery('DELETE FROM instructor WHERE id=?', [
		req.params.id,
	]);
	console.log(x);
	res.json(x);
};

const updateInstructor = async (req, res) => {
	let b = req.body;
	let x = await paraQuery(
		'UPDATE instructor SET name=?, f_name=?, dob=?, gender=?, nationality=?, contact=?, email=?, image=?, department_id=? WHERE id=?',
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
			req.params.id,
		],
	);
	res.status(200).json(x);
};

const getInstructorForAuth = async (email) => {
	let x = await paraQuery('SELECT * FROM instructor WHERE email=?', [email]);

	return x;
};

const addRefreshTokenToInstructor = async (id, refreshToken) => {
	let x = await paraQuery(
		'UPDATE instructor SET refresh_token=? WHERE id=?',
		[refreshToken, id],
	);

	return x;
};
const getInstructorByToken = async (token) => {
	let x = await paraQuery('SELECT * FROM instructor WHERE refresh_token=?', [
		token,
	]);
	return x;
};

module.exports = {
	getAllInstructors,
	getInstructorById,
	getInstructorForAuth,
	getInstructorByToken,
	addRefreshTokenToInstructor,
	createNewInstructor,
	updateInstructor,
	deleteInstructor,
};

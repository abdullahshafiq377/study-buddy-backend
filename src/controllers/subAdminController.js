const paraQuery = require('../utils/db');

const getAllSubAdmins = async (req, res) => {
	let x = await paraQuery('SELECT * FROM sub_admin', []);
	console.log(x);
	res.json(x);
};

const getSubAdminById = async (req, res) => {
	let x = await paraQuery('SELECT * FROM sub_admin WHERE id=?', [
		req.params.id,
	]);
	console.log(x);
	res.json(x);
};

const getSubAdminForAuth = async (email) => {
	let x = await paraQuery('SELECT * FROM sub_admin WHERE email=?', [email]);
	// if (!x.length) {
	// 	return null;
	// }
	return x;
};

const addRefreshTokenToSubAdmin = async (id, refreshToken) => {
	let x = await paraQuery('UPDATE sub_admin SET refresh_token=? WHERE id=?', [
		refreshToken,
		id,
	]);

	return x;
};
const getSubAdminByToken = async (token) => {
	let x = await paraQuery('SELECT * FROM sub_admin WHERE refresh_token=?', [
		token,
	]);
	// if (!x.length) {
	// 	return null;
	// }
	return x;
};
const createNewSubAdmin = async (req, res) => {
	let b = req.body;
	let x = await paraQuery(
		'INSERT INTO sub_admin (name, f_name, dob, gender, nationality, contact, email, image, department_id, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
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
			b.password,
		],
	);
	res.status(200).json(x);
};

const deleteSubAdmin = async (req, res) => {
	let x = await paraQuery('DELETE FROM sub_admin WHERE id=?', [req.body.id]);
	console.log(x);
	res.json(x);
};

const updateSubAdmin = async (req, res) => {
	let b = req.body;
	let x = await paraQuery(
		'INSERT INTO sub_admin (name, f_name, dob, gender, nationality, contact, email, image, department_id, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
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
			b.password,
		],
	);
	res.status(200).json(x);
};

module.exports = {
	getAllSubAdmins,
	getSubAdminById,
	getSubAdminForAuth,
	getSubAdminByToken,
	addRefreshTokenToSubAdmin,
	createNewSubAdmin,
	updateSubAdmin,
	deleteSubAdmin,
};
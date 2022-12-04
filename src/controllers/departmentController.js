const paraQuery = require('../utils/db');

const getAllDepartments = async (req, res) => {
	let x = await paraQuery('SELECT * FROM department', []);
	console.log(x);
	res.json(x);
};

const getDepartmentById = async (req, res) => {
	let x = await paraQuery('SELECT * FROM department WHERE id=?', [req.params.id]);
	console.log(x);
	res.json(x);
};

const createNewDepartment = async (req, res) => {
	let b = req.body;
	let x = await paraQuery(
		'INSERT INTO department (title, description) VALUES (?, ?)',
		[b.title, b.description],
	);
	res.status(200).json(x);
};

const deleteDepartment = async (req, res) => {
	let x = await paraQuery('DELETE FROM department WHERE id=?', [
		req.params.id,
	]);
	console.log(x);
	res.json(x);
};

const updateDepartment = async (req, res) => {
	let b = req.body;
	let x = await paraQuery(
		'UPDATE department SET title=?, description=? WHERE id=?',
		[b.title, b.description, req.params.id],
	);
	res.status(200).json(x);
};

module.exports = {
	getAllDepartments,
	getDepartmentById,
	createNewDepartment,
	updateDepartment,
	deleteDepartment,
};

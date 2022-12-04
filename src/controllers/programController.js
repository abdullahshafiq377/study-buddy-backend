const paraQuery = require('../utils/db');

const getAllPrograms = async (req, res) => {
	let x = await paraQuery('SELECT * FROM program', []);
	console.log(x);
	res.json(x);
};

const getProgramById = async (req, res) => {
	let x = await paraQuery('SELECT * FROM program WHERE id=?', [
		req.params.id,
	]);
	console.log(x);
	res.json(x);
};

const createNewProgram = async (req, res) => {
	let b = req.body;
	let x = await paraQuery(
		'INSERT INTO program (title, description, department_id) VALUES (?, ?, ?)',
		[b.title, b.description, b.department_id],
	);
	res.status(200).json(x);
};

const deleteProgram = async (req, res) => {
	let x = await paraQuery('DELETE FROM program WHERE id=?', [req.params.id]);
	console.log(x);
	res.json(x);
};

const updateProgram = async (req, res) => {
	let b = req.body;
	let x = await paraQuery(
		'UPDATE program SET title=?, description=?, department_id=? WHERE id=?',
		[b.title, b.description, b.department_id, req.params.id],
	);
	res.status(200).json(x);
};

module.exports = {
	getAllPrograms,
	getProgramById,
	createNewProgram,
	updateProgram,
	deleteProgram,
};

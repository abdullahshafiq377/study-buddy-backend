const paraQuery = require('../utils/db');

const getAllPrograms = async (req, res) => {
	try {
		let x = await paraQuery('SELECT * FROM program', []);
		console.log(x);
		res.json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: true });
	}
};

const getProgramById = async (req, res) => {
	try {
		let { id } = req.params;

		let x = await paraQuery('SELECT * FROM program WHERE id=?', [id]);
		console.log(x);
		res.json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: true });
	}
};

const createNewProgram = async (req, res) => {
	try {
		let { title, description, department_id } = req.body;
		let x = await paraQuery(
			'INSERT INTO program (title, description, department_id) VALUES (?, ?, ?)',
			[title, description, department_id],
		);
		res.status(200).json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: true });
	}
};

const deleteProgram = async (req, res) => {
	try {
		let { id } = req.params;

		let x = await paraQuery('DELETE FROM program WHERE id=?', [id]);
		console.log(x);
		res.status(200).json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: true });
	}
};

const updateProgram = async (req, res) => {
	try {
		let { title, description, department_id } = req.body;
		let { id } = req.params;

		let x = await paraQuery(
			'UPDATE program SET title=?, description=?, department_id=? WHERE id=?',
			[title, description, department_id, id],
		);
		res.status(200).json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: true });
	}
};

module.exports = {
	getAllPrograms,
	getProgramById,
	createNewProgram,
	updateProgram,
	deleteProgram,
};

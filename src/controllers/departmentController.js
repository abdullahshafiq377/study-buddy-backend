const paraQuery = require('../utils/db');

const getAllDepartments = async (req, res) => {
	try {
		let x = await paraQuery('SELECT * FROM department', []);
		console.log(x);
		res.json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: true });
	}
};

const getDepartmentById = async (req, res) => {
	try {
		let { id } = req.params;

		let x = await paraQuery('SELECT * FROM department WHERE id=?', [id]);
		console.log(x);
		res.json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: true });
	}
};

const createNewDepartment = async (req, res) => {
	try {
		let { title, description } = req.body;
		let x = await paraQuery(
			'INSERT INTO department (title, description) VALUES (?, ?)',
			[title, description],
		);
		res.status(200).json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: true });
	}
};

const deleteDepartment = async (req, res) => {
	try {
		let { id } = req.params;

		let x = await paraQuery('DELETE FROM department WHERE id=?', [id]);
		console.log(x);
		res.status(200).json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: true });
	}
};

const updateDepartment = async (req, res) => {
	try {
		let { title, description } = req.body;
		let { id } = req.params;

		let x = await paraQuery(
			'UPDATE department SET title=?, description=? WHERE id=?',
			[title, description, id],
		);
		res.status(200).json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: true });
	}
};

module.exports = {
	getAllDepartments,
	getDepartmentById,
	createNewDepartment,
	updateDepartment,
	deleteDepartment,
};

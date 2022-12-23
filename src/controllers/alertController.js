const paraQuery = require('../utils/db');

const getAllAlerts = async (req, res) => {
	try {
		let x = await paraQuery('SELECT * FROM alert', []);
		console.log(x);
		res.json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: true });
	}
};

const getAlertById = async (req, res) => {
	try {
		let { id } = req.params;

		let x = await paraQuery('SELECT * FROM alert WHERE id=?', [id]);
		console.log(x);
		res.json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: true });
	}
};

const createNewAlert = async (req, res) => {
	try {
		let { title, description, class_id } = req.body;

		let x = await paraQuery(
			'INSERT INTO alert (title, description, class_id) VALUES (?, ?, ?)',
			[title, description, class_id],
		);
		res.status(200).json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: true });
	}
};

const deleteAlert = async (req, res) => {
	try {
		let { id } = req.params;

		let x = await paraQuery('DELETE FROM alert WHERE id=?', [id]);
		console.log(x);
		res.status(200).json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: true });
	}
};

const updateAlert = async (req, res) => {
	try {
		let { title, description, class_id } = req.body;
		let { id } = req.params;

		let x = await paraQuery(
			'UPDATE alert SET title=?, description=?, class_id=? WHERE id=?',
			[title, description, class_id, id],
		);
		res.status(200).json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: true });
	}
};

module.exports = {
	getAllAlerts,
	getAlertById,
	createNewAlert,
	updateAlert,
	deleteAlert,
};

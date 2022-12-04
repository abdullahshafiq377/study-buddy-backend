const paraQuery = require('../utils/db');

const getAllAlerts = async (req, res) => {
	let x = await paraQuery('SELECT * FROM alert', []);
	console.log(x);
	res.json(x);
};

const getAlertById = async (req, res) => {
	let x = await paraQuery('SELECT * FROM alert WHERE id=?', [req.params.id]);
	console.log(x);
	res.json(x);
};

const createNewAlert = async (req, res) => {
	let b = req.body;
	let x = await paraQuery(
		'INSERT INTO alert (title, description, class_id) VALUES (?, ?, ?)',
		[b.title, b.description, b.class_id],
	);
	res.status(200).json(x);
};

const deleteAlert = async (req, res) => {
	let x = await paraQuery('DELETE FROM alert WHERE id=?', [req.params.id]);
	console.log(x);
	res.json(x);
};

const updateAlert = async (req, res) => {
	let b = req.body;
	let x = await paraQuery(
		'UPDATE alert SET title=?, description=?, class_id=? WHERE id=?',
		[b.title, b.description, b.class_id, req.params.id],
	);
	res.status(200).json(x);
};

module.exports = {
	getAllAlerts,
	getAlertById,
	createNewAlert,
	updateAlert,
	deleteAlert,
};

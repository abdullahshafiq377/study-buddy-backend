const paraQuery = require('../utils/db');

const getAllEvents = async (req, res) => {
	let x = await paraQuery('SELECT * FROM event', []);
	console.log(x);
	res.json(x);
};

const getEventById = async (req, res) => {
	let x = await paraQuery('SELECT * FROM event WHERE id=?', [req.params.id]);
	console.log(x);
	res.json(x);
};

const createNewEvent = async (req, res) => {
	let b = req.body;
	let x = await paraQuery(
		'INSERT INTO event (title, description, date_time, venue) VALUES (?, ?, ?, ?)',
		[b.title, b.description, b.date_time, b.venue],
	);
	res.status(200).json(x);
};

const deleteEvent = async (req, res) => {
	let x = await paraQuery('DELETE FROM event WHERE id=?', [req.params.id]);
	console.log(x);
	res.json(x);
};

const updateEvent = async (req, res) => {
	let b = req.body;
	let x = await paraQuery(
		'UPDATE event SET title=?, description=?, date_time=?, venue=? WHERE id=?',
		[b.title, b.description, b.date_time, b.venue, req.params.id],
	);
	res.status(200).json(x);
};

module.exports = {
	getAllEvents,
	getEventById,
	createNewEvent,
	updateEvent,
	deleteEvent,
};

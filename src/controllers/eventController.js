const paraQuery = require('../utils/db');

const getAllEvents = async (req, res) => {
	try {
		let x = await paraQuery('SELECT * FROM event', []);
		console.log(x);
		res.json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: true });
	}
};

const getEventById = async (req, res) => {
	try {
		let { id } = req.params;

		let x = await paraQuery('SELECT * FROM event WHERE id=?', [id]);
		console.log(x);
		res.json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: true });
	}
};

const createNewEvent = async (req, res) => {
	try {
		let { title, description, date_time, venue } = req.body;

		let x = await paraQuery(
			'INSERT INTO event (title, description, date_time, venue) VALUES (?, ?, ?, ?)',
			[title, description, date_time, venue],
		);
		res.status(200).json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: true });
	}
};

const deleteEvent = async (req, res) => {
	try {
		let { id } = req.params;

		let x = await paraQuery('DELETE FROM event WHERE id=?', [id]);
		console.log(x);
		res.status(200).json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: true });
	}
};

const updateEvent = async (req, res) => {
	try {
		let { title, description, date_time, venue } = req.body;
		let { id } = req.params;

		let x = await paraQuery(
			'UPDATE event SET title=?, description=?, date_time=?, venue=? WHERE id=?',
			[title, description, date_time, venue, id],
		);
		res.status(200).json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: true });
	}
};

module.exports = {
	getAllEvents,
	getEventById,
	createNewEvent,
	updateEvent,
	deleteEvent,
};

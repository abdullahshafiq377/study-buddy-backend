const paraQuery = require('../utils/db');

const getAllNotices = async (req, res) => {
	try {
		let x = await paraQuery('SELECT * FROM notice', []);
		console.log(x);
		res.json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: true });
	}
};

const getNoticeById = async (req, res) => {
	try {
		let { id } = req.params;

		let x = await paraQuery('SELECT * FROM notice WHERE id=?', [id]);
		console.log(x);
		res.json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: true });
	}
};

const createNewNotice = async (req, res) => {
	try {
		let { title, link } = req.body;

		let x = await paraQuery(
			'INSERT INTO notice (title, link) VALUES (?, ?)',
			[title, link],
		);
		res.status(200).json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: true });
	}
};

const deleteNotice = async (req, res) => {
	try {
		let { id } = req.params;

		let x = await paraQuery('DELETE FROM notice WHERE id=?', [id]);
		console.log(x);
		res.status(200).json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: true });
	}
};

const updateNotice = async (req, res) => {
	try {
		let { title, link } = req.body;
		let { id } = req.params;

		let x = await paraQuery(
			'UPDATE notice SET title=?, link=? WHERE id=?',
			[title, link, id],
		);
		res.status(200).json(x);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: true });
	}
};

module.exports = {
	getAllNotices,
	getNoticeById,
	createNewNotice,
	updateNotice,
	deleteNotice,
};

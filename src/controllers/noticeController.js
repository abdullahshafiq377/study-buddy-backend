const paraQuery = require('../utils/db');

const getAllNotices = async (req, res) => {
	let x = await paraQuery('SELECT * FROM notice', []);
	console.log(x);
	res.json(x);
};

const getNoticeById = async (req, res) => {
	let x = await paraQuery('SELECT * FROM notice WHERE id=?', [
		req.params.id,
	]);
	console.log(x);
	res.json(x);
};

const createNewNotice = async (req, res) => {
	let b = req.body;
	let x = await paraQuery('INSERT INTO notice (title, link) VALUES (?, ?)', [
		b.title,
		b.link,
	]);
	res.status(200).json(x);
};

const deleteNotice = async (req, res) => {
	let x = await paraQuery('DELETE FROM notice WHERE id=?', [req.body.id]);
	console.log(x);
	res.json(x);
};

const updateNotice = async (req, res) => {
	let b = req.body;
	let x = await paraQuery('INSERT INTO notice (title, link) VALUES (?, ?)', [
		b.title,
		b.link,
	]);
	res.status(200).json(x);
};

module.exports = {
	getAllNotices,
	getNoticeById,
	createNewNotice,
	updateNotice,
	deleteNotice,
};

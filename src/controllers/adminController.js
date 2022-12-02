const paraQuery = require('../utils/db');

const getAdminForAuth = async (email) => {
	let x = await paraQuery('SELECT * FROM admin WHERE email=?', [email]);
	// if (!x.length) {
	// 	return null;
	// }
	return x;
};
const getAdminByToken = async (token) => {
	let x = await paraQuery('SELECT * FROM admin WHERE refresh_token=?', [
		token,
	]);
	// if (!x.length) {
	// 	return null;
	// }
	return x;
};
const addRefreshTokenToAdmin = async (id, refreshToken) => {
	let x = await paraQuery('UPDATE admin SET refresh_token=? WHERE id=?', [
		refreshToken,
		id,
	]);

	return x;
};

module.exports = { getAdminForAuth, addRefreshTokenToAdmin, getAdminByToken };

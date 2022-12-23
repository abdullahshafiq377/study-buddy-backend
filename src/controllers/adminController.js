const paraQuery = require('../utils/db');

const getAdminForAuth = async (email) => {
	try {
		let x = await paraQuery('SELECT * FROM admin WHERE email=?', [email]);
		return x;
	} catch (error) {
		console.log(error);
		return null;
	}
};
const getAdminByToken = async (token) => {
	try {
		let x = await paraQuery('SELECT * FROM admin WHERE refresh_token=?', [
			token,
		]);
		// if (!x.length) {
		// 	return null;
		// }
		return x;
	} catch (error) {
		console.log(error);
		return null;
	}
};
const addRefreshTokenToAdmin = async (id, refreshToken) => {
	try {
		let x = await paraQuery('UPDATE admin SET refresh_token=? WHERE id=?', [
			refreshToken,
			id,
		]);

		return x;
	} catch (error) {
		console.log(error);
		return null;
	}
};

module.exports = { getAdminForAuth, addRefreshTokenToAdmin, getAdminByToken };

const { getAdminByToken } = require('./adminController');
const { getSubAdminByToken } = require('./subAdminController');
const { getInstructorByToken } = require('./instructorController');
const { getStudentByToken } = require('./studentController');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = async (req, res) => {
	const cookies = req.cookies;

	if (!cookies?.jwt) {
		return res.sendStatus(401);
	}
	const refreshToken = cookies.jwt;
	const userType = cookies.userType;
	// const response = await adminController.getAdminForAuth();
	// const admin = response.find(
	// 	(admin) => admin.refresh_token === refreshToken,
	// );
	// if (!admin) {
	// 	return res.sendStatus(403);
	// }
	let response;
	switch (userType) {
		case 'admin':
			response = await getAdminByToken(refreshToken);
			break;
		case 'subAdmin':
			response = await getSubAdminByToken(refreshToken);
			break;
		case 'instructor':
			response = await getInstructorByToken(refreshToken);
			break;
		case 'student':
			response = await getStudentByToken(refreshToken);
			break;
		default:
			console.log('Invalid user type');
			res.sendStatus(403);
			break;
	}

	const user = response[0];
	if (!user) {
		res.sendStatus(403);
	}

	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET,
		(err, decoded) => {
			if (err || user.id !== decoded.userId) {
				return sendStatus(403);
			}
			const accessToken = jwt.sign(
				{ userId: decoded.userId },
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: '30m' },
			);
			res.json({ accessToken, userType });
		},
	);
};

module.exports = { handleRefreshToken };

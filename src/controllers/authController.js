const bcrypt = require('bcrypt');
const {
	getAdminForAuth,
	addRefreshTokenToAdmin,
} = require('./adminController');
const {
	getSubAdminForAuth,
	addRefreshTokenToSubAdmin,
} = require('./subAdminController');
const {
	getInstructorForAuth,
	addRefreshTokenToInstructor,
} = require('./instructorController');
const {
	getStudentForAuth,
	addRefreshTokenToStudent,
} = require('./studentController');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleLogin = async (req, res) => {
	// console.log(req);
	const { email, password } = req.body;

	if (!email || !password) {
		return res
			.status(400)
			.json({ message: 'Email and Password are required' });
	}

	// const response = await getAdminForAuth();
	// const admin = response.find((admin) => admin.email === email);
	// if (!admin) {
	// 	return res.sendStatus(401);
	// }

	let response = await getAdminForAuth(email);
	let user = response[0];
	let userType = 'admin';
	if (!user) {
		response = await getSubAdminForAuth(email);
		user = response[0];
		userType = 'subAdmin';
	}
	if (!user) {
		response = await getInstructorForAuth(email);
		user = response[0];
		userType = 'instructor';
	}
	if (!user) {
		response = await getStudentForAuth(email);
		user = response[0];
		userType = 'student';
	}
	if (!user) {
		userType = '';
		console.log('user not found');
		return res.sendStatus(401);
	}

	console.log(user);

	const match = await bcrypt.compare(password, user.password);
	if (match) {
		//JWT
		const accessToken = jwt.sign(
			{ email: user.email },
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: '30m' },
		);
		const refreshToken = jwt.sign(
			{ email: user.email },
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: '1d' },
		);

		switch (userType) {
			case 'admin':
				await addRefreshTokenToAdmin(user.id, refreshToken);
				break;
			case 'subAdmin':
				await addRefreshTokenToSubAdmin(user.id, refreshToken);
				break;
			case 'instructor':
				await addRefreshTokenToInstructor(user.id, refreshToken);
				break;
			case 'student':
				await addRefreshTokenToStudent(user.id, refreshToken);
				break;
			default:
				console.log('Failed to add Refresh Token to DB');
				break;
		}

		res.cookie('jwt', refreshToken, {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000,
		});
		res.cookie('userType', userType, {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000,
		});
		res.json({ accessToken, userType });
	} else {
		res.sendStatus(401);
	}
};

module.exports = { handleLogin };

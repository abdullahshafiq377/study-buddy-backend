const {
	getAdminByToken,
	addRefreshTokenToAdmin,
} = require('./adminController');
const {
	getSubAdminByToken,
	addRefreshTokenToSubAdmin,
} = require('./subAdminController');
const {
	getInstructorByToken,
	addRefreshTokenToInstructor,
} = require('./instructorController');
const {
	getStudentByToken,
	addRefreshTokenToStudent,
} = require('./studentController');

const handleLogout = async (req, res) => {
	// On client-side also delete the access token
	const cookies = req.cookies;

	if (!cookies?.jwt) {
		return res.sendStatus(204); // No content
	}
	const refreshToken = cookies.jwt;
	const userType = cookies.userType;

	// is the refresh token in db?
	// const response = await adminController.getAdminForAuth();
	// const admin = response.find(
	// 	(admin) => admin.refresh_token === refreshToken,
	// );
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
			break;
	}

	const user = response[0];
	if (!user) {
		res.clearCookie('jwt', {
			httpOnly: true,
		});
		res.clearCookie('userType', {
			httpOnly: true,
		});
		return res.sendStatus(204);
	}

	const clearRefreshToken = null;

	// await adminController.addRefreshTokenToAdmin(admin.id, clearRefreshToken);

	switch (userType) {
		case 'admin':
			await addRefreshTokenToAdmin(user.id, clearRefreshToken);
			break;
		case 'subAdmin':
			await addRefreshTokenToSubAdmin(user.id, clearRefreshToken);
			break;
		case 'instructor':
			await addRefreshTokenToInstructor(user.id, clearRefreshToken);
			break;
		case 'student':
			await addRefreshTokenToStudent(user.id, clearRefreshToken);
			break;
		default:
			console.log('Invalid user type');
			break;
	}

	res.clearCookie('jwt', {
		httpOnly: true,
	});
	res.clearCookie('userType', {
		httpOnly: true,
	});
	return res.sendStatus(204);
};

module.exports = { handleLogout };

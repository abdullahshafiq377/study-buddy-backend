const jwt = require('jsonwebtoken');
require('dotenv')
	.config();

const verifySocketJWT = (socket, next) => {
	const token = socket.handshake.auth?.accessToken;
	
	try {
		socket.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
	} catch (e) {
		console.log(e);
		const socketError = new Error('NOT_AUTHORIZED');
		return next(socketError);
	}
	
	next();
};

module.exports = verifySocketJWT

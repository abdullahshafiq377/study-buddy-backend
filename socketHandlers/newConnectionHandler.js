const serverStore = require('../serverStore');
const newConnectionHandler = (socket, io) => {
	const {user: userDetails} = socket;
	
	serverStore.addNewConnectedUser({
		                                socketId: socket.id,
		                                userId: userDetails.userId
	                                });
};

module.exports = newConnectionHandler

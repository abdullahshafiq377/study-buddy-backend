const meetingInitializeConnectionHandler = (socket, data) => {
	const {connUserSocketId} = data;
	
	const initData = {
		connUserSocketId: socket.id
	};
	
	socket.to(connUserSocketId).emit('connection-init', initData);
}

module.exports = meetingInitializeConnectionHandler

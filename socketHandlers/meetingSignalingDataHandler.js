const meetingSignalingDataHandler = (socket, data) => {
	const {connUserSocketId, signal} = data;
	
	const signalData = {signal, connUserSocketId: socket.id};
	socket.to(connUserSocketId).emit('connection-signal', signalData)
};
module.exports = meetingSignalingDataHandler;

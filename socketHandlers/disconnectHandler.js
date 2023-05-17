const serverStore = require('../serverStore');
const leaveMeetingHandler = require('./leaveMeetingHandler');

const disconnectHandler = (socket) => {
	const activeMeetings = serverStore.getActiveMeetings();
	
	activeMeetings.map(activeMeeting => {
		const userInMeeting = activeMeeting.participants.some(
			participant => participant.socketId === socket.id
		);
		
		if (userInMeeting){
			leaveMeetingHandler(socket, {meetingId: activeMeeting.id});
		}
	})
	
	serverStore.removeConnectedUser(socket.id);
}

module.exports = disconnectHandler;

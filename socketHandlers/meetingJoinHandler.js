const serverStore = require('../serverStore');
const meetingUpdates = require('./updates/meetings');

const roomJoinHandler = (socket, data) => {
	const {meetingId} = data;
	
	const participantsDetails = {
		userId: socket.user.userId,
		socketId: socket.id
	}
	
	const meetingDetails = serverStore.getActiveMeeting(meetingId);
	serverStore.joinActiveMeeting(meetingId, participantsDetails);
	
	meetingDetails.participants.map(participant => {
		if (participant.socketId !== participantsDetails.socketId){
			socket.to(participant.socketId).emit('connection-prepare', {
				connUserSocketId: participantsDetails.socketId
			});
		}
	})
	
	meetingUpdates.updateActiveMeetings()
}

module.exports = roomJoinHandler;

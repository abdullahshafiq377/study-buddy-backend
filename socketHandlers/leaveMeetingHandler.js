const serverStore = require('../serverStore');
const meetingsUpdates = require('./updates/meetings');
const leaveMeetingHandler = (socket, data) => {
	const {meetingId} = data;
	
	const activeMeeting = serverStore.getActiveMeeting(meetingId);
	
	if (activeMeeting){
		serverStore.leaveActiveMeeting(meetingId, socket.id);
		const updatedActiveMeeting = serverStore.getActiveMeeting(meetingId);
		if (updatedActiveMeeting){
			updatedActiveMeeting.participants.map(participant => {
				socket.to(participant.socketId).emit('meeting-participant-left', {
					connUserSocketId: socket.id
				})
			})
		}
		meetingsUpdates.updateActiveMeetings();
	}
};

module.exports = leaveMeetingHandler;

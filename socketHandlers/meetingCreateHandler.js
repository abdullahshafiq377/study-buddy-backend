const serverStore = require('../serverStore')
const meetingsUpdates = require('./updates/meetings')
const meetingController = require('../src/controllers/meetingController')

const meetingCreateHandler = async (socket, data) => {
	 console.log('handling meeting create event');
	 const socketId = socket.id;
	 const {userId} = socket.user;
	 const {meetingId} = data;
	 
	 const scheduledMeeting = await meetingController.getScheduledMeetingById(meetingId);
	 
	 const meetingDetails = serverStore.addNewActiveMeeting(socketId, userId, scheduledMeeting);
	 
	 if (meetingDetails) {
		 meetingController.deleteScheduledMeeting(meetingId);
		 meetingsUpdates.updateScheduledMeetings();
	 }
	 
	 socket.emit('start-meeting', {
		meetingDetails
	 });
	 
	 meetingsUpdates.updateActiveMeetings()
 }
module.exports = meetingCreateHandler

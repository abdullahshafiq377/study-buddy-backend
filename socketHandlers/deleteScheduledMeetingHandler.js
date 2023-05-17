const meetingController = require('../src/controllers/meetingController')
const serverStore = require('../serverStore');
const meetingsUpdates = require('./updates/meetings');

const deleteScheduledMeetingHandler = async (socket, data) => {
	try{
		const io = serverStore.getSocketServerInstance();
		const {meetingId} = data;
		
		await meetingController.deleteScheduledMeeting(meetingId);
		
		meetingsUpdates.updateScheduledMeetings();
		
	}catch (e) {
		console.log(e);
	}
};

module.exports = deleteScheduledMeetingHandler;

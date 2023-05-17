const meetingController = require('../src/controllers/meetingController')
const serverStore = require('../serverStore');

const scheduledMeetingHistoryHandler = async (socket) => {
	try{
		const io = serverStore.getSocketServerInstance();
		
		const scheduledMeetings = await meetingController.getAllScheduledMeetings()
		console.log('Scheduled Meetings:', scheduledMeetings);
		
		if (scheduledMeetings) {
			io.to(socket.id)
			  .emit('scheduled-meeting-history', {
				  scheduledMeetings,
			  });
		}
	}catch (e) {
		console.log(e);
	}
};

module.exports = scheduledMeetingHistoryHandler;

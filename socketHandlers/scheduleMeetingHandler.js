const serverStore = require('../serverStore')
const meetingsUpdates = require('./updates/meetings')
const meetingController = require('../src/controllers/meetingController')
const {v4: uuidv4} = require('uuid');

const scheduleMeetingHandler = async (socket, data) => {
	console.log('handling meeting schedule event');
	const {userId} = socket.user;
	
	const newScheduledMeeting = {
		...data,
		creatorId: userId,
		meetingId: uuidv4(),
	}
	
	await meetingController.addNewScheduledMeeting(newScheduledMeeting);
	
	meetingsUpdates.updateScheduledMeetings();
}
module.exports = scheduleMeetingHandler

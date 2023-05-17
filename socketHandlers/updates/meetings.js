const serverStore = require('../../serverStore')
const meetingController = require('../../src/controllers/meetingController')


const updateScheduledMeetings = async (toSpecifiedTargetId = null) => {
	const io = serverStore.getSocketServerInstance();
	const scheduledMeetings = await meetingController.getAllScheduledMeetings();
	
	if (scheduledMeetings) {
		if (toSpecifiedTargetId) {
			io.to(toSpecifiedTargetId)
			  .emit('scheduled-meetings', {
				  scheduledMeetings
			  });
		}
		else {
			io.emit('scheduled-meetings', {
				scheduledMeetings
			})
		}
	}
}
const updateActiveMeetings = (toSpecifiedTargetId = null) => {
	const io = serverStore.getSocketServerInstance();
	const activeMeetings = serverStore.getActiveMeetings();
	console.log('active meetings:', activeMeetings);
	
	if (toSpecifiedTargetId){
		io.to(toSpecifiedTargetId).emit('active-meetings',{
			activeMeetings
		});
	}
	else {
		io.emit('active-meetings', {
			activeMeetings
		})
	}
}

module.exports = {updateScheduledMeetings, updateActiveMeetings}

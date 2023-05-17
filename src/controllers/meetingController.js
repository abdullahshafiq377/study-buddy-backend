const paraQuery = require('../utils/db');

const getAllScheduledMeetings = async () => {
	try {
		let x = await paraQuery('SELECT * FROM scheduled_meeting', []);
		console.log(x);
		return x
	} catch (error) {
		console.log(error);
		return null;
	}
};
const getScheduledMeetingById = async (id) => {
	try {
		let x = await paraQuery('SELECT * FROM scheduled_meeting WHERE id=?', [id]);
		console.log(x);
		return x[0]
	} catch (error) {
		console.log(error);
		return null;
	}
};
const getScheduledMeetingsByCreator = async (userId) => {
	try {
		let x = await paraQuery('SELECT * FROM scheduled_meeting WHERE creator_id=?', [userId]);
		console.log(x);
		return x
	} catch (error) {
		console.log(error);
		return null;
	}
};

const addNewScheduledMeeting = async (meeting) => {
	try {
		const {
			meetingId,
			title,
			startTime,
			startDate,
			creatorId,
			sectionId,
		} = meeting;
		
		let x = await paraQuery(
			'INSERT INTO scheduled_meeting (id, title, start_time, start_date, creator_id, section_id) VALUES (?, ?, ?, ?, ?, ?)',
			[
				meetingId,
				title,
				startTime,
				startDate,
				creatorId,
				sectionId,
			],
		);
		return x;
	} catch (e) {
		console.log(e);
		return null;
	}
};

const deleteScheduledMeeting = async (id) => {
	try {
		let x = await paraQuery('DELETE FROM scheduled_meeting WHERE id=?', [id]);
		console.log(x);
		return x;
	} catch (error) {
		console.log(error);
		return null;
	}
};

module.exports = {getAllScheduledMeetings,getScheduledMeetingById,getScheduledMeetingsByCreator, addNewScheduledMeeting, deleteScheduledMeeting}

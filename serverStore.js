const {v4: uuidv4} = require('uuid');
const connectedUsers = new Map();
let activeMeetings = [];

let io = null;

const setSocketServerInstance = (ioInstance) => {
	io = ioInstance;
};

const getSocketServerInstance = () => {
	return io;
};

const getActiveMeetings = () => {
	return [...activeMeetings];
};

const getActiveMeeting = (id) => {
	const activeMeeting = activeMeetings.find(activeMeeting => activeMeeting.meetingId = id);
	if (activeMeeting) return {...activeMeeting};
	return null;
};

const addNewConnectedUser = ({socketId, userId}) => {
	connectedUsers.set(socketId, {userId});
	console.log('new connected users');
	console.log(connectedUsers);
};

const removeConnectedUser = (socketId) => {
	if (connectedUsers.has(socketId)) {
		connectedUsers.delete(socketId);
		console.log('new connected users');
		console.log(connectedUsers);
	}
};

const getActiveConnections = (userId) => {
	const activeConnections = [];
	
	connectedUsers.forEach((value, key) => {
		if (value.userId === userId) {
			activeConnections.push(key);
		}
	});
	return activeConnections;
};

const getOnlineUsers = () => {
	const onlineUsers = [];
	
	connectedUsers.forEach((value, key) => {
		onlineUsers.push(value.userId);
	});
	
	return onlineUsers;
};

// Meetings

const addNewActiveMeeting = (socketId, userId, scheduledMeeting) => {
	const newActiveMeeting = {
		...scheduledMeeting,
		meetingCreator: {
			userId,
			socketId
		},
		participants: [
			{
				userId,
				socketId
			},
		]
	};
	
	activeMeetings = [...activeMeetings, newActiveMeeting];
	console.log('active meetings', activeMeetings);
	
	return newActiveMeeting;
};

const joinActiveMeeting = (meetingId, participantsDetails) => {
	const meeting = activeMeetings.find(meeting => meeting.id === meetingId);
	activeMeetings = activeMeetings.filter(meeting => meeting.id !== meetingId);
	
	const updatedMeeting = {
		...meeting,
		participants: [...meeting.participants, participantsDetails]
	};
	
	activeMeetings.push(updatedMeeting);
	console.log('updated active meetings:', activeMeetings);
};

const leaveActiveMeeting = (meetingId, participantSocketId) => {
	console.log('leave active meeting called', meetingId);
	const activeMeeting = activeMeetings.find(meeting => meeting.id === meetingId);
		console.log('active meeting found', activeMeeting);
	
	
	if (activeMeeting) {
		const copyOfActiveMeeting = {...activeMeeting};
		
		copyOfActiveMeeting.participants = copyOfActiveMeeting.participants.filter(
			participant => participant.socketId !== participantSocketId
		);
		console.log('copy meeting after participant removed:', copyOfActiveMeeting);
		
		activeMeetings = activeMeetings.filter(meeting => meeting.id !== meetingId);
		console.log('filtered Active meetings:', activeMeetings);
		
		if (copyOfActiveMeeting.participants.length > 0) {
			console.log('pushing meeting back to active meetings');
			activeMeetings.push(copyOfActiveMeeting);
		}
	}
};


module.exports = {
	addNewConnectedUser, removeConnectedUser, getActiveConnections, setSocketServerInstance, getSocketServerInstance,
	getOnlineUsers, addNewActiveMeeting, getActiveMeetings, getActiveMeeting, joinActiveMeeting, leaveActiveMeeting
};


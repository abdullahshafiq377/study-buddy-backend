const verifySocketJWT = require('./src/middleware/verifySocketJWT');
const newConnectionHandler = require('./socketHandlers/newConnectionHandler');
const directMessageHandler = require('./socketHandlers/directMessageHandler');
const disconnectHandler = require('./socketHandlers/disconnectHandler');
const serverStore = require('./serverStore');
const directChatHistoryHandler = require('./socketHandlers/directChatHistoryHandler');
const directConversationHistoryHandler = require('./socketHandlers/directConversationHistoryHandler');
const meetingCreateHandler = require('./socketHandlers/meetingCreateHandler');
const scheduleMeetingHandler = require('./socketHandlers/scheduleMeetingHandler');
const scheduledMeetingHistoryHandler = require('./socketHandlers/scheduledMeetingHistoryHandler');
const deleteScheduledMeetingHandler = require('./socketHandlers/deleteScheduledMeetingHandler');
const meetingsUpdates = require('./socketHandlers/updates/meetings');
const meetingJoinHandler = require('./socketHandlers/meetingJoinHandler');
const leaveMeetingHandler = require('./socketHandlers/leaveMeetingHandler');
const meetingInitializeConnectionHandler = require('./socketHandlers/meetingInitializeConnectionHandler');
const meetingSignalingDataHandler = require('./socketHandlers/meetingSignalingDataHandler');
const registerSocketServer = server => {
	const io = require('socket.io')(server, {
		cors: {
			origin: '*',
			methods: ['GET', 'POST'],
		},
	});
	
	serverStore.setSocketServerInstance(io);
	
	io.use((socket, next) => {
		verifySocketJWT(socket, next);
	});
	
	const emitOnlineUsers = () => {
		const onlineUsers = serverStore.getOnlineUsers();
		
		io.emit('online-users', {onlineUsers});
	};
	
	io.on('connection', socket => {
		console.log('user connected');
		console.log(socket.id);
		
		newConnectionHandler(socket, io);
		emitOnlineUsers();
		
		socket.on('direct-message', (data) => {
			directMessageHandler(socket, data);
		});
		socket.on('direct-chat-history', (data) => {
			directChatHistoryHandler(socket, data);
		});
		socket.on('direct-conversation-history', () => {
			directConversationHistoryHandler(socket);
		});
		
		socket.on('schedule-meeting', (data) => {
			scheduleMeetingHandler(socket, data);
		});
		
		socket.on('scheduled-meeting-history', () => {
			scheduledMeetingHistoryHandler(socket);
		});
		
		socket.on('delete-scheduled-meeting', (data) => {
			deleteScheduledMeetingHandler(socket, data);
		});
		
		socket.on('start-meeting', (data) => {
			meetingCreateHandler(socket, data);
		});
		
		socket.on('get-active-meetings', () => {
			meetingsUpdates.updateActiveMeetings(socket.id)
		});
		
		socket.on('join-meeting', (data) => {
			meetingJoinHandler(socket, data);
		});
		
		socket.on('leave-meeting', (data) => {
			leaveMeetingHandler(socket, data);
		});
		
		socket.on('connection-init', (data) => {
			meetingInitializeConnectionHandler(socket, data);
		});
		
		socket.on('connection-signal', (data) => {
			meetingSignalingDataHandler(socket, data);
		});
		
		socket.on('disconnect', () => {
			disconnectHandler(socket);
		});
	});
	setInterval(() => {
		emitOnlineUsers();
	}, [8000]);
};

module.exports = {
	registerSocketServer
};

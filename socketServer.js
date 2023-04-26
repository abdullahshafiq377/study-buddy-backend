const verifySocketJWT = require('./src/middleware/verifySocketJWT');
const newConnectionHandler = require('./socketHandlers/newConnectionHandler');
const directMessageHandler = require('./socketHandlers/directMessageHandler');
const disconnectHandler = require('./socketHandlers/disconnectHandler');
const serverStore = require('./serverStore');
const directChatHistoryHandler = require('./socketHandlers/directChatHistoryHandler');
const directConversationHistoryHandler = require('./socketHandlers/directConversationHistoryHandler');
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

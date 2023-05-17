const chatController = require('../src/controllers/chatController');
const chatUpdates = require('./updates/chats');
const serverStore = require('../serverStore');

const directConversationHistoryHandler = async (socket) => {
	try{
		const {userId} = socket.user;
		const io = serverStore.getSocketServerInstance();
		
		const conversation = await chatController.getConversationByUser(userId);
		
		if (conversation) {
			io.to(socket.id)
			  .emit('direct-conversation-history', {
				  conversation,
			  });
		}
	}catch (e) {
		console.log(e);
	}
};

module.exports = directConversationHistoryHandler;

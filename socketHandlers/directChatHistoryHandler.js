const chatController = require('../src/controllers/chatController');
const chatUpdates = require('./updates/chats');

const directChatHistoryHandler = async (socket, data) => {
	try{
		const {userId} = socket.user;
		const {receiverId} = data;
		
		const conversation = await chatController.getConversation(userId, receiverId);
		
		if (conversation) {
			chatUpdates.updateChatHistory(conversation.id, socket.id);
		}
	}catch (e) {
		console.log(e);
	}
};

module.exports = directChatHistoryHandler;

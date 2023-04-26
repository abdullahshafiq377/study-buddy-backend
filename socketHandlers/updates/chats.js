const chatController = require('../../src/controllers/chatController');
const serverStore = require('../../serverStore');


const updateChatHistory = async (conversationId, toSpecifiedSocketId = null) => {
	const conversation = await chatController.getConversationById(conversationId);
	const messages = await chatController.getMessagesByConversation(conversation.id);
	console.log(messages);
	messages.sort((a, b) => a.date_time - b.date_time);
	
	const io = serverStore.getSocketServerInstance();
	
	if (conversation) {
		if (toSpecifiedSocketId) {
			io.to(toSpecifiedSocketId)
			  .emit('direct-chat-history', {
				  messages,
				  participants: [conversation.sender_id, conversation.receiver_id]
			  });
		}
		
		const activeConnectionsSender = serverStore.getActiveConnections(conversation.sender_id);
		const activeConnectionsReceiver = serverStore.getActiveConnections(conversation.receiver_id);
		
		activeConnectionsSender.forEach(socketId => {
			io.to(socketId)
			  .emit('direct-chat-history', {
				  messages,
				  participants: [conversation.sender_id, conversation.receiver_id]
			  });
		});
		activeConnectionsReceiver.forEach(socketId => {
			io.to(socketId)
			  .emit('direct-chat-history', {
				  messages,
				  participants: [conversation.sender_id, conversation.receiver_id]
			  });
		});
	}
};

module.exports = {updateChatHistory};

const dateFns = require('date-fns')
const chatController = require('../src/controllers/chatController');
const {v4: uuidv4} = require('uuid');
const chatUpdates = require('./updates/chats')

const directMessageHandler = async (socket, data) => {
	const {userId} = socket.user;
	
	const {receiverId, content} = data;
	
	const message = {
		content,
		authorId: userId,
		dateTime: dateFns.format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
		type: 'DIRECT',
		conversationId: null
	};
	
	// check if conversation already exists
	const conversation = await chatController.getConversation(userId, receiverId);
	console.log(conversation);
	// if exists get conversation_id
	if (conversation) {
		console.log('conversation exists');
		message.conversationId = conversation.id;
		console.log('saving message', message);
		await chatController.saveMessage(message);
		
		chatUpdates.updateChatHistory(conversation.id);
	}
	// else create a new conversation and get conversation_id
	else {
		console.log('creating new conversation');
		const conversation = {
			id: uuidv4(),
			senderId: userId,
			receiverId
		};
		console.log(conversation);
		await chatController.createNewConversation(conversation);
		message.conversationId = conversation.id;
		console.log('saving message');
		await chatController.saveMessage(message);
		
		chatUpdates.updateChatHistory(conversation.id);
	}
};

module.exports = directMessageHandler;

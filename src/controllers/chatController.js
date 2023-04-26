const paraQuery = require('../utils/db');
const {format} = require('date-fns');


const getMessagesByConversation = async (conversationId) => {
	try {
		let x = await paraQuery(
			'SELECT * FROM message WHERE conversation_id = ?',
			[conversationId],
		);
		return x;
	} catch (e) {
		console.log(e);
		return null;
	}
};
const saveMessage = async (message) => {
	try {
		const {
			content,
			authorId,
			dateTime,
			type,
			conversationId
		} = message;
		
		let x = await paraQuery(
			'INSERT INTO message (author_id, content, date_time, type, conversation_id) VALUES (?, ?, ?, ?, ?)',
			[authorId, content, dateTime, type, conversationId],
		);
		return x;
	} catch (e) {
		console.log(e);
		return null;
	}
	
};
const getConversation = async (senderId, receiverId) => {
	try {
		let x = await paraQuery(
			'SELECT * FROM conversation WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)',
			[senderId, receiverId, receiverId, senderId],
		);
		if (!x.length) {
			return null;
		}
		return x[0];
	} catch (error) {
		console.log(error);
		return null;
	}
};

const getConversationById = async (conversationId) => {
	try {
		let x = await paraQuery(
			'SELECT * FROM conversation WHERE id=?',
			[conversationId],
		);
		if (!x.length) {
			return null;
		}
		return x[0];
	} catch (error) {
		console.log(error);
		return null;
	}
};
const getConversationByUser = async (userId) => {
	try {
		let x = await paraQuery(
			'SELECT * FROM conversation WHERE sender_id=? OR receiver_id=?',
			[userId, userId],
		);
		return x;
	} catch (error) {
		console.log(error);
		return null;
	}
};

const createNewConversation = async (conversation) => {
	try {
		const {
			id,
			senderId,
			receiverId
		} = conversation;
		
		let x = await paraQuery(
			'INSERT INTO conversation (id, sender_id, receiver_id) VALUES (?, ?, ?)',
			[id, senderId, receiverId],
		);
		return x;
	} catch (e) {
		console.log(e);
		return null;
	}
};

module.exports = {
	getMessagesByConversation,
	saveMessage,
	getConversation,
	getConversationById,
	getConversationByUser,
	createNewConversation
};

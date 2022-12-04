// Import Statements
const express = require('express');
const noticeController = require('../../controllers/noticeController');
const router = express.Router();

router
	.route('/')
	.get(noticeController.getAllNotices)
	.post(noticeController.createNewNotice);

router
	.route('/:id')
	.get(noticeController.getNoticeById)
	.delete(noticeController.deleteNotice)
	.put(noticeController.updateNotice);

module.exports = router;

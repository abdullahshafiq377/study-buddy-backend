// Import Statements
const express = require('express');
const postController = require('../../controllers/postController');
const router = express.Router();

router
    .route('/')
    .get(postController.getAllPosts)
    .post(postController.createPost);

router
    .route('/:id')
    .delete(postController.deletePost)
    .put(postController.updatePost)
    .patch(postController.addReactions);

router
    .route('/:userId')
    .get(postController.getPostsByUser);

router
    .route('/comments/:postId')
    .get(postController.getCommentsByPost)
    .post(postController.createComment);

router
    .route('/comments/:id')
    .delete(postController.deleteComment);

router
    .route('/comments/by-post/:postId')
    .delete(postController.deleteCommentsByPost);


module.exports = router;

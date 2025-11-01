const express = require('express');
const router = express.Router();
const {
  getCommentsByPost,
  createComment,
  updateComment,
  deleteComment
} = require('../controllers/commentController');
const { protect } = require('../middleware/auth');

router.route('/post/:postId')
  .get(getCommentsByPost);

router.route('/')
  .post(protect, createComment);

router.route('/:id')
  .put(protect, updateComment)
  .delete(protect, deleteComment);

module.exports = router;
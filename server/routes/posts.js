const express = require('express');
const router = express.Router();
const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/postController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.route('/')
  .get(getPosts)
  .post(protect, upload.single('image'), createPost);

router.route('/:id')
  .get(getPostById)
  .put(protect, upload.single('image'), updatePost)
  .delete(protect, deletePost);

module.exports = router;
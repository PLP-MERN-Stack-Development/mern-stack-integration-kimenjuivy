const Comment = require('../models/Comment');
const Post = require('../models/Post');
const { validateComment } = require('../utils/validation');

const getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'name email')
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createComment = async (req, res) => {
  try {
    const { error } = validateComment(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const post = await Post.findById(req.body.post);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = await Comment.create({
      content: req.body.content,
      post: req.body.post,
      author: req.user._id
    });

    const populatedComment = await Comment.findById(comment._id)
      .populate('author', 'name email');

    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (comment) {
      if (comment.author.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to update this comment' });
      }

      comment.content = req.body.content || comment.content;
      const updatedComment = await comment.save();
      const populatedComment = await Comment.findById(updatedComment._id)
        .populate('author', 'name email');

      res.json(populatedComment);
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (comment) {
      if (comment.author.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to delete this comment' });
      }

      await comment.deleteOne();
      res.json({ message: 'Comment removed' });
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCommentsByPost,
  createComment,
  updateComment,
  deleteComment
};
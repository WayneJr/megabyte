const express = require('express');
const router = express.Router({mergeParams: true});

const {isLoggedIn, checkCommentOwnership} = require('../middleware/index');
const { commentNew, createComment, editComment, updateComment, deleteComment } = require('../controllers/comment');

// Create Comment form route
router.get('/new', isLoggedIn, commentNew);

// Create Comment route
router.post('/', isLoggedIn, createComment);

// Edit Comment
router.get('/:comment_id/edit', checkCommentOwnership, editComment);

// Comment Update Route
router.put('/:comment_id', checkCommentOwnership, updateComment);

// Comment Delete Route
router.delete('/:comment_id', checkCommentOwnership, deleteComment);

module.exports = router;
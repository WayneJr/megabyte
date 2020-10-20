const express = require('express');
const router = express.Router();
const Meal = require('../../models/meal');
const Comment = require('../../models/comment');
const {isLoggedIn} = require('../middleware/index');

// Create Comment form route
router.get('/new', isLoggedIn, (req, res) => {
    Meal.findById(req.params.id)
    .then(meal => res.render('comments/new', {meal_id: meal._id, meal_name: meal.name}))
    .catch(err => console.log(err));
});

// Create Comment route
router.post('/', isLoggedIn, (req, res) => {
    Meal.findById(req.params.id)
    .then(meal => {
        Comment.create(req.body.comment)
        .then(comment => {
            // Associating users with comments
            comment.author.id = req.user._id;
            comment.author.username = req.user.username;
            comment.author.name = req.user.name;
            console.log(req.user);                
            comment.save();

            meal.comments.push(comment);
            meal.save();
            return res.redirect('/meals/' + meal._id);
        }).catch(err => console.log(err));
    });
});

// Edit Comment
router.get('/:comment_id/edit', (req, res) => {
    Comment.findById(req.params.comment_id)
    .then(comment => res.render('comments/edit', {meal_id: req.params.id, comment: comment}))
});

// Comment Update Route
router.put('/:comment_id', (req, res) => {
    Meal.findById(req.params.id)
    .then(meal => {
        Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment)
        .then(() => {
            return res.redirect('/meals/' + meal._id);
        }).catch(err => console.log(err));
    });
});

// Comment Delete Route
router.delete('/:comment_id', (req, res) => {
    Meal.findById(req.params.id)
    .then(meal => {
        Comment.findByIdAndDelete(req.params.comment_id)
        .then(() => {
            return res.redirect('/meals/' + meal._id);
        }).catch(err => console.log(err));
    });
});

module.exports = router;
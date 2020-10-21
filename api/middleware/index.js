const Comment = require('../../models/comment');
const Meal = require('../../models/meal');


module.exports =  {
    checkMealOwnership: function(req, res, next) {
        // is the user logged in?
        if (req.isAuthenticated()) {
            Meal.findById(req.params.id)
            .then(meal => {
                // does the user own the campground?
                if (meal.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect('back');
                }
            }).catch(err => res.redirect('back'));
        }
    },

    checkCommentOwnership: function(req, res, next) {
        // is the user logged in?
        if (req.isAuthenticated()) {
            Comment.findById(req.params.comment_id)
            .then(comment => {
                // does the user own the campground?
                if (comment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect('back');
                }
            }).catch(err => res.redirect('back'));
        }
    },

    isLoggedIn: function(req, res, next) {
        return req.isAuthenticated() ? next() : res.redirect('/login');
    }
}

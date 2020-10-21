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
                    req.flash('error', "You don't have permission to do that")

                    res.redirect('back');
                }
            }).catch(err => {
                req.flash('error', 'Please Log In');
                res.redirect('back')
            });
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
                    req.flash('error', "You don't have permission to do that")
                    res.redirect('back');
                }
            }).catch(err => {
                req.flash('error', 'Please Log In');
                res.redirect('back')
            });
        }
    },

    isLoggedIn: function(req, res, next) {
        // return req.isAuthenticated() ? next() : res.redirect('/login');
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error', 'Please Log In');
        return res.redirect('/login');
    }
}

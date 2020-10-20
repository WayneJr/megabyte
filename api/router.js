const Meal = require('../models/meal');
const Comment = require('../models/comment');
const User = require('../models/user');
const passport = require('passport');


module.exports = app => {
    app.get('/', (req, res) => {
        res.render('meals/landing');
    });

    
    // Read Route
    app.get('/meals', (req, res) => {
        Meal.find({}, (err, meals) => {
            if (err) {
                console.log(err);
            } else {
                res.render('meals/index', {meals: meals});
            }
        })
    });

    // New meal form 
    app.get('/meals/new', isLoggedIn, (req, res) => {
        res.render('meals/new');
    })

    // Create route
    app.post('/meals', isLoggedIn, (req, res) => {
        const newMeal = req.body.meal;
        const author = {
            id: req.user._id,
            name: req.user.name,
            username: req.user.username
        };
        newMeal.author = author;
        meal.save();
        Meal.create(newMeal, (err, meal) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/meals');
            }
        });
    });

    // Show route
    app.get('/meals/:id', (req, res) => {
        Meal.findById(req.params.id)
        .populate('comments')
        .exec()
        .then(meal => {
            res.render('meals/show', {meal: meal});
        })
        .catch(err => console.log(err));
    });

    // Edit route
    app.get('/meals/:id/edit', isLoggedIn, (req, res) => {
        Meal.findById(req.params.id)
        .then(meal => res.render('meals/edit', {meal: meal}))
        .catch(err => console.log(err));
    });

    // Update route
    app.put('/meals/:id', isLoggedIn, (req, res) => {
        Meal.findByIdAndUpdate(req.params.id, req.body.meal)
        .then(meal => res.redirect('/meals/'+ req.params.id))
        .catch(err => console.log(err));
    });

    // Delete Route
    app.delete('/meals/:id', isLoggedIn, (req, res) => {
        Meal.findByIdAndDelete(req.params.id)
        .then(() => res.redirect('/meals'))
        .catch(err => console.log(err));
    });


    // ===========
    // COMMENTS
    // ===========

    // Create Comment form route
    app.get('/meals/:id/comments/new', isLoggedIn, (req, res) => {
        Meal.findById(req.params.id)
        .then(meal => res.render('comments/new', {meal_id: meal._id, meal_name: meal.name}))
        .catch(err => console.log(err));
    });

    // Create Comment route
    app.post('/meals/:id/comments', isLoggedIn, (req, res) => {
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
    app.get('/meals/:id/comments/:comment_id/edit', (req, res) => {
        Comment.findById(req.params.comment_id)
        .then(comment => res.render('comments/edit', {meal_id: req.params.id, comment: comment}))
    });

    // Comment Update Route
    app.put('/meals/:id/comments/:comment_id', (req, res) => {
        Meal.findById(req.params.id)
        .then(meal => {
            Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment)
            .then(() => {
                return res.redirect('/meals/' + meal._id);
            }).catch(err => console.log(err));
        });
    });

    // Comment Delete Route
    app.delete('/meals/:id/comments/:comment_id', (req, res) => {
        Meal.findById(req.params.id)
        .then(meal => {
            Comment.findByIdAndDelete(req.params.comment_id)
            .then(() => {
                return res.redirect('/meals/' + meal._id);
            }).catch(err => console.log(err));
        });
    })


    // ===========
    // Auth routes
    // ===========

    // Sign Up functionality

    app.get('/register', (req, res) => {
        res.render('register');
    });

    app.post('/register', (req, res) => {
        User.register(new User({name: req.body.name, username: req.body.username}), req.body.password, (err, user) => {
            if (err) {
                console.log(err);
                return res.render('register');
            }
            passport.authenticate('local')(req, res, () => {
                res.redirect('/meals');
            });
        });
    });

    
    // Login Functionality
    app.get('/login', (req, res) => {
        res.render('login');
    });


    app.post('/login', passport.authenticate('local', {
        successRedirect: '/meals',
        failureRedirect: '/login'
    }), (req, res) => {
    });

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/meals');
    });

    function isLoggedIn(req, res, next) {
        return req.isAuthenticated() ? next() : res.redirect('/login');
    }
}
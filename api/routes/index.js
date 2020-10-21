const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const passport = require('passport');


router.get('/', (req, res) => {
    res.render('meals/landing');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
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
router.get('/login', (req, res) => {
    res.render('login');
});


router.post('/login', passport.authenticate('local', {
    successRedirect: '/meals',
    failureRedirect: '/login'
}), (req, res) => {
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Successfully logged you out')
    res.redirect('/meals');
});

module.exports = router;
